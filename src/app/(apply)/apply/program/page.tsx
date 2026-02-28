import { requireUser } from "@/lib/auth";
import { ProgramForm } from "@/components/apply-forms";
export default async function Page(){await requireUser(); return <ProgramForm/>}
