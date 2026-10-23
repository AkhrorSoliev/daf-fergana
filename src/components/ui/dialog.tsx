"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "./button";

/** Centred card ≥640px, bottom sheet below (pure CSS breakpoints, no JS media query). */
function Dialog({
  open,
  onClose,
  title,
  subtitle,
  closeLabel = "Yopish",
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  closeLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-end bg-ink/38 backdrop-blur-[6px] sm:items-center sm:justify-center sm:p-5"
    >
      <div
        className={cn(
          "max-h-[92%] w-full overflow-y-auto rounded-t-[32px] bg-paper px-5 pt-3 pb-7 animate-[daf-rise_360ms_var(--ease-out)]",
          "sm:max-h-[90%] sm:max-w-[480px] sm:animate-[daf-pop_360ms_var(--ease-spring)] sm:rounded-[32px] sm:p-8 sm:shadow-lg",
          className
        )}
      >
        <div className="mx-auto mb-4 h-[5px] w-11 rounded-full bg-line-strong sm:hidden" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            {title && (
              <h3 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.025em] text-ink">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-[15px] leading-normal text-ink-3">{subtitle}</p>}
          </div>
          <IconButton label={closeLabel} variant="soft" onClick={onClose}>
            <X />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}

export { Dialog };
