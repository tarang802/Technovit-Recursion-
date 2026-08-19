# Assets

Drop official artwork here. Nothing in this folder is fabricated branding — the
files present are typographic treatments generated from event text only.

| File | Purpose | Replace with |
| --- | --- | --- |
| `og-image.svg` | Open Graph / Twitter share card | A 1200x630 export of the official poster |
| `mic_logo_pixel.png` | Microsoft Innovations Club mark — **in use** | A higher-resolution export or the source vector |
| `mic-logo.svg` *(unused)* | Earlier hand-built approximation | Safe to delete |
| `technovit-logo.svg` *(absent)* | TechnoVIT 2026 mark | Official TechnoVIT logo |
| `poster.jpg` *(absent)* | Full-resolution Recursion poster | The supplied poster artwork |

## About the MIC mark

`mic_logo_pixel.png` is the club's own artwork (220x159, transparent) and is
what the site renders. `mic-logo.svg` was an earlier hand-built approximation
and is no longer referenced — delete it whenever you like.

At 220px wide the PNG is comfortable up to roughly a 3.5rem render on a 2x
screen, which is the largest placement (the footer wordmark). If you ever get
the source vector, swapping it in is a one-file change plus the aspect ratio in
the `--mic-h` rule in `src/styles/globals.css`.

All placements render through `src/components/MicLogo.tsx`, which is the only
place the asset path is written. Current placements: navbar lockup, mobile menu
footer, About "ORGANISER" row, footer wordmark, and footer "ORGANISED BY".

The favicon at `public/favicon.svg` is a nested-rect recursion mark, not a
Microsoft or VIT asset.
