import { requireUser } from "@/lib/auth";
import { AcademicsForm } from "@/components/apply-forms";
export default async function Page(){await requireUser(); return <AcademicsForm/>}
