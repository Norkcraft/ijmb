import { DashboardLayout } from "@/components/dashboard-layout";

const links = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/application", label: "Application" },
  { href: "/portal/payments", label: "Payments" },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/support", label: "Support" },
  { href: "/portal/profile", label: "Profile" },
  { href: "/portal/security", label: "Security" }
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout title="Student Portal" links={links}>{children}</DashboardLayout>;
}
