import Link from "next/link";
import { Phone, Mail, MapPin, Smartphone, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";

export default function FooterV4() {
  return (
    <footer className="bg-ink-50 border-t border-ink-200">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* col-span 2로 회사 정보 */}
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/brand/bbk-en-brand.svg"
              alt="BBK"
              className="h-11 w-auto"
            />
            <span className="text-ink-400 text-sm font-medium">공간케어</span>
          </Link>
          <p className="text-base text-ink-600 leading-relaxed max-w-md break-keep">
            영업이 끝난 시간, 공간을 대신 관리하는 야간 청소 전문 기업.
            <br />
            전국 24시간 접수 가능합니다.
          </p>
          <div className="flex flex-col gap-2 mt-2 text-sm">
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
            className="mt-2 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-brand-600 transition-colors w-fit"
          >
            <Smartphone className="w-4 h-4" strokeWidth={1.75} />
            {SITE.app.label}
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-ink-900">둘러보기</p>
          <Link
            href="/services"
            className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
          >
            서비스
          </Link>
          <Link
            href="/cases"
            className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
          >
            시공사례
          </Link>
          <Link
            href="/contact"
            className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
          >
            문의하기
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-ink-900">회사</p>
          <Link
            href="/about"
            className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
          >
            회사 소개
          </Link>
          <Link
            href="/about/ceo"
            className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
          >
            대표 인사말
          </Link>
          <Link
            href="/about/ci"
            className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
          >
            브랜드(CI)
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-ink-900">함께 보기</p>
          {SITE.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-ink-600 hover:text-brand-600 transition-colors w-fit"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
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
