import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github, X } from "lucide-react";
import { Section } from "./Section";
import { Tilt } from "./motion/Tilt";
import { projects, type Project } from "@/data/portfolio";
import { easeInOut, easeOut } from "@/lib/motion";

export function Projects() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const projectOrder: Record<string, number> = {
    nelcoop: 0,
    "ridewise-ng": 1,
    "sub-urban-wears": 2,
  };
  const orderedProjects = [...projects].sort((a, b) => {
    const aRank = projectOrder[a.slug] ?? 99;
    const bRank = projectOrder[b.slug] ?? 99;
    return aRank - bRank;
  });
  const featuredProjects = orderedProjects.slice(0, 3);
  const extraProjects = orderedProjects.slice(3);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <Section
      id="work"
      eyebrow="Featured work"
      title={<>Selected projects.</>}
      intro="A short list of the strongest builds first, with the rest available if you want to dig deeper."
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {featuredProjects.map((p, i) => {
          const featuredClassName =
            i === 0 ? "md:col-span-2" : "";

          return (
            <motion.article
              key={p.slug}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: easeOut }}
              className={featuredClassName}
            >
              <Tilt className="h-full" max={3.5}>
                <div
                  data-cursor="view"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open the ${p.name} case study`}
                  onClick={() => setActive(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(p);
                    }
                  }}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-hairline bg-surface/50 backdrop-blur transition-[border-color,box-shadow,background-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/40 hover:bg-surface/70 hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]"
                >
                  {/* Spotlight that follows the pointer */}
                  <div
                    aria-hidden
                    className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Browser mockup frame */}
                  <div className="relative m-3 overflow-hidden rounded-2xl border border-hairline bg-background">
                    <div className="flex items-center gap-1.5 border-b border-hairline bg-background/80 px-3.5 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                      <span className="ml-3 truncate text-[10px] text-foreground/40">
                        {p.live?.replace(/^https?:\/\//, "").replace(/\/$/, "") || p.slug}
                      </span>
                    </div>
                    <div className="relative aspect-[2/1] overflow-hidden bg-background">
                      <img
                        src={p.image.url}
                        alt={`${p.name} preview`}
                        loading="lazy"
                        className="h-full w-full object-contain object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.01]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 pt-3 md:p-8 md:pt-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-foreground/50">
                      <span>{p.tagline}</span>
                      <span className="h-1 w-1 rounded-full bg-foreground/30" />
                      <span>{p.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl tracking-tight transition-colors duration-300 group-hover:text-brand md:text-3xl">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {p.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-hairline bg-background/60 px-2.5 py-1 text-[11px] text-foreground/70 transition-colors duration-300 ease-out group-hover:border-brand/25 group-hover:text-foreground/85"
                        >
                          {t}
                        </li>
                      ))}
                      {p.stack.length > 5 && (
                        <li className="rounded-full px-2.5 py-1 text-[11px] text-foreground/50">
                          +{p.stack.length - 5}
                        </li>
                      )}
                    </ul>
                    <div className="mt-7 flex flex-wrap items-center gap-2">
                      <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-xs font-medium text-background transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                        View Case Study
                      </span>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-hairline bg-surface px-5 text-xs font-medium text-foreground/90 transition-all duration-300 ease-out hover:border-brand/50 hover:text-brand"
                      >
                        Live Demo{" "}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${p.name} on GitHub`}
                          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-hairline bg-surface px-5 text-xs font-medium text-foreground/90 transition-all duration-300 ease-out hover:border-brand/50 hover:text-brand"
                        >
                          <Github className="h-3.5 w-3.5" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface/40 px-4 py-4 backdrop-blur">
        <div>
          <p className="text-sm font-medium text-foreground">Want to see the full set?</p>
          <p className="mt-1 text-sm text-foreground/65">
            {showAll ? `Showing all ${orderedProjects.length} projects.` : `Only ${featuredProjects.length} are featured here. The rest are one click away.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline bg-background px-4 text-sm font-medium text-foreground/90 transition-all duration-300 ease-out hover:border-brand/50 hover:text-brand"
        >
          {showAll ? "Show fewer" : "View all projects"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showAll && extraProjects.length > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
              {extraProjects.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: easeOut }}
                >
                  <Tilt className="h-full" max={3.5}>
                    <div
                      data-cursor="view"
                      role="button"
                      tabIndex={0}
                      aria-label={`Open the ${p.name} case study`}
                      onClick={() => setActive(p)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(p);
                        }
                      }}
                      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-hairline bg-surface/50 backdrop-blur transition-[border-color,box-shadow,background-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/40 hover:bg-surface/70 hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]"
                    >
                      <div
                        aria-hidden
                        className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="relative m-3 overflow-hidden rounded-2xl border border-hairline bg-background">
                        <div className="flex items-center gap-1.5 border-b border-hairline bg-background/80 px-3.5 py-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                          <span className="ml-3 truncate text-[10px] text-foreground/40">
                            {p.live?.replace(/^https?:\/\//, "").replace(/\/$/, "") || p.slug}
                          </span>
                        </div>
                        <div className="relative aspect-[2/1] overflow-hidden bg-background">
                          <img
                            src={p.image.url}
                            alt={`${p.name} preview`}
                            loading="lazy"
                            className="h-full w-full object-contain object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.01]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6 pt-3 md:p-8 md:pt-4">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-foreground/50">
                          <span>{p.tagline}</span>
                          <span className="h-1 w-1 rounded-full bg-foreground/30" />
                          <span>{p.year}</span>
                        </div>
                        <h3 className="mt-3 font-display text-2xl tracking-tight transition-colors duration-300 group-hover:text-brand md:text-3xl">
                          {p.name}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                          {p.description}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 5).map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-hairline bg-background/60 px-2.5 py-1 text-[11px] text-foreground/70 transition-colors duration-300 ease-out group-hover:border-brand/25 group-hover:text-foreground/85"
                            >
                              {t}
                            </li>
                          ))}
                          {p.stack.length > 5 && (
                            <li className="rounded-full px-2.5 py-1 text-[11px] text-foreground/50">
                              +{p.stack.length - 5}
                            </li>
                          )}
                        </ul>
                        <div className="mt-7 flex flex-wrap items-center gap-2">
                          <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-xs font-medium text-background transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                            View Case Study
                          </span>
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-hairline bg-surface px-5 text-xs font-medium text-foreground/90 transition-all duration-300 ease-out hover:border-brand/50 hover:text-brand"
                          >
                            Live Demo{" "}
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`${p.name} on GitHub`}
                              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-hairline bg-surface px-5 text-xs font-medium text-foreground/90 transition-all duration-300 ease-out hover:border-brand/50 hover:text-brand"
                            >
                              <Github className="h-3.5 w-3.5" /> GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  );
}

function CaseStudyLabel({ children }: { children: React.ReactNode }) {
  return <h4 className="text-xs uppercase tracking-[0.16em] text-brand">{children}</h4>;
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const cs = project.caseStudy;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-background/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.55, ease: easeInOut }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-hairline bg-surface-elevated shadow-2xl sm:max-h-[88dvh] sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-background/70 text-foreground/70 backdrop-blur transition hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className="scrollbar-subtle min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-background">
            <motion.img
              src={project.image.url}
              alt={`${project.name} preview`}
              initial={reduce ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: easeOut }}
              className="h-full w-full object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-2 text-xs text-foreground/60">
              <span>{project.tagline}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              {project.name}
            </h3>
            <p className="mt-4 leading-relaxed text-foreground/75">{project.overview}</p>

            {/* Problem / Solution */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-hairline bg-background/50 p-6">
                <CaseStudyLabel>The problem</CaseStudyLabel>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{cs.problem}</p>
              </div>
              <div className="rounded-2xl border border-hairline bg-background/50 p-6">
                <CaseStudyLabel>The solution</CaseStudyLabel>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{cs.solution}</p>
              </div>
            </div>

            {/* Process */}
            <div className="mt-10">
              <CaseStudyLabel>Process</CaseStudyLabel>
              <ol className="mt-4 space-y-4">
                {cs.process.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-display text-sm tabular-nums text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key features */}
            <div className="mt-10">
              <CaseStudyLabel>Key features</CaseStudyLabel>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div className="mt-10">
              <CaseStudyLabel>Technology stack</CaseStudyLabel>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-hairline bg-background/60 px-2.5 py-1 text-xs text-foreground/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div className="mt-10 rounded-2xl border border-brand/25 bg-brand/8 p-6">
              <CaseStudyLabel>The outcome</CaseStudyLabel>
              <p className="mt-3 leading-relaxed text-foreground/85">{cs.results}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 pb-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand px-6 text-sm font-medium text-brand-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_var(--brand)]"
                >
                  Live Demo <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-1.5 rounded-full border border-hairline bg-surface px-6 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
