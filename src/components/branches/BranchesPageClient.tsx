"use client";

import PageHead from "@/components/PageHead";
import { Section } from "@/components/ui/section";
import { HighlightLast } from "@/components/ui/section";
import { BranchCard } from "@/components/cards";
import { branches, branchCity, mapSearchUrl } from "@/data/branches";
import { useI18n } from "@/i18n/I18nProvider";

export default function BranchesPageClient() {
  const { t, locale } = useI18n();
  return (
    <>
      <PageHead title={<HighlightLast text={t("branches.title")} color="sky" />} subtitle={t("branches.subtitle")} />
      <Section className="pt-0">
        <div className="kit-grid-3">
          {branches.map((b) => {
            const city = branchCity(b, locale);
            return (
              <BranchCard
                key={b.id}
                city={b.name ? `${city} — ${b.name}` : city}
                address={b.address}
                phone={b.phones[0]}
                email={b.email}
                telegram={b.telegramChannel}
                mapHref={mapSearchUrl(city, b.address)}
                callLabel={t("contactsSection.call")}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
