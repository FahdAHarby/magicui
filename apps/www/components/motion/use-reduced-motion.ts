"use client"

import { useEffect, useState } from "react"

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

/** Non-reactive check, safe to call inside animation setup code. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/**
 * Tracks the user's motion preference. Starts as `false` so server and client
 * markup match, then corrects itself on the first client effect.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY)
    setReduced(query.matches)

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}
