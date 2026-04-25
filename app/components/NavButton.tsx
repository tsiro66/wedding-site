"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Atelier", href: "#atelier" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export default function NavButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      /* Phase 1: 3 bars collapse to center as one thin line */
      tl.to(".bar-top", { top: "50%", yPercent: -50, duration: 0.3, ease: "power3.inOut" }, 0)
        .to(".bar-mid", { duration: 0.3, ease: "power3.inOut" }, 0)
        .to(".bar-bot", { top: "50%", yPercent: -50, duration: 0.3, ease: "power3.inOut" }, 0)

        /* Phase 2: hide all 3 bars, show two identical X arms */
        .to(".bar-top", { opacity: 0, duration: 0.15 }, 0.25)
        .to(".bar-mid", { opacity: 0, duration: 0.15 }, 0.25)
        .to(".bar-bot", { opacity: 0, duration: 0.15 }, 0.25)
        .to(".bar-x1", { opacity: 1, rotation: 45, duration: 0.3, ease: "power2.inOut" }, 0.35)
        .to(".bar-x2", { opacity: 1, rotation: -45, duration: 0.3, ease: "power2.inOut" }, 0.35)

        /* Overlay wipe */
        .to(
          ".menu-overlay",
          { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power4.inOut" },
          0.1
        )

        /* Stagger links */
        .fromTo(
          ".menu-link",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
          0.45
        )

        /* Secondary info */
        .fromTo(
          ".menu-secondary",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.65
        );

      tlRef.current = tl;
      return () => tl.kill();
    },
    { scope: containerRef }
  );

  const toggle = useCallback(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.reverse();
    } else {
      tlRef.current.play();
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      {/* Fullscreen overlay */}
      <div
        className="menu-overlay fixed inset-0 z-40 bg-[#1c1917] flex"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <div className="flex flex-col justify-center px-12 md:px-24 lg:px-32 w-full">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="overflow-hidden">
                <a
                  href={link.href}
                  className="menu-link block font-[family-name:var(--font-cormorant)] text-white/40 text-[clamp(2.5rem,8vw,6rem)] leading-[1.1] font-light tracking-tight hover:text-white transition-colors duration-300"
                  onClick={toggle}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </nav>

          <div className="menu-secondary mt-16 flex gap-12 text-sm tracking-widest uppercase opacity-0">
            <span className="text-white/40 hover:text-white transition-colors duration-300 cursor-pointer">Instagram</span>
            <span className="text-white/40 hover:text-white transition-colors duration-300 cursor-pointer">Facebook</span>
          </div>
        </div>
      </div>

      {/* Hamburger / X button */}
      <button
        onClick={toggle}
        className="fixed left-6 top-1/2 z-50 -translate-y-1/2 mix-blend-difference w-16 h-16 flex items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative" style={{ width: 48, height: 18 }}>
          {/* 3 bars — absolutely positioned, fixed width */}
          <span className="bar-top absolute left-0 top-0 h-[1px] bg-white origin-center" style={{ width: 48 }} />
          <span className="bar-mid absolute left-0 top-[50%] -translate-y-1/2 h-[1.5px] bg-white origin-center" style={{ width: 48 }} />
          <span className="bar-bot absolute left-0 bottom-0 h-[2px] bg-white origin-center" style={{ width: 48 }} />

          {/* X arms — both identical, hidden until open */}
          <span className="bar-x1 absolute left-0 top-[50%] -translate-y-1/2 h-[1px] bg-white origin-center opacity-0" style={{ width: 48 }} />
          <span className="bar-x2 absolute left-0 top-[50%] -translate-y-1/2 h-[1px] bg-white origin-center opacity-0" style={{ width: 48 }} />
        </div>
      </button>
    </div>
  );
}
