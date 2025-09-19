"use client";

import { motion } from "framer-motion";

export default function MutaxassisIshiPage() {
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
            Mutaxassisligingiz bo'yicha ish
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Fachkräfteeinwanderungsgesetz asosida malakali kadrlar uchun
            Germaniyada ish imkoniyatlari. Diplomingizni tan oldirish va ish
            vizasi haqida qisqa va aniq ma’lumotlar.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Til talabi</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Ko‘pchilik kasblar: nemis B1–B2</li>
              <li>
                IT va xalqaro kompaniyalar: ingliz tili yetarli bo‘lishi mumkin
              </li>
              <li>
                Parvarish va tibbiyot: odatda B2 va Fachsprachprüfung talab
                qilinadi
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Diplomni tan olish</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Anerkennung: kasbga qarab tan olish jarayoni</li>
              <li>IQ-Netz va kasbiy palatalar orqali baholash</li>
              <li>Yetishmaydigan modul bo‘lsa — Anpassungsqualifizierung</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Ish topish jarayoni</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>CV va LinkedIn/Indeed profilini tayyorlash</li>
              <li>Ish beruvchi bilan intervyu va taklif (Arbeitsvertrag)</li>
              <li>Viza turi: EU Blue Card yoki Skilled Worker Visa</li>
              <li>Kelgach, ro‘yxatdan o‘tish va ishni boshlash</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Afzalliklar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yuqori maosh va ijtimoiy kafolatlar</li>
              <li>Oilaviy ko‘chib o‘tish imkoniyati</li>
              <li>Uzoq muddatli yashash ruxsati sari yo‘l</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Diplom tan olish bo‘yicha yo‘riqnoma</li>
              <li>Ish beruvchi izlash va hujjatlar ko‘magi</li>
              <li>Viza jarayonida hamrohlik</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
