import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { SectionHeading } from "@/components/site/section-heading";
import { clinic, testimonials, type Testimonial } from "@/config/clinic";
import { cn } from "@/lib/utils";

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="border-border/70 bg-card flex w-[19rem] flex-col gap-4 rounded-2xl border p-5 shadow-[0_20px_45px_-45px_rgba(15,23,42,0.7)]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} className="fill-gold text-gold size-3.5" />
          ))}
        </div>
        <Quote className="text-primary/30 size-5" />
      </div>
      <blockquote className="text-muted-foreground flex-1 text-sm leading-relaxed">
        “{review.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t pt-4">
        <Image
          src={review.image}
          alt={`${review.name}, patient at Nile Smile Dental Studio`}
          width={96}
          height={96}
          sizes="48px"
          className="size-10 rounded-full object-cover object-[center_22%]"
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-muted-foreground text-xs">
            {review.area} · {review.treatment}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

const columns = [
  { reviews: testimonials.slice(0, 2), reverse: false, duration: "32s" },
  { reviews: testimonials.slice(2, 4), reverse: true, duration: "38s" },
  { reviews: testimonials.slice(4, 6), reverse: false, duration: "34s" },
];

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Reviews"
          title="1,284 reviews, and a rating we protect fiercely"
          description="Real patients from New Cairo, Maadi, Zamalek and Sheikh Zayed. We publish the good and the awkward ones — it keeps us sharp."
        />

        <BlurFade inView delay={0.05}>
          <div className="border-border/70 bg-card mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border p-6 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-5">
              <div>
                <p className="text-4xl font-semibold tracking-tight">
                  <NumberTicker
                    value={clinic.rating}
                    decimalPlaces={1}
                    className="text-foreground"
                  />
                </p>
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="fill-gold text-gold size-4" />
                  ))}
                </div>
              </div>
              <div className="border-border border-s ps-5">
                <p className="text-sm font-semibold">Google Reviews</p>
                <p className="text-muted-foreground text-xs">
                  {clinic.reviewCount.toLocaleString("en-US")} verified reviews
                  across both studios
                </p>
              </div>
            </div>

            <div className="bg-muted/60 flex flex-col items-center gap-3 rounded-2xl px-5 py-4 text-center sm:flex-row sm:text-left">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 4).map((review) => (
                  <Image
                    key={review.name}
                    src={review.image}
                    alt=""
                    width={80}
                    height={80}
                    sizes="40px"
                    className="border-background size-10 rounded-full border-2 object-cover object-[center_22%]"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-xs">
                Join{" "}
                <span className="text-foreground font-semibold">
                  {clinic.patients.toLocaleString("en-US")}+
                </span>{" "}
                patients treated
                <br />
                since 2007
              </p>
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
        <div className="grid grid-cols-1 justify-center gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, index) => (
            <div
              key={index}
              className={cn(
                "relative h-[34rem] overflow-hidden",
                index === 1 ? "hidden md:block" : "",
                index === 2 ? "hidden lg:block" : ""
              )}
            >
              <Marquee
                vertical
                repeat={4}
                reverse={column.reverse}
                pauseOnHover
                className="h-full [--gap:1.25rem] p-0"
                style={
                  { "--duration": column.duration } as React.CSSProperties
                }
              >
                {column.reviews.map((review, reviewIndex) => (
                  <ReviewCard
                    key={`${review.name}-${reviewIndex}`}
                    review={review}
                  />
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
