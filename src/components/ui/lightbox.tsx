"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { IconButton } from "./button";

function Lightbox({
  images,
  index,
  open,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const n = images.length;
  React.useEffect(() => {
    if (!open || !n) return;
    const go = (d: number) => onIndex((index + d + n) % n);
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [open, n, index, onClose, onIndex]);

  if (!open || !n) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink/92 px-3 pt-16 pb-[88px]"
    >
      <div className="absolute top-3 right-3 left-4 flex items-center justify-between text-sm font-semibold text-white">
        <span>
          {index + 1} / {n}
        </span>
        <IconButton label="Close" variant="inverse" onClick={onClose}>
          <X />
        </IconButton>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={index}
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full animate-[daf-pop_360ms_var(--ease-out)] rounded-[20px] object-contain"
      />
      <div className="absolute bottom-5 flex gap-3">
        <IconButton label="Previous" variant="inverse" size="lg" onClick={() => onIndex((index - 1 + n) % n)}>
          <ArrowLeft />
        </IconButton>
        <IconButton label="Next" variant="accent" size="lg" onClick={() => onIndex((index + 1) % n)}>
          <ArrowRight />
        </IconButton>
      </div>
    </div>
  );
}

export { Lightbox };
