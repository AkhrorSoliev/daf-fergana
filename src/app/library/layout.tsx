import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kutubxona",
  description:
    "Nemis tili kitoblari va materiallari: Kursbuch, Übungsbuch, lugʻatlar va grammatikalar. Koʻrish va yuklab olish mumkin.",
  alternates: { canonical: "/library" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}

