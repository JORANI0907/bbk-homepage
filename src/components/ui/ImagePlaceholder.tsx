import type { ReactNode } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Ratio = "4/3" | "16/9" | "21/9" | "1/1" | "3/4" | "9/16" | "5/6" | "4/5";

type ImagePlaceholderProps = {
  src?: string;
  alt?: string;
  ratio?: Ratio;
  label?: string;
  overlay?: ReactNode;
  tone?: "light" | "brand" | "dark";
  rounded?: "2xl" | "3xl" | "none";
  className?: string;
};

const RATIO_CLS: Record<Ratio, string> = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "21/9": "aspect-[21/9]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "9/16": "aspect-[9/16]",
  "5/6": "aspect-[5/6]",
  "4/5": "aspect-[4/5]",
};

const TONE_BG: Record<NonNullable<ImagePlaceholderProps["tone"]>, string> = {
  light:
    "bg-[linear-gradient(135deg,#F1F5F9_0%,#E2E8F0_100%)] text-ink-400 border border-ink-100",
  brand:
    "bg-[linear-gradient(135deg,#EBF6FE_0%,#D0EAFC_100%)] text-brand-600 border border-brand-100",
  dark:
    "bg-[linear-gradient(135deg,#1A2233_0%,#0B111C_100%)] text-white/40 border border-white/10",
};

const ROUND: Record<NonNullable<ImagePlaceholderProps["rounded"]>, string> = {
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  none: "rounded-none",
};

export function ImagePlaceholder({
  src,
  alt = "",
  ratio = "4/3",
  label,
  overlay,
  tone = "light",
  rounded = "2xl",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden ${RATIO_CLS[ratio]} ${ROUND[rounded]} ${
        src ? "bg-ink-100" : TONE_BG[tone]
      } ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              tone === "dark"
                ? "bg-white/10"
                : tone === "brand"
                ? "bg-white/70"
                : "bg-white/80"
            }`}
          >
            <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
          </span>
          {label && (
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold">
              {label}
            </span>
          )}
        </div>
      )}
      {overlay && <div className="absolute inset-0">{overlay}</div>}
    </div>
  );
}
