import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatPhone,
  formatPrice,
  isAllowedMapEmbed,
  parseSiteContent,
} from "./site-content-parse.ts";
import { mapEmbedUrl } from "../data/branches.ts";

const branch = {
  id: 2,
  slug: "namangan",
  cityUz: "Namangan",
  cityDe: "Namangan",
  address: "A. Xoʻjayev koʻchasi 38",
  phone: "883885550",
  email: null,
  telegramChannel: "https://t.me/NamDAFsprachzentrum",
  telegramAdmin: "https://t.me/NamDafsprachzentrum",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=abc",
  prices: [
    { category: "STANDARD", amount: 400000, currency: "UZS" },
    { category: "INDIVIDUAL", amount: 100, currency: "USD" },
  ],
};

test("maps an ERP branch to the shape the site components use", () => {
  assert.deepEqual(parseSiteContent({ branches: [branch] }), [
    {
      id: "namangan",
      erpId: 2,
      city: { uz: "Namangan", de: "Namangan" },
      address: "A. Xoʻjayev koʻchasi 38",
      phones: ["+998 88 388 55 50"],
      email: undefined,
      telegramChannel: "https://t.me/NamDAFsprachzentrum",
      telegramAdmin: "https://t.me/NamDafsprachzentrum",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=abc",
      prices: {
        Standard: { amount: 400000, currency: "UZS" },
        Individual: { amount: 100, currency: "USD" },
      },
    },
  ]);
});

test("returns null for an empty or malformed answer so the caller falls back", () => {
  assert.equal(parseSiteContent({ branches: [] }), null);
  assert.equal(parseSiteContent({ nope: 1 }), null);
  assert.equal(parseSiteContent("<html>502</html>"), null);
  assert.equal(parseSiteContent({ branches: [{ ...branch, phone: "12" }] }), null);
});

test("drops a map URL from a host that is not allowed, keeps the branch", () => {
  const out = parseSiteContent({
    branches: [{ ...branch, mapEmbedUrl: "https://evil.example/x" }],
  });
  assert.equal(out?.[0].mapEmbedUrl, undefined);
  assert.equal(out?.[0].id, "namangan");
});

test("rejects a telegram link outside t.me", () => {
  assert.equal(
    parseSiteContent({
      branches: [{ ...branch, telegramChannel: "https://t.me.evil.example/x" }],
    }),
    null,
  );
});

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

test("parseSiteContent returns null for an off-allowlist telegramAdmin", () => {
  assert.equal(
    parseSiteContent({
      branches: [{ ...branch, telegramAdmin: "https://evil.example/x" }],
    }),
    null,
  );
});

test("the address-based map fallback stays inside the allowlist", () => {
  assert.equal(
    isAllowedMapEmbed(mapEmbedUrl("Fargʻona", "Turkiston 22 #3 ?a=b&c")),
    true,
  );
});
