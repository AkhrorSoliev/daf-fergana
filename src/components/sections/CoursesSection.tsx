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
import { useBranches } from "@/components/SiteContentProvider";
import { useBranchParam } from "@/hooks/useBranchParam";
import { branchCity } from "@/data/branches";
import { formatPrice } from "@/lib/site-content-parse";

const CATEGORIES: CourseCategory[] = ["Standard", "Intensive", "Individual"];

export default function CoursesSection() {
  const { t, locale } = useI18n();
  const openLead = useLead();
  const branches = useBranches();
  const [branchId, setBranchId] = useBranchParam();
  const branch = branches.find((b) => b.id === branchId) ?? branches[0];
  // A branch with no prices at all shows every type, without a price.
  const priced = CATEGORIES.filter((c) => branch.prices[c]);
  const categories = priced.length ? priced : CATEGORIES;
  const [picked, setCat] = useState<CourseCategory>("Standard");
  const cat = branch.prices[picked] ? picked : (categories[0] ?? picked);
  const price = branch.prices[cat];
  const label = (c: CourseCategory) => t(`courses.category.${c}.title`);

  return (
    <Section tone="green" inset>
      <SectionHeader
        eyebrow={t("courses.badge")}
        title={<HighlightLast text={t("courses.title")} />}
        subtitle={t(`courses.category.${cat}.desc`)}
        action={
          <div className="flex flex-col items-end gap-2">
            {branches.length > 1 && (
              <SegmentedControl
                size="sm"
                value={branch.id}
                onChange={setBranchId}
                options={branches.map((b) => ({
                  value: b.id,
                  label: branchCity(b, locale),
                }))}
              />
            )}
            <SegmentedControl
              value={cat}
              onChange={(v) => setCat(v as CourseCategory)}
              options={categories.map((c) => ({ value: c, label: label(c) }))}
            />
          </div>
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
            price={price ? formatPrice(price) : undefined}
            description={c.description[locale]}
            features={c.features[locale]}
            ctaLabel={t("courses.register")}
            onRegister={() =>
              openLead({
                source: "Kurslar",
                branch: branch.id,
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
