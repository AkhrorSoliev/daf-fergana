"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { teachers } from "@/data/teachers";

export default function TeachersPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O'qituvchilarimiz
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Tajribali ustozlarimiz bilan nemis tilini samarali va zavq bilan
            o'rganing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => {
            const imageSrc = `/lehrer/${t.slug}.jpg`;
            return (
              <Link
                key={t.slug}
                href={`/oqituvchilar/${t.slug}`}
                className="group block"
              >
                <Card className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-border/70 bg-transparent shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5">
                  <Image
                    src={imageSrc}
                    alt={t.name}
                    fill
                    className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <div className="inline-flex max-w-[95%] flex-col gap-2 rounded-lg bg-black/70 backdrop-blur-md px-3.5 py-2.5 ring-1 ring-white/10">
                      <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow-md tracking-tight">
                        {t.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-white/15 px-2.5 py-1 text-[12px] font-medium text-white ring-1 ring-white/20">
                          {t.degree}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-accent px-2.5 py-1 text-[12px] font-semibold text-white ring-1 ring-accent/80">
                          {t.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
