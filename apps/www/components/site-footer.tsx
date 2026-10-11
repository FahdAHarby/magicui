import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

interface FooterLink {
  title: string
  href: string
  external?: boolean
}

const COLUMNS: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Product",
    links: [
      { title: "Components", href: "/components" },
      {
        title: "Templates",
        href: "https://pro.magicui.design",
        external: true,
      },
      { title: "Showcase", href: "/showcase" },
      { title: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Installation", href: "/docs/installation" },
      { title: "Blog", href: "/blog" },
      { title: "MCP", href: "/docs/mcp" },
      { title: "Story", href: "/docs/story" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "GitHub", href: siteConfig.links.github, external: true },
      { title: "Discord", href: siteConfig.links.discord, external: true },
      { title: "Twitter", href: siteConfig.links.twitter, external: true },
      { title: "Instagram", href: siteConfig.links.instagram, external: true },
    ],
  },
]

function CompactFooter() {
  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              dillion
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}

function FullFooter() {
  return (
    <footer className="border-border/60 border-t">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.7fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icons.logo className="size-6" />
              <span className="font-semibold">{siteConfig.name}</span>
            </div>
            <p className="text-muted-foreground max-w-[38ch] text-sm leading-relaxed">
              Animated components and effects for React, Tailwind CSS and
              Motion. Free, open source, and yours to own.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-4"
            >
              <span className="eyebrow">{column.title}</span>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground focus-ring text-sm transition-colors duration-300"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground focus-ring text-sm transition-colors duration-300"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-border/60 mt-14 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-xs">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-medium underline underline-offset-4"
            >
              dillion
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-muted-foreground text-xs">
            MIT licensed · Typeset in Geist
          </p>
        </div>
      </div>
    </footer>
  )
}

export function SiteFooter({
  variant = "compact",
}: {
  variant?: "compact" | "full"
}) {
  return variant === "full" ? <FullFooter /> : <CompactFooter />
}
