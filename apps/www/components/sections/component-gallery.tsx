"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { ArrowUpRight, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { SpotlightCard } from "@/components/motion/spotlight-card"
import { SectionHeading } from "@/components/sections/section-heading"
import {
  AnimatedList,
  AnimatedListItem,
} from "@/registry/magicui/animated-list"
import { AnimatedShinyText } from "@/registry/magicui/animated-shiny-text"
import { AuroraText } from "@/registry/magicui/aurora-text"
import { BorderBeam } from "@/registry/magicui/border-beam"
import { DotPattern } from "@/registry/magicui/dot-pattern"
import { Marquee } from "@/registry/magicui/marquee"
import { Meteors } from "@/registry/magicui/meteors"
import { NumberTicker } from "@/registry/magicui/number-ticker"
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles"
import { Ripple } from "@/registry/magicui/ripple"
import { ShimmerButton } from "@/registry/magicui/shimmer-button"
import { ShineBorder } from "@/registry/magicui/shine-border"
import { WordRotate } from "@/registry/magicui/word-rotate"

const CATEGORIES = [
  "All",
  "Text",
  "Surfaces",
  "Layout",
  "Backgrounds",
  "Interactive",
] as const

type Category = (typeof CATEGORIES)[number]

interface GalleryItem {
  name: string
  slug: string
  category: Exclude<Category, "All">
  blurb: string
  demo: ReactNode
}

const ITEMS: GalleryItem[] = [
  {
    name: "Border Beam",
    slug: "border-beam",
    category: "Surfaces",
    blurb: "A light that orbits any card",
    demo: (
      <div className="border-border bg-card relative flex h-24 w-48 items-center justify-center overflow-hidden rounded-xl border text-sm font-medium">
        border-beam
        <BorderBeam
          size={40}
          duration={6}
          colorFrom="var(--color-2)"
          colorTo="var(--color-3)"
        />
      </div>
    ),
  },
  {
    name: "Marquee",
    slug: "marquee",
    category: "Layout",
    blurb: "Infinite, seamless scrolling rows",
    demo: (
      <Marquee className="w-56 [--duration:14s]" pauseOnHover={false}>
        {["ship it", "animate", "repeat", "smooth"].map((word) => (
          <span
            key={word}
            className="text-muted-foreground border-border/70 mx-1 rounded-full border px-3 py-1 text-xs"
          >
            {word}
          </span>
        ))}
      </Marquee>
    ),
  },
  {
    name: "Aurora Text",
    slug: "aurora-text",
    category: "Text",
    blurb: "Gradients that keep drifting",
    demo: (
      <AuroraText className="text-4xl font-semibold" speed={0.6}>
        Aurora
      </AuroraText>
    ),
  },
  {
    name: "Ripple",
    slug: "ripple",
    category: "Backgrounds",
    blurb: "Concentric calm behind content",
    demo: (
      <div className="relative flex h-36 w-56 items-center justify-center overflow-hidden">
        <Ripple mainCircleSize={70} numCircles={7} />
        <span className="relative text-sm font-medium">ripple</span>
      </div>
    ),
  },
  {
    name: "Number Ticker",
    slug: "number-ticker",
    category: "Interactive",
    blurb: "Counts up when it lands",
    demo: (
      <div className="flex items-baseline gap-1 text-5xl font-semibold">
        <NumberTicker value={150} className="text-foreground" />
        <span className="text-muted-foreground">+</span>
      </div>
    ),
  },
  {
    name: "Animated List",
    slug: "animated-list",
    category: "Layout",
    blurb: "Stacks that grow politely",
    demo: (
      <AnimatedList className="w-56" delay={1400}>
        {[
          "border-beam installed",
          "marquee installed",
          "aurora-text installed",
        ].map((item) => (
          <AnimatedListItem key={item}>
            <div className="border-border bg-card rounded-lg border px-3 py-2 text-xs">
              {item}
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    ),
  },
  {
    name: "Animated Shiny Text",
    slug: "animated-shiny-text",
    category: "Text",
    blurb: "A highlight that sweeps through",
    demo: (
      <AnimatedShinyText className="text-base font-medium">
        Introducing Magic UI ✨
      </AnimatedShinyText>
    ),
  },
  {
    name: "Word Rotate",
    slug: "word-rotate",
    category: "Text",
    blurb: "Swap words without a jump",
    demo: (
      <div className="flex items-baseline gap-2 text-2xl font-medium">
        <span className="text-muted-foreground">Ship</span>
        <WordRotate words={["faster", "smoother", "bolder"]} />
      </div>
    ),
  },
  {
    name: "Shine Border",
    slug: "shine-border",
    category: "Surfaces",
    blurb: "A travelling highlight edge",
    demo: (
      <div className="border-border bg-card relative flex h-24 w-48 items-center justify-center overflow-hidden rounded-xl border text-sm font-medium">
        shine-border
        <ShineBorder
          className="rounded-xl"
          duration={9}
          shineColor={["var(--color-1)", "var(--color-3)", "var(--color-5)"]}
        />
      </div>
    ),
  },
  {
    name: "Dot Pattern",
    slug: "dot-pattern",
    category: "Surfaces",
    blurb: "Structured, never noisy",
    demo: (
      <div className="relative flex h-28 w-56 items-center justify-center overflow-hidden rounded-xl">
        <DotPattern
          className="text-foreground/25 [mask-image:radial-gradient(120px_at_center,white,transparent)]"
          width={14}
          height={14}
          glow
        />
        <span className="relative text-sm font-medium">dot-pattern</span>
      </div>
    ),
  },
  {
    name: "Meteors",
    slug: "meteors",
    category: "Backgrounds",
    blurb: "A quiet starfield",
    demo: (
      <div className="bg-muted/40 relative flex h-28 w-56 items-center justify-center overflow-hidden rounded-xl">
        <Meteors number={10} />
        <span className="relative text-sm font-medium">meteors</span>
      </div>
    ),
  },
  {
    name: "Shimmer Button",
    slug: "shimmer-button",
    category: "Interactive",
    blurb: "A highlight that orbits the label",
    demo: (
      <ShimmerButton className="shadow-2xl">
        <span className="text-sm font-medium">Get started</span>
      </ShimmerButton>
    ),
  },
  {
    name: "Orbiting Circles",
    slug: "orbiting-circles",
    category: "Layout",
    blurb: "Logos on a slow orbit",
    demo: (
      <div className="relative flex h-32 w-32 items-center justify-center">
        <OrbitingCircles radius={48} iconSize={22} duration={18} speed={0.8}>
          <span className="bg-foreground size-2 rounded-full" />
          <span className="bg-foreground size-2 rounded-full" />
        </OrbitingCircles>
        <OrbitingCircles
          radius={26}
          iconSize={16}
          duration={14}
          reverse
          speed={0.8}
        >
          <span className="bg-foreground size-1.5 rounded-full" />
          <span className="bg-foreground size-1.5 rounded-full" />
        </OrbitingCircles>
        <span className="absolute text-xs font-medium">orbit</span>
      </div>
    ),
  },
]

const VISIBLE_STEP = 6

export function ComponentGallery() {
  const [category, setCategory] = useState<Category>("All")
  const [expanded, setExpanded] = useState(false)
  const [gridRef] = useAutoAnimate<HTMLDivElement>({
    duration: 320,
    easing: "ease-in-out",
  })

  const filtered = useMemo(
    () =>
      category === "All"
        ? ITEMS
        : ITEMS.filter((item) => item.category === category),
    [category]
  )

  const visible = expanded ? filtered : filtered.slice(0, VISIBLE_STEP)
  const hiddenCount = filtered.length - visible.length

  const countFor = (value: Category) =>
    value === "All"
      ? ITEMS.length
      : ITEMS.filter((item) => item.category === value).length

  return (
    <section id="components" className="section container">
      <SectionHeading
        eyebrow="01 — The library"
        title="A hundred and fifty ways to make it move"
        description="Drop-in React components built with Tailwind CSS and Motion. Copy the source, own the code, ship the feeling."
      />

      <Reveal y={12} className="mt-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((value) => {
          const active = category === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              aria-pressed={active}
              className={cn(
                "focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                active
                  ? "bg-foreground text-background border-transparent"
                  : "text-muted-foreground border-border/70 hover:border-border hover:text-foreground"
              )}
            >
              {value}
              <span className="ml-1.5 text-xs opacity-60">
                {countFor(value)}
              </span>
            </button>
          )
        })}
      </Reveal>

      <div
        ref={gridRef}
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((item, index) => (
          <Reveal
            key={item.slug}
            y={16}
            delay={(index % 3) * 0.06}
            className="h-full"
          >
            <SpotlightCard className="group border-border/70 bg-card h-full rounded-xl border transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1">
              <div className="border-border/60 bg-muted/20 relative flex h-40 items-center justify-center overflow-hidden rounded-t-xl border-b">
                <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(70%_60%_at_50%_45%,#000,transparent)] [background-size:14px_14px] opacity-60" />
                <div
                  className="pointer-events-none relative"
                  aria-hidden="true"
                  inert
                >
                  {item.demo}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium">{item.name}</h3>
                  <p className="text-muted-foreground truncate text-xs">
                    {item.blurb}
                  </p>
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <Link
                href={`/docs/components/${item.slug}`}
                className="focus-ring absolute inset-0 rounded-xl"
                aria-label={`${item.name} documentation`}
              />
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {hiddenCount > 0 || expanded ? (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setExpanded((value) => !value)}
            className="focus-ring h-11 gap-2 rounded-full px-6"
          >
            <Plus
              className={cn(
                "size-4 transition-transform duration-500",
                expanded && "rotate-45"
              )}
            />
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
