import { requireAdmin } from "@/lib/auth";

export default async function Page({ searchParams }: { searchParams: { reference?: string; status?: string } }) {
  const { supabase } = await requireAdmin();
  let query = supabase.from("payments").select("*").order("created_at", { ascending: false });
  if (searchParams.reference) query = query.ilike("reference", `%${searchParams.reference}%`);
  if (searchParams.status) query = query.eq("status", searchParams.status);
  const { data } = await query;

  return <div className="card"><h1 className="text-2xl font-semibold">Payments</h1><pre className="mt-4 overflow-auto text-xs">{JSON.stringify(data,null,2)}</pre></div>;
}
