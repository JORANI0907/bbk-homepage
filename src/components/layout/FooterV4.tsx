import Link from "next/link";
import { Phone, Mail, MapPin, Smartphone, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";

export default function FooterV4() {
  return (
    <footer className="bg-ink-50 border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 lg:py-20 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/brand/bbk-en-brand.svg"
            alt="BBK"
            className="h-10 md:h-11 w-auto"
          />
          <span className="text-ink-400 text-xs md:text-sm font-medium">공간케어</span>
        </Link>
        <p className="text-sm md:text-base text-ink-600 leading-relaxed max-w-md break-keep">
          영업이 끝난 시간, 공간을 대신 관리하는 야간 청소 전문 기업.
          <br />
          전국 24시간 접수 가능합니다.
        </p>
        <div className="flex flex-col gap-2 mt-2 text-xs md:text-sm">
          <a
            href={SITE.contact.telHref}
            className="flex items-center gap-2 text-ink-900 hover:text-brand-600 transition-colors font-semibold"
          >
            <Phone className="w-4 h-4" />
            {SITE.contact.telDisplay}
          </a>
          <a
            href={SITE.contact.emailHref}
            className="flex items-center gap-2 text-ink-600 hover:text-brand-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {SITE.contact.email}
          </a>
          <p className="flex items-center gap-2 text-ink-600">
            <MapPin className="w-4 h-4" />
            {SITE.company.address}
          </p>
        </div>
        <a
          href={SITE.app.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 h-10 md:h-11 px-4 md:px-5 rounded-full bg-ink-900 text-white text-xs md:text-sm font-semibold hover:bg-brand-600 transition-colors w-fit"
        >
          <Smartphone className="w-4 h-4" strokeWidth={1.75} />
          {SITE.app.label}
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
        </a>
      </div>

      <div className="border-t border-ink-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-3 text-[11px] md:text-xs text-ink-400 break-keep">
          <p>
            {SITE.brand.name} 주식회사 · 대표 {SITE.company.ceo} · 사업자
            등록번호 {SITE.company.reg}
          </p>
          <p>© 2026 {SITE.brand.shortName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
