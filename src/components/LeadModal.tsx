"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useToast } from "@/components/ui/toast";
import { formatUzbekPhone, PHONE_PREFIX, PHONE_PATTERN } from "@/utils/phone";
import { useI18n } from "@/i18n/I18nProvider";
import { branches, branchCity } from "@/data/branches";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  source: string;
  levelOptions?: string[];
  defaultLevel?: string;
  subtitle?: string;
  /** Show the branch select (course sign-ups) */
  askBranch?: boolean;
  redirectUrlAfterSuccess?: string;
};

export function LeadModal({
  open,
  onClose,
  source,
  levelOptions = [],
  defaultLevel,
  subtitle,
  askBranch,
  redirectUrlAfterSuccess,
}: LeadModalProps) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState<string | undefined>(defaultLevel);
  const [branch, setBranch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setSubmitting(false);
      setLevel(defaultLevel);
    }
  }, [open, defaultLevel]);

  const valid = firstName.trim() && lastName.trim() && PHONE_PATTERN.test(phone) && (!askBranch || branch);

  const handleSubmit = async () => {
    if (!valid) {
      setError(t("leadModal.validationError"));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const resp = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          level,
          source,
          branch: askBranch ? branch : undefined,
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || t("leadModal.submitError"));
      }
      toast({ title: t("leadModal.success") });
      onClose();
      setFirstName("");
      setLastName("");
      setPhone("");
      setLevel(undefined);
      setBranch("");
      setSubmitting(false);
      if (redirectUrlAfterSuccess) window.location.href = redirectUrlAfterSuccess;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : t("leadModal.generalError");
      setError(msg);
      toast({ tone: "error", title: t("leadModal.error") });
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={t("leadModal.title")} subtitle={subtitle ?? t("leadModal.subtitle")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-3.5"
      >
        <Input
          label={t("leadModal.firstName").replace(/\s*\*$/, "")}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t("leadModal.firstNamePlaceholder")}
          disabled={submitting}
          autoComplete="given-name"
        />
        <Input
          label={t("leadModal.lastName").replace(/\s*\*$/, "")}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={t("leadModal.lastNamePlaceholder")}
          disabled={submitting}
          autoComplete="family-name"
        />
        <Input
          label={t("leadModal.phone").replace(/\s*\*$/, "")}
          required
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(formatUzbekPhone(e.target.value))}
          onFocus={() => !phone.startsWith(PHONE_PREFIX) && setPhone(PHONE_PREFIX)}
          placeholder="+998 XX XXX XX XX"
          disabled={submitting}
          autoComplete="tel"
          error={error && !valid ? error : undefined}
        />
        {levelOptions.length > 0 && (
          <NativeSelect
            label={t("leadModal.direction")}
            placeholder={t("leadModal.directionPlaceholder")}
            options={levelOptions}
            value={level ?? ""}
            onChange={(e) => setLevel(e.target.value)}
          />
        )}
        {askBranch && (
          <NativeSelect
            label={t("consultation.form.branch").replace(/\s*\*$/, "")}
            required
            placeholder={t("consultation.form.branchPlaceholder")}
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            options={branches.map((b) => ({ value: b.id, label: branchCity(b, locale) }))}
          />
        )}
        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting || !valid}>
          {submitting ? t("leadModal.sending") : t("leadModal.submit")}
        </Button>
      </form>
    </Dialog>
  );
}
