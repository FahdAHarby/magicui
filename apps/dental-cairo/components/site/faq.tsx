import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { clinic, faqs, telLink, waLink } from "@/config/clinic";
import { MessageCircle, Phone } from "lucide-react";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="The questions patients ask before their first visit"
            description="Still unclear on something? Call the studio or send a WhatsApp — a human replies, usually within five minutes."
          />

          <div className="border-border/70 bg-card mt-8 flex flex-col gap-3 rounded-3xl border p-6">
            <p className="text-sm font-semibold">
              Prefer to just talk to someone?
            </p>
            <p className="text-muted-foreground text-sm">
              {clinic.emergencyLine} — 24/7 emergency line.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button asChild className="rounded-xl">
                <a href={telLink(clinic.emergencyLine)}>
                  <Phone className="size-4" />
                  Call the studio
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <a
                  href={waLink("Hi Nile Smile, I have a question about treatment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <BlurFade inView>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border-border/70 bg-card rounded-2xl border px-5 data-[state=open]:shadow-[0_24px_50px_-45px_rgba(15,23,42,0.75)]"
                >
                  <AccordionTrigger className="py-5 text-start text-[0.975rem] font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
