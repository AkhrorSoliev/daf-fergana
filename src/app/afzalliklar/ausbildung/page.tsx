"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  FileText,
  Factory,
  ShieldCheck,
  Euro,
  Send,
  Handshake,
} from "lucide-react";
import { Card } from "@/components/ui/card";
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
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        {/* Nima bu? va afzalliklar */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-4">
              <Factory className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Nima bu?</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Dual ta’lim: o‘qish (Berufsschule) va amaliyot (ishxona)
                  birga. Shartnoma asosida oylik maosh to‘lanadi.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Afzalliklar</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Ish tajribasi + diplom. Bitirgach doimiy ishga kirish va
                  yashash ruxsatini uzaytirish imkoniyati.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-4">
              <Euro className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Maosh</h3>
                <p className="text-foreground/80 leading-relaxed">
                  1-kurs: ~800–1100 €, keyingi kurslarda oshadi; soha va
                  mintaqaga bog‘liq.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Hujjatlar ro‘yxati
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Maktab diplomi yoki kollej/litsey</li>
              <li>CV, motivatsion xat, pasport</li>
              <li>Til sertifikati (odatda B1–B2, yo‘nalishga qarab)</li>
            </ul>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Yo‘nalishlar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>IT, logistika, me’morchilik va qurilish</li>
              <li>Tibbiyot parvarish (Pflege), retsepsiya, mehmondo‘stlik</li>
              <li>Mexatronika, avtomexanika, elektr</li>
            </ul>
          </Card>
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

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
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

        {/* Dual CTA: our modal + Consulting UZ Telegram */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="h-11 px-6" onClick={() => setOpen(true)}>
            <Wrench className="w-4 h-4 mr-2" /> Nemis tili bo'yicha bog'lanish
          </Button>
          <Button asChild variant="outline" className="h-11 px-6">
            <a
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Send className="w-4 h-4 mr-2" /> Consulting UZ Telegram
            </a>
          </Button>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Ausbildung"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}
