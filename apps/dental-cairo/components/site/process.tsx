import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Timer, Wallet } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { processSteps } from "@/config/clinic";

const perks = [
  { icon: Timer, label: "6 min", caption: "average waiting time" },
  { icon: Wallet, label: "0%", caption: "instalments up to 12 months" },
  { icon: CalendarCheck, label: "Same day", caption: "emergency appointments" },
];

export function Process() {
  return (
    <section
      id="process"
      className="border-border/60 bg-muted/40 relative scroll-mt-24 border-y py-20 lg:py-28"
    >
      <div className="section-shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              align="left"
              eyebrow="How it works"
              title="Five calm steps from booking to a checked-up smile"
              description="Most clinics sell you treatment on the first visit. We would rather you leave with a written plan and think about it."
            />

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {perks.map(({ icon: Icon, label, caption }) => (
                <div
                  key={label}
                  className="border-border/70 bg-card rounded-2xl border p-4"
                >
                  <Icon className="text-primary size-4.5" />
                  <dt className="mt-3 text-xl font-semibold">{label}</dt>
                  <dd className="text-muted-foreground text-xs">{caption}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#book"
                className="bg-primary text-primary-foreground shadow-primary/20 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg"
              >
                Start with a consultation
              </Link>
              <Link
                href="#faq"
                className="border-border bg-background rounded-xl border px-5 py-3 text-sm font-semibold"
              >
                Questions first?
              </Link>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <span
            aria-hidden
            className="via-border absolute start-[1.45rem] top-6 bottom-8 hidden w-px bg-gradient-to-b from-transparent to-transparent lg:block"
          />

          <ol className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-0 lg:grid-cols-1">
            {processSteps.map((step, index) => (
              <li key={step.title} className="h-full">
                <BlurFade delay={0.06 * index} inView className="h-full">
                  <div className="border-border/70 bg-card relative flex h-full gap-5 rounded-2xl border p-5 shadow-[0_18px_40px_-38px_rgba(15,23,42,0.6)]">
                    <span className="bg-primary/10 text-primary ring-primary/20 relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="section-shell mt-14">
        <BlurFade inView>
          <div className="border-border/70 relative overflow-hidden rounded-3xl border">
            <Image
              src="/images/reception.jpg"
              alt="Waiting lounge of the Nile Smile Dental Studio in New Cairo"
              width={1376}
              height={768}
              sizes="100vw"
              className="h-64 w-full object-cover sm:h-80"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2_0.04_219/0.85)] via-[oklch(0.2_0.04_219/0.35)] to-transparent"
            />
            <div className="absolute inset-y-0 start-0 flex max-w-md flex-col justify-center gap-2 p-8 text-white">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase">
                The waiting room
              </p>
              <p className="text-xl font-semibold sm:text-2xl">
                Free espresso, fast Wi-Fi and appointments that actually start on
                time.
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
