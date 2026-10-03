"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, LogIn, LogOut, Smartphone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { useAdmin } from "@/components/admin/AdminProvider";

type NavItem = (typeof SITE.nav)[number];

function hasChildren(
  item: NavItem,
): item is NavItem & { children: { label: string; href: string; desc: string }[] } {
  return "children" in item && Array.isArray(item.children);
}

export default function HeaderV4() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { admin, logout } = useAdmin();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-ink-200 shadow-soft"
            : "bg-white border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/brand/bbk-en-brand.svg"
              alt="BBK"
              className="h-9 md:h-11 w-auto"
            />
            <span className="text-ink-400 text-xs font-medium hidden sm:inline">
              공간케어
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {SITE.nav.map((item) => {
              if (hasChildren(item)) {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="text-sm font-medium text-ink-600 hover:text-brand-600 transition-colors inline-flex items-center gap-1 h-20"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                    {isOpen && (
                      <div className="absolute top-full right-0 pt-2 w-[340px]">
                        <div className="rounded-2xl bg-white border border-ink-100 shadow-[0_20px_50px_-15px_rgba(10,15,26,0.18)] p-2 flex flex-col">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="rounded-xl px-4 py-3 hover:bg-ink-50 transition-colors flex flex-col gap-0.5"
                            >
                              <span className="text-sm font-semibold text-ink-900">
                                {child.label}
                              </span>
                              <span className="text-xs text-ink-400">
                                {child.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              if (item.href === "/blog") {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown(item.label);
                      }}
                      className="text-sm font-medium text-ink-400 cursor-not-allowed inline-flex items-center h-20"
                    >
                      <span className="relative inline-block">
                        {item.label}
                        <span className="absolute -top-1 -right-5 text-[7px] font-semibold text-ink-400 bg-ink-100 border border-ink-200 rounded-full px-1 py-0.5 leading-none whitespace-nowrap">
                          준비중
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="absolute top-full right-0 pt-2">
                        <div className="rounded-xl bg-ink-900 text-white text-xs font-medium px-4 py-2.5 shadow-[0_16px_40px_-15px_rgba(10,15,26,0.35)] whitespace-nowrap">
                          블로그 준비중입니다.
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-ink-600 hover:text-brand-600 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={SITE.contact.telHref}
              className="text-sm font-semibold text-ink-900 hover:text-brand-600 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              {SITE.contact.telDisplay}
            </a>
            <Button size="sm" href="/quick-inquiry">
              무료 상담
            </Button>
            <a
              href={SITE.app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 h-9 px-3 rounded-full border border-brand-200 bg-brand-50 hover:bg-brand-100 hover:border-brand-300 transition-all"
              aria-label="BBK 앱 열기"
            >
              <Smartphone className="w-3.5 h-3.5" strokeWidth={1.75} />
              {SITE.app.label}
            </a>
            {admin ? (
              <>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 h-9 px-3 rounded-full border border-transparent hover:border-ink-200 hover:shadow-soft hover:text-ink-900 transition-all"
                  aria-label="로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
                  로그아웃
                </button>
                <div className="flex flex-col items-end leading-tight ml-1">
                  <span className="text-xs font-semibold text-ink-900">
                    {admin.name}
                  </span>
                  <span className="text-[10px] font-medium text-brand-600 uppercase tracking-[0.14em]">
                    관리자모드
                  </span>
                </div>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 h-9 px-3 rounded-full border border-transparent hover:border-ink-200 hover:shadow-soft hover:text-ink-900 transition-all"
                aria-label="파트너 로그인"
              >
                <LogIn className="w-3.5 h-3.5" strokeWidth={1.75} />
                로그인
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-ink-900"
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col">
          <div className="h-16 px-5 flex items-center justify-between border-b border-ink-200">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/brand/bbk-en-brand.svg"
                alt="BBK"
                className="h-8 w-auto"
              />
              <span className="text-ink-400 text-xs">공간케어</span>
            </Link>
            <button
              className="p-2 -mr-2 text-ink-900"
              aria-label="메뉴 닫기"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" strokeWidth={1.75} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-6 py-8 overflow-y-auto">
            {SITE.nav.map((item) => {
              if (hasChildren(item)) {
                const isExp = expandedMobile === item.label;
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() =>
                        setExpandedMobile(isExp ? null : item.label)
                      }
                      className="text-2xl font-bold text-ink-900 py-3 flex items-center justify-between hover:text-brand-500 transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isExp ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>
                    {isExp && (
                      <div className="flex flex-col gap-1 pl-2 pb-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="text-base font-medium text-ink-600 py-2 hover:text-brand-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (item.href === "/blog") {
                return (
                  <div
                    key={item.href}
                    className="flex flex-col gap-1 py-3"
                  >
                    <div className="flex items-center text-2xl font-bold text-ink-400">
                      <span className="relative inline-block">
                        {item.label}
                        <span className="absolute -top-1 -right-9 text-[12px] font-semibold text-ink-400 bg-ink-100 border border-ink-200 rounded-full px-1.5 py-0.5 leading-none whitespace-nowrap">
                          준비중
                        </span>
                      </span>
                    </div>
                    <span className="text-sm text-ink-400">
                      블로그 준비중입니다.
                    </span>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-bold text-ink-900 py-3 hover:text-brand-500 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-5 border-t border-ink-200 flex flex-col gap-3">
            <a
              href={SITE.contact.telHref}
              className="text-lg font-semibold text-ink-900 flex items-center gap-2 justify-center py-3"
            >
              <Phone className="w-5 h-5" strokeWidth={1.75} />
              {SITE.contact.telDisplay}
            </a>
            <Button
              size="lg"
              fullWidth
              href="/quick-inquiry"
              onClick={() => setOpen(false)}
            >
              무료 상담 받기
            </Button>
            <a
              href={SITE.app.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 h-12 rounded-full border border-brand-200 bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 hover:border-brand-300 transition-all"
            >
              <Smartphone className="w-4 h-4" strokeWidth={1.75} />
              {SITE.app.label}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
