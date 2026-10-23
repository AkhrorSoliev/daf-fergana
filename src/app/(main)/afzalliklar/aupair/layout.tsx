import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aupair — Enagalik dasturi",
  description:
    "Nemis oilasida yashash, til va madaniyat almashinuvi, moliyaviy shartlar va Aupair’dan keyingi imkoniyatlar.",
  alternates: { canonical: "/afzalliklar/aupair" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
