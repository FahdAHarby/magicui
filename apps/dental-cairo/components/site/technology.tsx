import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Languages,
  Microscope,
  Scan,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Zap,
} from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { doctors, technology } from "@/config/clinic";

const technologyIcons: Record<string, React.ElementType> = {
  "3D CBCT imaging": Scan,
  "Intraoral scanning": ScanLine,
  "Digital smile design": Smile,
  "Surgical microscope": Microscope,
  "Dental laser": Zap,
  "Hospital-grade sterilisation": ShieldCheck,
};

export function Technology() {
  return (
    <section id="studio" className="section-shell scroll-mt-24 py-20 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <BlurFade inView>
            <div className="border-border/70 relative overflow-hidden rounded-3xl border shadow-[0_40px_80px_-60px_rgba(15,23,42,0.75)]">
              <Image
                src="/images/studio.jpg"
                alt="Treatment room at the Nile Smile Dental Studio in Fifth Settlement, New Cairo"
                width={1408}
                height={768}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-[420px] w-full object-cover"
              />
              <BorderBeam
                size={220}
                duration={11}
                colorFrom="#2aa79f"
                colorTo="#9fe8dd"
              />
              <div className="border-border/60 bg-background/85 absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold">
                    Fifth Settlement treatment room
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Disinfected between every single patient
                  </p>
                </div>
                <Badge className="bg-mint/40 text-foreground rounded-full">
                  <Sparkles className="size-3.5" /> New in 2025
                </Badge>
              </div>
            </div>
          </BlurFade>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            align="left"
            eyebrow="Inside the studio"
            title="The technology that makes treatment quicker and quieter"
            description="Every studio is fitted with the same kit, so whichever branch you pick you get the same diagnosis and the same result."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {technology.map((item, index) => {
              const Icon = technologyIcons[item.title] ?? Sparkles;
              return (
                <BlurFade
                  key={item.title}
                  delay={0.05 * index}
                  inView
                  className="h-full"
                >
                  <div className="border-border/70 bg-card flex h-full gap-4 rounded-2xl border p-5">
                    <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading
          align="left"
          eyebrow="Your dentists"
          title="Meet the team you'll actually be treated by"
          description="Three specialists, one plan. You always know which dentist owns your case and who to call afterwards."
        />

        <div id="team" className="mt-12 grid scroll-mt-24 gap-6 md:grid-cols-3">
          {doctors.map((doctor, index) => (
            <BlurFade
              key={doctor.slug}
              delay={0.07 * index}
              inView
              className="h-full"
            >
              <MagicCard
                className="h-full rounded-3xl"
                gradientColor="#2aa79f"
                gradientOpacity={0.12}
                gradientSize={280}
              >
                <article className="flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-t-3xl">
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.title} at Nile Smile Dental Studio`}
                      width={928}
                      height={1136}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="h-72 w-full object-cover object-top"
                    />
                    <Badge className="bg-background/90 text-foreground border-border absolute start-4 top-4 rounded-full border backdrop-blur">
                      <BadgeCheck className="text-primary size-3.5" />
                      {doctor.experience}
                    </Badge>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {doctor.name}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {doctor.title}
                      </p>
                    </div>

                    <p className="text-muted-foreground text-sm">
                      {doctor.credentials}
                    </p>

                    <ul className="text-muted-foreground mt-auto space-y-2 border-t pt-4 text-xs">
                      <li className="flex items-center gap-2">
                        <Sparkles className="text-primary size-3.5" />
                        Focus: {doctor.focus}
                      </li>
                      <li className="flex items-center gap-2">
                        <Languages className="text-primary size-3.5" />
                        Speaks {doctor.languages}
                      </li>
                    </ul>

                    <Link
                      href="#book"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-colors"
                    >
                      Book with {doctor.name.split(" ")[1]}
                    </Link>
                  </div>
                </article>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
