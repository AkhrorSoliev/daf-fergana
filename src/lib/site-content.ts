import { branches as fallback } from "@/data/branches";
import { mergeBranches, parseSiteContent, type SiteBranch } from "@/lib/site-content-parse";

const REVALIDATE_SECONDS = 600;

/**
 * The site's own branches with whatever the ERP has valid overlaid field by
 * field, cached for ten minutes. Any failure — no env, timeout, non-200, a body
 * that is not `{ branches: [...] }` — returns the static list, so the site
 * never renders empty.
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
    const parsed = parseSiteContent(await resp.json());
    if (!parsed) {
      console.error("ERP website-content: answer failed validation, using static copy");
      return fallback;
    }
    return mergeBranches(fallback, parsed, process.env.ERP_BRANCH_IDS);
  } catch (error) {
    console.error("ERP website-content failed:", error);
    return fallback;
  }
}
