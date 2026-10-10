"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToothIcon } from "@/components/tooth-icon";
import { clinic, hours, telLink } from "@/config/clinic";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Treatments", href: "#treatments" },
  { label: "Our process", href: "#process" },
  { label: "Dentists", href: "#team" },
  { label: "Prices", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand-deep text-brand-deep-foreground hidden py-2 text-xs sm:block">
        <div className="section-shell flex items-center justify-between gap-4">
          <p className="flex items-center gap-2">
            <span className="bg-mint relative flex size-2 rounded-full">
              <span className="bg-mint absolute inline-flex size-full animate-ping rounded-full opacity-75" />
            </span>
            Emergency slots open today — toothache, swelling or a broken tooth.
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden lg:inline">{hours.weekdays}</span>
            <a
              className="hover:text-mint font-medium transition-colors"
              href={telLink(clinic.emergencyLine)}
            >
              {clinic.emergencyLine}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-border/70 bg-background/85 border-b shadow-[0_10px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <div className="section-shell flex h-16 items-center justify-between gap-6 lg:h-18">
          <Link href="#top" className="flex items-center gap-3">
            <span className="bg-primary/12 text-primary ring-primary/15 flex size-10 items-center justify-center rounded-2xl ring-1">
              <ToothIcon className="size-5.5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[1.05rem] font-semibold tracking-tight">
                {clinic.name}
              </span>
              <span className="text-muted-foreground text-[0.7rem] tracking-[0.16em] uppercase">
                Dental Studio
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground hidden items-center gap-1.5 text-sm xl:flex">
              <Star className="fill-gold text-gold size-4" />
              <span className="text-foreground font-semibold">
                {clinic.rating}
              </span>
              <span className="text-xs">({clinic.reviewCount} reviews)</span>
            </span>
            <Button
              asChild
              variant="outline"
              className="border-primary/25 text-primary hover:bg-primary/10 hover:text-primary hidden sm:inline-flex"
            >
              <a href={telLink(clinic.emergencyLine)}>
                <Phone className="size-4" />
                Call now
              </a>
            </Button>
            <Button
              asChild
              className="from-primary to-primary/85 shadow-primary/25 hidden bg-gradient-to-b shadow-lg sm:inline-flex"
            >
              <Link href="#book">Book a visit</Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <span className="bg-primary/12 text-primary ring-primary/15 flex size-9 items-center justify-center rounded-xl ring-1">
                      <ToothIcon className="size-5" />
                    </span>
                    {clinic.fullName}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:bg-muted rounded-xl px-3 py-3 text-base font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="#book"
                      className="bg-primary text-primary-foreground mt-3 rounded-xl px-3 py-3 text-center text-base font-semibold"
                    >
                      Book a visit
                    </Link>
                  </SheetClose>
                  <a
                    href={telLink(clinic.emergencyLine)}
                    className="border-border mt-1 flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-base font-semibold"
                  >
                    <Phone className="size-4" /> {clinic.emergencyLine}
                  </a>
                  <p className="text-muted-foreground mt-4 px-3 text-sm">
                    {hours.weekdays}
                    <br />
                    {hours.friday}
                  </p>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
