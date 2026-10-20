import type { Metadata, Viewport } from "next"

import { absoluteUrl } from "@/lib/utils"
import { CONTACT } from "@/components/calypso/calypso-data"
import { CalypsoSite } from "@/components/calypso/calypso-site"
import { MotionProvider } from "@/components/calypso/motion-provider"

const title = "Calypso Café & Restaurant — Cairo"
const description =
  "Mezze made each morning, charcoal grill, Turkish coffee and shisha on the terrace. A homey corner of Cairo on the Chill Out El Kafrawi Axis — open daily from 09:00."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Calypso Cairo",
    "café Cairo",
    "restaurant El Kafrawi",
    "shisha terrace Cairo",
    "mezze Cairo",
    "Egyptian grill",
  ],
  alternates: {
    canonical: absoluteUrl("/calypso"),
  },
  icons: {
    icon: [{ url: "/calypso/icon.svg", type: "image/svg+xml" }],
    apple: [
      {
        url: "/calypso/apple-icon.png",
        type: "image/png",
        sizes: "256x256",
      },
    ],
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: absoluteUrl("/calypso"),
    siteName: "Calypso Café & Restaurant",
    locale: "en_EG",
    images: [
      {
        url: absoluteUrl("/calypso/og-cover.jpg"),
        width: 1200,
        height: 630,
        alt: "The Calypso terrace at dusk with rattan chairs and string lights over the Nile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/calypso/og-cover.jpg")],
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F7F2E8",
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Calypso Café & Restaurant",
  description,
  url: absoluteUrl("/calypso"),
  telephone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  priceRange: "$$",
  servesCuisine: ["Egyptian", "Middle Eastern", "Café"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chill Out El Kafrawi Axis",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  sameAs: [CONTACT.instagramHref, CONTACT.facebookHref],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "01:00",
    },
  ],
  hasMenu: `${absoluteUrl("/calypso")}#menu`,
  acceptsReservations: true,
}

export default function CalypsoPage() {
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
