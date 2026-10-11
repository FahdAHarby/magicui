import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { showcaseSource } from "@/lib/source"
import { ImageReveal } from "@/components/motion/image-reveal"
import { Reveal } from "@/components/motion/reveal"
import { VelocityMarquee } from "@/components/motion/velocity-marquee"
import { SectionHeading } from "@/components/sections/section-heading"

export interface ShowcaseCardProps {
  title: string
  image: string
  href: string
  affiliation?: string
}

function isExternalHref(href: string) {
  try {
    const url = new URL(href)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function ShowcaseCard({
  title,
  image,
  href,
  affiliation,
}: ShowcaseCardProps) {
  const isExternal = isExternalHref(href)

  return (
    <figure className="group/card w-[19rem] shrink-0 sm:w-[22rem]">
      <Link
        href={href}
        prefetch={isExternal ? false : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        className="focus-ring block rounded-xl"
      >
        <ImageReveal
          className="relative"
          radius="0.75rem"
          from="10% 6%"
          duration={1.2}
        >
          <div className="bg-muted relative aspect-[16/10] w-full overflow-hidden rounded-xl">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 640px) 22rem, 19rem"
              className="object-cover transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover/card:opacity-95" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between gap-2 p-4 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/card:translate-y-0 group-hover/card:opacity-100">
              <span className="text-sm font-medium text-white">
                Visit {title}
              </span>
              <ArrowUpRight className="size-4 text-white" />
            </span>
          </div>
        </ImageReveal>

        <figcaption className="mt-4 flex items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="text-foreground block truncate text-[0.9375rem] font-medium">
              {title}
            </span>
            {affiliation ? (
              <span className="text-muted-foreground block truncate text-xs">
                {affiliation}
              </span>
            ) : null}
          </span>
          <ArrowUpRight className="text-muted-foreground group-hover/card:text-foreground mt-0.5 size-4 shrink-0 transition-all duration-300 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </figcaption>
      </Link>
    </figure>
  )
}

export function Showcase() {
  const showcases = showcaseSource.getPages()
  const featured = showcases
    .filter((showcase) => showcase.data.featured)
    .map((showcase) => ({
      href: showcase.data.href ?? showcase.url,
      title: showcase.data.title ?? "",
      affiliation: showcase.data.affiliation ?? "",
      image: showcase.data.image ?? "",
    }))

  if (featured.length === 0) return null

  const midpoint = Math.ceil(featured.length / 2)
  const rows = [featured.slice(0, midpoint), featured.slice(midpoint)]

  return (
    <section id="showcase" className="section container">
      <SectionHeading
        eyebrow="02 — Showcase"
        title="Teams shipping with Magic UI"
        description="Startups, studios and side projects that used these components to build a landing page worth remembering."
        action={
          <Reveal y={10}>
            <Link
              href="/showcase"
              className="focus-ring text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              Browse the full showcase
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        }
      />

      <div className="relative mt-12 flex flex-col gap-6">
        {rows.map((row, rowIndex) =>
          row.length === 0 ? null : (
            <VelocityMarquee
              key={rowIndex}
              speed={rowIndex === 0 ? 55 : 45}
              direction={rowIndex === 0 ? 1 : -1}
              staticClassName="flex flex-wrap items-start justify-center gap-6"
            >
              {row.map((showcase, index) => (
                <ShowcaseCard
                  key={`${showcase.title}-${index}`}
                  {...showcase}
                />
              ))}
            </VelocityMarquee>
          )
        )}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r to-transparent md:block" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l to-transparent md:block" />
      </div>
    </section>
  )
}
