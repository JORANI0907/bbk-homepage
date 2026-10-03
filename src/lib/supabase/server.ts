import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service Role 클라이언트. RLS 우회.
 * 반드시 서버 사이드(route.ts, Server Component)에서만 임포트할 것.
 * cache: 'no-store' 강제 — Next.js Data Cache 우회.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, { ...(init ?? {}), cache: "no-store" }),
      },
    },
  );
}
