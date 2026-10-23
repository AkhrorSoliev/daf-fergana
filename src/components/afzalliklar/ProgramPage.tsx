"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, HeartHandshake, Info, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Button, IconButton } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Section, HighlightLast } from "@/components/ui/section";
import type { CardTone } from "@/components/cards";
import CtaBand from "@/components/CtaBand";
import { dictionaries } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { PROGRAMS, plainTitle } from "./programs";

type Rec = Record<string, unknown>;
const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
const str = (v: unknown) => (typeof v === "string" ? v : "");

type Block = { title: string; text?: string; items?: string[] };
type View = {
  intro: { title: string; text: string }[];
  blocks: Block[];
  process?: { title: string; items: string[] };
  help: string[];
  faq?: { q: string; a: string }[];
  note?: { title?: string; text: string };
};

/** Maps each program's dictionary section onto the shared page layout. */
function buildView(dict: string, d: Rec, c: Rec): View {
  const L = (k: string) => str(c[k]);
  const list = (title: string, k: string): Block => ({ title, items: arr(d[k]) });
  const what = { title: L("whatIsIt"), text: str(d.whatDesc) };
  const procItems = arr(d.processItems);
  const help = arr(d.helpItems);
  const docs = list(L("documents"), "docItems");

  switch (dict) {
    case "bachelorMaster":
      return {
        intro: [what, { title: L("whyGermany"), text: str(d.whyGermanyDesc) }, { title: L("opportunities"), text: str(d.opportunitiesDesc) }],
        blocks: [list(L("langReq"), "langItems"), list(L("academicReq"), "academicItems"), docs, list(L("importantDates"), "dateItems")],
        process: { title: L("admissionProcess"), items: procItems },
        help,
        note: { text: str(d.financeNote) },
      };
    case "ausbildung":
      return {
        intro: [what, { title: L("advantagesTitle"), text: str(d.advantagesDesc) }, { title: L("salaryAndDuration"), text: str(d.salaryDesc) }],
        blocks: [list(L("directions"), "directionItems"), list(L("langReq"), "langItems"), list(L("entryReq"), "entryItems"), list(L("salary"), "salaryItems"), docs],
        process: { title: L("process"), items: procItems },
        help,
      };
    case "aupair":
    case "fsjBfd":
      return {
        intro: [what],
        blocks: [list(L("langReq"), "langItems"), list(L("conditions"), "conditionItems"), list(L("advantagesTitle"), "advantageItems"), docs],
        process: { title: L("process"), items: procItems },
        help,
      };
    case "ferienjob":
    case "saisonarbeit":
      return {
        intro: [what],
        blocks: [list(L("requirements"), "reqItems"), list(L("conditions"), "conditionItems"), list(L("advantagesTitle"), "advantageItems"), docs],
        process: { title: L("process"), items: procItems },
        help,
      };
    case "mutaxassisIshi":
      return {
        intro: [what],
        blocks: [list(L("langReq"), "langItems"), list(str(d.diplomTitle), "diplomItems"), list(L("advantagesTitle"), "advantageItems"), docs],
        process: { title: str(d.jobProcessTitle), items: arr(d.jobProcessItems) },
        help,
      };
    case "weiterbildung":
      return {
        intro: [],
        blocks: (["what", "dev", "types", "foreign", "apply"] as const).map((p) => ({
          title: str(d[`${p}Title`]),
          text: str(d[`${p}Desc`]),
          items: arr(d[`${p}Items`]),
        })),
        help: [],
      };
    case "consulting": {
      const f = (d.faq ?? {}) as Rec;
      return {
        intro: [],
        blocks: [list(str(d.whoTitle), "whoItems"), list(str(d.langTitle), "langItems"), list(str(d.whatTitle), "whatItems")],
        process: { title: str(d.processTitle), items: arr(d.processItems) },
        help: [],
        faq: [1, 2, 3, 4].map((i) => ({ q: str(f[`q${i}`]), a: str(f[`a${i}`]) })).filter((x) => x.q),
        note: { title: str(d.resultTitle), text: str(d.resultDesc) },
      };
    }
    default:
      return { intro: [what], blocks: [], help };
  }
}

const BLOCK_TINTS = ["bg-sun-100", "bg-sky-100", "bg-green-100", "bg-lilac-100"];
const TONE_INK: Record<CardTone, string> = {
  green: "text-green-ink",
  sun: "text-sun-ink",
  coral: "text-coral-ink",
  sky: "text-sky-ink",
  lilac: "text-lilac-ink",
};

export default function ProgramPage({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const idx = Math.max(0, PROGRAMS.findIndex((p) => p.slug === slug));
  const p = PROGRAMS[idx];
  const next = PROGRAMS[(idx + 1) % PROGRAMS.length];
  const afz = dictionaries[locale].afzalliklar as unknown as Record<string, Rec>;
  const view = buildView(p.dict, afz[p.dict], afz.common);
  const ink = TONE_INK[p.tone];
  const title = (key: string, kicker: string) => plainTitle(t(`advantages.items.${key}.title`), kicker);

  return (
    <>
      <Section tone={p.tone} inset className="pt-[clamp(28px,6vw,72px)] pb-[clamp(36px,6vw,72px)]">
        <Button asChild variant="ghost" size="sm" className="-ml-3 mb-6">
          <Link href="/afzalliklar">
            <ArrowLeft />
            {t("advantages.badge")}
          </Link>
        </Button>
        <div className="flex max-w-[780px] flex-col gap-[18px]">
          <span className={cn("grid size-14 place-items-center rounded-[18px] bg-white [&_svg]:size-7", ink)}>
            <p.Icon />
          </span>
          <h1 className="text-[length:var(--fs-display)] leading-[0.98] font-semibold tracking-[-0.035em]">
            <Highlight className={ink}>{p.kicker}</Highlight>
            <br />
            {title(p.key, p.kicker)}
          </h1>
          <p className="text-[length:var(--fs-body-lg)] leading-[1.55] text-ink-2">{t(`afzalliklar.${p.dict}.subtitle`)}</p>
          <Badge tone="white" icon={<HeartHandshake />} className="self-start">
            {t("afzalliklar.common.partnership")}
          </Badge>
        </div>
      </Section>

      <Section>
        {view.intro.length > 0 && (
          <div className={cn("grid gap-8 md:gap-10", view.intro.length > 1 ? "md:grid-cols-3" : "max-w-[760px]", view.blocks.length > 0 && "mb-[clamp(40px,6vw,72px)]")}>
            {view.intro.map((x) => (
              <div key={x.title} className="flex flex-col gap-2.5">
                <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.02em]">{x.title}</h3>
                <p className="text-base leading-[1.6] text-ink-2">{x.text}</p>
              </div>
            ))}
          </div>
        )}

        {view.blocks.length > 0 && (
          <div className="kit-grid-2">
            {view.blocks.map((b, i) => (
              <div key={b.title} className={cn("flex flex-col gap-[18px] rounded-[30px] p-[clamp(22px,4vw,32px)]", BLOCK_TINTS[i % 4])}>
                <h3 className="text-2xl leading-[1.15] font-semibold tracking-[-0.02em]">{b.title}</h3>
                {b.text && <p className="leading-[1.6] text-ink-2">{b.text}</p>}
                {b.items && b.items.length > 0 && (
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {b.items.map((x) => (
                      <li key={x} className="flex gap-3 text-base leading-[1.45] font-medium">
                        <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-white text-ink">
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {view.process && view.process.items.length > 0 && (
          <>
            <h2 className="mt-[clamp(48px,8vw,96px)] mb-7 text-[length:var(--fs-h2)] leading-[1.05] font-semibold tracking-[-0.035em]">
              <HighlightLast text={view.process.title} color="green" />
            </h2>
            <div className={view.process.items.length > 4 ? "kit-grid-3" : "kit-grid-4"}>
              {view.process.items.map((s, i) => (
                <div key={s} className="flex flex-col gap-7 rounded-[28px] border border-line bg-white p-6">
                  <span className={cn("font-serif text-[56px] leading-[0.8] italic", ink)}>0{i + 1}</span>
                  <span className="text-base leading-[1.45] font-medium">{s}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {(view.help.length > 0 || view.faq || view.note) && (
          <div className="kit-split mt-[clamp(48px,8vw,96px)]">
            {view.help.length > 0 ? (
              <div className="flex flex-col gap-[18px] rounded-[30px] bg-ink p-[clamp(22px,4vw,32px)] text-white">
                <h3 className="text-2xl leading-[1.15] font-semibold">
                  <HighlightLast text={t("afzalliklar.common.ourHelp")} color="green" />
                </h3>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {view.help.map((h) => (
                    <li key={h} className="flex gap-3 text-base leading-[1.45] font-medium">
                      <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-green-500 text-ink">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="hidden md:block" />
            )}
            {view.faq && view.faq.length > 0 ? (
              <Accordion items={view.faq.map((x) => ({ q: x.q, a: x.a }))} />
            ) : view.note ? (
              <div className="flex gap-3.5 rounded-[30px] border-[1.5px] border-dashed border-line-strong p-[clamp(22px,4vw,32px)]">
                <Info className="mt-0.5 size-[22px] shrink-0 text-sky-ink" />
                <div className="flex flex-col gap-2">
                  {view.note.title && <h3 className="text-xl font-semibold">{view.note.title}</h3>}
                  <p className="leading-[1.6] text-ink-2">{view.note.text}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Section>

      <CtaBand tone="ink" title={<HighlightLast text={t("afzalliklar.common.freeConsultation")} color="green" />}>
        <Button asChild variant="accent" size="lg">
          <a href="https://t.me/dafferganaadmin" target="_blank" rel="noopener noreferrer">
            {t("afzalliklar.common.contactGerman")}
            <ArrowRight />
          </a>
        </Button>
        <Button asChild variant="inverse" size="lg">
          <a href="https://t.me/Consulting_UZB" target="_blank" rel="noopener noreferrer">
            <Send />
            {t("afzalliklar.common.consultingTelegram")}
          </a>
        </Button>
      </CtaBand>

      <Section className="py-[clamp(40px,6vw,64px)]">
        <Link href={`/afzalliklar/${next.slug}`} className="flex items-center justify-between gap-4 text-ink no-underline hover:text-ink">
          <span className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-[0.08em] text-ink-3 uppercase">{t("advantages.detail")}</span>
            <span className="text-[length:var(--fs-h2)] leading-[1.05] font-semibold tracking-[-0.035em]">
              <Highlight>{next.kicker}</Highlight> — {title(next.key, next.kicker)}
            </span>
          </span>
          <IconButton asChild label="Next" variant="primary" size="lg">
            <span>
              <ArrowRight />
            </span>
          </IconButton>
        </Link>
      </Section>
    </>
  );
}
