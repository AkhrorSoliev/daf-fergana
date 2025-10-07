"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const testimonials = [
  {
    name: "Aziza Karimova",
    role: "Goethe A2 sertifikati",
    content:
      "DaF markazida o'qiganim juda foydali bo'ldi. O'qituvchilar professional va do'stona.",
    avatar: "https://picsum.photos/100/100?random=10",
    rating: 5,
  },
  {
    name: "Javohir Toshmatov",
    role: "TestDaF sertifikati",
    content:
      "Germaniyada o'qish uchun kerakli bilimlarni oldim. Rahmat DaF markaziga!",
    avatar: "https://picsum.photos/100/100?random=11",
    rating: 5,
  },
  {
    name: "Malika Yusupova",
    role: "ECL B1 sertifikati",
    content:
      "Darslar juda qiziqarli va samarali. Nemis tilini tez o'rganishga yordam berdi.",
    avatar: "https://picsum.photos/100/100?random=12",
    rating: 5,
  },
  {
    name: "Bobur Rahimov",
    role: "ÖSD B2 sertifikati",
    content:
      "Professional o'qituvchilar va zamonaviy o'qitish usullari. Tavsiya qilaman!",
    avatar: "https://picsum.photos/100/100?random=13",
    rating: 5,
  },
];

const workplaces = [
  "/partners/partner-1.svg",
  "/partners/partner-2.svg",
  "/partners/partner-3.svg",
  "/partners/partner-4.svg",
  "/partners/partner-5.svg",
  "/partners/partner-6.svg",
  "/partners/partner-7.svg",
  "/partners/partner-8.svg",
];

// Provided image URLs for marquee (duplicated once for seamless loop)
const marqueeImages = [
  "https://json-api.uz/mnt/file-1758128916037.jpg",
  "https://json-api.uz/mnt/file-1758128916202.jpg",
  "https://json-api.uz/mnt/file-1758128916041.jpg",
  "https://json-api.uz/mnt/file-1758128916204.jpg",
  "https://json-api.uz/mnt/file-1758128916200.jpg",
  "https://json-api.uz/mnt/file-1758128916075.jpg",
  "https://json-api.uz/mnt/file-1758128916184.jpg",
  "https://json-api.uz/mnt/file-1758128916047.jpg",
  "https://json-api.uz/mnt/file-1758128916055.jpg",
  "https://json-api.uz/mnt/file-1758128916061.jpg",
  "https://json-api.uz/mnt/file-1758128916074.jpg",
  "https://json-api.uz/mnt/file-1758128916053.jpg",
  "https://json-api.uz/mnt/file-1758128916073.jpg",
  "https://json-api.uz/mnt/file-1758128916230.jpg",
  "https://json-api.uz/mnt/file-1758128916072.jpg",
  "https://json-api.uz/mnt/file-1758128916245.jpg",
  "https://json-api.uz/mnt/file-1758128916067.jpg",
  "https://json-api.uz/mnt/file-1758128916084.jpg",
  "https://json-api.uz/mnt/file-1758128916205.jpg",
  "https://json-api.uz/mnt/file-1758128916068.jpg",
  "https://json-api.uz/mnt/file-1758128916077.jpg",
  "https://json-api.uz/mnt/file-1758128916106.jpg",
  "https://json-api.uz/mnt/file-1758128916206.jpg",
  "https://json-api.uz/mnt/file-1758128916062.jpg",
];

export default function MediaSection() {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/40 via-background to-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="container relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mb-16 md:mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
            >
              ⭐ {t("about.resultsBadge")}
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-4">
              {t("about.resultsTitle")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {t("about.resultsSubtitle")}
            </p>
          </div>

          {/* Enhanced marquee with proper fade edges */}
          <div className="relative overflow-hidden w-[100vw] mx-[calc(50%-50vw)] py-6 md:py-8">
            {/* Fade edges positioned relative to viewport */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8 animate-marquee-50 hover:pause-animation will-change-transform">
              {/* Render all images twice for seamless infinite loop */}
              {[...marqueeImages, ...marqueeImages].map((url, i) => (
                <div
                  key={`img-${i}`}
                  className={`group flex-shrink-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[273px] md:h-[273px] transition-all duration-500 ${
                    i % 2 === 0
                      ? "rotate-[-1deg] sm:rotate-[-2deg]"
                      : "rotate-[1deg] sm:rotate-[2deg]"
                  } hover:rotate-0 hover:scale-105`}
                  aria-hidden={i >= marqueeImages.length}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={url}
                      alt={
                        i < marqueeImages.length
                          ? `Success story ${(i % marqueeImages.length) + 1}`
                          : ""
                      }
                      width={273}
                      height={273}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 273px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 ring-1 ring-white/20 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative -mt-6 mb-16 flex justify-center"
        >
          <div className="relative group">
            {/* Subtle background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-accent/10 via-secondary/8 to-accent/10 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main card */}
            <div className="relative bg-white/95 dark:bg-card border border-border/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 group-hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mb-2">
                    650+
                  </div>
                  <div className="text-sm font-medium text-foreground/70">
                    Muvaffaqiyatli o'quvchilar
                  </div>
                </motion.div>

                <div className="w-12 h-px sm:w-px sm:h-12 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-border to-transparent" />

                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mb-2">
                    8
                  </div>
                  <div className="text-sm font-medium text-foreground/70">
                    Filiallar
                  </div>
                </motion.div>

                <div className="w-12 h-px sm:w-px sm:h-12 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-border to-transparent" />

                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mb-2">
                    5+
                  </div>
                  <div className="text-sm font-medium text-foreground/70">
                    Xalqaro sertifikatlar
                  </div>
                </motion.div>
              </div>

              {/* Subtle shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            {t("about.testimonialsTitle")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  <Quote className="w-6 h-6 text-accent/50 mb-4" />

                  <p className="text-foreground/80 mb-4 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workplaces Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            {t("about.workplacesTitle")}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workplaces.map((workplace, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  rotate: 0,
                  transition: { duration: 0.3 },
                }}
                className={`group cursor-pointer ${
                  index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                } hover:rotate-0 transition-transform duration-300`}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-secondary/10 border border-border flex items-center justify-center h-48">
                  <Image
                    src={workplace}
                    alt={`Workplace ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full max-h-48 object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
