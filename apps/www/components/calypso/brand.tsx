import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calypso-clay focus-visible:ring-offset-2 focus-visible:ring-offset-calypso-shell"

export function CalypsoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("size-9", className)}
    >
      <path
        d="M10 46V27a22 22 0 0 1 44 0v19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="26" r="6.5" className="fill-calypso-brass" />
      <path
        d="M6 51c4 0 5.5-2.6 9.5-2.6S21 51 25 51s5.5-2.6 9.5-2.6S40 51 44 51s5.5-2.6 9.5-2.6S59 51 63 51"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M6 58c4 0 5.5-2.6 9.5-2.6S21 58 25 58s5.5-2.6 9.5-2.6S40 58 44 58s5.5-2.6 9.5-2.6S59 58 63 58"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string
  tone?: "ink" | "shell"
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <CalypsoMark
        className={cn(
          "size-8 sm:size-9",
          tone === "shell" && "text-calypso-shell"
        )}
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-medium tracking-[0.32em] uppercase">
          Calypso
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[9px] tracking-[0.28em] uppercase",
            tone === "ink" ? "text-calypso-mist" : "text-calypso-sand/70"
          )}
        >
          Café · Cairo
        </span>
      </span>
    </span>
  )
}

export function Kicker({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode
  className?: string
  tone?: "ink" | "shell"
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[10px] tracking-[0.34em] uppercase",
        tone === "ink" ? "text-calypso-clay" : "text-calypso-brass",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "ink" ? "bg-calypso-clay/50" : "bg-calypso-brass/60"
        )}
      />
      {children}
    </p>
  )
}

export function SectionRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-calypso-ink/10 h-px w-full", className)}
    />
  )
}

/** Four-point brass star used as a small decorative separator. */
export function BrassStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("text-calypso-brass size-3", className)}
    >
      <path
        d="M12 0c.9 6.3 4.8 10.2 12 12-7.2 1.8-11.1 5.7-12 12-.9-6.3-4.8-10.2-12-12C7.2 10.2 11.1 6.3 12 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
