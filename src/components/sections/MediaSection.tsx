"use client";

import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { TestimonialCard, type CardTone } from "@/components/cards";
import { useI18n } from "@/i18n/I18nProvider";
import { testimonials } from "@/data/testimonials";

const TONES: CardTone[] = ["sky", "coral", "lilac", "sun"];

export default function MediaSection() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t("media.badge")}
        title={<HighlightLast text={t("about.testimonialsTitle")} color="coral" />}
      />
      <div className="kit-scroll">
        {testimonials.map((x, i) => (
          <TestimonialCard key={x.name} quote={x.content} name={x.name} role={x.role} tone={TONES[i % TONES.length]} />
        ))}
      </div>
    </Section>
  );
}
