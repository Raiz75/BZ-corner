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
