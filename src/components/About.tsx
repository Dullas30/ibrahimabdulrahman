import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Section } from "./Section";
import { CountUp } from "./CountUp";
import { stats } from "@/data/portfolio";
import { easeOut } from "@/lib/motion";

const paragraphs = [
  "Hi, I'm Ibrahim Abdulrahman Sardauna, a creative and detail-oriented IT professional with experience in frontend development, graphic design, branding, and digital content creation.",
  "I enjoy combining React, JavaScript, HTML, CSS, Canva and Figma to build engaging digital experiences, marketing materials, and responsive websites that feel polished and useful.",
  "My background includes a BSc in Cyber Security from Alhikmah University, along with IT support and cybersecurity fundamentals, which helps me approach projects from both technical and creative perspectives.",
  "I'm currently expanding my skills in backend basics and data analysis while continuing to build modern web applications.",
];

const manifesto: { t: string; a?: boolean }[] = [
  { t: "I" }, { t: "turn" }, { t: "ideas" }, { t: "into" }, { t: "functional," },
  { t: "user-focused", a: true }, { t: "products" }, { t: "-" }, { t: "obsessing" },
  { t: "over" }, { t: "the" }, { t: "details", a: true }, { t: "most" }, { t: "people" },
  { t: "never" }, { t: "notice," }, { t: "because" }, { t: "those" }, { t: "are" },
  { t: "the" }, { t: "ones" }, { t: "people" }, { t: "feel.", a: true },
];

function GlowWord({
  progress,
  range,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
  children: string;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className={accent ? "font-serif italic font-normal text-brand" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

export function About() {
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <Section id="about" eyebrow="About" title={<>A developer who cares about the details.</>}>
      {/* Scroll-driven manifesto - words illuminate as you read */}
      <p
        ref={manifestoRef}
        className="mb-20 max-w-4xl font-display text-3xl leading-[1.25] tracking-tight text-balance md:mb-28 md:text-5xl"
      >
        {manifesto.map((w, i) => (
          <GlowWord
            key={i}
            progress={scrollYProgress}
            range={[i / manifesto.length, (i + 1) / manifesto.length]}
            accent={w.a}
          >
            {w.t}
          </GlowWord>
        ))}
      </p>

      {/* Animated stats band */}
      <motion.dl
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="mb-20 grid grid-cols-2 gap-y-10 border-y border-hairline py-10 md:mb-28 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <dd className="font-display text-4xl tracking-tight text-foreground md:text-5xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-2 text-[11px] uppercase tracking-[0.2em] text-foreground/50">
              {s.label}
            </dt>
          </div>
        ))}
      </motion.dl>

      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="space-y-6 text-lg leading-[1.75] text-foreground/75 md:col-span-3 md:text-xl md:leading-[1.7]">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: easeOut }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="md:col-span-2"
        >
          <div className="sticky top-28 rounded-3xl border border-hairline bg-surface/60 p-7 backdrop-blur">
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-brand">Snapshot</div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-7">
              {[
                { k: "Focus", v: "Frontend & Design" },
                { k: "Stack", v: "React, JS, HTML, CSS" },
                { k: "Also", v: "Canva, Figma, Supabase" },
                { k: "Based", v: "Nigeria" },
              ].map(({ k, v }) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.aside>
      </div>
    </Section>
  );
}
