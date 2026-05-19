"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const NAV_ITEMS = [
  { label: "SERVICES", href: "/services" },
  { label: "APP", href: "/app" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
  { label: "ACADEMY", href: "/academy", highlight: true },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-colors duration-300 ${
          scrolled ? "bg-bbk-black border-b border-white/10" : "bg-transparent"
        }`}
      >
        {/* 로고 */}
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="text-white font-black text-xl leading-none tracking-tight">
            BBK.
          </span>
          <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.15em] group-hover:text-white/60 transition-colors">
            SPACE CARE
          </span>
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, href, highlight }) => (
            <Link
              key={label}
              href={href}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                highlight
                  ? "text-[#00ff66] hover:brightness-125"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <span className="ml-2 text-white/20 font-mono text-[10px] tracking-widest select-none">
            KR
          </span>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 relative z-50"
          aria-label="메뉴 열기"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="w-6 h-px bg-white block" />
          <span className="w-4 h-px bg-white block" />
          <span className="w-5 h-px bg-white block" />
        </button>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-bbk-black flex flex-col items-center justify-center md:hidden">
          {/* 닫기 버튼 */}
          <button
            className="absolute top-5 right-6 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="메뉴 닫기"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* 메뉴 항목 */}
          <nav className="flex flex-col items-center gap-10">
            {NAV_ITEMS.map(({ label, href, highlight }) => (
              <Link
                key={label}
                href={href}
                className={`font-mono text-2xl uppercase tracking-[0.12em] transition-colors ${
                  highlight
                    ? "text-[#00ff66]"
                    : "text-white hover:text-bbk-pink"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* 하단 브랜드 */}
          <span className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
            BBK SPACE CARE · KR
          </span>
        </div>
      )}
    </>
  );
}
