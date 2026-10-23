"use client";

import { forwardRef, useEffect } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "daf-hero-castle": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        background?: string;
      };
    }
  }
}

/** Client-only 3D scene. three.js is imported after first paint so LCP stays the server-rendered copy. */
const HeroCastle = forwardRef<HTMLElement>(function HeroCastle(_props, ref) {
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      if (!cancelled) import("@/lib/hero-castle.mjs");
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const id = setTimeout(load, 300);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);
  return <daf-hero-castle background="true" ref={ref} />;
});

export default HeroCastle;
