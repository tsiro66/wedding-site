"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        imageWrap.current,
        { clipPath: "inset(12%)", scale: 1.15 },
        {
          clipPath: "inset(0%)",
          scale: 1,
          duration: 2.2,
          ease: "power4.inOut",
        },
      )
        .from(
          ".hero-line",
          {
            x: -80,
            opacity: 0,
            stagger: 0.15,
            duration: 1.6,
            ease: "power3.out",
          },
          0.8,
        )
        .from(
          ".hero-sub",
          {
            y: 20,
            opacity: 0,
            duration: 1,
          },
          1.4,
        );

      // Sync with preloader — play after it exits
      const play = () => tl.play();
      window.addEventListener("preloader-complete", play, { once: true });

      // Parallax on scroll
      gsap.to(imageWrap.current, {
        yPercent: 15,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade text on scroll
      gsap.to(".hero-content", {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Image — no overlay, breathes fully */}
      <div ref={imageWrap} className="absolute inset-0">
        <Image
          src="/img-hero.jpg"
          alt="Bridal gown detail"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Text — left-aligned, blend-difference reacts to image */}
      <div className="hero-content pointer-events-none relative z-10 flex h-full flex-col justify-end px-6 pb-28 sm:justify-center sm:pb-0 sm:pl-[8vw]">
        <div className="overflow-hidden">
          <p className="hero-line mb-6 text-[10px] font-light uppercase tracking-[0.4em] text-white mix-blend-difference sm:text-xs">
            Bespoke Bridal Couture
          </p>
        </div>
        <h1 className="font-serif font-light leading-[0.85] text-white mix-blend-difference">
          <div className="overflow-hidden">
            <span className="hero-line block text-[clamp(4rem,14vw,12rem)] tracking-wide">
              I Am
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-[clamp(4rem,14vw,12rem)] italic tracking-wide">
              Silk
            </span>
          </div>
        </h1>
        <div className="mt-8 overflow-hidden">
          <p className="hero-sub text-[10px] font-light uppercase tracking-[0.35em] text-white mix-blend-difference sm:text-xs">
            London &middot; Paris &middot; Milan
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="h-12 w-px animate-pulse bg-white/40 mix-blend-difference" />
      </div>
    </section>
  );
}
