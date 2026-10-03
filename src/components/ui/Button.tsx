"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: never;
  disabled?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-8 text-lg",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-brand-hover",
  secondary:
    "bg-white text-brand-600 border border-brand-500 hover:bg-brand-50",
  ghost:
    "bg-transparent text-ink-900 hover:bg-ink-100",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      className: extraClass = "",
      ...rest
    } = props as CommonProps & { className?: string } & Record<string, unknown>;

    const className = [
      base,
      sizes[size],
      variants[variant],
      fullWidth ? "w-full" : "",
      extraClass,
    ]
      .filter(Boolean)
      .join(" ");

    const inner = (
      <>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </>
    );

    if ("href" in rest && rest.href) {
      const { href, target, rel, onClick } = rest as ButtonAsLink;
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={className}
        >
          {inner}
        </Link>
      );
    }

    const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref}
        type={buttonRest.type ?? "button"}
        className={className}
        {...buttonRest}
      >
        {inner}
      </button>
    );
  }
);
