"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap as Cap, MessageCircle } from "lucide-react";
import { useState } from "react";
import { LeadModal } from "@/components/LeadModal";

export default function BachelorMasterPage() {
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
            Germaniyada Ta'lim — Bachelor & Master
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Germaniya oliy ta’limi sifat, amaliyotga yo‘naltirilgan dasturlar va
            xalqaro diplom bilan mashhur. Quyida qabul talablari va bosqichlar
            sodda tilda berilgan.
          </p>
        </motion.div>

        {/* Quick anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="#til"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Til talabi
          </a>
          <a
            href="#akademik"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Akademik talablar
          </a>
          <a
            href="#jarayon"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Jarayon
          </a>
          <a
            href="#xarajat"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Xarajatlar
          </a>
          <a
            href="#yordam"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Bizning yordam
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
            id="til"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Til talabi</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>
                Nemis tilidagi dasturlar: B2–C1 (TestDaF, DSH yoki telc C1)
              </li>
              <li>
                Ingliz tilidagi dasturlar: IELTS 6.0–6.5 yoki TOEFL ekvivalenti
              </li>
              <li>Foundation/Studienkolleg uchun: odatda B1–B2</li>
            </ul>
          </div>

          <div
            id="akademik"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Akademik talablar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Bachelor: 11 yillik maktab + 1 yil OTM yoki Studienkolleg</li>
              <li>Master: mos bakalavr diplomi va transkript</li>
              <li>Motivatsion xat, CV, tavsiyanomalar (dasturga qarab)</li>
            </ul>
          </div>

          <div
            id="jarayon"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-3">Qabul jarayoni</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Dastur va universitet tanlash (bahor/yoz yoki kuz qabul)</li>
              <li>Til sertifikatini tayyorlash va hujjatlarni to‘plash</li>
              <li>
                Ariza topshirish (Universität/uni-assist) va javobni kutish
              </li>
              <li>Qabul xati bilan viza hujjatlarini tayyorlash</li>
              <li>Bloklangan hisob/sug‘urta/yaşash joyi va appointment</li>
              <li>Germaniyaga jo‘nab ketish va immatrikulatsiya</li>
            </ol>
          </div>

          <div
            id="xarajat"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Xarajatlar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>
                Semestr badali: 0–350 € (ba’zi landlarda yuqori bo‘lishi mumkin)
              </li>
              <li>
                Yillik yashash xarajatlari: 10 332 € (bloklangan hisob
                orientiri)
              </li>
              <li>
                Sug‘urta, turar joy, transport – shahar va viloyatga bog‘liq
              </li>
            </ul>
          </div>

          <div
            id="yordam"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yo‘nalish tanlash va muddatlar rejasini tuzish</li>
              <li>Ariza va hujjatlarni tayyorlash, motivatsion xat ko‘magi</li>
              <li>Viza jarayonida to‘liq yo‘riqnoma</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="h-11 px-6" onClick={() => setOpen(true)}>
            <Cap className="w-4 h-4 mr-2" /> Universitet tanlashda yordam oling
          </Button>
          <Button asChild variant="outline" className="h-11 px-6">
            <a href="#faq" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" /> FAQ
            </a>
          </Button>
        </div>

        <LeadModal
          open={open}
          onClose={() => setOpen(false)}
          source="Bachelor & Master"
        />

        {/* FAQ */}
        <div id="faq" className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQItem question="Stipendiya bormi?">
            Ba’zi yerda semestr badali yo‘q, biroq stipendiyalar uchun alohida
            tanlovlar mavjud. DAA, DAAD va universitet grantlarini kuzatib
            boring.
          </FAQItem>
          <FAQItem question="Studienkollegga kimlar boradi?">
            11 yillik maktab bitiruvchilari odatda Studienkolleg orqali
            kirishadi. Ayrim holatlarda OTMdagi 1 yil ham yetarli bo‘lishi
            mumkin.
          </FAQItem>
          <FAQItem question="Qabul muddatlari qachon?">
            Kuz qabul: odatda 15-iyul, bahor/yoz qabul: 15-yanvar atrofida.
            Universitetga qarab farqlanadi.
          </FAQItem>
          <FAQItem question="Ingliz tilidagi dasturlar ko‘pmi?">
            Magistr darajasida ko‘proq, bakalavriatda nisbatan kamroq. IT,
            biznes va texnika yo‘nalishlarida mavjud.
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
