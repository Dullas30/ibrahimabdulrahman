import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Variant = "default" | "link" | "view";

/**
 * Section-aware cursor: a precise brand dot with a trailing ring that
 * expands over interactive elements and morphs into a "View" pill over
 * project cards. Desktop (fine pointer) only.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      if (target.closest("[data-cursor='view']")) setVariant("view");
      else if (target.closest("a, button, [role='button'], input, textarea, select"))
        setVariant("link");
      else setVariant("default");
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  const size = variant === "view" ? 76 : variant === "link" ? 44 : 30;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[210] h-1.5 w-1.5 rounded-full bg-brand"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: variant === "view" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[209] flex items-center justify-center rounded-full ${
          variant === "view"
            ? "bg-brand text-brand-foreground"
            : "border border-foreground/40 mix-blend-difference"
        }`}
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {variant === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-medium uppercase tracking-[0.22em]"
          >
            View
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
