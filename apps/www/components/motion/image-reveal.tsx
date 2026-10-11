"use client"

import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { EASE, gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface ImageRevealProps {
  children: ReactNode
  className?: string
  /** Starting `inset()` value of the mask, e.g. "12% 8%". */
  from?: string
  radius?: string
  delay?: number
  duration?: number
}

/**
 * Opens an image like a shutter while the picture settles out of a slight
 * overscale. Used for every editorial image on the marketing pages.
 */
export function ImageReveal({
  children,
  className,
  from = "14% 10%",
  radius = "0.75rem",
  delay = 0,
  duration = 1.35,
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const inner = innerRef.current
      if (!wrapper || !inner) return

      if (reduced) {
        gsap.set(wrapper, { clipPath: "none" })
        gsap.set(inner, { scale: 1 })
        return
      }

      const scrollTrigger = { trigger: wrapper, start: "top 92%", once: true }

      gsap.fromTo(
        wrapper,
        { clipPath: `inset(${from} round ${radius})` },
        {
          clipPath: `inset(0% round ${radius})`,
          duration,
          delay,
          ease: EASE.out,
          scrollTrigger,
        }
      )

      gsap.fromTo(
        inner,
        { scale: 1.14 },
        {
          scale: 1,
          duration: duration * 1.4,
          delay,
          ease: EASE.out,
          scrollTrigger,
        }
      )
    },
    { dependencies: [reduced, from, radius, delay, duration] }
  )

  return (
    <div
      ref={wrapperRef}
      data-reveal-image=""
      className={cn("overflow-hidden", className)}
      style={{
        clipPath: `inset(${from} round ${radius})`,
        willChange: "clip-path",
      }}
    >
      <div ref={innerRef} className="size-full will-change-transform">
        {children}
      </div>
    </div>
  )
}
