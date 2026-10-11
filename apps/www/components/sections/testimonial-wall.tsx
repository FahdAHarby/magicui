"use client"

import { Children, useState, type ReactNode } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"

const INITIAL_COUNT = 9

/**
 * Receives the tweets already rendered on the server and reveals them in
 * batches. AutoAnimate handles the reflow, so expanding the wall never jumps.
 */
export function TestimonialWall({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const [ref] = useAutoAnimate<HTMLDivElement>({
    duration: 340,
    easing: "ease-in-out",
  })

  const items = Children.toArray(children)
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT)
  const hidden = items.length - visible.length

  return (
    <>
      <Reveal y={18}>
        <div
          ref={ref}
          className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
        >
          {visible}
        </div>
      </Reveal>

      {hidden > 0 || expanded ? (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setExpanded((value) => !value)}
            className="focus-ring h-11 rounded-full px-6"
          >
            {expanded ? "Show less" : `Show ${hidden} more`}
          </Button>
        </div>
      ) : null}
    </>
  )
}
