import {
  Baby,
  Briefcase,
  Building2,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  Plane,
  School,
  Tractor,
} from "lucide-react";
import type { CardTone } from "@/components/cards";

/**
 * The nine Germany programs. `key` → i18n `advantages.items.*`, `dict` → i18n `afzalliklar.*`,
 * `slug` → route /afzalliklar/[slug]. Order = grid order = "next program" order.
 */
export const PROGRAMS = [
  { key: "bachelor", slug: "bachelor-master", dict: "bachelorMaster", Icon: GraduationCap, kicker: "Bachelor & Master", tone: "sun" },
  { key: "weiterbildung", slug: "weiterbildung", dict: "weiterbildung", Icon: School, kicker: "Weiterbildung", tone: "sky" },
  { key: "ausbildung", slug: "ausbildung", dict: "ausbildung", Icon: Briefcase, kicker: "Ausbildung", tone: "green" },
  { key: "fsj", slug: "fsj-bfd", dict: "fsjBfd", Icon: HeartHandshake, kicker: "FSJ/BFD", tone: "coral" },
  { key: "aupair", slug: "aupair", dict: "aupair", Icon: Baby, kicker: "Aupair", tone: "lilac" },
  { key: "ferienjob", slug: "ferienjob", dict: "ferienjob", Icon: Plane, kicker: "Ferienjob", tone: "sun" },
  { key: "specialist", slug: "mutaxassis-ishi", dict: "mutaxassisIshi", Icon: Building2, kicker: "Fachkraft", tone: "sky" },
  { key: "saisonarbeit", slug: "saisonarbeit", dict: "saisonarbeit", Icon: Tractor, kicker: "Saisonarbeit", tone: "green" },
  { key: "consulting", slug: "consulting", dict: "consulting", Icon: MessageCircle, kicker: "Beratung", tone: "coral" },
] as const satisfies readonly {
  key: string;
  slug: string;
  dict: string;
  Icon: React.ComponentType<{ className?: string }>;
  kicker: string;
  tone: CardTone;
}[];

export type Program = (typeof PROGRAMS)[number];

/** "Weiterbildung — Malaka oshirish" → "Malaka oshirish" (the kicker already shows the German term). */
export function plainTitle(title: string, kicker: string) {
  const parts = title.split(" — ");
  if (parts.length < 2) return title;
  const rest = parts.filter((p) => !kicker.toLowerCase().startsWith(p.toLowerCase().split("/")[0]) && p !== kicker);
  return (rest.length ? rest : parts).join(" — ");
}
