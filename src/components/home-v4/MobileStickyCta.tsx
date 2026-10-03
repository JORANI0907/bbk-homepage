"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed left-0 right-0 bottom-0 z-30 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-3 mb-3 rounded-2xl bg-ink-900 shadow-[0_16px_40px_-12px_rgba(10,15,26,0.35)] px-4 py-3 flex items-center gap-2">
        <a
          href={SITE.contact.telHref}
          className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white"
          aria-label="전화 상담"
        >
          <Phone className="w-4 h-4" strokeWidth={1.75} />
        </a>
        <Link
          href="/quick-inquiry"
          className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full bg-white text-ink-900 font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          무료 상담 받기
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
