import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import "@/lib/i18n";
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
  head: () => ({
    meta: [
      { title: "Ahmed Ben Hamouda — Software Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Ahmed Ben Hamouda — Software Engineer, Full-Stack Developer (React, Angular, .NET Core) and IT Support Specialist based in Tunis, Tunisia.",
      },
      { property: "og:title", content: "Ahmed Ben Hamouda — Software Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Bilingual personal portfolio: full-stack development, cloud experience and technical support.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
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
