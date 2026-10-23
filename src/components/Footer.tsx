"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Send } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { branches, branchCity } from "@/data/branches";

const PHONE = "+998 90 535 10 99";
const EMAIL = "info@daf-sprachzentrum.uz";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.08em] text-white/55";
const linkCls =
  "text-base font-medium leading-snug text-white no-underline hover:text-green-300";

export default function Footer() {
  const { t, locale } = useI18n();
  const [tgOpen, setTgOpen] = useState(false);
  const tgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tgOpen) return;
    const onDown = (e: MouseEvent) => {
      if (tgRef.current && !tgRef.current.contains(e.target as Node)) setTgOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [tgOpen]);

  const navigation = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.teachers"), href: "/oqituvchilar" },
    { name: t("navbar.courses"), href: "/kurslar" },
    { name: t("navbar.branches"), href: "/filiallar" },
    { name: t("navbar.results"), href: "/natijalar" },
    { name: t("navbar.blog"), href: "/blog" },
  ];

  return (
    <footer className="p-2">
      <div className="overflow-hidden rounded-[36px] bg-ink px-[clamp(22px,5vw,56px)] pt-[clamp(32px,6vw,64px)] pb-6 text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
          <div className="flex flex-col gap-[18px]">
            <Image
              src="/brand/daf-logo-white.png"
              alt="DaF Sprachzentrum"
              width={102}
              height={48}
              unoptimized
              className="h-12 w-auto self-start"
            />
            <p className="max-w-[300px] text-[15px] leading-[1.55] text-white/72">
              {t("footer.desc1")} {t("footer.desc2")}
            </p>
            <div className="flex gap-2">
              <div className="relative" ref={tgRef}>
                <IconButton
                  label="Telegram"
                  variant="inverse"
                  onClick={() => setTgOpen((v) => !v)}
                >
                  <Send />
                </IconButton>
                {tgOpen && (
                  <div className="absolute bottom-full left-0 z-10 mb-2 w-48 overflow-hidden rounded-[20px] bg-white shadow-lg">
                    {branches.map((b) => (
                      <a
                        key={b.id}
                        href={b.telegramChannel}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setTgOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-ink no-underline hover:bg-paper-2 hover:text-ink"
                      >
                        <Send className="size-3.5 text-green-600" />
                        {branchCity(b, locale)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <IconButton label="Instagram" variant="inverse" asChild>
                <a
                  href="https://www.instagram.com/daf_fergana/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </a>
              </IconButton>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            <span className={eyebrow}>{t("footer.navigation")}</span>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={linkCls}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className={eyebrow}>{t("footer.contact")}</span>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-[22px] leading-tight font-semibold tracking-[-0.02em] text-green-500 no-underline hover:text-green-300"
            >
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-[15px] font-medium text-white no-underline hover:text-green-300">
              {EMAIL}
            </a>
            <span className="text-[15px] leading-[1.45] text-white/72">{t("footer.address")}</span>
          </div>
        </div>

        <div
          aria-hidden
          className="mx-auto mt-12 max-w-[1200px] text-[clamp(64px,17vw,220px)] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-white/8 select-none"
        >
          DaF{" "}
          <span className="font-serif font-normal italic tracking-[-0.03em]">Zentrum</span>
        </div>

        <div className="mx-auto mt-5 flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-white/12 pt-5 text-[13px] font-medium text-white/55">
          <span>
            © {new Date().getFullYear()} DaF Sprachzentrum. {t("footer.rights")}
          </span>
          <Link href="/maxfiylik" className="text-white/75 no-underline hover:text-white">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
