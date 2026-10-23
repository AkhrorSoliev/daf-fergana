"use client";

import Image from "next/image";
import {
  Globe,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LinkItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

const links: LinkItem[] = [
  {
    href: "https://dafzentrum.uz",
    label: "Webseite",
    icon: Globe,
    external: true,
  },
  {
    href: "https://www.instagram.com/daf_fergana/",
    label: "Instagram",
    icon: Instagram,
    external: true,
  },
  {
    href: "https://t.me/daffergana",
    label: "Telegram",
    icon: Send,
    external: true,
  },
  {
    href: "tel:+998905351099",
    label: "+998 90 535 10 99",
    icon: Phone,
  },
  {
    href: "mailto:info@daf-sprachzentrum.uz",
    label: "info@daf-sprachzentrum.uz",
    icon: Mail,
  },
  {
    href: "https://www.google.com/maps/search/?api=1&query=Farg%27ona%2C+Turkiston+ko%27chasi+22",
    label: "Standort",
    icon: MapPin,
    external: true,
  },
];

export default function LinksPageClient() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center space-y-3">
          <Image
            src="/assets/daf-logo-black.png"
            alt="DaF Sprachzentrum logo"
            width={80}
            height={80}
            priority
            className="w-auto h-20 object-contain"
            unoptimized
          />
          <h1 className="text-xl font-bold text-[#1f2547]">
            DaF Sprachzentrum
          </h1>
          <p className="text-sm text-[#1f2547]/60 text-center italic">
            Schritt f&uuml;r Schritt zum Ziel.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl bg-white border border-[#e6e8f2]
                         hover:border-[#58cc02] hover:shadow-md transition-all duration-200"
            >
              <link.icon className="w-5 h-5 text-[#58cc02] shrink-0" />
              <span className="text-sm font-medium text-[#1f2547]">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#1f2547]/40">
          &copy; {new Date().getFullYear()} DaF Sprachzentrum
        </p>
      </div>
    </div>
  );
}
