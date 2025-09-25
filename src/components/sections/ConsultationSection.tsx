"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/I18nProvider";
import { Phone, Mail, CheckCircle, AlertCircle, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(1, "Phone number is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function ConsultationSection() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "+998 " },
  });

  const PHONE_PREFIX = "+998 ";
  const PHONE_PATTERN = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;

  function formatUzbekPhone(input: string): string {
    // Keep digits only
    const digits = input.replace(/\D/g, "");
    // Remove leading country code if user typed it
    const afterPrefix = digits.startsWith("998") ? digits.slice(3) : digits;
    const limited = afterPrefix.slice(0, 9);
    const part1 = limited.slice(0, 2); // operator code (2)
    const part2 = limited.slice(2, 5); // next (3)
    const part3 = limited.slice(5, 7); // next (2)
    const part4 = limited.slice(7, 9); // last (2)
    const groups = [part1, part2, part3, part4].filter(Boolean);
    return PHONE_PREFIX + groups.join(" ");
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          source: "Bepul konsultatsiya",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="consultation"
      className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-secondary/10 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-secondary/15 rounded-full blur-2xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
          >
            {t("consultation.badge")}
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("consultation.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t("consultation.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden p-6 md:p-8 lg:p-10 shadow-xl border border-border/60 bg-white/95 dark:bg-card">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-50" />

              <div className="relative">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground mb-3"
                    >
                      {t("consultation.form.name")} *
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder={t("consultation.form.namePlaceholder")}
                      className="h-12 md:h-14 text-base border-border/60 focus:border-accent focus:ring-accent/20 transition-all duration-200"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-foreground mb-3"
                    >
                      {t("consultation.form.phone")} *
                    </label>
                    <Input
                      id="phone"
                      {...register("phone", {
                        required: true,
                        validate: (v) => PHONE_PATTERN.test(v),
                      })}
                      value={watch("phone")}
                      onChange={(e) => {
                        const formatted = formatUzbekPhone(e.target.value);
                        setValue("phone", formatted, { shouldValidate: true });
                      }}
                      onFocus={(e) => {
                        if (
                          !watch("phone") ||
                          !watch("phone").startsWith(PHONE_PREFIX)
                        ) {
                          setValue("phone", PHONE_PREFIX, {
                            shouldValidate: true,
                          });
                        }
                        // Move caret to end
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
                        // Prevent deleting the fixed prefix
                        const _current = watch("phone") || "";
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
                      placeholder={t("consultation.form.phonePlaceholder")}
                      className="h-12 md:h-14 text-base border-border/60 focus:border-accent focus:ring-accent/20 transition-all duration-200"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {t("consultation.form.phoneFormatError")}
                      </motion.p>
                    )}
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-destructive flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 md:h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                          />
                          {t("consultation.form.sending")}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Phone className="w-5 h-5 mr-2" />
                          {t("consultation.form.submit")}
                        </span>
                      )}
                    </Button>
                  </motion.div>

                  {/* Enhanced Status Messages */}
                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center text-green-800 dark:text-green-200"
                      >
                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                        <span className="font-medium">
                          {t("consultation.form.success")}
                        </span>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center text-red-800 dark:text-red-200"
                      >
                        <AlertCircle className="w-5 h-5 mr-3 text-red-600" />
                        <span className="font-medium">
                          {t("consultation.form.error")}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Enhanced Contact Info */}
                <motion.div
                  className="mt-8 pt-6 border-t border-border/60"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                    <motion.a
                      href="tel:+998905351099"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground/70">
                        +998 90 535 10 99
                      </span>
                    </motion.a>

                    <motion.a
                      href="mailto:info@daf-fergana.uz"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground/70">
                        info@daf-fergana.uz
                      </span>
                    </motion.a>

                    <motion.a
                      href="https://t.me/daffergana"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                      <Send className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground/70">
                        Telegram
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
