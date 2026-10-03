"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_INDUSTRY,
  INDUSTRY_MAP,
  type Industry,
  type IndustryKey,
} from "@/lib/industries";

type Ctx = {
  key: IndustryKey;
  industry: Industry;
  setKey: (k: IndustryKey) => void;
};

const IndustryCtx = createContext<Ctx | null>(null);

export function IndustryProvider({ children }: { children: ReactNode }) {
  const [key, setKeyState] = useState<IndustryKey>(DEFAULT_INDUSTRY);

  const setKey = useCallback((k: IndustryKey) => {
    setKeyState(k);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ key, industry: INDUSTRY_MAP[key], setKey }),
    [key, setKey],
  );

  return <IndustryCtx.Provider value={value}>{children}</IndustryCtx.Provider>;
}

export function useIndustry() {
  const v = useContext(IndustryCtx);
  if (!v) {
    throw new Error("useIndustry must be inside <IndustryProvider>");
  }
  return v;
}
