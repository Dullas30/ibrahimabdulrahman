import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { skillGroups } from "@/data/portfolio";
import { easeOut } from "@/lib/motion";

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden mask-fade-x" aria-hidden>
      <div
        className={`animate-marquee flex w-max shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {[...items, ...items].map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap rounded-full border border-hairline bg-surface/40 px-4 py-2 text-sm text-foreground/55"
          >
            <span className="h-1 w-1 rounded-full bg-brand/70" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = skillGroups[activeIdx];
  const marqueeA = [...skillGroups[0].items, ...skillGroups[2].items];
  const marqueeB = [...skillGroups[1].items, ...skillGroups[3].items];

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>Tools I reach for.</>}
      intro="A working toolkit built around React, TypeScript and a strong sense of design, pick a lane to explore it."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface/35 p-3 shadow-[0_18px_60px_-40px_var(--brand)] sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--brand)_12%,transparent),transparent_28%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--brand-glow)_10%,transparent),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:2.5rem_2.5rem] sm:[background-size:3rem_3rem]" />

        {/* Interactive category switcher */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className="relative -mx-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-2 scrollbar-subtle sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {skillGroups.map((g, i) => (
            <button
              key={g.title}
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveIdx(i)}
              className={`relative flex-none snap-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-2.5 ${
                activeIdx === i
                  ? "text-brand-foreground"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {activeIdx === i && (
                <motion.span
                  layoutId="skill-tab-pill"
                  transition={
                    reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                  }
                  className="absolute inset-0 rounded-full bg-brand shadow-[0_10px_30px_-10px_var(--brand)]"
                />
              )}
              <span className="relative z-10">{g.title}</span>
            </button>
          ))}
        </div>

        {/* Active category grid */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active.title}
            initial={reduce ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
            }}
            className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {active.items.map((item, index) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: easeOut },
                  },
                  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.22 } },
                }}
                className={`group relative overflow-hidden rounded-2xl border border-hairline bg-surface/50 px-4 py-4 backdrop-blur transition-colors duration-500 hover:border-brand/40 hover:bg-surface sm:px-6 sm:py-5 ${
                  index === 0 ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
                }`}
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="font-medium">{item}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                    {active.title}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Drifting skill streams */}
        <div className="mt-12 space-y-3 md:mt-20 md:space-y-3">
          <MarqueeRow items={marqueeA} />
          <MarqueeRow items={marqueeB} reverse />
        </div>
      </div>
    </Section>
  );
}
