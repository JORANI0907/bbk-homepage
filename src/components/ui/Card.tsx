import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
  padded?: "sm" | "md" | "lg";
  tone?: "white" | "sunken" | "brand-soft";
  children: ReactNode;
};

const pad = { sm: "p-4", md: "p-6", lg: "p-8" } as const;
const tones = {
  white: "bg-white",
  sunken: "bg-ink-50",
  "brand-soft": "bg-brand-50",
} as const;

export function Card({
  hoverable = false,
  padded = "md",
  tone = "white",
  className = "",
  children,
  ...rest
}: CardProps) {
  const base =
    "rounded-2xl border border-ink-200 shadow-soft transition-all duration-150";
  const hover = hoverable
    ? "hover:-translate-y-1 hover:shadow-card hover:border-brand-200 cursor-pointer"
    : "";
  return (
    <div
      className={`${base} ${tones[tone]} ${pad[padded]} ${hover} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
