"use client";

import { useEffect, useState } from "react";

/**
 * 지정된 범위 안에서 값이 부드럽게 흐르는 카운터.
 * ±1~maxStep 사이의 랜덤 스텝, 하한·상한에 닿으면 반사.
 * "실시간 상담 진행 중 12명" 같은 살아있는 인상을 만들 때 사용.
 */
export function useLiveCount(
  min = 5,
  max = 29,
  initial = 12,
  intervalMs = 4000,
  maxStep = 3,
) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const step = Math.floor(Math.random() * maxStep) + 1;
        const goingUp =
          prev <= min ? true : prev >= max ? false : Math.random() < 0.5;
        const next = goingUp ? prev + step : prev - step;
        return Math.max(min, Math.min(max, next));
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs, maxStep]);

  return count;
}
