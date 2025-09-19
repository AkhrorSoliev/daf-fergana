"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MessageCircle } from "lucide-react";
import { useState } from "react";
import { LeadModal } from "@/components/LeadModal";

export default function WeiterbildungPage() {
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
            Weiterbildung — Malaka oshirish
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Qisqa muddatli kurslar, sertifikat dasturlari va kasbiy malaka
            oshirish orqali Germaniyada mehnat bozorida raqobatbardosh bo‘ling.
          </p>
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
            href="#xarajat"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            Xarajatlar
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
            <h3 className="text-xl font-semibold mb-3">
              Til va kirish talablari
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Nemis tilidagi kurslar: odatda B1–B2, ba’zan C1</li>
              <li>Ingliz tilidagi kurslar: IELTS 5.5–6.5 (dasturga qarab)</li>
              <li>
                Kasbga mos diplom yoki ish tajribasi talab qilinishi mumkin
              </li>
            </ul>
          </div>

          <div
            id="yonalish"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Mashhur yo‘nalishlar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>IT, data, kiberxavfsizlik va dasturlash</li>
              <li>
                Hamshiralik, parvarish va tibbiyot yordamchi mutaxassisliklari
              </li>
              <li>Logistika, muhandislik, marketing va boshqaruv</li>
            </ul>
          </div>

          <div
            id="jarayon"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Dastur tanlash va til darajasini aniqlash</li>
              <li>Ariza va hujjatlar: CV, motivatsion xat, diplom</li>
              <li>Qabul xati asosida viza tayyorlash</li>
              <li>Germaniyada ro‘yxatdan o‘tish va o‘qishni boshlash</li>
            </ol>
          </div>

          <div
            id="afzallik"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Afzalliklar</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Qisqa muddatda amaliy ko‘nikmalar</li>
              <li>Mehnat bozoriga tez kirish imkoniyati</li>
              <li>Sertifikatlar va professional tarmoq</li>
            </ul>
          </div>

          <div
            id="xarajat"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">Xarajatlar</h3>
            <p className="text-foreground/80">
              Kurs to‘lovlari 500–6000 € oralig‘ida bo‘lishi mumkin. Yashash
              xarajatlari shahar va kurs davomiyligiga bog‘liq.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="h-11 px-6" onClick={() => setOpen(true)}>
            <Briefcase className="w-4 h-4 mr-2" /> Kurs tanlashda yordam oling
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
          source="Weiterbildung"
        />

        {/* FAQ */}
        <div id="faq" className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQItem question="Kurs bitirgach ish topishim osonlashadimi?">
            Sertifikat va amaliy ko‘nikmalar ish beruvchilar nazarida ustunlik
            beradi. Tarmoq va stajirovka muhim.
          </FAQItem>
          <FAQItem question="Kurslar onlayn bormi?">
            Ba’zi provayderlarda onlayn yoki gibrid formatlar mavjud, lekin
            vizaga ta’siri bor-yo‘qligini tekshirish lozim.
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
