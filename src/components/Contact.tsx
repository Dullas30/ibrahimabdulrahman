import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Linkedin,
  Mail,
  MessageCircleMore,
  Twitter,
} from "lucide-react";
import { Section } from "./Section";
import { SOCIALS } from "@/lib/socials";
import { easeOut } from "@/lib/motion";
import { Magnetic } from "./motion/Magnetic";
import { MaskReveal } from "./motion/MaskReveal";

const items = [
  { label: "Email", value: SOCIALS.email, href: `mailto:${SOCIALS.email}`, Icon: Mail },
  { label: "WhatsApp", value: "08093695126", href: SOCIALS.whatsapp, Icon: MessageCircleMore },
  { label: "LinkedIn", value: "Abdulrahman Ibrahim", href: SOCIALS.linkedin, Icon: Linkedin },
  { label: "Twitter (X)", value: "@_dullas_", href: SOCIALS.twitter, Icon: Twitter },
];

export function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIALS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the mailto links still work */
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          <MaskReveal delay={0}>Let's build</MaskReveal>{" "}
          <MaskReveal delay={0.12}>
            <span className="font-serif italic font-normal text-brand">something.</span>
          </MaskReveal>
        </>
      }
      intro="Open to freelance work, collaborations and interesting frontend roles."
    >
      {/* Primary CTA row */}
      <div className="mb-16 flex flex-col items-start gap-10 md:mb-20 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">
            Prefer email?
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${SOCIALS.email}`}
              className="font-display text-2xl tracking-tight text-foreground transition-colors duration-300 hover:text-brand md:text-3xl"
            >
              {SOCIALS.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email address copied" : "Copy email address"}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-surface/60 text-foreground/70 transition-colors duration-300 hover:border-brand/50 hover:text-brand"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className={copied ? "text-brand" : undefined}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-brand"
                >
                  Copied to clipboard
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <Magnetic strength={0.45}>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="group grid h-40 w-40 place-items-center rounded-full border border-hairline bg-surface/50 text-center backdrop-blur transition-colors duration-500 hover:border-brand/60 hover:bg-brand/10 md:h-44 md:w-44"
            >
              <span className="flex flex-col items-center gap-1 text-sm font-medium">
                Say hello
                <ArrowUpRight className="h-4 w-4 text-brand transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Channel cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ label, value, href, Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: easeOut }}
            className="group flex items-center justify-between rounded-2xl border border-hairline bg-surface/50 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:bg-surface"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-hairline bg-background/60 text-foreground/70 transition-colors duration-300 group-hover:text-brand group-hover:border-brand/40">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/50">
                  {label}
                </div>
                <div className="mt-1 truncate font-medium">{value}</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
