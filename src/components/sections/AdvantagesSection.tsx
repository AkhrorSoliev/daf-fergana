"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Send,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  Heart,
  Home,
  Coffee,
  Wrench,
  Sun,
} from "lucide-react";

const advantages = [
  {
    title: "Germaniyada Ta'lim — Bachelor & Master",
    description:
      "Universitetga qabul, talablari va stipendiya imkoniyatlari haqida to'liq yo'l xaritasi.",
    icon: GraduationCap,
    href: "/afzalliklar/bachelor-master",
  },
  {
    title: "Weiterbildung — Malaka oshirish",
    description:
      "Ish faoliyati yonida qisqa kurslar orqali kasbiy malaka va sertifikat olish yo'llari.",
    icon: Briefcase,
    href: "/afzalliklar/weiterbildung",
  },
  {
    title: "Ausbildung — Dual Ta'lim",
    description:
      "Nazariya + amaliyot: o'qish bilan birga oylik maosh to'lanadigan kasb-hunar tayyorlash.",
    icon: Wrench,
    href: "/afzalliklar/ausbildung",
  },
  {
    title: "FSJ/BFD — volontiyorlik dasturi",
    description:
      "Ijtimoiy sohada ko'ngilli faoliyat, madaniy almashinuv va tilni amalda rivojlantirish.",
    icon: Heart,
    href: "/afzalliklar/fsj-bfd",
  },
  {
    title: "Aupair — Enagalik dasturi",
    description:
      "Nemis oilasida yashab, bolalar parvarishi bilan tilni kundalik hayotda o'rganish.",
    icon: Home,
    href: "/afzalliklar/aupair",
  },
  {
    title: "Ferienjob — 3 oylik ta'til ishi",
    description:
      "Talabalar uchun yozgi mavsumda qisqa muddatli ish, tajriba va daromad imkoniyati.",
    icon: Sun,
    href: "/afzalliklar/ferienjob",
  },
  {
    title: "Mutaxassisligingiz bo'yicha ish",
    description:
      "Diplomni tan oldirish, ish beruvchi topish va kasbiy migratsiya jarayonlari.",
    icon: Briefcase,
    href: "/afzalliklar/mutaxassis-ishi",
  },
  {
    title: "Saisonarbeit — Mavsumiy ish",
    description:
      "Qishloq xo'jaligi va xizmat ko'rsatishda mavsumiy ishlar uchun rasmiy yo'l.",
    icon: Coffee,
    href: "/afzalliklar/saisonarbeit",
  },
  {
    title: "Consulting xizmatlari",
    description:
      "Profil tahlili, yo'nalish tanlash, hujjatlar va viza jarayonida yo'l-yo'riq.",
    icon: Users,
    href: "/afzalliklar/consulting",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AdvantagesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            O'quv markazi afzalliklari
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Bizning xizmatlarimiz orqali Germaniyada ta'lim, ish va yashash
            imkoniyatlarini o'rganing
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={itemVariants}
              whileHover={{ y: -6, rotate: -0.2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* Ambient glow on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/25 via-secondary/20 to-transparent blur" />

              <Card className="relative overflow-hidden p-6 h-full border border-border/60 bg-white/70 dark:bg-secondary/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Decorative corner blob */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-colors" />

                <div className="relative flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div className="relative z-10 p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <advantage.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="absolute inset-0 rounded-xl -z-0 bg-gradient-to-br from-accent/40 via-secondary/30 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {advantage.title}
                    </h3>
                  </div>

                  <p className="text-foreground/70 mb-6 flex-grow">
                    {advantage.description}
                  </p>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300"
                    aria-label={`${advantage.title} haqida batafsil`}
                  >
                    <Link
                      href={advantage.href}
                      className="flex items-center justify-center"
                    >
                      Batafsil
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Consulting suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maslahat kerakmi? Telegramga o'ting
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a
              href="https://t.me/dafferganaadmin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nemis tili bo'yicha bog'lanish
              <Send className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
