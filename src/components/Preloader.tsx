import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { easeInOut, easeOut } from "@/lib/motion";

/**
 * First-visit cinematic intro: name sets into place while a counter
 * climbs, then the curtain lifts. Once per session; skipped entirely
 * for reduced-motion users.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (reduce || sessionStorage.getItem("intro-seen")) return;
    sessionStorage.setItem("intro-seen", "1");
    setShow(true);
    document.body.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => window.setTimeout(() => setShow(false), 220),
    });
    return () => controls.stop();
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  if (!mounted || reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-background px-6 py-8 md:px-12 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: easeInOut }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-foreground/50">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Portfolio
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              © {new Date().getFullYear()}
            </motion.span>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className="inline-block font-display text-[clamp(2rem,6vw,4.5rem)] tracking-tight will-change-transform"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
              >
                Ibrahim <span className="font-serif italic font-normal text-brand">Sardauna</span>
              </motion.span>
            </span>
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Frontend Developer
            </motion.span>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-full max-w-xs self-center overflow-hidden bg-hairline">
              <motion.div
                className="h-full origin-left bg-brand"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            <span className="font-display text-6xl tabular-nums tracking-tight text-foreground/85 md:text-7xl">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
