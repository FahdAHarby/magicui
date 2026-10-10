"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  CircleCheck,
  Clock,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clinic, branches, telLink, treatments, waLink } from "@/config/clinic";

const dayOptions = [
  "Today if possible",
  "Tomorrow",
  "This week",
  "Next week",
  "I'm flexible",
];

const timeOptions = [
  "Morning · 10:00 – 13:00",
  "Afternoon · 13:00 – 17:00",
  "Evening · 17:00 – 22:00",
  "Any time works",
];

const reassurance = [
  "Confirmation by WhatsApp within 15 minutes",
  "300 EGP consultation fee, credited back to your treatment",
  "Written plan with fixed EGP prices — nothing more added later",
  "Free rescheduling up to 3 hours before your slot",
];

type FormState = {
  name: string;
  phone: string;
  treatment: string;
  branch: string;
  day: string;
  time: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  treatment: treatments[0].title,
  branch: branches[0].name,
  day: dayOptions[1],
  time: timeOptions[2],
  notes: "",
};

export function Booking() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      setForm((previous) => ({ ...previous, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = "Please tell us your full name.";
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a mobile number we can reach you on.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Almost there", {
        description: "We just need your name and a valid mobile number.",
      });
      return;
    }

    setSubmitted(true);
    toast.success("Appointment request sent", {
      description: `Thanks ${form.name.split(" ")[0]} — we'll confirm on WhatsApp shortly.`,
    });
  };

  const summaryMessage = `Hi Nile Smile, I'd like to book: ${form.treatment} at ${form.branch}, preferred ${form.day} (${form.time}). Name: ${form.name}. Phone: ${form.phone}.${form.notes ? ` Notes: ${form.notes}` : ""}`;

  return (
    <section
      id="book"
      className="bg-brand-deep text-brand-deep-foreground relative scroll-mt-24 overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="bg-primary/25 pointer-events-none absolute -top-24 left-1/4 size-[28rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-mint/20 pointer-events-none absolute -bottom-32 right-0 size-[24rem] rounded-full blur-3xl"
      />

      <div className="section-shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="border-brand-deep-foreground/20 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium">
            <AnimatedShinyText className="text-mint">
              Same-day emergency slots available today
            </AnimatedShinyText>
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
            Book your visit — it takes less than a minute
          </h2>
          <p className="text-brand-deep-foreground/75 mt-5 max-w-lg">
            Tell us what you need and when suits you. A coordinator confirms your
            slot on WhatsApp, and you will know the price before you arrive.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {reassurance.map((item) => (
              <li
                key={item}
                className="text-brand-deep-foreground/85 flex items-start gap-3 text-sm"
              >
                <CircleCheck className="text-mint mt-0.5 size-4.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="border-brand-deep-foreground/15 mt-10 flex flex-wrap items-center gap-4 border-t pt-8">
            <Button
              asChild
              variant="outline"
              className="border-brand-deep-foreground/25 text-brand-deep-foreground hover:bg-brand-deep-foreground/10 rounded-xl bg-transparent"
            >
              <a href={telLink(clinic.emergencyLine)}>
                <Phone className="size-4" />
                {clinic.emergencyLine}
              </a>
            </Button>
            <span className="text-brand-deep-foreground/60 flex items-center gap-2 text-xs">
              <Clock className="size-4" />
              Sat–Thu 10:00–22:00 · Fri 14:00–22:00
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <BlurFade inView direction="left">
            <div className="bg-background text-foreground rounded-3xl p-6 shadow-[0_50px_100px_-60px_rgba(0,0,0,0.9)] sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-5 py-8 text-center">
                  <span className="bg-primary/12 text-primary flex size-14 items-center justify-center rounded-2xl">
                    <BadgeCheck className="size-7" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Request received, {form.name.split(" ")[0]}!
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      We have your request for{" "}
                      <span className="text-foreground font-medium">
                        {form.treatment}
                      </span>{" "}
                      at {form.branch}, {form.day.toLowerCase()} ({form.time}).
                      A coordinator will confirm on WhatsApp within 15 minutes.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button asChild className="rounded-xl">
                      <a
                        href={waLink(summaryMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" />
                        Send details to WhatsApp
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => {
                        setForm(initialState);
                        setSubmitted(false);
                      }}
                    >
                      Book another visit
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        Appointment request
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        No payment needed now — this is a request, not a booking.
                      </p>
                    </div>
                    <Sparkles className="text-primary hidden size-5 sm:block" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="booking-name">Full name</Label>
                    <Input
                      id="booking-name"
                      name="name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="e.g. Mona Abdelrahman"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "booking-name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="booking-name-error" className="text-xs text-red-600">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="booking-phone">Mobile number</Label>
                    <Input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+20 1XX XXX XXXX"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? "booking-phone-error" : undefined
                      }
                    />
                    {errors.phone ? (
                      <p id="booking-phone-error" className="text-xs text-red-600">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="booking-treatment">Treatment</Label>
                    <select
                      id="booking-treatment"
                      name="treatment"
                      value={form.treatment}
                      onChange={update("treatment")}
                      className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    >
                      {treatments.map((treatment) => (
                        <option key={treatment.slug} value={treatment.title}>
                          {treatment.title}
                        </option>
                      ))}
                      <option value="General check-up">General check-up</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="booking-branch">Studio</Label>
                    <select
                      id="booking-branch"
                      name="branch"
                      value={form.branch}
                      onChange={update("branch")}
                      className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    >
                      {branches.map((branch) => (
                        <option key={branch.slug} value={branch.name}>
                          {branch.name} — {branch.area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="booking-day">Preferred day</Label>
                    <select
                      id="booking-day"
                      name="day"
                      value={form.day}
                      onChange={update("day")}
                      className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    >
                      {dayOptions.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="booking-time">Preferred time</Label>
                    <select
                      id="booking-time"
                      name="time"
                      value={form.time}
                      onChange={update("time")}
                      className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-lg border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    >
                      {timeOptions.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="booking-notes">
                      Anything we should know? (optional)
                    </Label>
                    <textarea
                      id="booking-notes"
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={update("notes")}
                      placeholder="Pain, previous treatment, insurance, or if you have dental anxiety — we plan around it."
                      className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 field-sizing-content min-h-20 rounded-lg border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-muted-foreground max-w-xs text-xs">
                      We only use your number to confirm this appointment. No
                      marketing, ever.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="from-primary to-primary/85 shadow-primary/25 h-11 rounded-xl bg-gradient-to-r px-6 font-semibold shadow-lg"
                    >
                      <CalendarCheck className="size-4.5" />
                      Request appointment
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
