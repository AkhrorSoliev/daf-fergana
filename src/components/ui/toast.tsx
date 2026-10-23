"use client";

import * as React from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";

import { cn } from "@/lib/utils";

const TONES = {
  success: { bg: "bg-green-500", Icon: CircleCheck },
  error: { bg: "bg-danger", Icon: CircleAlert },
  info: { bg: "bg-sky-500", Icon: Info },
  warning: { bg: "bg-sun-400", Icon: CircleAlert },
} as const;

type ToastTone = keyof typeof TONES;

function Toast({
  tone = "success",
  title,
  children,
  onClose,
  className,
}: {
  tone?: ToastTone;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}) {
  const { bg, Icon } = TONES[tone];
  return (
    <div
      role="status"
      className={cn(
        "flex max-w-[420px] items-start gap-3.5 rounded-[22px] bg-ink p-3.5 text-white shadow-float animate-[daf-rise_360ms_var(--ease-out)]",
        className
      )}
    >
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-full text-ink", bg)}>
        <Icon className="size-5" />
      </span>
      <div className="flex flex-1 flex-col gap-[3px] pt-0.5">
        {title && <strong className="text-[15px] leading-snug font-semibold">{title}</strong>}
        {children && <span className="text-sm leading-[1.45] text-white/75">{children}</span>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Yopish" className="cursor-pointer p-1.5 text-white/70">
          <X className="size-[18px]" />
        </button>
      )}
    </div>
  );
}

type ToastInput = { tone?: ToastTone; title: React.ReactNode; body?: React.ReactNode };
const ToastCtx = React.createContext<(t: ToastInput) => void>(() => {});
export const useToast = () => React.useContext(ToastCtx);

/** Mount once in the root layout; call useToast()({ title, body }) anywhere. Auto-hides after 3.2s. */
function ToastProvider({ children }: { children: React.ReactNode }) {
  const [t, setT] = React.useState<ToastInput | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = React.useCallback((n: ToastInput) => {
    setT(n);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setT(null), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {t && (
        <div className="pointer-events-none fixed inset-x-3 bottom-4 z-[120] flex justify-center">
          <Toast tone={t.tone} title={t.title} className="pointer-events-auto" onClose={() => setT(null)}>
            {t.body}
          </Toast>
        </div>
      )}
    </ToastCtx.Provider>
  );
}

export { Toast, ToastProvider };
