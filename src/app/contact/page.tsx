"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Check } from "lucide-react";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterV4 from "@/components/layout/FooterV4";
import MobileStickyCta from "@/components/home-v4/MobileStickyCta";
import { Bridge } from "@/components/home-v4/Bridge";
import { SITE } from "@/lib/site";

const SERVICE_OPTIONS = [
  "정기 대청소 (딥케어 구독)",
  "1회 대청소 (딥케어 1회)",
  "정기 일상청소 (엔드케어 정기)",
  "1회 일상청소 (엔드케어 1회)",
  "프랜차이즈·다점포 통합 계약",
  "아직 정해지지 않았어요",
];

const SPACE_OPTIONS = [
  "외식·주점",
  "카페·베이커리",
  "의원·클리닉",
  "사무실·학원",
  "미용·네일",
  "숙박·게스트하우스",
  "마트·편의점",
  "기타",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [space, setSpace] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name || !phone || !service) {
      setError("이름·연락처·서비스는 필수예요.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, service, space, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "접수 중 오류가 발생했어요.");
        return;
      }
      setDone(true);
    } catch (err) {
      console.error(err);
      setError("네트워크 오류예요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <HeaderV4 />
      <main className="bg-white text-ink-900">
        {/* Hero */}
        <section className="relative bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 78% 30%, rgba(44,167,241,0.06), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-12 md:pb-16 flex flex-col gap-10">
            <Bridge
              step="Contact"
              bridge="지금 남겨주시면 오늘 안에 회신드립니다."
              title={
                <>
                  30초면 충분해요.
                  <br />
                  <span className="text-ink-400">사장님 매장 이야기를 들려주세요.</span>
                </>
              }
              subtitle="상담 후에도 부담 없이 거절하실 수 있으니 편하게 남겨주세요. 필수는 이름·연락처·서비스 3가지뿐이에요."
            />
          </div>
        </section>

        {/* 폼 + 연락처 정보 */}
        <section className="bg-ink-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* 폼 */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              {done ? (
                <div className="rounded-3xl bg-white border border-ink-100 p-10 md:p-16 flex flex-col items-center gap-6 text-center">
                  <span className="w-16 h-16 rounded-full bg-brand-500 text-white flex items-center justify-center">
                    <Check className="w-7 h-7" strokeWidth={2.5} />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-ink-900 break-keep">
                    접수 완료됐습니다.
                  </h2>
                  <p className="text-base text-ink-600 leading-[1.7] max-w-md break-keep">
                    영업일 기준 24시간 안에 담당자가 연락드릴게요.
                    통화로 바로 상담받고 싶으시면 아래로 전화 주세요.
                  </p>
                  <a
                    href={SITE.contact.telHref}
                    className="mt-4 inline-flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" strokeWidth={1.75} />
                    {SITE.contact.telDisplay}
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-3xl bg-white border border-ink-100 p-6 md:p-10 flex flex-col gap-6"
                >
                  <FieldRow label="이름" required>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="사장님 성함"
                      className="w-full h-12 px-4 rounded-xl border border-ink-200 bg-white text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </FieldRow>

                  <FieldRow label="연락처" required>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full h-12 px-4 rounded-xl border border-ink-200 bg-white text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </FieldRow>

                  <FieldRow label="이메일 (선택)">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sample@example.com"
                      className="w-full h-12 px-4 rounded-xl border border-ink-200 bg-white text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </FieldRow>

                  <FieldRow label="관심 서비스" required>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setService(s)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                            service === s
                              ? "bg-ink-900 text-white border-ink-900"
                              : "bg-white text-ink-600 border-ink-200 hover:border-ink-400 hover:text-ink-900"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </FieldRow>

                  <FieldRow label="어떤 공간이세요? (선택)">
                    <div className="flex flex-wrap gap-2">
                      {SPACE_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSpace(s)}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                            space === s
                              ? "bg-brand-500 text-white border-brand-500"
                              : "bg-white text-ink-600 border-ink-200 hover:border-ink-400 hover:text-ink-900"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </FieldRow>

                  <FieldRow label="문의 내용 (선택)">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="매장 위치·규모·희망 시공일 등 편하게 남겨주세요."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-ink-200 bg-white text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition resize-none"
                    />
                  </FieldRow>

                  {error && (
                    <p className="text-sm text-system-danger font-medium">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-ink-900 text-white text-base font-semibold hover:bg-brand-600 transition-colors duration-200 active:scale-[0.98] disabled:opacity-60"
                  >
                    {sending ? "접수 중..." : "무료 상담 접수하기"}
                    {!sending && (
                      <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                    )}
                  </button>

                  <p className="text-xs text-ink-400 text-center">
                    개인정보는 상담 목적 외 사용하지 않습니다.
                  </p>
                </form>
              )}
            </div>

            {/* 연락처 정보 · 우 sticky */}
            <aside className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28 flex flex-col gap-4">
              <div className="rounded-3xl bg-ink-900 text-white p-8 md:p-10 flex flex-col gap-6">
                <span className="text-[11px] uppercase tracking-[0.18em] text-brand-400 font-semibold">
                  Direct Contact
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-[1.2] break-keep">
                  전화가 빠르실 땐,
                  <br />
                  <span className="text-white/50">지금 바로 눌러주세요.</span>
                </h3>
                <a
                  href={SITE.contact.telHref}
                  className="inline-flex items-center gap-3 text-xl md:text-2xl font-bold text-white hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.75} />
                  {SITE.contact.telDisplay}
                </a>
                <p className="text-sm text-white/70 leading-[1.6]">
                  24시간 접수 가능 · 야간 시공 상담도 편하게 문의해주세요.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-ink-100 p-6 md:p-8 flex flex-col gap-4">
                <InfoRow
                  icon={Mail}
                  label="이메일"
                  value={SITE.contact.email}
                  href={SITE.contact.emailHref}
                />
                <div className="border-t border-ink-100" />
                <InfoRow
                  icon={MapPin}
                  label="주소"
                  value={SITE.company.address}
                />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <FooterV4 />
      <MobileStickyCta />
    </>
  );
}

function FieldRow({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-semibold text-ink-900 flex items-center gap-1">
        {label}
        {required && <span className="text-brand-500 text-xs">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="shrink-0 w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400 font-semibold">
          {label}
        </span>
        <span className="text-[15px] text-ink-900 font-medium break-all">
          {value}
        </span>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="hover:opacity-80 transition-opacity">
      {content}
    </a>
  ) : (
    content
  );
}
