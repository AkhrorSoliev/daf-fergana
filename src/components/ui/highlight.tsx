import * as React from "react";

import { cn } from "@/lib/utils";

const COLORS = {
  inherit: "",
  green: "text-green-600",
  coral: "text-coral-500",
  sky: "text-sky-500",
  lilac: "text-lilac-500",
  sun: "text-sun-ink",
  ink: "text-ink",
} as const;

/** One serif-italic emphasised word per headline. */
function Highlight({
  color = "inherit",
  marker,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  color?: keyof typeof COLORS;
  marker?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-serif font-normal italic tracking-[-0.01em] pr-[0.04em]",
        COLORS[color],
        marker &&
          "bg-[linear-gradient(transparent_60%,var(--sun-400)_60%,var(--sun-400)_92%,transparent_92%)]",
        className
      )}
      {...props}
    />
  );
}

export { Highlight };
