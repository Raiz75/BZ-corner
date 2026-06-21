### Task 1: Setup — Dependencies, Globals, and Layout

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/ScrollReveal.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: global theme tokens `--color-dark-charcoal`, `--color-mustard-yellow`, `--color-off-white` etc.; grain overlay CSS; ScrollReveal wrapper component; layout with updated metadata

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
