"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import {
  Heart,
  Handshake,
  FileText,
  BookOpenCheck,
  Star,
  Send,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function FsjBfdPage() {
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
            FSJ/BFD — volontiyorlik dasturi
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            FSJ (Freiwilliges Soziales Jahr) va BFD (Bundesfreiwilligendienst) —
            ijtimoiy sohada ko‘ngilli ish: bog‘cha, keksa va nogironlar uyida,
            shifoxona va NNTlarda tajriba to‘plash.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-accent" /> Til talabi
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis A2–B1 daraja tavsiya etiladi</li>
              <li>Ish joyida muloqot uchun kundalik nemis tili kerak</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Shartlar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Davomiyligi: 6–12 oy (odatda 12 oy)</li>
              <li>Yon xarajatlar uchun kompensatsiya (taschengeld)</li>
              <li>Yashash va ovqatlanish ba’zan ta’minlanadi yoki qoplanadi</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Ko‘ngilli tashkilot va ish joyini tanlash</li>
              <li>Ariza, CV va motivatsion xat topshirish</li>
              <li>Qabul xati bilan viza hujjatlarini tayyorlash</li>
              <li>Kelgach, ro‘yxatga turish va ishni boshlash</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" /> Afzalliklar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis tilini tez yaxshilash</li>
              <li>Ijtimoiy sohada real tajriba</li>
              <li>Keyingi ta’lim yoki ish uchun mustahkam baza</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-accent" /> Bizning yordam
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Tashkilot tanlash va ariza ko‘magi</li>
              <li>Hujjatlar va viza bo‘yicha yo‘riqnoma</li>
            </ul>
          </div>
        </div>

        {/* Nima bu? va hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-accent" /> Nima bu?
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              FSJ/BFD — ijtimoiy sohada ko‘ngilli xizmat dasturlari. Bog‘cha,
              shifoxona, keksalar uyi kabi joylarda jamiyat uchun foydali ish
              qilib, til va tajriba orttirasiz.
            </p>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Hujjatlar ro‘yxati
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>CV, motivatsion xat</li>
              <li>Diplom yoki o‘qish haqida ma’lumot (bo‘lsa)</li>
              <li>Pasport nusxasi</li>
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
              <Heart className="w-4 h-4 mr-2" /> Nemis tili bo'yicha bog'lanish
            </a>
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
          source="FSJ/BFD"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}
