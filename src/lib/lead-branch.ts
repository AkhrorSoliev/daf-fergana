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

  const pair = (envMap ?? "")
    .split(",")
    .map((p) => p.split(":").map((x) => x.trim()))
    .find(([k]) => k === slug);
  const id = Number(pair?.[1]);
  return Number.isInteger(id) && id > 0 ? id : null;
}
