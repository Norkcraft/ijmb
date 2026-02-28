import { requireUser } from "@/lib/auth";
import { ReviewActions } from "@/components/apply-forms";

export default async function Page() {
  const { supabase, user } = await requireUser();
  const { data: application } = await supabase.from("applications").select("*").eq("user_id", user.id).maybeSingle();
  return (
    <div className="card space-y-4">
      <h1 className="text-2xl font-semibold">Review & Submit</h1>
      <pre className="overflow-auto rounded bg-slate-100 p-4 text-xs">{JSON.stringify(application, null, 2)}</pre>
      <ReviewActions />
    </div>
  );
}
