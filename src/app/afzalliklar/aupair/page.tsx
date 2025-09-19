"use client";

import { motion } from "framer-motion";

export default function AupairPage() {
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
            Aupair — Enagalik dasturi
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Nemis oilasida yashab, bolalar parvarishi yordamchisi sifatida
            ishlash va tilni tabiiy muhitda o‘rganish imkoniyati.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Til talabi</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis A1–A2 (oilaviy kommunikatsiya uchun yetarli daraja)</li>
              <li>
                Til kursini davom ettirish uchun vaqt va imkon yaratilib
                beriladi
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Shartlar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yosh: odatda 18–26</li>
              <li>Davomiylik: 6–12 oy</li>
              <li>Haftalik soat: 25–30 soat atrofida</li>
              <li>Cho‘ntak puli (taschengeld) oyiga ~280–400 €</li>
              <li>Yashash va ovqatlanish oiladan</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Profil yaratish va mos oila bilan match qilish</li>
              <li>Intervyu va shartnomani kelishish</li>
              <li>Viza hujjatlari: sug‘urta, yashash joyi va kafolatlar</li>
              <li>Kelgach, ro‘yxatdan o‘tish va kursga yozilish</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Afzalliklar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Til muhitida yashash va tez rivojlanish</li>
              <li>Madaniyatni yaqinroq bilish</li>
              <li>Keyingi ta’lim yoki ishga tayyorgarlik</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Oila bilan match va shartnoma maslahati</li>
              <li>Viza va safarga tayyorgarlik bo‘yicha yo‘riqnoma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
