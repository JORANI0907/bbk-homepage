"use client";

import { TrendingUp, Users, Calendar } from "lucide-react";
import { useLiveCount } from "@/lib/hooks/useLiveCount";
import { LiveTicker } from "./LiveTicker";

type Props = {
  serviceName: string;
  recentEvents: readonly string[];
};

export function ServiceLiveStrip({ serviceName, recentEvents }: Props) {
  const weekly = useLiveCount(8, 32, 17, 10000, 2);
  const active = useLiveCount(2, 9, 4, 12000, 1);
  const monthly = useLiveCount(40, 90, 62, 15000, 3);

  return (
    <div className="rounded-3xl border border-ink-100 bg-ink-50 p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <LiveTicker items={recentEvents} intervalMs={5000} prefix="Live" />
      </div>
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        <MetricCell
          icon={Calendar}
          label="이번 주 신청"
          value={`${weekly}건`}
          highlight
        />
        <MetricCell
          icon={Users}
          label="지금 상담 중"
          value={`${active}명`}
        />
        <MetricCell
          icon={TrendingUp}
          label={`이번 달 시공`}
          value={`${monthly}건`}
        />
      </div>
      <p className="text-[11px] text-ink-400 leading-[1.6]">
        &ldquo;{serviceName}&rdquo; 서비스의 실시간 흐름이에요. 지금 사장님도 편하게 문의 주세요.
      </p>
    </div>
  );
}

function MetricCell({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          highlight
            ? "bg-brand-500 text-white"
            : "bg-white border border-ink-200 text-ink-600"
        }`}
      >
        <Icon className="w-4 h-4" strokeWidth={1.75} />
      </span>
      <span className="text-[10px] uppercase tracking-[0.14em] text-ink-400 font-semibold">
        {label}
      </span>
      <span
        className={`text-xl md:text-2xl font-bold tracking-tight tabular-nums ${
          highlight ? "text-brand-600" : "text-ink-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
