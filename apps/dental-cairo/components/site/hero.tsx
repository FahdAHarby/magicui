import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  CircleCheck,
  CreditCard,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import { clinic, telLink } from "@/config/clinic";

const stats = [
  { label: "Years of practice", value: clinic.yearsOfPractice, suffix: "+" },
  { label: "Treatments delivered", value: clinic.patients, suffix: "+" },
  { label: "Google rating", value: clinic.rating, suffix: "★", decimals: 1 },
  { label: "Studios in Greater Cairo", value: 2, suffix: "" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-28 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_15%_-10%,oklch(0.94_0.05_195)_0%,transparent_55%),radial-gradient(90%_70%_at_95%_0%,oklch(0.95_0.04_175)_0%,transparent_60%)]"
      />
      <AnimatedGridPattern
        numSquares={26}
        maxOpacity={0.12}
        duration={4}
        className="text-primary/70 [mask-image:radial-gradient(700px_circle_at_25%_10%,white,transparent)] pointer-events-none absolute inset-0 -z-10 h-[560px] w-full skew-y-6"
      />

      <div className="section-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <BlurFade delay={0.05} inView>
              <span className="border-primary/20 bg-background/70 text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
                <AnimatedShinyText className="text-primary">
                  Now accepting new patients in New Cairo &amp; Sheikh Zayed
                </AnimatedShinyText>
              </span>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Modern dentistry that makes{" "}
                <Highlighter
                  action="underline"
                  color="#2aa79f"
                  strokeWidth={2.5}
                  padding={4}
                  isView
                >
                  Cairo smile
                </Highlighter>
                .
              </h1>
            </BlurFade>

            <BlurFade delay={0.16} inView>
              <p className="text-muted-foreground mt-6 max-w-xl text-base sm:text-lg">
                Implants, clear aligners, veneers and same-day emergencies —
                delivered with 3D diagnostics,{" "}
                <span className="text-foreground font-medium">
                  fixed EGP pricing
                </span>{" "}
                and late evening slots. No pressure, no surprise bills, no
                waiting three weeks for an appointment.
              </p>
            </BlurFade>

            <BlurFade delay={0.22} inView>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="from-primary to-primary/85 shadow-primary/25 h-12 rounded-xl bg-gradient-to-r px-7 text-base font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Link href="#book">
                    <CalendarCheck className="size-5" />
                    Book an appointment
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-border bg-background/70 px-6 text-base backdrop-blur"
                >
                  <a href={telLink(clinic.emergencyLine)}>
                    <Phone className="size-5" />
                    {clinic.emergencyLine}
                  </a>
                </Button>
              </div>
            </BlurFade>

            <BlurFade delay={0.28} inView>
              <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      <NumberTicker
                        value={stat.value}
                        decimalPlaces={stat.decimals ?? 0}
                        className="text-foreground"
                      />
                      <span className="text-primary">{stat.suffix}</span>
                    </dd>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
            </BlurFade>
          </div>

          <div className="relative lg:col-span-6">
            <BlurFade delay={0.18} direction="right" offset={18} inView>
              <ShineBorder
                borderWidth={1.5}
                duration={14}
                shineColor={["#2aa79f", "#9fe8dd", "#2aa79f"]}
                className="rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(15,23,42,0.55)]"
              >
                <div className="bg-card relative overflow-hidden rounded-[2rem]">
                  <Image
                    src="/images/hero-patient.jpg"
                    alt="Patient smiling in a modern dental studio chair at Nile Smile in Cairo"
                    width={1408}
                    height={768}
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="h-[380px] w-full object-cover object-center sm:h-[460px] lg:h-[520px]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent"
                  />
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">
                        Fifth Settlement studio
                      </p>
                      <p className="text-lg font-semibold">
                        Painless, same-day care
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur">
                      <Star className="fill-gold text-gold size-4" />
                      {clinic.rating} / 5
                    </span>
                  </div>
                </div>
              </ShineBorder>
            </BlurFade>

            <BlurFade
              delay={0.34}
              direction="left"
              inView
              className="absolute -top-4 -left-3 hidden sm:block"
            >
              <div className="glass-card animate-float-slow flex items-center gap-3 px-4 py-3 shadow-lg">
                <span className="bg-primary/12 text-primary flex size-10 items-center justify-center rounded-xl">
                  <CalendarCheck className="size-5" />
                </span>
                <div>
                  <p className="text-muted-foreground text-xs">
                    Next available slot
                  </p>
                  <p className="text-sm font-semibold">
                    Today · 6:30 PM · New Cairo
                  </p>
                </div>
              </div>
            </BlurFade>

            <BlurFade
              delay={0.42}
              direction="left"
              inView
              className="absolute -right-3 bottom-24 hidden sm:block"
            >
              <div className="glass-card animate-float-slower flex items-center gap-3 px-4 py-3 shadow-lg">
                <span className="bg-mint/40 text-foreground flex size-10 items-center justify-center rounded-xl">
                  <CreditCard className="size-5" />
                </span>
                <div>
                  <p className="text-muted-foreground text-xs">Payment plans</p>
                  <p className="text-sm font-semibold">
                    0% instalments · Valu &amp; Sympl
                  </p>
                </div>
              </div>
            </BlurFade>

            <BlurFade
              delay={0.5}
              direction="right"
              inView
              className="absolute -bottom-6 left-6 hidden sm:block"
            >
              <div className="glass-card flex items-center gap-4 px-4 py-3 shadow-lg">
                <span className="bg-primary/12 text-primary flex size-10 items-center justify-center rounded-xl">
                  <ShieldCheck className="size-5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">
                    12-month treatment warranty
                  </p>
                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                    <CircleCheck className="size-3.5" /> Class-B sterilisation,
                    per-patient kits
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
