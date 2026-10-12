import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green";

const variants: Record<Variant, string> = {
  primary: "bg-brand-green text-white hover:bg-brand-green-dark",
  secondary:
    "border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}