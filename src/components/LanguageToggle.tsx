"use client";

// update 07.10.2025
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const next = locale === "uz" ? "de" : "uz";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">(test)</span>
      <button
        onClick={() => setLocale(next)}
        className="p-2 rounded-lg border border-border hover:bg-muted/60 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label={`Switch to ${next === "uz" ? "Uzbek" : "German"}`}
        title={`Switch to ${next === "uz" ? "O'zbek" : "Deutsch"}`}
      >
        <Image
          src={`/flags/${
            next === "uz" ? "Flag_of_Uzbekistan.svg" : "Flag_of_Germany.svg"
          }`}
          alt={`${next === "uz" ? "Uzbek" : "German"} flag`}
          width={24}
          height={18}
          unoptimized={true}
          className="object-cover w-6 h-auto"
        />
      </button>
    </div>
  );
}
