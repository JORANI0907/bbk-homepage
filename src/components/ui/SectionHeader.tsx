import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className="text-sm font-semibold text-brand-600 tracking-tight">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl md:text-4xl font-bold text-ink-900 leading-tight tracking-tight break-keep">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-ink-600 leading-relaxed break-keep max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
