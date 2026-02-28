import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IJMB Admissions",
  description: "Official IJMB admissions and student portal"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
