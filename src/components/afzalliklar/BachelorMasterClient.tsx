"use client";

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
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export default function BachelorMasterClient() {
  const { locale, t } = useI18n();
  const dict = dictionaries[locale].afzalliklar as Record<string, unknown>;
  const bm = (dict as Record<string, unknown>).bachelorMaster as {
    langItems: string[];
    academicItems: string[];
    processItems: string[];
    helpItems: string[];
    docItems: string[];
    dateItems: string[];
    anchors: Record<string, string>;
    [key: string]: unknown;
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("afzalliklar.bachelorMaster.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {t("afzalliklar.bachelorMaster.subtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" />{" "}
            {t("afzalliklar.common.partnership")}
          </div>
        </div>

        {/* Quick anchors */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="#til"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {bm.anchors.lang}
          </a>
          <a
            href="#akademik"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {bm.anchors.academic}
          </a>
          <a
            href="#jarayon"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {bm.anchors.process}
          </a>

          <a
            href="#yordam"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {bm.anchors.help}
          </a>
          <a
            href="#faq"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {bm.anchors.faq}
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            id="til"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.langReq")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {bm.langItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            id="akademik"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.academicReq")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {bm.academicItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            id="jarayon"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.admissionProcess")}
            </h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              {bm.processItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <div
            id="yordam"
            className="p-5 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.ourHelp")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {bm.helpItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <a
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Send className="w-4 h-4 mr-2" />{" "}
              {t("afzalliklar.common.consultingTelegram")}
            </a>
          </div>
        </div>

        {/* Nima bu? */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <School className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.common.whatIsIt")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.bachelorMaster.whatDesc")}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.common.whyGermany")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.bachelorMaster.whyGermanyDesc")}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-3">
              <Medal className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.common.opportunities")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.bachelorMaster.opportunitiesDesc")}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Hujjatlar va muddatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.documents")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {bm.docItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-5 border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.importantDates")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {bm.dateItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Qo'shimcha ma'lumot */}
        <Card className="mt-6 p-5 border border-accent/30 bg-accent/5">
          <div className="flex items-start gap-3">
            <BadgeCheck className="w-5 h-5 text-accent mt-0.5" />
            <p className="text-foreground/80">
              {t("afzalliklar.bachelorMaster.financeNote")}
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
              <Cap className="w-4 h-4 mr-2" />{" "}
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
