"use client";

import { SegmentedControl } from "@/components/ui/segmented-control";
import { useI18n } from "@/i18n/I18nProvider";

const OPTIONS = [
  { value: "uz", label: "UZ" },
  { value: "de", label: "DE" },
];

export default function LanguageSwitch({
  tone = "light",
  className,
}: {
  tone?: "light" | "ink";
  className?: string;
}) {
  const { locale, setLocale } = useI18n();
  return (
    <SegmentedControl
      size="sm"
      tone={tone}
      options={OPTIONS}
      value={locale}
      onChange={(v) => setLocale(v as "uz" | "de")}
      className={className}
    />
  );
}
