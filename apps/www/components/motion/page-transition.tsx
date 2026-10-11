"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"

import { EASE, gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

/** Template components remount per navigation, so this flag survives them. */
let hasNavigated = false

/**
 * Enter transition for route changes. Next.js unmounts the outgoing tree
 * before the new one renders, so the transition is an entrance plus an
 * optimistic progress bar rather than a crossfade — cheap, and it never
 * blocks the navigation itself.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const element = ref.current
      if (!element || reduced) return

      if (!hasNavigated) {
        hasNavigated = true
        return
      }

      gsap.fromTo(
        element,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.out,
          clearProps: "transform,opacity",
        }
      )
    },
    { dependencies: [pathname, reduced] }
  )

  return <div ref={ref}>{children}</div>
}

/**
 * Slim gradient bar that reacts to link clicks and resolves when the new route
 * renders. Prefetched routes resolve instantly, so the bar only ever appears
 * when a navigation actually takes time.
 */
export function RouteProgress() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const pendingRef = useRef(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const bar = barRef.current
    if (!bar || reduced) return

    // A pathname change means the navigation finished.
    gsap.to(bar, {
      scaleX: 1,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(bar, {
          opacity: 0,
          duration: 0.25,
          delay: 0.05,
          onComplete: () => {
            gsap.set(bar, { scaleX: 0, transformOrigin: "left center" })
          },
        })
      },
    })
  }, [pathname, reduced])

  useEffect(() => {
    const bar = barRef.current
    if (!bar || reduced) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a")
      if (!anchor) return
      if (anchor.target && anchor.target !== "_self") return
      if (anchor.hasAttribute("download")) return

      const href = anchor.getAttribute("href")
      if (!href?.startsWith("/") || href.startsWith("//")) return
      if (href === window.location.pathname) return

      pendingRef.current = true
      gsap.killTweensOf(bar)
      gsap.set(bar, {
        opacity: 1,
        scaleX: 0,
        transformOrigin: "left center",
      })
      gsap.to(bar, { scaleX: 0.72, duration: 0.9, ease: "power2.out" })
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [reduced])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-[2px] overflow-hidden"
    >
      <div
        ref={barRef}
        className="h-full w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-1), var(--color-2), var(--color-3), var(--color-5))",
          opacity: 0,
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
    </div>
  )
}
