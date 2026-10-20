import { useEffect, useState } from "react";
import { ArrowDown, Image, Layers3, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";

const designDetails: Record<string, { title: string; category: string }> = {
  "equipment-market-final.png": { title: "Equipment Market", category: "Campaign flyer" },
  "nelgro-final.pdf": { title: "NELGRO", category: "Brand design" },
  "nelgro-flyer.pdf": { title: "NELGRO", category: "Campaign flyer" },
};

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
    ...designDetails[path.split("/").pop() ?? ""] ?? {
      title: (path.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") ?? "Design")
        .replace(/\b(final|draft|v\d+)\b/gi, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      category: "Graphic design",
    },
    isPdf: path.toLowerCase().endsWith(".pdf"),
  }));

/** Displays design assets found in the designs folder with friendly metadata. */
export function DesignGallery() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<(typeof designImages)[number] | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

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
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  {design.isPdf ? (
                    <iframe
                      src={`${design.src}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                      title={`${design.title} front page preview`}
                      tabIndex={-1}
                      className="pointer-events-none h-full w-full border-0"
                    />
                  ) : (
                    <img
                      src={design.src}
                      alt={`${design.title} design`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelected(design)}
                    aria-label={`View ${design.title} ${design.category.toLowerCase()}`}
                    className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <span className="rounded-full border border-white/30 bg-black/45 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                      View design <span aria-hidden>↗</span>
                    </span>
                  </button>
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-4 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground/90">{design.title}</p>
                    <p className="mt-1 text-xs text-foreground/50">{design.category}</p>
                  </div>
                  <Image className="h-4 w-4 shrink-0 text-brand" aria-hidden />
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
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} design preview`}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-elevated shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4">
                <div>
                  <h3 className="font-display text-xl">{selected.title}</h3>
                  <p className="mt-1 text-xs text-foreground/55">{selected.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-hairline px-4 py-2 text-xs text-foreground/70 transition hover:border-brand/50 hover:text-foreground"
                >
                  Close <span aria-hidden>×</span>
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto bg-background/70 p-3 sm:p-6">
                {selected.isPdf ? (
                  <iframe
                    src={`${selected.src}#toolbar=1&navpanes=0&view=FitH`}
                    title={`${selected.title} full preview`}
                    className="h-[72vh] min-h-[420px] w-full border-0 bg-white"
                  />
                ) : (
                  <img
                    src={selected.src}
                    alt={`${selected.title} full size design`}
                    className="mx-auto max-h-[72vh] w-auto max-w-full object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
