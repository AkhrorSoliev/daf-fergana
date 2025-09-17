"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTeacherBySlug } from "@/data/teachers";
import { use as usePromise } from "react";
// icons removed per request

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function TeacherDetailPage({ params }: PageProps) {
  const { slug } = usePromise(params);
  const teacher = getTeacherBySlug(slug);
  if (!teacher) return notFound();

  const imageSrc = `/lehrer/${teacher.slug}.jpg`;
  const bioLines = teacher.bio
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const highlights = bioLines.filter((l) =>
    /\b(201\d|202\d|yil|yillar)\b|DAAD|Aupair|magistr|bakalavr|universitet|C1|C2|B1|B2/i.test(
      l
    )
  );

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-10 md:py-16">
        <Link
          href="/oqituvchilar"
          className="text-foreground/70 hover:text-foreground text-sm"
        >
          ← Barcha o'qituvchilarga qaytish
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch"
        >
          <Card className="relative overflow-hidden rounded-2xl ring-1 ring-border/70 bg-white/5 shadow-sm lg:col-span-1 h-full min-h-[460px] md:min-h-[520px] self-stretch">
            <Image
              src={imageSrc}
              alt={teacher.name}
              fill
              className="object-cover object-center w-full h-full"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </Card>

          <Card className="border border-border/60 bg-white dark:bg-secondary/10 shadow-sm rounded-2xl lg:col-span-2 flex min-w-0 overflow-hidden self-stretch">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col grow min-w-0 h-full">
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {teacher.name}
                </h1>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-secondary/30 px-2.5 py-1 text-xs font-medium text-foreground/80 border border-border/60">
                    {teacher.degree}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent border border-accent/30">
                    {teacher.level}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight mb-4">
                To'liq biografiya
              </h2>
              {highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-foreground/90 mb-3">
                    Asosiy ma'lumotlar
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                    {highlights.map((line, i) => (
                      <li key={i} className="leading-6">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="prose prose-zinc max-w-none prose-p:my-4 prose-strong:text-foreground prose-li:my-0 text-[1rem] leading-8 text-foreground/90 break-words">
                {bioLines.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className="mt-auto pt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/oqituvchilar">Bosh sahifaga qaytish</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/kurslar">Kurslarni ko'rish</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
