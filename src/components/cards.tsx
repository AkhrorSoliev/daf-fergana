import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Quote,
  Send,
  Sprout,
  User,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, IconButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* Tone → tint bg / ink text / solid colour (static classes so Tailwind sees them) */
const TONE = {
  green: { bg: "bg-green-100", ink: "text-green-ink", solid: "bg-green-500", text: "text-green-500" },
  sun: { bg: "bg-sun-100", ink: "text-sun-ink", solid: "bg-sun-400", text: "text-sun-400" },
  coral: { bg: "bg-coral-100", ink: "text-coral-ink", solid: "bg-coral-500", text: "text-coral-500" },
  sky: { bg: "bg-sky-100", ink: "text-sky-ink", solid: "bg-sky-500", text: "text-sky-500" },
  lilac: { bg: "bg-lilac-100", ink: "text-lilac-ink", solid: "bg-lilac-500", text: "text-lilac-500" },
} as const;
export type CardTone = keyof typeof TONE;

const CATEGORY = {
  Individual: { tone: TONE.sky, Icon: User },
  Intensive: { tone: TONE.coral, Icon: Zap },
  Standard: { tone: TONE.green, Icon: Sprout },
} as const;

function CourseCard({
  level,
  category,
  categoryLabel,
  duration,
  hours,
  hoursLabel,
  price,
  description,
  features = [],
  ctaLabel,
  onRegister,
}: {
  level: string;
  category: keyof typeof CATEGORY;
  categoryLabel: string;
  duration?: string;
  hours?: number;
  hoursLabel: string;
  price?: string;
  description?: string;
  features?: string[];
  ctaLabel: string;
  onRegister?: () => void;
}) {
  const { tone, Icon } = CATEGORY[category];
  return (
    <article className="flex min-w-0 flex-col rounded-[30px] border border-line bg-white p-2 shadow-xs transition-[transform,box-shadow] duration-[360ms] ease-out hover:-translate-y-[3px] hover:shadow-md">
      <div className={cn("flex flex-col gap-[26px] rounded-[24px] px-5 pt-[18px] pb-5", tone.bg)}>
        <div className="flex items-center justify-between gap-2">
          <span className={cn("inline-flex h-7 items-center gap-1.5 rounded-pill bg-white/70 px-3 text-[13px] font-semibold", tone.ink)}>
            <Icon className="size-3.5" />
            {categoryLabel}
          </span>
          {hours ? (
            <span className={cn("text-[13px] font-semibold", tone.ink)}>
              {hours} {hoursLabel}
            </span>
          ) : null}
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[76px] leading-[0.8] font-semibold tracking-[-0.05em] text-ink">{level}</span>
          {duration && <span className="font-serif text-[30px] leading-none italic text-ink">{duration}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-3.5 pt-5 pb-2">
        {description && <p className="text-[15px] leading-normal text-ink-2">{description}</p>}
        {features.length > 0 && (
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[15px] leading-tight font-medium text-ink">
                <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-green-100 text-green-ink">
                  <Check className="size-[13px]" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-3.5 px-3.5 pt-3 pb-3.5">
        {price && (
          <div className="flex items-baseline gap-1.5 border-t border-dashed border-line-strong pt-4">
            <span className="text-[26px] leading-none font-semibold tracking-[-0.02em] text-ink">{price}</span>
          </div>
        )}
        <Button className="w-full" onClick={onRegister}>
          {ctaLabel}
          <ArrowRight />
        </Button>
      </div>
    </article>
  );
}

function TeacherCard({
  name,
  photo,
  role,
  featured,
  featuredLabel,
  tone = "sun",
  href,
}: {
  name: string;
  photo: string;
  role?: string;
  featured?: boolean;
  featuredLabel?: string;
  tone?: CardTone;
  href?: string;
}) {
  const body = (
    <>
      <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[28px]", TONE[tone].bg)}>
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width:1000px) 280px, 64vw"
          className="object-cover transition-transform duration-[640ms] ease-out group-hover:scale-[1.04]"
        />
        {featured && (
          <span className="absolute top-3 left-3 inline-flex h-7 items-center rounded-pill bg-sun-400 px-3 text-xs font-bold tracking-[0.04em] text-ink uppercase">
            {featuredLabel}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.015em] text-ink">{name}</h3>
        {role && <p className="text-sm leading-snug text-ink-3">{role}</p>}
      </div>
    </>
  );
  const cls = "group flex min-w-0 flex-col gap-3.5 text-ink no-underline hover:text-ink";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <article className={cls}>{body}</article>
  );
}

function ProgramCard({
  icon,
  kicker,
  title,
  description,
  tone = "green",
  href,
}: {
  icon: React.ReactNode;
  kicker?: string;
  title: string;
  description?: string;
  tone?: CardTone;
  href: string;
}) {
  const t = TONE[tone];
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[250px] min-w-0 flex-col gap-3.5 rounded-[30px] p-6 text-ink no-underline transition-transform duration-[360ms] ease-spring hover:-translate-y-[3px] hover:-rotate-[0.4deg] hover:text-ink",
        t.bg
      )}
    >
      <span className={cn("grid size-12 place-items-center rounded-2xl bg-white [&_svg]:size-6", t.ink)}>{icon}</span>
      <div className="mt-auto flex flex-col gap-1">
        {kicker && <span className={cn("font-serif text-[30px] leading-[1.05] italic", t.ink)}>{kicker}</span>}
        <h3 className="pr-12 text-xl leading-[1.2] font-semibold tracking-[-0.015em]">{title}</h3>
      </div>
      {description && <p className="text-[15px] leading-normal text-ink-2">{description}</p>}
      <span className="absolute top-6 right-6 grid size-10 place-items-center rounded-full bg-white/70 text-ink transition-all duration-[360ms] ease-spring group-hover:-rotate-45 group-hover:bg-ink group-hover:text-white">
        <ArrowRight className="size-[18px]" />
      </span>
    </Link>
  );
}

function Stat({ value, label, tone = "green" }: { value: React.ReactNode; label: string; tone?: CardTone }) {
  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <span className="text-[clamp(44px,7vw,68px)] leading-[0.9] font-semibold tracking-[-0.045em] text-ink">{value}</span>
      <span className="inline-flex items-center gap-2 text-[15px] leading-snug font-medium text-ink-2">
        <span className={cn("size-2.5 shrink-0 rotate-45 rounded-[3px]", TONE[tone].solid)} />
        {label}
      </span>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  tone = "sky",
}: {
  quote: string;
  name: string;
  role?: string;
  tone?: CardTone;
}) {
  const t = TONE[tone];
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-6 rounded-[30px] border border-line bg-white p-7">
      <Quote className={cn("size-7", t.text)} />
      <blockquote className="m-0 flex-1 text-[19px] leading-[1.45] font-medium tracking-[-0.01em] text-ink">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className={cn("grid size-11 place-items-center rounded-full text-[15px] font-bold", t.bg, t.ink)}>{initials}</span>
        <span className="flex flex-col gap-0.5">
          <strong className="text-[15px] leading-tight font-semibold">{name}</strong>
          {role && <span className={cn("text-[13px] leading-tight font-medium", t.ink)}>{role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

function BranchCard({
  city,
  address,
  phone,
  email,
  telegram,
  mapHref,
  active,
  onSelect,
  callLabel,
}: {
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  mapHref?: string;
  active?: boolean;
  onSelect?: () => void;
  callLabel: string;
}) {
  const row = (Icon: typeof MapPin, text: string) => (
    <div className={cn("flex items-start gap-2.5 text-[15px] leading-snug font-medium", active ? "text-white/85" : "text-ink-2")}>
      <Icon className={cn("mt-px size-[18px] shrink-0", active ? "text-green-500" : "text-ink-3")} />
      {text}
    </div>
  );
  return (
    <article
      onClick={onSelect}
      className={cn(
        "flex min-w-0 flex-col gap-[18px] rounded-[30px] border p-6 transition-colors duration-[360ms] ease-out",
        onSelect && "cursor-pointer",
        active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[30px] leading-none font-semibold tracking-[-0.03em]">{city}</h3>
        {mapHref && (
          <IconButton asChild label="Map" size="sm" variant={active ? "inverse" : "soft"}>
            <a href={mapHref} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight />
            </a>
          </IconButton>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        {address && row(MapPin, address)}
        {phone && row(Phone, phone)}
        {email && row(Mail, email)}
      </div>
      <div className="mt-auto flex gap-2">
        {phone && (
          <Button asChild size="sm" variant={active ? "accent" : "default"} className="flex-1">
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
              <Phone />
              {callLabel}
            </a>
          </Button>
        )}
        {telegram && (
          <IconButton asChild label="Telegram" size="sm" variant={active ? "inverse" : "secondary"}>
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <Send />
            </a>
          </IconButton>
        )}
      </div>
    </article>
  );
}

export { CourseCard, TeacherCard, ProgramCard, Stat, TestimonialCard, BranchCard };

function BlogCard({
  href,
  cover,
  title,
  summary,
  meta,
  tags = [],
  priority,
}: {
  href: string;
  cover: string;
  title: string;
  summary?: string;
  meta?: string;
  tags?: string[];
  priority?: boolean;
}) {
  return (
    <Link href={href} className="group flex min-w-0 flex-col gap-4 text-ink no-underline hover:text-ink">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] bg-paper-2">
        <Image
          src={cover}
          alt=""
          fill
          priority={priority}
          sizes="(min-width:1000px) 380px, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[640ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-2.5 px-1">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((t) => (
              <Badge key={t} size="sm">
                {t}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="text-[21px] leading-[1.2] font-semibold tracking-[-0.02em] decoration-green-500 decoration-2 underline-offset-4 group-hover:underline">
          {title}
        </h3>
        {summary && <p className="line-clamp-2 text-[15px] leading-normal text-ink-2">{summary}</p>}
        {meta && <span className="text-[13px] font-medium text-ink-3">{meta}</span>}
      </div>
    </Link>
  );
}

export { BlogCard };
