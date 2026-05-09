import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { name, phone, email, service, space, message } = await req.json();

  if (!name || !phone || !service) {
    return NextResponse.json({ error: "필수 항목을 입력해 주세요." }, { status: 400 });
  }

  const requestNotes = [
    space ? `[업종/공간: ${space}]` : "",
    message ?? "",
  ]
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
    return NextResponse.json({ error: "접수 중 오류가 발생했습니다." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
