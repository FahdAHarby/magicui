import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  Clock,
  Crown,
  ScanLine,
  Sparkles,
  Syringe,
  Timer,
} from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { treatments, type Treatment } from "@/config/clinic";
import { formatEgp } from "@/lib/utils";

const iconFor: Record<string, React.ElementType> = {
  implant: Syringe,
  aligner: ScanLine,
  veneer: Sparkles,
  whitening: Sparkles,
  endodontics: Timer,
  crown: Crown,
  kids: Baby,
  emergency: Clock,
};

const featuredImages: Record<string, string> = {
  implants: "/images/studio.jpg",
  invisalign: "/images/reception.jpg",
};

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const Icon = iconFor[treatment.icon] ?? Sparkles;

  return (
    <MagicCard
      className="h-full rounded-3xl"
      gradientColor="#2aa79f"
      gradientOpacity={0.1}
      gradientSize={260}
    >
      <div className="flex h-full flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="bg-primary/10 text-primary ring-primary/12 flex size-11 items-center justify-center rounded-2xl ring-1">
            <Icon className="size-5.5" />
          </span>
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold"
          >
            from {formatEgp(treatment.priceFrom)}
          </Badge>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {treatment.title}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {treatment.description}
          </p>
        </div>

        <div className="text-muted-foreground flex items-center justify-between gap-3 border-t pt-4 text-xs">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {treatment.duration}
          </span>
          <Link
            href="#book"
            className="text-primary flex items-center gap-1 font-semibold"
          >
            Book
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </MagicCard>
  );
}

function FeaturedTreatmentCard({ treatment }: { treatment: Treatment }) {
  const image = featuredImages[treatment.slug] ?? "/images/studio.jpg";
  const Icon = iconFor[treatment.icon] ?? Sparkles;

  return (
    <div className="group relative h-full min-h-[22rem] overflow-hidden rounded-3xl">
      <Image
        src={image}
        alt={`${treatment.title} at Nile Smile Dental Studio in Cairo`}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.04_219/0.9)] via-[oklch(0.2_0.04_219/0.25)] to-transparent"
      />
      <div className="relative flex h-full flex-col justify-end gap-3 p-7 text-white">
        <span className="ring-mint/40 text-mint flex size-11 items-center justify-center rounded-2xl bg-white/10 ring-1 backdrop-blur">
          <Icon className="size-5.5" />
        </span>
        <h3 className="text-xl font-semibold">{treatment.title}</h3>
        <p className="max-w-md text-sm text-white/80">
          {treatment.description}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1.5 font-semibold backdrop-blur">
            from {formatEgp(treatment.priceFrom)}
          </span>
          <span className="text-xs text-white/70">{treatment.duration}</span>
          <Link
            href="#book"
            className="text-mint ms-auto flex items-center gap-1 font-semibold hover:underline"
          >
            Book a consultation
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Treatments() {
  const [first, second, ...others] = treatments;

  return (
    <section
      id="treatments"
      className="section-shell scroll-mt-24 py-20 lg:py-28"
    >
      <SectionHeading
        eyebrow="Treatments"
        title="Everything your mouth needs, under one roof"
        description="Prices are published up front and locked for six months. We keep implantology, orthodontics, endodontics and paediatric care in-house, so you are never referred across town."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        <BlurFade inView className="h-full">
          <FeaturedTreatmentCard treatment={first} />
        </BlurFade>
        <BlurFade delay={0.06} inView className="h-full">
          <FeaturedTreatmentCard treatment={second} />
        </BlurFade>
        <BlurFade delay={0.12} inView className="h-full">
          <TreatmentCard treatment={others[0]} />
        </BlurFade>

        {others.slice(1).map((treatment, index) => (
          <BlurFade
            key={treatment.slug}
            delay={0.05 * (index % 3)}
            inView
            className="h-full"
          >
            <TreatmentCard treatment={treatment} />
          </BlurFade>
        ))}

        <BlurFade delay={0.1} inView className="h-full">
          <div className="from-primary/15 via-mint/25 to-primary/10 border-primary/15 flex h-full flex-col justify-between gap-6 rounded-3xl border bg-gradient-to-br p-6">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Not sure what you need?
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Book a 300 EGP consultation with a 3D scan and photos. We write
                every option down with prices before anything starts — nothing
                is done on the day without your approval.
              </p>
            </div>
            <Link
              href="#book"
              className="bg-primary text-primary-foreground inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              Get a written plan
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
