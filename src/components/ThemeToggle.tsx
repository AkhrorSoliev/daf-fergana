"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";

type Mode = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("system");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = (typeof localStorage !== "undefined" &&
      localStorage.getItem("theme")) as Mode | null;
    setMode(saved || "system");
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
      {open && (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-36 rounded-lg border border-border bg-background shadow-lg overflow-hidden z-50"
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
      className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
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
