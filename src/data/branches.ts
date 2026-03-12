export type Locale = "uz" | "de";

export type Branch = {
  id: string;
  city: { uz: string; de: string };
  name?: string;
  address: string;
  phones: string[];
  email?: string;
  telegramChannel: string;
  telegramAdmin: string;
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
  },
  {
    id: "namangan",
    city: { uz: "Namangan", de: "Namangan" },
    address: "A. Xo\u02BBjayev ko\u02BBchasi 38",
    phones: ["+998 88 388 55 50"],
    telegramChannel: "https://t.me/NamDAFsprachzentrum",
    telegramAdmin: "https://t.me/NamDafsprachzentrum",
  },
  {
    id: "qarshi",
    city: { uz: "Qarshi", de: "Karshi" },
    address: "Qarshi shahri",
    phones: ["+998 97 294 90 06"],
    telegramChannel: "https://t.me/daf_qarshi",
    telegramAdmin: "https://t.me/Laziz_9006",
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
