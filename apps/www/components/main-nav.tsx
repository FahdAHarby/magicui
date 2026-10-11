"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type NavItem } from "@/types"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: NavItem[]
}) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => {
        const active =
          item.href !== undefined &&
          (pathname === item.href || pathname.startsWith(`${item.href}/`))

        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            size="sm"
            className="relative"
          >
            <Link
              href={item.href ?? ""}
              className={cn(
                "text-muted-foreground hover:text-foreground relative transition-colors duration-300",
                active && "text-foreground"
              )}
              onClick={() => {
                if (item.event) {
                  trackEvent({ name: item.event })
                }
              }}
            >
              {item.title}
              <span
                aria-hidden="true"
                className={cn(
                  "via-color-3 absolute inset-x-2 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent to-transparent transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  active && "scale-x-100"
                )}
              />
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
