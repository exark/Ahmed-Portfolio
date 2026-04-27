import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Mail, MapPin, Github } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Background ornaments */}
      <div className="pointer-events-none absolute inset-0 bg-hero" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.85 0.08 250 / 0.6), transparent)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.06 230 / 0.5), transparent)",
        }}
        aria-hidden
      />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("hero.available")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-center text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          <span className="block text-muted-foreground text-base md:text-lg font-normal mb-3 tracking-normal">
            {t("hero.greeting")}
          </span>
          <span className="text-gradient">{t("hero.name")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-border bg-surface-elevated px-3.5 py-1.5 text-xs font-medium text-charcoal shadow-soft"
            >
              {r}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-navy-foreground shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            {t("hero.viewProjects")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/Ahmed_Ben_Hamouda_CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3 text-sm font-medium text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-muted"
          >
            <Download size={16} />
            {t("hero.downloadResume")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            <Mail size={16} />
            {t("hero.contactMe")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <a
            href="https://github.com/exark"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Github size={14} /> github.com/exark
          </a>
          <a
            href="mailto:ali.ahmed.benhamouda@gmail.com"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail size={14} /> ali.ahmed.benhamouda@gmail.com
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {t("hero.location")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
