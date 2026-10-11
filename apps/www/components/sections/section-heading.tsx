import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SplitLines } from "@/components/motion/split-lines"

interface SectionHeadingProps {
  /** Short mono label above the title, e.g. "01 — Library". */
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
  className?: string
  /** Optional trailing element (link, filter, etc.). */
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        action && "md:flex-row md:items-end md:justify-between md:gap-10",
        className
      )}
    >
      <div className={cn("flex flex-col gap-4", centered && "items-center")}>
        {eyebrow ? (
          <Reveal y={8} duration={0.7}>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="bg-foreground/70 size-1 rounded-full" />
              {eyebrow}
            </span>
          </Reveal>
        ) : null}

        <SplitLines
          as="h2"
          className={cn(
            "text-headline max-w-[24ch] font-semibold text-balance",
            !centered && "max-w-[28ch]"
          )}
        >
          {title}
        </SplitLines>

        {description ? (
          <Reveal delay={0.12} y={14}>
            <p
              className={cn(
                "text-lead text-muted-foreground max-w-[62ch] text-balance",
                centered && "mx-auto"
              )}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
