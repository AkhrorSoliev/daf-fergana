"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import {
  Briefcase,
  MessageCircle,
  FileText,
  Stamp,
  UsersRound,
  Send,
  Handshake,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function MutaxassisIshiPage() {
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
            Mutaxassisligingiz bo'yicha ish
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Fachkräfteeinwanderungsgesetz asosida malakali kadrlar uchun
            Germaniyada ish imkoniyatlari. Diplomingizni tan oldirish va ish
            vizasi haqida qisqa va aniq ma’lumotlar.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Til talabi
            </h3>
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
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Stamp className="w-5 h-5 text-accent" /> Diplomni tan olish
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Anerkennung: kasbga qarab tan olish jarayoni</li>
              <li>IQ-Netz va kasbiy palatalar orqali baholash</li>
              <li>Yetishmaydigan modul bo‘lsa — Anpassungsqualifizierung</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent" /> Ish topish jarayoni
            </h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>CV va LinkedIn/Indeed profilini tayyorlash</li>
              <li>Ish beruvchi bilan intervyu va taklif (Arbeitsvertrag)</li>
              <li>Viza turi: EU Blue Card yoki Skilled Worker Visa</li>
              <li>Kelgach, ro‘yxatdan o‘tish va ishni boshlash</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <UsersRound className="w-5 h-5 text-accent" /> Afzalliklar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yuqori maosh va ijtimoiy kafolatlar</li>
              <li>Oilaviy ko‘chib o‘tish imkoniyati</li>
              <li>Uzoq muddatli yashash ruxsati sari yo‘l</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 mr-2" /> Bizning yordam
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Diplom tan olish bo‘yicha yo‘riqnoma</li>
              <li>Ish beruvchi izlash va hujjatlar ko‘magi</li>
              <li>Viza jarayonida hamrohlik</li>
            </ul>
          </div>
        </div>

        {/* Nima bu? va hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <UsersRound className="w-5 h-5 text-accent" /> Nima bu?
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Malakali mutaxassislar Germaniyada ishga kirishlari uchun diplomni
              tan oldirish (Anerkennung) va mos viza olish zarur. Qadamlar
              kasbga qarab farqlanadi.
            </p>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Hujjatlar ro‘yxati
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Diplom, transkript va tarjimalar</li>
              <li>CV, motivatsion xat, ish tajribasi hujjatlari</li>
              <li>Til sertifikati (kasbga qarab B1–C1)</li>
            </ul>
          </Card>
        </div>

        {/* Dual CTA: our modal + Consulting UZ Telegram */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="h-11 px-6" onClick={() => setOpen(true)}>
            <Briefcase className="w-4 h-4 mr-2" /> Nemis tili bo'yicha
            bog'lanish
          </Button>
          <Button asChild variant="outline" className="h-11 px-6">
            <a
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Consulting UZ Telegram
            </a>
          </Button>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Mutaxassis ishlari"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}
