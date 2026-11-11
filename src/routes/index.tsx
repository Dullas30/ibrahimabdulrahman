import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const TITLE = "Ibrahim Abdulrahman Sardauna, Frontend Developer, Designer & AI Video Creator";
const DESCRIPTION =
  "Portfolio of Ibrahim Abdulrahman Sardauna: responsive websites, brand and social media designs, and AI-powered promotional videos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Work />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
