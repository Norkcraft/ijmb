import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { PayButton } from "@/components/apply-forms";

export default async function Page() {
  const { supabase, user } = await requireUser();
  const { data: application } = await supabase.from("applications").select("id").eq("user_id", user.id).maybeSingle();
  if (!application) redirect("/apply");

  return <div className="card space-y-4"><h1 className="text-2xl font-semibold">Pay Application Form Fee</h1><p>Payment is confirmed only after webhook verification.</p><PayButton /></div>;
}
