import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { CountUp } from "./CountUp";
import { skillGroups, stats } from "@/data/portfolio";
import { easeOut } from "@/lib/motion";

const paragraphs = [
  "Hi, I'm Ibrahim Abdulrahman Sardauna. I build responsive websites, design brand visuals and marketing materials, and produce AI-powered promotional videos.",
  "With a BSc in Cyber Security and hands-on IT support experience, I approach every project from both the technical and the creative side. I also write clear technical documentation, reports and research documents.",
];

const snapshot = [
  { k: "Focus", v: "Web, Design & AI Video" },
  { k: "Based", v: "Nigeria" },
  { k: "Build with", v: "React, JS, HTML, CSS" },
  { k: "Design in", v: "Canva, Figma, Photoshop" },
];

export function About() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.7, delay, ease: easeOut },
        };

  return (
    <Section id="about" eyebrow="About" title={<>A developer who cares about the details.</>}>
      <div className="grid gap-10 md:grid-cols-5 md:gap-14">
        <div className="md:col-span-3">
          <div className="space-y-5 text-lg leading-[1.7] text-foreground/75 md:text-xl">
            {paragraphs.map((p, i) => (
              <motion.p key={i} {...reveal(i * 0.08)}>
                {p}
              </motion.p>
            ))}
          </div>

          {/* Compact skills - every group at a glance */}
          <motion.dl {...reveal(0.15)} className="mt-10 space-y-4">
            {skillGroups.map((g) => (
              <div
                key={g.title}
                className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <dt className="w-32 shrink-0 text-[11px] uppercase tracking-[0.18em] text-brand">
                  {g.title}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-hairline bg-surface/50 px-3 py-1 text-xs text-foreground/75"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.aside {...reveal(0.1)} className="md:col-span-2">
          <div className="rounded-3xl border border-hairline bg-surface/60 p-7 backdrop-blur md:sticky md:top-28">
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-brand">Snapshot</div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
              {snapshot.map(({ k, v }) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <dl className="mt-7 grid grid-cols-2 gap-y-6 border-t border-hairline pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl tracking-tight text-foreground">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </motion.aside>
      </div>
    </Section>
  );
}
