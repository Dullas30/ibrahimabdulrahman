import { motion } from "framer-motion";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-28 md:py-40 ${className}`}>
      <div className="container-tight">
        {(eyebrow || title || intro) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-2xl md:mb-20"
          >
            {eyebrow && (
              <div className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-brand">
                <span className="h-px w-8 bg-brand/60" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-balance md:text-6xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg text-balance">{intro}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
