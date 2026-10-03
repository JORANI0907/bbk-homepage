import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL ?? "";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  space?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: ContactBody = {};
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { error: "요청 형식이 잘못됐어요." },
      { status: 400 },
    );
  }

  const { name, phone, email, service, space, message } = body;

  if (!name || !phone || !service) {
    return NextResponse.json(
      { error: "이름·연락처·서비스는 필수 입력이에요." },
      { status: 400 },
    );
  }

  const requestNotes = [space ? `[업종/공간: ${space}]` : "", message ?? ""]
    .filter(Boolean)
    .join(" ");

  const { error } = await supabase.from("service_applications").insert({
    owner_name: name,
    phone,
    email: email || null,
    care_scope: service,
    request_notes: requestNotes || null,
    status: "신규접수",
    business_name: space || "미입력",
    address: "-",
    work_status: "접수대기",
    pre_meeting_done: false,
  });

  if (error) {
    console.error("[contact] Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "접수 중 오류가 발생했어요. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }

  // Slack 알림 — 실패해도 사장님 폼 응답은 성공 유지
  if (SLACK_WEBHOOK_URL) {
    const text = [
      "🆕 *홈페이지 상담 접수*",
      `• 이름: ${name}`,
      `• 연락처: ${phone}`,
      email ? `• 이메일: ${email}` : "",
      `• 서비스: ${service}`,
      space ? `• 업종/공간: ${space}` : "",
      message ? `• 문의 내용: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
    } catch (err) {
      console.error("[contact] Slack notify failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
