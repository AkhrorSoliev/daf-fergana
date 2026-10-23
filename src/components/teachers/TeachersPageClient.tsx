"use client";

import { useMemo, useState } from "react";
import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TeacherCard, type CardTone } from "@/components/cards";
import LeadButton from "@/components/LeadButton";
import { teachers } from "@/data/teachers";
import { branches, branchCity } from "@/data/branches";
import { teacherPhoto } from "@/utils/teacher";
import { useI18n } from "@/i18n/I18nProvider";

const TONES: CardTone[] = ["sun", "sky", "green", "coral", "lilac"];
const FEATURED = new Set(["herr-jamsher", "herr-lazizjon"]);
const BRANCHES_WITH_TEACHERS = branches.filter((b) => teachers.some((x) => x.branch === b.id));

/** Fergana: herr-doston and frau-sakina are listed right after herr-umarov. */
function reorderFergana(list: typeof teachers) {
  const move = new Set(["herr-doston", "frau-sakina"]);
  const at = list.findIndex((t) => t.slug === "herr-umarov");
  if (at === -1) return list;
  const moved = list.filter((t) => move.has(t.slug));
  const rest = list.filter((t) => !move.has(t.slug));
  const i = Math.min(at + 1, rest.length);
  return [...rest.slice(0, i), ...moved, ...rest.slice(i)];
}

export default function TeachersPageClient() {
  const { t, locale } = useI18n();
  const [branch, setBranch] = useState("all");

  const list = useMemo(
    () => [
      ...reorderFergana(teachers.filter((x) => x.branch === "fergana")),
      ...teachers.filter((x) => x.branch !== "fergana"),
    ].filter((x) => branch === "all" || x.branch === branch),
    [branch],
  );

  return (
    <>
      <PageHead
        eyebrow={t("teachers.badge")}
        title={<HighlightLast text={t("teachers.title")} color="sky" />}
        subtitle={t("teachers.subtitle")}
      />
      <Section className="pt-0">
        <div className="mb-7">
          <SegmentedControl
            value={branch}
            onChange={setBranch}
            options={[
              { value: "all", label: t("home.allTeachers") },
              ...BRANCHES_WITH_TEACHERS.map((b) => ({ value: b.id, label: branchCity(b, locale) })),
            ]}
          />
        </div>
        <div className="kit-grid-4">
          {list.map((tc, i) => {
            const city = branchCity(branches.find((b) => b.id === tc.branch)!, locale);
            return (
              <TeacherCard
                key={tc.slug}
                name={tc.name}
                photo={teacherPhoto(tc.slug, tc.branch)}
                role={`${tc.degree} · ${city}${locale === "uz" ? " filiali" : ""}`}
                featured={FEATURED.has(tc.slug)}
                featuredLabel={t("teachers.featured")}
                tone={TONES[i % TONES.length]}
                href={`/oqituvchilar/${tc.slug}`}
              />
            );
          })}
        </div>
      </Section>
      <Section tone="sun" inset className="py-[clamp(40px,6vw,72px)]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-[length:var(--fs-h2)] leading-[1.05] font-semibold tracking-[-0.035em]">{t("teachers.meetTeacher")}</h2>
            <p className="text-ink-2">{t("teachers.consultationSubtitle")}</p>
          </div>
          <LeadButton size="lg" source="O'qituvchilar">
            {t("teachers.consultation")}
          </LeadButton>
        </div>
      </Section>
    </>
  );
}
