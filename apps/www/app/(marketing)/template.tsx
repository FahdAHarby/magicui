import { RouteTransition } from "@/components/motion/page-transition"

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteTransition>{children}</RouteTransition>
}
