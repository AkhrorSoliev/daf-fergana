import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatPhone,
  formatPrice,
  isAllowedMapEmbed,
  mergeBranches,
  parseSiteContent,
  type ErpBranch,
  type SiteBranch,
} from "./site-content-parse.ts";
import { mapEmbedUrl } from "../data/branches.ts";

const branch = {
  id: 2,
  slug: "namangan",
  visible: true,
  cityUz: "Namangan",
  cityDe: "Namangan",
  address: "A. Xoʻjayev koʻchasi 38",
  phone: "883885550",
  email: "info@example.uz",
  telegramChannel: "https://t.me/NamDAFsprachzentrum",
  telegramAdmin: "https://t.me/NamDafsprachzentrum",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=abc",
  prices: [
    { category: "STANDARD", amount: 400000, currency: "UZS" },
    { category: "INDIVIDUAL", amount: 100, currency: "USD" },
  ],
};

const one = (over: Record<string, unknown>) =>
  parseSiteContent({ branches: [{ ...branch, ...over }] })?.[0];

// ---------- parseSiteContent ----------

test("a full valid branch round-trips unchanged", () => {
  assert.deepEqual(parseSiteContent({ branches: [branch] }), [branch]);
});

test("each invalid field alone becomes null, the rest survive", () => {
  const cases: [string, unknown][] = [
    ["slug", "Bad Slug"],
    ["cityUz", ""],
    ["cityDe", "x".repeat(101)],
    ["address", 5],
    ["phone", "12"],
    ["email", "not-an-email"],
    ["telegramChannel", "https://t.me.evil.example/x"],
    ["telegramAdmin", "https://evil.example/x"],
    ["mapEmbedUrl", "https://evil.example/x"],
  ];
  for (const [field, bad] of cases) {
    const out = one({ [field]: bad });
    assert.ok(out, field);
    assert.equal((out as Record<string, unknown>)[field], null, field);
    assert.deepEqual(
      { ...out, [field]: (branch as Record<string, unknown>)[field] },
      branch,
      `${field}: other fields must survive`,
    );
  }
});

test("a missing field is null", () => {
  const { phone: _p, ...rest } = branch;
  const out = parseSiteContent({ branches: [rest] })?.[0];
  assert.equal(out?.phone, null);
  assert.equal(out?.id, 2);
});

test("a branch with a bad id is skipped, its sibling kept", () => {
  for (const id of [0, -1, 1.5, "2", null, undefined]) {
    const out = parseSiteContent({ branches: [{ ...branch, id }, { ...branch, id: 7 }] });
    assert.deepEqual(out?.map((b) => b.id), [7], String(id));
  }
});

test("an empty list is valid; a non-object or missing branches is null", () => {
  assert.deepEqual(parseSiteContent({ branches: [] }), []);
  assert.equal(parseSiteContent({ nope: 1 }), null);
  assert.equal(parseSiteContent({ branches: "x" }), null);
  assert.equal(parseSiteContent("<html>502</html>"), null);
  assert.equal(parseSiteContent(null), null);
  assert.equal(parseSiteContent([branch]), null);
});

test("duplicate price categories keep the first; unknown or bad items are dropped", () => {
  const out = one({
    prices: [
      { category: "STANDARD", amount: 1, currency: "UZS" },
      { category: "STANDARD", amount: 2, currency: "UZS" },
      { category: "VIP", amount: 3, currency: "UZS" },
      { category: "INTENSIVE", amount: 3, currency: "EUR" },
      { category: "INTENSIVE", amount: -3, currency: "UZS" },
      { category: "INTENSIVE", amount: 1.5, currency: "UZS" },
      "junk",
    ],
  });
  assert.deepEqual(out?.prices, [{ category: "STANDARD", amount: 1, currency: "UZS" }]);
});

test("non-array prices become an empty list", () => {
  assert.deepEqual(one({ prices: "x" })?.prices, []);
});

test("visible is true only for the boolean true", () => {
  assert.equal(one({ visible: "true" })?.visible, false);
  assert.equal(one({ visible: 1 })?.visible, false);
  assert.equal(one({ visible: undefined })?.visible, false);
  assert.equal(one({ visible: true })?.visible, true);
});

test("reads at most 50 branches", () => {
  const many = Array.from({ length: 60 }, (_, i) => ({ ...branch, id: i + 1 }));
  assert.equal(parseSiteContent({ branches: many })?.length, 50);
});

// ---------- helpers ----------

test("isAllowedMapEmbed is an allowlist", () => {
  assert.equal(isAllowedMapEmbed("https://www.google.com/maps/embed?pb=1"), true);
  assert.equal(isAllowedMapEmbed("https://www.google.com/maps?q=a&output=embed"), true);
  assert.equal(isAllowedMapEmbed("https://yandex.uz/map-widget/v1/?z=16"), true);
  assert.equal(isAllowedMapEmbed("http://www.google.com/maps/embed"), false);
  assert.equal(isAllowedMapEmbed("https://www.google.com.evil.example/maps/embed"), false);
  assert.equal(isAllowedMapEmbed("javascript:alert(1)"), false);
});

test("formats prices and phones the way the site prints them", () => {
  assert.equal(formatPrice({ amount: 450000, currency: "UZS" }), "450 000 so'm");
  assert.equal(formatPrice({ amount: 100, currency: "USD" }), "100$");
  assert.equal(formatPhone("905351099"), "+998 90 535 10 99");
});

test("isAllowedMapEmbed rejects host confusion", () => {
  for (const url of [
    "https://www.google.com@evil.example/maps/embed",
    "https://u:p@www.google.com/maps/embed",
    "https://www.google.com:8443/maps/embed",
    "https://www.google.com./maps/embed",
    "https://yandex.uz.evil.example/map-widget/v1/",
    "https://evilyandex.uz/map-widget/v1/",
    "https://www.google.com/maps?q=a",
    "data:text/html,x",
  ]) {
    assert.equal(isAllowedMapEmbed(url), false, url);
  }
});

test("the address-based map fallback stays inside the allowlist", () => {
  assert.equal(
    isAllowedMapEmbed(mapEmbedUrl("Fargʻona", "Turkiston 22 #3 ?a=b&c")),
    true,
  );
});

// ---------- mergeBranches ----------

const base = (): SiteBranch[] => [
  {
    id: "fergana",
    city: { uz: "Fargʻona", de: "Fergana" },
    address: "Turkiston 22",
    phones: ["+998 90 535 10 99"],
    email: "info@daf.uz",
    telegramChannel: "https://t.me/daffergana",
    telegramAdmin: "https://t.me/daffergana",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=base",
    prices: {
      Standard: { amount: 450000, currency: "UZS" },
      Intensive: { amount: 740000, currency: "UZS" },
      Individual: { amount: 100, currency: "USD" },
    },
  },
  {
    id: "namangan",
    city: { uz: "Namangan", de: "Namangan" },
    address: "Xoʻjayev 38",
    phones: ["+998 88 388 55 50"],
    telegramChannel: "https://t.me/nam",
    telegramAdmin: "https://t.me/nam_admin",
    prices: {
      Standard: { amount: 450000, currency: "UZS" },
      Intensive: { amount: 740000, currency: "UZS" },
      Individual: { amount: 100, currency: "USD" },
    },
  },
];

const erpEmpty = (id: number, over: Partial<ErpBranch> = {}): ErpBranch => ({
  id,
  slug: null,
  visible: false,
  cityUz: null,
  cityDe: null,
  address: null,
  phone: null,
  email: null,
  telegramChannel: null,
  telegramAdmin: null,
  mapEmbedUrl: null,
  prices: [],
  ...over,
});

const ENV = "fergana:1,namangan:2";

/** Everything except `erpId` and the named keys must equal the base. */
function onlyChanged(out: SiteBranch, orig: SiteBranch, keys: (keyof SiteBranch)[]) {
  const strip = (b: SiteBranch) => {
    const c: Record<string, unknown> = { ...b };
    delete c.erpId;
    for (const k of keys) delete c[k];
    return c;
  };
  assert.deepEqual(strip(out), strip(orig));
}

test("only a Standard price changes only the Standard price", () => {
  const b = base();
  const out = mergeBranches(b, [erpEmpty(1, { prices: [{ category: "STANDARD", amount: 500000, currency: "UZS" }] })], ENV);
  assert.deepEqual(out[0].prices.Standard, { amount: 500000, currency: "UZS" });
  assert.deepEqual(out[0].prices.Intensive, base()[0].prices.Intensive);
  assert.deepEqual(out[0].prices.Individual, base()[0].prices.Individual);
  onlyChanged(out[0], base()[0], ["prices"]);
  assert.deepEqual(out[1], base()[1]);
});

test("ERP category names map to the site's", () => {
  const out = mergeBranches(
    base(),
    [
      erpEmpty(1, {
        prices: [
          { category: "INTENSIVE", amount: 800000, currency: "UZS" },
          { category: "INDIVIDUAL", amount: 120, currency: "USD" },
        ],
      }),
    ],
    ENV,
  );
  assert.deepEqual(out[0].prices.Intensive, { amount: 800000, currency: "UZS" });
  assert.deepEqual(out[0].prices.Individual, { amount: 120, currency: "USD" });
  assert.deepEqual(out[0].prices.Standard, base()[0].prices.Standard);
});

test("only an address changes only the address", () => {
  const out = mergeBranches(base(), [erpEmpty(1, { address: "New 5" })], ENV);
  assert.equal(out[0].address, "New 5");
  onlyChanged(out[0], base()[0], ["address"]);
});

test("only a map URL changes only the map", () => {
  const url = "https://www.google.com/maps/embed?pb=erp";
  const out = mergeBranches(base(), [erpEmpty(1, { mapEmbedUrl: url })], ENV);
  assert.equal(out[0].mapEmbedUrl, url);
  onlyChanged(out[0], base()[0], ["mapEmbedUrl"]);
});

test("a map URL off the allowlist is ignored, the base map stays", () => {
  const out = mergeBranches(base(), [erpEmpty(1, { mapEmbedUrl: "https://evil.example/x" })], ENV);
  assert.equal(out[0].mapEmbedUrl, base()[0].mapEmbedUrl);
});

test("a phone becomes a formatted phones list", () => {
  const out = mergeBranches(base(), [erpEmpty(2, { phone: "991112233" })], ENV);
  assert.deepEqual(out[1].phones, ["+998 99 111 22 33"]);
  onlyChanged(out[1], base()[1], ["phones"]);
});

test("city, email and Telegram links overlay field by field", () => {
  const out = mergeBranches(
    base(),
    [
      erpEmpty(1, {
        cityUz: "Yangi",
        cityDe: "Neu",
        email: "a@b.uz",
        telegramChannel: "https://t.me/new_channel",
        telegramAdmin: "https://t.me/new_admin",
      }),
    ],
    ENV,
  );
  assert.deepEqual(out[0].city, { uz: "Yangi", de: "Neu" });
  assert.equal(out[0].email, "a@b.uz");
  assert.equal(out[0].telegramChannel, "https://t.me/new_channel");
  assert.equal(out[0].telegramAdmin, "https://t.me/new_admin");
});

test("a slug match wins over an env-id match", () => {
  // env says namangan=2, but the ERP row with slug "namangan" is id 9
  const out = mergeBranches(
    base(),
    [erpEmpty(2, { address: "by id" }), erpEmpty(9, { slug: "namangan", address: "by slug" })],
    ENV,
  );
  assert.equal(out[1].address, "by slug");
  assert.equal(out[1].erpId, 9);
});

test("an ERP branch is used for at most one base branch", () => {
  const e = erpEmpty(1, { slug: "namangan", address: "X" });
  const out = mergeBranches(base(), [e], ENV); // fergana:1 would also match id 1
  assert.equal(out[1].address, "X");
  assert.equal(out[1].erpId, 1);
  assert.equal(out[0].erpId, undefined);
  assert.equal(out[0].address, base()[0].address);
});

test("an unknown, not visible ERP branch is ignored", () => {
  const e = erpEmpty(5, {
    slug: "tashkent", visible: false, cityUz: "T", address: "A", phone: "901234567", telegramChannel: "https://t.me/tash",
  });
  assert.deepEqual(mergeBranches(base(), [e], ENV), base());
});

test("a visible but incomplete unknown ERP branch is ignored", () => {
  const e = erpEmpty(5, {
    slug: "tashkent", visible: true, cityUz: "T", address: null, phone: "901234567", telegramChannel: "https://t.me/tash",
  });
  assert.equal(mergeBranches(base(), [e], ENV).length, 2);
});

test("a visible and complete unknown ERP branch is appended with defaults", () => {
  const e = erpEmpty(5, {
    slug: "tashkent", visible: true, cityUz: "Toshkent", address: "A 1", phone: "901234567",
    telegramChannel: "https://t.me/tash", prices: [{ category: "STANDARD", amount: 1, currency: "UZS" }],
  });
  const out = mergeBranches(base(), [e], ENV);
  assert.equal(out.length, 3);
  assert.deepEqual(out[2], {
    id: "tashkent",
    erpId: 5,
    city: { uz: "Toshkent", de: "Toshkent" },
    address: "A 1",
    phones: ["+998 90 123 45 67"],
    email: undefined,
    telegramChannel: "https://t.me/tash",
    telegramAdmin: "https://t.me/tash",
    mapEmbedUrl: undefined,
    prices: { Standard: { amount: 1, currency: "UZS" } },
  });
  assert.deepEqual(out.slice(0, 2), base());
});

test("an empty ERP list returns the base unchanged", () => {
  assert.deepEqual(mergeBranches(base(), [], ENV), base());
});

test("neither the base array nor its objects are mutated", () => {
  const b = base();
  const frozen = structuredClone(b);
  mergeBranches(b, [erpEmpty(1, { address: "Z", prices: [{ category: "STANDARD", amount: 9, currency: "UZS" }] })], ENV);
  assert.deepEqual(b, frozen);
});

test("a base branch with no ERP match has no erpId; a matched one has", () => {
  const out = mergeBranches(base(), [erpEmpty(1)], ENV);
  assert.equal(out[0].erpId, 1);
  assert.equal("erpId" in out[1], false);
});

test("a base branch cannot be hidden by the ERP", () => {
  const out = mergeBranches(base(), [erpEmpty(1, { visible: false })], ENV);
  assert.equal(out.length, 2);
  assert.equal(out[0].id, "fergana");
});

// ---------- hardening ----------

/** Runs fn with console.error captured; returns the logged lines. */
function captureErrors(fn: () => void): string[] {
  const lines: string[] = [];
  const orig = console.error;
  console.error = (...args: unknown[]) => void lines.push(args.join(" "));
  try {
    fn();
  } finally {
    console.error = orig;
  }
  return lines;
}

test("logs when a slug-matched ERP id differs from the env id, result unchanged", () => {
  let out: SiteBranch[] = [];
  const logs = captureErrors(() => {
    out = mergeBranches(base(), [erpEmpty(9, { slug: "namangan", address: "by slug" })], ENV);
  });
  assert.equal(out[1].erpId, 9);
  assert.equal(out[1].address, "by slug");
  assert.equal(logs.length, 1);
  assert.match(logs[0], /namangan/);
});

test("logs when a base branch's env id is used by an ERP branch matched to another", () => {
  let out: SiteBranch[] = [];
  const logs = captureErrors(() => {
    out = mergeBranches(base(), [erpEmpty(1, { slug: "namangan", address: "X" })], "fergana:1");
  });
  assert.equal(out[1].erpId, 1);
  assert.equal(out[1].address, "X");
  assert.equal(out[0].erpId, undefined);
  assert.ok(logs.some((l) => /fergana/.test(l)), logs.join("|"));
});

test("a consistent slug and env id logs nothing", () => {
  const logs = captureErrors(() => {
    mergeBranches(base(), [erpEmpty(1, { slug: "fergana" }), erpEmpty(2)], ENV);
  });
  assert.deepEqual(logs, []);
});

test("an ERP branch whose slug is a base id is not appended", () => {
  const dup = erpEmpty(5, {
    slug: "fergana", visible: true, cityUz: "T", address: "A", phone: "901234567", telegramChannel: "https://t.me/tash",
  });
  // fergana is already claimed by id 1 via slug, so id 5 is the unmatched duplicate
  const out = mergeBranches(base(), [erpEmpty(1, { slug: "fergana" }), dup], ENV);
  assert.deepEqual(out.map((b) => b.id), ["fergana", "namangan"]);
});

test("two unknown ERP branches with the same slug: only the first is appended", () => {
  const mk = (id: number, address: string) =>
    erpEmpty(id, {
      slug: "tashkent", visible: true, cityUz: "T", address, phone: "901234567", telegramChannel: "https://t.me/tash",
    });
  const out = mergeBranches(base(), [mk(5, "first"), mk(6, "second")], ENV);
  assert.deepEqual(out.map((b) => b.id), ["fergana", "namangan", "tashkent"]);
  assert.equal(out[2].address, "first");
  assert.equal(out[2].erpId, 5);
});

test("whitespace-only text fields become null and the base value is kept", () => {
  const [p] = parseSiteContent({ branches: [{ ...branch, cityUz: "   ", address: " \n " }] })!;
  assert.equal(p.cityUz, null);
  assert.equal(p.address, null);
  const out = mergeBranches(base(), [{ ...p, id: 1, slug: null }], ENV);
  assert.deepEqual(out[0].city, { uz: base()[0].city.uz, de: "Namangan" });
  assert.equal(out[0].address, base()[0].address);
});

test("text fields are trimmed", () => {
  assert.equal(one({ cityUz: "  Namangan  " })?.cityUz, "Namangan");
  assert.equal(one({ address: "\tA 1 " })?.address, "A 1");
});

test("an absurd price amount is ignored, a valid sibling kept", () => {
  const out = one({
    prices: [
      { category: "STANDARD", amount: 1e15, currency: "UZS" },
      { category: "INTENSIVE", amount: 740000, currency: "UZS" },
    ],
  });
  assert.deepEqual(out?.prices, [{ category: "INTENSIVE", amount: 740000, currency: "UZS" }]);
  assert.equal(one({ prices: [{ category: "STANDARD", amount: 100_000_000, currency: "UZS" }] })?.prices.length, 1);
  assert.equal(one({ prices: [{ category: "STANDARD", amount: 100_000_001, currency: "UZS" }] })?.prices.length, 0);
});

test("a 50-item prices array does not throw and yields at most one price per category", () => {
  const prices = Array.from({ length: 50 }, (_, i) => ({
    category: ["STANDARD", "INTENSIVE", "INDIVIDUAL"][i % 3],
    amount: i + 1,
    currency: "UZS",
  }));
  const out = one({ prices });
  assert.equal(out?.prices.length, 3);
  assert.deepEqual(out?.prices.map((p) => p.amount), [1, 2, 3]);
});

test("only the first 10 price items are read", () => {
  const junk = Array.from({ length: 10 }, () => "junk");
  const out = one({ prices: [...junk, { category: "STANDARD", amount: 5, currency: "UZS" }] });
  assert.deepEqual(out?.prices, []);
});

// ---------- end to end, production-shaped ----------

test("production-shaped answer: ERP with almost nothing filled leaves the site as it is", async () => {
  const { branches: real } = await import("../data/branches.ts");
  const { resolveErpBranchId } = await import("./lead-branch.ts");
  const realBefore = structuredClone(real);
  const row = (id: number, phone: string, prices: unknown[] = []) => ({
    id, slug: null, visible: false, cityUz: null, cityDe: null, address: null, phone,
    email: null, telegramChannel: null, telegramAdmin: null, mapEmbedUrl: null, prices,
  });
  const body = {
    branches: [
      row(1, "905351099", [
        { category: "STANDARD", amount: 300000, currency: "UZS" },
        { category: "INTENSIVE", amount: 350000, currency: "UZS" },
        { category: "INDIVIDUAL", amount: 200, currency: "USD" },
      ]),
      row(2, "883885550"),
      row(3, "996682518"),
      row(4, "883885550"),
    ],
  };
  const env = "fergana:1,namangan:2,qarshi:3";
  const out = mergeBranches(real, parseSiteContent(body)!, env);

  assert.deepEqual(out.map((b) => [b.id, b.erpId]), [["fergana", 1], ["namangan", 2], ["qarshi", 3]]);
  const without = (b: SiteBranch, ...keys: string[]) => {
    const c: Record<string, unknown> = { ...b };
    for (const k of ["erpId", ...keys]) delete c[k];
    return c;
  };
  const [fe, na, qa] = out;
  assert.deepEqual(without(fe, "prices"), without(real[0], "prices"));
  assert.deepEqual(fe.prices, {
    Standard: { amount: 300000, currency: "UZS" },
    Intensive: { amount: 350000, currency: "UZS" },
    Individual: { amount: 200, currency: "USD" },
  });
  assert.deepEqual(without(na), without(real[1]));
  assert.deepEqual(without(qa, "phones"), without(real[2], "phones"));
  assert.deepEqual(qa.phones, ["+998 99 668 25 18"]);

  assert.equal(resolveErpBranchId("fergana", out, env), 1);
  assert.equal(resolveErpBranchId("namangan", out, env), 2);
  assert.equal(resolveErpBranchId("qarshi", out, env), 3);
  assert.equal(resolveErpBranchId("tashkent", out, env), null);
  assert.deepEqual(real, realBefore);
});
