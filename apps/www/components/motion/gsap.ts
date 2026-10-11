"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/** Shared motion language for every GSAP driven piece of the site. */
export const EASE = {
  /** Long, cinematic entrances. */
  out: "expo.out",
  /** Short interface responses (hover, press). */
  soft: "power2.out",
  /** Scroll linked movement. */
  linear: "none",
} as const

export const DURATION = {
  hero: 1.1,
  reveal: 0.9,
  hover: 0.35,
} as const

gsap.defaults({ ease: EASE.out, duration: DURATION.reveal })

export { gsap, ScrollTrigger, SplitText, useGSAP }
