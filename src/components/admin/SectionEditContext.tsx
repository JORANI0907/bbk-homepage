"use client";

import { createContext, useContext } from "react";

type SectionEditValue = {
  /** 이 섹션이 현재 편집 모드인가 */
  editing: boolean;
};

export const SectionEditContext = createContext<SectionEditValue>({
  editing: false,
});

export function useSectionEdit() {
  return useContext(SectionEditContext);
}
