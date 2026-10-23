"use client";

import Image from "next/image";
import {
  Globe,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Highlight } from "@/components/ui/highlight";
import { cn } from "@/lib/utils";

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

// Icon squircle + row tint per link (cycled)
const TINTS = [
  "bg-green-100 text-green-ink",
  "bg-coral-100 text-coral-ink",
  "bg-sky-100 text-sky-ink",
  "bg-sun-100 text-sun-ink",
  "bg-lilac-100 text-lilac-ink",
];

export default function LinksPageClient() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-12">
      <div className="w-full max-w-[440px] space-y-9">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/brand/daf-logo-navy.png"
            alt="DaF Sprachzentrum"
            width={127}
            height={60}
            priority
            unoptimized
            className="h-[60px] w-auto"
          />
          <h1 className="text-[clamp(32px,9vw,44px)] leading-[0.98] font-semibold tracking-[-0.035em] text-ink">
            DaF <Highlight color="green">Sprachzentrum</Highlight>
          </h1>
          <p className="text-[length:var(--fs-body-lg)] text-ink-2">
            Schritt f&uuml;r Schritt zum Ziel.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex min-h-[64px] items-center gap-3.5 rounded-[24px] border border-line bg-white p-2.5 pr-4 text-ink no-underline shadow-xs transition-[transform,box-shadow] duration-[360ms] ease-out hover:-translate-y-0.5 hover:text-ink hover:shadow-md"
            >
              <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", TINTS[i % TINTS.length])}>
                <link.icon className="size-5" />
              </span>
              <span className="flex-1 text-base font-semibold tracking-[-0.01em]">{link.label}</span>
              <ArrowUpRight className="size-5 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        <p className="text-center text-xs font-medium text-ink-4">
          &copy; {new Date().getFullYear()} DaF Sprachzentrum
        </p>
      </div>
    </main>
  );
}
