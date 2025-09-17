"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

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
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        {/* Infinite Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
            Bizning muvaffaqiyatlarimiz
          </h2>

          {/* Full-bleed marquee (breaks out of container) */}
          <div className="relative overflow-hidden w-[100vw] mx-[calc(50%-50vw)]">
            {/* Seamless marquee: same row duplicated once; track is non-wrapping */}
            <div className="flex flex-nowrap gap-6 animate-marquee-50 hover:pause-animation will-change-transform">
              {marqueeImages.map((url, i) => (
                <div
                  key={`a-${i}`}
                  className={`flex-shrink-0 w-[273px] h-[273px] transition-transform duration-300 ${
                    i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                  } hover:rotate-0`}
                >
                  <Image
                    src={url}
                    alt={`Success story ${i + 1}`}
                    width={273}
                    height={273}
                    className="rounded-lg object-cover w-[273px] h-[273px]"
                  />
                </div>
              ))}
              {marqueeImages.map((url, i) => (
                <div
                  key={`b-${i}`}
                  aria-hidden="true"
                  className={`flex-shrink-0 w-[273px] h-[273px] transition-transform duration-300 ${
                    i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                  } hover:rotate-0`}
                >
                  <Image
                    src={url}
                    alt=""
                    width={273}
                    height={273}
                    className="rounded-lg object-cover w-[273px] h-[273px]"
                  />
                </div>
              ))}
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
            O'quvchilarning fikrlari
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
            Bitiruvchilarimiz ish joylari
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
