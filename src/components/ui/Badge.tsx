import type { ReactNode } from "react";

type Tone = "brand" | "subtle" | "tag" | "popular";

type BadgeProps = {
  tone?: Tone;
  size?: "sm" | "md";
  children: ReactNode;
};

const tones: Record<Tone, string> = {
  brand: "bg-brand-500 text-white",
  subtle: "bg-brand-50 text-brand-700",
  tag: "bg-white text-ink-600 border border-ink-200",
  popular: "bg-brand-500 text-white ring-2 ring-brand-100",
};

const sizes = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
} as const;

export function Badge({ tone = "subtle", size = "sm", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${tones[tone]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
