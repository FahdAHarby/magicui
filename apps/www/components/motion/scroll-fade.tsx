"use client"

import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface ScrollFadeProps {
  children: ReactNode
  className?: string
  /** Pixels travelled while the section scrolls away. */
  y?: number
  scale?: number
  opacity?: number
  /** Scroll distance the effect spans, relative to the viewport. */
  end?: string
}

/**
 * Lets a section drift away as the page moves past it. One scrubbed transform:
 * no layout work, no scroll listeners on the main thread.
 */
export function ScrollFade({
  children,
  className,
  y = -70,
  scale = 0.97,
  opacity = 0.12,
  end = "+=70%",
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const element = ref.current
      if (!element || reduced) return

      gsap.to(element, {
        y,
        scale,
        opacity,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end,
          scrub: 0.5,
        },
      })
    },
    { dependencies: [reduced, y, scale, opacity, end] }
  )

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}
