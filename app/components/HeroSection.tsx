"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Preloader from "./Preloader";

/* ────────────────────────────────────────────
   Images that must load before we reveal
   ──────────────────────────────────────────── */
const HERO_SRCS = ["/hero-img1.jpg", "/hero-img2.jpg", "/hero-img3.jpg"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const entranceRan = useRef(false);

  /* ── Image-load tracking ── */
  const [imagesReady, setImagesReady] = useState(false);
  const loadedCount = useRef(0);

  const handleImageLoad = useCallback(() => {
    loadedCount.current += 1;
    if (loadedCount.current >= HERO_SRCS.length) {
      setImagesReady(true);
    }
  }, []);

  /* ── Entrance + scroll timeline ── */
  const [revealed, setRevealed] = useState(false);

  const playEntrance = useCallback(() => {
    setRevealed(true);
  }, []);

  /* ── Hook 1: Scroll-driven slides ──
     Runs once on mount. .from() immediately positions elements off-screen,
     so nothing is visible behind the preloader. No dependency on revealed. */
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "3500 top",
          scrub: 1.2,
          pin: true,
          snap: {
            snapTo: 1 / 3,
            duration: { min: 0.3, max: 0.8 },
            ease: "power2.inOut",
          },
        },
      });

      tl.from(".hero-slide-2", { xPercent: 100, ease: "none" })
        .from(".hero-slide-3", { xPercent: 100, ease: "none" })
        .from(".portrait-img", { x: "100vw", ease: "none", stagger: 0.12 });

      return () => tl.kill();
    },
    { scope: triggerRef }
  );

  /* ── Hook 2: Entrance animation ──
     Fires once after preloader completes. Targets only Slide 1 elements,
     no overlap with the scroll timeline above. */
  useGSAP(
    () => {
      if (!revealed || entranceRan.current) return;
      entranceRan.current = true;

      const entrance = gsap.timeline();

      // Image starts small/zoomed-out, brief pause, then scales up to fill
      entrance.fromTo(
        ".hero-slide-1-img",
        { scale: 0.45 },
        { scale: 1, duration: 2, ease: "power3.out", delay: 0.3 }
      );

      // Brand mark elements stagger in
      entrance
        .fromTo(
          ".hero-brand-tag",
          { opacity: 0, y: 14 },
          { opacity: 0.7, y: 0, duration: 0.8, ease: "power2.out" },
          0.4
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
          },
          0.6
        )
        .fromTo(
          ".hero-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.7, ease: "power2.out" },
          1.0
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 10 },
          { opacity: 0.6, y: 0, duration: 0.7, ease: "power2.out" },
          1.3
        )
        .fromTo(
          ".hero-bottom-bar span",
          { opacity: 0 },
          { opacity: 0.4, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          1.5
        );

      return () => entrance.kill();
    },
    { scope: triggerRef, dependencies: [revealed] }
  );

  return (
    <>
      <Preloader ready={imagesReady} onComplete={playEntrance} />

      <section className="overflow-hidden">
        <div ref={triggerRef}>
          <div ref={sectionRef} className="relative h-screen w-screen">
            {/* ── Slide 1 (base) ── */}
            <div className="absolute inset-0">
              <div className="hero-slide-1-img absolute inset-0 will-change-transform" style={{ scale: "0.45" }}>
                <Image
                  src="/hero-img1.jpg"
                  alt="Bridal gown in natural light"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                  onLoad={handleImageLoad}
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/5" />

              {/* Brand mark — center */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                <span className="hero-brand-tag text-[0.75rem] tracking-[0.5em] uppercase font-light mb-6 opacity-0">
                  Atelier Bridal
                </span>
                <h1 className="hero-title font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] font-light tracking-tight text-center opacity-0">
                  I Am <span className="italic">Silk</span>
                </h1>
                <div className="hero-divider w-[1px] h-12 bg-white/30 mt-8 origin-top" />
                <p className="hero-subtitle mt-6 text-[0.8rem] tracking-[0.35em] uppercase font-light opacity-0">
                  Lorem ipsum dolor sit amet
                </p>
              </div>

              {/* Bottom info bar */}
              <div className="hero-bottom-bar absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-8 pb-8 md:px-16 md:pb-12 text-white">
                <span className="text-[0.65rem] tracking-[0.4em] uppercase opacity-0">
                  Scroll to explore
                </span>
                <span className="text-[0.65rem] tracking-[0.4em] uppercase opacity-0">
                  MMXXVI
                </span>
              </div>
            </div>

            {/* ── Slide 2 ── */}
            <div className="hero-slide-2 absolute inset-0 z-10 will-change-transform">
              <Image
                src="/hero-img2.jpg"
                alt="Silk fabric detail"
                fill
                sizes="100vw"
                className="object-cover"
                onLoad={handleImageLoad}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

              <div className="absolute inset-0 z-10 flex items-end pb-20 md:pb-28 px-8 md:px-16">
                <div className="max-w-xl">
                  <span className="text-[0.65rem] tracking-[0.5em] uppercase text-white/50 font-light">
                    01 — Collectio
                  </span>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light text-white mt-3 tracking-tight">
                    <span className="italic">Perpetua</span>
                  </h2>
                  <div className="w-16 h-[1px] bg-white/30 mt-6 mb-5" />
                  <p className="text-[0.8rem] leading-relaxed text-white/50 font-light max-w-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Slide 3 ── */}
            <div className="hero-slide-3 absolute inset-0 z-20 will-change-transform">
              <Image
                src="/hero-img3.jpg"
                alt="Bridal fitting"
                fill
                sizes="100vw"
                className="object-cover"
                onLoad={handleImageLoad}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

              <div className="absolute inset-0 z-10 flex items-center justify-end pr-8 md:pr-20">
                <div className="text-right max-w-lg">
                  <span className="text-[0.65rem] tracking-[0.5em] uppercase text-white/50 font-light">
                    02 — Atelier
                  </span>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light text-white mt-3 tracking-tight">
                    Vestis <span className="italic">Nuptialis</span>
                  </h2>
                  <div className="w-16 h-[1px] bg-white/30 mt-6 mb-5 ml-auto" />
                  <p className="text-[0.8rem] leading-relaxed text-white/50 font-light">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Portrait triptych ── */}
            {/* Stacks vertical on mobile, horizontal on md+ */}
            <div className="absolute inset-0 z-30 flex flex-col md:flex-row">
              <div className="portrait-img relative h-1/3 md:h-full w-full md:w-1/3 overflow-hidden will-change-transform">
                <Image
                  src="/portrait1.jpg"
                  alt="Portrait 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 text-white">
                  <span className="text-[0.6rem] md:text-[0.6rem] tracking-[0.4em] uppercase opacity-50 block mb-1 md:mb-2">
                    I
                  </span>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] font-light">
                    <span className="italic">Sericum</span>
                  </h3>
                  <p className="text-[0.7rem] leading-relaxed opacity-40 mt-2 md:mt-3 font-light line-clamp-2 md:line-clamp-none">
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </p>
                </div>
                {/* Divider — vertical on desktop, horizontal on mobile */}
                <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
                <div className="block md:hidden absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
              </div>

              <div className="portrait-img relative h-1/3 md:h-full w-full md:w-1/3 overflow-hidden will-change-transform">
                <Image
                  src="/portrait2.jpg"
                  alt="Portrait 2"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 text-white">
                  <span className="text-[0.6rem] tracking-[0.4em] uppercase opacity-50 block mb-1 md:mb-2">
                    II
                  </span>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] font-light">
                    <span className="italic">Velatum</span>
                  </h3>
                  <p className="text-[0.7rem] leading-relaxed opacity-40 mt-2 md:mt-3 font-light line-clamp-2 md:line-clamp-none">
                    Excepteur sint occaecat cupidatat non proident sunt in
                    culpa.
                  </p>
                </div>
                <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
                <div className="block md:hidden absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
              </div>

              <div className="portrait-img relative h-1/3 md:h-full w-full md:w-1/3 overflow-hidden will-change-transform">
                <Image
                  src="/portrait3.jpg"
                  alt="Portrait 3"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 text-white">
                  <span className="text-[0.6rem] tracking-[0.4em] uppercase opacity-50 block mb-1 md:mb-2">
                    III
                  </span>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] font-light">
                    <span className="italic">Noctis</span>
                  </h3>
                  <p className="text-[0.7rem] leading-relaxed opacity-40 mt-2 md:mt-3 font-light line-clamp-2 md:line-clamp-none">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
