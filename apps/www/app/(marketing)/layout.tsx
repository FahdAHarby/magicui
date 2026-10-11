import { RouteProgress } from "@/components/motion/page-transition"
import { SiteBanner } from "@/components/site-banner"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <SiteBanner />
      <SiteHeader autoHide transparentAtTop />
      <main className="relative flex-1">{children}</main>
      <SiteFooter variant="full" />
      <RouteProgress />
    </>
  )
}
