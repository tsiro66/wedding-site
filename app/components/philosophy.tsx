"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const QUOTE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua vestibulum.";

export function Philosophy() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".phil-word", {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "center center",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="philosophy"
      className="bg-cream px-6 py-48 sm:py-64"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-serif text-3xl font-light leading-snug tracking-wide sm:text-4xl md:text-5xl">
          {QUOTE.split(" ").map((word, i) => (
            <span
              key={i}
              className="phil-word mr-[0.3em] inline-block opacity-[0.12]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
