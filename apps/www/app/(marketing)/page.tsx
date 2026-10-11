import { ComponentGallery } from "@/components/sections/component-gallery"
import { CTASection } from "@/components/sections/cta"
import { Hero } from "@/components/sections/hero"
import { Showcase } from "@/components/sections/showcase"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"
import { VideoTestimonials } from "@/components/sections/video-testimonials"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ComponentGallery />
      <Showcase />
      <Testimonials />
      <VideoTestimonials />
      <CTASection />
    </>
  )
}
