"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (!href || !lenis) return;
      lenis.scrollTo(href, { offset: -40, duration: 1.6 });
    },
    [lenis],
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-cream/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-7">
        <a
          href="/"
          className={`text-[11px] sm:text-xs tracking-[0.35em] uppercase font-light transition-colors duration-700 ${
            scrolled ? "text-stone-900" : "text-white"
          }`}
        >
          I Am Silk
        </a>
        <div
          className={`hidden sm:flex gap-8 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-light transition-colors duration-700 ${
            scrolled ? "text-stone-500" : "text-white/70"
          }`}
        >
          <a
            href="#philosophy"
            onClick={scrollTo}
            className="hover:opacity-60 transition-opacity"
          >
            Philosophy
          </a>
          <a
            href="#atelier"
            onClick={scrollTo}
            className="hover:opacity-60 transition-opacity"
          >
            Atelier
          </a>
          <a
            href="#contact"
            onClick={scrollTo}
            className="hover:opacity-60 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
