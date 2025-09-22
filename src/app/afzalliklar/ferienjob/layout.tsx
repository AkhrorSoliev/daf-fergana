import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferienjob — 3 oylik ta'til ishi",
  description:
    "Yozgi mavsumda talabalar uchun ish: ish turlari, maosh, ish vaqti, afzalliklar va ariza topshirish yo‘li.",
  alternates: { canonical: "/afzalliklar/ferienjob" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children as React.ReactNode;
}
