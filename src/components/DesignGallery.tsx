import { ArrowDown, Image, Layers3, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";

const designImages = Object.entries(
  import.meta.glob("../assets/designs/*", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .filter(([path]) => /\.(avif|gif|jpe?g|png|webp|pdf)$/i.test(path))
  .map(([path, url]) => ({
    src: url as string,
    name: path.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") ?? "Design",
    isPdf: path.toLowerCase().endsWith(".pdf"),
  }));

/**
 * Add artwork to this section by populating the designs list with image paths,
 * titles and categories. The gallery layout can be introduced when the first
 * pieces are ready; until then, this keeps the portfolio section intentional.
 */
export function DesignGallery() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="designs"
      eyebrow="Graphic design"
      title={<>A space for visual ideas.</>}
      intro="Flyers, brand work and digital creatives—collected in one place to explore."
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate overflow-hidden rounded-[2rem] border border-hairline bg-surface/40 px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--brand)_13%,transparent),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:36px_36px]" />

        {designImages.length > 0 ? (
          <div className="grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {designImages.map((design, index) => (
              <motion.figure
                key={design.src}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
                className="group overflow-hidden rounded-2xl border border-hairline bg-background/50"
              >
                <div className="aspect-[4/5] overflow-hidden bg-surface">
                  {design.isPdf ? (
                    <iframe
                      src={`${design.src}#toolbar=0&navpanes=0&view=FitH`}
                      title={`${design.name} PDF preview`}
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <img
                      src={design.src}
                      alt={design.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <figcaption className="flex items-center gap-2 px-4 py-3 text-sm capitalize text-foreground/75">
                  <Image className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {design.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand/25 bg-brand/10 text-brand">
              <Image aria-hidden className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <p className="mt-7 text-xs uppercase tracking-[0.2em] text-brand">Coming into view</p>
            <h3 className="mx-auto mt-3 max-w-xl font-display text-3xl tracking-tight text-balance sm:text-4xl">
              The first collection is on its way.
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/65 sm:text-base">
              Add image files to <code className="rounded bg-background/70 px-1.5 py-0.5 text-brand">src/assets/designs</code> and
              they will appear here automatically.
            </p>

            <div className="mx-auto mt-9 flex max-w-md flex-wrap items-center justify-center gap-2">
              {["Social creatives", "Flyers & posters", "Brand visuals"].map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/50 px-3.5 py-2 text-xs text-foreground/60"
                >
                  <Layers3 className="h-3.5 w-3.5 text-brand/80" aria-hidden />
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-2 text-xs text-foreground/40">
              <Sparkles className="h-3.5 w-3.5 text-brand/70" aria-hidden />
              <span>Selected work will appear here</span>
              <ArrowDown className="h-3.5 w-3.5" aria-hidden />
            </div>
          </>
        )}
      </motion.div>
    </Section>
  );
}
