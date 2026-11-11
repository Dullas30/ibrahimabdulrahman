import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { Section } from "./Section";

type Video = {
  title: string;
  client: string;
  tools: string;
  src: string;
  poster: string;
};

/**
 * Add a video: drop a compressed .mp4 (720p, +faststart) and a poster image
 * into public/videos, then add an entry here. Order here = order on the page.
 */
const videos: Video[] = [
  {
    title: "PropVari — How It Works",
    client: "PropVari",
    tools: "Google Flow · Stanley Studio",
    src: "/videos/propvari-promo.mp4",
    poster: "/videos/propvari-promo-poster.webp",
  },
  {
    title: "Your Business. Next Level.",
    client: "NELGRO",
    tools: "Google Flow · Stanley Studio",
    src: "/videos/nelgro-next-level.mp4",
    poster: "/videos/nelgro-next-level-poster.webp",
  },
];

export function VideoShowcase() {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const play = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
    const video = videoRefs.current[index];
    if (!video) return;
    setPlaying(index);
    void video.play().catch(() => setPlaying(null));
  };

  const scrollRow = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>("[data-video-card]");
    row.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };

  return (
    <Section
      id="videos"
      eyebrow="AI video"
      title={
        <>
          Motion, made <span className="font-serif italic font-normal text-brand">with AI.</span>
        </>
      }
      intro="Short promotional videos and product explainers, produced with Google Flow and Stanley Studio."
    >
      <div
        ref={rowRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video, index) => (
          <motion.figure
            key={video.src}
            data-video-card
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
            className="w-[78%] max-w-[320px] shrink-0 snap-start sm:w-[300px]"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline bg-surface">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                poster={video.poster}
                preload="none"
                playsInline
                controls={playing === index}
                onPause={() => setPlaying((p) => (p === index ? null : p))}
                onEnded={() => setPlaying(null)}
                className="h-full w-full object-cover"
              />
              {playing !== index && (
                <button
                  type="button"
                  onClick={() => play(index)}
                  aria-label={`Play ${video.title}`}
                  className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-brand-foreground shadow-[0_12px_40px_-10px_var(--brand)] transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-4 px-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-brand">{video.client}</p>
              <p className="mt-1.5 font-medium text-foreground/90">{video.title}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-foreground/50">
                <Sparkles className="h-3 w-3 text-brand/70" aria-hidden />
                {video.tools}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {videos.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-foreground/55">
            <span className="font-medium text-foreground">{videos.length}</span> videos · swipe to
            explore
          </p>
          <div className="flex gap-2">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => scrollRow(direction)}
                aria-label={direction === -1 ? "Previous videos" : "Next videos"}
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-background/60 text-foreground/80 transition hover:border-brand/50 hover:text-brand"
              >
                {direction === -1 ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
