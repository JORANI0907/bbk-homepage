import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { signInWithPassword, staffEmail } from "@/lib/auth-helpers";
import { signSession, SESSION_COOKIE_NAME } from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  try {
    const { phone, password } = await request.json();

    if (!phone?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "전화번호와 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    const normalized = phone.trim().replace(/@.*$/, "").replace(/-/g, "");
    const supabase = createServiceClient();

    const { data: userRow, error: userLookupError } = await supabase
      .from("users")
      .select("id, role, name, is_active")
      .eq("phone", normalized)
      .is("deleted_at", null)
      .single();

    if (userLookupError || !userRow) {
      return NextResponse.json(
        { error: "등록되지 않은 계정입니다." },
        { status: 404 },
      );
    }

    if (!userRow.is_active) {
      return NextResponse.json(
        { error: "비활성화된 계정입니다." },
        { status: 403 },
      );
    }

    if (userRow.role !== "admin") {
      return NextResponse.json(
        { error: "홈페이지 관리 권한이 없는 계정입니다." },
        { status: 403 },
      );
    }

    try {
      await signInWithPassword(staffEmail(normalized), password);
    } catch (authError) {
      const msg =
        authError instanceof Error ? authError.message : String(authError);
      if (msg.includes("Invalid login credentials")) {
        return NextResponse.json(
          { error: "전화번호 또는 비밀번호가 올바르지 않습니다." },
          { status: 401 },
        );
      }
      throw authError;
    }

    const token = await signSession({
      id: userRow.id,
      role: "admin",
      name: userRow.name,
      phone: normalized,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userRow.id,
        role: userRow.role,
        name: userRow.name,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
