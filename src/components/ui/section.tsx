import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge, type Tone } from "./badge";
import { Highlight } from "./highlight";

const BG = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-white",
  green: "bg-green-100 text-ink",
  sun: "bg-sun-100 text-ink",
  sky: "bg-sky-100 text-ink",
  coral: "bg-coral-100 text-ink",
  lilac: "bg-lilac-100 text-ink",
} as const;

/** `inset` = rounded 36 block with 8px side margin (signature look). */
function Section({
  tone = "paper",
  inset,
  narrow,
  id,
  className,
  children,
}: {
  tone?: keyof typeof BG;
  inset?: boolean;
  narrow?: boolean;
  id?: string;
  /** Applied to the padded block, e.g. "py-0" to override the default section padding */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(inset ? "px-2" : BG[tone])}>
      <div
        className={cn(
          "px-[clamp(20px,5vw,48px)] py-[var(--section-y)]",
          inset && cn("rounded-[36px]", BG[tone]),
          className
        )}
      >
        <div className={cn("mx-auto", narrow ? "max-w-[760px]" : "max-w-[1200px]")}>
          {children}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  eyebrowTone = "white",
  title,
  subtitle,
  align = "left",
  action,
  size = "h2",
  inverse,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: React.ReactNode;
  eyebrowTone?: Tone;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  size?: "h2" | "h1" | "display";
  inverse?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end gap-6",
        center ? "justify-center text-center" : "justify-between",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-0 max-w-[720px] flex-col gap-4",
          center ? "items-center" : "items-start"
        )}
      >
        {eyebrow && (
          <Badge
            tone={eyebrowTone}
            dot
            className={eyebrowTone === "white" ? "border border-line" : undefined}
          >
            {eyebrow}
          </Badge>
        )}
        <Heading
          className={cn(
            "text-balance leading-[1.02] font-semibold tracking-[-0.035em]",
            size === "h1"
              ? "text-[length:var(--fs-h1)]"
              : size === "display"
                ? "text-[length:var(--fs-display)]"
                : "text-[length:var(--fs-h2)]",
            inverse ? "text-white" : "text-ink"
          )}
        >
          {title}
        </Heading>
        {subtitle && (
          <p
            className={cn(
              "max-w-[560px] text-pretty text-[length:var(--fs-body-lg)] leading-[1.55]",
              inverse ? "text-white/75" : "text-ink-2"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Wraps the last word of a headline in <Highlight> (serif italic). */
function HighlightLast({
  text,
  color,
}: {
  text: string;
  color?: React.ComponentProps<typeof Highlight>["color"];
}) {
  const i = text.lastIndexOf(" ");
  return (
    <>
      {i > 0 && text.slice(0, i + 1)}
      <Highlight color={color}>{i > 0 ? text.slice(i + 1) : text}</Highlight>
    </>
  );
}

export { Section, SectionHeader, HighlightLast };
