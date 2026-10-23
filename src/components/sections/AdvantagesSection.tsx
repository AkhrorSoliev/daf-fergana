"use client";

import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import ProgramGrid from "@/components/afzalliklar/ProgramGrid";
import { useI18n } from "@/i18n/I18nProvider";

export default function AdvantagesSection() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t("advantages.badge")}
        title={<HighlightLast text={t("advantages.title")} color="green" />}
        subtitle={t("advantages.subtitle")}
      />
      <ProgramGrid />
    </Section>
  );
}
