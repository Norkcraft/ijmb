import { requireUser } from "@/lib/auth";
import { PersonalForm } from "@/components/apply-forms";
export default async function Page(){await requireUser(); return <PersonalForm/>}
