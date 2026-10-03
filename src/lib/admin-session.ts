import { cookies } from "next/headers";

const SECRET =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "bbk-homepage-secret";

const COOKIE_NAME = "bbk_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export type AdminSessionPayload = {
  id: string;
  role: "admin";
  name: string;
  phone: string;
};

/** base64url 인코딩 (Edge/Node 공용) */
function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...Array.from(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/** UTF-8 문자열 → base64url (한글·유니코드 안전) */
function b64urlStr(str: string): string {
  return b64url(new TextEncoder().encode(str));
}

/** base64url → UTF-8 문자열 */
function fromB64urlStr(s: string): string {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function hmac(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64url(new Uint8Array(sig));
}

/** payload → HMAC 서명 토큰 문자열 */
export async function signSession(payload: AdminSessionPayload): Promise<string> {
  const data = b64urlStr(JSON.stringify(payload));
  const sig = await hmac(data);
  return `${data}.${sig}`;
}

/** 토큰 검증 후 payload 반환. 실패 시 null. */
export async function verifySession(
  token: string,
): Promise<AdminSessionPayload | null> {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = await hmac(data);
    if (sig !== expected) return null;
    const parsed = JSON.parse(fromB64urlStr(data));
    if (parsed?.role !== "admin") return null;
    return parsed as AdminSessionPayload;
  } catch {
    return null;
  }
}

/** 응답에 세션 쿠키 설정. Route Handler에서 호출. */
export async function setSessionCookie(payload: AdminSessionPayload) {
  const token = await signSession(payload);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

/** 쿠키 제거 (로그아웃) */
export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/** Server Component / Route Handler에서 현재 관리자 세션 확인 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
