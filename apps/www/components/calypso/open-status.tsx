"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface Status {
  open: boolean
  label: string
}

/**
 * Opening hours in Africa/Cairo local time.
 * Sunday — Wednesday 09:00–01:00, Thursday — Saturday 09:00–02:00.
 */
function getStatus(now: Date): Status {
  const cairo = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) =>
    cairo.find((part) => part.type === type)?.value ?? ""

  const hour = Number(get("hour"))
  const minute = Number(get("minute"))
  const weekday = get("weekday")
  const lateNight = weekday === "Thu" || weekday === "Fri" || weekday === "Sat"
  const closing = lateNight ? 2 : 1
  const minutes = hour * 60 + minute
  const closesAt = closing * 60
  const isOpen = minutes >= 9 * 60 || minutes < closesAt

  return {
    open: isOpen,
    label: isOpen
      ? `Open now · until ${String(closing).padStart(2, "0")}:00`
      : "Closed · opens at 09:00",
  }
}

export function OpenStatus({
  className,
  tone = "shell",
}: {
  className?: string
  tone?: "shell" | "ink"
}) {
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date()))
    update()
    const interval = window.setInterval(update, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase",
        tone === "shell" ? "text-calypso-sand/75" : "text-calypso-ink/75",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          status === null
            ? "bg-calypso-brass"
            : status.open
              ? "bg-emerald-400"
              : "bg-calypso-clay"
        )}
      />
      <span>{status ? status.label : "Open daily · 09:00 — late"}</span>
    </span>
  )
}
