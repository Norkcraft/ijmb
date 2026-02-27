import Link from "next/link";

export function DashboardLayout({
  title,
  links,
  children
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container-page grid gap-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="card h-fit">
          <h2 className="mb-4 text-lg font-semibold">{title}</h2>
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded px-3 py-2 hover:bg-slate-100">
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
