"use client";

import Image from "next/image";
import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { Stat } from "@/components/cards";
import { useI18n } from "@/i18n/I18nProvider";

export default function AboutSection() {
  const { t } = useI18n();
  const stats = [
    { value: "3", label: t("about.stats.branches"), tone: "green" },
    { value: "2022", label: t("about.stats.startedYear"), tone: "sun" },
    { value: "650+", label: t("about.stats.preparedYouth"), tone: "coral" },
    { value: "5", label: t("about.stats.internationalExams"), tone: "sky" },
  ] as const;

  return (
    <Section>
      <div className="kit-split">
        <SectionHeader
          className="!mb-0"
          eyebrow={t("about.badge")}
          size="h1"
          title={<HighlightLast text={t("about.title")} color="coral" />}
          subtitle={t("about.subtitle")}
        />
        <div className="flex flex-col gap-4 text-[length:var(--fs-body-lg)] leading-[1.55] text-ink-2">
          {[...t("about.p1").split("\n\n"), t("about.p2")].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="relative mt-[clamp(40px,6vw,72px)] aspect-[4/5] overflow-hidden rounded-[clamp(28px,4vw,44px)] bg-paper-3 sm:aspect-video">
        <Image
          src="/assets/hero-image-3.jpg"
          alt="DaF Sprachzentrum"
          fill
          sizes="(min-width:1200px) 1200px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="kit-stats">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </Section>
  );
}
