"use client"

import React, { useMemo, useState } from "react"
import Image from "next/image"
import { Check, Compass, Layers, Maximize2, Plus, Stamp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "@/registry/magicui/border-beam"
import { DotPattern } from "@/registry/magicui/dot-pattern"
import { MagicCard } from "@/registry/magicui/magic-card"
import { ShimmerButton } from "@/registry/magicui/shimmer-button"

import { PRODUCTS, type FurnitureProduct } from "./furniture-data"

export interface CustomCommissionItem {
  id: string
  name: string
  code: string
  image: string
  structureName: string
  surfaceName: string
  scaleName: string
  dimensionsText: string
  monogram: string
  unitPrice: number
  leadTime: string
  quantity: number
  isCustomCommission: true
}

const STRUCTURE_OPTIONS = [
  {
    id: "roman-travertine",
    name: "Tivoli Roman Travertine",
    origin: "Tivoli Quarry, Italy",
    hex: "#D6C7B2",
    densityNote: "2,410 kg/m³ · Open-Pore Sedimentary",
    priceMultiplier: 1.12,
  },
  {
    id: "yakisugi-oak",
    name: "Charred Yakisugi Mizunara Oak",
    origin: "Hokkaido / Kyoto, Japan",
    hex: "#27221E",
    densityNote: "740 kg/m³ · Kiln-Charred Heartwood",
    priceMultiplier: 1.0,
  },
  {
    id: "smoked-walnut",
    name: "Heartwood Smoked Walnut",
    origin: "Appalachia / Copenhagen",
    hex: "#593E2C",
    densityNote: "680 kg/m³ · Raw Linseed Rubbed",
    priceMultiplier: 1.06,
  },
  {
    id: "patinated-bronze",
    name: "Sand-Cast Patinated Bronze",
    origin: "Brera Foundry, Milan",
    hex: "#7A5E3E",
    densityNote: "8,730 kg/m³ · Living Sulfur Patina",
    priceMultiplier: 1.24,
  },
]

const SURFACE_OPTIONS = [
  {
    id: "alpaca-boucle",
    name: "Peruvian Ivory Alpaca Bouclé",
    detail: "920 gsm Undyed Looped Fleece",
    hex: "#EFECE6",
    priceAdder: 0,
  },
  {
    id: "belgian-linen",
    name: "Unbleached Flanders Flax Linen",
    detail: "680 gsm Raw Architectural Slub",
    hex: "#D5C8B6",
    priceAdder: 300,
  },
  {
    id: "saddle-leather",
    name: "Full-Grain Cognac Saddle Hide",
    detail: "4.2 mm Vegetable-Tanned Aniline",
    hex: "#8A4F2E",
    priceAdder: 950,
  },
  {
    id: "honed-mineral",
    name: "Chiseled & Honed Monolith Finish",
    detail: "Breathable Silicate Mineral Seal",
    hex: "#C2B6A3",
    priceAdder: 450,
  },
]

const SCALE_OPTIONS = [
  {
    id: "studio",
    name: "Studio Proportion",
    tag: "0.90×",
    ratio: 0.9,
    priceFactor: 0.92,
    note: "Tailored for intimate urban apartments & reading studies",
  },
  {
    id: "architectural",
    name: "Gallery Standard",
    tag: "1.00×",
    ratio: 1.0,
    priceFactor: 1.0,
    note: "Original exhibition dimensions from Archive Collection N° 04",
  },
  {
    id: "pavilion",
    name: "Grand Pavilion Scale",
    tag: "1.20×",
    ratio: 1.2,
    priceFactor: 1.22,
    note: "Extended monumental footprint for double-height salons",
  },
]

interface BespokeConfiguratorProps {
  onAddCommission: (item: CustomCommissionItem) => void
}

export function BespokeConfigurator({
  onAddCommission,
}: BespokeConfiguratorProps) {
  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct>(
    PRODUCTS[0]
  )
  const [selectedStructure, setSelectedStructure] = useState(
    STRUCTURE_OPTIONS[0]
  )
  const [selectedSurface, setSelectedSurface] = useState(SURFACE_OPTIONS[0])
  const [selectedScale, setSelectedScale] = useState(SCALE_OPTIONS[1])
  const [monogram, setMonogram] = useState("A.V. · 2026")
  const [activeTab, setActiveTab] = useState<"render" | "blueprint">("render")

  const scaledSpecs = useMemo(() => {
    const w = Math.round(selectedProduct.dimensions.width * selectedScale.ratio)
    const d = Math.round(selectedProduct.dimensions.depth * selectedScale.ratio)
    const h = Math.round(
      selectedProduct.dimensions.height *
        (selectedScale.ratio === 1 ? 1 : 1 + (selectedScale.ratio - 1) * 0.35)
    )
    const weight = Math.round(
      selectedProduct.weightKg *
        selectedScale.ratio *
        selectedStructure.priceMultiplier
    )
    const price =
      Math.round(
        (selectedProduct.basePrice *
          selectedStructure.priceMultiplier *
          selectedScale.priceFactor +
          selectedSurface.priceAdder) /
          50
      ) * 50

    return { w, d, h, weight, price }
  }, [selectedProduct, selectedStructure, selectedSurface, selectedScale])

  const handleCommissionSubmit = () => {
    const commission: CustomCommissionItem = {
      id: `commission-${selectedProduct.id}-${selectedStructure.id}-${selectedSurface.id}-${selectedScale.id}-${Date.now()}`,
      name: `Bespoke ${selectedProduct.name}`,
      code: `${selectedProduct.code}-CUSTOM`,
      image: selectedProduct.image,
      structureName: selectedStructure.name,
      surfaceName: selectedSurface.name,
      scaleName: selectedScale.name,
      dimensionsText: `W ${scaledSpecs.w} × D ${scaledSpecs.d} × H ${scaledSpecs.h} cm`,
      monogram: monogram.trim() || "ATELIER EDITION",
      unitPrice: scaledSpecs.price,
      leadTime: selectedProduct.leadTimeWeeks,
      quantity: 1,
      isCustomCommission: true,
    }
    onAddCommission(commission)
  }

  return (
    <section
      id="bespoke-atelier"
      className="relative overflow-hidden border-y border-stone-300/70 bg-stone-100/70 py-24 dark:border-stone-800/80 dark:bg-stone-950/80"
    >
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1}
        className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)] opacity-35"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 border-b border-stone-300/70 pb-8 lg:flex-row lg:items-end dark:border-stone-800">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-amber-800 uppercase dark:text-amber-400">
              <Compass className="size-3.5" />
              <span>Atelier Commission Studio · Parametric Specifier</span>
            </div>
            <h2 className="font-serif text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl dark:text-stone-100">
              Bespoke Material &amp; Scale Configurator
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            Every KŌBO // FORMA piece is made to order in our Milan, Kyoto, and
            Copenhagen workshops. Specify your structural stone or timber,
            tactile upholstery, architectural scale, and engraved brass
            provenance plaque.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left 7 Columns: Live Visual & Orthographic Blueprint Stage */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-stone-300/80 bg-stone-50 shadow-xl dark:border-stone-800 dark:bg-stone-900/90">
              <BorderBeam
                size={240}
                duration={10}
                colorFrom="#b45309"
                colorTo="#78716c"
                borderWidth={1.5}
              />

              {/* Top Stage Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 bg-white/80 px-5 py-3.5 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/80">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold tracking-wider text-stone-900 dark:text-stone-100">
                    {selectedProduct.code}-CUSTOM
                  </span>
                  <span className="text-stone-300 dark:text-stone-700">|</span>
                  <span className="text-xs text-stone-600 dark:text-stone-400">
                    Designer: {selectedProduct.designer}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100 p-1 dark:border-stone-800 dark:bg-stone-950">
                  <button
                    type="button"
                    onClick={() => setActiveTab("render")}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-all",
                      activeTab === "render"
                        ? "bg-stone-900 text-stone-50 shadow-xs dark:bg-stone-100 dark:text-stone-900"
                        : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                    )}
                  >
                    Gallery Perspective
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("blueprint")}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-all",
                      activeTab === "blueprint"
                        ? "bg-stone-900 text-stone-50 shadow-xs dark:bg-stone-100 dark:text-stone-900"
                        : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                    )}
                  >
                    Orthographic CAD Blueprint
                  </button>
                </div>
              </div>

              {/* Main Stage Content */}
              {activeTab === "render" ? (
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-200 dark:bg-stone-950">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Live Material Swatch Overlay Pill */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3.5 py-1.5 text-xs text-stone-100 backdrop-blur-md">
                      <span
                        className="size-3 rounded-full border border-white/40"
                        style={{ backgroundColor: selectedStructure.hex }}
                      />
                      <span>{selectedStructure.name}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/65 px-3.5 py-1.5 text-xs text-stone-100 backdrop-blur-md">
                      <span
                        className="size-3 rounded-full border border-white/40"
                        style={{ backgroundColor: selectedSurface.hex }}
                      />
                      <span>{selectedSurface.name}</span>
                    </div>
                  </div>

                  {/* Brass Provenance Plaque Preview */}
                  <div className="absolute top-4 right-4 rounded-lg border border-amber-500/40 bg-linear-to-br from-amber-950/90 via-stone-900/90 to-amber-900/80 px-3.5 py-2 text-right font-mono text-[10px] tracking-widest text-amber-200/90 uppercase shadow-lg backdrop-blur-md">
                    <div className="text-[9px] text-amber-400/80">
                      BRASS PLAQUE ENGRAVING
                    </div>
                    <div className="mt-0.5 font-semibold text-amber-100">
                      {monogram || "ATELIER EDITION"}
                    </div>
                  </div>

                  {/* Bottom Live Specs Readout */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white">
                    <div>
                      <Badge className="mb-2 border-white/20 bg-white/15 text-[11px] font-normal tracking-widest text-white uppercase backdrop-blur-md">
                        {selectedScale.name} ({selectedScale.tag})
                      </Badge>
                      <h3 className="font-serif text-2xl font-normal sm:text-3xl">
                        {selectedProduct.name}
                      </h3>
                      <p className="mt-1 max-w-md text-xs text-stone-200/90">
                        {selectedProduct.architecturalNote}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 rounded-xl border border-white/15 bg-black/60 px-4 py-3 font-mono text-xs backdrop-blur-md">
                      <div>
                        <div className="text-[10px] text-stone-400">
                          DIMENSIONS
                        </div>
                        <div className="mt-0.5 font-medium text-stone-100">
                          {scaledSpecs.w}×{scaledSpecs.d}×{scaledSpecs.h} cm
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-stone-400">
                          EST. MASS
                        </div>
                        <div className="mt-0.5 font-medium text-stone-100">
                          {scaledSpecs.weight} kg
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-stone-400">
                          LEAD TIME
                        </div>
                        <div className="mt-0.5 font-medium text-amber-300">
                          {selectedProduct.leadTimeWeeks}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive CAD Orthographic Blueprint View */
                <div className="relative flex aspect-[16/11] w-full flex-col justify-between bg-[#14181D] p-6 font-mono text-stone-200">
                  <div className="flex items-center justify-between border-b border-sky-400/20 pb-3 text-xs text-sky-300/80">
                    <span>
                      ORTHOGRAPHIC PROJECTION // SCALE {selectedScale.tag}
                    </span>
                    <span>TOLERANCE: ±0.5 MM · JIS / DIN ARCHITECTURAL</span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center py-4">
                    <svg
                      viewBox="0 0 600 260"
                      className="h-full max-h-60 w-full stroke-sky-300/85"
                      fill="none"
                    >
                      {/* Grid lines */}
                      <line
                        x1="40"
                        y1="210"
                        x2="560"
                        y2="210"
                        stroke="rgba(125,211,252,0.25)"
                        strokeDasharray="4 4"
                      />
                      {/* Front Elevation Box */}
                      <g transform="translate(80, 45)">
                        <rect
                          x="0"
                          y="20"
                          width={Math.min(
                            240,
                            Math.max(130, scaledSpecs.w * 0.95)
                          )}
                          height={Math.min(
                            135,
                            Math.max(70, scaledSpecs.h * 1.15)
                          )}
                          rx="12"
                          strokeWidth="1.75"
                          fill="rgba(56,189,248,0.06)"
                        />
                        {/* Plinth base line */}
                        <rect
                          x="14"
                          y={
                            20 +
                            Math.min(135, Math.max(70, scaledSpecs.h * 1.15)) -
                            24
                          }
                          width={
                            Math.min(240, Math.max(130, scaledSpecs.w * 0.95)) -
                            28
                          }
                          height="24"
                          strokeWidth="1.2"
                          fill="rgba(217,119,6,0.18)"
                        />
                        {/* Width Dimension Arrow */}
                        <line
                          x1="0"
                          y1="175"
                          x2={Math.min(
                            240,
                            Math.max(130, scaledSpecs.w * 0.95)
                          )}
                          y2="175"
                          stroke="#fbbf24"
                          strokeWidth="1.2"
                        />
                        <text
                          x={
                            Math.min(240, Math.max(130, scaledSpecs.w * 0.95)) /
                            2
                          }
                          y="192"
                          textAnchor="middle"
                          fill="#fbbf24"
                          fontSize="11"
                          stroke="none"
                        >
                          W: {scaledSpecs.w}0 mm ({scaledSpecs.w} cm)
                        </text>
                        <text
                          x="0"
                          y="10"
                          fill="#93c5fd"
                          fontSize="10"
                          stroke="none"
                        >
                          01 // FRONT ELEVATION
                        </text>
                      </g>

                      {/* Side Depth Profile */}
                      <g transform="translate(380, 45)">
                        <rect
                          x="0"
                          y="20"
                          width={Math.min(
                            150,
                            Math.max(85, scaledSpecs.d * 0.95)
                          )}
                          height={Math.min(
                            135,
                            Math.max(70, scaledSpecs.h * 1.15)
                          )}
                          rx="10"
                          strokeWidth="1.75"
                          fill="rgba(56,189,248,0.06)"
                        />
                        <line
                          x1="-16"
                          y1="20"
                          x2="-16"
                          y2={
                            20 +
                            Math.min(135, Math.max(70, scaledSpecs.h * 1.15))
                          }
                          stroke="#fbbf24"
                          strokeWidth="1.2"
                        />
                        <text
                          x="-24"
                          y={
                            20 +
                            Math.min(135, Math.max(70, scaledSpecs.h * 1.15)) /
                              2
                          }
                          textAnchor="end"
                          fill="#fbbf24"
                          fontSize="11"
                          stroke="none"
                        >
                          H: {scaledSpecs.h} cm
                        </text>
                        <text
                          x={
                            Math.min(150, Math.max(85, scaledSpecs.d * 0.95)) /
                            2
                          }
                          y="192"
                          textAnchor="middle"
                          fill="#fbbf24"
                          fontSize="11"
                          stroke="none"
                        >
                          D: {scaledSpecs.d}0 mm ({scaledSpecs.d} cm)
                        </text>
                        <text
                          x="0"
                          y="10"
                          fill="#93c5fd"
                          fontSize="10"
                          stroke="none"
                        >
                          02 // SIDE SECTION
                        </text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-sky-400/20 pt-3 text-[11px] text-stone-400 sm:grid-cols-4">
                    <div>
                      <span className="block text-[9px] text-sky-400">
                        PRIMARY MASS
                      </span>
                      {selectedStructure.name}
                    </div>
                    <div>
                      <span className="block text-[9px] text-sky-400">
                        TACTILE CLADDING
                      </span>
                      {selectedSurface.name}
                    </div>
                    <div>
                      <span className="block text-[9px] text-sky-400">
                        FLOOR LOAD
                      </span>
                      {scaledSpecs.weight} kg Distributed
                    </div>
                    <div>
                      <span className="block text-[9px] text-sky-400">
                        PROVENANCE STAMP
                      </span>
                      {monogram || "ATELIER EDITION"}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Engineering Bar */}
              <div className="grid grid-cols-1 gap-4 bg-stone-100/90 p-5 sm:grid-cols-3 dark:bg-stone-900">
                <div className="flex items-start gap-3">
                  <Layers className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-400" />
                  <div>
                    <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      Structural Density
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      {selectedStructure.densityNote}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Maximize2 className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-400" />
                  <div>
                    <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      Spatial Footprint
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      {((scaledSpecs.w * scaledSpecs.d) / 10000).toFixed(2)} m²
                      floor area
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Stamp className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-400" />
                  <div>
                    <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      Origin &amp; Numbering
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      {selectedProduct.origin} · Signed{" "}
                      {selectedProduct.edition}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Parametric Controls wrapped in MagicCard */}
          <div className="lg:col-span-5">
            <MagicCard
              gradientSize={260}
              gradientFrom="#d97706"
              gradientTo="#78716c"
              gradientColor="#d6d3d1"
              gradientOpacity={0.18}
              className="rounded-2xl border border-stone-300/80 p-6 shadow-lg dark:border-stone-800"
            >
              <div className="space-y-6">
                {/* Step 1: Select Archetype */}
                <div>
                  <label className="mb-2.5 block font-mono text-[11px] font-semibold tracking-widest text-stone-500 uppercase dark:text-stone-400">
                    01 / Select Architectural Archetype
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRODUCTS.map((prod) => {
                      const active = prod.id === selectedProduct.id
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => setSelectedProduct(prod)}
                          className={cn(
                            "flex flex-col items-start rounded-xl border p-2.5 text-left transition-all",
                            active
                              ? "border-stone-900 bg-stone-900 text-stone-50 shadow-xs dark:border-amber-400/80 dark:bg-stone-800 dark:text-stone-100"
                              : "border-stone-200/90 bg-stone-50/70 text-stone-800 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-300"
                          )}
                        >
                          <span className="font-mono text-[10px] opacity-70">
                            {prod.code} · {prod.category}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs font-medium">
                            {prod.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 2: Select Primary Structure */}
                <div>
                  <label className="mb-2.5 block font-mono text-[11px] font-semibold tracking-widest text-stone-500 uppercase dark:text-stone-400">
                    02 / Primary Structural Material
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STRUCTURE_OPTIONS.map((opt) => {
                      const active = opt.id === selectedStructure.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedStructure(opt)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all",
                            active
                              ? "border-amber-700 bg-amber-950/5 ring-1 ring-amber-700/40 dark:border-amber-400 dark:bg-amber-400/10"
                              : "border-stone-200/90 bg-stone-50/60 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900/40"
                          )}
                        >
                          <span
                            className="size-6 shrink-0 rounded-full border border-black/20 shadow-inner"
                            style={{ backgroundColor: opt.hex }}
                          />
                          <div className="min-w-0">
                            <div className="truncate text-xs font-medium text-stone-900 dark:text-stone-100">
                              {opt.name}
                            </div>
                            <div className="truncate text-[10px] text-stone-500 dark:text-stone-400">
                              {opt.origin}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Select Surface / Upholstery */}
                <div>
                  <label className="mb-2.5 block font-mono text-[11px] font-semibold tracking-widest text-stone-500 uppercase dark:text-stone-400">
                    03 / Tactile Cladding &amp; Upholstery
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SURFACE_OPTIONS.map((surf) => {
                      const active = surf.id === selectedSurface.id
                      return (
                        <button
                          key={surf.id}
                          type="button"
                          onClick={() => setSelectedSurface(surf)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all",
                            active
                              ? "border-amber-700 bg-amber-950/5 ring-1 ring-amber-700/40 dark:border-amber-400 dark:bg-amber-400/10"
                              : "border-stone-200/90 bg-stone-50/60 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900/40"
                          )}
                        >
                          <span
                            className="size-6 shrink-0 rounded-full border border-black/20 shadow-inner"
                            style={{ backgroundColor: surf.hex }}
                          />
                          <div className="min-w-0">
                            <div className="truncate text-xs font-medium text-stone-900 dark:text-stone-100">
                              {surf.name}
                            </div>
                            <div className="truncate text-[10px] text-stone-500 dark:text-stone-400">
                              {surf.priceAdder > 0
                                ? `+$${surf.priceAdder}`
                                : "Atelier Standard"}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 4: Scale & Provenance Monogram */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold tracking-widest text-stone-500 uppercase dark:text-stone-400">
                      04 / Scale Ratio
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {SCALE_OPTIONS.map((sc) => {
                        const active = sc.id === selectedScale.id
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => setSelectedScale(sc)}
                            className={cn(
                              "flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs transition-all",
                              active
                                ? "border-stone-900 bg-stone-900 text-white dark:border-stone-200 dark:bg-stone-100 dark:text-stone-900"
                                : "border-stone-200 text-stone-700 hover:border-stone-400 dark:border-stone-800 dark:text-stone-300"
                            )}
                          >
                            <span>{sc.name}</span>
                            <span className="font-mono text-[11px] opacity-80">
                              {sc.tag}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="monogram-input"
                      className="mb-2 block font-mono text-[11px] font-semibold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                    >
                      05 / Brass Plaque Engraving
                    </label>
                    <input
                      id="monogram-input"
                      type="text"
                      maxLength={24}
                      value={monogram}
                      onChange={(e) => setMonogram(e.target.value)}
                      placeholder="Collector Initials / Year"
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 font-mono text-xs text-stone-900 focus:border-amber-700 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                    />
                    <p className="mt-1.5 text-[11px] leading-snug text-stone-500 dark:text-stone-400">
                      Hand-stamped onto a recessed solid brass plate beneath the
                      plinth.
                    </p>
                  </div>
                </div>

                {/* Live Valuation & Submit */}
                <div className="border-t border-stone-200 pt-5 dark:border-stone-800">
                  <div className="mb-4 flex items-baseline justify-between">
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-stone-500 uppercase dark:text-stone-400">
                        Bespoke Commission Valuation
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        Includes crated air-freight &amp; white-glove placement
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-3xl font-medium text-stone-900 dark:text-stone-100">
                        ${scaledSpecs.price.toLocaleString()}
                      </span>
                      <span className="block font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
                        <Check className="mr-1 inline size-3" />
                        Quarry &amp; Timber Allocation Available
                      </span>
                    </div>
                  </div>

                  <ShimmerButton
                    onClick={handleCommissionSubmit}
                    background="#1c1917"
                    shimmerColor="#f59e0b"
                    className="w-full py-3.5 text-xs font-medium tracking-widest uppercase"
                  >
                    <Plus className="mr-2 size-4" />
                    Add Bespoke Commission to Collector Dossier
                  </ShimmerButton>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  )
}
