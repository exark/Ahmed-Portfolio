import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Mail, MapPin, Github } from "lucide-react";

const PORTRAIT_SRC = "/ChatGPT Image 1 mai 2026, 15_23_17.png";

export function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32"
    >
      {/* Layer 1 — clean white base gradient (white → soft icy blue) */}
      <div className="pointer-events-none absolute inset-0 bg-hero" aria-hidden />

      {/* Layer 2 — luxury blue-marble columns background image
          (right-anchored so columns sit behind the portrait, light marble flows toward the text) */}
      <img
        src="/marble-columns.png"
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-right opacity-[0.55]"
        draggable={false}
      />

      {/* Layer 3 — white-fade overlay so the text on the left stays perfectly readable */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, oklch(1 0 0 / 0.88) 0%, oklch(1 0 0 / 0.62) 35%, oklch(1 0 0 / 0.20) 70%, oklch(1 0 0 / 0.05) 100%)",
        }}
      />

      {/* Layer 4 — soft icy-blue halo (top, behind name) */}
      <div
        className="pointer-events-none absolute -top-44 left-1/2 h-[640px] w-[1080px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.85 0.05 235 / 0.45), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Layer 5 — quiet champagne-gold glow on the right (desktop only) — echoes the marble's gold veins */}
      <div
        className="pointer-events-none absolute right-[-8%] top-1/4 hidden h-[520px] w-[520px] rounded-full opacity-45 blur-3xl lg:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.80 0.08 92 / 0.22), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Layer 6 — fade into background at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-background)]"
        aria-hidden
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Text column */}
          <div className="lg:col-span-7">
            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur lg:mx-0"
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
              className="mt-7 text-center text-sm font-medium text-muted-foreground md:text-base lg:text-left"
            >
              {t("hero.greeting")}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-left lg:text-[4.25rem]"
            >
              <span className="text-gradient">{t("hero.name")}</span>
            </motion.h1>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
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

            {/* Portrait mobile/tablet - between roles and tagline */}
            <div className="mt-8 flex justify-center lg:hidden">
              <HeroPortrait />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl lg:mx-0 lg:text-left"
            >
              {t("hero.tagline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
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

            {/* Ornamental champagne-gold separator — refined, tasteful */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mx-auto mt-10 flex max-w-[280px] items-center gap-3 lg:mx-0"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              <span className="divider-gold flex-1" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
            </motion.div>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} /> {t("hero.location")}
              </span>
              <span
                className="hidden h-3 w-px bg-border sm:inline-block"
                aria-hidden
              />
              <a
                href="https://github.com/exark"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Github size={13} /> github.com/exark
              </a>
              <span
                className="hidden h-3 w-px bg-border sm:inline-block"
                aria-hidden
              />
              <a
                href="mailto:ali.ahmed.benhamouda@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail size={13} /> ali.ahmed.benhamouda@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Portrait column - desktop only */}
          <div className="hidden lg:flex lg:col-span-5 lg:justify-end">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[14rem] sm:w-[16rem] lg:w-[19rem]"
    >
      {/* Soft icy-blue glow halo behind portrait — cool, premium */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-portrait-glow opacity-95 blur-2xl"
        aria-hidden
      />

      {/* Outer navy → champagne-gold ring — luxe frame detail */}
      <div
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[2.25rem] opacity-75"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 255 / 0.35), oklch(0.78 0.07 92 / 0.30))",
        }}
        aria-hidden
      />

      {/* Portrait card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
        {/* Top champagne-gold accent line — fine luxury detail */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.08 92 / 0.75), transparent)",
          }}
          aria-hidden
        />
        <img
          src={PORTRAIT_SRC}
          alt="Ahmed Ben Hamouda"
          loading="eager"
          decoding="async"
          className="block aspect-[4/5] w-full object-cover"
        />
        {/* Subtle navy vignette — sculpts the portrait gently */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, oklch(0.22 0.06 255 / 0.22))",
          }}
          aria-hidden
        />
      </div>

      {/* Floating status chip — champagne gold indicator dot */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-full border border-border bg-surface-elevated/90 px-3 py-1.5 text-[11px] font-medium text-charcoal shadow-soft backdrop-blur"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        Tunis · Remote
      </motion.div>
    </motion.div>
  );
}
