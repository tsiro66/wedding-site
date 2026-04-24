"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    number: "03",
    title: "Creation",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
  },
];

export function Atelier() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".atelier-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".atelier-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      gsap.from(".atelier-step", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".atelier-steps",
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="atelier"
      className="bg-warm px-6 py-40 sm:py-56"
    >
      <div className="mx-auto max-w-6xl">
        <div className="atelier-line mb-20 h-px origin-left bg-taupe/30" />

        <div className="mb-32 flex flex-col gap-16 md:flex-row md:items-start md:gap-24">
          <h2 className="atelier-title font-serif text-5xl font-light tracking-wide sm:text-6xl md:w-1/3 md:text-7xl">
            The
            <br />
            Atelier
          </h2>
          <div className="atelier-title md:w-2/3 md:pt-4">
            <p className="max-w-xl text-base font-light leading-relaxed text-stone-600 sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>

        <div className="atelier-steps grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          {STEPS.map((step) => (
            <div key={step.number} className="atelier-step">
              <span className="text-sm font-light tracking-[0.3em] text-taupe">
                {step.number}
              </span>
              <h3 className="mb-5 mt-4 font-serif text-2xl font-light tracking-wide sm:text-3xl">
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
