import type { SiteBranch, SitePrice, CourseCategory } from "@/lib/site-content-parse";

export type Locale = "uz" | "de";
export type Branch = SiteBranch;

// Fallback used when the ERP is unreachable. ponytail: can go stale — update
// it when a price changes for good; the ERP stays the source of truth.
const FALLBACK_PRICES: Partial<Record<CourseCategory, SitePrice>> = {
  Standard: { amount: 450000, currency: "UZS" },
  Intensive: { amount: 740000, currency: "UZS" },
  Individual: { amount: 100, currency: "USD" },
};

export function branchCity(branch: Branch, locale: Locale): string {
  return branch.city[locale];
}

export const branches: Branch[] = [
  {
    id: "fergana",
    city: { uz: "Farg\u02BBona", de: "Fergana" },
    address: "Turkiston ko\u02BBchasi 22",
    phones: ["+99 890 535 10 99"],
    email: "info@daf-sprachzentrum.uz",
    telegramChannel: "https://t.me/daffergana",
    telegramAdmin: "https://t.me/daffergana",
    prices: FALLBACK_PRICES,
  },
  {
    id: "namangan",
    city: { uz: "Namangan", de: "Namangan" },
    address: "A. Xo\u02BBjayev ko\u02BBchasi 38",
    phones: ["+998 88 388 55 50"],
    telegramChannel: "https://t.me/NamDAFsprachzentrum",
    telegramAdmin: "https://t.me/NamDafsprachzentrum",
    prices: FALLBACK_PRICES,
  },
  {
    id: "qarshi",
    city: { uz: "Qarshi", de: "Karshi" },
    address: "Qarshi shahri",
    phones: ["+998 97 294 90 06"],
    telegramChannel: "https://t.me/daf_qarshi",
    telegramAdmin: "https://t.me/Laziz_9006",
    prices: FALLBACK_PRICES,
  },
];

export function mapSearchUrl(city: string, address: string): string {
  const q = encodeURIComponent(`${city}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function mapEmbedUrl(city: string, address: string): string {
  const q = encodeURIComponent(`${city}, ${address}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

/** City of a branch by slug; "" when the ERP no longer publishes that branch. */
export function cityById(list: Branch[], id: string, locale: Locale): string {
  return list.find((b) => b.id === id)?.city[locale] ?? "";
}
