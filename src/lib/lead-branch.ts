/**
 * Which ERP branch a website lead belongs to. The visitor picked a branch in
 * the form; the lead must land in THAT branch's «Sayt» section or be refused —
 * never silently in the first branch.
 */
export function resolveErpBranchId(
  slug: unknown,
  branches: { id: string; erpId?: number }[],
  envMap: string | undefined,
): number | null {
  if (typeof slug !== "string" || !slug) return null;
  const branch = branches.find((b) => b.id === slug);
  if (!branch) return null;
  if (branch.erpId) return branch.erpId;

  // Static fallback list (ERP unreachable): ERP_BRANCH_IDS="fergana:1,namangan:2".
  const pair = (envMap ?? "")
    .split(",")
    .map((p) => p.split(":").map((x) => x.trim()))
    .find(([k]) => k === slug);
  const id = Number(pair?.[1]);
  return Number.isInteger(id) && id > 0 ? id : null;
}
