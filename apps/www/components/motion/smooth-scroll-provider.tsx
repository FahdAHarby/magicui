"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

import { gsap, ScrollTrigger } from "@/components/motion/gsap"
import { prefersReducedMotion } from "@/components/motion/use-reduced-motion"

type ScrollTarget = string | number | HTMLElement

interface ScrollToOptions {
  offset?: number
  immediate?: boolean
  duration?: number
}

type ScrollListener = (lenis: Lenis) => void

interface SmoothScrollApi {
  scrollTo: (target: ScrollTarget, options?: ScrollToOptions) => void
  setLocked: (locked: boolean) => void
  subscribe: (listener: ScrollListener) => () => void
}

const noopApi: SmoothScrollApi = {
  scrollTo: () => {},
  setLocked: () => {},
  subscribe: () => () => {},
}

const SmoothScrollContext = createContext<SmoothScrollApi>(noopApi)

const HEADER_OFFSET = 24

function headerOffset() {
  const header = document.querySelector("header")
  return (header?.getBoundingClientRect().height ?? 64) + HEADER_OFFSET
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const listenersRef = useRef(new Set<ScrollListener>())
  const lockCountRef = useRef(0)

  const subscribe = useCallback((listener: ScrollListener) => {
    listenersRef.current.add(listener)
    return () => {
      listenersRef.current.delete(listener)
    }
  }, [])

  const setLocked = useCallback((locked: boolean) => {
    lockCountRef.current = Math.max(0, lockCountRef.current + (locked ? 1 : -1))
    const isLocked = lockCountRef.current > 0
    const lenis = lenisRef.current

    if (lenis) {
      if (isLocked) lenis.stop()
      else lenis.start()
      return
    }

    // Reduced motion / no smooth scroll: fall back to a body lock.
    document.body.style.overflow = isLocked ? "hidden" : ""
  }, [])

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: ScrollToOptions) => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          immediate: options?.immediate ?? false,
          duration: options?.duration,
        })
        return
      }

      const node =
        typeof target === "string" ? document.querySelector(target) : target
      if (typeof node === "number") {
        window.scrollTo({ top: node, behavior: "smooth" })
        return
      }
      if (node instanceof HTMLElement) {
        const top =
          node.getBoundingClientRect().top +
          window.scrollY +
          (options?.offset ?? 0)
        window.scrollTo({ top, behavior: "smooth" })
      }
    },
    []
  )

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: "vertical",
      autoRaf: false,
      anchors: false,
    })

    lenisRef.current = lenis

    const onScroll = () => {
      ScrollTrigger.update()
      for (const listener of listenersRef.current) listener(lenis)
    }

    lenis.on("scroll", onScroll)

    // One shared rAF loop: GSAP drives Lenis so scroll linked animations and
    // smooth scrolling always stay on the same frame.
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => lenis.resize()
    window.addEventListener("load", refresh)
    ScrollTrigger.addEventListener("refresh", refresh)

    // In-page anchors scroll through Lenis so they inherit the same easing.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href?.startsWith("#") || href === "#") return

      let target: Element | null = null
      try {
        target = document.querySelector(href)
      } catch {
        return
      }
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -headerOffset() })
      history.replaceState(null, "", href)
    }

    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("load", refresh)
      ScrollTrigger.removeEventListener("refresh", refresh)
      gsap.ticker.remove(raf)
      lenis.off("scroll", onScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // New routes start at the top, and Lenis needs to re-measure the document.
  // The first run is skipped so a reload keeps the browser's scroll position.
  const isFirstRoute = useRef(true)

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (isFirstRoute.current) {
      isFirstRoute.current = false
      return
    }

    lenis.resize()
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
  }, [pathname])

  const api = useMemo<SmoothScrollApi>(
    () => ({ scrollTo, setLocked, subscribe }),
    [scrollTo, setLocked, subscribe]
  )

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

/** Frees the page while dialogs, sheets and menus are open. */
export function useScrollLock(locked: boolean) {
  const { setLocked } = useSmoothScroll()

  useEffect(() => {
    if (!locked) return
    setLocked(true)
    return () => setLocked(false)
  }, [locked, setLocked])
}
