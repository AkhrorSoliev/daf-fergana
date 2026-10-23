import type { Metadata } from "next";
import PrivacyPageClient from "@/components/privacy/PrivacyPageClient";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati",
  description: "DaF Sprachzentrum maxfiylik siyosati va shaxsiy ma'lumotlarni himoya qilish.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
