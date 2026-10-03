"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "로그인 실패");
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-ink-50 flex items-center justify-center px-5">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-ink-100 shadow-[0_20px_50px_-25px_rgba(10,15,26,0.15)] p-8 md:p-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
          홈으로
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <LogIn className="w-5 h-5 text-brand-500" strokeWidth={1.75} />
          <h1 className="text-xl font-bold text-ink-900 tracking-tight">
            파트너 로그인
          </h1>
        </div>
        <p className="text-sm text-ink-500 mb-8 leading-relaxed">
          BBK 앱 계정과 동일한 계정으로 로그인이 가능합니다.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink-600">전화번호</span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="username"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              required
              className="h-11 px-4 rounded-lg border border-ink-200 text-sm bg-white focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(44,167,241,0.15)] transition-all"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink-600">비밀번호</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 px-4 rounded-lg border border-ink-200 text-sm bg-white focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(44,167,241,0.15)] transition-all"
            />
          </label>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-lg bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
