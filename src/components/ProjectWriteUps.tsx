import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import { Section } from "./Section";
import { easeOut } from "@/lib/motion";

const services = [
  {
    title: "Technical Documentation",
    summary: "Project reports, user guides, system documentation, and implementation notes.",
  },
  {
    title: "Research Support",
    summary:
      "Academic research assistance, formatting, citations, and presentation-ready documents for undergraduate and postgraduate work.",
  },
  {
    title: "Content Structuring",
    summary:
      "Turning complex information into organized, readable documentation without losing technical accuracy.",
  },
];

export function ProjectWriteUps() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title={<>Technical Writing & Documentation</>}
      intro="Alongside development and quality assurance, I create clear, structured documentation that helps technical and academic work communicate effectively."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: easeOut }}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface/50 p-5 backdrop-blur transition-[transform,border-color,background-color] duration-500 hover:-translate-y-0.5 hover:border-brand/35 hover:bg-surface/70"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-60" />
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-hairline bg-background/60 text-brand transition-colors duration-300 group-hover:border-brand/40">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.summary}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mt-5 rounded-2xl border border-hairline bg-background/50 px-5 py-4 text-sm leading-relaxed text-foreground/70"
      >
        Whether it's documenting a product, preparing a professional report, or refining research
        materials, I focus on clarity, accuracy, and well-structured delivery.
      </motion.div>
    </Section>
  );
}
