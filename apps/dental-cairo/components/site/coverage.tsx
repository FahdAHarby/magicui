import { CreditCard, ShieldCheck, Wallet } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { SectionHeading } from "@/components/site/section-heading";
import { instalmentPartners, insurers } from "@/config/clinic";

const perks = [
  {
    icon: ShieldCheck,
    title: "Direct billing, no paperwork",
    description:
      "We file the claim for you at the desk. With approval in place you only pay your co-pay — no waiting for reimbursement.",
  },
  {
    icon: CreditCard,
    title: "0% instalments",
    description:
      "Split aligners, implants or a full makeover over 6–12 interest-free months with Valu, Sympl, Contact or your bank.",
  },
  {
    icon: Wallet,
    title: "Cash, card or transfer",
    description:
      "Instapay, Meeza, Meeza wallet, Visa, Mastercard, Apple Pay and cash — whatever is easiest on the day.",
  },
];

export function Coverage() {
  return (
    <section className="border-border/60 bg-muted/40 border-y py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Insurance & payment"
          title="Pay the way that suits you"
          description="Nile Smile is a direct-billing partner of ten insurers and accepts every instalment wallet worth using in Egypt."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {perks.map(({ icon: Icon, title, description }, index) => (
            <BlurFade key={title} delay={0.06 * index} inView className="h-full">
              <div className="border-border/70 bg-card flex h-full flex-col gap-4 rounded-2xl border p-6">
                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl">
                  <Icon className="size-5.5" />
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      <div className="mt-14 space-y-4">
        <p className="section-shell text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
          Direct-billing insurers
        </p>
        <div className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] border-border/60 border-y py-5">
          <Marquee pauseOnHover className="[--duration:38s] [--gap:1rem] p-0">
            {insurers.map((insurer) => (
              <span
                key={insurer}
                className="border-border/70 bg-card text-muted-foreground rounded-xl border px-5 py-3 text-sm font-semibold whitespace-nowrap"
              >
                {insurer}
              </span>
            ))}
          </Marquee>
        </div>

        <p className="section-shell text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
          Instalment partners
        </p>
        <div className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] border-border/60 border-y py-5">
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:30s] [--gap:1rem] p-0"
          >
            {instalmentPartners.map((partner) => (
              <span
                key={partner}
                className="bg-brand-deep text-brand-deep-foreground rounded-xl px-5 py-3 text-sm font-semibold whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
