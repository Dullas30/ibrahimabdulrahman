import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Pointer-tracked 3D tilt with a spotlight that follows the cursor.
 * Sets --spot-x/--spot-y on itself for the `spotlight` utility.
 * Desktop (fine pointer) only; no-op for reduced motion.
 */
export function Tilt({
  children,
  className = "",
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 240, damping: 24, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 240, damping: 24, mass: 0.5 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
        e.currentTarget.style.setProperty("--spot-x", `${(px + 0.5) * 100}%`);
        e.currentTarget.style.setProperty("--spot-y", `${(py + 0.5) * 100}%`);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
