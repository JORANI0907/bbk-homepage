import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * 브라우저 클라이언트. RLS 적용됨 (anon key).
 * 관리자 편집 UI는 서버 API(/api/admin/*)를 통해 처리하므로,
 * 클라이언트에서는 주로 공개 데이터 읽기용.
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
