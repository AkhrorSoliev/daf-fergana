"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Locale, getFromDict } from "./dictionaries";

type I18nContextValue = {
  locale: Locale;
  t: (path: string) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "uz";
  try {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "uz" || saved === "de") return saved;
  } catch {}

  // Enhanced language detection
  const nav = navigator.language.toLowerCase();
  const languages = navigator.languages?.map((lang) => lang.toLowerCase()) || [
    nav,
  ];

  // Check for German variants
  for (const lang of languages) {
    if (lang.startsWith("de")) return "de";
  }

  // Check for Uzbek variants
  for (const lang of languages) {
    if (lang.startsWith("uz")) return "uz";
  }

  // Check for Russian (common in Uzbekistan)
  for (const lang of languages) {
    if (lang.startsWith("ru")) return "uz"; // Default to Uzbek for Russian speakers
  }

  return "uz";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale());

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  const t = useMemo(() => {
    const dict = dictionaries[locale];
    return (path: string) => getFromDict(dict, path);
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t, setLocale: setLocaleState }),
    [locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
