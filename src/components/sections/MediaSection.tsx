"use client";

import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { VideoStrip } from "@/components/results/VideoStories";
import { RESULT_VIDEOS } from "@/data/natijalar";
import { useI18n } from "@/i18n/I18nProvider";

/** "What students say": the ten best student videos. */
export default function MediaSection() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t("media.badge")}
        title={<HighlightLast text={t("about.testimonialsTitle")} color="coral" />}
      />
      <VideoStrip videos={RESULT_VIDEOS.filter((v) => v.home)} />
    </Section>
  );
}
