import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saisonarbeit — Mavsumiy ish",
  description:
    "Germaniyada mavsumiy ish: maosh va shartnomalar, sohalar (qishloq xo‘jaligi, turizm), chet elliklar imkoniyatlari va maslahatlar.",
  alternates: { canonical: "/afzalliklar/saisonarbeit" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
