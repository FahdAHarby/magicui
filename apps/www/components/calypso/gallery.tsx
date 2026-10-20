"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Instagram, Maximize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

import { focusRing } from "./brand"
import { CONTACT, GALLERY } from "./calypso-data"

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const step = (direction: -1 | 1) => {
    setOpenIndex((current) => {
      if (current === null) {
        return current
      }
      return (current + direction + GALLERY.length) % GALLERY.length
    })
  }

  return (
    <div className="mt-12">
      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[210px] lg:auto-rows-[240px] lg:grid-cols-3 lg:gap-4">
        {GALLERY.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image: ${shot.caption}`}
            className={cn(
              "group bg-calypso-sand relative overflow-hidden rounded-sm text-left",
              "focus-visible:ring-calypso-clay focus-visible:ring-offset-calypso-shell focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              shot.span
            )}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes={
                shot.span
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, 50vw"
              }
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="from-calypso-ink/80 via-calypso-ink/5 absolute inset-0 bg-gradient-to-t to-transparent opacity-90 transition-opacity duration-300 ease-out group-hover:opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div>
                <p className="text-calypso-shell font-serif text-lg leading-tight">
                  {shot.caption}
                </p>
                <p className="text-calypso-sand/70 mt-1 font-mono text-[9px] tracking-[0.24em] uppercase opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                  {shot.meta}
                </p>
              </div>
              <span className="border-calypso-shell/40 text-calypso-shell grid size-8 shrink-0 place-items-center rounded-full border opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-3.5" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="border-calypso-ink/10 mt-6 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
        <p className="text-calypso-mist max-w-md text-[13px] leading-relaxed">
          Photographed in the house — the terrace at golden hour, the salon at
          noon, and the kitchen forty minutes before service.
        </p>
        <a
          href={CONTACT.instagramHref}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "group text-calypso-ink hover:text-calypso-clay inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-200 ease-out",
            focusRing
          )}
        >
          <Instagram className="size-4" aria-hidden="true" />
          Follow @calypso.egypt
          <span className="sr-only">(opens Instagram in a new tab)</span>
        </a>
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => setOpenIndex(open ? openIndex : null)}
      >
        <DialogContent
          showCloseButton
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              step(1)
            }
            if (event.key === "ArrowLeft") {
              step(-1)
            }
          }}
          className="calypso-theme border-calypso-shell/15 bg-calypso-ink text-calypso-shell max-w-5xl gap-0 border p-0 sm:rounded-sm"
        >
          <DialogTitle className="sr-only">
            {openIndex !== null ? GALLERY[openIndex].caption : "Gallery image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {openIndex !== null ? GALLERY[openIndex].alt : null}
          </DialogDescription>

          {openIndex !== null && (
            <figure>
              <Image
                src={GALLERY[openIndex].src}
                alt={GALLERY[openIndex].alt}
                width={GALLERY[openIndex].width}
                height={GALLERY[openIndex].height}
                sizes="(min-width: 1024px) 72rem, 100vw"
                className="max-h-[68svh] w-full object-cover"
              />
              <figcaption className="border-calypso-shell/10 flex items-center justify-between gap-4 border-t px-5 py-4">
                <div>
                  <p className="text-calypso-shell font-serif text-lg">
                    {GALLERY[openIndex].caption}
                  </p>
                  <p className="text-calypso-sand/60 mt-1 font-mono text-[9px] tracking-[0.24em] uppercase">
                    {GALLERY[openIndex].meta}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="border-calypso-shell/25 text-calypso-shell hover:bg-calypso-shell/10 focus-visible:ring-calypso-brass grid size-9 place-items-center rounded-full border transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                  </button>
                  <span className="text-calypso-sand/60 font-mono text-[10px] tabular-nums">
                    {String(openIndex + 1).padStart(2, "0")} /{" "}
                    {String(GALLERY.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="border-calypso-shell/25 text-calypso-shell hover:bg-calypso-shell/10 focus-visible:ring-calypso-brass grid size-9 place-items-center rounded-full border transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
