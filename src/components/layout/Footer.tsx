import Link from "next/link";

const COMPANY_INFO = [
  { label: "COMPANY", value: "범빌드코리아" },
  { label: "CEO", value: "조동환" },
  { label: "REG", value: "298-78-00455" },
  { label: "TEL", value: "031-759-4877 / 010-5434-4877" },
  { label: "EMAIL", value: "sunrise@bbkorea.co.kr" },
  { label: "ADDRESS", value: "성남시 둔촌대로268번길 22 201호" },
];

const SITE_MAP = [
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const SOCIALS = [
  { label: "INSTAGRAM", href: "#" },
  { label: "BLOG", href: "#" },
  { label: "YOUTUBE", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-bbk-black border-t border-white/[0.06]">
      {/* 거대 워드마크 */}
      <div className="overflow-hidden border-b border-white/[0.06]">
        <p
          className="text-white font-black leading-[0.85] tracking-[-0.04em] px-6 md:px-12 py-10 md:py-14"
          style={{ fontSize: "clamp(72px, 15vw, 220px)" }}
        >
          BBK.
        </p>
      </div>

      {/* 정보 그리드 */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {/* 회사 정보 */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {COMPANY_INFO.map(({ label, value }) => (
            <div key={label} className="flex gap-4 items-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 shrink-0 w-16 pt-0.5">
                {label}
              </p>
              <p className="font-mono text-[11px] text-white/60 leading-relaxed">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* 사이트맵 */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/25 mb-1">
            SITEMAP
          </p>
          {SITE_MAP.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/50 hover:text-white transition-colors w-fit"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* 하단 바 */}
      <div className="border-t border-white/[0.06] px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <p className="font-mono text-[10px] text-white/20">
          © 2026 BBK SPACE CARE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-[10px] uppercase tracking-wider text-white/20 hover:text-bbk-pink transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
