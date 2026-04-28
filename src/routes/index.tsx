import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  }, [i18n.language]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
