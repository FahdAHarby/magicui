"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface MagneticProps {
  children: ReactNode
  className?: string
  /** How far the element follows the cursor. 0.2 is subtle, 0.6 is playful. */
  strength?: number
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)"

/** Nudges an element toward the cursor while it is hovered. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const areaRef = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const area = areaRef.current
      const inner = innerRef.current
      if (!area || !inner || reduced) return
      if (!window.matchMedia(FINE_POINTER).matches) return

      const moveX = gsap.quickTo(inner, "x", {
        duration: 0.5,
        ease: "power3.out",
      })
      const moveY = gsap.quickTo(inner, "y", {
        duration: 0.5,
        ease: "power3.out",
      })

      const onMove = (event: PointerEvent) => {
        const rect = area.getBoundingClientRect()
        moveX((event.clientX - (rect.left + rect.width / 2)) * strength)
        moveY((event.clientY - (rect.top + rect.height / 2)) * strength)
      }

      const onLeave = () => {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
        })
      }

      area.addEventListener("pointermove", onMove)
      area.addEventListener("pointerleave", onLeave)

      return () => {
        area.removeEventListener("pointermove", onMove)
        area.removeEventListener("pointerleave", onLeave)
        gsap.killTweensOf(inner)
      }
    },
    { dependencies: [reduced, strength] }
  )

  useEffect(() => {
    if (!reduced) return
    gsap.set(innerRef.current, { x: 0, y: 0 })
  }, [reduced])

  return (
    <span ref={areaRef} className={cn("inline-block", className)}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  )
}
