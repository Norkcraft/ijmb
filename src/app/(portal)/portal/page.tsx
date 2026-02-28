import Link from "next/link";
import { requireUser } from "@/lib/auth";

export default async function Page() {
  const { supabase, user } = await requireUser();
  const { data: app } = await supabase.from("applications").select("status,form_fee_paid").eq("user_id", user.id).maybeSingle();
  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-2xl font-semibold">Portal Overview</h1>
        <p>Application status: <strong>{app?.status ?? "not started"}</strong></p>
        <p>Form fee: <strong>{app?.form_fee_paid ? "Paid" : "Pending"}</strong></p>
      </div>
      {!app?.form_fee_paid && (
        <div className="card border-amber-300 bg-amber-50">
          <p className="font-medium">Payment required</p>
          <Link className="text-brand underline" href="/apply/pay">Pay form fee</Link>
        </div>
      )}
    </div>
  );
}
