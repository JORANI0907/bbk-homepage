import { createServiceClient } from "./supabase/server";

export type HomepageContentValue = {
  src?: string;
  alt?: string;
  text?: string;
  [key: string]: unknown;
};

/**
 * 특정 key 값 읽기 (서버 사이드).
 * 존재하지 않으면 null.
 */
export async function getContent(
  key: string,
): Promise<HomepageContentValue | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("homepage_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return null;
  return data.value as HomepageContentValue;
}

/** 여러 key를 한 번에 읽기. */
export async function getContentMany(
  keys: string[],
): Promise<Record<string, HomepageContentValue>> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("homepage_content")
    .select("key, value")
    .in("key", keys);

  if (error || !data) return {};

  const result: Record<string, HomepageContentValue> = {};
  for (const row of data) {
    result[row.key as string] = row.value as HomepageContentValue;
  }
  return result;
}

/** 모든 콘텐츠 읽기 (초기 로딩용). */
export async function getAllContent(): Promise<
  Record<string, HomepageContentValue>
> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("homepage_content")
    .select("key, value");

  if (error || !data) return {};

  const result: Record<string, HomepageContentValue> = {};
  for (const row of data) {
    result[row.key as string] = row.value as HomepageContentValue;
  }
  return result;
}

/** upsert (관리자 API 라우트에서만 호출) */
export async function setContent(
  key: string,
  value: HomepageContentValue,
  updatedBy?: string,
): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("homepage_content")
    .upsert(
      {
        key,
        value,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy ?? null,
      },
      { onConflict: "key" },
    );
  if (error) throw new Error(error.message);
}
