"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";
import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useToast } from "@/components/ui/toast";
import { useI18n } from "@/i18n/I18nProvider";
import { formatUzbekPhone, PHONE_PREFIX, PHONE_PATTERN } from "@/utils/phone";
import { branches, branchCity } from "@/data/branches";
import { useBranchParam } from "@/hooks/useBranchParam";

const STORAGE_KEY = "daf_consultation_leads";

type StoredLead = { name: string; phone: string; branch: string; ts: number };

function getStoredLeads(): StoredLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function isDuplicate(name: string, phone: string): boolean {
  const normPhone = phone.replace(/[^+\d]/g, "");
  return getStoredLeads().some(
    (l) =>
      l.name.trim().toLowerCase() === name.trim().toLowerCase() &&
      l.phone.replace(/[^+\d]/g, "") === normPhone,
  );
}

function storeLead(name: string, phone: string, branch: string) {
  const leads = getStoredLeads();
  leads.push({ name, phone, branch, ts: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

const formSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  phone: z.string().regex(PHONE_PATTERN),
});

type FormData = z.infer<typeof formSchema>;

export default function ConsultationSection() {
  const { t, locale } = useI18n();
  const toast = useToast();
  const isDe = locale === "de";
  const dePhone = "+49 176 238 97 113";
  const deEmail = "orif.ahmadaliyev@consultinguz.de";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useBranchParam();

  const selectedBranch = useMemo(
    () => branches.find((b) => b.id === selectedBranchId) ?? branches[0],
    [selectedBranchId],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: PHONE_PREFIX },
  });

  const onSubmit = async (data: FormData) => {
    setDuplicate(false);
    if (isDuplicate(`${data.firstName} ${data.lastName}`, data.phone)) {
      setDuplicate(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          branch: selectedBranchId,
          source: "Bepul konsultatsiya",
        }),
      });
      if (response.ok) {
        storeLead(`${data.firstName} ${data.lastName}`, data.phone, selectedBranchId);
        toast({ title: t("consultation.form.success") });
        reset({ firstName: "", lastName: "", phone: PHONE_PREFIX });
      } else {
        toast({ tone: "error", title: t("consultation.form.error") });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({ tone: "error", title: t("consultation.form.error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneRow = isDe ? dePhone : selectedBranch.phones[0];
  const emailRow = isDe ? deEmail : "info@daf-sprachzentrum.uz";
  const rowCls =
    "flex items-center gap-3 text-base font-medium text-white no-underline hover:text-green-300";
  const star = (s: string) => s.replace(/\s*\*$/, "");

  return (
    <Section tone="ink" inset id="consultation">
      <div className="kit-split">
        <div className="flex flex-col gap-8">
          <SectionHeader
            className="!mb-0"
            inverse
            eyebrow={t("consultation.badge")}
            eyebrowTone="green"
            size="h1"
            title={<HighlightLast text={t("consultation.title")} color="green" />}
            subtitle={t("consultation.subtitle")}
          />
          <div className="flex flex-col gap-3">
            <a href={`tel:${phoneRow.replace(/[^+\d]/g, "")}`} className={rowCls}>
              <Phone className="size-[18px] text-green-500" />
              {phoneRow}
            </a>
            <a href={`mailto:${emailRow}`} className={rowCls}>
              <Mail className="size-[18px] text-green-500" />
              {emailRow}
            </a>
            {!isDe && (
              <a href={selectedBranch.telegramChannel} target="_blank" rel="noopener noreferrer" className={rowCls}>
                <Send className="size-[18px] text-green-500" />
                Telegram
              </a>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-3.5 rounded-[30px] bg-paper p-[clamp(20px,4vw,32px)] text-ink"
        >
          <Input
            label={star(t("consultation.form.firstName"))}
            required
            placeholder={t("consultation.form.firstNamePlaceholder")}
            autoComplete="given-name"
            error={errors.firstName ? " " : undefined}
            {...register("firstName")}
          />
          <Input
            label={star(t("consultation.form.lastName"))}
            required
            placeholder={t("consultation.form.lastNamePlaceholder")}
            autoComplete="family-name"
            error={errors.lastName ? " " : undefined}
            {...register("lastName")}
          />
          <Input
            label={star(t("consultation.form.phone"))}
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder={t("consultation.form.phonePlaceholder")}
            error={errors.phone ? t("consultation.form.phoneFormatError") : undefined}
            {...register("phone")}
            value={watch("phone")}
            onChange={(e) => setValue("phone", formatUzbekPhone(e.target.value), { shouldValidate: true })}
            onFocus={() => !watch("phone")?.startsWith(PHONE_PREFIX) && setValue("phone", PHONE_PREFIX)}
          />
          <NativeSelect
            label={star(t("consultation.form.branch"))}
            required
            placeholder={t("consultation.form.branchPlaceholder")}
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            options={branches.map((b) => ({ value: b.id, label: branchCity(b, locale) }))}
          />
          {duplicate && (
            <p className="rounded-2xl bg-sun-100 px-4 py-3 text-sm font-medium text-sun-ink">
              {t("consultation.form.alreadySent")}
            </p>
          )}
          <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("consultation.form.sending") : t("consultation.form.submit")}
            <ArrowRight />
          </Button>
        </form>
      </div>
    </Section>
  );
}
