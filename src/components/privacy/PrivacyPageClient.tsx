"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { dictionaries } from "@/i18n/dictionaries";
import { Shield } from "lucide-react";

export default function PrivacyPageClient() {
  const { t, locale } = useI18n();
  const s = (dictionaries as Record<string, any>)[locale]?.privacy?.sections;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-muted/20 via-background to-secondary/10">
      <div className="container py-12 md:py-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("privacy.title")}
            </h1>
          </div>

          <p className="text-sm text-foreground/50 mb-8">
            {t("privacy.lastUpdated")}
          </p>

          <p className="text-foreground/80 leading-relaxed mb-10">
            {t("privacy.intro")}
          </p>

          <div className="space-y-8">
            {/* 1. Collected */}
            <Section title={s?.collected?.title}>
              <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                {s?.collected?.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {s?.collected?.note && (
                <p className="mt-3 text-sm text-foreground/60 italic">
                  {s.collected.note}
                </p>
              )}
            </Section>

            {/* 2. Purpose */}
            <Section title={s?.purpose?.title}>
              <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                {s?.purpose?.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>

            {/* 3. Storage */}
            <Section title={s?.storage?.title}>
              <p className="text-foreground/80">{s?.storage?.text}</p>
            </Section>

            {/* 4. Third party */}
            <Section title={s?.thirdParty?.title}>
              <p className="text-foreground/80 mb-2">{s?.thirdParty?.text}</p>
              <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                {s?.thirdParty?.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>

            {/* 5. Rights */}
            <Section title={s?.rights?.title}>
              <p className="text-foreground/80 mb-2">{s?.rights?.text}</p>
              <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                {s?.rights?.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>

            {/* 6. Cookies */}
            <Section title={s?.cookies?.title}>
              <p className="text-foreground/80">{s?.cookies?.text}</p>
            </Section>

            {/* 7. Changes */}
            <Section title={s?.changes?.title}>
              <p className="text-foreground/80">{s?.changes?.text}</p>
            </Section>

            {/* 8. Contact */}
            <Section title={s?.contact?.title}>
              <p className="text-foreground/80 mb-2">{s?.contact?.text}</p>
              <p className="text-foreground/80">{s?.contact?.email}</p>
              <p className="text-foreground/80">{s?.contact?.phone}</p>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {title && (
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
