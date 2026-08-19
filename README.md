# RECURSION — EDITION II

Official site for **Recursion — Edition II**, the flagship 24-hour offline hackathon of
**TechnoVIT 2026**, organised by the **Microsoft Innovations Club, VIT Chennai**.

> 3–4 September 2026 · VIT Chennai · 24-hour offline hackathon
> Build. Break. Test. Ship. Repeat.

---

## Overview

A single-page, scroll-driven site built around one idea: the page itself recurses.
The same programmatic tunnel engine renders the hero, the philosophy section, the
tracks, the prize reveal, the registration call and the closing loop — each with
different parameters, so the visitor moves deeper into the *same object* rather
than through a sequence of unrelated sections. The footer returns to the hero's
visual language and offers `ENTER AGAIN`, which scrolls back to the top and closes
the loop.

Every fact on the page comes from the official sponsorship prospectus or the
competition brief. Nothing is invented — no sponsors, no judges, no winners, no
prize breakdown, no registration URL.

## Technology

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | React 18 + TypeScript | Component architecture, strict typing |
| Build | Vite 5 | Fast dev server, small production output |
| Styling | Hand-written CSS with custom properties | The brutalist editorial layout is mostly bespoke type and grid work; utility classes would have added a dependency without reducing the CSS actually written. All tokens live in `src/styles/globals.css`. |
| Animation | Native `requestAnimationFrame`, `IntersectionObserver`, CSS transitions | No animation library. Framer Motion would have added ~100 KB for reveals that four lines of CSS already handle. |
| Artwork | Canvas 2D | Chosen over WebGL: the tunnel is nested axis-aligned rectangles, which the 2D rasteriser draws faster than a shader pipeline would set up, and it runs identically on low-end phones without a WebGL context. |

Total runtime dependencies: `react`, `react-dom`. Nothing else.

Production bundle: ~190 KB JS (59 KB gzipped), ~31 KB CSS (7 KB gzipped).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev        # dev server with HMR
npm run build      # type-check then build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # types only
npm run smoke      # headless jsdom mount: runs every effect, asserts content, fails on console errors
```

`npm run smoke` is the guard against regressions. It mounts the entire app in
jsdom, lets all effects run, and asserts that the five tracks exist, all fourteen
schedule entries render, the canonical date is present, the poster's superseded
August date appears nowhere, and no console error is emitted.

## Deployment

The build is fully static. `vite.config.ts` sets `base: './'`, so `dist/` works from
any path — a domain root, a subfolder, or a GitHub Pages project page.

```bash
npm run build      # output in dist/
```

- **Vercel / Netlify** — build command `npm run build`, output directory `dist`.
- **GitHub Pages** — push `dist/` to `gh-pages`, or use `actions/deploy-pages`.
- **Any static host** — upload the contents of `dist/`.

No server, no environment variables, no API keys.

---

## Where to change things

### Event information

**`src/config/event.ts`** is the single source of truth. Dates, venue, prize pool,
registration counts, social URLs, the email address and all recurring strings live
in the `event` object. No component hard-codes event copy.

Longer editorial content lives beside it:

| File | Contains |
| --- | --- |
| `src/config/event.ts` | Core facts, nav links, pre-filled `mailto:` links |
| `src/data/tracks.ts` | The five competition tracks |
| `src/data/schedule.ts` | The full event flow, both days |
| `src/data/content.ts` | Judging, judge benefits, partner tiers, challenge steps, stats |

### Registration URL

Change **one constant**:

```ts
// src/config/event.ts
export const REGISTRATION_URL = '#registration';
```

Replace with the real absolute URL when it exists:

```ts
export const REGISTRATION_URL = 'https://your-real-registration-link';
```

`src/components/RegisterLink.tsx` is the only place registration navigation is
implemented. Every "Enter Recursion" / "Register" button on the site uses it, so
changing the constant updates all of them at once. The component detects whether
the value is an internal anchor or an external URL and applies
`target="_blank" rel="noopener noreferrer"` automatically. The registration
section's copy also switches from "details will be announced" to "registration is
open" on its own.

### Logos and assets

Drop files into **`public/assets/`** — see `public/assets/README.md` for the
expected filenames. Nothing in that folder is fabricated branding: the only
generated file is a typographic Open Graph card built from event text.

The MIC and TechnoVIT logos could not be cleanly extracted from the supplied PDF
as vectors, so the navbar and footer currently use a typographic wordmark.
Once `mic-logo.svg` and `technovit-logo.svg` are in `public/assets/`, swap the
wordmark spans in `Navbar.tsx` and `Footer.tsx` for `<img src="./assets/…">`.

The favicon at `public/favicon.svg` is a nested-rect recursion mark.

---

## How the recursive artwork works

`src/components/RecursiveTunnel.tsx` is a single reusable Canvas 2D component. It
draws `depth + 1` nested rectangles, largest first, each scaled by a constant
factor `K = 0.78` from the one outside it.

The infinite zoom comes from a single fractional phase `frac`, which advances from
0 to 1 and wraps:

```
size(layer i) = base × K^(i − frac)
```

When `frac` reaches 1, layer *i* has become exactly the size layer *i−1* was at
`frac = 0`. The configuration is identical, so the wrap is seamless — the tunnel
never visibly restarts, which is what stops it reading as a looping GIF. Colour is
sampled from a crimson ramp at `(i − frac) / depth`, so hue travels outward with
the geometry and wraps on the same period.

### Props

| Prop | Effect |
| --- | --- |
| `depth` | Number of nested rectangles |
| `speed` | Cycles per second of the zoom |
| `intensity` | Brightness multiplier on the crimson ramp |
| `distortion` | Per-layer sinusoidal displacement, in pixels |
| `rotation` | Rotation accumulated per layer, in radians |
| `scale` | Size of the outermost rectangle |
| `mouseInfluence` | Pixels of drift toward the pointer |
| `scrollInfluence` | How much page scroll accelerates the descent |
| `geometry` | `square` · `window` · `grid` · `pulse` · `node` — the shape stroked inside each layer |
| `originX` / `originY` | Vanishing point as a fraction of the canvas |
| `boost` | Extra progress on top of scroll, e.g. a hover state |
| `pointer` / `scroll` | Shared refs from `useMousePosition` / `useScrollProgress` |

Section by section: the hero runs `depth: 20` with an off-centre vanishing point;
About drops to `depth: 13` at 55% intensity; Philosophy rewrites `distortion`,
`speed` and `geometry` live as you hover each of the five words; Tracks swaps
`geometry` per track; the Prize and Registration sections widen the scale; the
final loop runs the deepest tunnel in the build at `depth: 24`.

### Performance

- One `requestAnimationFrame` loop per canvas, no per-frame allocations.
- Pointer and scroll are read from refs, so mouse movement never re-renders React.
- `IntersectionObserver` pauses rendering when a canvas leaves the viewport, and
  `document.hidden` pauses it when the tab is backgrounded.
- Device pixel ratio capped at 2, or 1.5 below 768px.
- Film grain is a 160px pre-generated tile drawn as a pattern, refreshed on
  alternating frames.
- Props are mirrored into a ref, so changing `geometry` or `speed` mutates the
  running loop instead of tearing it down and starting a new one.

### Reduced motion

With `prefers-reduced-motion: reduce`, the tunnel renders **one static frame** and
never starts a loop — the artwork is still present, it simply doesn't move. The
loading sequence is skipped entirely, the custom cursor doesn't mount, counters
jump to their final values, and all CSS transitions collapse to ~0ms. Every piece
of content remains reachable; nothing is animation-dependent.

---

## Project structure

```
recursion-edition-ii/
├── index.html                 SEO, Open Graph, Twitter, JSON-LD Event schema, fonts
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── public/
│   ├── favicon.svg
│   └── assets/                drop official logos here
├── scripts/
│   └── smoke.tsx              headless mount + content assertions
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── config/
    │   └── event.ts           ← all event facts and REGISTRATION_URL
    ├── data/
    │   ├── tracks.ts
    │   ├── schedule.ts
    │   └── content.ts
    ├── hooks/
    │   ├── useMousePosition.ts
    │   ├── useScrollProgress.ts
    │   ├── useReducedMotion.ts
    │   └── useInView.ts
    ├── styles/
    │   ├── globals.css        design tokens, type scale, buttons, cursor, grain
    │   └── sections.css       per-section layout
    └── components/
        ├── RecursiveTunnel.tsx    the recursion engine
        ├── Loader.tsx            NoiseOverlay.tsx      CustomCursor.tsx
        ├── Navbar.tsx            RegisterLink.tsx      Hero.tsx
        ├── About.tsx             Stats.tsx             Philosophy.tsx
        ├── Tracks.tsx            Experience.tsx        BringYourOwnChallenge.tsx
        ├── Timeline.tsx          Judging.tsx           Judges.tsx
        ├── Partners.tsx          PrizePool.tsx         Registration.tsx
        └── Footer.tsx            (includes the final loop)
```

## Accessibility

- Semantic landmarks, one `h1`, ordered heading levels.
- Skip link to `#main`.
- Tracks are a real disclosure pattern (`aria-expanded` / `aria-controls`); the
  mobile menu traps nothing and closes on `Escape`.
- Visible focus rings on every interactive element.
- Animated counters expose their final value to screen readers via `.sr-only`
  while the animated digits are `aria-hidden`.
- Decorative system metadata (`DEPTH: 0042`, `SIGNAL: ONLINE`) is inert text and
  never carries meaning that isn't available elsewhere.
- All canvases are `aria-hidden`.

## A note on the dates

The supplied poster carries **29–30 August 2026**. The official prospectus carries
**3–4 September 2026**. September is treated as canonical throughout, and the
smoke test fails the build if the August date ever appears in rendered output.

---

Microsoft Innovations Club, VIT Chennai · mic.vit.chennai@gmail.com
Once the clock starts, it's on.
