/**
 * ERP_BRANCH_IDS ("fergana:1,namangan:2") → slug → ERP Branch.id. Malformed
 * pairs (no id, non-integer, not positive) are skipped; the first valid pair
 * for a slug wins. Pure and import-free so tests and the site merge share it.
 */
export function parseBranchIdMap(envMap: string | undefined): Map<string, number> {
  const map = new Map<string, number>();
  for (const pair of (envMap ?? "").split(",")) {
    const [slug, raw] = pair.split(":").map((x) => x.trim());
    const id = Number(raw);
    if (slug && Number.isInteger(id) && id > 0 && !map.has(slug)) map.set(slug, id);
  }
  return map;
}

/**
 * Which ERP branch a website lead belongs to. The ERP id comes from the live
 * list when that branch has an `erpId`; otherwise from the env map
 * ERP_BRANCH_IDS ("fergana:1,namangan:2") — also when the slug is not in the
 * live list at all: a visitor on a stale or fallback-rendered page may have
 * chosen a branch the live list no longer has, and the lead must still reach
 * the branch they chose rather than be lost. Only a slug unknown to BOTH is
 * refused (null). Never defaults to the first branch.
 */
export function resolveErpBranchId(
  slug: unknown,
  branches: { id: string; erpId?: number }[],
  envMap: string | undefined,
): number | null {
  if (typeof slug !== "string" || !slug) return null;
  const live = branches.find((b) => b.id === slug)?.erpId;
  if (live) return live;
  return parseBranchIdMap(envMap).get(slug) ?? null;
}
