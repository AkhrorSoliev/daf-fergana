"use client";

import Link from "next/link";
import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { RESULT_PHOTO_BASE, RESULT_POSTS } from "@/data/natijalar";
import { useI18n } from "@/i18n/I18nProvider";

const PHOTOS = RESULT_POSTS.slice(0, 20).map((p) => p.photos[0]);

/** Result photos drifting across without end; every photo leads to the results page. */
export default function ResultsSection() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader
        eyebrow={t("about.resultsBadge")}
        title={<HighlightLast text={t("results.homeTitle")} color="coral" />}
        action={
          <Button variant="secondary" asChild>
            <Link href="/natijalar">{t("results.all")}</Link>
          </Button>
        }
      />
      {/* full-bleed strip; the list is rendered twice so a -50% shift loops seamlessly */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-[marquee-50_90s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) =>
            PHOTOS.map((p) => (
              <Link
                key={copy + p.file}
                href="/natijalar"
                aria-hidden={copy === 1}
                tabIndex={copy === 1 ? -1 : undefined}
                aria-label={t("results.all")}
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
                className="mr-3 block h-[240px] shrink-0 overflow-hidden rounded-[22px] bg-paper-2 sm:h-[320px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={RESULT_PHOTO_BASE + p.file} alt="" loading="lazy" className="size-full object-cover" />
              </Link>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
