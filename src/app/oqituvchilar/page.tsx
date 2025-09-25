"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { teachers } from "@/data/teachers";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowRight, Crown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TeachersPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-muted/20 via-background to-secondary/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/15 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
      </div>

      <div className="container py-12 md:py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            {t("teachers.badge")}
          </motion.div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("teachers.title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t("teachers.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-6 md:gap-8 auto-rows-[20rem] sm:auto-rows-[24rem] lg:auto-rows-[28rem]"
        >
          {teachers.map((teacher, index) => {
            const isFeatured = teacher.slug === "herr-jamsher";
            const imageSrc =
              teacher.slug === "herr-umarov"
                ? "/lehrer/herr-musinjon.png"
                : teacher.slug === "herr-doston"
                ? "/lehrer/herr-doston.jpg"
                : `/lehrer/${teacher.slug}.png`;
            return (
              <motion.div
                key={teacher.slug}
                variants={itemVariants}
                className={isFeatured ? "row-span-2" : undefined}
              >
                <Link
                  href={`/oqituvchilar/${teacher.slug}`}
                  aria-label={`O'qituvchi: ${teacher.name}`}
                  className="group block h-full"
                >
                  <Card
                    className={`relative h-full overflow-hidden rounded-3xl bg-transparent shadow-none transition-transform duration-500 group-hover:-translate-y-2 ring-0 ${
                      isFeatured ? "" : ""
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-accent text-white text-sm md:text-base font-bold shadow-lg border border-white/20">
                        <Crown className="w-4 h-4 md:w-5 md:h-5" />
                        {t("teachers.featured")}
                      </div>
                    )}
                    {/* Background pattern removed for cleaner look */}

                    <Image
                      src={imageSrc}
                      alt={teacher.name}
                      fill
                      className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                        teacher.slug === "herr-jamsher"
                          ? "object-[25%_center]"
                          : teacher.slug === "herr-ulugbek"
                          ? "object-top"
                          : "object-top md:object-center"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/70 to-transparent pointer-events-none" />

                    {/* Bottom info overlay with hover lift */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2 md:group-hover:-translate-y-3">
                      <div className={isFeatured ? "pb-2 md:pb-3" : "pb-1.5"}>
                        <h3
                          className={`text-white font-semibold tracking-tight mb-2 transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
                            isFeatured
                              ? "text-3xl md:text-4xl"
                              : "text-xl md:text-2xl"
                          }`}
                        >
                          {teacher.name}
                        </h3>
                        <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-sm opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/15 group-hover:text-white">
                          <span>{t("teachers.details")}</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 bg-white/80 dark:bg-card backdrop-blur border border-border/60 rounded-2xl shadow-lg">
            <div className="text-center sm:text-left">
              <p className="text-base font-semibold text-foreground">
                {t("teachers.meetTeacher")}
              </p>
              <p className="text-sm text-foreground/70">
                {t("teachers.consultationSubtitle")}
              </p>
            </div>
            <Link
              href="/#consultation"
              className="inline-flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {t("teachers.consultation")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
