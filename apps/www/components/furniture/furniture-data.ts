export interface FinishOption {
  id: string
  name: string
  swatchHex: string
  secondaryHex?: string
  materialNote: string
  priceDelta: number
}

export interface FurnitureProduct {
  id: string
  code: string
  name: string
  subtitle: string
  category: "Seating" | "Tables" | "Lighting" | "Objects"
  materialFamily:
    "Travertine" | "Timber" | "Bouclé & Linen" | "Alabaster & Bronze"
  edition: string
  editionTotal: number
  designer: string
  origin: string
  year: number
  basePrice: number
  dimensions: {
    width: number
    depth: number
    height: number
    seatHeight?: number
  }
  weightKg: number
  leadTimeWeeks: string
  image: string
  description: string
  architecturalNote: string
  sustainabilityNote: string
  finishes: FinishOption[]
  hotspot?: {
    x: number
    y: number
    roomLabel: string
  }
}

export const PRODUCTS: FurnitureProduct[] = [
  {
    id: "sora-monolith-lounge",
    code: "KF-041",
    name: "Sora Monolith Lounge",
    subtitle: "Sculptural Low-Slung Bouclé & Smoked Oak Armchair",
    category: "Seating",
    materialFamily: "Bouclé & Linen",
    edition: "ED. 07 / 40",
    editionTotal: 40,
    designer: "Kenji Takahashi",
    origin: "Kyoto / Copenhagen",
    year: 2026,
    basePrice: 6800,
    dimensions: {
      width: 94,
      depth: 102,
      height: 74,
      seatHeight: 37,
    },
    weightKg: 48,
    leadTimeWeeks: "6–8 Weeks",
    image: "/furniture/monolith-lounge.jpg",
    description:
      "Carved from a continuous organic volume, the Sora Monolith pairs an enveloping high-density Peruvian alpaca bouclé shell with a hand-planed charred oak plinth base.",
    architecturalNote:
      "Cantilevered internal mortise frame distributes weight without visible hardware, allowing the upholstery volume to float 18mm above the timber base.",
    sustainabilityNote:
      "100% undyed Peruvian alpaca-wool blend over natural latex and coconut coir core; FSC-certified Japanese Mizunara oak.",
    finishes: [
      {
        id: "ivory-alpaca",
        name: "Raw Ivory Alpaca & Smoked Oak",
        swatchHex: "#EAE4DC",
        secondaryHex: "#3D3028",
        materialNote:
          "Heavy 920gsm looped alpaca weave with hand-rubbed walnut oil oak",
        priceDelta: 0,
      },
      {
        id: "warm-travertine-linen",
        name: "Sand Belgian Linen & Yakisugi Ash",
        swatchHex: "#D2C5B4",
        secondaryHex: "#1E1B18",
        materialNote:
          "Unbleached Flanders flax linen over charred Yakisugi timber plinth",
        priceDelta: 350,
      },
      {
        id: "obsidian-wool",
        name: "Obsidian Karakorum Wool & Ebonized Oak",
        swatchHex: "#2B2927",
        secondaryHex: "#161412",
        materialNote:
          "Deep charcoal hand-spun mountain wool with iron-vinegar ebonized oak",
        priceDelta: 500,
      },
    ],
    hotspot: {
      x: 22,
      y: 62,
      roomLabel: "Foreground Left · Reading Alcove",
    },
  },
  {
    id: "vellum-travertine-plinth",
    code: "KF-042",
    name: "Vellum Travertine Plinth",
    subtitle: "Monolithic Chiseled Roman Travertine Center Table",
    category: "Tables",
    materialFamily: "Travertine",
    edition: "ED. 03 / 25",
    editionTotal: 25,
    designer: "Elena Rostova",
    origin: "Tivoli / Milan",
    year: 2026,
    basePrice: 9400,
    dimensions: {
      width: 145,
      depth: 115,
      height: 34,
    },
    weightKg: 165,
    leadTimeWeeks: "8–10 Weeks",
    image: "/furniture/travertine-table.jpg",
    description:
      "Excavated from a single block of Tivoli quarry Roman travertine, the Vellum Plinth contrasts a honed architectural top plane with hand-pitched brutalist rock-face edges.",
    architecturalNote:
      "Recessed shadow-gap base creates a levitating monolithic mass. Every open geological pore is left unfilled to celebrate the raw sedimentary strata.",
    sustainabilityNote:
      "Single-origin quarry offcut block from Tivoli, Italy; zero resin fillers, sealed only with breathable mineral silicate.",
    finishes: [
      {
        id: "tivoli-bone",
        name: "Raw Tivoli Bone Travertine",
        swatchHex: "#D8CBB8",
        secondaryHex: "#B5A48B",
        materialNote:
          "Vein-cut open-pore Roman travertine with hand-pitched perimeter",
        priceDelta: 0,
      },
      {
        id: "noce-travertine",
        name: "Warm Noce Walnut Travertine",
        swatchHex: "#9E846C",
        secondaryHex: "#6E5844",
        materialNote:
          "Deep earthy umber sedimentary stone with honed matte surface",
        priceDelta: 650,
      },
      {
        id: "silver-titanium",
        name: "Silver Quarry Travertine",
        swatchHex: "#B8B5AE",
        secondaryHex: "#7D7A74",
        materialNote:
          "Cool architectural grey-taupe strata withpronounced linear veining",
        priceDelta: 800,
      },
    ],
    hotspot: {
      x: 56,
      y: 77,
      roomLabel: "Center Stage · Salon Anchor",
    },
  },
  {
    id: "tectonic-pavilion-sofa",
    code: "KF-043",
    name: "Tectonic Pavilion Sofa",
    subtitle: "Modular Architectural Day-Sofa in Raw Linen & Walnut",
    category: "Seating",
    materialFamily: "Bouclé & Linen",
    edition: "ED. 05 / 30",
    editionTotal: 30,
    designer: "Søren Lindqvist",
    origin: "Copenhagen / Milan",
    year: 2026,
    basePrice: 14200,
    dimensions: {
      width: 280,
      depth: 108,
      height: 68,
      seatHeight: 36,
    },
    weightKg: 112,
    leadTimeWeeks: "8–12 Weeks",
    image: "/furniture/tectonic-sofa.jpg",
    description:
      "Designed for expansive architectural volumes, the Tectonic Pavilion Sofa combines low-slung asymmetric bench proportions with an integrated solid walnut and saddle leather architectural tray.",
    architecturalNote:
      "Modular interlocking bronze cleats allow reconfiguration between linear gallery seating and L-shaped conversation pit layouts.",
    sustainabilityNote:
      "GOTS-certified organic Belgian linen, RDS down-wrapped natural Talalay latex cushions, and vegetable-tanned Tuscan saddle leather.",
    finishes: [
      {
        id: "oatmeal-linen",
        name: "Oatmeal Belgian Linen & Smoked Walnut",
        swatchHex: "#DDD5C7",
        secondaryHex: "#4A3728",
        materialNote:
          "Heavy-weight slub linen with vegetable-tanned cognac leather tray",
        priceDelta: 0,
      },
      {
        id: "chalk-boucle",
        name: "Chalk Bouclé & Raw Travertine Side Slab",
        swatchHex: "#F2EFE9",
        secondaryHex: "#C9BCA8",
        materialNote:
          "Textured chalk wool bouclé paired with a honed stone side console",
        priceDelta: 1100,
      },
      {
        id: "umber-velvet",
        name: "Raw Umber Mohair & Blackened Bronze",
        swatchHex: "#6D5442",
        secondaryHex: "#231F1D",
        materialNote:
          " crushed Dutchkid mohair velvet with patinated bronze plinth",
        priceDelta: 1600,
      },
    ],
    hotspot: {
      x: 55,
      y: 51,
      roomLabel: "Rear Alcove · Architectural Bench",
    },
  },
  {
    id: "solstice-alabaster-totem",
    code: "KF-044",
    name: "Solstice Alabaster Totem",
    subtitle: "Carved Translucent Spanish Alabaster Floor Luminaire",
    category: "Lighting",
    materialFamily: "Alabaster & Bronze",
    edition: "ED. 12 / 60",
    editionTotal: 60,
    designer: "Clara Vance",
    origin: "Aragon / New York",
    year: 2026,
    basePrice: 4950,
    dimensions: {
      width: 28,
      depth: 28,
      height: 148,
    },
    weightKg: 64,
    leadTimeWeeks: "4–6 Weeks",
    image: "/furniture/alabaster-lamp.jpg",
    description:
      "Hollowed by hand from solid cylinders of Aragon gypsum alabaster and anchored in a bush-hammered travertine and patinated bronze plinth, casting an ethereal 2200K–3000K amber glow.",
    architecturalNote:
      "Internal rotary brass dimmer shifts color temperature from candlelit 2000K amber to 3000K gallery halogen warmth, illuminating the stone's natural geological clouding.",
    sustainabilityNote:
      "Modular replaceable high-CRI (98+) warm LED core engineered for a 75,000-hour lifecycle; zero adhesives used in stone assembly.",
    finishes: [
      {
        id: "amber-vein",
        name: "Amber Veined Alabaster & Raw Travertine Base",
        swatchHex: "#F3D5A8",
        secondaryHex: "#8C7D6B",
        materialNote:
          "Warm honey-veined translucent stone with bush-hammered limestone base",
        priceDelta: 0,
      },
      {
        id: "cloud-white",
        name: "Glacial Cloud Alabaster & Oil-Rubbed Bronze",
        swatchHex: "#F5F2EB",
        secondaryHex: "#2F2621",
        materialNote:
          "Pure milky alabaster paired with hand-patinated dark bronze plinth",
        priceDelta: 450,
      },
    ],
    hotspot: {
      x: 80,
      y: 49,
      roomLabel: "Right Column · Monolithic Luminaire",
    },
  },
  {
    id: "kanso-tension-console",
    code: "KF-045",
    name: "Kanso Tension Console",
    subtitle: "Yakisugi Charred Oak & Brushed Bronze Architectural Shelving",
    category: "Objects",
    materialFamily: "Timber",
    edition: "ED. 09 / 35",
    editionTotal: 35,
    designer: "Kenji Takahashi",
    origin: "Kyoto",
    year: 2026,
    basePrice: 7600,
    dimensions: {
      width: 210,
      depth: 42,
      height: 82,
    },
    weightKg: 72,
    leadTimeWeeks: "6–8 Weeks",
    image: "/furniture/kanso-shelving.jpg",
    description:
      "Inspired by traditional Japanese temple joinery, thick 65mm slabs of kiln-dried oak are compressed in pure structural tension by precision-turned solid bronze columns.",
    architecturalNote:
      "Assembles entirely through mechanical compression and knurled brass tension collars—no screws, glue, or welds—allowing effortless heirloom disassembly.",
    sustainabilityNote:
      "Traditional Shou Sugi Ban charring naturally preserves the timber against humidity and insects without synthetic lacquers.",
    finishes: [
      {
        id: "yakisugi-bronze",
        name: "Charred Yakisugi Oak & Aged Bronze",
        swatchHex: "#26221F",
        secondaryHex: "#8C6D46",
        materialNote:
          "Wire-brushed charred cypress-oak grain with warm brushed bronze rods",
        priceDelta: 0,
      },
      {
        id: "natural-walnut",
        name: "Heartwood American Walnut & Raw Brass",
        swatchHex: "#5C402E",
        secondaryHex: "#C5A059",
        materialNote:
          "Soap-finished heartwood walnut slabs with unlacquered architectural brass",
        priceDelta: 400,
      },
    ],
  },
  {
    id: "vesper-cantilever-daybed",
    code: "KF-046",
    name: "Vesper Cantilever Daybed",
    subtitle: "Full-Grain Saddle Leather & Blackened Bronze Gallery Daybed",
    category: "Seating",
    materialFamily: "Timber",
    edition: "ED. 04 / 20",
    editionTotal: 20,
    designer: "Søren Lindqvist",
    origin: "Copenhagen",
    year: 2026,
    basePrice: 11500,
    dimensions: {
      width: 205,
      depth: 88,
      height: 41,
      seatHeight: 35,
    },
    weightKg: 68,
    leadTimeWeeks: "8–10 Weeks",
    image: "/furniture/vesper-daybed.jpg",
    description:
      "An architectural meditation on horizon lines. Full-grain aniline saddle leather ages into a rich amber patina atop a hand-tensioned linen webbing deck and cantilevered bronze-walnut frame.",
    architecturalNote:
      "Equipped with a weighted cylindrical neck bolster secured by hand-stitched bridle leather straps and solid cast bronze buckles.",
    sustainabilityNote:
      "By-product Nordic pasture hides tanned solely with mimosa bark and quebracho plant extracts in a closed-loop tannery.",
    finishes: [
      {
        id: "cognac-saddle",
        name: "Cognac Aniline Leather & Smoked Walnut",
        swatchHex: "#8B4F2F",
        secondaryHex: "#2E231C",
        materialNote:
          "Unsealed full-grain saddle leather that develops a bespoke patina",
        priceDelta: 0,
      },
      {
        id: "espresso-bridle",
        name: "Espresso Bridle Leather & Blackened Steel",
        swatchHex: "#3A261E",
        secondaryHex: "#171717",
        materialNote:
          "Deep beeswax-burnished bridle hide over hot-rolled blackened steel",
        priceDelta: 550,
      },
    ],
  },
]

export interface AtelierLocation {
  id: string
  city: string
  district: string
  address: string
  coordinates: string
  architect: string
  currentExhibition: string
  hours: string
  phone: string
}

export const ATELIERS: AtelierLocation[] = [
  {
    id: "milan",
    city: "Milan",
    district: "Brera Design District",
    address: "Via Solferino 18, Cortile Interno, 20121 Milano MI",
    coordinates: "45.4773° N, 9.1885° E",
    architect: "Restored 17th-Century Convent Cloister",
    currentExhibition: "Monolith & Void: Roman Travertine Studies N° 04",
    hours: "Tue – Sat · 10:00 – 19:00 CET (By Appointment)",
    phone: "+39 02 8942 7104",
  },
  {
    id: "kyoto",
    city: "Kyoto",
    district: "Nakagyo Ward",
    address: "Sanjo-dori Tominokoji Nishi-iru, Nakagyo-ku, Kyoto 604-8083",
    coordinates: "35.0086° N, 135.7654° E",
    architect: "1920s Machiya Timber Joinery Sanctuary",
    currentExhibition: "Yakisugi & Shadow: Tactile Timber Forms",
    hours: "Wed – Sun · 11:00 – 18:00 JST (By Appointment)",
    phone: "+81 75 221 9048",
  },
  {
    id: "copenhagen",
    city: "Copenhagen",
    district: "Frederiksstaden",
    address: "Bredgade 45, Baghuset, 1260 København K",
    coordinates: "55.6838° N, 12.5902° E",
    architect: "Neoclassical Chalkstone Gallery",
    currentExhibition: "Nordic Tectonics: Linen, Hide & Raw Bronze",
    hours: "Tue – Sat · 10:00 – 18:00 CET (Open Gallery & Trade)",
    phone: "+45 33 14 82 90",
  },
  {
    id: "new-york",
    city: "New York",
    district: "SoHo Cast-Iron Historic District",
    address: "142 Mercer Street, 3rd Floor Loft, New York, NY 10012",
    coordinates: "40.7248° N, 74.0002° W",
    architect: "1894 Cast-Iron & Limewash Penthouse Salon",
    currentExhibition: "Archive Collection N° 04: North American Debut",
    hours: "Mon – Sat · 10:00 – 18:30 EST (By Appointment)",
    phone: "+1 (212) 966-4810",
  },
]

export const PRESS_QUOTES = [
  {
    publication: "ARCHITECTURAL DIGEST",
    quote:
      "“KŌBO // FORMA dissolves the boundary between collectible brutalist sculpture and deeply livable domestic sanctuary.”",
    author: "Elena Vance, Milan Salone Issue",
    location: "Milan",
  },
  {
    publication: "WALLPAPER*",
    quote:
      "“The Vellum Travertine Plinth and Sora Lounge represent the pinnacle of quiet architectural materialism in 2026.”",
    author: "Best Collectible Design Edit",
    location: "London",
  },
  {
    publication: "KINFOLK",
    quote:
      "“Every mortise joint and open stone pore rewards slow contemplation. Furniture conceived not for seasons, but for centuries.”",
    author: "Issue 58 — Architecture of Stillness",
    location: "Copenhagen",
  },
  {
    publication: "DEZEEN",
    quote:
      "“By pairing traditional Japanese Yakisugi timber tension with raw Italian travertine, the atelier has forged a new design lexicon.”",
    author: "Collectible Design Review",
    location: "Tokyo",
  },
  {
    publication: "STUDIO HERZOG & PARTNER",
    quote:
      "“We specify KŌBO pieces as the gravitational anchor for our private residential pavilions in Zurich and Kyoto.”",
    author: "Lukas Herzog, Principal Architect",
    location: "Zurich",
  },
]
