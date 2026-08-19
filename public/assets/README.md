# Assets

Drop official artwork here. Nothing in this folder is fabricated branding — the
files present are typographic treatments generated from event text only.

| File | Purpose | Replace with |
| --- | --- | --- |
| `og-image.svg` | Open Graph / Twitter share card | A 1200x630 export of the official poster |
| `mic-logo.svg` | Microsoft Innovations Club mark | **The official MIC vector — see note below** |
| `technovit-logo.svg` *(absent)* | TechnoVIT 2026 mark | Official TechnoVIT logo |
| `poster.jpg` *(absent)* | Full-resolution Recursion poster | The supplied poster artwork |

## About `mic-logo.svg`

The current file is a **hand-built SVG approximation** of the MIC four-hexagon
mark, traced from a raster reference. The geometry and gradient directions
match, but the exact brand hex values and corner radii have not been verified
against an official source.

**Replace it with the club's real vector when you have it.** Overwrite this one
file and every placement updates — nothing in `src/` needs to change.

All placements render through `src/components/MicLogo.tsx`, which is the only
place the asset path is written. Current placements: navbar lockup, mobile menu
footer, About "ORGANISER" row, footer wordmark, and footer "ORGANISED BY".

The favicon at `public/favicon.svg` is a nested-rect recursion mark, not a
Microsoft or VIT asset.
