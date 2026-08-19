import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";

const TITLE = "Ibrahim Abdulrahman Sardauna - Frontend Developer & IT Professional";
const DESCRIPTION =
  "Portfolio of Ibrahim Abdulrahman Sardauna, a Frontend Developer and IT Professional building clean, responsive, user-focused websites and applications.";

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
        <Preloader />
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
