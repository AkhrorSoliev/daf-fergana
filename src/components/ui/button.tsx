import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-pill border-[1.5px] border-transparent font-semibold tracking-[-0.01em] no-underline outline-none transition-[background,transform,box-shadow] duration-200 ease-out hover:-translate-y-px active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:last-child]:transition-transform [&>svg:last-child]:duration-200 hover:[&>svg:last-child]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-navy-700 hover:shadow-md",
        accent: "bg-green-500 text-ink hover:bg-green-300 hover:shadow-md",
        secondary:
          "border-line-strong bg-white text-ink hover:bg-paper-2 hover:translate-y-0",
        outline:
          "border-line-strong bg-white text-ink hover:bg-paper-2 hover:translate-y-0",
        ghost: "bg-transparent text-ink hover:bg-ink/6 hover:translate-y-0",
        inverse: "bg-white text-ink hover:bg-sun-100 hover:shadow-md",
        destructive: "bg-danger text-white hover:opacity-90",
        link: "rounded-none border-0 p-0 text-ink underline decoration-green-500 decoration-2 underline-offset-4 hover:translate-y-0 hover:text-green-ink",
      },
      size: {
        sm: "h-[38px] min-w-[38px] gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        default:
          "h-12 min-w-12 gap-2 px-[22px] text-base [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "h-[58px] min-w-[58px] gap-2.5 px-7 text-[17px] [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

const ICON_SIZES = { sm: "size-9", md: "size-11", lg: "size-14" } as const;
const ICON_VARIANTS = {
  primary: "bg-ink text-white hover:bg-navy-700",
  accent: "bg-green-500 text-ink hover:bg-green-300",
  secondary: "border-line-strong bg-white text-ink hover:bg-paper-2",
  soft: "bg-paper-2 text-ink hover:bg-paper-3",
  ghost: "bg-transparent text-ink hover:bg-ink/6",
  inverse: "bg-white/12 text-white hover:bg-white/20",
} as const;

function IconButton({
  variant = "soft",
  size = "md",
  label,
  className,
  asChild = false,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  variant?: keyof typeof ICON_VARIANTS;
  size?: keyof typeof ICON_SIZES;
  label: string;
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="icon-button"
      aria-label={label}
      className={cn(
        "inline-grid shrink-0 cursor-pointer place-items-center rounded-full border-[1.5px] border-transparent no-underline outline-none transition-[background,transform] duration-200 ease-spring active:scale-[0.92] [&_svg]:size-5",
        ICON_SIZES[size],
        ICON_VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}

export { Button, IconButton, buttonVariants };
