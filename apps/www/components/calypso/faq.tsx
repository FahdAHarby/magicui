"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

import { FAQ } from "./calypso-data"

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-calypso-ink/10 border-calypso-ink/10 divide-y border-y">
      {FAQ.map((item, index) => {
        const open = openIndex === index
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group hover:text-calypso-clay focus-visible:ring-calypso-clay/40 flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
              >
                <span className="text-calypso-ink group-hover:text-calypso-clay font-serif text-xl leading-snug transition-colors duration-200 ease-out sm:text-[22px]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out",
                    open
                      ? "border-calypso-clay bg-calypso-clay rotate-45 text-white"
                      : "border-calypso-ink/20 text-calypso-ink/60 group-hover:border-calypso-clay/50"
                  )}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              aria-hidden={!open}
              inert={!open}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-calypso-mist max-w-2xl pb-6 text-[15px] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
