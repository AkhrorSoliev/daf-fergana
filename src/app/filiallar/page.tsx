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

type Branch = {
  city: string;
  address: string;
  phones: string[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const branches: Branch[] = [
  {
    city: "Toshkent",
    address: "Chilonzor tumani, Lutfiy ko‘chasi 47",
    phones: ["+998 90 002 77 66", "+998 95 989 16 09"],
    Icon: Building2,
  },
  {
    city: "Buxoro",
    address: "“Dunyo” binosi",
    phones: ["+998 90 412 97 95"],
    Icon: Landmark,
  },
  {
    city: "Farg‘ona",
    address: "Turkiston ko‘chasi 22",
    phones: ["+99 890 535 10 99"],
    Icon: Home,
  },
  {
    city: "Namangan",
    address: "A. Xo‘jayev ko‘chasi 38",
    phones: ["+998 97 258 12 26"],
    Icon: Navigation,
  },
  {
    city: "Navoiy",
    address: "Gulbog‘ ko‘chasi 12",
    phones: ["+998 90 665 25 25"],
    Icon: Factory,
  },
  {
    city: "Samarqand",
    address: "Ibn Xoldun ko‘chasi 10B, klinikada tibbiy ekspert",
    phones: ["+998 90 159 98 88"],
    Icon: Building,
  },
  {
    city: "Xorazm",
    address: "Urganch shahri",
    phones: ["+998 91 862 36 93"],
    Icon: Landmark,
  },
];

function mapSearchUrl(city: string, address: string): string {
  const q = encodeURIComponent(`${city}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function mapEmbedUrl(city: string, address: string): string {
  const q = encodeURIComponent(`${city}, ${address}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {branches.map(({ city, address, phones, Icon }) => {
            const mapsUrl = mapSearchUrl(city, address);
            const embedUrl = mapEmbedUrl(city, address);
            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-full group relative"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/20 via-secondary/15 to-transparent blur" />
                <Card className="relative h-full overflow-hidden border border-border/60 bg-white/95 dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col ring-1 ring-border/60 hover:ring-accent/40 hover:border-accent/40">
                  <div className="p-6 md:p-7 flex flex-col gap-5 flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 shadow-sm group-hover:bg-accent/15 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                          {city}
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

                    {/* Phones */}
                    <div className="flex flex-wrap gap-2">
                      {phones.map((phone, idx) => {
                        const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
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

                    {/* Map */}
                    <div className="relative rounded-xl overflow-hidden border border-border/60 mt-auto shadow-sm group-hover:shadow-md transition-shadow">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute z-10 top-2 right-2 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/90 dark:bg-card/90 border border-border/60 text-foreground text-xs font-medium hover:bg-white transition-colors"
                        title="Xaritada ochish"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Xaritada ochish
                      </a>
                      <div className="aspect-video">
                        <iframe
                          src={embedUrl}
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
      </div>
    </div>
  );
}
