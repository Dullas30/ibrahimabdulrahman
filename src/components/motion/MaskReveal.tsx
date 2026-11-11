import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

/**
 * Masked text reveal — content rises out of an overflow mask with a
 * subtle rotation, like type being set into place.
 */
export function MaskReveal({
  children,
  delay = 0,
  mode = "inView",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  mode?: "animate" | "inView";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;

  if (mode === "animate") {
    // CSS-driven so it plays on first paint, before JavaScript loads.
    return (
      <span
        className={`inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] ${className}`}
      >
        <span
          className="mask-rise inline-block origin-left"
          style={{ animationDelay: `${delay}s` }}
        >
          {children}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] ${className}`}
    >
      <motion.span
        className="inline-block origin-left will-change-transform"
        initial={{ y: "112%", rotate: 4 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.05, delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </span>
  );
}
