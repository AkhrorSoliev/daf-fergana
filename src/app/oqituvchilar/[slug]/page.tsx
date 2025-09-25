"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTeacherBySlug } from "@/data/teachers";
import { use as usePromise } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Globe,
  CheckCircle,
} from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function TeacherDetailPage({ params }: PageProps) {
  const { slug } = usePromise(params);
  const teacher = getTeacherBySlug(slug);
  if (!teacher) return notFound();

  const imageSrc =
    teacher.slug === "herr-umarov"
      ? "/lehrer/herr-musinjon.png"
      : `/lehrer/${teacher.slug}.png`;
  const isJamsher = teacher.slug === "herr-jamsher";
  const bioLines = teacher.bio
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const highlights = bioLines.filter((l) =>
    /\b(201\d|202\d|yil|yillar)\b|DAAD|Aupair|magistr|bakalavr|universitet|C1|C2|B1|B2/i.test(
      l
    )
  );
  const highlightSet = new Set(highlights);
  const biographyLines =
    isJamsher ||
    teacher.slug === "frau-saida" ||
    teacher.slug === "frau-iroda" ||
    teacher.slug === "herr-umarov"
      ? bioLines.filter((line) => {
          const lowerLine = line.toLowerCase();
          // Remove any biography paragraph that contains a highlight snippet (case-insensitive)
          if (highlights.some((h) => lowerLine.includes(h.toLowerCase()))) {
            return false;
          }
          // Additionally, for Frau Saida, remove specific summary lines from biography
          if (teacher.slug === "frau-saida") {
            const removePhrases = [
              "2 yildan buyon daf sprachzentrumda",
              "tanishaylik",
            ];
            const containsSpecific = removePhrases.some((p) =>
              lowerLine.includes(p)
            );
            if (containsSpecific) return false;
          }
          // Additionally, for Frau Iroda, remove introductory line from biography
          if (teacher.slug === "frau-iroda") {
            const removePhrasesIroda = ["tanishaylik"];
            if (removePhrasesIroda.some((p) => lowerLine.includes(p))) {
              return false;
            }
          }
          // Additionally, for Herr Umarov (Musinjon), remove introductory line from biography
          if (teacher.slug === "herr-umarov") {
            const removePhrasesUmarov = ["tanishaylik"];
            if (removePhrasesUmarov.some((p) => lowerLine.includes(p))) {
              return false;
            }
          }
          // Additionally, for Herr Jamsher, remove introductory line from biography
          if (teacher.slug === "herr-jamsher") {
            const removePhrasesJamsher = ["tanishaylik"];
            if (removePhrasesJamsher.some((p) => lowerLine.includes(p))) {
              return false;
            }
          }
          return true;
        })
      : bioLines;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-muted/20 via-background to-secondary/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-24 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-secondary/15 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
      </div>

      <div className="container py-8 md:py-16 relative">
        {/* Enhanced Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/oqituvchilar"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground text-sm md:text-base font-medium p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Barcha o'qituvchilarga qaytish
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12"
        >
          {/* Enhanced Teacher Image Card */}
          <div className="lg:col-span-2">
            <Card className="relative aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden rounded-3xl bg-transparent shadow-none ring-0 lg:sticky lg:top-24">
              <Image
                src={imageSrc}
                alt={teacher.name}
                fill
                className={`object-cover w-full h-full ${
                  teacher.slug === "herr-jamsher"
                    ? "object-[25%_center]"
                    : "object-center"
                }`}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/70 to-transparent pointer-events-none" />

              {/* Teacher info overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h1 className="text-white font-semibold tracking-tight text-3xl md:text-4xl lg:text-5xl mb-3">
                  {teacher.name}
                </h1>
                <div className="inline-flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {teacher.degree}
                  </span>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-accent text-white text-sm font-bold">
                    <Award className="w-4 h-4 mr-2" />
                    {teacher.level}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Biography Content */}
          <div className="lg:col-span-3">
            <Card className="relative overflow-hidden border border-border/60 bg-white/95 dark:bg-card shadow-xl rounded-2xl">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-50" />

              <div className="relative p-6 md:p-8 lg:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">
                    To'liq biografiya
                  </h2>

                  {/* Enhanced Highlights Section */}
                  {highlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mb-8"
                    >
                      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground/90 mb-4">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        Asosiy ma'lumotlar
                      </h3>
                      <div className="bg-muted/30 rounded-xl p-4 md:p-6 border border-border/40">
                        <ul className="space-y-3 text-foreground/90">
                          {highlights.map((line, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3 leading-relaxed"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.5 + i * 0.1,
                              }}
                            >
                              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm md:text-base">
                                {line}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {/* Enhanced Biography Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="prose prose-zinc max-w-none prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-foreground text-foreground/90"
                  >
                    {biographyLines.map((para, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                        className="mb-4 text-base md:text-lg leading-relaxed"
                      >
                        {para}
                      </motion.p>
                    ))}
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8 md:mt-10 pt-6 border-t border-border/60"
                  >
                    <div className="space-y-4">
                      {/* Primary Action */}
                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground font-bold text-base md:text-lg py-4 md:py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                      >
                        <Link
                          href="/#consultation"
                          className="flex items-center justify-center gap-3"
                        >
                          <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          <span>Bepul konsultatsiya olish</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>

                      {/* Secondary Actions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          asChild
                          variant="outline"
                          className="border border-border/60 hover:border-primary hover:bg-primary/5 font-medium text-base py-3 md:py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
                        >
                          <Link
                            href="/oqituvchilar"
                            className="flex items-center justify-center gap-2"
                          >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>O'qituvchilar</span>
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          className="border border-border/60 hover:border-secondary hover:bg-secondary/10 font-medium text-base py-3 md:py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
                        >
                          <Link
                            href="/kurslar"
                            className="flex items-center justify-center gap-2"
                          >
                            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Kurslar</span>
                          </Link>
                        </Button>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-6 p-4 bg-muted/40 rounded-xl border border-border/40">
                        <p className="text-sm text-foreground/70 text-center leading-relaxed">
                          Bu o'qituvchi haqida savollaringiz bormi? Bepul
                          konsultatsiya orqali barcha savollaringizga javob
                          oling.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
