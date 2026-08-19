import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "./motion/Magnetic";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 500 && y > prev);
  });

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      animate={{ y: hidden && !reduce ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-hairline shadow-[0_12px_40px_-24px_rgba(0,0,0,0.55)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Reading progress */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-brand/80"
          style={{ scaleX: progress }}
        />
      )}

      <nav
        aria-label="Primary"
        className="container-tight flex h-16 items-center justify-between md:h-[72px]"
      >
        <Magnetic strength={0.25}>
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Back to top - Ibrahim Sardauna"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground font-display text-base transition-transform duration-500 group-hover:rotate-[10deg]">
              I
            </span>
            <span className="hidden font-display text-lg tracking-tight sm:block">
              Ibrahim<span className="text-brand">.</span>
            </span>
          </a>
        </Magnetic>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                  active === l.id ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-hairline bg-surface/80"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic strength={0.3} className="hidden sm:inline-block">
            <a
              href="#contact"
              className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity duration-300 hover:opacity-90"
            >
              Let's talk
            </a>
          </Magnetic>
        </div>
      </nav>
    </motion.header>
  );
}
