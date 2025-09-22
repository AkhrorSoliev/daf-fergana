"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MessageCircle,
  FileText,
  Star,
  Target,
  BookOpenCheck,
  Handshake,
  Send,
} from "lucide-react";
import { useState } from "react";
import { LeadModal } from "@/components/LeadModal";

export default function WeiterbildungPage() {
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
            Weiterbildung — Malaka oshirish
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Qisqa muddatli kurslar, sertifikat dasturlari va kasbiy malaka
            oshirish orqali Germaniyada mehnat bozorida raqobatbardosh bo‘ling.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        {/* Anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="#til"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Til & kirish
          </a>
          <a
            href="#yonalish"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Yo‘nalishlar
          </a>
          <a
            href="#jarayon"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Jarayon
          </a>
          <a
            href="#afzallik"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Afzalliklar
          </a>

          <a
            href="#faq"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Rebuilt: 5 ta mazmunli bo'lim, 2 ustunli tartib */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 📘 Weiterbildung nima va nega muhim? */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <BookOpenCheck className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Weiterbildung nima va nega muhim?
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Weiterbildung — qisqa muddatli, amaliyotga yo‘naltirilgan
                  kurslar va dasturlar bo‘lib, mavjud bilimlarni
                  chuqurlashtirish yoki yangi yo‘nalishga o‘tish uchun
                  mo‘ljallangan. Mehnat bozorida raqobat ustunligi beradi.
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  <li>Amaliy ko‘nikmalarni tez egallash</li>
                  <li>Diplomsiz ham sertifikat olish imkoniyati</li>
                  <li>Karyera o‘sishi va ish haqi oshishi</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 🎯 Kasbiy va shaxsiy rivojlanish */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Kasbiy va shaxsiy rivojlanish
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Kurslar soft-skills va hard-skillsni uyg‘un rivojlantiradi,
                  ishda samaradorlikni oshiradi va yetakchilik salohiyatini
                  kuchaytiradi.
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  <li>Vaqtni boshqarish, jamoada ishlash</li>
                  <li>Texnik ko‘nikmalar: IT, data, tibbiyot, logistika</li>
                  <li>Professional tarmoq va mentorlik</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 🏫 Kurs va dasturlar turlari */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Kurs va dasturlar turlari
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Dasturlar davomiyligi 2 haftadan 12 oygacha. Ko‘pchiligi
                  modulga bo‘lingan bo‘lib, onlayn yoki gibrid formatlar ham
                  mavjud.
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  <li>IT: dasturlash, DevOps, kiberxavfsizlik</li>
                  <li>Medical: parvarish, hamshiralik yordamchisi</li>
                  <li>Biznes: marketing, HR, loyiha boshqaruvi</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 🌍 Chet elliklar uchun imkoniyatlar */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Handshake className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Chet elliklar uchun imkoniyatlar
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Til darajasiga qarab qabul qilinadigan ko‘plab dasturlar
                  mavjud. Sertifikatlar Germaniya ish beruvchilari tomonidan
                  e’tirof etiladi.
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  <li>Viza uchun mos formatdagi kurslar</li>
                  <li>Amaliyot va stajirovka imkoniyatlari</li>
                  <li>Keyinchalik ishga joylashish qo‘llovi</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 💡 Ariza topshirish va dastur topish */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Ariza topshirish va dastur topish
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Maqsad va til darajangizga mos kursni tanlang, hujjatlarni
                  to‘g‘ri tayyorlang va muddatlarni o'tkazib yubormang.
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  <li>Profilga mos dastur ro‘yxatini tuzing</li>
                  <li>CV, motivatsion xat va til sertifikatini tayyorlang</li>
                  <li>Rasmiy saytlar va akkreditatsiyani tekshiring</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Dual CTA: our modal + Consulting UZ Telegram */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
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
              <Send className="w-4 h-4 mr-2" />
              Consulting UZ Telegram
            </a>
          </Button>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Weiterbildung"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}

// FAQ removed per design simplification request
