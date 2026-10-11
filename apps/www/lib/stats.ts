import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

import { showcaseSource } from "@/lib/source"

const REPO_API = "https://api.github.com/repos/magicuidesign/magicui"
const FALLBACK_STARS = 22_000

/**
 * Counts come from the registry itself so the marketing copy can never drift
 * away from what is actually published.
 */
export const getLibraryCounts = cache(async () => {
  const [components, examples] = await Promise.all([
    fs.readdir(path.join(process.cwd(), "registry/magicui")),
    fs.readdir(path.join(process.cwd(), "registry/example")),
  ])

  return {
    components: components.filter((file) => file.endsWith(".tsx")).length,
    examples: examples.filter((file) => file.endsWith(".tsx")).length,
    showcases: showcaseSource.getPages().length,
  }
})

/**
 * Stars are nice to have, never required: a rate limited or offline build
 * falls back to a rounded number instead of failing.
 */
export const getGithubStars = cache(async () => {
  try {
    const response = await fetch(REPO_API, {
      next: { revalidate: 86400 },
    })

    if (!response.ok) return FALLBACK_STARS

    const data = (await response.json()) as { stargazers_count?: unknown }
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : FALLBACK_STARS
  } catch {
    return FALLBACK_STARS
  }
})
