# Nile Smile Dental Studio — concept website

A concept marketing site for a fictional dental clinic in Cairo, built as a second
app inside this Magic UI monorepo. It reuses the Magic UI registry components and
the same Next.js App Router + Tailwind v4 stack as `apps/www`.

> **Demo content.** The clinic, dentists, reviews, prices, phone numbers and
> photographs are illustrative placeholders — not a real practice.

## Run it

```bash
pnpm install
cd apps/dental-cairo
pnpm dev     # http://localhost:3100
```

```bash
pnpm build   # production build
pnpm typecheck
```

### Static export (no server needed)

```bash
STATIC_EXPORT=1 pnpm build   # writes a self-contained site into out/
npx serve out                # …or open out/index.html directly
```

The exported `out/` folder is plain HTML/CSS/JS, so it can be dropped on any
static host (GitHub Pages, Netlify, Cloudflare Pages, S3) or zipped and shared.

## What's inside

| Section | Notes |
| --- | --- |
| Hero | Animated grid pattern, shiny-text badge, rough-notation highlight, animated stat counters, floating glass cards |
| Trust marquee | Endless scrolling list of differentiators |
| Treatments | 8 treatments with live EGP pricing, feature cards with photo backgrounds, mouse-tracking spotlight cards |
| Process | 5-step "how it works" timeline with average waiting time / instalment stats |
| Studio & technology | Treatment-room photography with an animated border beam beside the clinic's equipment list, then the dentists |
| Pricing | Three published packages, featured plan wrapped in a shine border |
| Reviews | Vertical marquee wall of patient reviews with aggregate rating counters |
| Insurance & instalments | Direct-billing insurers plus Valu/Sympl payment partners |
| Locations | Interactive Cairo globe (cobe) with markers on both studios, branch cards, Google Maps directions |
| FAQ | Radix accordion covering prices, insurance, pain, Invisalign and kids |
| Booking | Client-side validated appointment request form with toast + WhatsApp hand-off |
| Always-on CTAs | Sticky header, mobile action bar (call/WhatsApp/book), floating WhatsApp bubble |

## Editing content

Everything editable lives in [`config/clinic.ts`](./config/clinic.ts): clinic
details, opening hours, both branches, treatments and prices, technology list,
dentists, packages, testimonials, FAQs, insurers and instalment partners.
Photographs live in `public/images`.

## Design tokens

The teal palette, brand tokens (`brand-deep`, `mint`, `gold`) and Magic UI
animation keyframes are declared in `styles/globals.css`.
