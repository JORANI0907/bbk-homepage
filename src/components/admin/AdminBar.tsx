"use client";

import { Pencil, LogOut } from "lucide-react";
import { useAdmin } from "./AdminProvider";

export default function AdminBar() {
  const { admin, loading, logout } = useAdmin();

  if (loading || !admin) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-ink-900 text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-brand-300 font-semibold">
            <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
            편집 모드
          </span>
          <span className="text-white/40">·</span>
          <span className="text-white/80">{admin.name} 관리자</span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
          로그아웃
        </button>
      </div>
    </div>
  );
}
