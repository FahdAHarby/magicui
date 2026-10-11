"use client"

import { useRef, type ElementType, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  DURATION,
  EASE,
  gsap,
  SplitText,
  useGSAP,
} from "@/components/motion/gsap"
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion"

interface SplitLinesProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  /** `load` fires on mount (hero), `scroll` waits for the element. */
  trigger?: "load" | "scroll"
}

const FONT_TIMEOUT = 800

/**
 * Line-by-line text reveal built on GSAP SplitText with line masks.
 * Text is hidden until the split runs (which waits for fonts so lines break in
 * the right places), then each line slides up from behind its mask.
 */
export function SplitLines({
  children,
  as,
  className,
  delay = 0,
  duration = DURATION.hero,
  stagger = 0.09,
  trigger = "scroll",
}: SplitLinesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const Component = (as ?? "div") as unknown as "div"

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      let cancelled = false
      let split: SplitText | null = null

      const build = () => {
        if (cancelled || !ref.current) return

        gsap.set(element, { opacity: 1 })

        if (reduced) return

        split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          aria: "auto",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              opacity: 0,
              duration,
              delay,
              stagger,
              ease: EASE.out,
              scrollTrigger:
                trigger === "scroll"
                  ? { trigger: element, start: "top 85%", once: true }
                  : undefined,
            }),
        })
      }

      // Lines depend on the final font metrics, so wait for it (but never hang).
      const fontsReady =
        typeof document !== "undefined" && document.fonts
          ? document.fonts.ready
          : Promise.resolve()

      Promise.race([
        fontsReady,
        new Promise((resolve) => {
          setTimeout(resolve, FONT_TIMEOUT)
        }),
      ]).then(build)

      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { dependencies: [reduced, delay, duration, stagger, trigger] }
  )

  return (
    <Component
      ref={ref}
      data-split=""
      className={cn(className)}
      style={{ opacity: 0 } as React.CSSProperties}
    >
      {children}
    </Component>
  )
}
