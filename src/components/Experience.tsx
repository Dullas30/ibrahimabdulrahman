import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { experiences } from "@/data/portfolio";
import { easeOut } from "@/lib/motion";

export function Experience() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>A short story so far.</>}
      intro="Work across development, design and IT, with a common thread of shipping useful things."
    >
      <ol ref={listRef} className="relative border-l border-hairline pl-8">
        {/* Journey line - fills as you scroll through the timeline */}
        <motion.span
          aria-hidden
          className="absolute -left-px top-0 h-full w-px origin-top bg-brand shadow-[0_0_12px_var(--brand)]"
          style={{ scaleY: reduce ? 1 : lineScale }}
        />
        {experiences.map((e, i) => (
          <motion.li
            key={`${e.role}-${e.company}`}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: easeOut }}
            className="group relative pb-14 last:pb-0"
          >
            <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-background ring-1 ring-hairline transition-[box-shadow] duration-500 group-hover:ring-brand/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl tracking-tight transition-colors duration-300 group-hover:text-brand">
                {e.role}
              </h3>
              <span className="text-xs uppercase tracking-widest text-foreground/50">
                {e.period}
              </span>
            </div>
            <div className="mt-1 text-sm text-brand">{e.company}</div>
            <ul className="mt-4 space-y-2">
              {e.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-foreground/75">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
