import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  ChefHat,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Moon,
  Music,
  Phone,
  Users,
  Wind,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { BlurFade } from "@/registry/magicui/blur-fade"
import { Marquee } from "@/registry/magicui/marquee"

import { BrassStar, focusRing, Kicker, SectionRule } from "./brand"
import { MobileReserveBar, ScrollProgress } from "./calypso-chrome"
import {
  CONTACT,
  EXPERIENCES,
  HOURS,
  NAV_LINKS,
  TESTIMONIALS,
} from "./calypso-data"
import { FaqAccordion } from "./faq"
import { Gallery } from "./gallery"
import { MenuExplorer } from "./menu-explorer"
import { OpenStatus } from "./open-status"
import { ReservationForm } from "./reservation-form"
import { SiteHeader } from "./site-header"

const container = "mx-auto w-full max-w-7xl px-6 lg:px-8"

const MARQUEE_ITEMS = [
  "Fresh mezze",
  "Charcoal grill",
  "Turkish coffee",
  "Shisha on the terrace",
  "Live oud · Thu — Sat",
  "Cairo hospitality",
]

const PILLARS = [
  {
    icon: ChefHat,
    title: "Made from scratch",
    copy: "Mezze, baladi bread and desserts prepared in-house every single morning.",
  },
  {
    icon: Wind,
    title: "Terrace & rooftop",
    copy: "Two open-air rooms, wide railings and a breeze that never seems to stop.",
  },
  {
    icon: Moon,
    title: "Until the small hours",
    copy: "Doors open at 09:00, coffee until midnight, kitchen until the last table.",
  },
  {
    icon: Users,
    title: "Room for everyone",
    copy: "Families, football nights, first dates and the quiet corner for laptops.",
  },
]

const CARD_LINK =
  "group inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-200 ease-out"

export function CalypsoSite() {
  return (
    <div className="calypso-theme bg-calypso-shell text-calypso-ink selection:bg-calypso-clay min-h-svh font-sans antialiased selection:text-white">
      <a
        href="#main"
        className="focus:bg-calypso-ink focus:text-calypso-shell sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:px-5 focus:py-3 focus:text-sm"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <SiteHeader />
      <MobileReserveBar />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        {/* ——————————————————————————————— Hero */}
        <section
          id="top"
          className="bg-calypso-ink text-calypso-shell relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden"
        >
          <Image
            src="/calypso/hero-terrace.webp"
            alt="The Calypso terrace at dusk, with rattan chairs, brass tables and string lights above the Nile"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,33,30,0.92)_0%,rgba(14,33,30,0.55)_32%,rgba(14,33,30,0.1)_64%,rgba(14,33,30,0.5)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,33,30,0.72)_0%,rgba(14,33,30,0.15)_45%,transparent_70%)]"
          />

          <div className={cn(container, "relative pt-32 pb-8 lg:pb-12")}>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <BlurFade inView direction="up" delay={0.05}>
                  <Kicker tone="shell">
                    Café · Restaurant · Shisha — El Kafrawi, Cairo
                  </Kicker>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.12}>
                  <h1 className="mt-6 font-serif text-[clamp(2.75rem,7.2vw,5.5rem)] leading-[0.94] font-light tracking-[-0.015em] text-balance">
                    Where Cairo comes to{" "}
                    <em className="text-calypso-brass italic">slow down.</em>
                  </h1>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.2}>
                  <p className="text-calypso-sand/85 mt-6 max-w-xl text-[15px] leading-relaxed text-pretty sm:text-base">
                    Mezze made each morning, charcoal lit at four, Turkish
                    coffee poured until late — and a terrace built for the kind
                    of evening you never quite plan.
                  </p>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.28}>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#reserve"
                      className={cn(
                        "group bg-calypso-clay hover:bg-calypso-clay/90 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-200 ease-out",
                        "focus-visible:ring-calypso-shell focus-visible:ring-offset-calypso-ink focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                      )}
                    >
                      Reserve a table
                      <ArrowRight
                        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                    <a
                      href="#menu"
                      className="group border-calypso-shell/35 text-calypso-shell hover:bg-calypso-shell/10 focus-visible:ring-calypso-shell focus-visible:ring-offset-calypso-ink inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Explore the menu
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.36}>
                  <p className="text-calypso-sand/60 mt-6 font-mono text-[10px] tracking-[0.24em] uppercase">
                    Walk-ins welcome · Valet parking from 18:00
                  </p>
                </BlurFade>
              </div>

              <div className="hidden lg:col-span-5 lg:block">
                <BlurFade inView direction="up" delay={0.4}>
                  <div className="border-calypso-shell/15 bg-calypso-ink/45 ml-auto max-w-xs border p-6 backdrop-blur-md">
                    <Kicker tone="shell">Tonight on the terrace</Kicker>
                    <p className="text-calypso-shell mt-4 font-serif text-2xl leading-tight">
                      Golden hour, then the grill.
                    </p>
                    <p className="text-calypso-sand/70 mt-2 text-[13px] leading-relaxed">
                      Terrace tables from 19:00 and live oud Thursday to
                      Saturday. A handful are held back for walk-ins.
                    </p>
                    <a
                      href="#evenings"
                      className={cn(
                        CARD_LINK,
                        "text-calypso-brass hover:text-calypso-shell focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink mt-5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                      )}
                    >
                      See the evenings
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </BlurFade>
              </div>
            </div>

            <div className="border-calypso-shell/15 text-calypso-sand/70 mt-12 grid gap-4 border-t pt-6 font-mono text-[10px] tracking-[0.18em] uppercase sm:grid-cols-3">
              <p className="flex items-center gap-2">
                <Clock
                  className="text-calypso-brass size-3.5"
                  aria-hidden="true"
                />
                <OpenStatus />
              </p>
              <p className="flex items-center gap-2 sm:justify-center">
                <MapPin
                  className="text-calypso-brass size-3.5"
                  aria-hidden="true"
                />
                Chill Out El Kafrawi Axis, Cairo
              </p>
              <a
                href={CONTACT.phoneHref}
                className="hover:text-calypso-shell focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink flex items-center gap-2 transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none sm:justify-end"
              >
                <Phone
                  className="text-calypso-brass size-3.5"
                  aria-hidden="true"
                />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* ——————————————————————————————— Marquee */}
        <div className="border-calypso-shell/10 bg-calypso-ink text-calypso-shell border-y py-4">
          <Marquee pauseOnHover className="[--duration:46s] [--gap:2.5rem]">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-10 font-serif text-lg tracking-[0.18em] whitespace-nowrap uppercase sm:text-xl"
              >
                {item}
                <BrassStar className="size-2.5 opacity-80" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* ——————————————————————————————— Story */}
        <section
          id="house"
          className="bg-calypso-shell scroll-mt-24 py-20 sm:py-28 lg:py-32"
        >
          <div className={container}>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <BlurFade inView direction="up">
                  <Kicker>The house</Kicker>
                  <h2 className="text-calypso-ink mt-5 font-serif text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl">
                    A homey room in a city that never stops.
                  </h2>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.1}>
                  <div className="text-calypso-mist mt-6 space-y-4 text-[15px] leading-relaxed text-pretty">
                    <p>
                      Calypso began with a simple idea: a place where the meal
                      is unhurried, the coffee is properly made and nobody looks
                      at the clock. Limewash walls, rattan, brass and linen —
                      warm, quiet and deliberately familiar.
                    </p>
                    <p>
                      By day it is a café for long conversations and a laptop in
                      the corner. By night the grill takes over, the terrace
                      fills with smoke and music, and the room settles into the
                      rhythm Cairenes know best.
                    </p>
                  </div>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.18}>
                  <div className="border-calypso-brass/60 mt-8 border-l pl-5">
                    <p className="text-calypso-ink font-serif text-xl leading-snug italic">
                      “The kind of place you bring people you like.”
                    </p>
                    <p className="text-calypso-mist mt-2 font-mono text-[9px] tracking-[0.26em] uppercase">
                      A guest, on a Thursday
                    </p>
                  </div>
                </BlurFade>

                <BlurFade inView direction="up" delay={0.24}>
                  <a
                    href="#gallery"
                    className={cn(
                      CARD_LINK,
                      "text-calypso-clay hover:text-calypso-ink mt-8",
                      focusRing
                    )}
                  >
                    Walk through the house
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                </BlurFade>
              </div>

              <div className="relative pb-12 lg:col-span-7 lg:pb-16">
                <BlurFade inView direction="up" delay={0.08}>
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="border-calypso-brass/35 absolute -inset-2 border sm:-inset-3"
                    />
                    <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3] lg:aspect-[5/4]">
                      <Image
                        src="/calypso/interior-arches.webp"
                        alt="Limewash arches, rattan pendant lamps and terracotta floors in the indoor salon"
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </BlurFade>

                <BlurFade
                  inView
                  direction="up"
                  delay={0.2}
                  className="absolute bottom-0 -left-2 w-36 sm:-left-6 sm:w-52 lg:w-60"
                >
                  <div className="border-calypso-shell overflow-hidden border-4 shadow-[0_18px_40px_-24px_rgba(14,33,30,0.55)]">
                    <Image
                      src="/calypso/entrance-night.webp"
                      alt="The arched entrance of Calypso at blue hour, lit by warm lanterns"
                      width={928}
                      height={1152}
                      sizes="(min-width: 640px) 15rem, 9rem"
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                </BlurFade>

                <BlurFade
                  inView
                  direction="up"
                  delay={0.28}
                  className="absolute top-4 right-4 hidden sm:block"
                >
                  <div className="border-calypso-ink/10 bg-calypso-oat/95 border px-4 py-3 backdrop-blur-sm">
                    <p className="text-calypso-mist font-mono text-[9px] tracking-[0.24em] uppercase">
                      Indoor salon
                    </p>
                    <p className="text-calypso-ink mt-1 font-serif text-lg">
                      Smoke-free, always
                    </p>
                  </div>
                </BlurFade>
              </div>
            </div>

            <div className="border-calypso-ink/10 mt-16 grid gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {PILLARS.map((pillar, index) => (
                <BlurFade
                  key={pillar.title}
                  inView
                  direction="up"
                  delay={index * 0.06}
                >
                  <div className="flex gap-4">
                    <span className="border-calypso-ink/12 text-calypso-clay grid size-10 shrink-0 place-items-center rounded-full border">
                      <pillar.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-calypso-ink font-serif text-lg">
                        {pillar.title}
                      </h3>
                      <p className="text-calypso-mist mt-1 text-[13px] leading-relaxed">
                        {pillar.copy}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ——————————————————————————————— Menu */}
        <section
          id="menu"
          className="border-calypso-ink/10 bg-calypso-oat scroll-mt-24 border-y py-20 sm:py-28 lg:py-32"
        >
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Kicker>Menu · Autumn 2026</Kicker>
                <h2 className="text-calypso-ink mt-5 font-serif text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl">
                  The menu, from mezze to the last coffee.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <p className="text-calypso-mist max-w-sm text-[15px] leading-relaxed text-pretty">
                  A short menu on purpose. Four sections, prepared daily, priced
                  in Egyptian pounds with service included.
                </p>
              </div>
            </div>

            <MenuExplorer />
          </div>
        </section>

        {/* ——————————————————————————————— Evenings */}
        <section
          id="evenings"
          className="bg-calypso-ink text-calypso-shell relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-28 lg:py-32"
        >
          <div
            aria-hidden="true"
            className="bg-calypso-brass/10 absolute -top-40 right-0 -z-10 size-[32rem] rounded-full blur-3xl"
          />
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Kicker tone="shell">Evenings</Kicker>
                <h2 className="mt-5 font-serif text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl">
                  The terrace after dark.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <p className="text-calypso-sand/75 max-w-sm text-[15px] leading-relaxed text-pretty">
                  Three rituals carry our evenings: the sunset, the oud and the
                  slow burn of a well-kept shisha. Come for one, stay for all
                  three.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {EXPERIENCES.map((experience, index) => (
                <BlurFade
                  key={experience.id}
                  inView
                  direction="up"
                  delay={index * 0.08}
                >
                  <article className="group border-calypso-shell/12 bg-calypso-deep/50 hover:border-calypso-brass/45 flex h-full flex-col overflow-hidden rounded-sm border transition-colors duration-300 ease-out">
                    <div className="relative overflow-hidden">
                      <Image
                        src={experience.image}
                        alt={experience.imageAlt}
                        width={1408}
                        height={768}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="from-calypso-ink/70 absolute inset-0 bg-gradient-to-t to-transparent"
                      />
                      <span className="border-calypso-shell/25 bg-calypso-ink/60 text-calypso-sand absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.18em] uppercase backdrop-blur-sm">
                        {experience.time}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-calypso-brass font-mono text-[9px] tracking-[0.24em] uppercase">
                        {experience.eyebrow}
                      </p>
                      <h3 className="text-calypso-shell mt-3 font-serif text-2xl">
                        {experience.title}
                      </h3>
                      <p className="text-calypso-sand/70 mt-3 text-[14px] leading-relaxed">
                        {experience.description}
                      </p>
                      <p className="border-calypso-shell/10 text-calypso-sand/60 mt-auto flex items-start gap-2 border-t pt-5 text-[12px] leading-relaxed">
                        <BrassStar className="mt-0.5 size-2 shrink-0" />
                        {experience.detail}
                      </p>
                    </div>
                  </article>
                </BlurFade>
              ))}
            </div>

            <div className="border-calypso-shell/12 bg-calypso-shell/[0.04] mt-8 flex flex-col gap-5 rounded-sm border p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-calypso-sand/75 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px]">
                <span className="flex items-center gap-2">
                  <Music
                    className="text-calypso-brass size-3.5"
                    aria-hidden="true"
                  />
                  Live oud — Thursday to Saturday, 20:30
                </span>
                <span className="flex items-center gap-2">
                  <Users
                    className="text-calypso-brass size-3.5"
                    aria-hidden="true"
                  />
                  Rooftop private events up to 40 guests
                </span>
              </div>
              <a
                href="#reserve"
                className="group bg-calypso-shell text-calypso-ink hover:bg-calypso-sand focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Reserve for the evening
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>

        {/* ——————————————————————————————— Gallery */}
        <section
          id="gallery"
          className="bg-calypso-shell scroll-mt-24 py-20 sm:py-28 lg:py-32"
        >
          <div className={container}>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Kicker>The house, photographed</Kicker>
                <h2 className="text-calypso-ink mt-5 max-w-xl font-serif text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl">
                  Gold light, limewash and a table full of plates.
                </h2>
              </div>
              <p className="text-calypso-mist max-w-xs text-[13px] leading-relaxed">
                A few frames from an ordinary week — no styling, no stand-ins.
              </p>
            </div>

            <Gallery />
          </div>
        </section>

        {/* ——————————————————————————————— Guest notes */}
        <section className="border-calypso-ink/10 bg-calypso-sand/45 border-y py-16 sm:py-20">
          <div className={container}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Kicker>Guest notes</Kicker>
                <h2 className="text-calypso-ink mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  What people say on the way out.
                </h2>
              </div>
              <p className="text-calypso-mist font-mono text-[9px] tracking-[0.22em] uppercase">
                Selected, lightly edited
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial, index) => (
                <BlurFade
                  key={testimonial.name}
                  inView
                  direction="up"
                  delay={index * 0.07}
                >
                  <figure className="border-calypso-ink/10 bg-calypso-oat flex h-full flex-col border p-6">
                    <div
                      className="text-calypso-brass flex items-center gap-1"
                      aria-label="Five out of five"
                    >
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <StarIcon key={starIndex} />
                      ))}
                    </div>
                    <blockquote className="text-calypso-ink mt-4 flex-1 font-serif text-lg leading-relaxed">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="border-calypso-ink/10 mt-5 border-t pt-4">
                      <p className="text-calypso-ink text-[13px] font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-calypso-mist mt-0.5 font-mono text-[9px] tracking-[0.2em] uppercase">
                        {testimonial.meta}
                      </p>
                    </figcaption>
                  </figure>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ——————————————————————————————— Visit */}
        <section
          id="visit"
          className="bg-calypso-shell scroll-mt-24 py-20 sm:py-28 lg:py-32"
        >
          <div
            className={cn(container, "grid gap-14 lg:grid-cols-12 lg:gap-16")}
          >
            <div className="lg:col-span-5">
              <Kicker>Visit</Kicker>
              <h2 className="text-calypso-ink mt-5 font-serif text-4xl leading-[1.05] font-light tracking-tight text-balance sm:text-5xl">
                Find us on the Kafrawi axis.
              </h2>
              <p className="text-calypso-mist mt-5 max-w-md text-[15px] leading-relaxed text-pretty">
                Five minutes from Zahraa El Maadi, with valet every evening.
                Call ahead for the corner tables on the terrace — they go first.
              </p>

              <dl className="mt-9 space-y-6">
                <div className="flex gap-4">
                  <span className="border-calypso-ink/12 text-calypso-clay mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-calypso-mist font-mono text-[9px] tracking-[0.24em] uppercase">
                      Address
                    </dt>
                    <dd className="text-calypso-ink mt-1 text-[15px] leading-relaxed">
                      <a
                        href={CONTACT.mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "decoration-calypso-brass hover:text-calypso-clay underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out",
                          focusRing
                        )}
                      >
                        {CONTACT.address}
                      </a>
                      <span className="sr-only">
                        {" "}
                        (opens maps in a new tab)
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="border-calypso-ink/12 text-calypso-clay mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-calypso-mist font-mono text-[9px] tracking-[0.24em] uppercase">
                      Hours
                    </dt>
                    <dd className="mt-2 w-full max-w-xs space-y-2">
                      {HOURS.map((entry) => (
                        <div
                          key={entry.day}
                          className="border-calypso-ink/8 flex items-baseline justify-between gap-6 border-b pb-2 text-[13px]"
                        >
                          <span className="text-calypso-mist">{entry.day}</span>
                          <span className="text-calypso-ink font-mono text-xs whitespace-nowrap">
                            {entry.time}
                          </span>
                        </div>
                      ))}
                    </dd>
                    <div className="mt-3">
                      <OpenStatus tone="ink" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="border-calypso-ink/12 text-calypso-clay mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-calypso-mist font-mono text-[9px] tracking-[0.24em] uppercase">
                      Reservations
                    </dt>
                    <dd className="text-calypso-ink mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px]">
                      <a
                        href={CONTACT.phoneHref}
                        className={cn(
                          "decoration-calypso-brass hover:text-calypso-clay underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out",
                          focusRing
                        )}
                      >
                        {CONTACT.phoneDisplay}
                      </a>
                      <a
                        href={CONTACT.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "text-calypso-mist hover:text-calypso-clay text-[13px] font-medium transition-colors duration-200 ease-out",
                          focusRing
                        )}
                      >
                        WhatsApp
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="border-calypso-ink/12 text-calypso-clay mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-calypso-mist font-mono text-[9px] tracking-[0.24em] uppercase">
                      Email
                    </dt>
                    <dd className="text-calypso-ink mt-1 text-[15px]">
                      <a
                        href={CONTACT.emailHref}
                        className={cn(
                          "decoration-calypso-brass hover:text-calypso-clay underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out",
                          focusRing
                        )}
                      >
                        {CONTACT.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <p className="border-calypso-brass/60 text-calypso-mist mt-8 max-w-sm border-l pl-5 text-[13px] leading-relaxed">
                Planning something bigger? The rooftop seats forty.{" "}
                <a
                  href={`${CONTACT.emailHref}?subject=Rooftop%20event%20at%20Calypso`}
                  className={cn(
                    "text-calypso-ink decoration-calypso-brass hover:text-calypso-clay font-medium underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out",
                    focusRing
                  )}
                >
                  Email our events team
                </a>
                .
              </p>

              <div className="mt-9 flex items-center gap-3">
                <a
                  href={CONTACT.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Calypso on Instagram (opens in a new tab)"
                  className={cn(
                    "border-calypso-ink/15 text-calypso-ink hover:border-calypso-clay/40 hover:text-calypso-clay grid size-10 place-items-center rounded-full border transition-colors duration-200 ease-out",
                    focusRing
                  )}
                >
                  <Instagram className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Calypso on Facebook (opens in a new tab)"
                  className={cn(
                    "border-calypso-ink/15 text-calypso-ink hover:border-calypso-clay/40 hover:text-calypso-clay grid size-10 place-items-center rounded-full border transition-colors duration-200 ease-out",
                    focusRing
                  )}
                >
                  <Facebook className="size-4" aria-hidden="true" />
                </a>
                <span className="text-calypso-mist ml-2 font-mono text-[9px] tracking-[0.22em] uppercase">
                  @calypso.egypt
                </span>
              </div>
            </div>

            <div id="reserve" className="scroll-mt-28 lg:col-span-7">
              <ReservationForm />
            </div>
          </div>

          <div className={cn(container, "mt-20 sm:mt-24")}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Kicker>Good to know</Kicker>
                <h2 className="text-calypso-ink mt-5 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
                  Before you come.
                </h2>
                <p className="text-calypso-mist mt-4 max-w-xs text-[14px] leading-relaxed">
                  Anything else, call us — a person answers, not a menu.
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className={cn(
                    CARD_LINK,
                    "text-calypso-clay hover:text-calypso-ink mt-5",
                    focusRing
                  )}
                >
                  <Phone className="size-3.5" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="lg:col-span-8">
                <FaqAccordion />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ——————————————————————————————— Footer */}
      <footer className="bg-calypso-ink text-calypso-shell relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-calypso-brass/10 absolute -top-32 left-1/2 size-[30rem] -translate-x-1/2 rounded-full blur-3xl"
        />
        <div className={cn(container, "relative py-16 sm:py-20")}>
          <div className="border-calypso-shell/12 flex flex-col gap-8 border-b pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Kicker tone="shell">Until tonight</Kicker>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.02] font-light tracking-tight text-balance sm:text-5xl">
                See you on the{" "}
                <em className="text-calypso-brass italic">terrace.</em>
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#reserve"
                className="group bg-calypso-clay hover:bg-calypso-clay/90 focus-visible:ring-calypso-shell focus-visible:ring-offset-calypso-ink inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Reserve a table
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={CONTACT.phoneHref}
                className="border-calypso-shell/25 text-calypso-shell hover:bg-calypso-shell/10 focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Phone className="size-4" aria-hidden="true" />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-calypso-shell font-serif text-xl tracking-[0.3em] uppercase">
                Calypso
              </p>
              <p className="text-calypso-sand/60 mt-3 max-w-[16rem] text-[13px] leading-relaxed">
                Café, restaurant and terrace on the Chill Out El Kafrawi Axis.
                Homey by design, Cairo by nature.
              </p>
            </div>

            <nav aria-label="Footer">
              <h3 className="text-calypso-brass font-mono text-[9px] tracking-[0.26em] uppercase">
                Explore
              </h3>
              <ul className="text-calypso-sand/70 mt-4 space-y-2.5 text-[13px]">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        "hover:text-calypso-shell transition-colors duration-200 ease-out",
                        focusRing
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#reserve"
                    className={cn(
                      "hover:text-calypso-shell transition-colors duration-200 ease-out",
                      focusRing
                    )}
                  >
                    Reservations
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h3 className="text-calypso-brass font-mono text-[9px] tracking-[0.26em] uppercase">
                Hours
              </h3>
              <dl className="mt-4 space-y-2.5 text-[13px]">
                {HOURS.map((entry) => (
                  <div key={entry.day} className="flex justify-between gap-4">
                    <dt className="text-calypso-sand/60">{entry.day}</dt>
                    <dd className="text-calypso-sand/85 font-mono text-[11px] whitespace-nowrap">
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-calypso-brass font-mono text-[9px] tracking-[0.26em] uppercase">
                Find us
              </h3>
              <address className="text-calypso-sand/70 mt-4 space-y-2.5 text-[13px] leading-relaxed not-italic">
                <p>{CONTACT.address}</p>
                <p>
                  <a
                    href={CONTACT.phoneHref}
                    className={cn(
                      "hover:text-calypso-shell transition-colors duration-200 ease-out",
                      focusRing
                    )}
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={CONTACT.emailHref}
                    className={cn(
                      "hover:text-calypso-shell break-all transition-colors duration-200 ease-out",
                      focusRing
                    )}
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </address>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={CONTACT.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Calypso on Instagram (opens in a new tab)"
                  className={cn(
                    "border-calypso-shell/20 text-calypso-shell hover:bg-calypso-shell/10 grid size-9 place-items-center rounded-full border transition-colors duration-200 ease-out",
                    "focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  )}
                >
                  <Instagram className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Calypso on Facebook (opens in a new tab)"
                  className={cn(
                    "border-calypso-shell/20 text-calypso-shell hover:bg-calypso-shell/10 grid size-9 place-items-center rounded-full border transition-colors duration-200 ease-out",
                    "focus-visible:ring-calypso-brass focus-visible:ring-offset-calypso-ink focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  )}
                >
                  <Facebook className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <SectionRule className="bg-calypso-shell/12" />

          <div className="text-calypso-sand/60 flex flex-col items-start justify-between gap-3 pt-6 pb-20 font-mono text-[9px] tracking-[0.2em] uppercase sm:flex-row sm:items-center lg:pb-0">
            <p>© {new Date().getFullYear()} Calypso Café & Restaurant</p>
            <p>Prices in EGP · Concept design · Photography is illustrative</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
    </svg>
  )
}
