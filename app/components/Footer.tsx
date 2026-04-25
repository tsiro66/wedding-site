"use client";

import { useRef } from "react";

const MARQUEE_TEXT = "I Am Silk \u00b7 Atelier Bridal \u00b7 Handcrafted Elegance \u00b7 ";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Atelier", href: "#" },
  { label: "About", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      className="fixed inset-0 z-0 bg-black flex flex-col overflow-hidden"
    >
      {/* ── Top section — nav + contact ── */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl w-full">
          {/* Brand + tagline */}
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3.5rem)] font-light text-white leading-[1]">
              I Am <span className="italic">Silk</span>
            </h2>
            <p className="text-[0.8rem] leading-relaxed text-white/40 font-light max-w-xs">
              Handcrafted bridal gowns designed to move with you. Each piece is
              made to order in our Athens atelier.
            </p>
            {/* Social links */}
            <div className="flex gap-6 mt-2">
              {["Instagram", "Pinterest", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[0.65rem] tracking-[0.3em] uppercase text-white/30 hover:text-white/70 transition-colors font-light"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[0.6rem] tracking-[0.5em] uppercase text-white/20 font-light mb-2">
              Navigation
            </span>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-[family-name:var(--font-cormorant)] text-[clamp(1.1rem,1.8vw,1.4rem)] text-white/60 hover:text-white transition-colors font-light leading-tight"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-4">
            <span className="text-[0.6rem] tracking-[0.5em] uppercase text-white/20 font-light mb-2">
              Get in touch
            </span>
            <div className="flex flex-col gap-3 text-[0.8rem] text-white/50 font-light leading-relaxed">
              <p>hello@iamsilk.com</p>
              <p>+30 210 123 4567</p>
              <div className="mt-2">
                <p className="text-white/30">Atelier</p>
                <p>14 Voukourestiou Street</p>
                <p>Athens, 10671</p>
                <p>Greece</p>
              </div>
              <div className="mt-2">
                <p className="text-white/30">Hours</p>
                <p>Mon — Fri, 10:00 — 18:00</p>
                <p>By appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee text — bottom ── */}
      <div className="relative overflow-hidden pointer-events-none">
        <div className="marquee-track flex whitespace-nowrap will-change-transform py-2">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-cormorant)] text-[clamp(6rem,15vw,14rem)] font-light text-white leading-none tracking-tight px-4 select-none"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>

        {/* Edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Copyright bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-5 md:px-16 text-white/25 border-t border-white/5">
        <span className="text-[0.65rem] tracking-[0.15em] font-light">
          © 2026 I Am Silk. All rights reserved.
        </span>
        <span className="text-[0.65rem] tracking-[0.15em] font-light">
          Privacy Policy
        </span>
      </div>
    </footer>
  );
}
