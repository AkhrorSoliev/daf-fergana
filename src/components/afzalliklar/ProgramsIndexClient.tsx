"use client";

import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { useI18n } from "@/i18n/I18nProvider";
import ProgramGrid from "./ProgramGrid";

export default function ProgramsIndexClient() {
  const { t } = useI18n();
  return (
    <>
      <PageHead
        eyebrow={t("advantages.badge")}
        title={<HighlightLast text={t("advantages.title")} color="green" />}
        subtitle={t("advantages.subtitle")}
      />
      <Section className="pt-0">
        <ProgramGrid />
      </Section>
    </>
  );
}
