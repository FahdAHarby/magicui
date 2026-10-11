"use client"

import { useRef, type ElementType, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { DURATION, EASE, gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Seconds before the animation starts. */
  delay?: number
  duration?: number
  /** Vertical travel in pixels. */
  y?: number
  /** Adds a short focus-pull. Costs a little more GPU, so it is opt-in. */
  blur?: boolean
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number
  start?: string
}

/**
 * Scroll-triggered entrance. The hidden start state lives in CSS
 * (`[data-reveal]`) so there is no flash of un-animated content, and GSAP
 * writes inline styles that override it once the element enters the viewport.
 * A `<noscript>` rule in the root layout restores everything for no-JS visits.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  duration = DURATION.reveal,
  y = 18,
  blur = false,
  stagger,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const Component = (as ?? "div") as unknown as "div"

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const targets: Element[] =
        stagger === undefined ? [element] : Array.from(element.children)

      if (targets.length === 0) return

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0, filter: "none" })
        return
      }

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: stagger ?? 0,
        ease: EASE.out,
        filter: blur ? "blur(0px)" : "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
        onComplete: () => {
          gsap.set(targets, { filter: "none", willChange: "auto" })
        },
      })
    },
    { dependencies: [reduced, delay, duration, y, blur, stagger, start] }
  )

  return (
    <Component
      ref={ref}
      data-reveal=""
      data-reveal-stagger={stagger === undefined ? undefined : ""}
      className={cn(className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-blur": blur ? "12px" : "0px",
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  )
}
