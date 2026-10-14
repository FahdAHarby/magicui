# Design and animation component evaluation

Reviewed on 2026-10-14 using the supplied GitHub repositories' metadata and README documentation. This is an architectural compatibility review, not a benchmark of all seven libraries. Only GSAP/ScrollTrigger and Lenis are included in the final site.

## Constraints and design direction

- Arabic-first RTL service business; two navigable page views inside one downloadable `index.html`.
- Must open directly with `file://`, including fonts, images and motion, without external CDN dependencies.
- Premium engineering/editorial direction: warm off-white, deep charcoal, burnt-orange accents, architectural imagery, technical line drawings, generous spacing and restrained motion.
- Preserve Arabic shaping: animate complete text blocks, **not individual Arabic letters**.
- Native touch scrolling, responsive layouts, reduced-motion support, keyboard navigation, and a truthful contact flow.
- The checkout contains a React 19 / Next.js 15 Magic UI documentation app. Adding a separate framework-independent deliverable avoids replacing the existing documentation site or requiring Next.js to open the requested file.

## Repository decisions

| Repository | Compatibility | Decision for this website |
| --- | --- | --- |
| [React Bits](https://github.com/DavidHDev/react-bits) | Rich React components for text, backgrounds and interaction; useful in the existing React app, but introduces a React delivery/bundling requirement for a standalone HTML site. Its README identifies an MIT + Commons Clause license rather than plain MIT. | **Not included.** Use original CSS hover details and GSAP whole-block reveals instead. Character splitting could disrupt Arabic joining, and animated backgrounds would compete with technical photography. No React Bits source was copied. |
| [GSAP](https://github.com/greensock/GSAP) | Framework-agnostic; UMD builds run directly in HTML. ScrollTrigger supports viewport-triggered reveals; contexts provide route lifecycle cleanup. | **Selected: GSAP 3.14.2 + ScrollTrigger 3.14.2.** Embedded locally. Animate opacity and transforms with restrained timings; dispose contexts on route changes and respect reduced motion. Original copyright/license headers retained. GSAP uses its own standard license, not MIT. |
| [Lenis](https://github.com/darkroomengineering/lenis) | Lightweight, framework-independent smooth scrolling; suitable for a single document with hash-based views. MIT licensed. | **Selected: Lenis 1.3.17.** Embedded UMD build, smooth mouse wheel, native touch, scroll updates forwarded to ScrollTrigger, explicit resize after page/layout changes, and disabled when reduced motion is requested. |
| [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | React renderer for Three.js. The README states v9 pairs with React 19 and v8 with React 18. Compatible with the original repository's React 19 when paired correctly, but would add React + Three.js + WebGL requirements to the HTML deliverable. MIT licensed. | **Not included.** A meaningful 3D scene would need suitable models, device testing and a non-WebGL fallback. Original SVG engineering illustrations and optimized images communicate the services without GPU/render-loop cost. |
| [Drei](https://github.com/pmndrs/drei) | Helpers for React Three Fiber, using three-stdlib. It is not a standalone substitute for R3F. MIT licensed. | **Not included.** No Three.js scene is needed, so cameras, environment maps, loaders and other R3F helpers add no useful value here. |
| [AutoAnimate](https://github.com/formkit/auto-animate) | Framework-independent DOM layout animation utility with React and other adapters. MIT licensed; technically suitable for tabs and dynamic form feedback. | **Compatible but omitted.** GSAP already handles the limited transitions. Native disclosure widgets work without layout-animation machinery. Avoid overlapping animation ownership and unnecessary dependencies. |
| [Theatre.js](https://github.com/theatre-js/theatre) | Programmatic/visual high-fidelity timeline animation, including DOM/SVG and Three.js scenes. The repository metadata reports Apache-2.0; individual package terms should be checked before adoption. | **Not included.** Authored cinematic timelines and Studio tooling are unnecessary for this content-first service website. They increase implementation and maintenance cost without a corresponding benefit. |

## Implementation notes

- No claim is made that all suggested libraries are installed. Selection is based on the deliverable's requirements, not maximizing dependency count.
- GSAP is used for staggered hero blocks, section entrance effects and tab-panel transitions. CSS handles button arrows, image zoom and small hover changes.
- No scroll hijacking, infinite decorative loops, cursor replacement, autoplay media or WebGL canvas.
- Switching pages updates the document title and navigation's `aria-current`, restores focus to meaningful content, and removes inactive content from layout and the accessibility tree using `hidden`.
- The two photographs are AI-generated illustrative assets, not evidence of completed business projects. The website labels them accordingly.
- Cairo variable font is embedded from `@fontsource-variable/cairo` 5.3.0 with Arabic and Latin subsets. SIL Open Font License notice is embedded in the distributable.
- The missing original logo is a content dependency, not silently replaced with a claimed authentic logo. A generic snowflake service icon and descriptive text are explicitly provisional.

## Trade-offs

A single HTML file repeats some embedded image strings and is larger uncompressed than a normal multi-file website. This is intentional to satisfy portability and offline viewing. The preview server uses gzip, and a normal static host can do the same. There are no font/image/script network requests during ordinary use; WhatsApp is opened only by user action. The form prepares a WhatsApp message and does not impersonate a server-side submission.
