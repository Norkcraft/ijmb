import { requireAdmin } from "@/lib/auth";

export default async function Page() {
  const { supabase } = await requireAdmin();
  const [{ count: apps }, { count: payments }] = await Promise.all([
    supabase.from("applications").select("id", { count: "exact", head: true }),
    supabase.from("payments").select("id", { count: "exact", head: true })
  ]);

  return <div className="grid gap-4 md:grid-cols-2"><div className="card"><p>Total applications</p><p className="text-3xl font-bold">{apps ?? 0}</p></div><div className="card"><p>Total payments</p><p className="text-3xl font-bold">{payments ?? 0}</p></div></div>;
}
