import Link from "next/link"
import { ArrowRight, HeartHandshake } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { SplitLines } from "@/components/motion/split-lines"

export function CTASection() {
  return (
    <section id="cta" className="section container">
      <Reveal y={26} duration={1}>
        <div className="border-border/70 relative isolate overflow-hidden rounded-3xl border px-6 py-20 sm:px-12 md:py-24">
          <Parallax className="absolute inset-0 -z-10" distance={-70} scrub={1}>
            <div className="absolute -inset-y-16 bg-[radial-gradient(120%_120%_at_50%_0%,var(--hero-glow-a),transparent_60%),radial-gradient(80%_90%_at_85%_100%,var(--hero-glow-b),transparent_60%)]" />
          </Parallax>
          <div className="grain absolute inset-0 -z-10" />

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <div className="border-border/70 bg-background/60 flex size-12 items-center justify-center rounded-2xl border backdrop-blur-sm">
              <HeartHandshake className="size-5" />
            </div>

            <SplitLines
              as="h2"
              className="text-headline max-w-[22ch] font-semibold text-balance"
            >
              Looking for templates instead?
            </SplitLines>

            <Reveal delay={0.14} y={14}>
              <p className="text-lead text-muted-foreground max-w-[46ch] text-balance">
                Magic UI Pro ships 50+ blocks and complete landing page
                templates — the same components, already art directed.
              </p>
            </Reveal>

            <Reveal delay={0.24} y={14}>
              <Magnetic strength={0.14}>
                <Link
                  href="https://pro.magicui.design/"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "rainbow" }),
                    "group mt-2 h-12 rounded-xl px-7 text-[0.9375rem]"
                  )}
                >
                  Get Magic UI Pro
                  <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
