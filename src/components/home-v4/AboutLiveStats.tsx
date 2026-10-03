"use client";

import { motion } from "framer-motion";
import { useLiveCount } from "@/lib/hooks/useLiveCount";

/**
 * About 페이지 실적 스탯을 실시간 유동 카운터로 표시.
 * 정적 숫자 대신 미세하게 흐르는 숫자로 "지금도 성장 중"이라는 서브 텍스트 심어짐.
 */
export function AboutLiveStats() {
  // 각각 다른 주기·범위로 흐르게 해서 시각적 리얼리티 강화
  const matches = useLiveCount(1240, 1260, 1247, 18000, 2);
  const industries = useLiveCount(48, 56, 50, 30000, 1);
  const franchises = useLiveCount(11, 15, 12, 25000, 1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 md:gap-y-0">
      <StatCell value="2019" label="설립 연도" first />
      <StatCell value={matches.toLocaleString()} label="누적 시공 매장" />
      <StatCell value={`${industries}+`} label="관리 업종" />
      <StatCell value={String(franchises)} label="프랜차이즈 본사 파트너" />
    </div>
  );
}

function StatCell({
  value,
  label,
  first,
}: {
  value: string;
  label: string;
  first?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-3 md:pl-8 md:border-l md:border-white/20 ${
        first ? "md:pl-0 md:border-l-0" : ""
      }`}
    >
      <p className="text-[44px] md:text-[64px] font-semibold text-white leading-none tracking-[-0.03em] tabular-nums">
        {value}
      </p>
      <p className="text-sm md:text-base text-white/80 font-medium">{label}</p>
    </motion.div>
  );
}
