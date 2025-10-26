import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Natijalar",
  description:
    "O'quvchilarimizning natijalari va imtihonlarda erishgan yutuqlari. Suratlar va misollar.",
  alternates: { canonical: "/natijalar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}

