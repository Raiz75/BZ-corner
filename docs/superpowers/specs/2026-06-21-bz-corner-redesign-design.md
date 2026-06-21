# BZ Corner Redesign — Urban Edge

**Date:** 2026-06-21
**Status:** Approved design

---

## Concept

"Urban Edge" — a bold, artistic coffee shop landing page for BZ Corner in Quezon City. Targets students & creatives with a dark, textured, vibrant aesthetic. Think exposed brick, neon signs, street art energy, and excellent coffee.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `dark-charcoal` | `#1A1423` | Hero bg, footer bg, dark sections |
| `muted-purple` | `#8867a5` | Headings, brand elements, primary buttons |
| `light-purple` | `#9071ad` | Hover states, secondary brand elements |
| `mustard-yellow` | `#E8B831` | Accent — CTAs, highlights, decorative elements |
| `warm-beige` | `#b5aea0` | Card backgrounds, soft section backgrounds |
| `warm-gray` | `#aca193` | Body text, muted text |
| `light-gray` | `#d3d1d3` | Borders, dividers, subtle lines |
| `off-white` | `#F1F1F1` | Text on dark backgrounds |

---

## Typography

- **Headings:** Geist Sans, ExtraBold/Black weight, tight tracking (`tracking-tight` or `tracking-tighter`), uppercase for hero impact
- **Body:** Geist Sans, regular weight, `leading-relaxed`
- **Accent text:** Mustard yellow or muted-purple for emphasis

---

## Textures & Effects

- **Grain overlay:** Subtle CSS noise texture on `dark-charcoal` sections at ~3-5% opacity
- **Hand-drawn accents:** Mustard yellow decorative lines/dividers instead of the current purple bar
- **Gradients:** Purple-to-charcoal gradient meshes behind key sections

---

## Page Structure (8 sections)

### 1. Header
- **Position:** Sticky, transparent on hero, `bg-dark-charcoal/80 backdrop-blur-md` on scroll
- **Logo:** "BZ CORNER" in light-purple, bold
- **Nav:** Links — Our Story, Menu, The Vibe, Visit Us — in warm-beige, `hover:text-mustard-yellow`
- **Mobile:** Hamburger icon → fullscreen overlay menu with smooth open/close

### 2. Hero
- **Layout:** Full-screen viewport, split layout
- **Left:** Oversized "BZ CORNER" headline (purple + yellow overlapping layers), tagline in off-white, CTA button (mustard-yellow bg, dark-charcoal text, "Explore Our Menu")
- **Right:** Abstract geometric SVG pattern, or grain-textured graphic element
- **Overlay:** Subtle grain/texture

### 3. About (Our Story)
- **Layout:** Asymmetrical two-column
- **Content:** 1-2 paragraphs about the coffee shop philosophy
- **Visual:** Purple accent bar replaced with mustard yellow hand-drawn-style divider
- **Background:** `bg-white` or `bg-warm-beige/20` to keep it light

### 4. Menu
- **Filter tabs:** All | Coffee | Pastries | Specials
  - Active tab: `text-mustard-yellow border-b-2 border-mustard-yellow`
  - Inactive tab: `text-warm-gray hover:text-muted-purple`
- **Cards:** warm-beige bg, subtle border, rounded
  - Hover: slight lift (`-translate-y-1`), mustard-yellow left accent bar appears
- **Items:** Name (muted-purple), description (warm-gray), price (mustard-yellow, bold, ₱ format)

### 5. Gallery
- **Layout:** 2-3 column grid of images
- **Effect:** Images use `object-cover`, rounded corners, hover zoom scale + purple overlay
- **Placeholder:** Until real photos exist, use abstract gradient/pattern SVGs

### 6. Ambiance (The Vibe)
- **Cards:** 3-4 feature cards in a grid
- **Features:** Cozy Seating, Free WiFi, Quiet Music, Student Discount
- **Each card:** Icon (emoji or SVG), title in muted-purple, description in warm-gray
- **Optional:** Embedded Spotify playlist widget for a "Our Vibe" section
- **Background:** `bg-dark-charcoal` with off-white text for contrast change of pace

### 7. Location (Visit Us)
- **Layout:** Two-column — Address & Hours
- **Address:** 123 Banawe Street, Brgy. St. Peter, Quezon City
- **Hours:** Mon-Fri 7AM-9PM, Sat-Sun 8AM-10PM
- **Style:** Clean, bold labels in muted-purple, values in warm-gray
- **Background:** White or warm-beige/10

### 8. Footer
- **Background:** `bg-dark-charcoal`
- **Content:** Social links (Instagram, Facebook) with icons, copyright, "Brewed with love in Quezon City" in warm-beige
- **Back-to-top:** Button that appears after scrolling past hero, purple bg with yellow arrow icon

---

## Interactivity & Animations

| Feature | Implementation |
|---|---|
| **Scroll reveals** | Framer Motion `fadeInUp` — sections stagger in as they enter viewport |
| **Mobile menu** | Framer Motion `AnimatePresence` — fullscreen overlay with slide-down |
| **Menu filter** | React `useState` — client component, tabs filter the items array |
| **Gallery hover** | CSS `transform: scale()` on hover with transition |
| **Back-to-top** | `useEffect` scroll listener — appears after 400px, smooth scroll to top |
| **Grain overlay** | CSS `::after` pseudo-element with SVG noise filter or CSS gradient pattern, fixed position |
| **Header scroll** | `useEffect` scroll listener — toggle `bg-dark-charcoal/80 backdrop-blur-md` class |
| **Button hovers** | Scale + shadow on hover using CSS transitions |
| **Smooth scroll** | `scroll-smooth` on `<html>` (already present) |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.9 | React framework |
| **React** | 19.2.4 | UI library |
| **Tailwind CSS** | ^4 | Styling |
| **Framer Motion** | ^12 (latest) | Animations |

New dependency: `framer-motion` needs to be installed.

---

## Component Architecture

```
app/
  layout.tsx           — Root layout (fonts, metadata, globals)
  page.tsx             — Assembles all section components
  globals.css          — Tailwind theme + custom styles (grain, keyframes)

components/
  Header.tsx           — "use client" — sticky nav, scroll effect, mobile menu
  Hero.tsx             — Server component — hero section
  About.tsx            — Server component — our story
  Menu.tsx             — "use client" — filterable menu items
  Gallery.tsx          — Server component — image grid
  Ambiance.tsx         — "use client" (if Spotify embed) or server — vibe cards
  Location.tsx         — Server component — address & hours
  Footer.tsx           — Server component — footer + back-to-top button

data/
  menu.ts              — Menu items array (type-safe)
```

Server components stay server where possible. Only Header, Menu, and Footer (back-to-top) need client interactivity.

---

## File Changes Summary

### New files
- `components/Hero.tsx` — already exists, will be rewritten
- `components/Gallery.tsx` — new
- `data/menu.ts` — new (extract menu data from component)
- `public/images/` — placeholder gradient SVGs for gallery

### Modified files
- `app/globals.css` — update theme with new palette, add grain overlay styles, keyframes
- `app/layout.tsx` — update metadata, add fonts
- `app/page.tsx` — import new components, add Gallery
- `components/Header.tsx` — rewrite with scroll effect + mobile menu
- `components/Hero.tsx` — rewrite with split layout + grain overlay
- `components/About.tsx` — refresh with new palette divider
- `components/Menu.tsx` — rewrite with filter tabs + new card design
- `components/Ambiance.tsx` — rewrite with dark bg + icons
- `components/Location.tsx` — refresh palette
- `components/Footer.tsx` — rewrite with dark bg + back-to-top
- `package.json` — add framer-motion dependency

### Deleted files
- All default Next.js SVGs in `public/` (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

---

## Acceptance Criteria

1. All 8 sections render correctly with the Urban Edge palette
2. Scroll-triggered animations work on all sections
3. Menu filter tabs correctly filter items by category
4. Mobile hamburger menu opens/closes smoothly
5. Back-to-top button appears on scroll and scrolls to top
6. Gallery images have hover zoom effect
7. Grain overlay visible on dark sections
8. Header transitions from transparent to solid on scroll
9. Responsive — works on mobile, tablet, desktop
10. `npm run build` completes without errors
11. `npm run lint` passes without errors
