"use client";

import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

type Sec = { title?: string; text?: string; items?: string[]; note?: string; email?: string; phone?: string };
const ORDER = ["collected", "purpose", "storage", "thirdParty", "rights", "cookies", "changes", "contact"];

export default function PrivacyPageClient() {
  const { t, locale } = useI18n();
  const s = (dictionaries[locale].privacy as unknown as { sections: Record<string, Sec> }).sections;

  return (
    <>
      <PageHead narrow eyebrow={t("privacy.lastUpdated")} title={<HighlightLast text={t("privacy.title")} />} />
      <Section narrow className="pt-0">
        <p className="mb-10 text-[length:var(--fs-body-lg)] leading-[1.55] text-ink-2">{t("privacy.intro")}</p>
        <div className="flex flex-col gap-3">
          {ORDER.map((k, i) => {
            const x = s[k];
            if (!x) return null;
            return (
              <section
                key={k}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-[18px] gap-y-2.5 rounded-[26px] border border-line bg-white p-[clamp(20px,3vw,28px)]"
              >
                <span className="font-serif text-[34px] leading-[0.9] italic text-green-600">{i + 1}</span>
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-xl leading-tight font-semibold tracking-[-0.015em]">
                    {x.title?.replace(/^\d+\.\s*/, "")}
                  </h2>
                  {x.text && <p className="leading-[1.6] text-ink-2">{x.text}</p>}
                  {x.items && (
                    <ul className="m-0 flex list-disc flex-col gap-1 pl-[18px] leading-[1.6] text-ink-2">
                      {x.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )}
                  {x.email && <p className="leading-[1.6] text-ink-2">{x.email}</p>}
                  {x.phone && <p className="leading-[1.6] text-ink-2">{x.phone}</p>}
                  {x.note && <p className="text-sm leading-[1.55] text-ink-3">{x.note}</p>}
                </div>
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}
