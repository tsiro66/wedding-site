"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function GsapProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
