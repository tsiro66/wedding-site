"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PlaceholderSection from "./PlaceholderSection";

export default function EditorialZoom() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const scale = scaleRef.current;
      const leftPanel = leftPanelRef.current;
      const rightPanel = rightPanelRef.current;
      const title = titleRef.current;
      const content = contentRef.current;
      if (!wrapper || !scale || !leftPanel || !rightPanel || !title || !content)
        return;

      gsap.set(scale, { scale: 0.35 });
      gsap.set(content, { visibility: "hidden" });

      const words = content.querySelectorAll(".reveal-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      /* Phase 1 — zoom in (0 → 0.5) */
      tl.to(scale, { scale: 1, ease: "none", duration: 0.5 }, 0).to(
        title,
        { opacity: 0, y: -60, ease: "none", duration: 0.25 },
        0.2
      );

      /* Phase 2 — split apart & reveal (0.5 → 1.0) */
      tl.set(content, { visibility: "visible" }, 0.5).to(
        leftPanel,
        { xPercent: -100, ease: "power3.inOut", duration: 0.5 },
        0.5
      )
        .to(
          rightPanel,
          { xPercent: 100, ease: "power3.inOut", duration: 0.5 },
          0.5
        )
        .to(
          words,
          { opacity: 1, ease: "power2.out", duration: 0.3, stagger: 0.02 },
          0.55
        );

      return () => tl.kill();
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-[var(--color-cream)]">
        {/* ── Placeholder content — revealed behind split ── */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10"
        >
          <PlaceholderSection />
        </div>

        {/* ── Title — fades during zoom ── */}
        <div
          ref={titleRef}
          className="absolute left-8 md:left-16 lg:left-24 z-30 pointer-events-none mix-blend-difference"
          style={{ top: "calc(20vh - 1rem)" }}
        >
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(4rem,14vw,12rem)] leading-[0.9] font-light text-white tracking-tight text-left">
            Born of{" "}
            <span className="italic">Silk</span>
          </h2>
        </div>

        {/* ── Image panels — scale together, split apart ── */}
        <div
          ref={scaleRef}
          className="absolute inset-0 z-20 will-change-transform origin-center"
        >
          {/* Left panel */}
          <div
            ref={leftPanelRef}
            className="absolute inset-0 will-change-transform"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <Image
              src="/hero-img4.jpg"
              alt="Silk draping detail"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Right panel */}
          <div
            ref={rightPanelRef}
            className="absolute inset-0 will-change-transform"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          >
            <Image
              src="/hero-img4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
