"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { BrassStar, focusRing, Kicker, Wordmark } from "./brand"
import { CONTACT, HOURS, NAV_LINKS } from "./calypso-data"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState("top")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = ["top", ...NAV_LINKS.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.01, 0.4] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const onDark = !scrolled

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-out",
        scrolled
          ? "border-calypso-ink/10 bg-calypso-shell/90 text-calypso-ink border-b backdrop-blur-md"
          : "text-calypso-shell border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Calypso Café and Restaurant — back to top"
          className={cn(
            "rounded-full transition-opacity duration-200 ease-out hover:opacity-80",
            focusRing,
            onDark
              ? "focus-visible:ring-calypso-shell focus-visible:ring-offset-calypso-ink"
              : ""
          )}
        >
          <Wordmark tone={onDark ? "shell" : "ink"} />
        </a>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative py-1 text-[13px] font-medium tracking-[0.02em] transition-colors duration-200 ease-out",
                  onDark
                    ? "text-calypso-shell/80 hover:text-calypso-shell"
                    : "text-calypso-ink/70 hover:text-calypso-ink",
                  focusRing,
                  onDark &&
                    "focus-visible:ring-calypso-shell focus-visible:ring-offset-calypso-ink"
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-300 ease-out",
                    onDark ? "bg-calypso-brass" : "bg-calypso-clay",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex xl:gap-5">
          <a
            href={CONTACT.phoneHref}
            className={cn(
              "hidden items-center gap-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ease-out xl:flex",
              onDark
                ? "text-calypso-shell/80 hover:text-calypso-shell"
                : "text-calypso-ink/70 hover:text-calypso-ink",
              focusRing,
              onDark &&
                "focus-visible:ring-calypso-shell focus-visible:ring-offset-calypso-ink"
            )}
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href="#reserve"
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide text-white transition-colors duration-200 ease-out",
              "bg-calypso-clay hover:bg-calypso-clay/90",
              "focus-visible:ring-calypso-clay focus-visible:ring-offset-calypso-shell focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            )}
          >
            Reserve a table
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-200 ease-out lg:hidden",
              onDark
                ? "border-calypso-shell/30 text-calypso-shell hover:bg-calypso-shell/10"
                : "border-calypso-ink/15 text-calypso-ink hover:bg-calypso-ink/5",
              focusRing
            )}
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="calypso-theme border-calypso-shell/10 bg-calypso-ink text-calypso-shell w-full max-w-sm gap-0 p-0"
          >
            <SheetHeader className="border-calypso-shell/10 border-b px-6 py-6 text-left">
              <SheetTitle className="sr-only">Calypso navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the Calypso Café and Restaurant website.
              </SheetDescription>
              <Wordmark tone="shell" />
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link, index) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="group border-calypso-shell/10 hover:text-calypso-brass focus-visible:text-calypso-brass flex items-baseline justify-between border-b py-4 transition-colors duration-200 ease-out focus-visible:outline-none"
                  >
                    <span className="font-serif text-3xl tracking-tight">
                      {link.label}
                    </span>
                    <span className="text-calypso-sand/60 font-mono text-[10px] tracking-[0.3em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto space-y-5 px-6 pb-8">
              <Kicker tone="shell">
                <BrassStar className="size-2" /> Open today
              </Kicker>
              <dl className="space-y-2 text-sm">
                {HOURS.slice(0, 2).map((entry) => (
                  <div
                    key={entry.day}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-calypso-sand/70">{entry.day}</dt>
                    <dd className="text-calypso-shell font-mono text-xs">
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <a
                    href="#reserve"
                    className="bg-calypso-clay hover:bg-calypso-clay/90 focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Reserve a table
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </SheetClose>
                <a
                  href={CONTACT.phoneHref}
                  className="border-calypso-shell/25 hover:bg-calypso-shell/10 focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
