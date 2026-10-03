import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getContent, setContent } from "@/lib/homepage-content";

/**
 * 텍스트 등 콘텐츠 값 업데이트.
 * body: { key: string, value: object (부분 병합) }
 * 기존 value에 부분 병합 후 저장 (text만 바꾸고 src는 유지).
 */
export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    const patch = body?.value ?? null;

    if (!key) {
      return NextResponse.json(
        { error: "콘텐츠 key가 필요합니다." },
        { status: 400 },
      );
    }
    if (!patch || typeof patch !== "object") {
      return NextResponse.json(
        { error: "value 객체가 필요합니다." },
        { status: 400 },
      );
    }

    const existing = (await getContent(key)) ?? {};
    const merged = { ...existing, ...patch };
    await setContent(key, merged, session.id);

    return NextResponse.json({ success: true, key, value: merged });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
