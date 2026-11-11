import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowDown, ChevronLeft, ChevronRight, Image, Layers3, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";

const designDetails: Record<string, { title: string; category: string }> = {
  "equipment-market-final.webp": { title: "Equipment Market", category: "Campaign flyer" },
  "nelgro-final-page-01.webp": { title: "NELGRO Equipment Leasing", category: "Brand campaign" },
  "nelgro-flyer-page-01.webp": { title: "NELGRO Equipment Leasing", category: "Campaign flyer" },
  "tgif-equipment-market.webp": { title: "Equipment Market TGIF", category: "Social media post" },
};

// Slides follow the order of designDetails; any other files go at the end.
const designOrder = Object.keys(designDetails);
const orderOf = (path: string) => {
  const index = designOrder.indexOf(path.split("/").pop() ?? "");
  return index === -1 ? designOrder.length : index;
};

const designImages = Object.entries(
  import.meta.glob(
    [
      "../assets/designs/*.avif",
      "../assets/designs/*.gif",
      "../assets/designs/*.jpg",
      "../assets/designs/*.jpeg",
      "../assets/designs/*.png",
      "../assets/designs/*.webp",
    ],
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ),
)
  .filter(([path]) => /\.(avif|gif|jpe?g|png|webp)$/i.test(path))
  .sort(([a], [b]) => orderOf(a) - orderOf(b) || a.localeCompare(b))
  .map(([path, url]) => ({
    src: url as string,
    ...(designDetails[path.split("/").pop() ?? ""] ?? {
      title: (
        path
          .split("/")
          .pop()
          ?.replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ") ?? "Design"
      )
        .replace(/\b(final|draft|v\d+)\b/gi, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      category: "Graphic design",
    }),
  }));

/** Displays design assets found in the designs folder with friendly metadata. */
export function DesignGallery() {
  const reduce = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : designImages[selectedIndex];
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncCarousel = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    syncCarousel();
    emblaApi.on("select", syncCarousel).on("reInit", syncCarousel);
    return () => {
      emblaApi.off("select", syncCarousel).off("reInit", syncCarousel);
    };
  }, [emblaApi, syncCarousel]);

  const step = useCallback((delta: number) => {
    setSelectedIndex((index) =>
      index === null ? index : (index + delta + designImages.length) % designImages.length,
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, step]);

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
        className="relative isolate overflow-hidden rounded-3xl border border-hairline bg-surface/40 p-4 text-center sm:rounded-[2rem] sm:p-8 md:p-10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--brand)_13%,transparent),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:36px_36px]" />

        {designImages.length > 0 ? (
          <>
            <div className="overflow-hidden text-left" ref={emblaRef}>
              <div className="-ml-4 flex touch-pan-y sm:-ml-5">
                {designImages.map((design, index) => (
                  <figure
                    key={design.src}
                    className="group min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 sm:pl-5 lg:basis-1/3"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${designImages.length}`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-hairline bg-background/50">
                      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                        <img
                          src={design.src}
                          alt={`${design.title} design`}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          draggable={false}
                          className="h-full w-full select-none object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedIndex(index)}
                          aria-label={`View ${design.title} ${design.category.toLowerCase()}`}
                          className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-100 transition-opacity duration-300 sm:p-5 sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100"
                        >
                          <span className="rounded-full border border-white/30 bg-black/45 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                            View design <span aria-hidden>↗</span>
                          </span>
                        </button>
                      </div>
                      <figcaption className="flex items-center justify-between gap-3 px-4 py-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground/90">
                            {design.title}
                          </p>
                          <p className="mt-1 text-xs text-foreground/50">{design.category}</p>
                        </div>
                        <Image className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>

            {snapCount > 1 && (
              <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
                <p className="text-xs text-foreground/55">
                  <span className="font-medium text-foreground">{designImages.length}</span> designs
                  · swipe to explore
                </p>
                <div className="flex items-center gap-1.5" aria-hidden>
                  {Array.from({ length: snapCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      tabIndex={-1}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-6 bg-brand"
                          : "w-1.5 bg-foreground/25 hover:bg-foreground/45"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollPrev()}
                    disabled={!canPrev}
                    aria-label="Previous designs"
                    className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-background/60 text-foreground/80 transition hover:border-brand/50 hover:text-brand disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    disabled={!canNext}
                    aria-label="Next designs"
                    className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-background/60 text-foreground/80 transition hover:border-brand/50 hover:text-brand disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
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
              Add image files to{" "}
              <code className="rounded bg-background/70 px-1.5 py-0.5 text-brand">
                src/assets/designs
              </code>{" "}
              and they will appear here automatically.
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
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-2 backdrop-blur-md sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} design preview`}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-hairline bg-surface-elevated shadow-2xl sm:max-h-[92vh] sm:rounded-2xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5 sm:py-4">
                <div>
                  <h3 className="font-display text-xl">{selected.title}</h3>
                  <p className="mt-1 text-xs text-foreground/55">{selected.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="rounded-full border border-hairline px-4 py-2 text-xs text-foreground/70 transition hover:border-brand/50 hover:text-foreground"
                >
                  Close <span aria-hidden>×</span>
                </button>
              </div>
              <div className="relative min-h-0 flex-1 overflow-auto bg-background/70 p-2 sm:p-6">
                {designImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous design"
                      className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:left-4"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next design"
                      className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:right-4"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <img
                  key={selected.src}
                  src={selected.src}
                  alt={`${selected.title} full size design`}
                  className="mx-auto max-h-[80dvh] w-auto max-w-full object-contain sm:max-h-[72vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
