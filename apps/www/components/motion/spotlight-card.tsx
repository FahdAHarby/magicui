"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/components/motion/use-reduced-motion"

/**
 * Adapted from React Bits (https://github.com/DavidHDev/react-bits) —
 * a cursor spotlight with a masked prism edge highlight. Two details make it
 * usable for everyone: the light also follows keyboard focus, not just the
 * pointer, and every bit of drift is switched off for reduced motion.
 */

const PALETTES = {
  light: {
    glow: "rgba(90, 105, 255, 0.13)",
    ringStrength: 0.9,
  },
  dark: {
    glow: "rgba(255, 255, 255, 0.14)",
    ringStrength: 1,
  },
} as const

interface SpotlightCardProps extends ComponentPropsWithoutRef<"div"> {
  /** Radius of the light pool in pixels. */
  size?: number
  /** Maximum opacity of the fill glow. */
  intensity?: number
  /** How far outside the card the light is still visible. */
  proximity?: number
  /** Maximum opacity of the edge highlight. */
  ringIntensity?: number
}

export function SpotlightCard({
  children,
  className,
  size = 320,
  intensity = 1,
  proximity = 90,
  ringIntensity = 0.7,
  ...props
}: SpotlightCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const { resolvedTheme } = useTheme()
  const palette = resolvedTheme === "dark" ? PALETTES.dark : PALETTES.light

  useEffect(() => {
    const root = rootRef.current
    const glow = glowRef.current
    const ring = ringRef.current
    if (!root || !glow || !ring) return

    const reduce = prefersReducedMotion()
    const pointer = { x: 0, y: 0, active: false }
    let focused: HTMLElement | null = null
    let x = 0
    let y = 0
    let presence = 0
    let raf = 0
    let last = performance.now()
    let alive = true

    const paint = () => {
      glow.style.backgroundImage = `radial-gradient(${size}px circle at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${palette.glow}, transparent 68%)`
      glow.style.opacity = (presence * intensity).toFixed(3)

      const mask = `radial-gradient(${Math.round(size * 0.7)}px circle at ${x.toFixed(1)}px ${y.toFixed(1)}px, #000 0%, transparent 70%)`
      ring.style.maskImage = mask
      ring.style.webkitMaskImage = mask
      ring.style.opacity = (
        presence *
        ringIntensity *
        palette.ringStrength
      ).toFixed(3)
    }

    const tick = (now: number) => {
      raf = 0
      if (!alive) return

      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
      last = now

      const rect = root.getBoundingClientRect()
      let targetX = x
      let targetY = y
      let targetPresence = 0

      if (focused && root.contains(focused)) {
        const box = focused.getBoundingClientRect()
        targetX = box.left + box.width / 2 - rect.left
        targetY = box.top + box.height / 2 - rect.top
        targetPresence = 1
      } else if (pointer.active) {
        targetX = pointer.x - rect.left
        targetY = pointer.y - rect.top
        const gap = Math.hypot(
          Math.max(0, -targetX, targetX - rect.width),
          Math.max(0, -targetY, targetY - rect.height)
        )
        targetPresence = gap === 0 ? 1 : Math.max(0, 1 - gap / proximity) ** 2
      }

      const follow = reduce ? 1 : 1 - Math.exp(-dt / 0.09)
      x += (targetX - x) * follow
      y += (targetY - y) * follow

      const fade =
        reduce || presence === targetPresence
          ? 1
          : 1 - Math.exp(-dt / (targetPresence > presence ? 0.09 : 0.28))
      presence += (targetPresence - presence) * fade

      paint()

      const settled =
        Math.abs(targetX - x) < 0.1 &&
        Math.abs(targetY - y) < 0.1 &&
        Math.abs(targetPresence - presence) < 0.002

      if (settled) {
        presence = targetPresence
        paint()
      } else {
        raf = requestAnimationFrame(tick)
      }
    }

    const wake = () => {
      if (raf || !alive) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
      wake()
    }

    const onPointerLeave = () => {
      pointer.active = false
      wake()
    }

    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) focused = event.target
      wake()
    }

    const onFocusOut = () => {
      focused = null
      wake()
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    root.addEventListener("focusin", onFocusIn)
    root.addEventListener("focusout", onFocusOut)

    return () => {
      alive = false
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      root.removeEventListener("focusin", onFocusIn)
      root.removeEventListener("focusout", onFocusOut)
    }
  }, [size, intensity, proximity, ringIntensity, palette])

  return (
    <div
      ref={rootRef}
      className={cn(
        "group/spotlight relative isolate overflow-hidden rounded-xl",
        className
      )}
      {...props}
    >
      <span
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity"
      />
      <span
        ref={ringRef}
        aria-hidden="true"
        className="via-color-3 pointer-events-none absolute inset-0 -z-10 rounded-[inherit] p-px"
        style={{
          backgroundImage:
            "linear-gradient(115deg, var(--color-1), var(--color-3), var(--color-2), var(--color-5))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          opacity: 0,
        }}
      />
      {children}
    </div>
  )
}
