import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function Page({ searchParams }: { searchParams: { status?: string; paid?: string } }) {
  const { supabase } = await requireAdmin();
  let query = supabase.from("applications").select("id,user_id,status,form_fee_paid,created_at").order("created_at", { ascending: false });
  if (searchParams.status) query = query.eq("status", searchParams.status);
  if (searchParams.paid) query = query.eq("form_fee_paid", searchParams.paid === "true");
  const { data } = await query;

  return (
    <div className="card">
      <h1 className="mb-4 text-2xl font-semibold">Applications</h1>
      <div className="space-y-2 text-sm">
        {data?.map((row) => (
          <Link key={row.id} href={`/admin/applications/${row.id}`} className="block rounded border p-3 hover:bg-slate-50">
            {row.id} — {row.status} — {row.form_fee_paid ? "Paid" : "Unpaid"}
          </Link>
        ))}
      </div>
    </div>
  );
}
