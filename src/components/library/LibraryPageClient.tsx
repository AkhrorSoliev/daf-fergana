"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, ExternalLink, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { books, parseTitle } from "@/data/books";

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
    <div className="min-h-screen pt-16">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            {t("library.badge")}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {t("library.title")}
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t("library.subtitle")}
          </p>
        </div>

        {/* Telegram notice */}
        <div className="mb-8">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
            <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">
              {t("library.telegramNotice")}
            </p>
            <Button
              asChild
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a
                href="https://t.me/daf_bibliothek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t("library.telegramCta")}</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("library.searchPlaceholder")}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder={t("library.levelPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">{t("library.levelAll")}</SelectItem>
                  <SelectItem value="a1">A1</SelectItem>
                  <SelectItem value="a2">A2</SelectItem>
                  <SelectItem value="b1">B1</SelectItem>
                  <SelectItem value="b2">B2</SelectItem>
                  <SelectItem value="c1">C1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder={t("library.typePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">{t("library.typeAll")}</SelectItem>
                  <SelectItem value="kursbuch">
                    {t("library.types.kursbuch")}
                  </SelectItem>
                  <SelectItem value="\u00fcbungsbuch">
                    {t("library.types.\u00fcbungsbuch")}
                  </SelectItem>
                  <SelectItem value="w\u00f6rterbuch">
                    {t("library.types.w\u00f6rterbuch")}
                  </SelectItem>
                  <SelectItem value="dictionary">
                    {t("library.types.dictionary")}
                  </SelectItem>
                  <SelectItem value="grammar">
                    {t("library.types.grammar")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((book) => (
            <Card
              key={book.title}
              className="overflow-hidden p-0 border border-border/60"
            >
              <div className="relative aspect-[2/3] bg-muted">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-bottom"
                  priority={false}
                />
              </div>
              <div className="p-4 flex flex-col gap-3">
                {(() => {
                  const parsed = parseTitle(book.title);
                  const levelTypeTitle = [parsed.level, parsed.type]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div className="flex flex-col gap-1">
                      {levelTypeTitle ? (
                        <>
                          <h3 className="font-semibold text-base md:text-lg leading-snug line-clamp-2">
                            {levelTypeTitle}
                          </h3>
                          {parsed.main && (
                            <span className="text-xs text-foreground/70 line-clamp-1">
                              {parsed.main}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <h3 className="font-semibold text-base md:text-lg leading-snug line-clamp-2">
                            {parsed.main}
                          </h3>
                          {parsed.type && (
                            <span className="text-xs text-foreground/60">
                              {parsed.type}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}
                <div className="flex flex-wrap gap-2 mt-1">
                  <Button
                    asChild
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a
                      href={book.dropbox}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("library.view")}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-700 hover:bg-blue-50"
                  >
                    <a
                      href={book.dropbox.replace(/dl=0$/, "dl=1")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("library.download")}
                    </a>
                  </Button>
                  {book.media && (
                    <Button asChild size="sm" variant="ghost">
                      <a
                        href={book.media}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${book.title} Audio and Media`}
                      >
                        <Headphones className="w-4 h-4" />
                        <span>{t("library.audioMedia")}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
