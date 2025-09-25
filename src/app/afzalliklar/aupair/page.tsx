"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import {
  Home,
  HeartHandshake,
  FileText,
  Send,
  Handshake,
  CalendarDays,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AupairPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-12">
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
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-accent" /> Til talabi
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis A1–A2 (oilaviy kommunikatsiya uchun yetarli daraja)</li>
              <li>
                Til kursini davom ettirish uchun vaqt va imkon yaratilib
                beriladi
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Shartlar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yosh: odatda 18–26</li>
              <li>Davomiylik: 6–12 oy</li>
              <li>Haftalik soat: 25–30 soat atrofida</li>
              <li>Cho‘ntak puli (taschengeld) oyiga ~280–400 €</li>
              <li>Yashash va ovqatlanish oiladan</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" /> Jarayon
            </h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Profil yaratish va mos oila bilan match qilish</li>
              <li>Intervyu va shartnomani kelishish</li>
              <li>Viza hujjatlari: sug‘urta, yashash joyi va kafolatlar</li>
              <li>Kelgach, ro‘yxatdan o‘tish va kursga yozilish</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-accent" /> Afzalliklar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Til muhitida yashash va tez rivojlanish</li>
              <li>Madaniyatni yaqinroq bilish</li>
              <li>Keyingi ta’lim yoki ishga tayyorgarlik</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 mr-2" /> Bizning yordam
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Oila bilan match va shartnoma maslahati</li>
              <li>Viza va safarga tayyorgarlik bo‘yicha yo‘riqnoma</li>
            </ul>
          </div>
        </div>

        {/* Nima bu? va hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-accent" /> Nima bu?
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Aupair — mezbon oilada yashab, bolalar parvarishida ko‘mak berish
              bilan birga tilni tabiiy muhitda o‘rganish dasturi. Cho‘ntak puli,
              yashash va ko‘pincha ovqatlanish ta’minlanadi.
            </p>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Hujjatlar ro‘yxati
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>CV, motivatsion xat</li>
              <li>Pasport va rasm</li>
              <li>Bolalar bilan tajriba (bo‘lsa) yoki tavsiyanoma</li>
            </ul>
          </Card>
        </div>

        {/* Dual CTA: our modal + Consulting UZ Telegram */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="h-11 px-6">
            <a
              href="https://t.me/dafferganaadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Home className="w-4 h-4 mr-2" /> Nemis tili bo'yicha bog'lanish
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 px-6">
            <a
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Send className="w-4 h-4 mr-2" /> ConsultingUz Telegram
            </a>
          </Button>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Aupair"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}
