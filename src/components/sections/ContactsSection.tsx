"use client";

import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { BranchCard } from "@/components/cards";
import { useI18n } from "@/i18n/I18nProvider";
import { branches, branchCity, mapSearchUrl } from "@/data/branches";
import { useBranchParam } from "@/hooks/useBranchParam";

export default function ContactsSection() {
  const { t, locale } = useI18n();
  const [active, setActive] = useBranchParam();
  return (
    <Section>
      <SectionHeader
        eyebrow={t("contactsSection.badge")}
        title={<HighlightLast text={t("contactsSection.title")} color="sky" />}
        subtitle={t("contactsSection.subtitle")}
      />
      <div className="kit-grid-3">
        {branches.map((b) => (
          <BranchCard
            key={b.id}
            city={branchCity(b, locale)}
            address={b.address}
            phone={b.phones[0]}
            email={b.email}
            telegram={b.telegramChannel}
            mapHref={mapSearchUrl(branchCity(b, locale), b.address)}
            active={active === b.id}
            onSelect={() => setActive(b.id)}
            callLabel={t("contactsSection.call")}
          />
        ))}
      </div>
    </Section>
  );
}
