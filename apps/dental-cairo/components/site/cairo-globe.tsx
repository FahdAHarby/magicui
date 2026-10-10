"use client";

import type { COBEOptions } from "cobe";

import { Globe } from "@/components/magicui/globe";
import { cn } from "@/lib/utils";

/**
 * Cairo on a globe — markers sit on the two studios plus two Cairo landmarks.
 * Kept in a client module because cobe needs a render callback.
 */
const config: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 2.1,
  theta: 0.28,
  dark: 0,
  diffuse: 0.55,
  mapSamples: 18_000,
  mapBrightness: 7,
  baseColor: [0.95, 0.98, 0.98],
  markerColor: [0.12, 0.58, 0.56],
  glowColor: [0.92, 0.97, 0.96],
  markers: [
    { location: [30.0074, 31.4913], size: 0.09 }, // Fifth Settlement
    { location: [30.045, 30.976], size: 0.07 }, // Sheikh Zayed
    { location: [29.9603, 31.2569], size: 0.045 }, // Maadi
    { location: [30.0876, 31.3366], size: 0.04 }, // Heliopolis
  ],
};

export function CairoGlobe({ className }: { className?: string }) {
  return <Globe config={config} className={cn(className)} />;
}
