"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import {
  Sun,
  MessageCircle,
  FileText,
  Clock8,
  Euro,
  Send,
  Handshake,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function FerienjobPage() {
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
            Ferienjob — 3 oylik ta'til ishi
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Talabalar uchun yozgi (odatda 90 kun) qisqa muddatli ishlar: ombor,
            ishlab chiqarish, logistika va xizmat ko‘rsatish sohalarida.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" /> ConsultingUz bilan
            xamkorlikda
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Talablar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>OTM talabasi bo‘lish (kunduzgi shakl afzal)</li>
              <li>Yosh: odatda 18+</li>
              <li>Nemis tili: A2 atrofida yoki ishga qarab til shart emas</li>
              <li>Jismoniy ishga tayyorlik va intizom</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Clock8 className="w-5 h-5 text-accent" /> Shartlar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Davomiylik: 2–3 oy</li>
              <li>Ish haqi: soatlik stavka bo‘yicha (mintaqaga bog‘liq)</li>
              <li>Sminali ish jadvali bo‘lishi mumkin</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Jarayon</h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              <li>Ish joyi topish va ariza topshirish</li>
              <li>Shartnoma va turar joy masalasini hal qilish</li>
              <li>Viza/ish ruxsati (fuqarolik va vaziyatga qarab)</li>
              <li>Ish joyiga borib kelish va ro‘yxatdan o‘tish</li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" /> Afzalliklar
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Xalqaro ish tajribasi</li>
              <li>Tilni amaliyotda ishlatish</li>
              <li>Qisqa muddatda daromad</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3">Bizning yordam</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Ish joyi va turar joy bo‘yicha yo‘riqnoma</li>
              <li>Hujjatlar va viza maslahati</li>
            </ul>
          </div>
        </div>

        {/* Nima bu? va hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Clock8 className="w-5 h-5 text-accent" /> Nima bu?
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Ferienjob — talabalar uchun yozgi mavsumda 2–3 oy qisqa muddatli
              ish. Ombor, logistika, ishlab chiqarish va xizmat ko‘rsatishda
              amaliy tajriba va daromad olish imkoniyati.
            </p>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Hujjatlar ro‘yxati
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              <li>Talabalikni tasdiqlovchi hujjat</li>
              <li>CV va pasport</li>
              <li>Shartnomalar va turar joy hujjatlari (ish joyiga qarab)</li>
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
              <Sun className="w-4 h-4 mr-2" /> Nemis tili bo'yicha bog'lanish
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
          source="Ferienjob"
          redirectUrlAfterSuccess="https://t.me/daffergana_bot"
        />
      </div>
    </div>
  );
}
