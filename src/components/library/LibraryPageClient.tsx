"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useI18n } from "@/i18n/I18nProvider";
import { books, parseTitle } from "@/data/books";
import BookCard from "./BookCard";

const LEVELS = ["a1", "a2", "b1", "b2", "c1"];
const TYPES = ["kursbuch", "\u00fcbungsbuch", "w\u00f6rterbuch", "dictionary", "grammar"];

export default function LibraryPageClient() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const parsed = parseTitle(b.title);
      const fields = [b.title, parsed.main, parsed.level, parsed.type]
        .filter(Boolean)
        .map((v) => String(v).toLowerCase());
      const matchesQuery = q ? fields.some((f) => f.includes(q)) : true;

      const levelNorm = (parsed.level ?? "").toLowerCase();
      const matchesLevel =
        levelFilter === "all" ||
        levelNorm === levelFilter ||
        levelNorm.startsWith(levelFilter + "-");

      const typeNorm = (parsed.type ?? "").toLowerCase();
      const titleNorm = b.title.toLowerCase();
      let titleTypeHit = false;
      switch (typeFilter) {
        case "all":
          titleTypeHit = true;
          break;
        case "kursbuch":
          titleTypeHit = /kursbuch/.test(titleNorm);
          break;
        case "\u00fcbungsbuch":
          titleTypeHit = /(\u00fcbungsbuch|ubungsbuch)/.test(titleNorm);
          break;
        case "w\u00f6rterbuch":
          titleTypeHit = /(w\u00f6rterbuch|woerterbuch)/.test(titleNorm);
          break;
        case "dictionary":
          titleTypeHit = /(dictionary|lug['\u2018\u2019`]?at|lugat)/.test(titleNorm);
          break;
        case "grammar":
          titleTypeHit = /(grammar|grammatik|grammatika)/.test(titleNorm);
          break;
        default:
          titleTypeHit = false;
      }
      const matchesType =
        typeFilter === "all" || typeNorm === typeFilter || titleTypeHit;

      return matchesQuery && matchesLevel && matchesType;
    });
  }, [query, levelFilter, typeFilter]);

  return (
    <>
      <PageHead
        eyebrow={t("library.badge")}
        title={<HighlightLast text={t("library.title")} color="green" />}
        subtitle={t("library.subtitle")}
      />
      <Section className="pt-0">
        <div className="mb-8 flex flex-col gap-3">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("library.searchPlaceholder")}
            aria-label={t("library.searchPlaceholder")}
          />
          <div className="flex flex-wrap gap-2.5">
            <SegmentedControl
              size="sm"
              value={levelFilter}
              onChange={setLevelFilter}
              options={[{ value: "all", label: t("library.levelAll") }, ...LEVELS.map((l) => ({ value: l, label: l.toUpperCase() }))]}
            />
            <SegmentedControl
              size="sm"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[{ value: "all", label: t("library.typeAll") }, ...TYPES.map((k) => ({ value: k, label: t(`library.types.${k}`) }))]}
            />
          </div>
        </div>
        {filtered.length ? (
          <div className="kit-books">
            {filtered.map((b) => {
              const p = parseTitle(b.title);
              return (
                <BookCard
                  key={b.title}
                  title={b.title}
                  cover={b.cover}
                  level={p.level}
                  type={p.type}
                  viewHref={b.dropbox}
                  downloadHref={b.dropbox.replace(/dl=0$/, "dl=1")}
                  mediaHref={b.media}
                  labels={{ view: t("library.view"), download: t("library.download"), media: t("library.audioMedia") }}
                />
              );
            })}
          </div>
        ) : (
          <p className="py-12 text-center text-ink-3">{t("library.empty") || "—"}</p>
        )}
      </Section>
      <Section tone="sky" inset className="py-[clamp(36px,5vw,56px)]">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-[560px] text-[length:clamp(17px,1.8vw,20px)] leading-[1.45] font-medium">{t("library.telegramNotice")}</p>
          <Button asChild size="lg">
            <a href="https://t.me/daf_bibliothek" target="_blank" rel="noopener noreferrer">
              <Send />
              {t("library.telegramCta")}
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}
