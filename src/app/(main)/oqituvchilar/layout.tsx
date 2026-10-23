import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O'qituvchilarimiz",
  description:
    "Tajribali ustozlar jamoasi: biografiya, tajriba va yo'nalishlar. O'qituvchilarimiz bilan tanishing.",
  alternates: { canonical: "/oqituvchilar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}

