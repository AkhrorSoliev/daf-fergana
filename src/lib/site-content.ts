import { branches as fallback } from "@/data/branches";
import { parseSiteContent, type SiteBranch } from "@/lib/site-content-parse";

const REVALIDATE_SECONDS = 600;

/**
 * Branches and their prices from the ERP, cached for ten minutes. Any failure
 * — no env, timeout, non-200, an answer that fails validation — returns the
 * static copy, so the site never renders empty.
 */
export async function getBranches(): Promise<SiteBranch[]> {
  const url = process.env.ERP_API_URL;
  const key = process.env.ERP_WEBSITE_CONTENT_KEY;
  if (!url || !key) return fallback;
  try {
    const resp = await fetch(`${url.replace(/\/$/, "")}/public/website-content`, {
      headers: { "x-website-key": key },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) {
      console.error("ERP website-content:", resp.status);
      return fallback;
    }
    return parseSiteContent(await resp.json()) ?? fallback;
  } catch (error) {
    console.error("ERP website-content failed:", error);
    return fallback;
  }
}
