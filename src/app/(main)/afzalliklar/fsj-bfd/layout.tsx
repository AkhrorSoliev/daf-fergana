import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FSJ/BFD — volontiyorlik dasturi",
  description:
    "Germaniyada FSJ va BFD: shaxsiy rivojlanish, ish sohalari, chet elliklar uchun imkoniyatlar va foydali tajriba.",
  alternates: { canonical: "/afzalliklar/fsj-bfd" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
