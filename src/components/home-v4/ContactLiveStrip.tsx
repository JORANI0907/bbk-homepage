"use client";

import { Clock, Users, CheckCircle2 } from "lucide-react";
import { useLiveCount } from "@/lib/hooks/useLiveCount";
import { LiveTicker } from "./LiveTicker";

const CONTACT_TICKER = [
  "방금 · 성남 치**(김** 사장님) 상담 접수",
  "3분 전 · 서울 강남 브**(이** 사장님) 견적 요청",
  "8분 전 · 수원 쿠**(박** 사장님) 통화 상담 완료",
  "15분 전 · 안양 봄**(정** 사장님) 현장 방문 예약",
  "22분 전 · 광명 핏**(강** 사장님) 정기 계약 문의",
  "40분 전 · 인천 한**(장** 사장님) 견적서 발송 완료",
  "1시간 전 · 부천 게**(윤** 사장님) 상담 후 계약",
  "2시간 전 · 화성 세**(한** 사장님) 첫 시공 예약",
];

export function ContactLiveStrip() {
  const todayReceived = useLiveCount(4, 24, 12, 10000, 2);
  const activeAgents = useLiveCount(2, 7, 4, 15000, 1);
  const avgResponse = useLiveCount(38, 62, 48, 20000, 3);

  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-6 md:p-8 flex flex-col gap-6 shadow-[0_16px_40px_-25px_rgba(10,15,26,0.12)]">
      <LiveTicker items={CONTACT_TICKER} intervalMs={5000} prefix="Live" />
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        <MetricCell
          icon={CheckCircle2}
          label="오늘 접수 건수"
          value={`${todayReceived}건`}
          highlight
        />
        <MetricCell
          icon={Users}
          label="지금 상담 담당"
          value={`${activeAgents}명`}
        />
        <MetricCell
          icon={Clock}
          label="평균 응답 시간"
          value={`${avgResponse}분`}
        />
      </div>
      <p className="text-[11px] text-ink-400 leading-[1.6]">
        상담팀이 실시간으로 접수를 처리하고 있어요. 오늘 남기시면 오늘 안에 회신드립니다.
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
            : "bg-ink-50 border border-ink-200 text-ink-600"
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
