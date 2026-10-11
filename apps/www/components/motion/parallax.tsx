"use client"

import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Pixels travelled across the whole scroll range (negative moves up). */
  distance?: number
  scrub?: number | boolean
}

/** Scroll-linked vertical drift. Cheap: a single transform, no layout work. */
export function Parallax({
  children,
  className,
  distance = -80,
  scrub = 0.6,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const element = ref.current
      if (!element || reduced) return

      gsap.fromTo(
        element,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        }
      )
    },
    { dependencies: [distance, scrub, reduced] }
  )

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}
