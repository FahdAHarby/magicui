import { CircleCheck } from "lucide-react";

import { Marquee } from "@/components/magicui/marquee";

const highlights = [
  "Invisalign Diamond provider",
  "Same-day emergency slots",
  "3D CBCT scanning on site",
  "Fixed EGP pricing, locked 6 months",
  "Class-B sterilisation, single-use kits",
  "0% instalments with Valu & Sympl",
  "Direct billing with 10 insurers",
  "Open till 10 PM, six days a week",
  "Kids' play corner & family rooms",
];

export function TrustStrip() {
  return (
    <section
      aria-label="Clinic highlights"
      className="border-border/70 bg-card/50 border-y py-5 backdrop-blur"
    >
      <Marquee pauseOnHover className="[--duration:46s] [--gap:2.5rem]">
        {highlights.map((item) => (
          <span
            key={item}
            className="text-muted-foreground flex items-center gap-2 text-sm font-medium whitespace-nowrap"
          >
            <CircleCheck className="text-primary size-4" />
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
