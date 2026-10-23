import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Field, fieldInner, fieldWrap } from "./input";

type Option = string | { value: string; label: string };

/** Native <select> styled to the design (spec: "Select = native"). */
function NativeSelect({
  label,
  options,
  placeholder,
  error,
  hint,
  required,
  wrapperClassName,
  className,
  ...props
}: React.ComponentProps<"select"> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  options: Option[];
  placeholder?: string;
  wrapperClassName?: string;
}) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <Field label={label} required={required} hint={hint} error={error} className={wrapperClassName}>
      <span className={cn(fieldWrap, "relative")}>
        <select
          data-slot="select"
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldInner, "h-[53px] cursor-pointer appearance-none pr-12", className)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 size-5 text-ink-3" />
      </span>
    </Field>
  );
}

export { NativeSelect };
