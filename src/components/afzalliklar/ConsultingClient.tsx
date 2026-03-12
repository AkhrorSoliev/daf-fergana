"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";

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

export default function ConsultingClient() {
  const { locale, t } = useI18n();
  const dict = dictionaries[locale].afzalliklar as Record<string, unknown>;
  const consulting = dict.consulting as Record<string, unknown>;
  const anchors = consulting.anchors as Record<string, string>;
  const whoItems = consulting.whoItems as string[];
  const langItems = consulting.langItems as string[];
  const processItems = consulting.processItems as string[];
  const whatItems = consulting.whatItems as string[];

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {t("afzalliklar.consulting.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {t("afzalliklar.consulting.subtitle")}
          </p>
        </div>

        {/* Quick section nav */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="#kimlar"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.who}
          </a>
          <a
            href="#til"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.lang}
          </a>
          <a
            href="#jarayon"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.process}
          </a>
          <a
            href="#nima"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.what}
          </a>
          <a
            href="#natija"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.result}
          </a>
          <a
            href="#faq"
            className="px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            {anchors.faq}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            id="kimlar"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">
              {t("afzalliklar.consulting.whoTitle")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {whoItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            id="til"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">
              {t("afzalliklar.consulting.langTitle")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {langItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            id="jarayon"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">
              {t("afzalliklar.consulting.processTitle")}
            </h3>
            <ol className="list-decimal pl-5 text-foreground/80 space-y-2">
              {processItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          <div
            id="nima"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">
              {t("afzalliklar.consulting.whatTitle")}
            </h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-2">
              {whatItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            id="natija"
            className="p-6 rounded-2xl border border-border/60 bg-white/70 dark:bg-secondary/5"
          >
            <h3 className="text-xl font-semibold mb-3">
              {t("afzalliklar.consulting.resultTitle")}
            </h3>
            <p className="text-foreground/80">
              {t("afzalliklar.consulting.resultDesc")}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="h-11 px-6">
            <a
              href="https://t.me/dafferganaadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Users className="w-4 h-4 mr-2" />{" "}
              {t("afzalliklar.common.freeConsultation")}
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

        {/* FAQ */}
        <div id="faq" className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQItem question={t("afzalliklar.consulting.faq.q1")}>
            {t("afzalliklar.consulting.faq.a1")}
          </FAQItem>
          <FAQItem question={t("afzalliklar.consulting.faq.q2")}>
            {t("afzalliklar.consulting.faq.a2")}
          </FAQItem>
          <FAQItem question={t("afzalliklar.consulting.faq.q3")}>
            {t("afzalliklar.consulting.faq.a3")}
          </FAQItem>
          <FAQItem question={t("afzalliklar.consulting.faq.q4")}>
            {t("afzalliklar.consulting.faq.a4")}
          </FAQItem>
        </div>
      </div>
    </div>
  );
}
