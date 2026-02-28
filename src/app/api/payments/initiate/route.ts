import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

const FORM_FEE_AMOUNT = 500000;

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type } = await req.json();
  const { data: app } = await supabase.from("applications").select("id").eq("user_id", user.id).maybeSingle();
  if (!app) return NextResponse.json({ error: "No application" }, { status: 400 });

  const reference = `IJMB-${randomUUID()}`;
  await supabase.from("payments").insert({
    user_id: user.id,
    application_id: app.id,
    type,
    amount: FORM_FEE_AMOUNT,
    currency: "NGN",
    provider: "paystack",
    reference,
    status: "pending"
  });

  const { data: authUser } = await supabase.auth.getUser();
  const email = authUser.user?.email;

  const initRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.paystackSecret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      amount: FORM_FEE_AMOUNT,
      reference,
      currency: "NGN",
      callback_url: `${env.appUrl}/apply/success`
    })
  });

  if (!initRes.ok) {
    await supabase.from("payments").update({ status: "failed" }).eq("reference", reference);
    return NextResponse.json({ error: "Payment init failed" }, { status: 500 });
  }

  const payload = await initRes.json();
  return NextResponse.json({ authorization_url: payload.data.authorization_url, reference });
}
