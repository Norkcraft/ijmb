import { DashboardLayout } from "@/components/dashboard-layout";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/payments", label: "Payments" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout title="Admin Portal" links={links}>{children}</DashboardLayout>;
}
