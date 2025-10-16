"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Send, Facebook, Twitter } from "lucide-react";

type ShareButtonsProps = {
  url?: string; // if not provided, will use current location
  title: string;
  text?: string;
  className?: string;
};

export default function ShareButtons({
  url,
  title,
  text,
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [url]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text ? `${title} — ${text}` : title);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border-[#229ED9]/40"
        >
          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegramda ulashish"
          >
            <Send className="w-4 h-4" /> Telegram
          </a>
        </Button>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border-[#1877F2]/40"
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebookda ulashish"
          >
            <Facebook className="w-4 h-4" /> Facebook
          </a>
        </Button>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
        >
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) da ulashish"
          >
            <Twitter className="w-4 h-4" /> X
          </a>
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
              setCopied(true);
            } catch {}
          }}
          aria-label={copied ? "Nusxalandi" : "Havolani nusxalash"}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="ml-1">{copied ? "Nusxalandi" : "Nusxa olish"}</span>
        </Button>
      </div>
    </div>
  );
}
