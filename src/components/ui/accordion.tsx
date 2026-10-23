"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  items,
  defaultOpen = 0,
  multiple,
  className,
}: {
  items: { q: React.ReactNode; a: React.ReactNode }[];
  defaultOpen?: number | null;
  multiple?: boolean;
  className?: string;
}) {
  const [open, setOpen] = React.useState<number[]>(defaultOpen == null ? [] : [defaultOpen]);
  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : multiple ? [...o, i] : [i]));
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {items.map((it, i) => {
        const on = open.includes(i);
        return (
          <div
            key={i}
            className={cn(
              "rounded-[24px] border-[1.5px] transition-all duration-[360ms] ease-out",
              on ? "border-transparent bg-white shadow-md" : "border-line bg-transparent"
            )}
          >
            <button
              type="button"
              aria-expanded={on}
              onClick={() => toggle(i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[24px] bg-transparent py-5 pr-5 pl-6 text-left text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-ink"
            >
              <span>{it.q}</span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full text-ink transition-all duration-[360ms] ease-spring",
                  on ? "rotate-45 bg-green-500" : "bg-paper-2"
                )}
              >
                <Plus className="size-[18px]" />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-[360ms] ease-out",
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-[22px] text-base leading-[1.55] text-ink-2">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
