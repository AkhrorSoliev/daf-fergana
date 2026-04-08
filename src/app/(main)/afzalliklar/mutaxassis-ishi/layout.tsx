import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutaxassisligingiz bo'yicha ish",
  description:
    "Germaniyada malakali kadrlar uchun ish: Blue Card, viza hujjatlari, talab kasblar, afzalliklar va uzoq muddatli imkoniyatlar.",
  alternates: { canonical: "/afzalliklar/mutaxassis-ishi" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
