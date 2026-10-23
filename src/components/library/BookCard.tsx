"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, Eye, Headphones } from "lucide-react";
import { Badge, LevelPill } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

export default function BookCard({
  title,
  cover,
  level,
  type,
  viewHref,
  downloadHref,
  mediaHref,
  labels,
}: {
  title: string;
  cover: string;
  level?: string;
  type?: string;
  viewHref: string;
  downloadHref: string;
  mediaHref?: string;
  labels: { view: string; download: string; media: string };
}) {
  const [err, setErr] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el?.complete && el.naturalWidth === 0) setErr(true);
  }, []);
  return (
    <article className="group flex min-w-0 flex-col gap-3.5">
      <div className="grid aspect-[3/4] place-items-center overflow-hidden rounded-3xl bg-paper-2 p-[10%]">
        {!err ? (
          <Image
            ref={img}
            src={cover}
            alt={title}
            width={240}
            height={320}
            unoptimized
            onError={() => setErr(true)}
            className="max-h-full w-auto max-w-full rounded-md object-contain shadow-md transition-transform duration-[360ms] ease-spring group-hover:-translate-y-1 group-hover:-rotate-[1.5deg]"
          />
        ) : (
          <span className="text-center font-serif text-[28px] italic text-ink-3">{title}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 px-1">
        <div className="flex flex-wrap gap-1.5">
          {level && (LEVELS.includes(level.toUpperCase()) ? <LevelPill level={level} size="sm" /> : <Badge size="sm" tone="green">{level}</Badge>)}
          {type && <Badge size="sm">{type}</Badge>}
        </div>
        <h3 className="text-[17px] leading-tight font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <Button asChild variant="secondary" size="sm" className="flex-1">
          <a href={viewHref} target="_blank" rel="noopener noreferrer">
            <Eye />
            {labels.view}
          </a>
        </Button>
        <IconButton asChild label={labels.download} variant="primary" size="sm">
          <a href={downloadHref} target="_blank" rel="noopener noreferrer">
            <Download />
          </a>
        </IconButton>
        {mediaHref && (
          <IconButton asChild label={labels.media} variant="soft" size="sm">
            <a href={mediaHref} target="_blank" rel="noopener noreferrer">
              <Headphones />
            </a>
          </IconButton>
        )}
      </div>
    </article>
  );
}
