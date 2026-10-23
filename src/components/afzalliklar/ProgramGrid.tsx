"use client";

import { ProgramCard } from "@/components/cards";
import { useI18n } from "@/i18n/I18nProvider";
import { PROGRAMS, plainTitle } from "./programs";

/** 9 program cards, shared by the home page and /afzalliklar. */
export default function ProgramGrid() {
  const { t } = useI18n();
  return (
    <div className="kit-grid-3">
      {PROGRAMS.map(({ key, slug, Icon, kicker, tone }) => (
        <ProgramCard
          key={key}
          href={`/afzalliklar/${slug}`}
          icon={<Icon />}
          kicker={kicker}
          title={plainTitle(t(`advantages.items.${key}.title`), kicker)}
          description={t(`advantages.items.${key}.desc`)}
          tone={tone}
        />
      ))}
    </div>
  );
}
