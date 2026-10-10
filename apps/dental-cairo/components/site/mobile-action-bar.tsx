import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";

import { clinic, telLink, waLink } from "@/config/clinic";

/**
 * Sticky action bar for phones — the way most patients actually book.
 */
export function MobileActionBar() {
  return (
    <div className="border-border/70 bg-background/90 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3 gap-2 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={telLink(clinic.emergencyLine)}
          className="border-border text-foreground flex flex-col items-center gap-1 rounded-xl border py-2 text-xs font-medium"
        >
          <Phone className="text-primary size-4.5" />
          Call
        </a>
        <a
          href={waLink("Hi Nile Smile, I'd like to book a dental appointment.")}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border text-foreground flex flex-col items-center gap-1 rounded-xl border py-2 text-xs font-medium"
        >
          <MessageCircle className="size-4.5 text-emerald-500" />
          WhatsApp
        </a>
        <Link
          href="#book"
          className="bg-primary text-primary-foreground flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-semibold"
        >
          <CalendarCheck className="size-4.5" />
          Book
        </Link>
      </div>
    </div>
  );
}

/**
 * Floating WhatsApp bubble for larger screens.
 */
export function WhatsAppBubble() {
  return (
    <a
      href={waLink("Hi Nile Smile, I'd like to book a dental appointment.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nile Smile on WhatsApp"
      className="group border-border bg-card fixed right-5 bottom-6 z-40 hidden items-center gap-3 rounded-full border py-2.5 pr-5 pl-2.5 shadow-xl transition-transform hover:scale-[1.03] md:flex"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white">
        <MessageCircle className="size-4.5" />
      </span>
      <span className="text-sm font-semibold">
        Chat on WhatsApp
        <span className="text-muted-foreground block text-xs font-normal">
          Replies in ~5 minutes
        </span>
      </span>
    </a>
  );
}
