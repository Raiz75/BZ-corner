# BZ Corner Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform BZ Corner landing page from minimal server-rendered site to bold Urban Edge design with animations, menu filters, gallery, mobile menu, and interactive polish.

**Architecture:** 7 existing components rewritten + 1 new (Gallery). Client components (Header, Menu, Footer) use `"use client"` for scroll effects, state, and animations via Framer Motion. Server components (Hero, About, Ambiance, Location, Gallery) stay static. Menu data extracted to `data/menu.ts`. Global styles updated with new palette, grain overlay, and scroll-reveal keyframes.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, Tailwind CSS ^4, Framer Motion ^12

## Global Constraints

- All existing color tokens replaced with new palette (dark-charcoal, muted-purple, light-purple, mustard-yellow, warm-beige, warm-gray, light-gray, off-white)
- Mustard-yellow `#E8B831` is accent color for CTAs, highlights, decorative dividers
- Dark-charcoal `#1A1423` is background for hero, ambiance, footer
- All interactive elements must use `transition-*` or Framer Motion for smooth states
- All section components wrapped with ScrollReveal wrapper for scroll-triggered fade-up entrance
- Components without interactivity must remain server components
- `npm run build` must complete without errors at every task boundary
- `npm run lint` must pass without errors at every task boundary
- No new state management libraries beyond React useState/useEffect

---

### File Structure

| File | Responsibility |
|---|---|
| `app/globals.css` | Tailwind theme tokens, grain overlay, scroll-reveal keyframes |
| `app/layout.tsx` | Metadata, font loading, root layout |
| `app/page.tsx` | Assembles all 8 section components |
| `data/menu.ts` | Typed menu items array with categories |
| `components/Header.tsx` | Client — sticky nav, scroll transition, mobile hamburger menu |
| `components/Hero.tsx` | Server — full-screen split layout with CTAs and grain bg |
| `components/About.tsx` | Server — brand story with mustard-yellow accent |
| `components/Menu.tsx` | Client — filterable tabs + animated cards |
| `components/Gallery.tsx` | Server — image grid with hover zoom |
| `components/Ambiance.tsx` | Server — dark section with vibe cards |
| `components/Location.tsx` | Server — address & hours |
| `components/ScrollReveal.tsx` | Client — wraps children with Framer Motion scroll-triggered fade-up |
| `components/Footer.tsx` | Client — dark footer + back-to-top button |

---

### Task 1: Setup — Dependencies, Globals, and Layout

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: global theme tokens `--color-dark-charcoal`, `--color-mustard-yellow`, `--color-off-white` etc.; CSS class `.grain-overlay`; keyframes `fadeInUp`; layout with updated metadata

- [ ] **Step 1: Install framer-motion**

Run: `npm install framer-motion`

- [ ] **Step 2: Replace globals.css with new theme and styles**

Write `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-dark-charcoal: #1a1423;
  --color-muted-purple: #8867a5;
  --color-light-purple: #9071ad;
  --color-mustard-yellow: #e8b831;
  --color-warm-beige: #b5aea0;
  --color-warm-gray: #aca193;
  --color-light-gray: #d3d1d3;
  --color-off-white: #f1f1f1;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  animation: grain 0.4s steps(4) infinite;
}
```

- [ ] **Step 3: Create ScrollReveal wrapper component**

Write `components/ScrollReveal.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Update layout.tsx**

Write `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BZ Corner | Coffee & Culture",
  description:
    "Bold coffee, good conversations, and a corner that feels like yours. Visit BZ Corner in Quezon City.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-full bg-off-white text-warm-gray">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Build & lint check**

Run: `npm run build`
Expected: Build succeeds with no errors
Run: `npm run lint`
Expected: Lint passes

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json app/globals.css app/layout.tsx components/ScrollReveal.tsx
git commit -m "feat: add framer-motion, new palette, grain overlay, scroll-reveal wrapper, updated layout"
```

---

### Task 2: Menu Data Layer

**Files:**
- Create: `data/menu.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `menuItems` array with `{ name, description, price, category }` — category is `"coffee" | "pastries" | "specials"`

- [ ] **Step 1: Create data/menu.ts**

Write `data/menu.ts`:

```ts
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: "coffee" | "pastries" | "specials";
}

export const menuItems: MenuItem[] = [
  {
    name: "House Blend",
    description: "Smooth, medium-roast coffee with notes of chocolate and caramel.",
    price: "₱120",
    category: "coffee",
  },
  {
    name: "Matcha Latte",
    description: "Ceremonial-grade matcha whisked with steamed oat milk.",
    price: "₱150",
    category: "coffee",
  },
  {
    name: "Cold Brew",
    description: "Slow-steeped for 18 hours for a bold, silky finish.",
    price: "₱135",
    category: "coffee",
  },
  {
    name: "Spanish Latte",
    description: "Espresso with sweetened condensed milk — rich and creamy.",
    price: "₱140",
    category: "coffee",
  },
  {
    name: "Buttered Pastry",
    description: "Flaky, golden-baked croissant or ensaymada — your choice.",
    price: "₱90",
    category: "pastries",
  },
  {
    name: "Pain au Chocolat",
    description: "Buttery laminated dough filled with dark chocolate.",
    price: "₱110",
    category: "pastries",
  },
  {
    name: "Ube Cheesecake",
    description: "Creamy cheesecake with a Filipino ube twist.",
    price: "₱150",
    category: "pastries",
  },
  {
    name: "Caramel Macchiato",
    description: "Layered espresso with vanilla and housemade caramel.",
    price: "₱160",
    category: "specials",
  },
  {
    name: "Dirty Matcha",
    description: "Matcha latte pulled over a shot of espresso.",
    price: "₱165",
    category: "specials",
  },
  {
    name: "Strawberry Lemonade",
    description: "Fresh-pressed lemonade with muddled strawberries.",
    price: "₱130",
    category: "specials",
  },
];
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add data/menu.ts
git commit -m "feat: add typed menu data with categories"
```

---

### Task 3: Header — Sticky Nav with Scroll Effect & Mobile Menu

**Files:**
- Rewrite: `components/Header.tsx`

**Interfaces:**
- Consumes: nothing (all links are hardcoded anchor hrefs)
- Produces: sticky header with `bg-dark-charcoal/80 backdrop-blur-md` on scroll, mobile hamburger with fullscreen overlay

- [ ] **Step 1: Rewrite Header.tsx**

Write `components/Header.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#vibe", label: "The Vibe" },
  { href: "#visit", label: "Visit Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-charcoal/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-extrabold tracking-tight text-light-purple">
          BZ CORNER
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-warm-beige md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-mustard-yellow"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-off-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-6 bg-off-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-off-white"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-dark-charcoal/95 backdrop-blur-lg"
          >
            <ul className="flex flex-col items-center gap-8 text-2xl font-bold text-off-white">
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="transition-colors hover:text-mustard-yellow"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Build & lint check**

Run: `npm run build`
Expected: Build succeeds
Run: `npm run lint`
Expected: Lint passes

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: rewrite header with scroll effect and mobile menu"
```

---

### Task 4: Hero — Split Layout with Urban Edge

**Files:**
- Rewrite: `components/Hero.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: full-screen hero with split layout, dark-charcoal bg, mustard-yellow CTA

- [ ] **Step 1: Rewrite Hero.tsx**

Write `components/Hero.tsx`:

```tsx
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-dark-charcoal px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 pt-24 md:grid-cols-2 md:pt-0">
        <div className="z-10">
          <h1 className="text-5xl font-black tracking-tighter text-muted-purple sm:text-6xl lg:text-7xl">
            BZ
            <span className="block text-mustard-yellow">CORNER</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-off-white sm:text-lg">
            Your daily ritual starts here. Great coffee, warm conversations, and a corner
            that feels like yours.
          </p>
          <a
            href="#menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-mustard-yellow px-8 py-3 text-sm font-bold text-dark-charcoal transition-all hover:scale-105 hover:shadow-xl hover:shadow-mustard-yellow/25"
          >
            Explore Our Menu
            <span className="text-lg">&rarr;</span>
          </a>
        </div>

        <div className="relative hidden h-80 w-full md:block lg:h-96">
          <div className="absolute inset-0 rounded-2xl border border-muted-purple/20 bg-gradient-to-br from-muted-purple/10 to-mustard-yellow/10" />
          <div className="absolute -inset-4 rounded-2xl border border-mustard-yellow/10 bg-gradient-to-tl from-muted-purple/5 to-mustard-yellow/5 blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-6 gap-2 opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-sm ${
                    i % 3 === 0 ? "bg-muted-purple" : i % 3 === 1 ? "bg-mustard-yellow" : "bg-off-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-warm-beige/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rewrite hero with split layout and urban edge design"
```

---

### Task 5: About — Brand Story with Mustard-Yellow Accent

**Files:**
- Rewrite: `components/About.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: about section with mustard-yellow decorative divider

- [ ] **Step 1: Rewrite About.tsx**

Write `components/About.tsx`:

```tsx
export default function About() {
  return (
    <section id="story" className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Our Story
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-charcoal sm:text-4xl">
          Born from a simple belief.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-warm-gray sm:text-lg">
          BZ Corner was born from a simple belief: that a great cup of coffee can turn an
          ordinary day into something special. Nestled in the heart of the neighborhood, we
          source our beans from sustainable farms and roast them with care.
        </p>
        <p className="mt-4 text-base leading-relaxed text-warm-gray sm:text-lg">
          Whether you are catching up with friends, diving into a good book, or stealing a
          quiet moment for yourself — there is always a seat waiting at BZ Corner.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "feat: update about section with mustard-yellow accents"
```

---

### Task 6: Menu — Filterable Tabs with Animated Cards

**Files:**
- Rewrite: `components/Menu.tsx`

**Interfaces:**
- Consumes: `menuItems` from `data/menu.ts`
- Produces: client component with All/Coffee/Pastries/Specials tabs, filtered cards with stagger animation

- [ ] **Step 1: Rewrite Menu.tsx**

Write `components/Menu.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/data/menu";

const tabs = ["all", "coffee", "pastries", "specials"] as const;

export default function Menu() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("all");

  const filtered =
    activeTab === "all" ? menuItems : menuItems.filter((item) => item.category === activeTab);

  return (
    <section id="menu" className="bg-light-gray px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Menu
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-charcoal sm:text-4xl">
          What we brew.
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? "bg-mustard-yellow text-dark-charcoal shadow-lg shadow-mustard-yellow/20"
                  : "bg-white text-warm-gray hover:text-muted-purple"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-mustard-yellow transition-all group-hover:w-full" />
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-muted-purple">{item.name}</h3>
                  <span className="text-sm font-bold text-mustard-yellow">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-warm-gray">No items in this category yet.</p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build & lint check**

Run: `npm run build`
Expected: Build succeeds
Run: `npm run lint`
Expected: Lint passes

- [ ] **Step 3: Commit**

```bash
git add components/Menu.tsx
git commit -m "feat: rewrite menu with filter tabs and animated cards"
```

---

### Task 7: Gallery — Visual Showcase Grid

**Files:**
- Create: `components/Gallery.tsx`

**Interfaces:**
- Consumes: nothing (placeholder gradient divs until real photos exist)
- Produces: 3-column grid with hover-zoom cards

- [ ] **Step 1: Create Gallery.tsx**

Write `components/Gallery.tsx`:

```tsx
const placeholders = [
  { label: "Interior", gradient: "from-muted-purple/40 to-dark-charcoal" },
  { label: "Coffee Bar", gradient: "from-mustard-yellow/30 to-muted-purple/30" },
  { label: "Seating", gradient: "from-dark-charcoal to-muted-purple/40" },
  { label: "Latte Art", gradient: "from-mustard-yellow/20 to-muted-purple/20" },
  { label: "Corner View", gradient: "from-muted-purple/30 to-mustard-yellow/20" },
  { label: "Street View", gradient: "from-dark-charcoal to-mustard-yellow/10" },
];

export default function Gallery() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            The Space
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-charcoal sm:text-4xl">
          See the corner.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((item) => (
            <div
              key={item.label}
              className={`group relative h-64 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} transition-all hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="rounded-full bg-dark-charcoal/60 px-4 py-2 text-sm font-medium text-off-white backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/Gallery.tsx
git commit -m "feat: add gallery section with gradient placeholder cards"
```

---

### Task 8: Ambiance — Dark Section with Vibe Cards

**Files:**
- Rewrite: `components/Ambiance.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: dark-charcoal section with feature cards + icons

- [ ] **Step 1: Rewrite Ambiance.tsx**

Write `components/Ambiance.tsx`:

```tsx
const features = [
  {
    icon: "\u{1F9F6}",
    title: "Cozy Seating",
    description: "Sink into our armchairs with a book and let the hours melt away.",
  },
  {
    icon: "\u{1F4F6}",
    title: "Free WiFi",
    description: "Blazing-fast internet for remote work, study sessions, or scrolling.",
  },
  {
    icon: "\u{1F3B5}",
    title: "Quiet Music",
    description: "Curated lo-fi and jazz playlists that set the perfect mood.",
  },
  {
    icon: "\u{1F393}",
    title: "Student Friendly",
    description: "Discounts for students and plenty of outlets for your devices.",
  },
];

export default function Ambiance() {
  return (
    <section id="vibe" className="bg-dark-charcoal px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-mustard-yellow">
            The Vibe
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-off-white sm:text-4xl">
          More than just coffee.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-beige sm:text-lg">
          Warm lighting, curated playlists, and a space that invites you to stay a little
          longer. Every corner of BZ is made for slow mornings and good company.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-warm-beige/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-mustard-yellow/30 hover:bg-white/10"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 text-base font-semibold text-off-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-beige/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/Ambiance.tsx
git commit -m "feat: rewrite ambiance with dark bg and icon cards"
```

---

### Task 9: Location — Clean Info with Updated Palette

**Files:**
- Rewrite: `components/Location.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: location/hours section with refreshed colors

- [ ] **Step 1: Rewrite Location.tsx**

Write `components/Location.tsx`:

```tsx
export default function Location() {
  return (
    <section id="visit" className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Visit Us
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-charcoal sm:text-4xl">
          Find your corner.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl bg-light-gray/50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-purple">
              Location
            </h3>
            <p className="mt-3 text-base leading-relaxed text-warm-gray">
              123 Banawe Street
              <br />
              Brgy. St. Peter, Quezon City
            </p>
          </div>
          <div className="rounded-xl bg-light-gray/50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-purple">
              Hours
            </h3>
            <p className="mt-3 text-base leading-relaxed text-warm-gray">
              Mon — Fri: 7:00 AM — 9:00 PM
              <br />
              Sat — Sun: 8:00 AM — 10:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add components/Location.tsx
git commit -m "feat: update location with refreshed cards and colors"
```

---

### Task 10: Footer — Dark Footer with Back-to-Top

**Files:**
- Rewrite: `components/Footer.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: dark-charcoal footer with social links, back-to-top button that appears on scroll

- [ ] **Step 1: Rewrite Footer.tsx**

Write `components/Footer.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-dark-charcoal px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="text-xl font-extrabold tracking-tight text-light-purple">
            BZ CORNER
          </p>
          <p className="mt-1 text-sm text-warm-beige/60">
            Brewed with love in Quezon City.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-warm-beige/60 transition-colors hover:text-mustard-yellow"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-sm text-warm-beige/60 transition-colors hover:text-mustard-yellow"
          >
            Facebook
          </a>
        </div>

        <p className="text-xs text-warm-beige/40">
          &copy; {new Date().getFullYear()} BZ Corner. All rights reserved.
        </p>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-muted-purple text-off-white shadow-lg transition-all hover:bg-light-purple hover:shadow-xl"
            aria-label="Back to top"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
```

- [ ] **Step 2: Build & lint check**

Run: `npm run build`
Expected: Build succeeds
Run: `npm run lint`
Expected: Lint passes

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: rewrite footer with dark bg and back-to-top button"
```

---

### Task 11: Page Assembly — Add Gallery and Final Cleanup

**Files:**
- Modify: `app/page.tsx`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

**Interfaces:**
- Consumes: all 8 components
- Produces: final working page

- [ ] **Step 1: Update page.tsx**

Write `app/page.tsx`:

```tsx
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Ambiance from "@/components/Ambiance";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ScrollReveal><Hero /></ScrollReveal>
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Menu /></ScrollReveal>
        <ScrollReveal><Gallery /></ScrollReveal>
        <ScrollReveal><Ambiance /></ScrollReveal>
        <ScrollReveal><Location /></ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Remove default Next.js SVGs**

```bash
Remove-Item -LiteralPath "public/file.svg", "public/globe.svg", "public/next.svg", "public/vercel.svg", "public/window.svg"
```

- [ ] **Step 3: Full build & lint check**

Run: `npm run build`
Expected: Build succeeds with no errors
Run: `npm run lint`
Expected: Lint passes

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git add -A
git commit -m "feat: add gallery to page, clean up default assets"
```

---

## Self-Review Checklist

1. **Spec coverage:** All 8 sections covered (Header, Hero, About, Menu, Gallery, Ambiance, Location, Footer). Grain overlay, scroll reveals, mobile menu, menu filters, back-to-top all covered. ✓
2. **Placeholder scan:** No "TBD", "TODO", "implement later". Every step has complete code. ✓
3. **Type consistency:** MenuItem interface used consistently in Task 2 (data) and Task 6 (component). Framer Motion APIs are consistent. ✓
4. **Build safety:** Each task has a build check step. ✓
