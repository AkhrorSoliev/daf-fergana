"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap as Cap,
  FileText,
  Medal,
  Globe,
  School,
  BadgeCheck,
  CalendarDays,
  Wallet,
  BookOpenCheck,
  Handshake,
  Send,
} from "lucide-react";
import { useState } from "react";
import { LeadModal } from "@/components/LeadModal";

export default function BachelorMasterPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Germaniyada Ta'lim — Bachelor & Master
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Germaniya oliy ta’limi sifat, amaliyotga yo‘naltirilgan dasturlar va
            xalqaro diplom bilan mashhur. Quyida qabul talablari va bosqichlar
            sodda tilda berilgan.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        {/* Quick anchors */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            id="til"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-accent" /> Til talabi
            </h3>
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
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Akademik talablar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Bachelor: 11 yillik maktab + 1 yil OTM yoki Studienkolleg</li>
              <li>Master: mos bakalavr diplomi va transkript</li>
              <li>Motivatsion xat, CV, tavsiyanomalar (dasturga qarab)</li>
            </ul>
          </div>

          <div
            id="jarayon"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" /> Qabul jarayoni
            </h3>
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
            id="yordam"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-accent" /> Bizning yordam
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Yo‘nalish tanlash va muddatlar rejasini tuzish</li>
              <li>Ariza va hujjatlarni tayyorlash, motivatsion xat ko‘magi</li>
              <li>Viza jarayonida to‘liq yo‘riqnoma</li>
            </ul>
            <a
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Send className="w-4 h-4 mr-2" /> Consulting UZ Telegram
            </a>
          </div>
        </div>

        {/* Nima bu? */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <School className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Nima bu?</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Bachelor — bakalavr darajasi (3–4 yil), Master — magistratura
                  (1–2 yil). Darslar amaliyotga yo‘naltirilgan, ko‘p
                  yo‘nalishlarda ingliz tilidagi dasturlar ham mavjud.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Nega Germaniya?</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Kuchli sanoat, sifatli ta’lim, ko‘p shaharlarda qulay yashash
                  sharoiti va xalqaro diplomning e’tirofi — asosiy ustunliklar.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Medal className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Imkoniyatlar</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Stipendiyalar, laboratoriyalar, startap ekotizimi va o‘qishdan
                  keyin ish izlash uchun 18 oygacha qolish ruxsati.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Hujjatlar va muddatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Hujjatlar ro‘yxati
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Diplom/transkript yoki maktab+kollej hujjatlari</li>
              <li>Til sertifikati (TestDaF/DSH yoki IELTS/TOEFL)</li>
              <li>Motivatsion xat, CV, tavsiyanomalar</li>
              <li>Pasport nusxasi va boshqa qo‘shimcha hujjatlar</li>
            </ul>
          </Card>
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" /> Muhim muddatlar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>
                Kuz qabul: odatda 15-iyul (universitetga qarab farq qiladi)
              </li>
              <li>Bahor/yoz qabul: odatda 15-yanvar</li>
              <li>Vaqtida sertifikat va hujjatlarni tayyorlab qo‘ying</li>
            </ul>
          </Card>
        </div>

        {/* Qo‘shimcha ma’lumot */}
        <Card className="mt-6 p-5 border border-accent/30 bg-accent/5">
          <div className="flex items-start gap-3">
            <BadgeCheck className="w-5 h-5 text-accent mt-0.5" />
            <p className="text-foreground/80">
              Ko‘plab federal yerlar davlat universitetlarida semestr badali
              olmasligi mumkin; biroq semestr to‘lovi va boshqa xarajatlar
              bo‘lishi tabiiy. Moliyaviy rejalash uchun{" "}
              <Wallet className="inline w-4 h-4 mx-1 text-accent" />
              bloklangan hisob va sug‘urta xarajatlarini ham inobatga oling.
            </p>
          </div>
        </Card>

        {/* Dual CTA: our modal + Consulting UZ Telegram */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="h-11 px-6">
            <a
              href="https://t.me/dafferganaadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Cap className="w-4 h-4 mr-2" /> Nemis tili bo'yicha bog'lanish
            </a>
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
          source="Bachelor & Master"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}

// FAQ removed per design simplification request
