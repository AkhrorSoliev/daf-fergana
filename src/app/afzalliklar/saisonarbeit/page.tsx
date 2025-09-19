"use client";

import { motion } from "framer-motion";

export default function SaisonarbeitPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Saisonarbeit — Mavsumiy ish
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Qishloq xo‘jaligi, bog‘dorchilik, qayta ishlash va turizm sohalarida
            mavsumiy ishlar. Odatda 2–6 oy davom etadi.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Talablar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yosh: 18+</li>
              <li>
                Nemis tili: A2 atrofida yoki ishga qarab talab qilinmasligi
                mumkin
              </li>
              <li>Jismoniy ishga chidamlilik</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Shartlar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Davomiylik: 2–6 oy</li>
              <li>
                Ish haqi: soatlik stavka bo‘yicha, qo‘shimcha ish haqlari mumkin
              </li>
              <li>Yotoqxona va ovqatlanish ba’zan ish beruvchi tomonidan</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Ish joyi topish va shartnoma</li>
              <li>Viza/ish ruxsati (fuqarolikka qarab)</li>
              <li>Kelish, ro‘yxatdan o‘tish va ishni boshlash</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Afzalliklar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Qisqa muddatda daromad</li>
              <li>Xalqaro tajriba</li>
              <li>Keyingi imkoniyatlar uchun yo‘l ochilishi</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Ish joyi va turar joy bo‘yicha yo‘riqnoma</li>
              <li>Hujjatlar va viza maslahati</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
