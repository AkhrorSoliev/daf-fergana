'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, GraduationCap, Briefcase, Heart, Home, Coffee, Wrench, Sun } from 'lucide-react';

const advantages = [
  {
    title: 'Consulting xizmatlari',
    description: 'Professional maslahat va yo\'naltirish xizmatlari',
    icon: Users,
    href: '/afzalliklar/consulting',
  },
  {
    title: 'Rus tilida nemis tili darslari',
    description: 'Rus tilida nemis tili o\'qitish',
    icon: BookOpen,
    href: '/afzalliklar/rus-tilida-nemis',
  },
  {
    title: 'Germaniyada Ta\'lim — Bachelor & Master',
    description: 'Germaniya universitetlarida o\'qish imkoniyati',
    icon: GraduationCap,
    href: '/afzalliklar/bachelor-master',
  },
  {
    title: 'Weiterbildung — Malaka oshirish',
    description: 'Professional malaka oshirish dasturlari',
    icon: Briefcase,
    href: '/afzalliklar/weiterbildung',
  },
  {
    title: 'Ausbildung — Dual Ta\'lim',
    description: 'Ish va o\'qishni bir vaqtda olib borish',
    icon: Wrench,
    href: '/afzalliklar/ausbildung',
  },
  {
    title: 'FSJ/BFD — volontiyorlik dasturi',
    description: 'Ijtimoiy faoliyat va volontiyorlik',
    icon: Heart,
    href: '/afzalliklar/fsj-bfd',
  },
  {
    title: 'Aupair — Enagalik dasturi',
    description: 'Oilada yashash va til o\'rganish',
    icon: Home,
    href: '/afzalliklar/aupair',
  },
  {
    title: 'Ferienjob — 3 oylik ta\'til ishi',
    description: 'Yozgi ta\'tilda ishlash imkoniyati',
    icon: Sun,
    href: '/afzalliklar/ferienjob',
  },
  {
    title: 'Mutaxassisligingiz bo\'yicha ish',
    description: 'Kasbiy faoliyatni Germaniyada davom ettirish',
    icon: Briefcase,
    href: '/afzalliklar/mutaxassis-ishi',
  },
  {
    title: 'Saisonarbeit — Mavsumiy ish',
    description: 'Mavsumiy ish o\'rinlari',
    icon: Coffee,
    href: '/afzalliklar/saisonarbeit',
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
            Bizning xizmatlarimiz orqali Germaniyada ta'lim, ish va yashash imkoniyatlarini o'rganing
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:border-accent/50">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <advantage.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {advantage.title}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/70 mb-6 flex-grow">
                    {advantage.description}
                  </p>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300"
                  >
                    <Link href={advantage.href} className="flex items-center justify-center">
                      Batafsil
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
