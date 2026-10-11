"use client"

import { useState, type SVGProps } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"

const YOUTUBE_THUMBNAIL_BASE_URL = "https://img.youtube.com/vi"
const VIDEO_EMBEDS = [
  "https://www.youtube.com/embed/UGm8djxwC5s",
  "https://www.youtube.com/embed/qh3NGpYRG3I",
  "https://www.youtube.com/embed/AkN6xJcnVYs",
  "https://www.youtube.com/embed/hlSu_ldrbQw",
  "https://www.youtube.com/embed/ZYvvTehpA5I",
] as const

function extractVideoId(url: string) {
  try {
    const parsed = new URL(url)
    const lastSegment = parsed.pathname.split("/").at(-1)
    if (!lastSegment) {
      return ""
    }
    return lastSegment.split("?").at(0) ?? ""
  } catch {
    return ""
  }
}

function buildEmbedSrc(url: string, shouldAutoplay: boolean) {
  if (!shouldAutoplay) {
    return url
  }

  return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`
}

function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <title>Play</title>
      <circle cx="30" cy="30" r="30" opacity="0.85" />
      <polygon points="24,18 44,30 24,42" fill="#fff" />
    </svg>
  )
}

export function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="video-testimonials" className="section container">
      <SectionHeading
        eyebrow="05 — On the record"
        title="Featured on YouTube"
        description="Walkthroughs, reviews and teardowns from people who opened the repo and stayed."
      />

      <Reveal
        stagger={0.08}
        y={20}
        className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 md:auto-rows-[240px] md:grid-cols-6 md:gap-5 lg:auto-rows-[260px]"
      >
        {VIDEO_EMBEDS.map((embedUrl, index) => {
          const videoId = extractVideoId(embedUrl)
          const isActive = activeIndex === index
          const thumbnailSrc = videoId
            ? `${YOUTUBE_THUMBNAIL_BASE_URL}/${videoId}/hqdefault.jpg`
            : undefined

          const columnClasses =
            index === 0
              ? "md:col-span-4 md:row-span-2"
              : index === 1 || index === 2
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-3 md:row-span-1"

          return (
            <button
              key={embedUrl}
              type="button"
              aria-pressed={isActive}
              aria-label={`Play testimonial ${index + 1}`}
              onClick={() => {
                setActiveIndex(index)
              }}
              className={cn(
                "focus-ring group bg-muted border-border/70 hover:border-foreground/25 relative cursor-pointer overflow-hidden rounded-2xl border transition-colors duration-500",
                columnClasses
              )}
            >
              {!isActive && (
                <>
                  {thumbnailSrc ? (
                    <Image
                      fill
                      priority={index === 0}
                      src={thumbnailSrc}
                      alt={`Preview still for testimonial ${index + 1}`}
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <span className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
                      Video preview unavailable
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon className="h-14 w-14 opacity-90 drop-shadow-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110" />
                  </span>
                </>
              )}
              {isActive && (
                <iframe
                  src={buildEmbedSrc(embedUrl, true)}
                  title={`YouTube testimonial ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full"
                  loading="lazy"
                />
              )}
            </button>
          )
        })}
      </Reveal>
    </section>
  )
}
