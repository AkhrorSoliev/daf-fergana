"use client";

import { Button } from "@/components/ui/button";
import {
  Home,
  HeartHandshake,
  FileText,
  Send,
  Handshake,
  CalendarDays,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export default function AupairClient() {
  const { locale, t } = useI18n();
  const ap = (
    dictionaries[locale].afzalliklar as Record<string, unknown>
  ).aupair as {
    langItems: string[];
    conditionItems: string[];
    processItems: string[];
    advantageItems: string[];
    helpItems: string[];
    docItems: string[];
    [key: string]: unknown;
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {t("afzalliklar.aupair.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {t("afzalliklar.aupair.subtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" />{" "}
            {t("afzalliklar.common.partnership")}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.langReq")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {ap.langItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.conditions")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {ap.conditionItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.process")}
            </h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              {ap.processItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.advantagesTitle")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {ap.advantageItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 mr-2" />{" "}
              {t("afzalliklar.common.ourHelp")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {ap.helpItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nima bu? va hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.whatIsIt")}
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              {t("afzalliklar.aupair.whatDesc")}
            </p>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.documents")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {ap.docItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
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
              <Home className="w-4 h-4 mr-2" />{" "}
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
              <Send className="w-4 h-4 mr-2" />{" "}
              {t("afzalliklar.common.consultingTelegram")}
            </a>
          </Button>
        </div>


      </div>
    </div>
  );
}
