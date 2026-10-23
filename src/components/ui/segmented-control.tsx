"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type Opt = { value: string; label: React.ReactNode; icon?: React.ReactNode };

function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  tone = "light",
  fullWidth,
  className,
}: {
  options: (string | Opt)[];
  value: string;
  onChange?: (v: string) => void;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "ink";
  fullWidth?: boolean;
  className?: string;
}) {
  const opts: Opt[] = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const dark = tone === "ink";
  const h = { sm: "h-[26px] px-3 text-[13px]", md: "h-9 px-[18px] text-[15px]", lg: "h-11 px-[18px] text-base" }[size];
  return (
    <div
      role="tablist"
      className={cn(
        "max-w-full gap-0.5 overflow-x-auto rounded-pill border p-1 [scrollbar-width:none]",
        fullWidth ? "flex" : "inline-flex",
        dark ? "border-white/14 bg-white/10" : "border-line bg-paper-2",
        className
      )}
    >
      {opts.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={() => onChange?.(o.value)}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-pill border-0 font-semibold transition-colors duration-200 ease-out [&_svg]:size-[18px]",
              h,
              fullWidth && "flex-1",
              on
                ? dark
                  ? "bg-white text-ink shadow-sm"
                  : "bg-ink text-white shadow-sm"
                : dark
                  ? "bg-transparent text-white/80"
                  : "bg-transparent text-ink-2"
            )}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
