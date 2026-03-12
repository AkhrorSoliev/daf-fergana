"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Home,
  Navigation,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";
import { branches, branchCity, mapSearchUrl } from "@/data/branches";
import { useI18n } from "@/i18n/I18nProvider";

const cityIconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  fergana: Home,
  namangan: Navigation,
  qarshi: Building2,
};

export default function BranchesPageClient() {
  const { t, locale } = useI18n();
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("branches.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("branches.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {branches.map((branch) => {
            const cityName = branchCity(branch, locale);
            const Icon = cityIconMap[branch.id] ?? Building2;
            const mapsUrl = mapSearchUrl(cityName, branch.address);
            return (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-full group relative"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/20 via-secondary/15 to-transparent blur" />
                <Card className="relative h-full overflow-hidden border border-border/60 bg-white/95 dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col ring-1 ring-border/60 hover:ring-accent/40 hover:border-accent/40">
                  <div className="p-6 md:p-7 flex flex-col gap-5 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 shadow-sm group-hover:bg-accent/15 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                          {branch.name ? `${cityName} — ${branch.name}` : cityName}
                        </h2>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-accent transition-colors"
                          title={t("branches.openMap")}
                        >
                          <MapPin className="w-4 h-4" />
                          <span className="underline decoration-dotted underline-offset-2">
                            {branch.address}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {branch.phones.map((phone, idx) => {
                        const telHref = `tel:${phone.replace(
                          /[^+\d]/g,
                          ""
                        )}`;
                        return (
                          <a
                            key={`${phone}-${idx}`}
                            href={telHref}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-white/70 dark:bg-white/5 hover:border-accent hover:bg-accent/10 text-foreground text-sm font-medium transition-colors shadow-sm"
                          >
                            <Phone className="w-4 h-4 text-accent" />
                            <span>{phone}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
