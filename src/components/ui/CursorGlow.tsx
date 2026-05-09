"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const SIZE = 500;
    const HALF = SIZE / 2;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,46,99,0.07) 0%, rgba(255,46,99,0.02) 40%, transparent 70%)",
        transform: "translate(-9999px, -9999px)",
        transition: "transform 0.12s ease",
        willChange: "transform",
      }}
    />
  );
}
