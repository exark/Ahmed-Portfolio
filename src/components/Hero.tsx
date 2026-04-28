import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Mail, MapPin, Github } from "lucide-react";

const PORTRAIT_SRC = "/366711480_6861379807205813_8386452105849708350_n.jpg";

export function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32"
    >
      {/* Layer 1 — warm ivory base gradient */}
      <div className="pointer-events-none absolute inset-0 bg-hero" aria-hidden />

      {/* Layer 2 — subtle marble wash (CSS-only).
          Future: replace with /marble-texture.webp via the .bg-marble class. */}
      <div
        className="pointer-events-none absolute inset-0 bg-marble opacity-70"
        aria-hidden
      />

      {/* Layer 3 — barely-visible paper grain for tactile, atelier feel */}
      <div
        className="pointer-events-none absolute inset-0 texture-paper opacity-[0.18] mix-blend-multiply"
        aria-hidden
      />

      {/* Layer 4 — soft warm halo (top, behind name) */}
      <div
        className="pointer-events-none absolute -top-44 left-1/2 h-[640px] w-[1080px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.86 0.06 80 / 0.55), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Layer 5 — bronze ambient glow on the right (desktop only) */}
      <div
        className="pointer-events-none absolute right-[-10%] top-1/4 hidden h-[520px] w-[520px] rounded-full opacity-55 blur-3xl lg:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.72 0.10 65 / 0.30), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Layer 6 — quiet navy wash (left) for depth */}
      <div
        className="pointer-events-none absolute left-[-12%] bottom-1/4 hidden h-[460px] w-[460px] rounded-full opacity-25 blur-3xl lg:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.08 250 / 0.35), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Layer 7 — fade into background at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-background)]"
        aria-hidden
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Text column */}
          <div className="order-2 lg:order-1 lg:col-span-7">
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

            {/* Ornamental bronze separator — refined, tasteful, not heavy */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mx-auto mt-10 flex max-w-[280px] items-center gap-3 lg:mx-0"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              <span className="divider-classical flex-1" />
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

          {/* Portrait column */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
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
      {/* Warm bronze glow halo behind portrait — atelier light feel */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-portrait-glow opacity-95 blur-2xl"
        aria-hidden
      />

      {/* Outer bronze ring — fine, gallery-frame detail */}
      <div
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[2.25rem] opacity-70"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.10 65 / 0.35), oklch(0.22 0.05 255 / 0.20))",
        }}
        aria-hidden
      />

      {/* Portrait card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-elevated">
        {/* Top bronze accent line — like a museum frame edge */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.10 65 / 0.65), transparent)",
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
        {/* Subtle warm vignette — sculpts the portrait gently */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, oklch(0.22 0.05 255 / 0.20))",
          }}
          aria-hidden
        />
      </div>

      {/* Floating status chip — bronze indicator dot */}
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
