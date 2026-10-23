"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
import { GALLERY_IMAGE_URLS } from "@/data/gallery-images";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const FALLBACK = ["/assets/hero-image-1.jpg", "/assets/hero-image-2.jpg", "/assets/hero-image-3.jpg"];
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]"];
const TINTS = ["bg-sun-100", "bg-sky-100", "bg-green-100", "bg-coral-100"];
const PAGE = 12;

function Tile({ src, k, onOpen }: { src: string; k: number; onOpen: (i: number) => void }) {
  const [err, setErr] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // the load error can fire before hydration, so check once on mount
  useEffect(() => {
    const el = img.current;
    if (el?.complete && el.naturalWidth === 0) setErr(true);
  }, []);
  return (
    <button
      type="button"
      onClick={() => onOpen(k)}
      className={cn("mb-3 block w-full cursor-zoom-in overflow-hidden rounded-[22px] break-inside-avoid", RATIOS[k % 4], TINTS[k % 4])}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={err ? FALLBACK[k % 3] : src}
        alt=""
        loading="lazy"
        onError={() => setErr(true)}
        className="block size-full object-cover"
      />
    </button>
  );
}

export default function ResultsPageClient() {
  const { t } = useI18n();
  const images = useMemo(() => [...GALLERY_IMAGE_URLS].reverse(), []);
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <PageHead
        eyebrow={t("about.resultsBadge")}
        title={<HighlightLast text={t("about.resultsTitle")} color="coral" />}
        subtitle={t("about.resultsSubtitle")}
      />
      <Section className="pt-0">
        <div className="kit-masonry">
          {images.slice(0, shown).map((src, k) => (
            <Tile key={src} src={src} k={k} onOpen={setOpen} />
          ))}
        </div>
        {shown < images.length && (
          <div className="mt-6 flex justify-center">
            <Button variant="secondary" onClick={() => setShown(images.length)}>
              {t("home.allTeachers")}
              <Plus />
            </Button>
          </div>
        )}
      </Section>
      <Lightbox images={images} index={open ?? 0} open={open !== null} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
