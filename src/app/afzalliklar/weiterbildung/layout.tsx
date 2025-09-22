import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weiterbildung — Malaka oshirish",
  description:
    "Qisqa muddatli amaliy kurslar: kurs turlari, ariza topshirish yo‘llari, chet elliklar imkoniyatlari va professional rivojlanish.",
  alternates: { canonical: "/afzalliklar/weiterbildung" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
