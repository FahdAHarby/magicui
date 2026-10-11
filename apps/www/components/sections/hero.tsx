import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"

import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeroBackdrop } from "@/components/motion/hero-backdrop"
import { Magnetic } from "@/components/motion/magnetic"
import { Reveal } from "@/components/motion/reveal"
import { ScrollFade } from "@/components/motion/scroll-fade"
import { SplitLines } from "@/components/motion/split-lines"
import { TechStack } from "@/components/tech-stack"

export function Hero() {
  const pages = source.getPages() as Array<{
    data?: { title?: string; date?: string }
    url?: string
  }>
  const page = pages.sort((a, b) => {
    const dateA = a?.data?.date
    const dateB = b?.data?.date
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })[0]
  const pageTitle = page?.data?.title

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <div className="relative container">
        <ScrollFade className="mx-auto flex min-h-[calc(100svh-11rem)] max-w-4xl flex-col items-center justify-center gap-8 py-16 text-center md:gap-10 md:py-20">
          <Reveal y={8} duration={0.7}>
            <Link
              href={page?.url ?? "/blog"}
              className="group hover:border-foreground/25 focus-ring border-border/70 bg-background/60 inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 backdrop-blur-sm transition-colors duration-300"
            >
              <span className="bg-foreground text-background rounded-full px-2.5 py-1 font-mono text-[0.625rem] font-medium tracking-[0.14em] uppercase">
                New
              </span>
              <span className="text-muted-foreground group-hover:text-foreground truncate text-[0.8125rem] font-medium transition-colors duration-300">
                Introducing {pageTitle}
              </span>
              <ChevronRight className="text-muted-foreground size-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <SplitLines
            as="h1"
            trigger="load"
            delay={0.15}
            duration={1.2}
            stagger={0.11}
            className="hero-title text-display max-w-[20ch] font-semibold text-balance"
          >
            UI library for Design Engineers
          </SplitLines>

          <Reveal delay={0.55} y={16}>
            <p className="text-lead text-muted-foreground max-w-[54ch] text-balance">
              150+ free and open-source animated components and effects built
              with <b className="text-foreground font-[550]">React</b>,{" "}
              <b className="text-foreground font-[550]">Typescript</b>,{" "}
              <b className="text-foreground font-[550]">Tailwind CSS</b>, and{" "}
              <b className="text-foreground font-[550]">Motion</b>.
              <br className="hidden sm:block" /> Perfect companion for{" "}
              <b className="text-foreground font-[550]">shadcn/ui</b>.
            </p>
          </Reveal>

          <Reveal
            delay={0.68}
            y={16}
            stagger={0.09}
            className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.16}>
              <Link
                href="/components"
                className={cn(
                  buttonVariants({ variant: "rainbow", size: "lg" }),
                  "group h-12 w-full rounded-xl px-7 text-[0.9375rem] sm:w-auto"
                )}
              >
                Browse Components
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.12}>
              <Link
                href="https://pro.magicui.design"
                className={cn(
                  buttonVariants({ variant: "rainbow-outline", size: "lg" }),
                  "group h-12 w-full rounded-xl px-7 text-[0.9375rem] sm:w-auto"
                )}
              >
                Browse Templates
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </Reveal>

          <Reveal
            delay={0.82}
            y={12}
            className="mt-4 flex flex-col items-center gap-4"
          >
            <span className="eyebrow">Built with</span>
            <TechStack
              className="text-muted-foreground items-center gap-6 [&_svg]:size-6"
              technologies={[
                "react",
                "typescript",
                "tailwindcss",
                "motion",
                "shadcn",
              ]}
            />
          </Reveal>
        </ScrollFade>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center md:flex">
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow">Scroll</span>
          <span className="bg-border relative block h-12 w-px overflow-hidden">
            <span className="scroll-cue bg-foreground/60 absolute inset-x-0 top-0 block h-1/3" />
          </span>
        </div>
      </div>
    </section>
  )
}
