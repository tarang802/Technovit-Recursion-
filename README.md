# RECURSION — EDITION II

Official site for **Recursion — Edition II**, the flagship 24-hour offline hackathon of
**TechnoVIT 2026**, organised by the **Microsoft Innovations Club, VIT Chennai**.

> 3–4 September 2026 · VIT Chennai · 24-hour offline hackathon
> Build. Break. Test. Ship. Repeat.


## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev        # dev server with HMR
npm run build      # type-check then build to dist/



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

