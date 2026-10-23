"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useI18n } from "@/i18n/I18nProvider";
import { useLead } from "@/components/LeadProvider";
import { cn } from "@/lib/utils";

const navigation = [
  { key: "navbar.home", href: "/" },
  { key: "navbar.teachers", href: "/oqituvchilar" },
  { key: "navbar.courses", href: "/kurslar" },
  { key: "navbar.branches", href: "/filiallar" },
  { key: "navbar.results", href: "/natijalar" },
  { key: "navbar.blog", href: "/blog" },
];

function Logo() {
  return (
    <Image
      src="/brand/daf-logo-navy.png"
      alt="DaF Sprachzentrum"
      width={85}
      height={40}
      priority
      unoptimized
      className="h-10 w-auto"
    />
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openLead = useLead();

  // close sheet on route change
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-3 py-2.5">
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center gap-3 rounded-pill border border-line bg-[var(--glass-bg)] pr-2 pl-[18px] shadow-sm backdrop-blur-[16px] backdrop-saturate-[1.4]">
        <Link href="/" aria-label="DaF Sprachzentrum" className="flex items-center">
          <Logo />
        </Link>

        <nav className="mx-auto hidden gap-0.5 min-[1100px]:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center rounded-pill px-3.5 text-[15px] font-medium text-ink no-underline transition-colors duration-200 ease-out hover:text-ink",
                isActive(item.href) ? "bg-paper-3" : "hover:bg-paper-2"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <span className="flex-1 min-[1100px]:hidden" />

        <div className="hidden items-center gap-3 min-[1100px]:flex">
          <LanguageSwitch />
          <Button size="sm" className="h-11" onClick={() => openLead()}>
            {t("navbar.cta")}
          </Button>
        </div>

        <IconButton
          label="Menu"
          variant="primary"
          className="min-[1100px]:hidden"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu />
        </IconButton>
      </div>

      {open && (
        <div className="fixed inset-0 z-[90] flex animate-[daf-rise_360ms_var(--ease-out)] flex-col bg-paper px-3 pt-2.5 pb-6 min-[1100px]:hidden">
          <div className="flex h-[60px] items-center justify-between pr-2 pl-[18px]">
            <Logo />
            <IconButton label="Close" variant="soft" onClick={() => setOpen(false)}>
              <X />
            </IconButton>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-6">
            {navigation.map((item, i) => (
              <Link
                key={item.key}
                href={item.href}
                style={{ animationDelay: `${60 + i * 40}ms` }}
                className={cn(
                  "flex animate-[daf-rise_640ms_var(--ease-out)_both] items-center justify-between border-b border-line px-1.5 py-3.5 text-[32px] leading-[1.05] font-semibold tracking-[-0.03em] no-underline hover:text-ink",
                  isActive(item.href) ? "text-green-600" : "text-ink"
                )}
              >
                {t(item.key)}
                <ArrowRight className="size-6" />
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-3">
            <LanguageSwitch className="self-start" />
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false);
                openLead();
              }}
            >
              {t("navbar.cta")}
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
