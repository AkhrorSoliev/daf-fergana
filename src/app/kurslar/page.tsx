"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getCoursesByCategory,
  type Course,
  type CourseCategory,
} from "@/data/courses";
import {
  Clock,
  Users,
  Star,
  X,
  Phone,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const categories: CourseCategory[] = ["Individual", "Intensive", "Standard"];

const categoryInfo = {
  Individual: {
    title: "Individual kurslar",
    description:
      "Shaxsiy yondashuv va moslashtirilgan jadval orqali tezroq natijaga erishing.",
    badge: "👤 Shaxsiy yondashuv",
    gradient: "from-blue-500/10 via-indigo-400/5 to-blue-600/10",
  },
  Intensive: {
    title: "Intensiv kurslar",
    description:
      "Qisqa vaqt ichida samarali mashg‘ulotlar bilan yuqori natijaga erishing.",
    badge: "⚡ Tezkor o‘sish",
    gradient: "from-orange-500/10 via-yellow-400/5 to-orange-600/10",
  },
  Standard: {
    title: "Standart kurslar",
    description:
      "Barqaror o‘quv rejasi bilan chuqur va mustahkam bilimlarni egallang.",
    badge: "🌱 Barqaror rivojlanish",
    gradient: "from-green-500/10 via-emerald-400/5 to-green-600/10",
  },
};

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "+998 ",
    level: "",
  });
  const PHONE_PREFIX = "+998 ";
  const PHONE_PATTERN = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;

  function formatUzbekPhone(input: string): string {
    const digits = input.replace(/\D/g, "");
    const afterPrefix = digits.startsWith("998") ? digits.slice(3) : digits;
    const limited = afterPrefix.slice(0, 9);
    const part1 = limited.slice(0, 2); // operator code (2)
    const part2 = limited.slice(2, 5); // next (3)
    const part3 = limited.slice(5, 7); // next (2)
    const part4 = limited.slice(7, 9); // last (2)
    const groups = [part1, part2, part3, part4].filter(Boolean);
    return PHONE_PREFIX + groups.join(" ");
  }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const openModal = (course: Course) => {
    setSelectedCourse(course);
    setFormData((prev) => ({
      ...prev,
      level: `${course.category} - ${course.level}`,
    }));
    setIsModalOpen(true);
    setSubmitStatus("idle");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setFormData({ name: "", phone: "", level: "" });
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          level: formData.level || undefined,
          source: "Kurslar",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50/30 via-background to-white/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
      </div>

      <div className="container py-12 md:py-20 relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium mb-4"
          >
            📚 Nemis tili kurslari
          </motion.div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Bizning kurslarimiz
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A1 dan C1 gacha barcha darajalar uchun individual, intensiv va
            standart kurslar. O'zingizga mos yo'nalishni tanlang va nemis tilini
            professional darajada o'rganing.
          </p>
        </motion.div>

        {/* Course Categories */}
        <div className="space-y-12 md:space-y-16">
          {categories.map((category, categoryIndex) => {
            const coursesInCategory = getCoursesByCategory(category);
            const info = categoryInfo[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Category Header */}
                <div
                  className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-r ${info.gradient} border border-border/40`}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full text-sm font-medium mb-3">
                      {info.badge}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {info.title}
                    </h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto">
                      {info.description}
                    </p>
                  </div>
                </div>

                {/* Course Cards */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {coursesInCategory.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group"
                    >
                      <Card
                        className={`relative overflow-hidden p-6 h-full bg-gradient-to-br ${course.color} border border-border/60 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 flex flex-col`}
                      >
                        {/* Course Level Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                            {course.level}
                          </div>
                        </div>

                        {/* Course Icon */}
                        <div className="text-center mb-4">
                          <div className="text-4xl md:text-5xl mb-3 inline-block icon-hover-effect">
                            {course.icon}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            {course.category}
                          </h3>
                          <div className="text-sm text-foreground/60 font-medium">
                            {course.level} daraja
                          </div>
                        </div>

                        {/* Course Details - Fixed height container */}
                        <div className="flex-1 flex flex-col">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="font-medium">
                                  {course.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="font-medium">
                                  {course.hours}h
                                </span>
                              </div>
                            </div>

                            <p className="text-foreground/70 text-sm leading-relaxed">
                              {course.description}
                            </p>

                            {/* Features - Fixed height */}
                            <div className="space-y-2 min-h-[72px]">
                              {course.features.slice(0, 3).map((feature, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-xs text-foreground/60"
                                >
                                  <Star className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>

                            {/* Price */}
                            <div className="pt-2 border-t border-border/40">
                              <p className="text-lg font-bold text-blue-600">
                                {course.price}
                              </p>
                            </div>
                          </div>

                          {/* Register Button - Always at bottom */}
                          <div className="mt-6">
                            <Button
                              onClick={() => openModal(course)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
                            >
                              <span>Ro'yxatdan o'tish</span>
                              <motion.div
                                className="ml-2"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                              >
                                →
                              </motion.div>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-6 bg-white/90 backdrop-blur border border-border/60 rounded-2xl shadow-xl">
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-foreground mb-1">
                Qaysi kurs sizga mos?
              </p>
              <p className="text-sm text-foreground/70">
                Bepul konsultatsiya orqali eng yaxshi variantni tanlang
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link href="/#consultation" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Konsultatsiya olish
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="relative overflow-hidden p-6 md:p-8 bg-white dark:bg-card border border-border shadow-2xl rounded-2xl">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{selectedCourse?.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Kursga yozilish
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {selectedCourse?.category} - {selectedCourse?.level} daraja
                  </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ism Familiya *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Ismingizni kiriting"
                        className="pl-10 h-12 border-border/60 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefon raqam *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: formatUzbekPhone(e.target.value),
                          }))
                        }
                        onFocus={(e) => {
                          if (!formData.phone.startsWith(PHONE_PREFIX)) {
                            setFormData((prev) => ({
                              ...prev,
                              phone: PHONE_PREFIX,
                            }));
                          }
                          const el = e.currentTarget;
                          const val = el.value;
                          requestAnimationFrame(() => {
                            if (
                              el &&
                              typeof el.setSelectionRange === "function"
                            ) {
                              el.setSelectionRange(val.length, val.length);
                            }
                          });
                        }}
                        onKeyDown={(e) => {
                          const caret =
                            (e.target as HTMLInputElement).selectionStart ?? 0;
                          const isBackspace = e.key === "Backspace";
                          const isDelete = e.key === "Delete";
                          if (
                            (isBackspace && caret <= PHONE_PREFIX.length) ||
                            (isDelete && caret < PHONE_PREFIX.length)
                          ) {
                            e.preventDefault();
                          }
                        }}
                        inputMode="numeric"
                        pattern={PHONE_PATTERN.source}
                        placeholder="+998 XXX XX XX XX"
                        className="pl-10 h-12 border-border/60 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tanlangan kurs
                    </label>
                    <Input
                      value={formData.level}
                      readOnly
                      className="h-12 bg-muted/50 border-border/60"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Muvaffaqiyat! Tez orada siz bilan bog'lanamiz.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Xatolik yuz berdi. Qaytadan urinib ko'ring.
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.name.trim() ||
                      !formData.phone.trim() ||
                      !PHONE_PATTERN.test(formData.phone)
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                        Yuborilmoqda...
                      </span>
                    ) : (
                      "Ro'yxatdan o'tish"
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
