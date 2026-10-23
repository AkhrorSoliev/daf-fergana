const MONTHS = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
} as const;

/** "2025-10-10" → "10 oktabr 2025" / "10. Oktober 2025". Manual (not Intl) so server and browser ICU data cannot disagree. */
export function formatDate(iso: string, locale: "uz" | "de"): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const month = MONTHS[locale][m - 1];
  return locale === "de" ? `${d}. ${month} ${y}` : `${d} ${month} ${y}`;
}
