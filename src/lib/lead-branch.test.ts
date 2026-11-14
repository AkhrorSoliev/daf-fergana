import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveErpBranchId } from "./lead-branch.ts";

const erp = [
  { id: "fergana", erpId: 1 },
  { id: "namangan", erpId: 2 },
];
const staticOnly = [{ id: "fergana" }, { id: "qarshi" }];
const env = "fergana:1,namangan:2,qarshi:3";

test("uses the ERP id of the chosen branch", () => {
  assert.equal(resolveErpBranchId("namangan", erp, env), 2);
});

test("falls back to the env map when the ERP list is the static copy", () => {
  assert.equal(resolveErpBranchId("qarshi", staticOnly, env), 3);
});

test("an unknown or missing branch is null, never the first branch", () => {
  assert.equal(resolveErpBranchId("tashkent", erp, env), null);
  assert.equal(resolveErpBranchId(undefined, erp, env), null);
  assert.equal(resolveErpBranchId("", erp, env), null);
  assert.equal(resolveErpBranchId({ id: 1 }, erp, env), null);
});

test("a branch the site does not list is refused even if the env knows it", () => {
  assert.equal(resolveErpBranchId("qarshi", erp, env), null);
});
