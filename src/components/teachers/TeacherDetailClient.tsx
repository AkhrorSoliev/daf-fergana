"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use as usePromise } from "react";
import { ArrowLeft, ArrowRight, GraduationCap, MapPin, Send, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { Highlight } from "@/components/ui/highlight";
import { TeacherCard, type CardTone } from "@/components/cards";
import LeadButton from "@/components/LeadButton";
import { getTeacherBySlug, teachers } from "@/data/teachers";
import { branches, branchCity } from "@/data/branches";
import { teacherPhoto } from "@/utils/teacher";
import { useI18n } from "@/i18n/I18nProvider";

const HIGHLIGHT_RE =
  /\b(201\d|202\d|yil|yillar)\b|DAAD|Aupair|magistr|bakalavr|universitet|C1|C2|B1|B2|Sommerschule|Akyıldız|Harvard|mutaxassisligi|FarDU|FDU|Ferienjob/i;
// Teachers whose intro/summary lines duplicate the highlight tiles; lines are dropped from the bio.
const TRIM_BIO = new Set(["herr-jamsher", "frau-saida", "frau-iroda", "herr-umarov", "frau-sakina", "herr-doston"]);
const INTRO_PHRASES = ["tanishaylik"];
const EXTRA_PHRASES: Record<string, string[]> = { "frau-saida": ["2 yildan buyon daf sprachzentrumda"] };

type Props = { params: Promise<{ slug: string }> };

export default function TeacherDetailClient({ params }: Props) {
  const { t, locale } = useI18n();
  const { slug } = usePromise(params);
  const teacher = getTeacherBySlug(slug);
  if (!teacher) return notFound();

  const bioLines = (teacher.bio[locale] || teacher.bio.uz)
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  // short highlight lines become fact tiles; long ones stay in the biography
  const highlights = bioLines.filter((l) => HIGHLIGHT_RE.test(l) && l.length <= 100);
  const phrases = [...INTRO_PHRASES, ...(EXTRA_PHRASES[teacher.slug] ?? [])];
  const biography = TRIM_BIO.has(teacher.slug)
    ? bioLines.filter((line) => {
        const low = line.toLowerCase();
        return !highlights.some((h) => low.includes(h.toLowerCase())) && !phrases.some((p) => low.includes(p));
      })
    : bioLines;

  const city = branchCity(branches.find((b) => b.id === teacher.branch)!, locale);
  const featured = teacher.slug === "herr-jamsher" || teacher.slug === "herr-lazizjon";
  const [first, ...rest] = teacher.name.split(" ");
  const others = teachers.filter((x) => x.slug !== teacher.slug && x.branch === teacher.branch).slice(0, 4);
  const tones: CardTone[] = ["sky", "green", "coral", "lilac"];

  return (
    <>
      <Section className="pt-[clamp(24px,4vw,48px)]">
        <Button asChild variant="ghost" size="sm" className="-ml-3 mb-5">
          <Link href="/oqituvchilar">
            <ArrowLeft />
            {t("teachers.backToTeachers")}
          </Link>
        </Button>
        <div className="kit-profile">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-sun-100 lg:sticky lg:top-24">
            <Image
              src={teacherPhoto(teacher.slug, teacher.branch)}
              alt={teacher.name}
              fill
              priority
              unoptimized
              sizes="(min-width:900px) 40vw, 100vw"
              className={teacher.slug === "herr-jamsher" ? "object-cover object-[25%_center]" : "object-cover"}
            />
          </div>
          <div className="flex flex-col gap-[22px]">
            <div className="flex flex-wrap gap-2">
              {featured && (
                <Badge tone="sun" icon={<Star />}>
                  {t("teachers.featured")}
                </Badge>
              )}
              <Badge tone="white" icon={<MapPin />} className="border border-line">
                {city}
              </Badge>
              <Badge tone="white" icon={<GraduationCap />} className="border border-line">
                {teacher.degree} · {teacher.level}
              </Badge>
            </div>
            <h1 className="text-[length:var(--fs-h1)] leading-[1.02] font-semibold tracking-[-0.035em]">
              {first} <Highlight color="green">{rest.join(" ")}</Highlight>
            </h1>
            {highlights.length > 0 && (
              <div className="kit-facts">
                {highlights.map((h) => (
                  <div key={h}>
                    <span>{t("teachers.mainInfo")}</span>
                    <strong>{h}</strong>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-3.5 text-[length:var(--fs-body-lg)] leading-[1.55] text-ink-2">
              {biography.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="kit-cta">
              <LeadButton variant="accent" size="lg" source="O'qituvchi">
                {t("teachers.consultation")}
                <ArrowRight />
              </LeadButton>
              <Button asChild variant="secondary" size="lg">
                <a href="https://t.me/daffergana" target="_blank" rel="noopener noreferrer">
                  <Send />
                  Telegram
                </a>
              </Button>
            </div>
            <p className="text-sm leading-normal text-ink-3">{t("teachers.additionalInfo")}</p>
          </div>
        </div>
      </Section>
      {others.length > 0 && (
        <Section tone="white" inset>
          <SectionHeader title={<>{t("teachers.title")}</>} />
          <div className="kit-scroll kit-scroll-sm">
            {others.map((o, i) => (
              <TeacherCard
                key={o.slug}
                name={o.name}
                photo={teacherPhoto(o.slug, o.branch)}
                role={`${o.degree} · ${city}${locale === "uz" ? " filiali" : ""}`}
                tone={tones[i % tones.length]}
                href={`/oqituvchilar/${o.slug}`}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
