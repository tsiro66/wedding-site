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
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

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
            y: 120,
            opacity: 0,
            stagger: 0.12,
            duration: 1.4,
            ease: "power3.out",
          },
          0.8,
        )
        .from(
          ".hero-sub",
          {
            y: 30,
            opacity: 0,
            duration: 1,
          },
          1.3,
        );

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
      <div ref={imageWrap} className="absolute inset-0">
        <Image
          src="/cassio-jardim-Efd5oh-nQWI-unsplash.jpg"
          alt="Bridal gown detail"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="overflow-hidden">
          <p className="hero-line mb-8 text-[10px] font-light uppercase tracking-[0.4em] sm:text-xs">
            Bespoke Bridal Couture
          </p>
        </div>
        <h1 className="font-serif font-light leading-[0.9]">
          <div className="overflow-hidden">
            <span className="hero-line block text-[clamp(3.5rem,12vw,10rem)] tracking-wide">
              I Am
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-[clamp(3.5rem,12vw,10rem)] italic tracking-wide">
              Silk
            </span>
          </div>
        </h1>
        <div className="mt-10 overflow-hidden">
          <p className="hero-sub text-[10px] font-light uppercase tracking-[0.35em] opacity-80 sm:text-xs">
            London &middot; Paris &middot; Milan
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="h-12 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  );
}
