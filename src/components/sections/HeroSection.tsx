"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const images = [
  "/assets/hero-image-1.jpg",
  "/assets/hero-image-2.jpg",
  "/assets/hero-image-3.jpg",
  "/assets/hero-image-4.jpg",
  "/assets/hero-image-5.jpg",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const scrollToConsultation = () => {
    const element = document.getElementById("consultation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
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
                priority={idx === 0}
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
          priority={false}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Nemis tilini <span className="text-accent">professional</span>{" "}
              darajada o'rganing
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              DaF Sprachzentrum M.CH.J — nemis tilini o'qitishga ixtisoslashgan
              til markazi. O'zbekiston bo'ylab 8 ta filial.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto"
              >
                <Link href="/kurslar" className="flex items-center">
                  Kurslarni ko'rish
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                onClick={scrollToConsultation}
                variant="outline"
                size="lg"
                className="border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto"
              >
                <Play className="mr-2 w-5 h-5" />
                Bepul konsultatsiya
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
