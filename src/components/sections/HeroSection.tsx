"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { Badge, LevelPill } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { dictionaries } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/I18nProvider";
import { useLead } from "@/components/LeadProvider";
import { branches, branchCity } from "@/data/branches";
import HeroCastle from "./HeroCastle";
import ExamMarquee from "./ExamMarquee";

// Dictionary phrases carry trailing emoji; the design uses a serif word only.
const stripEmoji = (s: string) =>
  s.replace(/[\u{1F000}-\u{1FAFF}☀-➿⭐️‍]+/gu, "").trim();

function RotatingPhrase({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % phrases.length), 2600);
    return () => clearInterval(id);
  }, [phrases.length]);
  return (
    <span className="relative block h-[1.08em] overflow-hidden">
      <span key={i} className="block animate-[daf-rise_520ms_var(--ease-out)]">
        <Highlight color="green">{phrases[i]}</Highlight>
      </span>
    </span>
  );
}

export default function HeroSection() {
  const { t, locale } = useI18n();
  const openLead = useLead();
  const sec = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLElement>(null);
  // custom element API: `scroll` (0–1 progress) and `replay()`
  const castle = () => scene.current as unknown as { scroll: number; replay?: () => void } | null;
  const phrases = (dictionaries[locale].hero.phrases as readonly string[]).map(stripEmoji);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sec.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -r.top / (r.height * 0.85)));
        el.style.setProperty("--p", p.toFixed(4));
        const c = castle();
        if (c) c.scroll = p;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="px-2">
      <div className="h3" ref={sec}>
        <HeroCastle ref={scene} />
        <div className="h3-sun" aria-hidden />
        <div className="h3-sky" aria-hidden>
          <span className="h3-puff h3-puff-a" />
          <span className="h3-puff h3-puff-b" />
          <span className="h3-puff h3-puff-c" />
        </div>

        <div className="h3-copy">
          <Badge tone="white" dot className="border border-line">
            {branches.map((b) => branchCity(b, locale)).join(" · ")}
          </Badge>
          <h1 className="text-[clamp(42px,7vw,88px)] leading-[0.98] font-semibold tracking-[-0.035em]">
            DaF Sprachzentrum
            <RotatingPhrase phrases={phrases} />
          </h1>
          <p className="max-w-[480px] text-[length:var(--fs-body-lg)] leading-[1.55] text-ink-2">
            {t("hero.subtitle")}
          </p>
          <div className="kit-cta">
            <Button asChild variant="accent" size="lg">
              <Link href="/kurslar">
                {t("hero.ctaPrimary")}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" onClick={() => openLead()}>
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </div>

        <div className="h3-over" aria-hidden>
          <span className="oc oc-1" />
          <span className="oc oc-2" />
          <span className="oc oc-3" />
          <span className="oc oc-4" />
        </div>

        <div className="h3-card h3-card-a">
          <span className="flex gap-1">
            {["A1", "A2", "B1", "B2"].map((l) => (
              <LevelPill key={l} level={l} size="sm" />
            ))}
          </span>
          <span>{t("home.cardLevels")}</span>
        </div>
        <div className="h3-card h3-card-b">
          <strong>650+</strong>
          <span>{t("home.cardStat")}</span>
        </div>
        <button
          type="button"
          className="h3-replay"
          onClick={() => castle()?.replay?.()}
          aria-label={t("home.replay")}
        >
          <PenLine className="size-4" />
          <span>{t("home.replay")}</span>
        </button>
      </div>
      <ExamMarquee />
    </section>
  );
}
