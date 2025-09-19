"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle } from "lucide-react";
import { useState } from "react";
import { LeadModal } from "@/components/LeadModal";

export default function ConsultingPage() {
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
            Consulting xizmatlari
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Profilingizni baholash, to‘g‘ri dastur tanlash, hujjatlar va viza
            jarayonini bosqichma-bosqich tashkil qilishda siz bilan birga
            bo‘lamiz. Maqsad: Germaniyada ta’lim, ish yoki malaka oshirish
            yo‘lida xavfsiz va tezkor natija.
          </p>
        </motion.div>

        {/* Quick section nav */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="#kimlar"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Kimlar uchun
          </a>
          <a
            href="#til"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Til talabi
          </a>
          <a
            href="#jarayon"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Jarayon
          </a>
          <a
            href="#nima"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Nimalarni bajaramiz
          </a>
          <a
            href="#natija"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Natija
          </a>
          <a
            href="#faq"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            FAQ
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            id="kimlar"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Kimlar uchun?</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Abituriyentlar, bakalavr va magistrlar</li>
              <li>Kasb egasi bo‘lgan mutaxassislar</li>
              <li>Til o‘rganish yoki malaka oshirishni rejalashtirganlar</li>
            </ul>
          </div>

          <div
            id="til"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">
              Til talabi (dasturga qarab)
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Universitet: nemis B2–C1 yoki ingliz IELTS 6.0–6.5+</li>
              <li>Ausbildung: odatda nemis B1–B2</li>
              <li>FSJ/BFD: nemis A2–B1</li>
              <li>Aupair: nemis A1–A2</li>
              <li>Ferienjob/Saisonarbeit: odatda A2 atrofida</li>
            </ul>
          </div>

          <div
            id="jarayon"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-3">Jarayon bosqichlari</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Bepul dastlabki maslahat va maqsadni aniqlash</li>
              <li>Profil/rezume tahlili va to‘g‘ri yo‘nalishni tanlash</li>
              <li>Til rejasi va hujjatlar ro‘yxatini shakllantirish</li>
              <li>Ariza topshirish: universitet, ish beruvchi yoki dastur</li>
              <li>
                Viza hujjatlari: appointment, sug‘urta, moliyaviy ta’minot
              </li>
              <li>
                Jo‘nab ketishdan oldingi tayyorgarlik va qo‘nishdan keyingi
                qo‘llab-quvvatlash
              </li>
            </ol>
          </div>

          <div
            id="nima"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Nimalarni bajaramiz</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yo‘nalish tanlash va muddatlar rejasini tuzish</li>
              <li>Hujjatlarni tayyorlash va formatlash</li>
              <li>Intervyu va vizaga tayyorlash</li>
              <li>Jo‘nab ketish/borib joylashish bo‘yicha yo‘riqnoma</li>
            </ul>
          </div>

          <div
            id="natija"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Natija</h3>
            <p className="text-foreground/80">
              Hujjatlaringiz sifatli tayyorlanadi, noaniqliklar kamayadi va
              jarayon aniq reja asosida kechadi.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="h-11 px-6" onClick={() => setOpen(true)}>
            <Users className="w-4 h-4 mr-2" /> Bepul maslahat oling
          </Button>
          <Button asChild variant="outline" className="h-11 px-6">
            <a href="#faq" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" /> Tez-tez so‘raladigan
              savollar
            </a>
          </Button>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Consulting"
        />

        {/* FAQ */}
        <div id="faq" className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQItem question="Qabul uchun qaysi hujjatlar kerak?">
            Pasport, diplom/transkript, til sertifikati (agar bo‘lsa), CV,
            motivatsion xat.
          </FAQItem>
          <FAQItem question="Til sertifikatisiz ariza topshirsam bo‘ladimi?">
            Ba’zi dasturlar til shartini keyinroq taqdim etishga ruxsat beradi.
            Ammo tayyor sertifikat imkoniyatni oshiradi.
          </FAQItem>
          <FAQItem question="Viza jarayoni qancha vaqt oladi?">
            Elchixona bandligiga bog‘liq. O‘rtacha 4–12 hafta, ba’zan ko‘proq.
          </FAQItem>
          <FAQItem question="Moliyaviy ta’minot qanday bo‘ladi?">
            Bloklangan hisob, homiylik yoki stipendiya — dastur va shaxsiy
            holatga qarab.
          </FAQItem>
        </div>
      </div>
    </div>
  );
}

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5 border border-border/60 bg-white/70 dark:bg-secondary/5">
      <details className="group">
        <summary className="cursor-pointer list-none flex items-center justify-between text-foreground font-medium">
          <span>{question}</span>
          <span className="ml-4 text-accent transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="mt-3 text-foreground/80 leading-relaxed">
          {children}
        </div>
      </details>
    </Card>
  );
}
