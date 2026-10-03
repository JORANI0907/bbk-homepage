"use client";

import { motion } from "framer-motion";
import { PhoneCall, MapPin, Sparkles, Smartphone } from "lucide-react";
import { Bridge } from "./Bridge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import EditableImage from "@/components/admin/EditableImage";
import EditableSection from "@/components/admin/EditableSection";
import EditableText from "@/components/admin/EditableText";

const STEPS = [
  { num: "01", icon: PhoneCall, head: "상담 신청", desc: "전화·폼으로 30초", label: "Call" },
  { num: "02", icon: MapPin, head: "현장 확인", desc: "방문 후 견적 안내", label: "Visit" },
  { num: "03", icon: Sparkles, head: "야간 시공", desc: "폐점 후 시공 완료", label: "Clean" },
  { num: "04", icon: Smartphone, head: "앱 관리", desc: "리포트·사진 전송", label: "Care" },
];

export default function ProcessV4() {
  return (
    <EditableSection className="bg-white py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col gap-14 md:gap-20">
        <Bridge
          contentKeyPrefix="process"
          step="09 · 신청부터 시공까지"
          bridge="이용 방법이 궁금하시죠. 딱 4단계면 끝나요."
          titleMain="생각보다 간단해요."
          titleAccent="이렇게만 하시면 됩니다."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.num}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-white rounded-3xl border border-ink-100 overflow-hidden hover:border-ink-300 hover:shadow-[0_16px_40px_-25px_rgba(10,15,26,0.15)] transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-[4/3]">
                  <EditableImage
                    contentKey={`process.${s.num}.image`}
                    placeholder={
                      <ImagePlaceholder
                        ratio="4/3"
                        tone="light"
                        rounded="none"
                        label={s.label}
                      />
                    }
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    wrapperClassName="absolute inset-0"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2 z-10 pointer-events-none">
                    <span className="w-8 h-8 rounded-full bg-white text-ink-900 flex items-center justify-center text-[11px] font-bold">
                      {s.num}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
                  <span className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <EditableText
                    as="h3"
                    contentKey={`process.step.${i}.head`}
                    defaultText={s.head}
                    className="text-lg md:text-xl font-bold text-ink-900 leading-tight"
                  />
                  <EditableText
                    as="p"
                    contentKey={`process.step.${i}.desc`}
                    defaultText={s.desc}
                    multiline
                    className="text-sm text-ink-600 leading-[1.55] break-keep"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </EditableSection>
  );
}
