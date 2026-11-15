import { z } from "zod";
import { parseBranchIdMap } from "./lead-branch.ts";

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

/** One branch as `GET /public/website-content` returns it; every field but `id` may be null. */
export type ErpBranch = {
  id: number;
  slug: string | null;
  visible: boolean;
  cityUz: string | null;
  cityDe: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  telegramChannel: string | null;
  telegramAdmin: string | null;
  mapEmbedUrl: string | null;
  prices: { category: string; amount: number; currency: "UZS" | "USD" }[];
};

const MAX_ERP_BRANCHES = 50;
const MAX_PRICE_ITEMS = 10;
const MAX_PRICE = 100_000_000;

const telegram = z.string().regex(/^https:\/\/t\.me\/[A-Za-z0-9_]{3,64}$/);
const idSchema = z.number().int().positive();
const slugSchema = z.string().regex(/^[a-z][a-z0-9-]{1,30}$/);
const phoneSchema = z.string().regex(/^\d{9}$/);
const emailSchema = z.email();
const mapSchema = z.string().max(2000).refine(isAllowedMapEmbed);
const priceSchema = z.object({
  category: z.enum(["STANDARD", "INTENSIVE", "INDIVIDUAL"]),
  amount: z.number().int().positive().max(MAX_PRICE),
  currency: z.enum(["UZS", "USD"]),
});

/** The value when it passes the schema, otherwise null — one bad field never costs the branch. */
function field(schema: z.ZodType<string>, value: unknown): string | null {
  const r = schema.safeParse(value);
  return r.success ? r.data : null;
}
const text = (max: number) => z.string().trim().min(1).max(max);

function parsePrices(value: unknown): ErpBranch["prices"] {
  const out: ErpBranch["prices"] = [];
  if (!Array.isArray(value)) return out;
  for (const item of value.slice(0, MAX_PRICE_ITEMS)) {
    const p = priceSchema.safeParse(item);
    if (p.success && !out.some((o) => o.category === p.data.category)) out.push(p.data);
  }
  return out;
}

/**
 * ERP answer → tolerant list. null only when the body is not `{ branches: [...] }`
 * (the caller then uses the static list); a branch with a bad id is skipped and
 * every other bad field becomes null.
 */
export function parseSiteContent(json: unknown): ErpBranch[] | null {
  if (typeof json !== "object" || json === null || !("branches" in json)) return null;
  const list = json.branches;
  if (!Array.isArray(list)) return null;
  const out: ErpBranch[] = [];
  for (const raw of list.slice(0, MAX_ERP_BRANCHES)) {
    const b = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};
    const id = idSchema.safeParse(b.id);
    if (!id.success) continue;
    out.push({
      id: id.data,
      slug: field(slugSchema, b.slug),
      visible: b.visible === true,
      cityUz: field(text(100), b.cityUz),
      cityDe: field(text(100), b.cityDe),
      address: field(text(300), b.address),
      phone: field(phoneSchema, b.phone),
      email: field(emailSchema, b.email),
      telegramChannel: field(telegram, b.telegramChannel),
      telegramAdmin: field(telegram, b.telegramAdmin),
      mapEmbedUrl: field(mapSchema, b.mapEmbedUrl),
      prices: parsePrices(b.prices),
    });
  }
  return out;
}

function pricesFrom(e: ErpBranch): SiteBranch["prices"] {
  const prices: SiteBranch["prices"] = {};
  for (const p of e.prices) {
    const category = CATEGORY[p.category];
    if (category) prices[category] = { amount: p.amount, currency: p.currency };
  }
  return prices;
}

/**
 * Overlay ERP data on the site's own branches: each valid ERP field replaces
 * the base field, everything else stays. Pure — never mutates its inputs.
 */
export function mergeBranches(
  base: SiteBranch[],
  erp: ErpBranch[],
  envMap: string | undefined,
): SiteBranch[] {
  const ids = parseBranchIdMap(envMap);
  // Slug matches are settled for every base branch before any env-id match, so
  // a slug match always wins and an ERP branch serves at most one base branch.
  const match = new Map<string, ErpBranch>();
  const used = new Set<ErpBranch>();
  const claim = (b: SiteBranch, e: ErpBranch | undefined) => {
    if (!e || used.has(e) || match.has(b.id)) return;
    match.set(b.id, e);
    used.add(e);
  };
  for (const b of base) claim(b, erp.find((x) => x.slug === b.id));
  for (const b of base) claim(b, erp.find((x) => x.id === ids.get(b.id)));

  // Disagreement between the slug and the env map is served as matched; log it so it gets noticed.
  for (const b of base) {
    const e = match.get(b.id);
    const envId = ids.get(b.id);
    if (e && envId && e.slug === b.id && e.id !== envId) {
      console.error(`ERP website-content: ${b.id} matched ERP ${e.id} by slug but ERP_BRANCH_IDS says ${envId}`);
    }
    const other = envId ? base.find((o) => o.id !== b.id && match.get(o.id)?.id === envId) : undefined;
    if (other) {
      console.error(`ERP website-content: ERP ${envId} (ERP_BRANCH_IDS for ${b.id}) is matched to ${other.id}`);
    }
  }

  const merged = base.map((b) => {
    const e = match.get(b.id);
    if (!e) return b;
    return {
      ...b,
      erpId: e.id,
      city: { uz: e.cityUz ?? b.city.uz, de: e.cityDe ?? b.city.de },
      address: e.address ?? b.address,
      phones: e.phone ? [formatPhone(e.phone)] : b.phones,
      ...(e.email && { email: e.email }),
      telegramChannel: e.telegramChannel ?? b.telegramChannel,
      telegramAdmin: e.telegramAdmin ?? b.telegramAdmin,
      // second check: the site never trusts an iframe URL it did not verify itself
      ...(e.mapEmbedUrl && isAllowedMapEmbed(e.mapEmbedUrl) && { mapEmbedUrl: e.mapEmbedUrl }),
      prices: { ...b.prices, ...pricesFrom(e) },
    };
  });
  const added: SiteBranch[] = [];
  const taken = new Set(base.map((b) => b.id));
  for (const e of erp) {
    if (used.has(e) || !e.visible) continue;
    if (!e.slug || !e.cityUz || !e.address || !e.phone || !e.telegramChannel) continue;
    if (taken.has(e.slug)) continue;
    taken.add(e.slug);
    added.push({
      id: e.slug,
      erpId: e.id,
      city: { uz: e.cityUz, de: e.cityDe ?? e.cityUz },
      address: e.address,
      phones: [formatPhone(e.phone)],
      email: e.email ?? undefined,
      telegramChannel: e.telegramChannel,
      telegramAdmin: e.telegramAdmin ?? e.telegramChannel,
      mapEmbedUrl: e.mapEmbedUrl && isAllowedMapEmbed(e.mapEmbedUrl) ? e.mapEmbedUrl : undefined,
      prices: pricesFrom(e),
    });
  }
  return [...merged, ...added];
}
