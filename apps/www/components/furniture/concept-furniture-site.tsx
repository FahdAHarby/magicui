"use client"

import React, { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import confetti from "canvas-confetti"
import {
  Award,
  Calendar,
  Download,
  Eye,
  Flame,
  Globe,
  Layers,
  Minus,
  Plus,
  Ruler,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ZoomIn,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AnimatedShinyText } from "@/registry/magicui/animated-shiny-text"
import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler"
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"
import { BlurFade } from "@/registry/magicui/blur-fade"
import { BorderBeam } from "@/registry/magicui/border-beam"
import { GlareHover } from "@/registry/magicui/glare-hover"
import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button"
import { Lens } from "@/registry/magicui/lens"
import { MagicCard } from "@/registry/magicui/magic-card"
import { Marquee } from "@/registry/magicui/marquee"
import { NumberTicker } from "@/registry/magicui/number-ticker"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/magicui/scroll-based-velocity"
import { ScrollProgress } from "@/registry/magicui/scroll-progress"
import { ShimmerButton } from "@/registry/magicui/shimmer-button"
import { WordRotate } from "@/registry/magicui/word-rotate"

import {
  BespokeConfigurator,
  type CustomCommissionItem,
} from "./bespoke-configurator"
import {
  ATELIERS,
  PRESS_QUOTES,
  PRODUCTS,
  type FinishOption,
  type FurnitureProduct,
} from "./furniture-data"

interface StandardDossierItem {
  id: string
  productId: string
  name: string
  code: string
  image: string
  finishName: string
  dimensionsText: string
  edition: string
  unitPrice: number
  leadTime: string
  quantity: number
  isCustomCommission: false
}

type DossierItem = StandardDossierItem | CustomCommissionItem

type LightingMood = {
  id: "daylight" | "golden" | "chiaroscuro" | "nocturne"
  label: string
  kelvin: string
  overlayClass: string
  description: string
}

const LIGHTING_MOODS: LightingMood[] = [
  {
    id: "daylight",
    label: "Mediterranean Noon",
    kelvin: "5200K · Natural Zenital",
    overlayClass: "bg-transparent",
    description:
      "Crisp natural daylight revealing the raw calcium carbonate pores of Tivoli travertine and undyed alpaca fleece.",
  },
  {
    id: "golden",
    label: "Golden Hour",
    kelvin: "3200K · Raking Amber",
    overlayClass: "bg-amber-600/18 mix-blend-multiply",
    description:
      "Low-angle afternoon sun casting long architectural shadows across limewash plaster and warm smoked oak.",
  },
  {
    id: "chiaroscuro",
    label: "Gallery Spotlight",
    kelvin: "2700K · Museum Halogen",
    overlayClass:
      "bg-[radial-gradient(circle_at_56%_65%,transparent_20%,rgba(12,10,9,0.55)_85%)]",
    description:
      "Focused museum beam isolating sculptural silhouettes against deep shadow.",
  },
  {
    id: "nocturne",
    label: "Alabaster Nocturne",
    kelvin: "2200K · Candlelit Totem",
    overlayClass:
      "bg-[radial-gradient(circle_at_80%_49%,rgba(245,158,11,0.22)_5%,rgba(10,9,8,0.68)_75%)]",
    description:
      "Evening salon illuminated primarily by the internal amber glow of the Solstice Alabaster Totem.",
  },
]

const CATEGORIES = ["All", "Seating", "Tables", "Lighting", "Objects"] as const

export function ConceptFurnitureSite() {
  // Interactive Hero State
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    "vellum-travertine-plinth"
  )
  const [lightingMood, setLightingMood] = useState<LightingMood>(
    LIGHTING_MOODS[0]
  )

  // Catalog Filter & Tactile Lens State
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"curated" | "price-asc" | "price-desc">(
    "curated"
  )
  const [lensEnabled, setLensEnabled] = useState<boolean>(true)
  const [selectedFinishes, setSelectedFinishes] = useState<
    Record<string, FinishOption>
  >(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.finishes[0]])))

  // Quick-view Blueprint Modal State
  const [quickViewProduct, setQuickViewProduct] =
    useState<FurnitureProduct | null>(null)

  // Private Viewing Appointment Modal State
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const [selectedAtelier, setSelectedAtelier] = useState(ATELIERS[0])
  const [visitorName, setVisitorName] = useState("")
  const [visitorEmail, setVisitorEmail] = useState("")
  const [visitorPractice, setVisitorPractice] = useState("")
  const [preferredDate, setPreferredDate] = useState("2026-11-04")

  // Collector Dossier (Cart) State
  const [dossierOpen, setDossierOpen] = useState(false)
  const [dossierItems, setDossierItems] = useState<DossierItem[]>([
    {
      id: "sora-monolith-lounge-ivory-alpaca",
      productId: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      code: PRODUCTS[0].code,
      image: PRODUCTS[0].image,
      finishName: PRODUCTS[0].finishes[0].name,
      dimensionsText: `W ${PRODUCTS[0].dimensions.width} × D ${PRODUCTS[0].dimensions.depth} × H ${PRODUCTS[0].dimensions.height} cm`,
      edition: PRODUCTS[0].edition,
      unitPrice: PRODUCTS[0].basePrice,
      leadTime: PRODUCTS[0].leadTimeWeeks,
      quantity: 1,
      isCustomCommission: false,
    },
  ])
  const [collectorNote, setCollectorNote] = useState("")

  const activeHotspotProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === activeHotspotId) ?? PRODUCTS[1],
    [activeHotspotId]
  )

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === "All" || product.category === selectedCategory
      const q = searchQuery.trim().toLowerCase()
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.materialFamily.toLowerCase().includes(q) ||
        product.designer.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.basePrice - b.basePrice
      if (sortBy === "price-desc") return b.basePrice - a.basePrice
      return 0
    })
  }, [selectedCategory, searchQuery, sortBy])

  const totalDossierCount = useMemo(
    () => dossierItems.reduce((sum, item) => sum + item.quantity, 0),
    [dossierItems]
  )

  const totalDossierValue = useMemo(
    () =>
      dossierItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      ),
    [dossierItems]
  )

  const addProductToDossier = (
    product: FurnitureProduct,
    customFinish?: FinishOption
  ) => {
    const finish =
      customFinish ?? selectedFinishes[product.id] ?? product.finishes[0]
    const itemKey = `${product.id}-${finish.id}`
    const unitPrice = product.basePrice + finish.priceDelta

    setDossierItems((prev) => {
      const existing = prev.find((i) => i.id === itemKey)
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          name: product.name,
          code: product.code,
          image: product.image,
          finishName: finish.name,
          dimensionsText: `W ${product.dimensions.width} × D ${product.dimensions.depth} × H ${product.dimensions.height} cm`,
          edition: product.edition,
          unitPrice,
          leadTime: product.leadTimeWeeks,
          quantity: 1,
          isCustomCommission: false,
        },
      ]
    })

    toast.success(`${product.name} added to Collector Dossier`, {
      description: `${finish.name} · $${unitPrice.toLocaleString()}`,
      action: {
        label: "Open Dossier",
        onClick: () => setDossierOpen(true),
      },
    })
  }

  const handleAddCustomCommission = (commission: CustomCommissionItem) => {
    setDossierItems((prev) => [...prev, commission])
    setDossierOpen(true)
    toast.success(`${commission.name} added to Collector Dossier`, {
      description: `${commission.structureName} · ${commission.scaleName} ($${commission.unitPrice.toLocaleString()})`,
    })
  }

  const updateItemQuantity = (id: string, delta: number) => {
    setDossierItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleExportSpecSheet = () => {
    const lines = [
      "======================================================================",
      "KŌBO // FORMA — ARCHITECTURAL FURNITURE ARCHIVE N° 04",
      "COLLECTOR & ARCHITECTURAL SPECIFICATION DOSSIER",
      `GENERATED: ${new Date().toISOString().slice(0, 10)}`,
      "ATELIERS: MILAN · KYOTO · COPENHAGEN · NEW YORK",
      "======================================================================",
      "",
      ...dossierItems.map((item, idx) => {
        if (item.isCustomCommission) {
          return [
            `0${idx + 1}. [${item.code}] ${item.name} (BESPOKE COMMISSION)`,
            `    Structure : ${item.structureName}`,
            `    Surface   : ${item.surfaceName}`,
            `    Scale     : ${item.scaleName} (${item.dimensionsText})`,
            `    Engraving : ${item.monogram}`,
            `    Lead Time : ${item.leadTime}`,
            `    Valuation : $${item.unitPrice.toLocaleString()} × ${item.quantity} = $${(item.unitPrice * item.quantity).toLocaleString()}`,
            "",
          ].join("\n")
        }
        return [
          `0${idx + 1}. [${item.code}] ${item.name} (${item.edition})`,
          `    Finish     : ${item.finishName}`,
          `    Dimensions : ${item.dimensionsText}`,
          `    Lead Time  : ${item.leadTime}`,
          `    Valuation  : $${item.unitPrice.toLocaleString()} × ${item.quantity} = $${(item.unitPrice * item.quantity).toLocaleString()}`,
          "",
        ].join("\n")
      }),
      "----------------------------------------------------------------------",
      `TOTAL COLLECTOR VALUATION: $${totalDossierValue.toLocaleString()} USD`,
      "Includes museum-grade crating & white-glove architectural placement.",
      collectorNote ? `ARCHITECTURAL NOTES: ${collectorNote}` : "",
      "======================================================================",
    ]

    const blob = new Blob([lines.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "KOBO-FORMA-Specification-Dossier.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Architectural Spec Sheet downloaded")
  }

  const handleCompleteAcquisition = () => {
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.6 },
      colors: ["#d97706", "#a8a29e", "#f5f5f4", "#78350f"],
    })
    toast.success("Dossier Registered with Milan & Kyoto Ateliers", {
      description: `Reference #KF-${Math.floor(100000 + Math.random() * 900000)} · Senior Archivist will contact you within 4 hours.`,
    })
    setDossierOpen(false)
  }

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.65 },
      colors: ["#d97706", "#d6d3d1", "#292524"],
    })
    toast.success(`Private Salon Viewing Confirmed — ${selectedAtelier.city}`, {
      description: `${preferredDate} · Confirmation sent to ${visitorEmail || "your studio"}`,
    })
    setAppointmentOpen(false)
  }

  const hotspotProducts = useMemo(
    () => PRODUCTS.filter((p) => p.hotspot !== undefined),
    []
  )

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-stone-900 selection:bg-amber-900 selection:text-amber-50 dark:bg-[#0E0D0C] dark:text-stone-100">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress className="h-[2.5px] bg-linear-to-r from-amber-700 via-stone-500 to-amber-500" />

      {/* Top Exhibition Announcement Bar */}
      <div className="border-b border-stone-300/70 bg-stone-900 px-4 py-2 text-center font-mono text-[11px] tracking-[0.2em] text-stone-200 uppercase dark:border-stone-800 dark:bg-stone-950">
        <span>
          ARCHIVE COLLECTION N° 04 · MONOLITH &amp; VOID · MILAN / KYOTO /
          COPENHAGEN / NEW YORK
        </span>
      </div>

      {/* Sticky Architectural Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-stone-300/70 bg-[#F7F4EF]/85 backdrop-blur-xl dark:border-stone-800/80 dark:bg-[#0E0D0C]/85">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <a href="#top" className="group flex flex-col">
              <span className="font-serif text-2xl font-normal tracking-[0.18em] text-stone-900 dark:text-stone-100">
                KŌBO{" "}
                <span className="text-amber-700 dark:text-amber-500">
                  {"//"}
                </span>{" "}
                FORMA
              </span>
              <span className="font-mono text-[9px] tracking-[0.28em] text-stone-500 uppercase dark:text-stone-400">
                Architectural Furniture Archive
              </span>
            </a>

            <nav className="hidden items-center gap-7 pl-4 text-xs font-medium tracking-[0.15em] text-stone-600 uppercase lg:flex dark:text-stone-400">
              <a
                href="#spatial-salon"
                className="transition-colors hover:text-stone-950 dark:hover:text-white"
              >
                Spatial Salon
              </a>
              <a
                href="#collection"
                className="transition-colors hover:text-stone-950 dark:hover:text-white"
              >
                Archive N° 04
              </a>
              <a
                href="#bespoke-atelier"
                className="transition-colors hover:text-stone-950 dark:hover:text-white"
              >
                Bespoke Studio
              </a>
              <a
                href="#material-philosophy"
                className="transition-colors hover:text-stone-950 dark:hover:text-white"
              >
                Materiality
              </a>
              <a
                href="#ateliers"
                className="transition-colors hover:text-stone-950 dark:hover:text-white"
              >
                Ateliers
              </a>
            </nav>
          </div>

          {/* Right Utility Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/docs/components"
              className="hidden items-center gap-1.5 rounded-full border border-stone-300/90 bg-white/60 px-3 py-1.5 font-mono text-[10px] tracking-wider text-stone-700 uppercase transition-colors hover:border-stone-500 xl:inline-flex dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300"
            >
              <Sparkles className="size-3 text-amber-600" />
              Magic UI Registry
            </Link>

            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-stone-300 bg-transparent px-4 py-2 text-xs font-medium tracking-wider text-stone-800 uppercase transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-stone-50 sm:inline-flex dark:border-stone-700 dark:text-stone-200 dark:hover:border-stone-200 dark:hover:bg-stone-100 dark:hover:text-stone-900"
            >
              <Calendar className="size-3.5" />
              Private Viewing
            </button>

            <AnimatedThemeToggler
              variant="circle"
              duration={550}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white/80 text-stone-800 transition-colors hover:border-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 [&>svg]:size-4"
            />

            <button
              type="button"
              onClick={() => setDossierOpen(true)}
              className="relative flex items-center gap-2.5 rounded-full bg-stone-900 px-4 py-2.5 text-xs font-medium tracking-wider text-stone-50 uppercase transition-transform active:scale-95 dark:bg-stone-100 dark:text-stone-900"
            >
              <ShoppingBag className="size-3.5" />
              <span className="hidden sm:inline">Dossier</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-amber-600 font-mono text-[11px] font-bold text-white">
                {totalDossierCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 1. HERO SECTION & INTERACTIVE SPATIAL SALON STAGE                   */}
      {/* =================================================================== */}
      <section id="top" className="relative pt-10 pb-20 lg:pt-16 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Editorial Hero Header */}
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <BlurFade delay={0.05} inView>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300/90 bg-white/80 px-4 py-1.5 shadow-2xs backdrop-blur-xs dark:border-stone-800 dark:bg-stone-900/80">
                  <span className="size-2 rounded-full bg-amber-600" />
                  <AnimatedShinyText className="font-mono text-[11px] tracking-[0.2em] text-stone-800 uppercase dark:text-stone-200">
                    COLLECTIBLE ARCHITECTURAL OBJECTS · EDITION 2026
                  </AnimatedShinyText>
                </div>
              </BlurFade>

              <BlurFade delay={0.12} inView>
                <h1 className="font-serif text-5xl leading-[1.04] font-normal tracking-tight text-stone-950 sm:text-6xl lg:text-7xl dark:text-stone-50">
                  Furniture Conceived as{" "}
                  <span className="inline-block align-bottom text-amber-800 italic dark:text-amber-400">
                    <WordRotate
                      words={[
                        "Monolithic",
                        "Sculptural",
                        "Tactile",
                        "Timeless",
                      ]}
                      duration={2600}
                      className="font-serif text-5xl leading-[1.04] font-normal tracking-tight sm:text-6xl lg:text-7xl"
                    />
                  </span>{" "}
                  Architecture.
                </h1>
              </BlurFade>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:col-span-4">
              <BlurFade delay={0.2} inView>
                <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400">
                  Hand-quarried Tivoli travertine, kiln-charred Yakisugi oak,
                  and undyed Peruvian alpaca bouclé. Numbered editions crafted
                  for contemplative living spaces.
                </p>
              </BlurFade>

              <BlurFade delay={0.28} inView>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#collection">
                    <ShimmerButton
                      background="#1c1917"
                      shimmerColor="#f59e0b"
                      className="px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase"
                    >
                      Explore Archive N° 04
                    </ShimmerButton>
                  </a>
                  <a href="#bespoke-atelier">
                    <InteractiveHoverButton className="border-stone-300 bg-white/80 py-2.5 text-xs tracking-wider text-stone-900 uppercase dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100">
                      Bespoke Studio
                    </InteractiveHoverButton>
                  </a>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Interactive Spatial Salon Stage */}
          <BlurFade delay={0.32} inView>
            <div
              id="spatial-salon"
              className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12"
            >
              {/* Main Interactive Room Image with Hotspots & Lighting Simulator */}
              <div className="relative overflow-hidden rounded-2xl border border-stone-300/90 bg-stone-900 shadow-2xl lg:col-span-8 dark:border-stone-800">
                <BorderBeam
                  size={280}
                  duration={12}
                  colorFrom="#d97706"
                  colorTo="#a8a29e"
                  borderWidth={1.5}
                />

                {/* Top Salon Controls Overlay */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-stone-950/85 px-4 py-3 text-xs text-stone-200 backdrop-blur-md sm:px-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block size-2 animate-pulse rounded-full bg-amber-400" />
                    <span className="font-mono text-[11px] tracking-widest uppercase">
                      INTERACTIVE SALON PAVILION · CLICK HOTSPOTS TO INSPECT
                    </span>
                  </div>

                  {/* Ambient Lighting Simulator Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 hidden font-mono text-[10px] text-stone-400 uppercase sm:inline">
                      Luminance:
                    </span>
                    {LIGHTING_MOODS.map((mood) => {
                      const active = mood.id === lightingMood.id
                      return (
                        <button
                          key={mood.id}
                          type="button"
                          onClick={() => setLightingMood(mood)}
                          className={cn(
                            "rounded-full px-2.5 py-1 font-mono text-[10px] transition-all",
                            active
                              ? "bg-amber-500 font-semibold text-stone-950 shadow-xs"
                              : "bg-white/10 text-stone-300 hover:bg-white/20"
                          )}
                        >
                          {mood.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Salon Photograph & Hotspots */}
                <div className="relative aspect-[16/10] w-full overflow-hidden select-none">
                  <Image
                    src="/furniture/hero-salon.jpg"
                    alt="KŌBO // FORMA Architectural Salon Pavilion"
                    fill
                    priority
                    className={cn(
                      "object-cover transition-all duration-700",
                      lightingMood.id === "nocturne" &&
                        "brightness-75 contrast-115",
                      lightingMood.id === "chiaroscuro" &&
                        "brightness-90 contrast-110",
                      lightingMood.id === "golden" && "sepia-[.12]"
                    )}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />

                  {/* Dynamic Lighting Mood Overlay */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 transition-all duration-700",
                      lightingMood.overlayClass
                    )}
                  />

                  {/* Interactive Furniture Hotspots */}
                  {hotspotProducts.map((item) => {
                    if (!item.hotspot) return null
                    const isSelected = item.id === activeHotspotProduct.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveHotspotId(item.id)}
                        style={{
                          left: `${item.hotspot.x}%`,
                          top: `${item.hotspot.y}%`,
                        }}
                        aria-label={`Inspect ${item.name}`}
                        className="group/spot absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                      >
                        <span
                          className={cn(
                            "absolute -inset-2.5 animate-ping rounded-full opacity-70",
                            isSelected ? "bg-amber-400" : "bg-white/80"
                          )}
                        />
                        <span
                          className={cn(
                            "relative flex size-8 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold shadow-xl transition-transform duration-300 group-hover/spot:scale-115",
                            isSelected
                              ? "scale-115 border-white bg-amber-600 text-white"
                              : "border-white/90 bg-stone-950/80 text-white backdrop-blur-md"
                          )}
                        >
                          +
                        </span>
                        <span
                          className={cn(
                            "pointer-events-none absolute left-1/2 mt-2 -translate-x-1/2 rounded-full border border-white/20 bg-stone-950/90 px-3 py-1 font-mono text-[10px] whitespace-nowrap text-stone-100 shadow-lg backdrop-blur-md transition-all",
                            isSelected
                              ? "translate-y-0 opacity-100"
                              : "translate-y-1 opacity-0 group-hover/spot:translate-y-0 group-hover/spot:opacity-100"
                          )}
                        >
                          {item.name} · ${item.basePrice.toLocaleString()}
                        </span>
                      </button>
                    )
                  })}

                  {/* Bottom Atmospheric Status Bar */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/80 via-black/40 to-transparent px-5 py-4 text-xs text-stone-200">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-amber-300 uppercase">
                        {lightingMood.kelvin}
                      </span>
                      <p className="mt-0.5 line-clamp-1 max-w-xl text-xs text-stone-200/90">
                        {lightingMood.description}
                      </p>
                    </div>
                    <span className="hidden font-mono text-[10px] text-stone-300 sm:inline">
                      VILLA SOLFERINO PAVILION
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Live Spatial Hotspot Inspector Card */}
              <div className="flex flex-col justify-between rounded-2xl border border-stone-300/90 bg-white/90 p-6 shadow-xl backdrop-blur-md lg:col-span-4 dark:border-stone-800 dark:bg-stone-900/90">
                <div>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 dark:border-stone-800">
                    <span className="font-mono text-[11px] font-semibold tracking-widest text-amber-800 uppercase dark:text-amber-400">
                      SPATIAL INSPECTOR // {activeHotspotProduct.code}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] tracking-wider"
                    >
                      {activeHotspotProduct.edition}
                    </Badge>
                  </div>

                  {/* Selected Piece Thumbnail & Overview */}
                  <div className="mt-4 flex items-center gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
                      <Image
                        src={activeHotspotProduct.image}
                        alt={activeHotspotProduct.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-stone-500 uppercase dark:text-stone-400">
                        {activeHotspotProduct.hotspot?.roomLabel}
                      </div>
                      <h2 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100">
                        {activeHotspotProduct.name}
                      </h2>
                      <div className="text-xs text-stone-500 dark:text-stone-400">
                        Designed by {activeHotspotProduct.designer}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                    {activeHotspotProduct.description}
                  </p>

                  {/* Quick Hotspot Selector Pills */}
                  <div className="mt-5">
                    <span className="mb-2 block font-mono text-[10px] tracking-widest text-stone-400 uppercase">
                      Switch Piece in Salon View:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {hotspotProducts.map((hp) => (
                        <button
                          key={hp.id}
                          type="button"
                          onClick={() => setActiveHotspotId(hp.id)}
                          className={cn(
                            "truncate rounded-lg border px-2.5 py-1.5 text-left text-xs transition-all",
                            hp.id === activeHotspotProduct.id
                              ? "border-stone-900 bg-stone-900 font-medium text-white dark:border-amber-400 dark:bg-stone-800"
                              : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
                          )}
                        >
                          {hp.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions & Specs Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-xl bg-stone-100/80 p-3.5 font-mono text-xs dark:bg-stone-950/80">
                    <div>
                      <span className="block text-[10px] text-stone-400">
                        DIMENSIONS
                      </span>
                      <span className="text-stone-900 dark:text-stone-100">
                        {activeHotspotProduct.dimensions.width} ×{" "}
                        {activeHotspotProduct.dimensions.depth} ×{" "}
                        {activeHotspotProduct.dimensions.height} cm
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-400">
                        MASS / ORIGIN
                      </span>
                      <span className="text-stone-900 dark:text-stone-100">
                        {activeHotspotProduct.weightKg} kg ·{" "}
                        {activeHotspotProduct.origin.split("/")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Valuation & Actions */}
                <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-mono text-[11px] text-stone-500 uppercase dark:text-stone-400">
                      Gallery Edition Price
                    </span>
                    <span className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                      ${activeHotspotProduct.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setQuickViewProduct(activeHotspotProduct)}
                      className="rounded-xl border-stone-300 text-xs tracking-wider uppercase dark:border-stone-700"
                    >
                      <Ruler className="mr-1.5 size-3.5" />
                      Blueprint
                    </Button>
                    <Button
                      onClick={() => addProductToDossier(activeHotspotProduct)}
                      className="rounded-xl bg-stone-900 text-xs tracking-wider text-white uppercase hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
                    >
                      <Plus className="mr-1.5 size-3.5" />
                      Acquire
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. SCROLL-VELOCITY ARCHITECTURAL MANIFESTO RIBBON                   */}
      {/* =================================================================== */}
      <div className="border-y border-stone-300/80 bg-stone-200/50 py-5 dark:border-stone-800 dark:bg-stone-900/40">
        <ScrollVelocityContainer className="font-serif text-2xl tracking-wider text-stone-800/85 uppercase sm:text-3xl dark:text-stone-200/85">
          <ScrollVelocityRow baseVelocity={4} direction={1} className="py-1">
            <span className="mx-6">RAW ROMAN TRAVERTINE</span>
            <span className="mx-4 text-amber-700">✦</span>
            <span className="mx-6">KILN-CHARRED YAKISUGI OAK</span>
            <span className="mx-4 text-amber-700">✦</span>
            <span className="mx-6">PERUVIAN ALPACA BOUCLÉ</span>
            <span className="mx-4 text-amber-700">✦</span>
            <span className="mx-6">SPANISH VEINED ALABASTER</span>
            <span className="mx-4 text-amber-700">✦</span>
            <span className="mx-6">SAND-CAST PATINATED BRONZE</span>
            <span className="mx-4 text-amber-700">✦</span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      {/* =================================================================== */}
      {/* 3. PROVENANCE & CRAFTSMANSHIP METRICS (NUMBER TICKER)               */}
      {/* =================================================================== */}
      <section className="border-b border-stone-300/70 py-16 dark:border-stone-800/80">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="border-l-2 border-amber-700/70 pl-5">
              <div className="font-serif text-4xl font-normal text-stone-900 sm:text-5xl dark:text-stone-100">
                <NumberTicker value={148} />+
              </div>
              <div className="mt-1 font-mono text-xs tracking-wider text-stone-500 uppercase dark:text-stone-400">
                Artisan Hours per Form
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Hand-chiseled stone edges &amp; mortise joinery
              </p>
            </div>

            <div className="border-l-2 border-amber-700/70 pl-5">
              <div className="font-serif text-4xl font-normal text-stone-900 sm:text-5xl dark:text-stone-100">
                <NumberTicker value={100} />%
              </div>
              <div className="mt-1 font-mono text-xs tracking-wider text-stone-500 uppercase dark:text-stone-400">
                Single-Quarry &amp; FSC Traceable
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Zero synthetic resins or VOC polyurethane foams
              </p>
            </div>

            <div className="border-l-2 border-amber-700/70 pl-5">
              <div className="font-serif text-4xl font-normal text-stone-900 sm:text-5xl dark:text-stone-100">
                <NumberTicker value={35} />
              </div>
              <div className="mt-1 font-mono text-xs tracking-wider text-stone-500 uppercase dark:text-stone-400">
                Avg. Edition Limit per Year
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Individually stamped brass provenance registry
              </p>
            </div>

            <div className="border-l-2 border-amber-700/70 pl-5">
              <div className="font-serif text-4xl font-normal text-stone-900 sm:text-5xl dark:text-stone-100">
                <NumberTicker value={4} />
              </div>
              <div className="mt-1 font-mono text-xs tracking-wider text-stone-500 uppercase dark:text-stone-400">
                Global Architectural Salons
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Milan · Kyoto · Copenhagen · New York
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. ARCHIVE COLLECTION N° 04 CATALOG (WITH LENS & MAGIC CARD)        */}
      {/* =================================================================== */}
      <section id="collection" className="py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-stone-300/80 pb-8 lg:flex-row lg:items-end dark:border-stone-800">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
                <Layers className="size-3.5" />
                <span>COLLECTIBLE DESIGN CATALOG · NUMBERED WORKS</span>
              </div>
              <h2 className="font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl dark:text-stone-100">
                Archive Collection N° 04
              </h2>
            </div>

            {/* Interactive Tactile Lens Magnifier Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setLensEnabled((v) => !v)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-all",
                  lensEnabled
                    ? "border-amber-700 bg-amber-950/10 text-amber-900 dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-200"
                    : "border-stone-300 bg-white/70 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
                )}
              >
                <ZoomIn className="size-3.5" />
                <span>
                  Tactile Lens Magnifier: {lensEnabled ? "ACTIVE" : "OFF"}
                </span>
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all",
                      active
                        ? "bg-stone-900 text-stone-50 shadow-xs dark:bg-stone-100 dark:text-stone-900"
                        : "border border-stone-300/80 bg-white/60 text-stone-700 hover:border-stone-500 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300"
                    )}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[230px] flex-1 sm:flex-initial">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stone, oak, designer..."
                  className="w-full rounded-full border border-stone-300 bg-white/80 py-2 pr-4 pl-9 text-xs text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>

              <select
                aria-label="Sort collection"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "curated" | "price-asc" | "price-desc"
                  )
                }
                className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-xs text-stone-800 focus:outline-none dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
              >
                <option value="curated">Sort: Curated Archive</option>
                <option value="price-asc">Valuation: Low to High</option>
                <option value="price-desc">Valuation: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => {
              const currentFinish =
                selectedFinishes[product.id] ?? product.finishes[0]
              const currentPrice = product.basePrice + currentFinish.priceDelta

              const ImageElement = (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200 dark:bg-stone-950">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/15" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="rounded-full bg-stone-950/80 px-3 py-1 font-mono text-[10px] tracking-widest text-stone-100 uppercase backdrop-blur-md">
                      {product.code}
                    </span>
                    <span className="rounded-full border border-white/25 bg-white/20 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
                      {product.edition}
                    </span>
                  </div>

                  <div className="absolute right-3.5 bottom-3.5 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[10px] text-stone-200 backdrop-blur-md">
                    {product.dimensions.width} × {product.dimensions.depth} ×{" "}
                    {product.dimensions.height} cm
                  </div>
                </div>
              )

              return (
                <BlurFade key={product.id} delay={0.05 * index} inView>
                  <MagicCard
                    gradientSize={240}
                    gradientFrom="#b45309"
                    gradientTo="#78716c"
                    gradientColor="#e7e5e4"
                    gradientOpacity={0.2}
                    className="flex h-full flex-col justify-between rounded-2xl border border-stone-300/80 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-xl dark:border-stone-800 dark:bg-stone-900"
                  >
                    <div>
                      {/* Image Container with Optional Magic UI Lens */}
                      <div className="overflow-hidden rounded-xl">
                        {lensEnabled ? (
                          <Lens zoomFactor={1.55} lensSize={165}>
                            {ImageElement}
                          </Lens>
                        ) : (
                          ImageElement
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="px-2 pt-4">
                        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                          <span>
                            {product.category} · {product.designer}
                          </span>
                          <span className="font-mono text-[11px]">
                            {product.origin}
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-baseline justify-between gap-2">
                          <h3 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100">
                            {product.name}
                          </h3>
                          <span className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
                            ${currentPrice.toLocaleString()}
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                          {product.description}
                        </p>

                        {/* Finish Swatch Picker */}
                        <div className="mt-4 border-t border-stone-200/80 pt-3 dark:border-stone-800">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] tracking-wider text-stone-500 uppercase dark:text-stone-400">
                              Finish: {currentFinish.name}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            {product.finishes.map((fin) => {
                              const isSelected = fin.id === currentFinish.id
                              return (
                                <button
                                  key={fin.id}
                                  type="button"
                                  onClick={() =>
                                    setSelectedFinishes((prev) => ({
                                      ...prev,
                                      [product.id]: fin,
                                    }))
                                  }
                                  title={`${fin.name} (${fin.priceDelta > 0 ? `+$${fin.priceDelta}` : "Included"})`}
                                  className={cn(
                                    "relative flex size-6 items-center justify-center rounded-full border transition-transform",
                                    isSelected
                                      ? "scale-110 border-stone-900 ring-2 ring-amber-700/50 dark:border-white"
                                      : "border-stone-400 opacity-75 hover:opacity-100"
                                  )}
                                  style={{ backgroundColor: fin.swatchHex }}
                                />
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Buttons */}
                    <div className="mt-5 grid grid-cols-2 gap-2 px-2 pb-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickViewProduct(product)}
                        className="rounded-xl border-stone-300 text-xs tracking-wider uppercase dark:border-stone-700"
                      >
                        <Eye className="mr-1.5 size-3.5" />
                        Blueprint
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          addProductToDossier(product, currentFinish)
                        }
                        className="rounded-xl bg-stone-900 text-xs tracking-wider text-stone-50 uppercase hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
                      >
                        <Plus className="mr-1.5 size-3.5" />
                        Add Dossier
                      </Button>
                    </div>
                  </MagicCard>
                </BlurFade>
              )
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. BESPOKE ATELIER CONFIGURATOR                                     */}
      {/* =================================================================== */}
      <BespokeConfigurator onAddCommission={handleAddCustomCommission} />

      {/* =================================================================== */}
      {/* 6. MATERIALITY & ARCHITECTURAL PHILOSOPHY (BENTO GRID + GLARE)      */}
      {/* =================================================================== */}
      <section id="material-philosophy" className="py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
                <Flame className="size-3.5" />
                <span>TECTONIC HONESTY · MATERIAL ARCHIVE</span>
              </div>
              <h2 className="font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl dark:text-stone-100">
                The Architecture of Raw Matter
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              We reject synthetic veneers and chemical sealants. Every material
              in our archive is chosen for how it records time—developing a
              deeper patina with decades of touch and sunlight.
            </p>
          </div>

          <BentoGrid className="auto-rows-[21rem] grid-cols-1 md:grid-cols-3">
            <BentoCard
              name="Tivoli Quarry Roman Travertine"
              className="col-span-1 md:col-span-2"
              Icon={Layers}
              description="Carved from vein-cut sedimentary blocks in Tivoli, Italy. Left un-resined so every geological cavity remains breathable and tactile."
              href="#bespoke-atelier"
              cta="Specify Travertine"
              background={
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/furniture/travertine-table.jpg"
                    alt="Tivoli Travertine"
                    fill
                    className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent dark:from-stone-950 dark:via-stone-950/60" />
                </div>
              }
            />

            <BentoCard
              name="Shou Sugi Ban & Mortise Joinery"
              className="col-span-1"
              Icon={Flame}
              description="Japanese Mizunara oak charred over open cypress flame, wire-brushed, and joined via dry mechanical bronze tension without adhesives."
              href="#bespoke-atelier"
              cta="Explore Timber Joinery"
              background={
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/furniture/atelier-craft.jpg"
                    alt="Atelier Joinery"
                    fill
                    className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent dark:from-stone-950 dark:via-stone-950/60" />
                </div>
              }
            />

            <BentoCard
              name="Undyed Peruvian Alpaca & Belgian Flax"
              className="col-span-1"
              Icon={ShieldCheck}
              description="920gsm high-loop alpaca bouclé and unbleached Flanders linen wrapped over organic Talalay latex and coconut fiber cores."
              href="#collection"
              cta="Inspect Upholstery"
              background={
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/furniture/monolith-lounge.jpg"
                    alt="Alpaca Bouclé"
                    fill
                    className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent dark:from-stone-950 dark:via-stone-950/60" />
                </div>
              }
            />

            <BentoCard
              name="Aragon Alabaster & Living Bronze"
              className="col-span-1 md:col-span-2"
              Icon={Award}
              description="Solid cylinders of translucent Spanish alabaster paired with sand-cast Brera foundry bronze. Each piece carries a recessed brass provenance plate."
              href="#collection"
              cta="View Luminaire Editions"
              background={
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/furniture/alabaster-lamp.jpg"
                    alt="Alabaster Luminaire"
                    fill
                    className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent dark:from-stone-950 dark:via-stone-950/60" />
                </div>
              }
            />
          </BentoGrid>

          {/* Interactive Material Swatch Bar using GlareHover */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                title: "Vein-Cut Travertine",
                code: "MAT-01 // TIVOLI",
                bg: "#D4C6B0",
                textClass: "text-stone-900",
              },
              {
                title: "Yakisugi Charred Oak",
                code: "MAT-02 // KYOTO",
                bg: "#231F1D",
                textClass: "text-stone-100",
              },
              {
                title: "Raw Alpaca Bouclé",
                code: "MAT-03 // ANDES",
                bg: "#EAE5DC",
                textClass: "text-stone-900",
              },
              {
                title: "Aniline Saddle Hide",
                code: "MAT-04 // TUSCANY",
                bg: "#7B4427",
                textClass: "text-amber-50",
              },
            ].map((swatch) => (
              <GlareHover
                key={swatch.code}
                width="100%"
                height="110px"
                background={swatch.bg}
                color="#ffffff"
                opacity={0.35}
                className={cn(
                  "flex flex-col items-start justify-between rounded-2xl border border-stone-300/60 p-4 shadow-xs dark:border-stone-800",
                  swatch.textClass
                )}
              >
                <span className="font-mono text-[10px] tracking-widest opacity-75">
                  {swatch.code}
                </span>
                <span className="font-serif text-lg font-medium">
                  {swatch.title}
                </span>
              </GlareHover>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. ARCHITECTURAL PRESS & COLLECTOR ACCLAIM MARQUEE                  */}
      {/* =================================================================== */}
      <section className="border-y border-stone-300/70 bg-stone-200/40 py-20 dark:border-stone-800 dark:bg-stone-950/60">
        <div className="mx-auto mb-10 max-w-[1400px] px-4 text-center sm:px-6 lg:px-8">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
            CRITICAL ACCLAIM &amp; ARCHITECTURAL SPECIFIERS
          </span>
          <h2 className="mt-2 font-serif text-3xl font-normal text-stone-900 sm:text-4xl dark:text-stone-100">
            In the Words of Curators &amp; Principal Architects
          </h2>
        </div>

        <Marquee pauseOnHover className="[--duration:45s]">
          {PRESS_QUOTES.map((item) => (
            <div
              key={item.publication}
              className="flex w-[380px] flex-col justify-between rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-xs backdrop-blur-xs dark:border-stone-800 dark:bg-stone-900/90"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs font-bold tracking-widest text-amber-800 dark:text-amber-400">
                  <span>{item.publication}</span>
                  <span className="font-normal text-stone-400">
                    {item.location}
                  </span>
                </div>
                <p className="mt-4 font-serif text-lg leading-relaxed text-stone-800 italic dark:text-stone-200">
                  {item.quote}
                </p>
              </div>
              <div className="mt-5 border-t border-stone-200/80 pt-3 font-mono text-[11px] text-stone-500 dark:border-stone-800 dark:text-stone-400">
                — {item.author}
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* =================================================================== */}
      {/* 8. GLOBAL ATELIERS & PRIVATE VIEWING SALONS                         */}
      {/* =================================================================== */}
      <section id="ateliers" className="py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
                <Globe className="size-3.5" />
                <span>PRIVATE SHOWROOMS &amp; ARCHIVAL SALONS</span>
              </div>
              <h2 className="font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl dark:text-stone-100">
                Visit Our Global Ateliers
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Experience the physical weight, acoustic stillness, and raw
                surface grain of Archive Collection N° 04 in person. Private
                consultations for collectors, interior architects, and
                galleries.
              </p>

              {/* City Selector Tabs */}
              <div className="mt-8 space-y-2.5">
                {ATELIERS.map((atelier) => {
                  const active = atelier.id === selectedAtelier.id
                  return (
                    <button
                      key={atelier.id}
                      type="button"
                      onClick={() => setSelectedAtelier(atelier)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all",
                        active
                          ? "border-stone-900 bg-stone-900 text-stone-50 shadow-md dark:border-amber-400 dark:bg-stone-800"
                          : "border-stone-300/80 bg-white/70 text-stone-800 hover:border-stone-500 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-200"
                      )}
                    >
                      <div>
                        <div className="font-serif text-xl font-normal">
                          {atelier.city}
                        </div>
                        <div
                          className={cn(
                            "text-xs",
                            active
                              ? "text-stone-300"
                              : "text-stone-500 dark:text-stone-400"
                          )}
                        >
                          {atelier.district}
                        </div>
                      </div>
                      <span className="font-mono text-[11px] opacity-75">
                        {atelier.coordinates}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Atelier Showcase Panel */}
            <div className="lg:col-span-7">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-stone-300/90 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-900">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4 dark:border-stone-800">
                    <Badge className="bg-amber-700 font-mono text-[10px] tracking-widest text-white uppercase">
                      CURRENT EXHIBITION
                    </Badge>
                    <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                      {selectedAtelier.coordinates}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-3xl font-normal text-stone-900 sm:text-4xl dark:text-stone-100">
                    {selectedAtelier.city} — {selectedAtelier.district}
                  </h3>
                  <p className="mt-1 font-serif text-lg text-amber-800 italic dark:text-amber-400">
                    “{selectedAtelier.currentExhibition}”
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-stone-100/90 p-5 sm:grid-cols-2 dark:bg-stone-950/90">
                    <div>
                      <span className="block font-mono text-[10px] text-stone-400 uppercase">
                        ARCHITECTURAL SETTING
                      </span>
                      <span className="mt-1 block text-xs font-medium text-stone-900 dark:text-stone-100">
                        {selectedAtelier.architect}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-stone-400 uppercase">
                        ADDRESS
                      </span>
                      <span className="mt-1 block text-xs font-medium text-stone-900 dark:text-stone-100">
                        {selectedAtelier.address}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-stone-400 uppercase">
                        VIEWING HOURS
                      </span>
                      <span className="mt-1 block text-xs font-medium text-stone-900 dark:text-stone-100">
                        {selectedAtelier.hours}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-stone-400 uppercase">
                        DIRECT ARCHIVIST LINE
                      </span>
                      <span className="mt-1 block font-mono text-xs font-medium text-stone-900 dark:text-stone-100">
                        {selectedAtelier.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6 dark:border-stone-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Complimentary material sample box provided for registered
                    architects &amp; interior studios.
                  </div>
                  <ShimmerButton
                    onClick={() => setAppointmentOpen(true)}
                    background="#1c1917"
                    shimmerColor="#f59e0b"
                    className="px-6 py-3 text-xs font-medium tracking-widest uppercase"
                  >
                    <Calendar className="mr-2 size-3.5" />
                    Request Private Viewing in {selectedAtelier.city}
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. ARCHITECTURAL COLOPHON FOOTER                                    */}
      {/* =================================================================== */}
      <footer className="border-t border-stone-300 bg-stone-900 text-stone-300 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="font-serif text-3xl tracking-[0.18em] text-white">
                KŌBO <span className="text-amber-500">{"//"}</span> FORMA
              </div>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-stone-400">
                Collectible architectural furniture and monolithic spatial
                objects. Hand-crafted in numbered editions across Milan, Kyoto,
                and Copenhagen. Powered by Magic UI.
              </p>
              <div className="mt-6 flex items-center gap-4 font-mono text-[11px] text-stone-400">
                <span>© 2026 KŌBO // FORMA ARCHIVE</span>
                <span>·</span>
                <Link
                  href="/docs/components"
                  className="text-amber-400 underline-offset-4 hover:underline"
                >
                  Explore Magic UI Components
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold tracking-widest text-white uppercase">
                Archive Navigation
              </h3>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li>
                  <a href="#spatial-salon" className="hover:text-white">
                    Interactive Spatial Salon
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-white">
                    Archive Collection N° 04
                  </a>
                </li>
                <li>
                  <a href="#bespoke-atelier" className="hover:text-white">
                    Bespoke Commission Studio
                  </a>
                </li>
                <li>
                  <a href="#material-philosophy" className="hover:text-white">
                    Materiality &amp; Quarry Provenance
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold tracking-widest text-white uppercase">
                Trade &amp; Dossier
              </h3>
              <ul className="mt-4 space-y-2 text-xs text-stone-400">
                <li>
                  <button
                    type="button"
                    onClick={() => setDossierOpen(true)}
                    className="hover:text-white"
                  >
                    Open Collector Dossier ({totalDossierCount})
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setAppointmentOpen(true)}
                    className="hover:text-white"
                  >
                    Book Private Salon Viewing
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleExportSpecSheet}
                    className="hover:text-white"
                  >
                    Download Specification Sheet (.TXT)
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* MODAL 1: TECHNICAL BLUEPRINT QUICK-VIEW DIALOG                      */}
      {/* =================================================================== */}
      <Dialog
        open={quickViewProduct !== null}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      >
        <DialogContent className="max-w-2xl overflow-hidden border-stone-300 bg-[#F7F4EF] p-0 dark:border-stone-800 dark:bg-stone-900">
          {quickViewProduct && (
            <div>
              <div className="relative aspect-[16/9] w-full bg-stone-950">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                  sizes="700px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute right-6 bottom-4 left-6 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">
                      {quickViewProduct.code} · {quickViewProduct.edition}
                    </span>
                    <DialogTitle className="font-serif text-3xl font-normal text-white">
                      {quickViewProduct.name}
                    </DialogTitle>
                  </div>
                  <span className="font-serif text-2xl">
                    ${quickViewProduct.basePrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <DialogHeader className="sr-only">
                  <DialogDescription>
                    Architectural specification for {quickViewProduct.name}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {quickViewProduct.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-stone-300/80 bg-white p-4 font-mono text-xs sm:grid-cols-4 dark:border-stone-800 dark:bg-stone-950">
                  <div>
                    <span className="block text-[10px] text-stone-400">
                      WIDTH
                    </span>
                    <span>{quickViewProduct.dimensions.width} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400">
                      DEPTH
                    </span>
                    <span>{quickViewProduct.dimensions.depth} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400">
                      HEIGHT
                    </span>
                    <span>{quickViewProduct.dimensions.height} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400">
                      MASS
                    </span>
                    <span>{quickViewProduct.weightKg} kg</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <div>
                    <strong className="text-stone-900 dark:text-stone-200">
                      Structural Note:{" "}
                    </strong>
                    {quickViewProduct.architecturalNote}
                  </div>
                  <div>
                    <strong className="text-stone-900 dark:text-stone-200">
                      Provenance &amp; Ecology:{" "}
                    </strong>
                    {quickViewProduct.sustainabilityNote}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-stone-200 pt-4 dark:border-stone-800">
                  <Button
                    variant="outline"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      addProductToDossier(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                    className="bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
                  >
                    <Plus className="mr-1.5 size-4" />
                    Add to Collector Dossier
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* =================================================================== */}
      {/* MODAL 2: PRIVATE ATELIER APPOINTMENT BOOKING DIALOG                 */}
      {/* =================================================================== */}
      <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
        <DialogContent className="max-w-lg border-stone-300 bg-[#F7F4EF] dark:border-stone-800 dark:bg-stone-900">
          <DialogHeader>
            <div className="font-mono text-[10px] tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
              PRIVATE SALON CONSULTATION
            </div>
            <DialogTitle className="font-serif text-2xl font-normal">
              Schedule an Architectural Viewing
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-600 dark:text-stone-400">
              Reserve a private one-on-one session with our senior archivist in
              Milan, Kyoto, Copenhagen, or New York.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookAppointment} className="mt-2 space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase">
                Select Atelier Location
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ATELIERS.map((at) => (
                  <button
                    key={at.id}
                    type="button"
                    onClick={() => setSelectedAtelier(at)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-left text-xs transition-all",
                      selectedAtelier.id === at.id
                        ? "border-stone-900 bg-stone-900 text-white dark:border-amber-400 dark:bg-stone-800"
                        : "border-stone-300 bg-white text-stone-800 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
                    )}
                  >
                    <div className="font-medium">{at.city}</div>
                    <div className="text-[10px] opacity-75">{at.district}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs dark:border-stone-700 dark:bg-stone-950"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  placeholder="studio@architecture.ch"
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs dark:border-stone-700 dark:bg-stone-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase">
                  Architecture Practice / Collector
                </label>
                <input
                  type="text"
                  value={visitorPractice}
                  onChange={(e) => setVisitorPractice(e.target.value)}
                  placeholder="Herzog Residential Studio"
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs dark:border-stone-700 dark:bg-stone-950"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 font-mono text-xs dark:border-stone-700 dark:bg-stone-950"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAppointmentOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
              >
                Confirm Private Viewing
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* =================================================================== */}
      {/* DRAWER: SLIDE-OVER COLLECTOR DOSSIER / SPECIFICATION BAG            */}
      {/* =================================================================== */}
      <Sheet open={dossierOpen} onOpenChange={setDossierOpen}>
        <SheetContent className="flex w-full flex-col justify-between border-l border-stone-300 bg-[#F7F4EF] p-6 sm:max-w-lg dark:border-stone-800 dark:bg-stone-950">
          <div>
            <SheetHeader className="border-b border-stone-300/80 pb-4 text-left dark:border-stone-800">
              <div className="font-mono text-[10px] tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
                ACQUISITION &amp; TRADE SPECIFICATION
              </div>
              <SheetTitle className="font-serif text-2xl font-normal">
                Collector Dossier ({totalDossierCount})
              </SheetTitle>
              <SheetDescription className="text-xs text-stone-600 dark:text-stone-400">
                Review your numbered archive selections and bespoke atelier
                commissions.
              </SheetDescription>
            </SheetHeader>

            {/* Dossier Items List */}
            <div className="mt-5 max-h-[52vh] space-y-3 overflow-y-auto pr-1">
              {dossierItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-xs text-stone-500 dark:border-stone-800">
                  Your Collector Dossier is currently empty. Select an edition
                  from Archive N° 04 or configure a bespoke commission.
                </div>
              ) : (
                dossierItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 rounded-xl border border-stone-300/80 bg-white p-3.5 shadow-2xs dark:border-stone-800 dark:bg-stone-900"
                  >
                    <div className="relative size-18 shrink-0 overflow-hidden rounded-lg bg-stone-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-amber-800 dark:text-amber-400">
                            {item.code}
                          </span>
                          <h4 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-mono text-xs font-semibold">
                          ${(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {item.isCustomCommission ? (
                        <div className="mt-1 space-y-0.5 text-[11px] text-stone-500 dark:text-stone-400">
                          <div>
                            {item.structureName} · {item.surfaceName}
                          </div>
                          <div>
                            {item.scaleName} ({item.dimensionsText}) · Plaque:{" "}
                            {item.monogram}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 space-y-0.5 text-[11px] text-stone-500 dark:text-stone-400">
                          <div>{item.finishName}</div>
                          <div>
                            {item.dimensionsText} · {item.edition}
                          </div>
                        </div>
                      )}

                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-stone-400">
                          Lead: {item.leadTime}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.id, -1)}
                            className="flex size-6 items-center justify-center rounded-md border border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-5 text-center font-mono text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.id, 1)}
                            className="flex size-6 items-center justify-center rounded-md border border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Dossier Footer & Export / Submit */}
          {dossierItems.length > 0 && (
            <div className="border-t border-stone-300 pt-4 dark:border-stone-800">
              <div className="mb-3">
                <label className="mb-1 block font-mono text-[10px] text-stone-500 uppercase">
                  Project / Architectural Delivery Note
                </label>
                <input
                  type="text"
                  value={collectorNote}
                  onChange={(e) => setCollectorNote(e.target.value)}
                  placeholder="e.g., Villa Zurich Residence — Crane access confirmed"
                  className="w-full rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs dark:border-stone-700 dark:bg-stone-900"
                />
              </div>

              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-mono text-xs text-stone-500 uppercase">
                  Total Dossier Valuation
                </span>
                <span className="font-serif text-3xl font-medium">
                  ${totalDossierValue.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={handleExportSpecSheet}
                  className="w-full rounded-xl border-stone-300 text-xs tracking-wider uppercase dark:border-stone-700"
                >
                  <Download className="mr-2 size-3.5" />
                  Download Architectural Spec Sheet (.TXT)
                </Button>
                <ShimmerButton
                  onClick={handleCompleteAcquisition}
                  background="#1c1917"
                  shimmerColor="#f59e0b"
                  className="w-full py-3 text-xs font-medium tracking-widest uppercase"
                >
                  Submit Acquisition &amp; Reserve Editions
                </ShimmerButton>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
