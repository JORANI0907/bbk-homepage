"use client";

import { Download, Building2, Mail } from "lucide-react";
import { useLiveCount } from "@/lib/hooks/useLiveCount";
import { LiveTicker } from "./LiveTicker";

const CATALOG_TICKER = [
  "방금 · **프랜차이즈 본사 담당자님 다운로드",
  "8분 전 · 서울 **호텔 그룹 이메일 문의",
  "22분 전 · **커피 담당자님 카탈로그 다운로드",
  "35분 전 · **의료재단 본사 제안서 요청",
  "45분 전 · 성남시 **베이커리 본사 문의",
  "1시간 전 · 인천 **PC방 프랜차이즈 검토",
  "2시간 전 · 서울 **패션몰 위탁 청소 상담",
  "3시간 전 · 수원 **학원 그룹 담당자 다운로드",
];

export function CatalogLiveStrip() {
  const todayDownloads = useLiveCount(4, 18, 9, 12000, 1);
  const weekInquiries = useLiveCount(6, 24, 14, 15000, 2);
  const totalDownloads = useLiveCount(2800, 3200, 2947, 20000, 8);

  return (
    <div className="rounded-3xl border border-ink-100 bg-ink-50/60 p-6 md:p-8 flex flex-col gap-6">
      <LiveTicker items={CATALOG_TICKER} intervalMs={5000} prefix="Live" />
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        <MetricCell
          icon={Download}
          label="오늘 다운로드"
          value={`${todayDownloads}건`}
          highlight
        />
        <MetricCell
          icon={Building2}
          label="이번 주 기업 문의"
          value={`${weekInquiries}건`}
        />
        <MetricCell
          icon={Mail}
          label="누적 다운로드"
          value={totalDownloads.toLocaleString()}
        />
      </div>
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
