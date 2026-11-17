"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Images, Plus, Send, X } from "lucide-react";
import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { Button, IconButton } from "@/components/ui/button";
import { RESULT_CHANNEL, RESULT_PHOTO_BASE, RESULT_POSTS, type ResultPost } from "@/data/natijalar";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

const TINTS = ["bg-sun-100", "bg-sky-100", "bg-green-100", "bg-coral-100"];
const PAGE = 12;

function Tile({ post, k, onOpen }: { post: ResultPost; k: number; onOpen: (i: number) => void }) {
  const p = post.photos[0];
  return (
    <button
      type="button"
      onClick={() => onOpen(k)}
      aria-label={post.text.split("\n")[0] || `#${post.id}`}
      style={{ aspectRatio: `${p.w} / ${p.h}` }}
      className={cn("relative mb-3 block w-full cursor-pointer overflow-hidden rounded-[22px] break-inside-avoid", TINTS[k % 4])}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={RESULT_PHOTO_BASE + p.file} alt="" loading="lazy" className="block size-full object-cover" />
      {post.photos.length > 1 && (
        <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-xs font-semibold text-white">
          <Images className="size-3.5" />
          {post.photos.length}
        </span>
      )}
    </button>
  );
}

/** Telegram colours hashtags, mentions and links; the rest stays plain. */
function PostText({ text }: { text: string }) {
  return (
    <p className="text-[15px] leading-[1.45] break-words whitespace-pre-line text-ink">
      {text.split(/([#@][\p{L}\p{N}_]+|https?:\/\/\S+)/u).map((part, i) =>
        i % 2 ? (
          <span key={i} className="text-sky-ink">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
}

function PostDialog({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const n = RESULT_POSTS.length;
  const post = RESULT_POSTS[index];
  const album = post.photos.length > 1;

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [index, n, onClose, onIndex]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink/92 px-3 pt-16 pb-[88px]"
    >
      <div className="absolute top-3 right-3 left-4 flex items-center justify-between text-sm font-semibold text-white">
        <span>
          {index + 1} / {n}
        </span>
        <IconButton label={t("results.close")} variant="inverse" onClick={onClose}>
          <X />
        </IconButton>
      </div>

      {/* Phone: one scrolling Telegram bubble. Desktop: photo left, post right. */}
      <article
        key={post.id}
        className="flex max-h-full w-full max-w-[440px] animate-[daf-pop_360ms_var(--ease-out)] flex-col overflow-y-auto rounded-[20px] bg-paper shadow-lg md:h-full md:max-h-[640px] md:max-w-[920px] md:flex-row md:overflow-hidden"
      >
        <div
          className={cn(
            "max-md:order-2 md:min-h-0 md:min-w-0 md:flex-1 md:overflow-y-auto md:bg-paper-2",
            album ? "grid grid-cols-2 content-start gap-0.5" : "md:flex md:items-center md:justify-center"
          )}
        >
          {post.photos.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.file}
              src={RESULT_PHOTO_BASE + p.file}
              alt=""
              width={p.w}
              height={p.h}
              className={cn(
                "block h-auto w-full",
                album ? "aspect-square object-cover" : "md:max-h-full md:w-auto md:max-w-full md:object-contain",
                // an odd album leads with one wide photo, like Telegram
                album && post.photos.length % 2 === 1 && i === 0 && "col-span-2 aspect-[4/3]"
              )}
            />
          ))}
        </div>

        <div className="max-md:contents md:flex md:w-[360px] md:shrink-0 md:flex-col md:overflow-y-auto">
          <header className="flex items-center gap-3 px-4 py-3 max-md:order-1">
            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/daf-logo-navy.png" alt="" className="size-full object-contain" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-semibold text-ink">DaF Natijalar</span>
              <span className="truncate text-[13px] text-ink-3">@{RESULT_CHANNEL}</span>
            </span>
          </header>
          <div className="flex flex-col gap-3 px-4 pt-3 pb-4 max-md:order-3 md:flex-1 md:pt-1">
            {post.text && <PostText text={post.text} />}
            <a
              href={`https://t.me/${RESULT_CHANNEL}/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 rounded-full bg-sky-100 px-4 py-2.5 text-sm font-semibold text-sky-ink no-underline"
            >
              <Send className="size-4" />
              {t("results.openInTelegram")}
            </a>
          </div>
        </div>
      </article>

      <div className="absolute bottom-5 flex gap-3">
        <IconButton label={t("results.prev")} variant="inverse" size="lg" onClick={() => onIndex((index - 1 + n) % n)}>
          <ArrowLeft />
        </IconButton>
        <IconButton label={t("results.next")} variant="accent" size="lg" onClick={() => onIndex((index + 1) % n)}>
          <ArrowRight />
        </IconButton>
      </div>
    </div>
  );
}

export default function ResultsPageClient() {
  const { t } = useI18n();
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <PageHead
        eyebrow={t("about.resultsBadge")}
        title={<HighlightLast text={t("about.resultsTitle")} color="coral" />}
        subtitle={t("about.resultsSubtitle")}
      />
      <Section className="pt-0">
        <div className="kit-masonry">
          {RESULT_POSTS.slice(0, shown).map((post, k) => (
            <Tile key={post.id} post={post} k={k} onOpen={setOpen} />
          ))}
        </div>
        {shown < RESULT_POSTS.length && (
          <div className="mt-6 flex justify-center">
            <Button variant="secondary" onClick={() => setShown(RESULT_POSTS.length)}>
              {t("home.allTeachers")}
              <Plus />
            </Button>
          </div>
        )}
      </Section>
      {open !== null && <PostDialog index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
