"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
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
  }, { scope: triggerRef });

  return (
    <section className="overflow-hidden">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="relative h-screen w-screen">

          {/* ── Slide 1 (base) ── */}
          <div className="absolute inset-0">
            <Image src="/hero-img1.jpg" alt="Bridal gown in natural light" fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-black/20" />

            {/* Brand mark — center */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
              <span className="text-[0.75rem] tracking-[0.5em] uppercase font-light mb-6 opacity-70">
                Atelier Bridal
              </span>
              <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] font-light tracking-tight text-center">
                I Am Silk
              </h1>
              <div className="w-[1px] h-12 bg-white/30 mt-8" />
              <p className="mt-6 text-[0.8rem] tracking-[0.35em] uppercase font-light opacity-60">
                Lorem ipsum dolor sit amet
              </p>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-8 pb-8 md:px-16 md:pb-12 text-white">
              <span className="text-[0.65rem] tracking-[0.4em] uppercase opacity-40">
                Scroll to explore
              </span>
              <span className="text-[0.65rem] tracking-[0.4em] uppercase opacity-40">
                MMXXVI
              </span>
            </div>
          </div>

          {/* ── Slide 2 ── */}
          <div className="hero-slide-2 absolute inset-0 z-10">
            <Image src="/hero-img2.jpg" alt="Silk fabric detail" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0 z-10 flex items-end pb-20 md:pb-28 px-8 md:px-16">
              <div className="max-w-xl">
                <span className="text-[0.65rem] tracking-[0.5em] uppercase text-white/50 font-light">
                  01 — Collectio
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light text-white mt-3 tracking-tight">
                  Perpetua
                </h2>
                <div className="w-16 h-[1px] bg-white/30 mt-6 mb-5" />
                <p className="text-[0.8rem] leading-relaxed text-white/50 font-light max-w-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          {/* ── Slide 3 ── */}
          <div className="hero-slide-3 absolute inset-0 z-20">
            <Image src="/hero-img3.jpg" alt="Bridal fitting" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 z-10 flex items-center justify-end pr-8 md:pr-20">
              <div className="text-right max-w-lg">
                <span className="text-[0.65rem] tracking-[0.5em] uppercase text-white/50 font-light">
                  02 — Atelier
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light text-white mt-3 tracking-tight">
                  Vestis Nuptialis
                </h2>
                <div className="w-16 h-[1px] bg-white/30 mt-6 mb-5 ml-auto" />
                <p className="text-[0.8rem] leading-relaxed text-white/50 font-light">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>

          {/* ── Portrait triptych ── */}
          <div className="absolute inset-0 z-30 flex">
            <div className="portrait-img relative h-full w-1/3 overflow-hidden">
              <Image src="/portrait1.jpg" alt="Portrait 1" fill sizes="33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <span className="text-[0.6rem] tracking-[0.4em] uppercase opacity-50 block mb-2">I</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] font-light">
                  Sericum
                </h3>
                <p className="text-[0.7rem] leading-relaxed opacity-40 mt-3 font-light">
                  Duis aute irure dolor in reprehenderit in voluptate velit.
                </p>
              </div>
              {/* Divider line */}
              <div className="absolute top-0 right-0 w-[1px] h-full bg-white/10" />
            </div>

            <div className="portrait-img relative h-full w-1/3 overflow-hidden">
              <Image src="/portrait2.jpg" alt="Portrait 2" fill sizes="33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <span className="text-[0.6rem] tracking-[0.4em] uppercase opacity-50 block mb-2">II</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] font-light">
                  Velatum
                </h3>
                <p className="text-[0.7rem] leading-relaxed opacity-40 mt-3 font-light">
                  Excepteur sint occaecat cupidatat non proident sunt in culpa.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-[1px] h-full bg-white/10" />
            </div>

            <div className="portrait-img relative h-full w-1/3 overflow-hidden">
              <Image src="/portrait3.jpg" alt="Portrait 3" fill sizes="33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <span className="text-[0.6rem] tracking-[0.4em] uppercase opacity-50 block mb-2">III</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.1] font-light">
                  Noctis
                </h3>
                <p className="text-[0.7rem] leading-relaxed opacity-40 mt-3 font-light">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
