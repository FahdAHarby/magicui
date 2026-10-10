import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Booking } from "@/components/site/booking";
import { Coverage } from "@/components/site/coverage";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Locations } from "@/components/site/locations";
import { MobileActionBar, WhatsAppBubble } from "@/components/site/mobile-action-bar";
import { Pricing } from "@/components/site/pricing";
import { Process } from "@/components/site/process";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Technology } from "@/components/site/technology";
import { Testimonials } from "@/components/site/testimonials";
import { Treatments } from "@/components/site/treatments";
import { TrustStrip } from "@/components/site/trust-strip";

export default function HomePage() {
  return (
    <div className="relative">
      <ScrollProgress className="h-0.5 from-primary via-mint to-primary z-[60] bg-linear-to-r" />
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Treatments />
        <Process />
        <Technology />
        <Pricing />
        <Testimonials />
        <Coverage />
        <Locations />
        <Faq />
        <Booking />
      </main>
      <SiteFooter />
      <MobileActionBar />
      <WhatsAppBubble />
    </div>
  );
}
