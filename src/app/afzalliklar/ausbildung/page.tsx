"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Wrench } from "lucide-react";
import { LeadModal } from "@/components/LeadModal";

export default function AusbildungPage() {
  const [open, setOpen] = useState(false);
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
            Ausbildung — Dual Ta'lim
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Dual ta’lim: haftaning bir qismi kollejda nazariya, bir qismi esa
            ishxonada amaliyot. O‘qish davomida oylik maosh to‘lanadi.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors flex items-center"
          >
            <Wrench className="w-4 h-4 mr-2" /> Ish beruvchi topishda yordam
            oling
          </button>
          <a
            href="#faq"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> FAQ
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Til talabi</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Ko‘pchilik yo‘nalishlar: nemis B1–B2</li>
              <li>Tibbiyot parvarish (Pflege): odatda B2</li>
              <li>
                Texnik yo‘nalishlar: B1 bilan boshlash mumkin, B2 ga chiqish
                shart
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Kirish talablari</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Maktab diplomi (11-sinf) yoki kollej/litsey</li>
              <li>CV, motivatsion xat, pasport va sertifikatlar</li>
              <li>
                Ba’zi ish beruvchilar intervyu yoki sinov kuni (Probearbeit)
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>
                Yo‘nalish tanlash (IT, logistika, parvarish, texnika va h.k.)
              </li>
              <li>Ish beruvchi topish va ariza topshirish</li>
              <li>Shartnoma (Ausbildungsvertrag) va viza hujjatlari</li>
              <li>Germaniyaga kelib ro‘yxatdan o‘tish va o‘qishni boshlash</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Maosh va davomiylik</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Davomiylik: 2–3,5 yil</li>
              <li>
                1-kurs: ~800–1100 €, 2–3-kurs: bosqichma-bosqich yuqoriroq
              </li>
              <li>
                Bitirgach: to‘liq ishga kirish va yashash ruxsatini uzaytirish
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yo‘nalish va ish beruvchi izlash strategiyasi</li>
              <li>Hujjatlarni tayyorlash, intervyuga tayyorlash</li>
              <li>Viza jarayonida hamrohlik</li>
            </ul>
          </div>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Ausbildung"
        />
      </div>
    </div>
  );
}
