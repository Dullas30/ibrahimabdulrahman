import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Linkedin,
  Mail,
  MessageCircleMore,
  Twitter,
} from "lucide-react";
import { SOCIALS } from "@/lib/socials";
import { easeOut } from "@/lib/motion";
import { MaskReveal } from "./motion/MaskReveal";
import { Magnetic } from "./motion/Magnetic";

const socials = [
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${SOCIALS.email}`, label: "Email", Icon: Mail },
  { href: SOCIALS.whatsapp, label: "WhatsApp", Icon: MessageCircleMore },
  { href: SOCIALS.twitter, label: "Twitter (X)", Icon: Twitter },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer-reactive aurora
  const mx = useMotionValue(50);
  const my = useMotionValue(38);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const aurora = useMotionTemplate`radial-gradient(55vw circle at ${sx}% ${sy}%, color-mix(in oklab, var(--brand) 16%, transparent), transparent 70%)`;

  // Scroll-linked exit: hero lifts, fades and drifts as you leave it
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, reduce ? 0.5 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20"
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width) * 100);
        my.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
    >
      {/* Ambient background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: easeOut }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div className="absolute inset-0 grid-bg" style={{ opacity: gridOpacity }} />
        <motion.div className="absolute inset-0" style={{ backgroundImage: aurora }} />
        <motion.div style={{ y: orbY }} className="absolute inset-0">
          <div className="absolute left-1/2 top-[-20%] h-[90vh] w-[90vh] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
          <div className="absolute right-[-15%] bottom-[-25%] h-[55vh] w-[55vh] rounded-full bg-brand-glow/18 blur-[140px]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-tight flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/70 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Available for work
        </motion.div>

        <h1 className="font-display text-[clamp(2.9rem,8.5vw,8rem)] leading-[0.98] tracking-tight text-balance">
          <MaskReveal mode="animate" delay={0.25}>
            Building
          </MaskReveal>{" "}
          <MaskReveal mode="animate" delay={0.38}>
            <span className="font-serif italic font-normal text-brand">clean, responsive</span>
          </MaskReveal>{" "}
          <MaskReveal mode="animate" delay={0.55}>
            digital
          </MaskReveal>{" "}
          <MaskReveal mode="animate" delay={0.66}>
            experiences.
          </MaskReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: easeOut }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/70 text-balance md:text-xl"
        >
          Ibrahim Abdulrahman Sardauna - turning ideas into functional, user-focused websites and
          applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: easeOut }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-medium text-brand-foreground shadow-[0_10px_40px_-10px_var(--brand)] transition-[box-shadow] duration-300 hover:shadow-[0_18px_50px_-8px_var(--brand)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#resume"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-hairline bg-surface/60 px-7 text-sm font-medium text-foreground backdrop-blur transition-colors duration-300 hover:border-brand/50 hover:bg-surface"
            >
              <Download className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
              Resume
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-14 flex items-center gap-2"
        >
          {socials.map(({ href, label, Icon }) => (
            <Magnetic key={label} strength={0.5}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-surface/60 text-foreground/70 backdrop-blur transition-colors duration-300 hover:text-brand hover:border-brand/50"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/45 transition-colors hover:text-foreground/70"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-foreground/15">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-brand"
            animate={reduce ? undefined : { y: ["-100%", "220%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </motion.a>
    </section>
  );
}
