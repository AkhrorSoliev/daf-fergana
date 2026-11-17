"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import { RESULT_PHOTO_BASE, type ResultVideo } from "@/data/natijalar";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/** Our own video chrome instead of the browser controls: tap to pause, seek bar, sound toggle. */
function Player({ base, name, result, onEnd }: { base: string; name?: string; result: string; onEnd: () => void }) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const pct = `${progress * 100}%`;

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  return (
    <>
      <video
        ref={video}
        src={`${base}.mp4`}
        poster={`${base}.jpg`}
        autoPlay
        playsInline
        muted={muted}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
        onEnded={onEnd}
        className="size-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={t(paused ? "results.play" : "results.pause")}
        className="group absolute inset-0 grid cursor-pointer place-items-center bg-gradient-to-t from-ink/80 via-transparent to-transparent"
      >
        <span
          className={cn(
            "grid size-14 place-items-center rounded-full bg-ink/55 text-white backdrop-blur-sm transition-opacity duration-200",
            paused ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        >
          {paused ? <Play className="size-6 translate-x-0.5 fill-current" /> : <Pause className="size-6 fill-current" />}
        </span>
      </button>
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={t(muted ? "results.unmute" : "results.mute")}
        className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full bg-ink/55 text-white backdrop-blur-sm"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
      <div className="pointer-events-none absolute right-3 bottom-3 left-3 flex flex-col gap-2 text-white">
        <span className="flex flex-col gap-0.5">
          {name && <span className="leading-tight font-semibold">{name}</span>}
          <span className={cn("leading-snug", name ? "text-[13px] text-white/80" : "font-semibold")}>{result}</span>
        </span>
        {/* a native range gives drag, touch and keyboard seeking for free; only its look is ours */}
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={progress}
          aria-label={t("results.seek")}
          onChange={(e) => {
            const el = video.current;
            if (el && el.duration) el.currentTime = +e.target.value * el.duration;
            setProgress(+e.target.value);
          }}
          style={{ background: `linear-gradient(to right, var(--green-500) ${pct}, rgb(255 255 255 / .35) ${pct})` }}
          className="pointer-events-auto h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    </>
  );
}

/** Vertical video stories in one swipeable row; a card plays in place, one at a time. */
export function VideoStrip({ videos, title }: { videos: ResultVideo[]; title?: React.ReactNode }) {
  const { t } = useI18n();
  const [playing, setPlaying] = useState<number | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        {title ? <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{title}</h2> : <span />}
        <div className="flex gap-2">
          <IconButton label={t("results.prev")} onClick={() => scroll(-1)}>
            <ArrowLeft />
          </IconButton>
          <IconButton label={t("results.next")} onClick={() => scroll(1)}>
            <ArrowRight />
          </IconButton>
        </div>
      </div>
      <div ref={row} className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
        {videos.map((v) => {
          const base = `${RESULT_PHOTO_BASE}video/${v.id}`;
          return (
            <div
              key={v.id}
              className="relative aspect-[9/16] w-[62vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-ink"
            >
              {playing === v.id ? (
                <Player base={base} name={v.name} result={v.result} onEnd={() => setPlaying(null)} />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(v.id)}
                  aria-label={[v.name, v.result].filter(Boolean).join(" — ")}
                  className="group block size-full cursor-pointer text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${base}.jpg`} alt="" loading="lazy" className="size-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-accent text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
                    <Play className="size-6 translate-x-0.5 fill-current" />
                  </span>
                  <span className="absolute right-3 bottom-3 left-3 flex flex-col gap-0.5 text-white">
                    {v.name && <span className="leading-tight font-semibold">{v.name}</span>}
                    <span className={cn("leading-snug", v.name ? "text-[13px] text-white/80" : "font-semibold")}>{v.result}</span>
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
