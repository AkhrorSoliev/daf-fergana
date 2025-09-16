'use client';

import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { Card } from '@/components/ui/card';
import { GraduationCap, Users, Calendar, Award } from 'lucide-react';

const stats = [
  {
    icon: GraduationCap,
    label: 'Filiallar',
    value: 8,
    suffix: '',
  },
  {
    icon: Calendar,
    label: 'Boshlangan yil',
    value: 2022,
    suffix: '',
  },
  {
    icon: Users,
    label: 'Tayyorgarlik olgan yoshlar',
    value: 650,
    suffix: '+',
  },
  {
    icon: Award,
    label: 'Xalqaro imtihonlar',
    value: 5,
    suffix: '+',
  },
];

export default function AboutSection() {
  const { count: branchesCount, countRef: branchesRef } = useCountUp({ end: 8 });
  const { count: yearCount, countRef: yearRef } = useCountUp({ end: 2022 });
  const { count: studentsCount, countRef: studentsRef } = useCountUp({ end: 650 });
  const { count: examsCount, countRef: examsRef } = useCountUp({ end: 5 });

  const counts = [branchesCount, yearCount, studentsCount, examsCount];
  const refs = [branchesRef, yearRef, studentsRef, examsRef];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Markaz haqida
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              <strong>DaF Sprachzentrum M.CH.J</strong> — nemis tilini o'qitishga ixtisoslashgan til markazi. 
              O'zbekiston bo'ylab 8 ta filial. 2022-yildan beri yoshlarga Germaniya ta'lim standartlari 
              asosida zamonaviy nemis tili ta'limi.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Farg'ona filialida 650+ yosh Goethe, ECL, ÖSD, TELC, TestDaF kabi xalqaro sertifikat 
              imtihonlariga tayyorlanmoqda va muvaffaqiyat qozonmoqda.
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {['Goethe', 'ECL', 'ÖSD', 'TELC', 'TestDaF'].map((exam) => (
                <span
                  key={exam}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {exam}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="p-6 text-center hover:bg-secondary/50 transition-colors duration-300">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                      <stat.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div ref={refs[index]} className="text-3xl font-bold text-primary">
                      {counts[index]}{stat.suffix}
                    </div>
                    <div className="text-sm text-foreground/70 font-medium">
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
