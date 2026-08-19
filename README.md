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



## Project structure
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


