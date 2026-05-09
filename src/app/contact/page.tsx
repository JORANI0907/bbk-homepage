"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SERVICE_OPTIONS = [
  "딥케어 구독 서비스",
  "딥케어 1회 서비스",
  "엔드케어 정기 서비스",
  "엔드케어 1회 서비스",
  "프랜차이즈·다점포 상담",
  "기타 문의",
];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "대표전화",
    value: "031-759-4877",
    sub: "010-5434-4877",
    href: "tel:010-5434-4877",
  },
  {
    icon: Mail,
    label: "이메일",
    value: "sunrise@bbkorea.co.kr",
    sub: null,
    href: "mailto:sunrise@bbkorea.co.kr",
  },
  {
    icon: MapPin,
    label: "주소",
    value: "성남시 둔촌대로268번길 22 201호",
    sub: null,
    href: null,
  },
  {
    icon: Clock,
    label: "응대시간",
    value: "24/7 접수 가능",
    sub: "120분 내 회신",
    href: null,
  },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  space: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  space: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "접수 중 오류가 발생했습니다. 다시 시도해 주세요.");
        return;
      }
      setSubmitted(true);
    } catch {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-bbk-black pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden relative">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none"
          >
            <p
              className="text-white/[0.035] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-6 md:pl-12"
              style={{ fontSize: "clamp(100px, 20vw, 320px)" }}
            >
              CONTACT.
            </p>
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 mb-6">
              BBK SPACE CARE — CONTACT
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white font-black leading-[1.05] tracking-[-0.03em] break-keep mb-5"
              style={{ fontSize: "clamp(38px, 7vw, 100px)" }}
            >
              다음 영업일을
              <br />
              깨끗하게.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/45 text-base md:text-lg break-keep leading-relaxed"
            >
              문의 주시면 당일 확인 후 120분 내 회신드립니다.
            </motion.p>
          </div>
        </section>

        {/* 본문 */}
        <section className="bg-bbk-cool-white py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
            {/* 좌: 연락처 */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-8">
                CONTACT INFO
              </p>
              <div className="flex flex-col gap-6">
                {CONTACT_INFO.map(({ icon: Icon, label, value, sub, href }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="shrink-0 w-9 h-9 border border-bbk-concrete flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-bbk-stone-6" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-bbk-stone-6 mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-bbk-black font-bold text-sm hover:text-bbk-pink transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-bbk-black font-bold text-sm break-keep">
                          {value}
                        </p>
                      )}
                      {sub && (
                        <p className="font-mono text-[11px] text-bbk-stone-6 mt-0.5">
                          {sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-bbk-concrete pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-4">
                  QUICK CALL
                </p>
                <a
                  href="tel:010-5434-4877"
                  className="inline-flex items-center gap-2.5 bg-bbk-black text-white px-6 py-4 font-bold text-[13px] uppercase tracking-wider hover:bg-bbk-black/80 active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  010-5434-4877
                </a>
              </div>
            </div>

            {/* 우: 폼 */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-8">
                INQUIRY FORM
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-bbk-concrete bg-white p-10 md:p-14 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-14 h-14 bg-bbk-pink/10 flex items-center justify-center mb-2">
                    <span className="text-bbk-pink font-black text-2xl">✓</span>
                  </div>
                  <h2 className="text-bbk-black font-black text-xl break-keep">
                    문의가 접수되었습니다.
                  </h2>
                  <p className="text-bbk-stone-6 text-sm leading-relaxed break-keep max-w-xs">
                    담당자가 120분 내 연락드립니다.
                    <br />
                    급한 문의는 010-5434-4877로 연락주세요.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-bbk-concrete bg-white p-8 md:p-10 flex flex-col gap-5"
                >
                  {/* 이름 + 연락처 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-bbk-stone-6">
                        성함 <span className="text-bbk-pink">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className="border border-bbk-concrete px-4 py-3 text-sm text-bbk-black placeholder:text-bbk-stone-6/50 focus:outline-none focus:border-bbk-black transition-colors bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-bbk-stone-6">
                        연락처 <span className="text-bbk-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        className="border border-bbk-concrete px-4 py-3 text-sm text-bbk-black placeholder:text-bbk-stone-6/50 focus:outline-none focus:border-bbk-black transition-colors bg-transparent"
                      />
                    </div>
                  </div>

                  {/* 이메일 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-bbk-stone-6">
                      이메일
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="border border-bbk-concrete px-4 py-3 text-sm text-bbk-black placeholder:text-bbk-stone-6/50 focus:outline-none focus:border-bbk-black transition-colors bg-transparent"
                    />
                  </div>

                  {/* 서비스 선택 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-bbk-stone-6">
                      관심 서비스 <span className="text-bbk-pink">*</span>
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="border border-bbk-concrete px-4 py-3 text-sm text-bbk-black focus:outline-none focus:border-bbk-black transition-colors bg-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        서비스를 선택하세요
                      </option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 공간 유형 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-bbk-stone-6">
                      업종 / 공간 유형
                    </label>
                    <input
                      type="text"
                      name="space"
                      value={form.space}
                      onChange={handleChange}
                      placeholder="예: 한식당, 치과, 헬스장, 사무실 …"
                      className="border border-bbk-concrete px-4 py-3 text-sm text-bbk-black placeholder:text-bbk-stone-6/50 focus:outline-none focus:border-bbk-black transition-colors bg-transparent"
                    />
                  </div>

                  {/* 메시지 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-bbk-stone-6">
                      문의 내용
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="공간 규모, 원하시는 시공 시기, 특이 사항 등을 적어주시면 더 정확한 안내를 드릴 수 있습니다."
                      className="border border-bbk-concrete px-4 py-3 text-sm text-bbk-black placeholder:text-bbk-stone-6/50 focus:outline-none focus:border-bbk-black transition-colors bg-transparent resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-bbk-pink text-white py-4 font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {loading ? "전송 중…" : "상담 신청하기"}
                  </button>

                  <p className="font-mono text-[10px] text-bbk-stone-6/70 text-center">
                    접수 후 24시간 내 회신 · 급한 문의는 전화 연락 권장
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
