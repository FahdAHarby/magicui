import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { showcaseSource } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { ShowcaseCard } from "@/components/sections/showcase"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return showcaseSource.generateParams()
}

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getDocFromParams({ params }: PageProps) {
  const { slug } = await params
  const page = showcaseSource.getPage(slug)
  if (!page) notFound()
  const doc = page.data
  if (!doc.title || !doc.description) {
    notFound()
  }

  return { doc, page }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { doc, page } = await getDocFromParams({ params })

  if (!page) {
    return {}
  }

  const ogUrl = new URL(absoluteUrl("/og"))
  ogUrl.searchParams.set("title", doc.title ?? "")
  ogUrl.searchParams.set("description", doc.description ?? "")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
    },
  }
}

export default async function PagePage({ params }: PageProps) {
  const { doc, page } = await getDocFromParams({ params })

  return (
    <article className="section container max-w-3xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="eyebrow inline-flex items-center gap-2">
          <span className="bg-foreground/70 size-1 rounded-full" />
          Showcase
        </span>
        <h2 className="text-headline font-semibold text-balance">
          {doc.title}
        </h2>
        <p className="text-lead text-muted-foreground max-w-[52ch] text-balance">
          {doc.title} uses Magic UI to build their landing page.
        </p>
      </div>
      <Reveal y={20} className="mx-auto mt-12 max-w-xl">
        <ShowcaseCard
          title={doc.title ?? ""}
          href={doc.href ?? page.url}
          image={doc.image ?? ""}
          affiliation={doc.affiliation ?? ""}
        />
      </Reveal>
    </article>
  )
}
