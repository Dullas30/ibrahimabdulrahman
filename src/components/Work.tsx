import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Code2, Clapperboard, Palette } from "lucide-react";
import { Section } from "./Section";
import { Projects } from "./Projects";
import { DesignGallery } from "./DesignGallery";
import { VideoShowcase } from "./VideoShowcase";

const tabs = [
  { id: "websites", label: "Websites", Icon: Code2 },
  { id: "designs", label: "Designs", Icon: Palette },
  { id: "videos", label: "AI Videos", Icon: Clapperboard },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabFromHash = (hash: string): TabId | null => {
  const id = hash.replace("#", "");
  return tabs.some((t) => t.id === id) ? (id as TabId) : null;
};

/** All work in one place: websites, graphic design and AI video, switched by tabs. */
export function Work() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<TabId>("websites");

  // Old links like #designs / #videos open the matching tab.
  useEffect(() => {
    const sync = () => {
      const tab = tabFromHash(window.location.hash);
      if (!tab) return;
      setActive(tab);
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <Section
      id="work"
      eyebrow="Work"
      title={
        <>
          Things I've <span className="font-serif italic font-normal text-brand">made.</span>
        </>
      }
      intro="Websites, brand designs and AI-powered videos - pick a category to explore."
    >
      {/* Anchors so #designs and #videos still land here */}
      <span id="designs" className="sr-only" />
      <span id="videos" className="sr-only" />

      <div
        role="tablist"
        aria-label="Work categories"
        className="mb-10 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-hairline bg-surface/50 p-1.5 backdrop-blur [scrollbar-width:none] md:mb-12"
      >
        {tabs.map(({ id, label, Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`work-tab-${id}`}
              aria-selected={selected}
              aria-controls="work-panel"
              onClick={() => setActive(id)}
              className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-5 ${
                selected ? "text-brand-foreground" : "text-foreground/65 hover:text-foreground"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="work-tab-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-brand shadow-[0_8px_30px_-12px_var(--brand)]"
                />
              )}
              <Icon className="relative z-10 h-4 w-4" aria-hidden />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${active}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {active === "websites" && <Projects embedded />}
          {active === "designs" && <DesignGallery embedded />}
          {active === "videos" && <VideoShowcase embedded />}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
