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
    <section id="menu" className="relative overflow-hidden bg-light-gray/50 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full border border-muted-purple/10 bg-muted-purple/5" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-[300px] w-[300px] rounded-full bg-muted-purple/10" />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Menu
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-muted-purple sm:text-4xl">
          What we brew.
        </h2>

        <div className="mt-8 flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 text-sm font-semibold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "border-mustard-yellow text-muted-purple"
                  : "border-transparent text-muted-purple/70 hover:text-muted-purple"
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
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-muted-purple">{item.name}</h3>
                  <span className="text-sm font-bold text-mustard-yellow">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-purple/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-purple/50">No items in this category yet.</p>
        )}
      </div>
    </section>
  );
}
