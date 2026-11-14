import { z } from "zod";

export type CourseCategory = "Individual" | "Intensive" | "Standard";
export type SitePrice = { amount: number; currency: "UZS" | "USD" };
export type SiteBranch = {
  /** Slug used in `?branch=` and by the static teacher data. */
  id: string;
  /** ERP Branch.id — where a lead from this branch is sent. */
  erpId?: number;
  city: { uz: string; de: string };
  name?: string;
  address: string;
  phones: string[];
  email?: string;
  telegramChannel: string;
  telegramAdmin: string;
  mapEmbedUrl?: string;
  prices: Partial<Record<CourseCategory, SitePrice>>;
};

const CATEGORY: Record<string, CourseCategory> = {
  STANDARD: "Standard",
  INTENSIVE: "Intensive",
  INDIVIDUAL: "Individual",
};

const YANDEX_HOSTS = new Set(["yandex.uz", "yandex.com", "yandex.ru"]);

/** Second check of the same allowlist the ERP applies — the site never trusts an iframe URL it did not verify itself. */
export function isAllowedMapEmbed(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) {
    return false;
  }
  if (url.hostname === "www.google.com") {
    return (
      url.pathname.startsWith("/maps/embed") ||
      (url.pathname === "/maps" && url.searchParams.get("output") === "embed")
    );
  }
  return YANDEX_HOSTS.has(url.hostname) && url.pathname.startsWith("/map-widget/");
}

export function formatPhone(digits9: string): string {
  const d = digits9;
  return `+998 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`;
}

export function formatPrice(price: SitePrice): string {
  const n = String(price.amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return price.currency === "USD" ? `${n}$` : `${n} so'm`;
}

const telegram = z.string().regex(/^https:\/\/t\.me\/[A-Za-z0-9_]{3,64}$/);

const branchSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().regex(/^[a-z][a-z0-9-]{1,30}$/),
  cityUz: z.string().min(1).max(100),
  cityDe: z.string().min(1).max(100),
  address: z.string().min(1).max(300),
  phone: z.string().regex(/^\d{9}$/),
  email: z.string().email().nullable(),
  telegramChannel: telegram,
  telegramAdmin: telegram,
  mapEmbedUrl: z.string().max(2000).nullable(),
  prices: z
    .array(
      z.object({
        category: z.enum(["STANDARD", "INTENSIVE", "INDIVIDUAL"]),
        amount: z.number().int().positive(),
        currency: z.enum(["UZS", "USD"]),
      }),
    )
    .max(3),
});

const contentSchema = z.object({ branches: z.array(branchSchema).min(1).max(50) });

/** ERP answer → site shape; null means "do not use this answer". */
export function parseSiteContent(json: unknown): SiteBranch[] | null {
  const parsed = contentSchema.safeParse(json);
  if (!parsed.success) return null;
  return parsed.data.branches.map((b) => {
    const prices: SiteBranch["prices"] = {};
    for (const p of b.prices) {
      prices[CATEGORY[p.category]] = { amount: p.amount, currency: p.currency };
    }
    return {
      id: b.slug,
      erpId: b.id,
      city: { uz: b.cityUz, de: b.cityDe },
      address: b.address,
      phones: [formatPhone(b.phone)],
      email: b.email ?? undefined,
      telegramChannel: b.telegramChannel,
      telegramAdmin: b.telegramAdmin,
      mapEmbedUrl:
        b.mapEmbedUrl && isAllowedMapEmbed(b.mapEmbedUrl)
          ? b.mapEmbedUrl
          : undefined,
      prices,
    };
  });
}
