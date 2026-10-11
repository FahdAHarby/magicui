import { showcaseSource } from "@/lib/source"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { ShowcaseCard } from "@/components/sections/showcase"

export default function Page() {
  const showcases = showcaseSource.getPages()

  return (
    <article className="section container">
      <SectionHeading
        eyebrow="Showcase"
        title="Sites built with Magic UI"
        description="Landing pages, dashboards and portfolios from teams who started with a component and kept going."
      />

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {showcases.map((showcase, index) => (
          <Reveal key={showcase.url} y={18} delay={(index % 3) * 0.06}>
            <ShowcaseCard
              href={showcase.url}
              title={showcase.data.title ?? ""}
              image={showcase.data.image ?? ""}
              affiliation={showcase.data.affiliation ?? ""}
            />
          </Reveal>
        ))}
      </div>
    </article>
  )
}
