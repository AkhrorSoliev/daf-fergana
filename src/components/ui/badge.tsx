import * as React from "react";

import { cn } from "@/lib/utils";

const TONES = {
  neutral: { cls: "bg-paper-2 text-ink-2", dot: "bg-ink-3" },
  ink: { cls: "bg-ink text-white", dot: "bg-white" },
  white: { cls: "bg-white text-ink", dot: "bg-ink" },
  green: { cls: "bg-green-100 text-green-ink", dot: "bg-green-500" },
  sun: { cls: "bg-sun-100 text-sun-ink", dot: "bg-sun-400" },
  coral: { cls: "bg-coral-100 text-coral-ink", dot: "bg-coral-500" },
  sky: { cls: "bg-sky-100 text-sky-ink", dot: "bg-sky-500" },
  lilac: { cls: "bg-lilac-100 text-lilac-ink", dot: "bg-lilac-500" },
} as const;

export type Tone = keyof typeof TONES;

function Badge({
  tone = "neutral",
  size = "md",
  dot,
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: Tone;
  size?: "sm" | "md";
  dot?: boolean;
  /** Leading icon element, e.g. <Zap /> */
  icon?: React.ReactNode;
}) {
  const t = TONES[tone];
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill font-semibold tracking-[0.01em]",
        size === "sm" ? "h-6 px-2.5 text-xs" : "h-[30px] px-[13px] text-[13px]",
        t.cls,
        className
      )}
      {...props}
    >
      {dot && <span className={cn("size-[7px] rounded-full", t.dot)} />}
      {icon && (
        <span className={cn("grid", size === "sm" ? "[&_svg]:size-[13px]" : "[&_svg]:size-[15px]")}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

const LEVELS: Record<string, string> = {
  A1: "bg-green-100 text-green-ink",
  A2: "bg-sky-100 text-sky-ink",
  B1: "bg-sun-100 text-sun-ink",
  B2: "bg-coral-100 text-coral-ink",
  C1: "bg-lilac-100 text-lilac-ink",
};

function LevelPill({
  level,
  size = "md",
  className,
}: {
  level: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = { sm: "h-6 px-2.5 text-xs", md: "h-8 px-3 text-sm", lg: "h-11 px-4 text-lg" }[size];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill font-bold",
        s,
        LEVELS[level.toUpperCase()] ?? "bg-paper-2 text-ink-2",
        className
      )}
    >
      {level}
    </span>
  );
}

export { Badge, LevelPill };
