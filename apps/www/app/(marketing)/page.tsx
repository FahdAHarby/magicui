import type { Metadata } from "next"

import {
  calypsoMetadata,
  calypsoStructuredData,
  calypsoViewport,
} from "@/components/calypso/calypso-seo"
import { CalypsoSite } from "@/components/calypso/calypso-site"
import { MotionProvider } from "@/components/calypso/motion-provider"

export const metadata: Metadata = calypsoMetadata("/")
export const viewport = calypsoViewport

const structuredData = calypsoStructuredData("/")

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        href="/calypso/fonts/cormorant-garamond-latin-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/calypso/fonts/manrope-latin-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MotionProvider>
        <CalypsoSite />
      </MotionProvider>
    </>
  )
}
