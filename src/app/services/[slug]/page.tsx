import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import { SERVICES, type ServiceSlug } from "@/lib/data/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const svc = SERVICES[slug as ServiceSlug];
  if (!svc) return {};
  return {
    title: `${svc.name} | BBK 공간케어`,
    description: svc.desc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = SERVICES[slug as ServiceSlug];
  if (!svc) notFound();

  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-bbk-black pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden relative">
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none"
          >
            <p
              className="text-white/[0.04] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-6 md:pl-12"
              style={{ fontSize: "clamp(100px, 22vw, 360px)" }}
            >
              {svc.wordmark}.
            </p>
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/services"
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30 hover:text-white/60 transition-colors"
              >
                ← SERVICES
              </Link>
              {svc.badge && (
                <span className="font-mono text-[10px] uppercase tracking-widest bg-bbk-pink text-white px-3 py-1">
                  {svc.badge}
                </span>
              )}
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">
              {svc.name}
            </p>

            <h1
              className="text-white font-black leading-[1.05] tracking-[-0.03em] break-keep mb-6"
              style={{ fontSize: "clamp(36px, 6.5vw, 88px)" }}
            >
              {svc.tagline}
            </h1>

            <p className="text-white/50 text-base md:text-lg max-w-xl break-keep leading-relaxed mb-10">
              {svc.desc}
            </p>

            {/* 피처 그리드 */}
            <div className="flex flex-wrap gap-3">
              {svc.features.map((f) => (
                <div
                  key={f.label}
                  className="border border-white/15 px-5 py-3 flex gap-3 items-baseline"
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                    {f.label}
                  </span>
                  <span className="font-bold text-white text-sm">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 서비스 품목 */}
        <section className="bg-bbk-cool-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6">
                SERVICE ITEMS
              </span>
              <div className="flex-1 h-px bg-bbk-concrete" />
              <span className="font-mono text-[10px] text-bbk-stone-6">
                {svc.items.length} ITEMS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {svc.items.map((item, i) => (
                <div
                  key={item}
                  className="border border-bbk-concrete bg-white px-4 py-3 flex items-center gap-3"
                >
                  <span className="font-mono text-[9px] text-bbk-stone-6/60 shrink-0 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-bbk-black text-[13px] font-medium break-keep">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 이런 분께 (personas) */}
        {svc.personas.length > 0 && (
          <section className="bg-bbk-black py-20 md:py-28">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                  RECOMMENDED FOR
                </span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>

              <div className="flex flex-col gap-4">
                {svc.personas.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-6 border-b border-white/[0.07] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-bbk-pink/40 font-black text-2xl leading-none shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-white/70 text-base leading-relaxed break-keep">
                      {p}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 개별 */}
        <section className="bg-bbk-pink py-16 md:py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 mb-3">
                {svc.name}
              </p>
              <h2 className="text-white font-black text-2xl md:text-3xl leading-snug break-keep">
                지금 바로 상담 신청하세요.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-bbk-pink px-8 py-5 font-bold text-[13px] uppercase tracking-wider hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                {svc.cta}
              </Link>
              <a
                href="tel:010-5434-4877"
                className="inline-flex items-center justify-center border border-white/50 text-white px-8 py-5 font-bold text-[13px] uppercase tracking-wider hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                010-5434-4877
              </a>
            </div>
          </div>
        </section>

        {/* 다른 서비스 */}
        <section className="bg-bbk-cool-white py-16 md:py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bbk-stone-6 mb-8">
              OTHER SERVICES
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.values(SERVICES)
                .filter((s) => s.slug !== svc.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group border border-bbk-concrete bg-white p-6 flex flex-col gap-3 hover:border-bbk-black transition-colors"
                  >
                    <p
                      className="font-black text-bbk-pink/20 leading-none tracking-[-0.04em] group-hover:text-bbk-pink/40 transition-colors"
                      style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
                    >
                      {s.wordmark}
                    </p>
                    <div>
                      <p className="font-mono text-[10px] text-bbk-stone-6 uppercase tracking-wider mb-0.5">
                        {s.name}
                      </p>
                      <p className="text-bbk-black font-bold text-sm break-keep">
                        {s.tagline}
                      </p>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-bbk-stone-6 group-hover:text-bbk-pink transition-colors">
                      자세히 →
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
