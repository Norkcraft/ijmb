import Link from "next/link";
import { requireUser } from "@/lib/auth";

export default async function Page() {
  await requireUser();
  return (
    <div className="card space-y-4">
      <h1 className="text-2xl font-semibold">Start your IJMB application</h1>
      <p>Complete each step to submit your application.</p>
      <Link href="/apply/personal" className="inline-block rounded bg-brand px-4 py-2 text-white">Begin</Link>
    </div>
  );
}
