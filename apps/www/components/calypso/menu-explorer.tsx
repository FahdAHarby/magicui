"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Flame, Leaf } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { BrassStar, focusRing } from "./brand"
import { MENU_CATEGORIES, type MenuCategoryId } from "./calypso-data"

const TAG_STYLES: Record<string, string> = {
  signature: "border-calypso-brass/60 text-[#7A5A22]",
  vegetarian: "border-calypso-mist/40 text-calypso-mist",
  vegan: "border-calypso-mist/40 text-calypso-mist",
  spicy: "border-calypso-clay/40 text-calypso-clay",
  seasonal: "border-calypso-brass/40 text-[#7A5A22]",
}

export function MenuExplorer() {
  const [activeId, setActiveId] = useState<MenuCategoryId>("mezze")
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeIndex = MENU_CATEGORIES.findIndex(
    (category) => category.id === activeId
  )
  const active = MENU_CATEGORIES[activeIndex] ?? MENU_CATEGORIES[0]

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return
    }
    event.preventDefault()
    const offset = event.key === "ArrowRight" ? 1 : -1
    const next =
      (index + offset + MENU_CATEGORIES.length) % MENU_CATEGORIES.length
    setActiveId(MENU_CATEGORIES[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="mt-12">
      <div className="-mx-6 [scrollbar-width:none] overflow-x-auto px-6 pb-1 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Menu categories"
          className="border-calypso-ink/10 flex w-max min-w-full gap-2 border-b sm:w-full"
        >
          {MENU_CATEGORIES.map((category, index) => {
            const selected = category.id === active.id
            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`menu-tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`menu-panel-${category.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(category.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "relative shrink-0 px-1 pt-2 pb-4 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 ease-out sm:px-4",
                  selected
                    ? "text-calypso-ink"
                    : "text-calypso-mist hover:text-calypso-ink",
                  focusRing
                )}
              >
                {category.label}
                {selected && (
                  <motion.span
                    layoutId="menu-tab-indicator"
                    aria-hidden="true"
                    className="bg-calypso-clay absolute inset-x-0 -bottom-px h-0.5"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`menu-panel-${active.id}`}
        aria-labelledby={`menu-tab-${active.id}`}
        className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14"
      >
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              key={`${active.id}-image`}
              initial={{ opacity: 0.4, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-sm"
            >
              <Image
                src={active.image}
                alt={active.imageAlt}
                width={1408}
                height={768}
                sizes="(min-width: 1024px) 40vw, 100vw"
                loading="lazy"
                className="aspect-[5/4] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="from-calypso-ink/75 via-calypso-ink/10 absolute inset-0 bg-gradient-to-t to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <p className="text-calypso-shell font-serif text-2xl">
                  {active.label}
                </p>
                <p className="text-calypso-sand/80 font-mono text-[10px] tracking-[0.28em] uppercase">
                  {String(activeIndex + 1).padStart(2, "0")} / 04
                </p>
              </div>
            </motion.div>

            <motion.div
              key={`${active.id}-copy`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              className="mt-6"
            >
              <p className="text-calypso-clay font-mono text-[10px] tracking-[0.3em] uppercase">
                {active.kicker}
              </p>
              <h3 className="text-calypso-ink mt-3 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
                {active.headline}
              </h3>
              <p className="text-calypso-mist mt-4 max-w-md text-[15px] leading-relaxed">
                {active.blurb}
              </p>
              <p className="border-calypso-ink/10 text-calypso-ink/75 mt-6 flex items-start gap-3 border-t pt-5 text-[13px] leading-relaxed">
                <BrassStar className="mt-1 size-2.5 shrink-0" />
                {active.note}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.ul
            key={`${active.id}-items`}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.045 } },
            }}
            className="divide-calypso-ink/10 border-calypso-ink/10 divide-y border-t"
          >
            {active.items.map((item) => (
              <motion.li
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group grid grid-cols-[1fr_auto] items-start gap-x-5 py-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="text-calypso-ink font-serif text-[22px] leading-snug">
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] uppercase",
                          TAG_STYLES[item.tag]
                        )}
                      >
                        {item.tag === "signature" && (
                          <BrassStar className="size-2" />
                        )}
                        {item.tag === "spicy" && (
                          <Flame className="size-2.5" aria-hidden="true" />
                        )}
                        {(item.tag === "vegan" ||
                          item.tag === "vegetarian") && (
                          <Leaf className="size-2.5" aria-hidden="true" />
                        )}
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-calypso-mist mt-1.5 max-w-lg text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <p className="text-calypso-ink pt-1.5 font-mono text-sm tabular-nums">
                  {item.price}
                  <span className="text-calypso-mist ml-1 text-[10px] tracking-wider">
                    EGP
                  </span>
                </p>
              </motion.li>
            ))}
          </motion.ul>

          <div className="bg-calypso-sand/45 mt-8 flex flex-col gap-4 rounded-sm p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-calypso-ink/75 text-[13px] leading-relaxed">
              All prices in Egyptian pounds, service included. Tell us about
              allergies and the kitchen will guide you.
            </p>
            <a
              href="#reserve"
              className={cn(
                "group border-calypso-ink/20 text-calypso-ink hover:bg-calypso-ink hover:text-calypso-shell inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors duration-200 ease-out",
                focusRing
              )}
            >
              Reserve a table
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
