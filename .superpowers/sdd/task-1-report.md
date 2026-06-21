# Task 1 Report: Setup — Dependencies, Globals, and Layout

## What I Implemented

1. **Installed framer-motion** — added to `package.json` / `package-lock.json`
2. **Replaced `app/globals.css`** — new color palette (`--color-dark-charcoal`, `--color-mustard-yellow`, `--color-off-white`, etc.), `fadeInUp` and `grain` keyframes, grain overlay `body::after`
3. **Created `components/ScrollReveal.tsx`** — client component using framer-motion's `useInView` for scroll-triggered fade-in-up animation
4. **Updated `app/layout.tsx`** — new metadata ("Coffee & Culture"), added `bg-off-white text-warm-gray` classes to `<body>`

## Test Results

- `npm run build` — **succeeds** (compiled in 4.2s, TypeScript passes, all pages static)
- `npm run lint` — **passes** (no warnings or errors)

## Files Changed

| File | Action |
|------|--------|
| `package.json` | Modified (framer-motion added) |
| `package-lock.json` | Modified (framer-motion resolution) |
| `app/globals.css` | Modified (full replacement) |
| `app/layout.tsx` | Modified (metadata, body classes) |
| `components/ScrollReveal.tsx` | Created |

## Self-Review Findings

- Every step from the task brief was followed exactly
- No deviations or concerns
- All Tailwind classes (`bg-off-white`, `text-warm-gray`) match the custom theme tokens defined in `globals.css`

## Issues / Concerns

None.
