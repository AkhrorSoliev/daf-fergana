"use client";

import { Button } from "@/components/ui/button";
import {
  Wrench,
  FileText,
  Factory,
  ShieldCheck,
  Euro,
  Send,
  Handshake,
  BookOpenCheck,
  CalendarDays,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

export default function AusbildungClient() {
  const { locale, t } = useI18n();
  const aus = (
    dictionaries[locale].afzalliklar as Record<string, unknown>
  ).ausbildung as {
    docItems: string[];
    directionItems: string[];
    langItems: string[];
    entryItems: string[];
    processItems: string[];
    salaryItems: string[];
    helpItems: string[];
    [key: string]: unknown;
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {t("afzalliklar.ausbildung.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {t("afzalliklar.ausbildung.subtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-foreground/80 text-sm">
            <Handshake className="w-4 h-4 text-accent" />{" "}
            {t("afzalliklar.common.partnership")}
          </div>
        </div>

        {/* Nima bu? va afzalliklar */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-4">
              <Factory className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.common.whatIsIt")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.ausbildung.whatDesc")}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.common.advantagesTitle")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.ausbildung.advantagesDesc")}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <div className="flex items-start gap-4">
              <Euro className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("afzalliklar.common.salary")}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t("afzalliklar.ausbildung.salaryDesc")}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Hujjatlar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.documents")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {aus.docItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 rounded-2xl border border-border/60 bg-white/80 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.directions")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {aus.directionItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.langReq")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {aus.langItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.entryReq")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {aus.entryItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.process")}
            </h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              {aus.processItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Euro className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.salaryAndDuration")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {aus.salaryItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-accent" />{" "}
              {t("afzalliklar.common.ourHelp")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {aus.helpItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
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
              <Wrench className="w-4 h-4 mr-2" />{" "}
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
