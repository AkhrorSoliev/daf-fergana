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
  "https://picsum.photos/200/200?random=20",
  "https://picsum.photos/200/200?random=21",
  "https://picsum.photos/200/200?random=22",
  "https://picsum.photos/200/200?random=23",
  "https://picsum.photos/200/200?random=24",
  "https://picsum.photos/200/200?random=25",
  "https://picsum.photos/200/200?random=26",
  "https://picsum.photos/200/200?random=27",
];

// Base list for the marquee; we render it twice for seamless looping
const marqueeImages = Array.from({ length: 10 }, (_, i) => 30 + i);

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
              {marqueeImages.map((seed, i) => (
                <div
                  key={`a-${seed}`}
                  className={`flex-shrink-0 w-[210px] h-[210px] transition-transform duration-300 ${
                    i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                  } hover:rotate-0`}
                >
                  <Image
                    src={`https://picsum.photos/210/210?random=${seed}`}
                    alt={`Success story ${i + 1}`}
                    width={210}
                    height={210}
                    className="rounded-lg object-cover w-[210px] h-[210px]"
                  />
                </div>
              ))}
              {marqueeImages.map((seed, i) => (
                <div
                  key={`b-${seed}`}
                  aria-hidden="true"
                  className={`flex-shrink-0 w-[210px] h-[210px] transition-transform duration-300 ${
                    i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                  } hover:rotate-0`}
                >
                  <Image
                    src={`https://picsum.photos/210/210?random=${seed}`}
                    alt=""
                    width={210}
                    height={210}
                    className="rounded-lg object-cover w-[210px] h-[210px]"
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
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={workplace}
                    alt={`Workplace ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
