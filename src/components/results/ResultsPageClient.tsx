"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { GALLERY_IMAGE_URLS } from "@/data/gallery-images";
import { useI18n } from "@/i18n/I18nProvider";

export default function ResultsPageClient() {
  const { t } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = useMemo(() => [...GALLERY_IMAGE_URLS].reverse(), []);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const open = useCallback((idx: number) => setLightboxIndex(idx), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const next = (i + images.length - 1) % images.length;
      setIsImageLoading(true);
      return next;
    });
  }, [images.length]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const next = (i + 1) % images.length;
      setIsImageLoading(true);
      return next;
    });
  }, [images.length]);

  const columns = useMemo(() => {
    // Masonry via CSS columns: responsive column count
    return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4";
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    // reset loader when image index changes
    setIsImageLoading(true);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, close, showPrev, showNext]);

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t("results.title")}
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        {/* Masonry grid */}
        <div className={columns}>
          {images.map((src, idx) => (
            <motion.button
              key={src + idx}
              onClick={() => open(idx)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
                mass: 0.8,
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mb-4 block w-full overflow-hidden rounded-xl border border-border/60 bg-white/60 dark:bg-card/40 shadow-sm hover:shadow-md transition-all relative group transform-gpu will-change-transform"
              style={{ breakInside: "avoid" }}
            >
              <Image
                src={src}
                alt={`Natijalar ${idx + 1}`}
                width={1200}
                height={1600}
                quality={90}
                unoptimized
                referrerPolicy="no-referrer"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.01] transform-gpu will-change-transform"
                priority={idx < 6}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 group-hover:bg-black/25 transition-colors">
                <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            {/* image container */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative max-w-6xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={close}
                className="absolute -top-12 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Yopish"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute -top-12 left-0 px-3 py-2 rounded-lg bg-white/10 text-white text-sm font-medium">
                {lightboxIndex + 1} / {images.length}
              </div>

              {/* Prev */}
              <button
                onClick={showPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
                aria-label="Oldingi"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next */}
              <button
                onClick={showNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
                aria-label="Keyingi"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative w-full h-[65vh] md:h-[75vh] rounded-xl overflow-hidden">
                <Image
                  key={images[lightboxIndex]}
                  src={images[lightboxIndex]}
                  alt={`Natijalar ${lightboxIndex + 1}`}
                  fill
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="object-contain select-none rounded-xl"
                  onLoadingComplete={() => setIsImageLoading(false)}
                />
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
