"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards";
import { useLead } from "@/components/LeadProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { getCoursesByCategory, type CourseCategory } from "@/data/courses";

const CATEGORIES: CourseCategory[] = ["Standard", "Intensive", "Individual"];

export default function CoursesSection() {
  const { t, locale } = useI18n();
  const openLead = useLead();
  const [cat, setCat] = useState<CourseCategory>("Standard");
  const label = (c: CourseCategory) => t(`courses.category.${c}.title`);

  return (
    <Section tone="green" inset>
      <SectionHeader
        eyebrow={t("courses.badge")}
        title={<HighlightLast text={t("courses.title")} />}
        subtitle={t(`courses.category.${cat}.desc`)}
        action={
          <SegmentedControl
            value={cat}
            onChange={(v) => setCat(v as CourseCategory)}
            options={CATEGORIES.map((c) => ({ value: c, label: label(c) }))}
          />
        }
      />
      <div className="kit-scroll">
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
                askBranch: true,
                level: `${c.category} - ${c.level}`,
                subtitle: `${t("courses.modal.selected")}: ${label(c.category)} ${c.level}`,
              })
            }
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/kurslar">
            {t("home.allCourses")}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
