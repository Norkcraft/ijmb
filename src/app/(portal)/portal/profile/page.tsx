import { requireUser } from "@/lib/auth";
import { ProfileForm } from "@/components/portal-actions";

export default async function Page(){const {supabase,user}=await requireUser(); const {data}=await supabase.from("profiles").select("full_name,phone").eq("id",user.id).maybeSingle(); return <ProfileForm fullName={data?.full_name} phone={data?.phone} />}
