"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TeacherCard, type CardTone } from "@/components/cards";
import { useI18n } from "@/i18n/I18nProvider";
import { teachers } from "@/data/teachers";
import { cityById } from "@/data/branches";
import { useBranches } from "@/components/SiteContentProvider";
import { teacherPhoto } from "@/utils/teacher";

const TONES: CardTone[] = ["sun", "sky", "green", "coral"];

export default function TeachersSection() {
  const { t, locale } = useI18n();
  const branches = useBranches();
  return (
    <Section tone="white" inset>
      <SectionHeader
        eyebrow={t("teachers.badge")}
        title={<HighlightLast text={t("teachers.title")} color="sky" />}
        subtitle={t("teachers.subtitle")}
        action={
          <Button asChild variant="secondary">
            <Link href="/oqituvchilar">
              {t("home.allTeachers")}
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="kit-scroll kit-scroll-sm">
        {teachers.slice(0, 4).map((tc, i) => {
          const city = cityById(branches, tc.branch, locale);
          return (
            <TeacherCard
              key={tc.slug}
              name={tc.name}
              photo={teacherPhoto(tc.slug, tc.branch)}
              role={city ? `${tc.degree} · ${city}${locale === "uz" ? " filiali" : ""}` : tc.degree}
              featured={tc.slug === "herr-jamsher"}
              featuredLabel={t("teachers.featured")}
              tone={TONES[i % TONES.length]}
              href={`/oqituvchilar/${tc.slug}`}
            />
          );
        })}
      </div>
    </Section>
  );
}
