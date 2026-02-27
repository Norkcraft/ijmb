import Link from "next/link";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/requirements", "Requirements"],
  ["/fees", "Fees"],
  ["/faq", "FAQ"],
  ["/contact", "Contact"]
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-brand text-white">
        <nav className="container-page flex flex-wrap items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">IJMB</Link>
          <div className="flex gap-4 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="hover:text-brand-accent">{label}</Link>
            ))}
            <Link href="/login" className="font-semibold">Login</Link>
          </div>
        </nav>
      </header>
      <main className="container-page py-10">{children}</main>
      <footer className="mt-16 bg-slate-900 py-8 text-center text-sm text-slate-200">
        © {new Date().getFullYear()} IJMB Admissions Platform
      </footer>
    </div>
  );
}
