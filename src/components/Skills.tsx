import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ChartColumnBig,
  Cloud,
  MonitorSmartphone,
  Palette,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./Section";
import { skillGroups } from "@/data/portfolio";
import { easeOut } from "@/lib/motion";

type SkillGroup = (typeof skillGroups)[number];

type GroupMeta = {
  Icon: LucideIcon;
  summary: string;
  layout: string;
  accent: string;
  line: string;
};

const groupMeta: Record<string, GroupMeta> = {
  Development: {
    Icon: TerminalSquare,
    summary: "The core tools I use to set up, write and ship clean code from the first commit.",
    layout: "xl:col-start-1 xl:row-start-1",
    accent: "from-brand/18 via-brand/8 to-transparent",
    line: "Core development stack",
  },
  Frontend: {
    Icon: MonitorSmartphone,
    summary: "Interfaces built to stay responsive, readable and smooth on every screen size.",
    layout: "xl:col-start-2 xl:row-start-1",
    accent: "from-brand/16 via-transparent to-brand/8",
    line: "Interface building lane",
  },
  "Backend & APIs": {
    Icon: ServerCog,
    summary: "The systems layer: data flow, auth, API work and the services that hold it together.",
    layout: "xl:col-start-3 xl:row-start-1",
    accent: "from-brand/14 via-brand/6 to-transparent",
    line: "Data and service layer",
  },
  "Deployment & Cloud Automation": {
    Icon: Cloud,
    summary: "Shipping, hosting and automation workflows that keep builds moving without friction.",
    layout: "xl:col-start-1 xl:row-start-2",
    accent: "from-brand/14 via-transparent to-brand/10",
    line: "Delivery and automation",
  },
  "AI & Development": {
    Icon: Sparkles,
    summary:
      "AI-assisted workflows for faster iteration, sharper debugging and tighter feedback loops.",
    layout: "xl:col-start-3 xl:row-start-2",
    accent: "from-brand/16 via-brand/8 to-transparent",
    line: "Acceleration and iteration",
  },
  "Design & Creative": {
    Icon: Palette,
    summary: "Visual systems for brand work, layout decisions and polished UI presentation.",
    layout: "xl:col-start-1 xl:row-start-3",
    accent: "from-brand/18 via-transparent to-brand/8",
    line: "Design and presentation",
  },
  Cybersecurity: {
    Icon: ShieldCheck,
    summary:
      "Network and security fundamentals shaped by practical tools and assessment workflows.",
    layout: "xl:col-start-2 xl:row-start-3",
    accent: "from-brand/12 via-transparent to-brand/10",
    line: "Security and analysis",
  },
  "Data Analysis": {
    Icon: ChartColumnBig,
    summary:
      "Data work for reporting, cleaning and visualization, kept exactly as you already had it.",
    layout: "xl:col-start-3 xl:row-start-3",
    accent: "from-brand/14 via-brand/8 to-transparent",
    line: "Reporting and insight",
  },
};

function SkillNode({
  group,
  active,
  onActivate,
  reduce,
}: {
  group: SkillGroup;
  active: boolean;
  onActivate: () => void;
  reduce: boolean;
}) {
  const meta = groupMeta[group.title];
  const Icon = meta.Icon;

  return (
    <motion.button
      type="button"
      onClick={onActivate}
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      className={`group relative flex min-h-[17rem] flex-col overflow-hidden rounded-[1.75rem] border p-5 text-left backdrop-blur transition duration-300 md:p-6 ${
        active
          ? "border-brand/50 bg-surface-elevated shadow-[0_25px_80px_-40px_var(--brand)]"
          : "border-hairline bg-surface/55 hover:border-brand/30 hover:bg-surface"
      } ${meta.layout}`}
      aria-pressed={active}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-80`} />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/35 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/70">
          <Icon className="h-3.5 w-3.5 text-brand" />
          {group.title}
        </span>
        <span className="text-[10px] uppercase tracking-[0.24em] text-foreground/40">
          {String(group.items.length).padStart(2, "0")} tools
        </span>
      </div>

      <p className="relative mt-5 max-w-[22ch] text-sm leading-6 text-foreground/68">
        {meta.summary}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {group.items.slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full border border-hairline bg-background/25 px-3 py-1.5 text-[11px] text-foreground/72"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="relative mt-auto flex items-center gap-3 pt-6 text-[10px] uppercase tracking-[0.2em] text-foreground/45">
        <span className="h-px flex-1 bg-hairline" />
        <span>{meta.line}</span>
      </div>
    </motion.button>
  );
}

function FocusHub({ group, reduce }: { group: SkillGroup; reduce: boolean }) {
  const meta = groupMeta[group.title];
  const Icon = meta.Icon;

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
    exit: { opacity: 0, scale: 0.985, y: -8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial={reduce ? false : "hidden"}
      animate="visible"
      exit="exit"
      className="relative min-h-[19rem] overflow-hidden rounded-[2rem] border border-brand/25 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface-elevated)_88%,transparent),color-mix(in_oklab,var(--surface)_92%,transparent))] p-6 shadow-[0_30px_90px_-45px_var(--brand)] md:min-h-[22rem] md:p-8 xl:col-start-2 xl:row-start-2"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--brand)_16%,transparent),transparent_42%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--brand-glow)_12%,transparent),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3rem_3rem]" />

      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-brand">
              <Sparkles className="h-3.5 w-3.5" />
              Tools I Reach For
            </span>
            <h3 className="mt-4 font-display text-3xl tracking-tight text-balance md:text-5xl">
              A command center for how I build.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/70 md:text-base">
              {meta.summary}
            </p>
          </div>

          <div className="hidden rounded-2xl border border-hairline bg-background/30 px-4 py-3 text-right backdrop-blur xl:block">
            <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/45">
              Active cluster
            </div>
            <div className="mt-2 font-display text-3xl tracking-tight text-foreground">
              {String(group.items.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.items.map((item) => (
              <span
                key={item}
                className="flex items-center justify-between rounded-2xl border border-hairline bg-surface/55 px-4 py-3 text-sm text-foreground/78 backdrop-blur"
              >
                <span>{item}</span>
                <Icon className="h-3.5 w-3.5 text-brand/65" />
              </span>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="relative flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-foreground/45">
          <span className="h-px flex-1 bg-hairline" />
          <span>{meta.line}</span>
          <span className="h-px flex-1 bg-hairline" />
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = skillGroups[activeIdx];

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>Tools I Reach For.</>}
      intro="A command-center view of the tools behind my frontend, backend, deployment, design, cloud, automation and security work. Tap any cluster to spotlight it."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface/40 p-4 md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--brand)_10%,transparent),transparent_35%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--brand-glow)_8%,transparent),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3rem_3rem]" />

        <div className="relative grid gap-4 xl:grid-cols-3 xl:grid-rows-3 xl:auto-rows-[minmax(15.5rem,1fr)]">
          <FocusHub group={active} reduce={reduce} />

          {skillGroups.map((group, i) => (
            <SkillNode
              key={group.title}
              group={group}
              active={activeIdx === i}
              onActivate={() => setActiveIdx(i)}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
