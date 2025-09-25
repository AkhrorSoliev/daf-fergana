"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Laptop, Check, X } from "lucide-react";

type Mode = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("system");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (typeof localStorage !== "undefined" &&
      localStorage.getItem("theme")) as Mode | null;
    setMode(saved || "system");
    const m = window.matchMedia("(max-width: 640px)");
    setIsSmall(m.matches);
    const onChange = () => setIsSmall(m.matches);
    try {
      m.addEventListener("change", onChange);
    } catch {
      // Safari
      // @ts-ignore
      m.addListener(onChange);
    }
    return () => {
      try {
        m.removeEventListener("change", onChange);
      } catch {
        // @ts-ignore
        m.removeListener(onChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const apply = (next: Mode) => {
    setMode(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    const root = document.documentElement;
    if (next === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const dark = mql.matches;
      root.classList.toggle("dark", dark);
      root.style.colorScheme = dark ? "dark" : "light";
    } else {
      const dark = next === "dark";
      root.classList.toggle("dark", dark);
      root.style.colorScheme = dark ? "dark" : "light";
    }
    setOpen(false);
  };

  if (!mounted) return null;

  const icon =
    mode === "light" ? (
      <Sun className="w-5 h-5" />
    ) : mode === "dark" ? (
      <Moon className="w-5 h-5" />
    ) : (
      <Laptop className="w-5 h-5" />
    );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open theme menu"
        title={`Theme: ${mode}`}
        className="p-2 rounded-lg text-foreground hover:bg-muted/60 transition-colors"
      >
        {icon}
      </button>
      {open && !isSmall && (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50"
        >
          <MenuItem
            active={mode === "light"}
            onSelect={() => apply("light")}
            icon={<Sun className="w-4 h-4" />}
          >
            Yorug'
          </MenuItem>
          <MenuItem
            active={mode === "dark"}
            onSelect={() => apply("dark")}
            icon={<Moon className="w-4 h-4" />}
          >
            Qorong'i
          </MenuItem>
          <MenuItem
            active={mode === "system"}
            onSelect={() => apply("system")}
            icon={<Laptop className="w-4 h-4" />}
          >
            Tizim
          </MenuItem>
        </div>
      )}

      {open && isSmall && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Mavzu</span>
              <button
                aria-label="Yopish"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-foreground/80 hover:bg-muted/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2">
              <MenuItem
                active={mode === "light"}
                onSelect={() => apply("light")}
                icon={<Sun className="w-5 h-5" />}
              >
                Yorug'
              </MenuItem>
              <MenuItem
                active={mode === "dark"}
                onSelect={() => apply("dark")}
                icon={<Moon className="w-5 h-5" />}
              >
                Qorong'i
              </MenuItem>
              <MenuItem
                active={mode === "system"}
                onSelect={() => apply("system")}
                icon={<Laptop className="w-5 h-5" />}
              >
                Tizim
              </MenuItem>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full mt-1 rounded-xl bg-muted/70 text-foreground py-2 text-sm"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  active,
  onSelect,
  icon,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      className={`w-full flex items-center justify-between px-3 py-3 text-base transition-colors ${
        active
          ? "bg-muted/60 text-foreground"
          : "hover:bg-muted/50 text-foreground/80"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
      {active && <Check className="w-4 h-4" />}
    </button>
  );
}
