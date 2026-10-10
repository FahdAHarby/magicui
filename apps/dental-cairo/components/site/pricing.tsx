import Link from "next/link";
import { Check, Info } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { packages } from "@/config/clinic";
import { cn, formatEgp } from "@/lib/utils";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-border/60 bg-muted/40 scroll-mt-24 border-y py-20 lg:py-28"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Prices"
          title="Published prices, no mystery quotes"
          description="Printed plans, fixed EGP amounts and 0% instalments through Valu, Sympl, Contact and most Egyptian banks. Insurance claims filed for you at the desk."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((plan, index) => (
            <BlurFade
              key={plan.name}
              delay={0.06 * index}
              inView
              className="h-full"
            >
              <div
                className={cn(
                  "bg-card relative flex h-full flex-col gap-6 rounded-3xl border p-7",
                  plan.featured
                    ? "border-primary/25 shadow-[0_50px_90px_-60px_rgba(42,167,159,0.8)]"
                    : "border-border/70"
                )}
              >
                {plan.featured ? (
                  <ShineBorder
                    borderWidth={1.5}
                    duration={12}
                    shineColor={["#2aa79f", "#9fe8dd", "#2aa79f"]}
                    className="rounded-3xl"
                  />
                ) : null}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground mt-2 max-w-xs text-sm">
                      {plan.blurb}
                    </p>
                  </div>
                  {plan.featured ? (
                    <Badge className="bg-primary text-primary-foreground rounded-full">
                      Most booked
                    </Badge>
                  ) : null}
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {formatEgp(plan.price).replace(" EGP", "")}
                  </span>
                  <span className="text-muted-foreground pb-1 text-sm">
                    EGP · {plan.cadence}
                  </span>
                </div>

                <ul className="flex flex-1 flex-col gap-3 border-t pt-6 text-sm">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="bg-primary/12 text-primary mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full">
                        <Check className="size-3" />
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    "h-11 rounded-xl text-sm font-semibold",
                    plan.featured
                      ? "from-primary to-primary/85 shadow-primary/25 bg-gradient-to-r shadow-lg"
                      : ""
                  )}
                  variant={plan.featured ? "default" : "secondary"}
                >
                  <Link href="#book">
                    {plan.featured ? "Reserve this plan" : "Book this plan"}
                  </Link>
                </Button>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.1}>
          <div className="border-border/70 bg-card mt-8 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground flex items-start gap-3 text-sm">
              <Info className="text-primary mt-0.5 size-4 shrink-0" />
              <span>
                All prices include VAT and are locked for six months from your
                consultation. A 300 EGP first-visit fee is credited back against
                any treatment you start.
              </span>
            </p>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="#book">Request the full price list</Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
