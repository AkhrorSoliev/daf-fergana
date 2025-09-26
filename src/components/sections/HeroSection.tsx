"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { Play, ArrowRight } from "lucide-react";

const desktopTabletImages = [
  "/assets/hero-image-1.jpg",
  "/assets/hero-image-2.jpg",
  "/assets/hero-image-3.jpg",
  "/assets/hero-image-4.jpg",
];

const mobileImages = [
  "/assets/hero-image-mobile-1.jpg",
  "/assets/hero-image-mobile-2.jpg",
  "/assets/hero-image-mobile-3.jpg",
  "/assets/hero-image-mobile-4.jpg",
];

// phrases from i18n

export default function HeroSection() {
  const { t, locale } = useI18n();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phrases, setPhrases] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Decide which image set to use based on viewport (phones use mobile images)
  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 767px)");
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    // Set initial state
    setIsMobile(mediaQuery.matches);
    // Listen for changes (modern browsers)
    mediaQuery.addEventListener("change", onChange);
    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const images = isMobile ? mobileImages : desktopTabletImages;

  // Ensure current index stays within bounds when switching image sets
  useEffect(() => {
    setCurrentImageIndex((prev) => prev % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Get phrases array from translation (assuming t("hero.phrases") returns string[])
    const translatedPhrases = t("hero.phrases") as unknown as string[];
    setPhrases(Array.isArray(translatedPhrases) ? translatedPhrases : []);
    setPhraseIndex(0);
  }, [t]);

  useEffect(() => {
    if (phrases.length === 0) return;
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [phrases]);

  function scrollToConsultation(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    const section = document.getElementById("consultation");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <section className="hero-container relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 bg-black">
        {/* Stacked cross-fade to avoid flashes */}
        <div className="absolute inset-0 will-change-transform">
          {images.map((src, idx) => (
            <motion.div
              key={src}
              initial={false}
              animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ zIndex: idx === currentImageIndex ? 2 : 1 }}
            >
              <Image
                src={src}
                alt="DaF Fergana Education Center"
                fill
                className="object-cover"
                sizes="100vw"
                quality={90}
                priority={idx === currentImageIndex}
                fetchPriority={idx === currentImageIndex ? "high" : "auto"}
              />
            </motion.div>
          ))}
        </div>

        {/* Preload the next image invisibly to avoid flash */}
        <Image
          src={images[(currentImageIndex + 1) % images.length]}
          alt=""
          fill
          className="opacity-0 pointer-events-none select-none"
          sizes="100vw"
          quality={90}
          priority={false}
          fetchPriority="high"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto text-center text-white"
          >
            {/* Main Heading */}
            <h1
              className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${
                locale === "de" ? "lg:text-[3.0rem] xl:text-[3.5rem]" : ""
              }`}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <span className="text-white/95">DaF Sprachzentrum</span>
                <div className="relative overflow-hidden h-[1.2em] flex items-center justify-center w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={phraseIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute text-accent leading-none will-change-transform text-center"
                      aria-live="polite"
                    >
                      {phrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
              {t("hero.subtitle")}
            </p>

            {/* Action Buttons */}
            <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  asChild
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base font-medium px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:flex-1 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Link
                    href="/kurslar"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>{t("hero.ctaPrimary")}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>

                <Button
                  onClick={scrollToConsultation}
                  variant="outline"
                  className="border-2 border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-md text-sm sm:text-base font-medium px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:flex-1 rounded-xl shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t("hero.ctaSecondary")}</span>
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
