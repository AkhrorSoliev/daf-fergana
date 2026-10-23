import * as React from "react";

import { cn } from "@/lib/utils";

export const fieldWrap =
  "flex min-h-14 items-center overflow-hidden rounded-[18px] border-[1.5px] border-line bg-white transition-[border-color,box-shadow] duration-200 ease-out focus-within:border-ink focus-within:shadow-[0_0_0_4px_var(--green-100)] has-[[aria-invalid=true]]:border-danger has-[[aria-invalid=true]]:focus-within:shadow-[0_0_0_4px_var(--danger-soft)] has-[:is(input,select,textarea):disabled]:bg-paper-2";

const fieldInner =
  "min-w-0 flex-1 border-0 bg-transparent px-[18px] text-base font-medium text-ink outline-none placeholder:text-ink-4 focus-visible:shadow-none disabled:cursor-not-allowed";

/** Label + hint/error shell shared by Input, Textarea, NativeSelect. */
function Field({
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  label?: React.ReactNode;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <span className="text-sm font-semibold leading-tight text-ink-2">
          {label}
          {required && <span className="text-coral-500"> *</span>}
        </span>
      )}
      {children}
      {(error || hint) && (
        <span
          className={cn(
            "text-[13px] font-medium leading-snug",
            error ? "text-danger-ink" : "text-ink-3"
          )}
        >
          {error || hint}
        </span>
      )}
    </label>
  );
}

type FieldProps = {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  /** Wrapper (outer label) className */
  wrapperClassName?: string;
};

function Input({
  label,
  hint,
  error,
  prefix,
  wrapperClassName,
  className,
  required,
  ...props
}: Omit<React.ComponentProps<"input">, "prefix"> &
  FieldProps & { prefix?: React.ReactNode }) {
  return (
    <Field
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <span className={fieldWrap}>
        {prefix && (
          <span className="pl-[18px] text-base font-semibold text-ink-3">
            {prefix}
          </span>
        )}
        <input
          data-slot="input"
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldInner, "h-[53px]", prefix && "pl-1.5", className)}
          {...props}
        />
      </span>
    </Field>
  );
}

function Textarea({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  required,
  rows = 4,
  ...props
}: React.ComponentProps<"textarea"> & FieldProps) {
  return (
    <Field
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={wrapperClassName}
    >
      <span className={cn(fieldWrap, "items-stretch")}>
        <textarea
          data-slot="textarea"
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldInner, "resize-y py-4 leading-snug", className)}
          {...props}
        />
      </span>
    </Field>
  );
}

export { Input, Textarea, Field, fieldInner };
