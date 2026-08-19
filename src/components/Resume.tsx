import { Section } from "./Section";
import { Download, FileClock, FileText } from "lucide-react";
import { RESUME_URL } from "@/lib/socials";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Resume() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(RESUME_URL, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;

        const type = res.headers.get("content-type") || "";
        setAvailable(res.ok && type.includes("pdf"));
      })
      .catch(() => !cancelled && setAvailable(false));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title={<>The full story, on one page.</>}
      intro="A concise overview of my experience, projects and skills - ready to read or download."
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-hairline bg-surface/60 p-10 backdrop-blur md:p-14"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-brand-glow/10 blur-3xl"
        />

        <div className="relative flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5 md:max-w-xl">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl border border-hairline bg-background/60 text-brand sm:grid">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                {available === false ? "Resume coming soon." : "View my CV."}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground/70">
                {available === false
                  ? "The PDF hasn't been uploaded yet. In the meantime, feel free to explore the projects and experience below - or reach out directly."
                  : "A concise overview of my experience, projects and skills - open it in your browser or download a copy."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {available === false ? (
              <span className="inline-flex h-12 items-center gap-2 rounded-full border border-hairline bg-background/60 px-6 text-sm font-medium text-foreground/60">
                <FileClock className="h-4 w-4" /> Updating soon
              </span>
            ) : (
              <>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-hairline bg-background/80 px-6 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50"
                >
                  <FileText className="h-4 w-4" /> View CV
                </a>
                <a
                  href={RESUME_URL}
                  download
                  aria-disabled={available === null}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-brand-foreground shadow-[0_10px_40px_-10px_var(--brand)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-8px_var(--brand)]"
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Download CV
                </a>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
