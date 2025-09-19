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

type Book = {
  title: string;
  cover: string;
  dropbox: string;
  media?: string;
};

type ParsedTitle = {
  main: string;
  level?: string;
  type?: string;
};

function parseTitle(raw: string): ParsedTitle {
  const title = raw.trim();
  const levelRegex = /\b([ABC][12](?:\s*[-–]\s*[ABC]?[12])?)\b/i;
  const levelMatch = title.match(levelRegex);
  const level = levelMatch ? levelMatch[1].replace(/\s*/g, "") : undefined;

  const typeRegex =
    /(Kursbuch|Übungsbuch|Ubungsbuch|Dictionary|Grammar|Wörterbuch|Woerterbuch)/i;
  const typeMatch = title.match(typeRegex);
  let type = typeMatch ? typeMatch[1] : undefined;
  if (type === "Ubungsbuch") type = "Übungsbuch";
  if (type === "Woerterbuch") type = "Wörterbuch";

  // Fallback inference for localized titles when type keyword is missing
  if (!type) {
    const t = title.toLowerCase();
    if (/(lug[’'‘`]?at|lugat|w[öo]rterbuch)/.test(t)) {
      type = "Dictionary";
    } else if (/(grammatik|grammatika)/.test(t)) {
      type = "Grammar";
    }
  }

  let main = title;
  if (level) main = main.replace(levelRegex, "");
  if (typeMatch) main = main.replace(typeRegex, "");
  main = main
    .replace(/\s*[-–]\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  return { main, level, type };
}

const books: Book[] = [
  {
    title: "Netzwerk Neu - A1 - Kursbuch",
    cover:
      "https://avatars.mds.yandex.net/get-mpic/12523390/2a0000019524abac5270e4cb9ef6cb3fe347/orig",
    dropbox:
      "https://www.dropbox.com/scl/fi/glf0j0t3enjk6npntyndp/Netzwerk-Neu-A1-Kursbuch.pdf?rlkey=7ulk2qatap1p8mq50843l3ap3&st=d7prlds6&dl=0",
    media: "https://www.allango.net/product/MAXP-607156/aug/978-3-12-607156-7",
  },
  {
    title: "Netzwerk Neu - A1 - Übungsbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1690409757/klett/cover/9783126071574.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/n855tcugskpgw94vhbvxu/Netzwerk-Neu-A1-bungsbuch.pdf?rlkey=jjn4yqnfzg2nyn8jkfbej0fy5&st=730xyqec&dl=0",
    media: "https://www.allango.net/product/MAXP-607157/aug/978-3-12-607157-4",
  },
  {
    title: "Netzwerk Neu - A2 - Kursbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1591222501/klett/cover/9783126071642.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/bpw71qh8i019ah2o8osya/Netzwerk-Neu-A2-Kursbuch.pdf?rlkey=ex1l5fm62f2n4zi0hy7v5pzm6&st=qgew8k8i&dl=0",
    media: "https://www.allango.net/product/MAXP-607164/aug/978-3-12-607164-2",
  },
  {
    title: "Netzwerk Neu - A2 - Übungsbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1693260971/klett/cover/9783126071659.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/9eczkwoeax1wd5vbq74s6/Netzwerk-Neu-A2-Ubungsbuch.pdf?rlkey=d3iy3znzqikerf6u8z4sezg0z&st=vgw6ugyh&dl=0",
    media: "https://www.allango.net/product/MAXP-607165/aug/978-3-12-607165-9",
  },
  {
    title: "Netzwerk Neu - B1 - Kursbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1690409748/klett/cover/9783126071727.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/2tez7yugdfphp7ihakew8/Netzwerk-Neu-B1-Kursbuch.pdf?rlkey=ta5l5lts4ef4l60g4l8fa01h5&st=yy5hm8hn&dl=0",
    media: "https://www.allango.net/product/MAXP-607172/aug/978-3-12-607172-7",
  },
  {
    title: "Netzwerk Neu - B1 - Übungsbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1621030502/klett/cover/9783126071734.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/s031s0b0t8l23ill0hy1k/Netzwerk-Neu-B1-bungsbuch.pdf?rlkey=kwzcsfmgjhz93afx5d0w50geb&st=lipbyfx2&dl=0",
    media: "https://www.allango.net/product/MAXP-607173/aug/978-3-12-607173-4",
  },
  {
    title: "Grammatik aktiv A1-B1",
    cover:
      "https://avatars.mds.yandex.net/i?id=12061d0da8e93bc03cb655c219cdfe06_l-9151562-images-thumbs&ref=rim&n=13&w=1428&h=1932",
    dropbox:
      "https://www.dropbox.com/scl/fi/4zn69acb0e61ubro972hf/Grammatik-aktiv-A1-B1.pdf?rlkey=pjlcd14o2w6h5txy853d7bs6d&st=za5xgt6f&dl=0",
  },
  {
    title: "Nemis tili lug'at",
    cover: "https://images.uzum.uz/cl2d0n7n7c6qm23hjlbg/original.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/kne3770rkt55g5jczje9h/Nemis-tili-lug-at.pdf?rlkey=nb351j44xe7kh8cc97k5yv3hz&st=p1e53s0v&dl=0",
  },
  {
    title: "S.Saidov - Nemis tili grammatikasi mashqlarda",
    cover: "https://json-api.uz/mnt/file-1758262543921.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/73tjd52pqxd9mzi0y6lik/S.Saidov-Nemis-tili-grammatikasi-mashqlarda.pdf?rlkey=nf0dlv97rlbix6uy5g17iuto3&st=1uxdgr8c&dl=0",
  },
];

export default function LibraryPage() {
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
        case "übungsbuch":
          titleTypeHit = /(übungsbuch|ubungsbuch)/.test(titleNorm);
          break;
        case "wörterbuch":
          titleTypeHit = /(wörterbuch|woerterbuch)/.test(titleNorm);
          break;
        case "dictionary":
          titleTypeHit = /(dictionary|lug[’'‘`]?at|lugat)/.test(titleNorm);
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
            📚 Kutubxona
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Kitoblar va materiallar
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Quyidagi roʻyxatdan kerakli kitobni tanlang. Koʻrish yoki yuklab
            olish mumkin.
          </p>
        </div>

        {/* Telegram notice */}
        <div className="mb-8">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
            <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">
              Agar kitoblarni Telegram orqali ko'rmoqchi yoki yuklab olmoqchi
              bo'lsangiz, quyidagi havola orqali kanalimizga o'ting.
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
                <span>Telegramdagi kutubxona</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Qidirish: nomi, daraja, turi..."
              className="h-10 w-full"
            />
          </div>
          <div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Daraja" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Barcha darajalar</SelectItem>
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
                <SelectValue placeholder="Turi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Barchasi</SelectItem>
                  <SelectItem value="kursbuch">Kursbuch</SelectItem>
                  <SelectItem value="übungsbuch">Übungsbuch</SelectItem>
                  <SelectItem value="wörterbuch">Wörterbuch</SelectItem>
                  <SelectItem value="dictionary">Dictionary</SelectItem>
                  <SelectItem value="grammar">Grammar</SelectItem>
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
                      Ko'rish
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
                      Yuklab olish
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
                        <span>Audio & Media</span>
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
