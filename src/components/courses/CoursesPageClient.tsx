"use client";

import { useState } from "react";
import { ArrowRight, Sprout, User, Zap } from "lucide-react";
import PageHead from "@/components/PageHead";
import CtaBand from "@/components/CtaBand";
import LeadButton from "@/components/LeadButton";
import { Section, HighlightLast } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { CourseCard } from "@/components/cards";
import { useLead } from "@/components/LeadProvider";
import { getCoursesByCategory, type CourseCategory } from "@/data/courses";
import { useI18n } from "@/i18n/I18nProvider";

const TABS: { value: CourseCategory; icon: React.ReactNode }[] = [
  { value: "Standard", icon: <Sprout /> },
  { value: "Intensive", icon: <Zap /> },
  { value: "Individual", icon: <User /> },
];

export default function CoursesPageClient() {
  const { t, locale } = useI18n();
  const openLead = useLead();
  const [cat, setCat] = useState<CourseCategory>("Standard");
  const label = (c: CourseCategory) => t(`courses.category.${c}.title`);

  return (
    <>
      <PageHead
        eyebrow={t("courses.badge")}
        title={<HighlightLast text={t("courses.title")} color="green" />}
        subtitle={`${t("courses.subtitle")} ${t("courses.subtitle2")}`}
      />
      <Section className="pt-0">
        <div className="mb-7 flex flex-col gap-3">
          <SegmentedControl
            size="lg"
            value={cat}
            onChange={(v) => setCat(v as CourseCategory)}
            options={TABS.map((x) => ({
              value: x.value,
              label: label(x.value),
              icon: x.icon,
            }))}
          />
          <p className="text-ink-3">{t(`courses.category.${cat}.desc`)}</p>
        </div>
        <div className="kit-grid-4">
          {getCoursesByCategory(cat).map((c) => (
            <CourseCard
              key={c.id}
              level={c.level}
              category={c.category}
              categoryLabel={label(c.category)}
              duration={c.duration[locale]}
              hours={c.hours}
              hoursLabel={t("courses.hours")}
              price={c.price}
              description={c.description[locale]}
              features={c.features[locale]}
              ctaLabel={t("courses.register")}
              onRegister={() =>
                openLead({
                  source: "Kurslar",
                  subtitle: `${t("courses.modal.selected")}: ${label(c.category)} ${c.level}`,
                })
              }
            />
          ))}
        </div>
      </Section>
      <CtaBand
        tone="sun"
        title={<HighlightLast text={t("courses.ctaTitle")} />}
      >
        <LeadButton size="lg" source="Kurslar">
          {t("courses.ctaButton")}
          <ArrowRight />
        </LeadButton>
      </CtaBand>
    </>
  );
}
