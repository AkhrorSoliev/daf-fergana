"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  FileText,
  Star,
  Target,
  BookOpenCheck,
  Handshake,
  Send,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export default function WeiterbildungClient() {
  const { locale, t } = useI18n();
  const dict = dictionaries[locale].afzalliklar as Record<string, unknown>;
  const wb = dict.weiterbildung as Record<string, unknown>;
  const anchors = wb.anchors as Record<string, string>;
  const whatItems = wb.whatItems as string[];
  const devItems = wb.devItems as string[];
  const typesItems = wb.typesItems as string[];
  const foreignItems = wb.foreignItems as string[];
  const applyItems = wb.applyItems as string[];

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {t("afzalliklar.weiterbildung.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {t("afzalliklar.weiterbildung.subtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" />{" "}
            {t("afzalliklar.common.partnership")}
          </div>
        </div>

        {/* Anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="#til"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.lang}
          </a>
          <a
            href="#yonalish"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.directions}
          </a>
          <a
            href="#jarayon"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.process}
          </a>
          <a
            href="#afzallik"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.advantages}
          </a>

          <a
            href="#faq"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.faq}
          </a>
        </div>

        {/* Rebuilt: 5 ta mazmunli bo'lim, 2 ustunli tartib */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Weiterbildung nima va nega muhim? */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <BookOpenCheck className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.weiterbildung.whatTitle")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.weiterbildung.whatDesc")}
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  {whatItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Kasbiy va shaxsiy rivojlanish */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.weiterbildung.devTitle")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.weiterbildung.devDesc")}
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  {devItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Kurs va dasturlar turlari */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.weiterbildung.typesTitle")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.weiterbildung.typesDesc")}
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  {typesItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Chet elliklar uchun imkoniyatlar */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Handshake className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.weiterbildung.foreignTitle")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.weiterbildung.foreignDesc")}
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  {foreignItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Ariza topshirish va dastur topish */}
          <Card className="p-5 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.weiterbildung.applyTitle")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.weiterbildung.applyDesc")}
                </p>
                <ul className="mt-3 list-disc pl-5 text-foreground/80 space-y-1.5">
                  {applyItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Dual CTA: our modal + Consulting UZ Telegram */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="h-11 px-6">
            <a
              href="https://t.me/dafferganaadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Briefcase className="w-4 h-4 mr-2" />{" "}
              {t("afzalliklar.common.contactGerman")}
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
              {t("afzalliklar.common.consultingTelegram")}
            </a>
          </Button>
        </div>


      </div>
    </div>
  );
}

// FAQ removed per design simplification request
