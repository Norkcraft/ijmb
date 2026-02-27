import { requireAdmin } from "@/lib/auth";
import { AdminStatusButtons } from "@/components/admin-actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("applications").select("*").eq("id", params.id).single();
  return <div className="card space-y-4"><h1 className="text-2xl font-semibold">Application Detail</h1><pre className="overflow-auto rounded bg-slate-100 p-4 text-xs">{JSON.stringify(data,null,2)}</pre><AdminStatusButtons applicationId={params.id}/></div>;
}
