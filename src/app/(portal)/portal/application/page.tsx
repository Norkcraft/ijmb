import { requireUser } from "@/lib/auth";
export default async function Page(){const {supabase,user}=await requireUser(); const {data}=await supabase.from("applications").select("*").eq("user_id",user.id).maybeSingle(); return <div className="card"><h1 className="text-2xl font-semibold">My Application</h1><pre className="mt-4 overflow-auto text-xs">{JSON.stringify(data,null,2)}</pre></div>}
