const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase Auth 비밀번호 로그인.
 * bbk-app 로직 그대로 이식 — 전화번호는 users 조회로 검증하고,
 * 실제 auth는 가상 이메일 + 비번으로 통과시킨다.
 */
export async function signInWithPassword(email: string, password: string) {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON_KEY },
      body: JSON.stringify({ email, password }),
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error_description ?? data.error ?? "로그인 실패",
    );
  }
  return data as {
    access_token: string;
    refresh_token: string;
    user: { id: string };
  };
}

/** 관리자/직원용 가상 이메일 (bbk-app과 동일 규약) */
export function staffEmail(phone: string) {
  return `${phone.replace(/-/g, "")}@bbkorea.co.kr`;
}
