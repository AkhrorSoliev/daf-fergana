import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nemis tili kurslari",
  description:
    "A1 dan C1 gacha barcha darajalarda individual, intensiv va standart nemis tili kurslari. Tajribali ustozlar va amaliy darslar.",
  alternates: { canonical: "/kurslar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}

