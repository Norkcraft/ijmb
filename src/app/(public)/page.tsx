import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-brand p-10 text-white">
        <h1 className="text-4xl font-bold">Interim Joint Matriculation Board (IJMB)</h1>
        <p className="mt-4 max-w-3xl">Gain direct entry admission into 200-level in Nigerian universities through our two-semester IJMB programme.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/register" className="rounded bg-brand-accent px-5 py-3 font-semibold text-slate-900">Apply Now</Link>
          <Link href="/requirements" className="rounded border border-white px-5 py-3">View Requirements</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          "Accredited study centres",
          "Experienced tutors",
          "Direct entry support"
        ].map((item) => (
          <div key={item} className="card">{item}</div>
        ))}
      </section>
    </div>
  );
}
