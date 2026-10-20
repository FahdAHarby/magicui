import type { Metadata } from "next"

import { ConceptFurnitureSite } from "@/components/furniture/concept-furniture-site"

export const metadata: Metadata = {
  title: "KŌBO // FORMA — Architectural Furniture Archive",
  description:
    "Collectible monolithic furniture and spatial objects crafted from raw Tivoli travertine, charred Yakisugi oak, and Peruvian alpaca bouclé. A Magic UI concept.",
}

export default function KoboPage() {
  return <ConceptFurnitureSite />
}
