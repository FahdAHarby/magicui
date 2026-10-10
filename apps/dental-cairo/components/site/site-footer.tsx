import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

import { ToothIcon } from "@/components/tooth-icon";
import { branches, clinic, hours, telLink, treatments } from "@/config/clinic";

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-brand-deep-foreground relative overflow-hidden">
      <div
        aria-hidden
        className="bg-primary/20 pointer-events-none absolute -top-32 -right-16 size-96 rounded-full blur-3xl"
      />
      <div className="section-shell relative grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="bg-mint/20 ring-mint/30 text-mint flex size-11 items-center justify-center rounded-2xl ring-1">
              <ToothIcon className="size-6" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold tracking-tight">
                {clinic.name}
              </span>
              <span className="text-brand-deep-foreground/60 text-[0.7rem] tracking-[0.16em] uppercase">
                Dental Studio
              </span>
            </span>
          </div>
          <p className="text-brand-deep-foreground/70 mt-5 max-w-sm text-sm">
            {clinic.description} Two studios, one team, and a waiting room that
            feels more like a hotel lobby than a clinic.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="border-brand-deep-foreground/15 hover:border-mint/50 hover:text-mint flex size-10 items-center justify-center rounded-xl border transition-colors"
              >
                <Icon className="size-4.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h3 className="text-sm font-semibold tracking-[0.14em] uppercase">
              Treatments
            </h3>
            <ul className="text-brand-deep-foreground/70 mt-5 space-y-3 text-sm">
              {treatments.slice(0, 6).map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href="#treatments"
                    className="hover:text-mint transition-colors"
                  >
                    {treatment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.14em] uppercase">
              Studios
            </h3>
            <ul className="text-brand-deep-foreground/70 mt-5 space-y-5 text-sm">
              {branches.map((branch) => (
                <li key={branch.slug} className="space-y-2">
                  <p className="text-brand-deep-foreground font-medium">
                    {branch.name}
                  </p>
                  <p className="flex gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    <span>{branch.address}</span>
                  </p>
                  <a
                    href={telLink(branch.phone)}
                    className="hover:text-mint flex gap-2 transition-colors"
                  >
                    <Phone className="size-4 shrink-0" />
                    <span>{branch.phone}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.14em] uppercase">
              Opening hours
            </h3>
            <ul className="text-brand-deep-foreground/70 mt-5 space-y-3 text-sm">
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" />
                <span>{hours.weekdays}</span>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" />
                <span>{hours.friday}</span>
              </li>
              <li className="text-mint">{hours.emergency}</li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a
                  className="hover:text-mint transition-colors"
                  href={`mailto:${clinic.email}`}
                >
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-brand-deep-foreground/10 border-t">
        <div className="section-shell text-brand-deep-foreground/55 flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.fullName}. All rights reserved.
          </p>
          <p>
            Concept design — images, prices, reviews and phone numbers are
            placeholder content for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
