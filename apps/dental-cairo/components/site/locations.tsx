import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowUpRight,
  CalendarClock,
  Car,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { CairoGlobe } from "@/components/site/cairo-globe";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  branches,
  type Branch,
  neighbourhoods,
  telLink,
  waLink,
} from "@/config/clinic";

function mapsLink(branch: Branch) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    branch.mapQuery
  )}`;
}

export function Locations() {
  return (
    <section id="locations" className="section-shell scroll-mt-24 py-20 lg:py-28">
      <SectionHeading
        eyebrow="Find us"
        title="Two studios, ten minutes from where you already are"
        description="Pick the side of the city that suits your commute. Same team, same equipment, same prices at both."
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-7">
          {branches.map((branch, index) => (
            <BlurFade key={branch.slug} delay={0.06 * index} inView>
              <article className="border-border/70 bg-card grid gap-6 overflow-hidden rounded-3xl border sm:grid-cols-[10rem_1fr]">
                <div className="relative h-40 sm:h-full">
                  <Image
                    src={index === 0 ? "/images/studio.jpg" : "/images/reception.jpg"}
                    alt={`${branch.name} interior`}
                    fill
                    sizes="(min-width: 640px) 10rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6 sm:ps-0">
                  <div>
                    <Badge
                      variant="secondary"
                      className="rounded-full text-[0.7rem] tracking-[0.12em] uppercase"
                    >
                      {branch.area}
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">
                      {branch.name}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex gap-2 text-sm">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      {branch.address}
                    </p>
                  </div>

                  <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 text-xs">
                    {branch.hours.map((slot) => (
                      <span key={slot.label} className="flex items-center gap-1.5">
                        <CalendarClock className="text-primary size-3.5" />
                        {slot.label}: {slot.value}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {branch.perks.map((perk) => (
                      <span
                        key={perk}
                        className="bg-muted text-muted-foreground flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                      >
                        {perk.toLowerCase().includes("park") ? (
                          <Car className="size-3.5" />
                        ) : (
                          <Accessibility className="size-3.5" />
                        )}
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <Button asChild className="rounded-xl">
                      <Link href="#book">Book at this studio</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl">
                      <a href={mapsLink(branch)} target="_blank" rel="noopener noreferrer">
                        Directions
                        <ArrowUpRight className="size-4" />
                      </a>
                    </Button>
                    <Button asChild variant="ghost" className="rounded-xl">
                      <a href={telLink(branch.phone)}>
                        <Phone className="size-4" />
                        {branch.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </BlurFade>
          ))}

          <BlurFade delay={0.14} inView>
            <div className="border-primary/20 bg-primary/8 rounded-3xl border p-6">
              <h3 className="text-sm font-semibold">
                Patients travel to us from across Greater Cairo
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {neighbourhoods.map((area) => (
                  <span
                    key={area}
                    className="border-border/70 bg-background text-muted-foreground rounded-full border px-3 py-1.5 text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>

        <div className="lg:col-span-5">
          <BlurFade inView direction="left">
            <div className="relative mx-auto w-full max-w-[34rem]">
              <CairoGlobe className="w-full max-w-[34rem]" />
              <div className="border-border/70 bg-card/85 pointer-events-none absolute start-4 bottom-24 w-56 rounded-2xl border p-4 backdrop-blur">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase">
                  Cairo HQ
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Fifth Settlement · 90th Street
                  <br />
                  24.5 km from Downtown
                </p>
              </div>
              <div className="border-border/70 bg-card/85 pointer-events-none absolute end-2 bottom-6 w-52 rounded-2xl border p-4 backdrop-blur">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase">
                  West Cairo
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Arkan Plaza · Sheikh Zayed
                  <br />
                  Free valet parking
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <div className="border-border/70 bg-card mt-6 flex items-center gap-4 rounded-2xl border p-5">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-600">
                <MessageCircle className="size-5.5" />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  Not sure which studio is closer?
                </p>
                <p className="text-muted-foreground text-xs">
                  Send us your area on WhatsApp and we will point you to the
                  nearest one.
                </p>
              </div>
              <Button asChild variant="outline" className="ms-auto rounded-xl">
                <a
                  href={waLink("Hi Nile Smile, which studio is closest to me?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
