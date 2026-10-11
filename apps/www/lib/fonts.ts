import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

/**
 * Geist is loaded with `next/font/local` through the `geist` package instead of
 * `next/font/google`. The files are self-hosted from the app bundle, which
 * removes a third-party request (and the render blocking CSS that comes with
 * it), keeps type rendering identical offline, and eliminates FOUT.
 */
export const fontVariables = cn(GeistSans.variable, GeistMono.variable)
