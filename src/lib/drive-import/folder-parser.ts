/**
 * BBK Drive 폴더명 파싱 유틸.
 *
 * 입력 예시:
 *   "2026-02-03 하나마토 구월점"
 *   "2026-02-02 엽기떡볶이 이천증포점 블로그(O)"
 *   "2026-02-24 시립동구어린이집 블로그（Ｏ）"
 *   "2026-02-26 몽글몽글(위생 컨설팅)"
 */

import { randomBytes } from "node:crypto";

export type ParsedFolderName = {
  workDate: string | null;          // "2026-02-03"
  storeName: string;                 // "하나마토 구월점"
  isBlogRegistered: boolean;        // 블로그(O) / 블로그（Ｏ） 플래그
  tag: string | null;                // "위생 컨설팅" 같은 괄호 꼬리
  raw: string;                       // 원본
};

// 날짜: YYYY-MM-DD (하이픈 또는 .)
const DATE_RE = /^(\d{4})[-.](\d{1,2})[-.](\d{1,2})\s*/;

// "블로그(O)" / "블로그（Ｏ）" / "블로그 (O)" 등 — 전각/반각 괄호와 O/Ｏ 모두 매칭
const BLOG_RE = /\s*블로그\s*[(（][OＯoｏ○][)）]\s*$/;

// 끝에 붙은 꼬리 "(위생 컨설팅)" 등 — 블로그 이후에 평가
const TAG_RE = /\s*[(（]([^()（）]+)[)）]\s*$/;

export function parseFolderName(raw: string): ParsedFolderName {
  let s = raw.trim();

  // 1. 날짜 추출
  let workDate: string | null = null;
  const dateMatch = s.match(DATE_RE);
  if (dateMatch) {
    const [, y, m, d] = dateMatch;
    workDate = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    s = s.slice(dateMatch[0].length);
  }

  // 2. 블로그 플래그 제거 (뒤에서부터)
  let isBlogRegistered = false;
  if (BLOG_RE.test(s)) {
    isBlogRegistered = true;
    s = s.replace(BLOG_RE, "").trim();
  }

  // 3. 꼬리 괄호 태그 추출
  let tag: string | null = null;
  const tagMatch = s.match(TAG_RE);
  if (tagMatch) {
    tag = tagMatch[1].trim();
    s = s.replace(TAG_RE, "").trim();
  }

  // 4. 남은 것이 매장명
  const storeName = s.trim();

  return {
    workDate,
    storeName,
    isBlogRegistered,
    tag,
    raw,
  };
}

/**
 * 개인정보 보호를 위해 매장명을 slug에 포함하지 않는다.
 * 패턴: "{YYYYMMDD}-{랜덤 8자 hex}"
 *   예: "20260203-a3f8c2d9"
 * 날짜가 없으면 "nodate-{랜덤 8자 hex}" 로 fallback.
 *
 * 두 번째 인자(storeName)는 호환성 위해 유지하나 사용하지 않음.
 */
export function makeSlug(_storeName: string, workDate: string | null): string {
  const datePart = workDate ? workDate.replace(/-/g, "") : "nodate";
  const randomPart = randomBytes(4).toString("hex"); // 8자 hex
  return `${datePart}-${randomPart}`;
}

/**
 * 하위 폴더 이름이 "시공 전" 폴더인지 판별.
 */
export function isBeforeFolder(folderName: string): boolean {
  return /시공\s*전\s*$/.test(folderName.trim());
}

/**
 * 하위 폴더 이름이 "시공 후" 폴더인지 판별.
 */
export function isAfterFolder(folderName: string): boolean {
  return /시공\s*후\s*$/.test(folderName.trim());
}
