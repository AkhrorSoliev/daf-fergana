"use client";

import { motion } from "framer-motion";

export default function FsjBfdPage() {
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
            FSJ/BFD — volontiyorlik dasturi
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            FSJ (Freiwilliges Soziales Jahr) va BFD (Bundesfreiwilligendienst) —
            ijtimoiy sohada ko‘ngilli ish: bog‘cha, keksa va nogironlar uyida,
            shifoxona va NNTlarda tajriba to‘plash.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Til talabi</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis A2–B1 daraja tavsiya etiladi</li>
              <li>Ish joyida muloqot uchun kundalik nemis tili kerak</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Shartlar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Davomiyligi: 6–12 oy (odatda 12 oy)</li>
              <li>Yon xarajatlar uchun kompensatsiya (taschengeld)</li>
              <li>Yashash va ovqatlanish ba’zan ta’minlanadi yoki qoplanadi</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Ko‘ngilli tashkilot va ish joyini tanlash</li>
              <li>Ariza, CV va motivatsion xat topshirish</li>
              <li>Qabul xati bilan viza hujjatlarini tayyorlash</li>
              <li>Kelgach, ro‘yxatga turish va ishni boshlash</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Afzalliklar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis tilini tez yaxshilash</li>
              <li>Ijtimoiy sohada real tajriba</li>
              <li>Keyingi ta’lim yoki ish uchun mustahkam baza</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Tashkilot tanlash va ariza ko‘magi</li>
              <li>Hujjatlar va viza bo‘yicha yo‘riqnoma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
