"use client"

import { useEffect, useId, useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  PartyPopper,
  Phone,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { focusRing, Kicker } from "./brand"
import { AREAS, CONTACT, TIME_SLOTS, type SeatingArea } from "./calypso-data"

interface FormState {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  area: SeatingArea
  notes: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "20:00",
  guests: "2",
  area: "Terrace",
  notes: "",
}

const inputClass =
  "h-12 w-full rounded-lg border border-calypso-ink/15 bg-calypso-oat px-4 text-[15px] text-calypso-ink shadow-none transition-colors duration-200 ease-out placeholder:text-calypso-mist/70 hover:border-calypso-ink/25 focus:border-calypso-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-calypso-clay/30 aria-[invalid=true]:border-calypso-clay"

const labelClass =
  "mb-2 flex items-baseline justify-between gap-2 font-mono text-[10px] tracking-[0.22em] text-calypso-ink/70 uppercase"

export function ReservationForm() {
  const uid = useId()
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<FormState | null>(null)
  const [minDate, setMinDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    setMinDate(local.toISOString().slice(0, 10))
  }, [])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {}
    if (values.name.trim().length < 2) {
      next.name = "Please tell us the name for the booking."
    }
    const digits = values.phone.replace(/[^\d+]/g, "")
    if (digits.length < 8) {
      next.phone = "Add a phone or WhatsApp number we can reach."
    }
    if (!values.date) {
      next.date = "Choose the evening you would like to join us."
    } else if (values.date < minDate) {
      next.date = "That date has already passed — pick a future evening."
    }
    if (!values.time) {
      next.time = "Choose an arrival time."
    }
    return next
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0]
      document.getElementById(`${uid}-${firstKey}`)?.focus()
      return
    }

    setSubmitted(form)
    toast.success("Table request sent", {
      description: `We will confirm ${form.date} at ${form.time} by WhatsApp.`,
    })
  }

  if (submitted) {
    return (
      <div
        className="border-calypso-ink/10 bg-calypso-oat flex h-full flex-col justify-between gap-8 rounded-sm border p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div>
          <span className="bg-calypso-deep text-calypso-shell grid size-12 place-items-center rounded-full">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <Kicker className="mt-6">Request received</Kicker>
          <h3 className="text-calypso-ink mt-4 font-serif text-3xl leading-tight">
            Shukran, {submitted.name.split(" ")[0]}.
          </h3>
          <p className="text-calypso-mist mt-3 max-w-sm text-[15px] leading-relaxed">
            A host will confirm your table by WhatsApp within thirty minutes
            during opening hours. Nothing has been charged.
          </p>

          <dl className="divide-calypso-ink/10 border-calypso-ink/10 mt-7 divide-y border-y text-sm">
            {[
              { label: "Evening", value: submitted.date },
              { label: "Arrival", value: submitted.time },
              {
                label: "Party",
                value: `${submitted.guests} ${
                  submitted.guests === "1" ? "guest" : "guests"
                }`,
              },
              { label: "Seating", value: submitted.area },
              { label: "Contact", value: submitted.phone },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-calypso-mist font-mono text-[10px] tracking-[0.2em] uppercase">
                  {row.label}
                </dt>
                <dd className="text-calypso-ink text-right font-medium">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-calypso-ink/70 mt-5 flex items-start gap-2 text-[13px] leading-relaxed">
            <PartyPopper
              className="text-calypso-clay mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            If the evening is a celebration, tell us on arrival — a candle and
            something sweet are on the house.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={CONTACT.phoneHref}
            className={cn(
              "bg-calypso-deep text-calypso-shell hover:bg-calypso-ink inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 ease-out",
              focusRing
            )}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call the house
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null)
              setForm(initialState)
            }}
            className={cn(
              "border-calypso-ink/20 text-calypso-ink hover:bg-calypso-ink/5 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-200 ease-out",
              focusRing
            )}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Book another table
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-calypso-ink/10 bg-calypso-oat rounded-sm border p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Kicker>Reservations</Kicker>
          <h3 className="text-calypso-ink mt-4 font-serif text-3xl leading-tight">
            Hold a table
          </h3>
        </div>
        <span className="border-calypso-brass/50 mt-1 hidden shrink-0 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-[#7A5A22] uppercase sm:inline-block">
          No card needed
        </span>
      </div>
      <p className="text-calypso-mist mt-3 max-w-md text-[14px] leading-relaxed">
        Tell us when you are coming and we will keep the table for twenty
        minutes past your arrival time.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p
              id={`${uid}-name-error`}
              role="alert"
              className="text-calypso-clay mt-2 text-xs"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelClass}>
            Phone or WhatsApp
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+20 1XX XXX XXXX"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <p
              id={`${uid}-phone-error`}
              role="alert"
              className="text-calypso-clay mt-2 text-xs"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-date`} className={labelClass}>
            Evening
          </label>
          <input
            id={`${uid}-date`}
            name="date"
            type="date"
            min={minDate}
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? `${uid}-date-error` : undefined}
            className={cn(inputClass, "[color-scheme:light]")}
          />
          {errors.date && (
            <p
              id={`${uid}-date-error`}
              role="alert"
              className="text-calypso-clay mt-2 text-xs"
            >
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-time`} className={labelClass}>
            Arrival
          </label>
          <div className="relative">
            <select
              id={`${uid}-time`}
              name="time"
              value={form.time}
              onChange={(event) => update("time", event.target.value)}
              aria-invalid={Boolean(errors.time)}
              className={cn(inputClass, "appearance-none pr-10")}
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="text-calypso-mist pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
            />
          </div>
          {errors.time && (
            <p role="alert" className="text-calypso-clay mt-2 text-xs">
              {errors.time}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${uid}-guests`} className={labelClass}>
          Guests
        </label>
        <div className="relative">
          <select
            id={`${uid}-guests`}
            name="guests"
            value={form.guests}
            onChange={(event) => update("guests", event.target.value)}
            className={cn(inputClass, "appearance-none pr-10")}
          >
            {["1", "2", "3", "4", "5", "6", "7", "8", "10", "12", "20+"].map(
              (count) => (
                <option key={count} value={count}>
                  {count === "1"
                    ? "1 guest"
                    : count === "20+"
                      ? "More than 20 guests"
                      : `${count} guests`}
                </option>
              )
            )}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="text-calypso-mist pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>Where would you like to sit?</legend>
        <div className="grid grid-cols-3 gap-2">
          {AREAS.map((area) => {
            const selected = form.area === area
            return (
              <label
                key={area}
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2.5 text-center text-[13px] font-medium transition-colors duration-200 ease-out",
                  selected
                    ? "border-calypso-deep bg-calypso-deep text-calypso-shell"
                    : "border-calypso-ink/15 bg-calypso-oat text-calypso-ink/75 hover:border-calypso-ink/35",
                  "has-[:focus-visible]:ring-calypso-clay/40 has-[:focus-visible]:ring-2"
                )}
              >
                <input
                  type="radio"
                  name="area"
                  value={area}
                  checked={selected}
                  onChange={() => update("area", area)}
                  className="sr-only"
                />
                {area}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor={`${uid}-notes`} className={labelClass}>
          Notes <span className="font-sans normal-case">(optional)</span>
        </label>
        <textarea
          id={`${uid}-notes`}
          name="notes"
          rows={3}
          placeholder="Birthday, high chair, allergies, a quiet corner…"
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          className={cn(inputClass, "h-auto resize-none py-3 leading-relaxed")}
        />
      </div>

      <button
        type="submit"
        className={cn(
          "group bg-calypso-clay hover:bg-calypso-clay/90 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-200 ease-out",
          focusRing
        )}
      >
        Request this table
        <ArrowRight
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>

      <p className="text-calypso-mist mt-4 text-center text-[12px] leading-relaxed">
        Prefer to speak to someone?{" "}
        <a
          href={CONTACT.phoneHref}
          className={cn(
            "text-calypso-ink decoration-calypso-brass hover:decoration-calypso-clay font-medium underline decoration-1 underline-offset-4",
            focusRing
          )}
        >
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </form>
  )
}
