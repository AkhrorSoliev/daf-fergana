"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Phone, User, CheckCircle, AlertCircle } from "lucide-react";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  source: string;
  levelOptions?: string[];
  redirectUrlAfterSuccess?: string;
};

export function LeadModal({
  open,
  onClose,
  source,
  levelOptions = [],
  redirectUrlAfterSuccess,
}: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [, setError] = useState<string | null>(null);

  const PHONE_PREFIX = "+998 ";
  const PHONE_PATTERN = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
  function formatUzbekPhone(input: string): string {
    const digits = input.replace(/\D/g, "");
    const afterPrefix = digits.startsWith("998") ? digits.slice(3) : digits;
    const limited = afterPrefix.slice(0, 9);
    const part1 = limited.slice(0, 2);
    const part2 = limited.slice(2, 5);
    const part3 = limited.slice(5, 7);
    const part4 = limited.slice(7, 9);
    const groups = [part1, part2, part3, part4].filter(Boolean);
    return PHONE_PREFIX + groups.join(" ");
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setError(null);
      setSubmitting(false);
      setSubmitStatus("idle");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !PHONE_PATTERN.test(phone)) {
      setError("Ism va telefon majburiy");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const resp = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, level, source }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || "Yuborishda xatolik");
      }
      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
        setName("");
        setPhone("");
        setLevel(undefined);
        setSubmitting(false);
        if (redirectUrlAfterSuccess) {
          window.location.href = redirectUrlAfterSuccess;
        }
      }, 1200);
    } catch (e: unknown) {
      setSubmitStatus("error");
      setError(e instanceof Error ? e.message : "Xatolik yuz berdi");
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
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
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
                disabled={submitting}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Yordam oling
                </h3>
                <p className="text-sm text-foreground/70">
                  Kontaktlaringizni qoldiring — siz bilan tez orada bog‘lanamiz.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ism Familiya *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ismingizni kiriting"
                      className="pl-10 h-12 border-border/60"
                      disabled={submitting}
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
                      value={phone}
                      onChange={(e) =>
                        setPhone(formatUzbekPhone(e.target.value))
                      }
                      onFocus={(e) => {
                        if (!phone.startsWith(PHONE_PREFIX)) {
                          setPhone(PHONE_PREFIX);
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
                      placeholder="+998 XX XXX XX XX"
                      className="pl-10 h-12 border-border/60"
                      disabled={submitting}
                      required
                    />
                  </div>
                </div>

                {levelOptions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Yo‘nalish
                    </label>
                    <Select
                      value={level}
                      onValueChange={(value) => setLevel(value)}
                    >
                      <SelectTrigger className="w-full h-12 border-border/60">
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

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

                <Button
                  type="submit"
                  disabled={
                    submitting ||
                    !name.trim() ||
                    !phone.trim() ||
                    !PHONE_PATTERN.test(phone)
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? (
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
                    "Yuborish"
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
