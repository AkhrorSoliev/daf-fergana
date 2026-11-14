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

test("a branch missing from the live list still resolves through the env map", () => {
  assert.equal(resolveErpBranchId("qarshi", erp, env), 3);
});

test("the ERP id wins over the env", () => {
  assert.equal(resolveErpBranchId("namangan", erp, "namangan:9"), 2);
});

test("malformed env entries give null for a slug with no erpId", () => {
  for (const bad of ["qarshi:", "qarshi:abc", "qarshi:-3", "qarshi:3.5", undefined]) {
    assert.equal(resolveErpBranchId("qarshi", staticOnly, bad), null, String(bad));
  }
});

test("whitespace in the env map is tolerated", () => {
  assert.equal(resolveErpBranchId("qarshi", erp, " fergana:1 , qarshi : 3 "), 3);
});
