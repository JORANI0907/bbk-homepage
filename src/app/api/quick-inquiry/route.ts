import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL ?? "";
const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY ?? "";
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET ?? "";
const SOLAPI_SENDER = process.env.SOLAPI_SENDER ?? "";
const NOTIFY_PHONE = process.env.NOTIFY_PHONE ?? "";

type QuickInquiryBody = {
  service?: string;
  space?: string;
  region?: string;
  timing?: string;
  scope?: string;
  items?: string;
  budget?: string;
  name?: string;
  phone?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: QuickInquiryBody = {};
  try {
    body = (await req.json()) as QuickInquiryBody;
  } catch {
    return NextResponse.json({ error: "요청 형식 오류" }, { status: 400 });
  }

  const { service, space, region, timing, scope, items, budget, name, phone, message } = body;

  if (!name || !phone) {
    return NextResponse.json(
      { error: "이름·연락처가 필요합니다." },
      { status: 400 },
    );
  }

  // 요약 노트 (하나의 문자열로 압축해 Supabase 저장)
  const notes = [
    service && `[유형] ${service}`,
    space && `[매장] ${space}`,
    region && `[지역] ${region}`,
    timing && `[시기] ${timing}`,
    scope && `[규모] ${scope}`,
    items && `[관심품목] ${items}`,
    budget && `[예산] ${budget}`,
    message && `[메모] ${message}`,
  ]
    .filter(Boolean)
    .join(" ");

  const { error } = await supabase.from("service_applications").insert({
    owner_name: name,
    phone,
    care_scope: service || "미선택",
    request_notes: notes || null,
    status: "신규접수",
    business_name: space || "미입력",
    address: region || "-",
    work_status: "접수대기",
    pre_meeting_done: false,
  });

  if (error) {
    console.error("[quick-inquiry] Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "접수 중 오류가 발생했어요." },
      { status: 500 },
    );
  }

  // 알림 대상 (비동기, 실패해도 접수는 성공)
  await Promise.allSettled([
    notifySlack({ name, phone, service, space, region, timing, scope, items, budget, message }),
    notifySms({ name, phone, service, region, timing, scope }),
  ]);

  return NextResponse.json({ ok: true });
}

async function notifySlack(payload: {
  name: string;
  phone: string;
  service?: string;
  space?: string;
  region?: string;
  timing?: string;
  scope?: string;
  items?: string;
  budget?: string;
  message?: string;
}) {
  if (!SLACK_WEBHOOK_URL) return;
  const text = [
    "🆕 *채팅 상담 접수* (Quick Inquiry)",
    `• 이름: ${payload.name}`,
    `• 연락처: ${payload.phone}`,
    payload.service && `• 서비스: ${payload.service}`,
    payload.space && `• 매장: ${payload.space}`,
    payload.region && `• 지역: ${payload.region}`,
    payload.timing && `• 시기: ${payload.timing}`,
    payload.scope && `• 규모: ${payload.scope}`,
    payload.items && `• 관심 품목: ${payload.items}`,
    payload.budget && `• 예산: ${payload.budget}`,
    payload.message && `• 메모: ${payload.message}`,
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
    console.error("[quick-inquiry] Slack notify failed:", err);
  }
}

async function notifySms(payload: {
  name: string;
  phone: string;
  service?: string;
  region?: string;
  timing?: string;
  scope?: string;
}) {
  if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET || !SOLAPI_SENDER || !NOTIFY_PHONE) {
    return; // 환경변수 미설정 시 무시
  }

  const text = [
    "[BBK 신규 상담 접수]",
    `이름: ${payload.name}`,
    `연락처: ${payload.phone}`,
    payload.service && `서비스: ${payload.service}`,
    payload.region && `지역: ${payload.region}`,
    payload.timing && `시기: ${payload.timing}`,
    payload.scope && `규모: ${payload.scope}`,
    `상세는 홈페이지 관리자 페이지에서 확인.`,
  ]
    .filter(Boolean)
    .join("\n");

  // Solapi HMAC-SHA256 서명
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString("hex");
  const signature = crypto
    .createHmac("sha256", SOLAPI_API_SECRET)
    .update(date + salt)
    .digest("hex");

  try {
    const res = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `HMAC-SHA256 apiKey=${SOLAPI_API_KEY}, date=${date}, salt=${salt}, signature=${signature}`,
      },
      body: JSON.stringify({
        message: {
          to: NOTIFY_PHONE,
          from: SOLAPI_SENDER,
          text,
        },
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[quick-inquiry] Solapi send failed:", err);
    }
  } catch (err) {
    console.error("[quick-inquiry] Solapi network error:", err);
  }
}
