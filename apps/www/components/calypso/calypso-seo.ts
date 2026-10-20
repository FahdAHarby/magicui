import type { Metadata, Viewport } from "next"

import { absoluteUrl } from "@/lib/utils"

import { CONTACT } from "./calypso-data"

const title = "Calypso Café & Restaurant — Cairo"
const description =
  "Mezze made each morning, charcoal grill, Turkish coffee and shisha on the terrace. A homey corner of Cairo on the Chill Out El Kafrawi Axis — open daily from 09:00."

export const calypsoViewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F7F2E8",
}

export function calypsoMetadata(path = "/"): Metadata {
  return {
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
      canonical: absoluteUrl(path),
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
      url: absoluteUrl(path),
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
}

export function calypsoStructuredData(path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Calypso Café & Restaurant",
    description,
    url: absoluteUrl(path),
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
    hasMenu: `${absoluteUrl(path)}#menu`,
    acceptsReservations: true,
  }
}
