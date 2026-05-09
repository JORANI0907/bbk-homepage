"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
        {NAV_ITEMS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-white/60 font-mono text-[11px] uppercase tracking-[0.1em] hover:text-white transition-colors"
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
        className="md:hidden flex flex-col gap-[5px] p-2"
        aria-label="메뉴 열기"
      >
        <span className="w-6 h-px bg-white block" />
        <span className="w-4 h-px bg-white block" />
        <span className="w-5 h-px bg-white block" />
      </button>
    </header>
  );
}
