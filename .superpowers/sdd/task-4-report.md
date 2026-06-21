# Task 4: Hero — Split Layout with Urban Edge

**Status:** ✅ Complete

## Commits

- `b92b4bc` — `feat: rewrite hero with split layout and urban edge design`

## Changes

Rewrote `components/Hero.tsx` with:
- Split layout (`md:grid-cols-2`) — left copy, right decorative block
- Urban edge styling: `bg-dark-charcoal`, `text-muted-purple` / `mustard-yellow` / `off-white`
- Brand name split across two lines with `BZ` and `CORNER` distinct
- Decorative right panel with gradient borders, blur effect, and 6×6 pixel grid pattern at 20% opacity
- CTA pill button with mustard-yellow, scale/shadow hover effect, and arrow
- Bounce scroll indicator at bottom center
- Scroll indicator SVG arrow at bottom

## Build & Lint

- `npm run build` — ✅ Compiled successfully (TypeScript, Turbopack, static pages)
- `npm run lint` — ✅ No errors

## Report Path

`.superpowers/sdd/task-4-report.md`
