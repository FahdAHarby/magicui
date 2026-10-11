"use client"

import { Fragment, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { gsap, useGSAP } from "@/components/motion/gsap"
import { useSmoothScroll } from "@/components/motion/smooth-scroll-provider"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface VelocityMarqueeProps {
  children: ReactNode[]
  className?: string
  /** Base travel speed in pixels per second. */
  speed?: number
  /** 1 moves left, -1 moves right. */
  direction?: 1 | -1
  /** Slow to a stop so links stay clickable. */
  pauseOnHover?: boolean
  /** Where the row is placed when motion is reduced. */
  staticClassName?: string
}

/**
 * Seamless marquee that reacts to scroll velocity: it speeds up, slows down and
 * briefly reverses with the page. Falls back to a static row when the visitor
 * prefers reduced motion, and pauses while off screen.
 */
export function VelocityMarquee({
  children,
  className,
  speed = 60,
  direction = 1,
  pauseOnHover = true,
  staticClassName = "flex flex-wrap items-stretch justify-center gap-6",
}: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const hoveredRef = useRef(false)
  const reduced = usePrefersReducedMotion()
  const { subscribe } = useSmoothScroll()

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track || reduced) return

      // The row holds two copies of the list, so one copy is half the width.
      const distance = track.scrollWidth / 2
      if (distance < 1) return

      const wrap = gsap.utils.wrap(-distance, 0)

      const tween = gsap.to(track, {
        x: `-=${distance}`,
        duration: distance / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (value) => `${wrap(parseFloat(value))}px`,
        },
      })

      tweenRef.current = tween

      // Scroll velocity only moves a target value; a single ticker callback
      // eases the tween toward it. No per-frame tween churn.
      let targetScale: number = direction

      const easeTimeScale = () => {
        const current = tween.timeScale()
        const next = current + (targetScale - current) * 0.08
        tween.timeScale(
          Math.abs(next - targetScale) < 0.002 ? targetScale : next
        )
      }

      gsap.ticker.add(easeTimeScale)

      const unsubscribe = subscribe((lenis) => {
        if (hoveredRef.current) return
        targetScale = gsap.utils.clamp(
          -6,
          6,
          direction + lenis.velocity * 0.012
        )
      })

      let onEnter: (() => void) | undefined
      let onLeave: (() => void) | undefined

      if (pauseOnHover) {
        onEnter = () => {
          hoveredRef.current = true
          targetScale = 0
        }
        onLeave = () => {
          hoveredRef.current = false
          targetScale = direction
        }
        track.addEventListener("pointerenter", onEnter)
        track.addEventListener("pointerleave", onLeave)
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) tween.play()
          else tween.pause()
        },
        { rootMargin: "200px" }
      )
      observer.observe(track)

      return () => {
        unsubscribe()
        gsap.ticker.remove(easeTimeScale)
        observer.disconnect()
        if (onEnter) track.removeEventListener("pointerenter", onEnter)
        if (onLeave) track.removeEventListener("pointerleave", onLeave)
        tweenRef.current = null
      }
    },
    { dependencies: [reduced, speed, direction, pauseOnHover, subscribe] }
  )

  if (reduced) {
    return (
      <div className={cn(staticClassName, className)}>
        {children.map((child, index) => (
          <Fragment key={index}>{child}</Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children.map((child, index) => (
          <Fragment key={index}>{child}</Fragment>
        ))}
        <div className="flex" aria-hidden="true">
          {children.map((child, index) => (
            <Fragment key={`clone-${index}`}>{child}</Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
