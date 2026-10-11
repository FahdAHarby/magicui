"use client"

import { useEffect, useState } from "react"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CommandMenu } from "@/components/command-menu"
import { DiscordLink } from "@/components/discord-link"
import { GitHubLink } from "@/components/github-link"
import { LogoButton } from "@/components/logo-button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"

type HeaderState = "top" | "visible" | "hidden"

const HIDE_AFTER = 220

export function SiteHeader({
  autoHide = false,
  transparentAtTop = false,
}: {
  /** Tuck the header away while scrolling down. */
  autoHide?: boolean
  /** Sit on the hero artwork until the page scrolls. */
  transparentAtTop?: boolean
}) {
  const [state, setState] = useState<HeaderState>("top")

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY

      if (y <= 8) {
        setState("top")
      } else if (autoHide && y > lastY && y > HIDE_AFTER) {
        setState("hidden")
      } else {
        setState("visible")
      }

      lastY = y
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [autoHide])

  return (
    <header
      onFocus={() => {
        if (state === "hidden") setState("visible")
      }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]",
        state === "top" && transparentAtTop
          ? "border-transparent bg-transparent"
          : "border-border/60 bg-background/70 backdrop-blur-xl",
        state === "hidden" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav className="flex lg:hidden" />
          <LogoButton />
          <MainNav items={docsConfig.mainNav} className="hidden lg:flex" />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
              <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                <CommandMenu />
              </div>
              <Separator
                orientation="vertical"
                className="ml-2 hidden lg:block"
              />
              <GitHubLink />
              <Separator orientation="vertical" className="3xl:flex hidden" />
              <DiscordLink />
              <Separator orientation="vertical" />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
