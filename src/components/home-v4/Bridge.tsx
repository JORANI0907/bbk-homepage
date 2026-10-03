"use client";

import type { ReactNode } from "react";
import EditableText from "@/components/admin/EditableText";

type BridgeProps = {
  step: string;
  bridge?: string;
  /** JSX 그대로 렌더할 때 사용 (편집 불가) */
  title?: ReactNode;
  /** 편집 가능하게 하려면 titleMain + titleAccent 사용 */
  titleMain?: string;
  titleAccent?: string;
  subtitle?: string;
  tone?: "light" | "dark";
  /** contentKey 접두어. 있으면 각 필드가 EditableText로 렌더링됨. 예: "problem" → problem.step / problem.bridge / problem.title.main / problem.title.accent / problem.subtitle */
  contentKeyPrefix?: string;
};

export function Bridge({
  step,
  bridge,
  title,
  titleMain,
  titleAccent,
  subtitle,
  tone = "light",
  contentKeyPrefix,
}: BridgeProps) {
  const stepColor =
    tone === "dark" ? "text-brand-400" : "text-brand-600";
  const bridgeColor = tone === "dark" ? "text-white/70" : "text-ink-600";
  const titleColor = tone === "dark" ? "text-white" : "text-ink-900";
  const accentColor = tone === "dark" ? "text-white/50" : "text-ink-400";
  const subtitleColor = tone === "dark" ? "text-white/70" : "text-ink-600";
  const dashColor = tone === "dark" ? "bg-white/30" : "bg-ink-300";
  const p = contentKeyPrefix;
  const useStructuredTitle = titleMain !== undefined || titleAccent !== undefined;

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <span className={`inline-block w-6 h-px ${dashColor}`} />
        <span
          className={`text-[11px] uppercase tracking-[0.18em] font-semibold ${stepColor}`}
        >
          {p ? (
            <EditableText contentKey={`${p}.step`} defaultText={step} />
          ) : (
            step
          )}
        </span>
      </div>
      {bridge && (
        <p
          className={`text-base md:text-lg font-medium leading-[1.55] ${bridgeColor}`}
        >
          {p ? (
            <EditableText
              contentKey={`${p}.bridge`}
              defaultText={bridge}
              multiline
            />
          ) : (
            bridge
          )}
        </p>
      )}
      <h2
        className={`text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight break-keep ${titleColor}`}
      >
        {useStructuredTitle ? (
          <>
            {p ? (
              <EditableText
                contentKey={`${p}.title.main`}
                defaultText={titleMain ?? ""}
              />
            ) : (
              titleMain
            )}
            {titleAccent !== undefined && (
              <>
                <br />
                {p ? (
                  <EditableText
                    contentKey={`${p}.title.accent`}
                    defaultText={titleAccent}
                    className={accentColor}
                  />
                ) : (
                  <span className={accentColor}>{titleAccent}</span>
                )}
              </>
            )}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-[1.65] break-keep max-w-2xl ${subtitleColor}`}
        >
          {p ? (
            <EditableText
              contentKey={`${p}.subtitle`}
              defaultText={subtitle}
              multiline
            />
          ) : (
            subtitle
          )}
        </p>
      )}
    </div>
  );
}
