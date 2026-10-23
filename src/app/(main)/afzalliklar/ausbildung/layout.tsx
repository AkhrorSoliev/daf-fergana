import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ausbildung — Dual Ta'lim",
  description:
    "Germaniyada dual ta’lim: o‘qish bilan ishlash, mashhur kasblar, chet elliklar uchun afzalliklar va ariza berish bosqichlari.",
  alternates: { canonical: "/afzalliklar/ausbildung" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
