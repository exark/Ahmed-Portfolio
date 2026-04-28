import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Mail, MapPin, Github } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32"
    >
      {/* Background ambient */}
      <div className="pointer-events-none absolute inset-0 bg-hero" aria-hidden />
      <div
        className="pointer-events-none absolute -top-44 left-1/2 h-[640px] w-[1080px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.84 0.07 250 / 0.55), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-background)]"
        aria-hidden
      />

      <div className="container-page relative">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("hero.available")}
        </motion.div>

        {/* Greeting label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-8 text-center text-sm font-medium text-muted-foreground md:text-base"
        >
          {t("hero.greeting")}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-3 max-w-4xl text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
        >
          <span className="text-gradient">{t("hero.name")}</span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-navy-foreground shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            {t("hero.viewProjects")}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
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
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={16} />
            {t("hero.contactMe")}
          </a>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} /> {t("hero.location")}
          </span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" aria-hidden />
          <a
            href="https://github.com/exark"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Github size={13} /> github.com/exark
          </a>
          <span className="hidden h-3 w-px bg-border sm:inline-block" aria-hidden />
          <a
            href="mailto:ali.ahmed.benhamouda@gmail.com"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail size={13} /> ali.ahmed.benhamouda@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
