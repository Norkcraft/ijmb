export const runtime = "nodejs";

import crypto from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("x-paystack-signature") ?? "";
  const hash = crypto.createHmac("sha512", env.paystackWebhookSecret).update(rawBody).digest("hex");

  if (hash !== sig) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  if (event.event !== "charge.success") return NextResponse.json({ received: true });

  const reference = event.data.reference as string;
  const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${env.paystackSecret}` }
  });
  if (!verifyRes.ok) return NextResponse.json({ error: "Verify failed" }, { status: 500 });

  const verifyData = await verifyRes.json();
  if (verifyData?.data?.status !== "success") {
    return NextResponse.json({ received: true });
  }

  const admin = createAdminClient();
  const { data: payment } = await admin.from("payments").select("id,status,application_id").eq("reference", reference).single();
  if (!payment) return NextResponse.json({ received: true });
  if (payment.status === "success") return NextResponse.json({ received: true });

  await admin.from("payments").update({ status: "success" }).eq("id", payment.id);
  await admin.from("applications").update({ form_fee_paid: true }).eq("id", payment.application_id);

  return NextResponse.json({ received: true });
}
