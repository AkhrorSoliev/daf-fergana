"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { teachers } from "@/data/teachers";
import { ArrowRight, Award, BookOpen } from "lucide-react";

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
            👨‍🏫 Professional jamoa
          </motion.div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O'qituvchilarimiz
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Tajribali ustozlarimiz bilan nemis tilini samarali va zavq bilan
            o'rganing
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {teachers.map((teacher, index) => {
            const imageSrc = `/lehrer/${teacher.slug}.jpg`;
            return (
              <motion.div key={teacher.slug} variants={itemVariants}>
                <Link
                  href={`/oqituvchilar/${teacher.slug}`}
                  className="group block"
                >
                  <Card className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-border/60 bg-white/80 dark:bg-card shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Image
                      src={imageSrc}
                      alt={teacher.name}
                      fill
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Floating info overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                      <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <h3 className="text-white text-lg md:text-xl font-bold drop-shadow mb-3">
                          {teacher.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center rounded-lg bg-white/20 px-3 py-1 text-xs font-medium text-white border border-white/20">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {teacher.degree}
                          </span>
                          <span className="inline-flex items-center rounded-lg bg-accent px-3 py-1 text-xs font-bold text-white">
                            <Award className="w-3 h-3 mr-1" />
                            {teacher.level}
                          </span>
                        </div>
                        <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors">
                          <span>Batafsil ma'lumot</span>
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
                O'qituvchi bilan tanishing?
              </p>
              <p className="text-sm text-foreground/70">
                Bepul konsultatsiya uchun bog'laning
              </p>
            </div>
            <Link
              href="/#consultation"
              className="inline-flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Konsultatsiya olish
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
