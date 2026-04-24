"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ImageBand() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative h-[60vh] overflow-hidden sm:h-[70vh]"
    >
      <div ref={imageRef} className="absolute inset-x-0 inset-y-[-8%]">
        <Image
          src="/img-band.jpg"
          alt="Bridal gowns in lace and silk"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 45%" }}
        />
      </div>
    </div>
  );
}
