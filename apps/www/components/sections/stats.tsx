import { getGithubStars, getLibraryCounts } from "@/lib/stats"
import { Counter } from "@/components/motion/counter"
import { Reveal } from "@/components/motion/reveal"

interface Stat {
  value: number | null
  display?: string
  label: string
  note?: string
  compact?: boolean
  suffix?: string
}

export async function Stats() {
  const [{ components, examples }, stars] = await Promise.all([
    getLibraryCounts(),
    getGithubStars(),
  ])

  const stats: Stat[] = [
    {
      value: components,
      suffix: "+",
      label: "Components & effects",
      note: "Animated, accessible, yours",
    },
    {
      value: stars,
      compact: true,
      label: "GitHub stars",
      note: "And a very loud Discord",
    },
    {
      value: examples,
      label: "Copy-paste demos",
      note: "Every one documented",
    },
    {
      value: null,
      display: "MIT",
      label: "License, no strings",
      note: "Free for commercial work",
    },
  ]

  return (
    <section aria-label="Magic UI by the numbers" className="container">
      <Reveal
        stagger={0.08}
        y={16}
        className="border-border/70 bg-border/60 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-background flex flex-col gap-1 px-5 py-7"
          >
            <span className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
              {stat.value === null ? (
                (stat.display ?? "")
              ) : (
                <Counter
                  value={stat.value}
                  compact={stat.compact}
                  suffix={stat.suffix}
                />
              )}
            </span>
            <span className="text-foreground text-sm font-medium">
              {stat.label}
            </span>
            {stat.note ? (
              <span className="text-muted-foreground text-xs">{stat.note}</span>
            ) : null}
          </div>
        ))}
      </Reveal>
    </section>
  )
}
