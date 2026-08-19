import type { Transition, Variants } from "framer-motion";

// Signature easings — matches Vercel/Linear/Apple feel.
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
export const easeSpring = [0.34, 1.56, 0.64, 1] as const;

export const smooth: Transition = { duration: 0.7, ease: easeOut };
export const smoothFast: Transition = { duration: 0.45, ease: easeOut };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: smooth },
};

export const stagger = (delay = 0.08, initial = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: initial },
  },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;
