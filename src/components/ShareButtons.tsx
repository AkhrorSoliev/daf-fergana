"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, IconButton } from "@/components/ui/button";
import { Copy, Check, Send, Facebook } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type ShareButtonsProps = {
  url?: string; // if not provided, will use current location
  title: string;
  text?: string;
  className?: string;
};

export default function ShareButtons({ url, title, text, className }: ShareButtonsProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => url ?? (typeof window !== "undefined" ? window.location.href : ""), [url]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text ? `${title} — ${text}` : title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2.5">
        <IconButton asChild label={t("share.telegram")} variant="secondary">
          <a href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`} target="_blank" rel="noopener noreferrer">
            <Send />
          </a>
        </IconButton>
        <IconButton asChild label={t("share.facebook")} variant="secondary">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
        </IconButton>
        <Button variant="secondary" size="sm" className="h-11" onClick={copy}>
          {copied ? <Check /> : <Copy />}
          {copied ? t("share.copied") : t("share.copyLink")}
        </Button>
      </div>
    </div>
  );
}
