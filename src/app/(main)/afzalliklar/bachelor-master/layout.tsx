import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Germaniyada Ta'lim — Bachelor & Master",
  description:
    "Germaniyada bakalavr va magistratura: qabul shartlari, universitetlar, stipendiyalar va bitirgandan keyingi ish imkoniyatlari.",
  alternates: { canonical: "/afzalliklar/bachelor-master" },
};

export default function BachelorMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
