"use client"

import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface HeroBackdropProps {
  className?: string
}

/**
 * Layered hero background.
 *
 * Everything here is CSS: a trio of radial washes for the base glow, two
 * slowly drifting blurred orbs for depth, a film-grain overlay and a fade into
 * the page colour at the bottom edge. No canvas, no WebGL, no per-frame work —
 * the orbs animate on the compositor only, so the hero stays cheap on mobile,
 * and the whole layer stops when reduced motion is requested.
 */
export function HeroBackdrop({ className }: HeroBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,var(--hero-glow-a),transparent_60%),radial-gradient(80%_60%_at_85%_10%,var(--hero-glow-b),transparent_65%),radial-gradient(70%_60%_at_10%_20%,var(--hero-glow-c),transparent_70%)] dark:bg-[radial-gradient(120%_90%_at_50%_-10%,var(--hero-glow-a),transparent_60%),radial-gradient(80%_60%_at_85%_10%,var(--hero-glow-b),transparent_65%),radial-gradient(70%_60%_at_10%_20%,var(--hero-glow-c),transparent_70%)]" />

      <div
        className="animate-drift absolute inset-x-0 -top-24 mx-auto h-[42rem] w-[42rem] rounded-full opacity-70 blur-[120px] will-change-transform"
        style={
          {
            "--drift-duration": "28s",
            background:
              "radial-gradient(circle at 50% 50%, var(--hero-glow-b), transparent 70%)",
          } as CSSProperties
        }
      />
      <div
        className="animate-drift absolute right-[-10%] -bottom-40 h-[34rem] w-[34rem] rounded-full opacity-60 blur-[120px] will-change-transform"
        style={
          {
            "--drift-duration": "34s",
            background:
              "radial-gradient(circle at 50% 50%, var(--hero-glow-c), transparent 70%)",
          } as CSSProperties
        }
      />

      {/* Hairline rules framing the hero copy — an editorial touch. */}
      <div className="absolute inset-0 hidden md:block">
        <div className="relative container h-full">
          <span className="border-border/60 absolute inset-y-0 left-0 border-l" />
          <span className="border-border/60 absolute inset-y-0 right-0 border-r" />
        </div>
      </div>

      <div className="grain absolute inset-0" />
      <div className="from-background via-background/70 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
    </div>
  )
}
