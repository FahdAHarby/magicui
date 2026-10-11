"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"
import { gsap, useGSAP } from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface CounterProps {
  value: number
  className?: string
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  delay?: number
  /** 22,598 → 22.6K */
  compact?: boolean
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  className,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  delay = 0,
  compact = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const format = (next: number) =>
        `${prefix}${Intl.NumberFormat("en-US", {
          notation: compact ? "compact" : "standard",
          minimumFractionDigits: compact ? 0 : decimals,
          maximumFractionDigits: compact ? 1 : decimals,
        }).format(next)}${suffix}`

      if (reduced) {
        element.textContent = format(value)
        return
      }

      const counter = { current: 0 }

      gsap.to(counter, {
        current: value,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = format(counter.current)
        },
        scrollTrigger: {
          trigger: element,
          start: "top 92%",
          once: true,
        },
      })
    },
    {
      dependencies: [
        value,
        duration,
        decimals,
        prefix,
        suffix,
        delay,
        compact,
        reduced,
      ],
    }
  )

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {`${prefix}${Intl.NumberFormat("en-US", {
        notation: compact ? "compact" : "standard",
        minimumFractionDigits: compact ? 0 : decimals,
        maximumFractionDigits: compact ? 1 : decimals,
      }).format(value)}${suffix}`}
    </span>
  )
}
