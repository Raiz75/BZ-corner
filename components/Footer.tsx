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
