"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Footer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-reveal", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  return (
    <footer
      ref={container}
      id="contact"
      className="bg-stone-900 px-6 py-40 text-white sm:py-56"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="footer-reveal mb-8 text-xs uppercase tracking-[0.4em] text-white/40">
          Begin Your Journey
        </p>
        <h2 className="footer-reveal font-serif text-4xl font-light leading-tight tracking-wide sm:text-5xl md:text-7xl">
          Lorem ipsum dolor
          <br />
          sit amet
        </h2>
        <div className="footer-reveal mt-12">
          <a
            href="mailto:atelier@iamsilk.com"
            className="inline-block border border-white/30 px-10 py-4 text-sm uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-stone-900"
          >
            Book a Consultation
          </a>
        </div>

        <div className="footer-reveal mt-32 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-12 text-[11px] uppercase tracking-[0.2em] text-white/30 sm:flex-row">
          <span>I Am Silk</span>
          <span suppressHydrationWarning>
            &copy; {new Date().getFullYear()}
          </span>
          <span>London &middot; Paris &middot; Milan</span>
        </div>
      </div>
    </footer>
  );
}
