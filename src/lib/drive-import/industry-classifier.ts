/**
 * 매장명 기반 업종 자동 분류 사전.
 * BBK 폴더 네이밍 특성상 "대부분 외식" 전제 → 명확한 비외식 신호만 분류, 나머지는 외식 fallback.
 *
 * 미래 교정 흐름: 임포트 결과 UI에서 사장님이 수동 교정 →
 *   잦은 교정 패턴은 여기 사전에 추가하여 재발 방지.
 */

type IndustryRule = {
  pattern: RegExp;
  industry: string;
};

export const INDUSTRY_RULES: IndustryRule[] = [
  // 교육
  { pattern: /학원|과외|공부방|스터디/,                 industry: "교육" },
  { pattern: /수학|영어|국어|과학|논술|코딩/,            industry: "교육" },
  { pattern: /어린이집|유치원|놀이방|키즈/,              industry: "교육" },

  // 종교·시설
  { pattern: /교회|성당|사찰|절(?![가-힣])|성전|예배당/,  industry: "종교" },

  // 미용·뷰티
  { pattern: /네일|젤네일/,                             industry: "미용" },
  { pattern: /헤어|미용실|살롱|바버|이발소/,             industry: "미용" },
  { pattern: /메이크업|뷰티|피부|에스테틱|스킨/,         industry: "미용" },
  { pattern: /왁싱|태닝|마사지(?!기)/,                   industry: "미용" },

  // 체육·피트니스
  { pattern: /필라테스|요가|헬스|피트니스|짐|GYM/i,      industry: "체육" },
  { pattern: /발레|무용|댄스|복싱|주짓수|크로스핏/,      industry: "체육" },
  { pattern: /수영장|골프|스크린골프/,                   industry: "체육" },

  // 사무·전문직
  { pattern: /공인중개사|부동산중개/,                    industry: "사무" },
  { pattern: /세무사|회계사|회계법인|경제연구소/,        industry: "사무" },
  { pattern: /변호사|법률|법무사|법무법인/,              industry: "사무" },
  { pattern: /병원(?!식)|의원|클리닉|한의원|치과|약국/,  industry: "의료" },
  { pattern: /동물병원|수의원/,                          industry: "의료" },

  // 통신·전자
  { pattern: /핸드폰|스마트폰|폰(?![가-힣])|통신사|SK|KT|LG U\+/i, industry: "통신" },

  // 유통·판매
  { pattern: /백화점|아울렛/,                            industry: "유통" },
  { pattern: /마트|슈퍼|편의점|CU|GS25|세븐일레븐/,      industry: "유통" },
  { pattern: /쇼핑몰|팝업스토어/,                        industry: "유통" },

  // 숙박
  { pattern: /호텔|모텔|펜션|게스트하우스|리조트/,       industry: "숙박" },

  // 사진·스튜디오
  { pattern: /스튜디오|포토부스|photobooth|booth/i,     industry: "스튜디오" },

  // 공간기획·사무공간
  { pattern: /공간기획|오피스|워크스페이스|코워킹/,      industry: "사무" },
];

/**
 * 매장명으로 업종을 자동 분류.
 * 매칭되지 않으면 "외식" fallback.
 */
export function detectIndustry(storeName: string): string {
  if (!storeName) return "외식";

  for (const rule of INDUSTRY_RULES) {
    if (rule.pattern.test(storeName)) {
      return rule.industry;
    }
  }

  return "외식";
}

/**
 * 업종별 통계 (임포트 결과 요약용).
 */
export function summarizeByIndustry(
  storeNames: string[],
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const name of storeNames) {
    const ind = detectIndustry(name);
    result[ind] = (result[ind] ?? 0) + 1;
  }
  return result;
}
