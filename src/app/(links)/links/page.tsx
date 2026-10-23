import type { Metadata } from "next";
import LinksPageClient from "@/components/links/LinksPageClient";

export const metadata: Metadata = {
  title: "Havolalar | DaF Sprachzentrum",
  description:
    "DaF Sprachzentrum Farg'ona — barcha havolalar bir joyda. Instagram, Telegram, telefon va boshqalar.",
  robots: { index: true, follow: true },
};

export default function LinksPage() {
  return <LinksPageClient />;
}
