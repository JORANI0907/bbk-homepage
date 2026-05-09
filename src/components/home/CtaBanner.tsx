"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative bg-bbk-black py-28 md:py-40 overflow-hidden">
      {/* 배경 워드마크 */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
      >
        <p
          className="text-white/[0.04] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap pl-6 md:pl-12"
          style={{ fontSize: "clamp(100px, 22vw, 360px)" }}
        >
          CONTACT.
        </p>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/35 mb-7">
          AVAILABLE 24/7 · RESPONSE &lt; 120 MINS
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-black leading-[1.05] tracking-[-0.02em] mb-10 break-keep"
          style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
        >
          다음 영업일을
          <br />
          깨끗하게.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-bbk-pink text-white px-8 py-5 font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all"
          >
            상담 신청하기
          </Link>
          <a
            href="tel:010-5434-4877"
            className="inline-flex items-center justify-center gap-2 border border-white/45 text-white px-8 py-5 font-bold text-[13px] uppercase tracking-wider hover:bg-white/8 active:scale-[0.98] transition-all"
          >
            <Phone className="w-4 h-4" />
            010-5434-4877
          </a>
        </motion.div>
      </div>
    </section>
  );
}
