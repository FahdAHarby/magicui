"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Phone } from "lucide-react"
import { motion, useScroll, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

import { focusRing } from "./brand"
import { CONTACT } from "./calypso-data"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-calypso-clay fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
    />
  )
}

export function MobileReserveBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "border-calypso-ink/10 bg-calypso-shell/95 fixed inset-x-0 bottom-0 z-40 border-t px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
    >
      <div className="flex items-center gap-3">
        <a
          href={CONTACT.phoneHref}
          className={cn(
            "border-calypso-ink/20 text-calypso-ink hover:bg-calypso-ink/5 inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ease-out",
            focusRing
          )}
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="sr-only">Call {CONTACT.phoneDisplay}</span>
        </a>
        <a
          href="#reserve"
          className={cn(
            "bg-calypso-clay hover:bg-calypso-clay/90 inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-out",
            focusRing
          )}
        >
          Reserve a table
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "border-calypso-ink/20 text-calypso-ink hover:bg-calypso-ink/5 hidden h-11 shrink-0 items-center justify-center rounded-full border px-4 text-[13px] font-medium transition-colors duration-200 ease-out sm:inline-flex",
            focusRing
          )}
        >
          WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
