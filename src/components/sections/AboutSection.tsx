"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Calendar, Award } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    label: "Filiallar",
    value: 8,
    suffix: "",
  },
  {
    icon: Calendar,
    label: "Boshlangan yil",
    value: 2022,
    suffix: "",
  },
  {
    icon: Users,
    label: "Tayyorgarlik olgan yoshlar",
    value: 650,
    suffix: "+",
  },
  {
    icon: Award,
    label: "Xalqaro imtihonlar",
    value: 5,
    suffix: "+",
  },
];

export default function AboutSection() {
  const { count: branchesCount, countRef: branchesRef } = useCountUp({
    end: 8,
  });
  const { count: yearCount, countRef: yearRef } = useCountUp({ end: 2022 });
  const { count: studentsCount, countRef: studentsRef } = useCountUp({
    end: 650,
  });
  const { count: examsCount, countRef: examsRef } = useCountUp({ end: 5 });

  const counts = [branchesCount, yearCount, studentsCount, examsCount];
  const refs = [branchesRef, yearRef, studentsRef, examsRef];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            📚 Bizning markaz
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Markaz haqida
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Professional nemis tili ta'limi va Germaniya imkoniyatlari
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-center">
          {/* Enhanced Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-6">
              <motion.p
                className="text-base md:text-lg text-foreground/85 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <strong className="text-primary">
                  DaF Sprachzentrum M.CH.J
                </strong>{" "}
                — nemis tilini o'qitishga ixtisoslashgan til markazi.
                O'zbekiston bo'ylab 8 ta filial. 2022-yildan beri yoshlarga
                Germaniya ta'lim standartlari asosida zamonaviy nemis tili
                ta'limi.
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-foreground/85 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Farg'ona filialida 650+ yosh Goethe, ECL, ÖSD, TELC, TestDaF
                kabi xalqaro sertifikat imtihonlariga tayyorlanmoqda va
                muvaffaqiyat qozonmoqda.
              </motion.p>
            </div>

            {/* Enhanced Certificate Badges */}
            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {["Goethe", "ECL", "ÖSD", "TELC", "TestDaF"].map(
                (exam, index) => (
                  <motion.span
                    key={exam}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-gradient-to-r from-accent/15 to-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20 hover:border-accent/40 hover:shadow-md transition-all duration-200"
                  >
                    {exam}
                  </motion.span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="relative overflow-hidden p-4 md:p-6 text-center bg-white/80 dark:bg-card border border-border/60 hover:border-accent/40 hover:shadow-xl transition-all duration-300">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex flex-col items-center space-y-3 md:space-y-4">
                    <motion.div
                      className="p-3 md:p-4 bg-gradient-to-br from-accent/15 to-accent/10 rounded-2xl group-hover:from-accent/25 group-hover:to-accent/15 transition-all duration-300"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                    </motion.div>

                    <div
                      ref={refs[index]}
                      className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                    >
                      {counts[index]}
                      {stat.suffix}
                    </div>

                    <div className="text-xs md:text-sm text-foreground/70 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
