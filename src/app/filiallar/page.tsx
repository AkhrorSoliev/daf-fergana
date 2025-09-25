"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Landmark,
  Home,
  Factory,
  Building,
  Navigation,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";
import { branches, mapSearchUrl } from "@/data/branches";

const cityIconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Toshkent: Building2,
  Buxoro: Landmark,
  "Farg‘ona": Home,
  Namangan: Navigation,
  Navoiy: Factory,
  Samarqand: Building,
  Xorazm: Landmark,
};

export default function BranchesPage() {
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
            Filiallar
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Har bir filial manzili, telefon raqamlari va xaritasi bilan
          </p>
        </motion.div>

        {/* Featured Farg'ona branches */}
        {(() => {
          const featuredIds = new Set(["fergana", "fergana-texnopark"]);
          const featured = branches.filter((b) => featuredIds.has(b.id));
          const yandexSrcById: Record<string, string> = {
            fergana:
              "https://yandex.uz/map-widget/v1/?azimuth=2.0435032587836317&feedback=organization%2Fadd&feedback-context=map.context&ll=71.785398%2C40.387479&tilt=0.8726646259971648&z=21",
            "fergana-texnopark":
              "https://yandex.uz/map-widget/v1/?azimuth=2.0214827495295054&ll=71.773826%2C40.421064&masstransit%5BstopId%5D=1744800231&mode=masstransit&tab=overview&tilt=0.7985121636779723&z=20",
          };
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
              {featured.map(({ id, city, name, address, phones }) => {
                const Icon = cityIconMap[city] ?? Building2;
                const mapsUrl = mapSearchUrl(city, address);
                const yandexSrc = yandexSrcById[id];
                return (
                  <motion.div
                    key={id}
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
                              {name ? `${city} — ${name}` : city}
                            </h2>
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-accent transition-colors"
                              title="Xaritada ochish"
                            >
                              <MapPin className="w-4 h-4" />
                              <span className="underline decoration-dotted underline-offset-2">
                                {address}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {phones.map((phone, idx) => {
                            const telHref = `tel:${phone.replace(
                              /[^+\\d]/g,
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

                        <div className="relative rounded-xl overflow-hidden border border-border/60 mt-auto shadow-sm group-hover:shadow-md transition-shadow">
                          <div className="aspect-video">
                            <iframe
                              src={yandexSrc}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              loading="lazy"
                              allowFullScreen
                              referrerPolicy="no-referrer-when-downgrade"
                              title={`${city} xaritasi`}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          );
        })()}

        {/* Compact list of other branches */}
        {(() => {
          const featuredIds = new Set(["fergana", "fergana-texnopark"]);
          const others = branches.filter((b) => !featuredIds.has(b.id));
          if (others.length === 0) return null;
          return (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Boshqa filiallar
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {others.map(({ city, name, address, phones }) => {
                  const mapsUrl = mapSearchUrl(city, address);
                  return (
                    <li key={`${city}-${address}`} className="text-sm">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 hover:border-accent hover:bg-accent/5 transition-colors"
                        title="Xaritada ochish"
                      >
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-medium">
                          {name ? `${city} — ${name}` : city}
                        </span>
                        <span className="text-foreground/70">• {address}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
