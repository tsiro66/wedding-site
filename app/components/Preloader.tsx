"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  ready: boolean;
  onComplete: () => void;
}

export default function Preloader({ ready, onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const hasExited = useRef(false);
  const idleTween = useRef<gsap.core.Tween | null>(null);

  /* ── Fake progress that idles at ~70% until ready ── */
  const [displayCount, setDisplayCount] = useState(0);

  // Phase 1: idle crawl to ~70
  useEffect(() => {
    const obj = { val: 0 };
    idleTween.current = gsap.to(obj, {
      val: 70,
      duration: 2.4,
      ease: "power2.out",
      onUpdate: () => setDisplayCount(Math.round(obj.val)),
    });
    return () => {
      idleTween.current?.kill();
    };
  }, []);

  // Phase 2: when ready, race to 100
  useEffect(() => {
    if (!ready) return;
    idleTween.current?.kill();
    const obj = { val: displayCount };
    gsap.to(obj, {
      val: 100,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => setDisplayCount(Math.round(obj.val)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  /* ── Entrance animation (letters + counter) ── */
  useGSAP(() => {
    const letters = brandRef.current?.querySelectorAll(".p-letter");
    if (!letters?.length) return;

    const tl = gsap.timeline();

    // Stagger letters in
    tl.fromTo(
      letters,
      { y: 40, opacity: 0, rotateX: 90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
      }
    )
      // Counter fade in
      .fromTo(
        counterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.5
      );
  }, []);

  /* ── Exit animation (when counter hits 100) ── */
  const exitPlayed = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;

    const tl = gsap.timeline({ onComplete });
    const letters = brandRef.current?.querySelectorAll(".p-letter");

    // Letters stagger out upward
    tl.to(letters ?? [], {
      y: -30,
      opacity: 0,
      rotateX: -45,
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.in",
    })
      // Counter out
      .to(
        counterRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "<0.1"
      )
      // Clip-path wipe — circle closes from full to zero
      .to(overlayRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 1,
        ease: "power3.inOut",
      })
      .set(overlayRef.current, { display: "none" });
  }, [onComplete]);

  useEffect(() => {
    if (displayCount >= 100 && ready) {
      // Small pause so user sees "100"
      const id = setTimeout(exitPlayed, 300);
      return () => clearTimeout(id);
    }
  }, [displayCount, ready, exitPlayed]);

  /* ── Split brand into words, last word italic ── */
  const brandWords = "I Am Silk".split(" ");
  const brandChars = brandWords.flatMap((word, wi) => {
    const isLast = wi === brandWords.length - 1;
    const chars = word.split("").map((ch) => ({ ch, italic: isLast }));
    // Add space between words (except after last word)
    if (!isLast) chars.push({ ch: "\u00A0", italic: false });
    return chars;
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[var(--color-cream)]"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
      aria-hidden
    >
      {/* Subtle animated gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmax] h-[60vmax] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, var(--color-taupe) 0%, transparent 70%)",
          animation: "preloaderPulse 3s ease-in-out infinite",
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Brand letters */}
        <div
          ref={brandRef}
          className="flex items-baseline gap-[0.04em] font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,12vw,8rem)] font-light tracking-tight text-stone-800 overflow-hidden"
          style={{ perspective: "600px" }}
        >
          {brandChars.map(({ ch, italic }, i) => (
            <span
              key={i}
              className={`p-letter inline-block will-change-transform${italic ? " italic" : ""}`}
              style={{ transformOrigin: "bottom center" }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Counter — bottom right */}
      <span
        ref={counterRef}
        className="absolute bottom-8 right-8 text-[clamp(2rem,5vw,3.5rem)] tracking-[0.1em] text-stone-900 font-light tabular-nums opacity-0"
      >
        {String(displayCount).padStart(3, "0")}
      </span>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes preloaderPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
