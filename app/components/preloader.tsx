"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Preloader() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          document.body.style.overflow = "";
          window.dispatchEvent(new Event("preloader-complete"));
          if (container.current) container.current.style.display = "none";
        },
      });

      // 1. Draw the ring
      tl.to(".pl-ring", {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
      })
        // 3. Brand name letters reveal
        .from(
          ".pl-letter",
          {
            y: 40,
            opacity: 0,
            stagger: 0.04,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        // 4. Tagline fades in
        .from(
          ".pl-tagline",
          {
            opacity: 0,
            letterSpacing: "0.8em",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3",
        )
        // 5. Hold
        .to({}, { duration: 0.4 })
        // 6. Content fades out
        .to(".pl-center", {
          opacity: 0,
          scale: 0.92,
          duration: 0.5,
          ease: "power2.in",
        })
        // 7. Curtains part
        .to(
          ".pl-curtain-left",
          {
            xPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.2",
        )
        .to(
          ".pl-curtain-right",
          {
            xPercent: 100,
            duration: 1,
            ease: "power4.inOut",
          },
          "<",
        );
    },
    { scope: container },
  );

  // SVG ring circumference for dash animation
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  const brandName = "I Am Silk";

  return (
    <div ref={container} className="fixed inset-0 z-[100]">
      {/* Split curtain panels */}
      <div className="pl-curtain-left absolute inset-y-0 left-0 w-1/2 bg-cream" />
      <div className="pl-curtain-right absolute inset-y-0 right-0 w-1/2 bg-cream" />

      {/* Centered content */}
      <div className="pl-center pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* Ring + monogram */}
        <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 120 120"
            fill="none"
          >
            <circle
              className="pl-ring"
              cx="60"
              cy="60"
              r={radius}
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{ color: "#a39382" }}
            />
          </svg>

        </div>

        {/* Brand name — letter by letter */}
        <p className="flex items-baseline font-serif text-[clamp(1.6rem,5vw,3rem)] font-light tracking-[0.25em]">
          {brandName.split("").map((char, i) => (
            <span
              key={i}
              className={`pl-letter inline-block ${char === " " ? "w-[0.3em]" : ""} ${char === char.toLowerCase() && char !== char.toUpperCase() ? "" : ""}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        {/* Tagline */}
        <p
          className="pl-tagline text-[9px] font-light uppercase tracking-[0.45em] sm:text-[10px]"
          style={{ color: "#a39382" }}
        >
          Lorem ipsum dolor
        </p>
      </div>
    </div>
  );
}
