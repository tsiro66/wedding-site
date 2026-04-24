"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const IMAGES = [
  { src: "/img-hero.jpg", alt: "Bridal gown detail" },
  { src: "/img-hero.jpg", alt: "Silk draping" },
  { src: "/img-hero.jpg", alt: "Lace closeup" },
  { src: "/img-hero.jpg", alt: "Atelier moment" },
  { src: "/img-hero.jpg", alt: "Final fitting" },
];

export function Gallery() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current!;
      const scrollWidth = trackEl.scrollWidth - trackEl.offsetWidth;

      gsap.to(trackEl, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative z-10 overflow-hidden bg-cream">
      <div
        ref={track}
        className="flex h-screen items-center gap-8 pl-[8vw]"
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className={`relative h-[70vh] w-[45vw] shrink-0 overflow-hidden sm:w-[35vw] ${
              i % 2 === 1 ? "mt-16" : "-mt-16"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
        <div className="shrink-0 w-[8vw]" aria-hidden="true" />
      </div>
    </section>
  );
}
