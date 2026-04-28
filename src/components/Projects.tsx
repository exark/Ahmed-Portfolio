import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { slugifyProject } from "./Skills";

interface ProjectItem {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  site?: string;
  github?: string;
}

const STACK_VISIBLE = 6;

export function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) as ProjectItem[];

  return (
    <Section
      id="projects"
      kicker={t("projects.kicker")}
      title={t("projects.title")}
      className="bg-section-projects"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((p, i) => {
          const slug = slugifyProject(p.name);
          const isFeatured = i === 0;
          const visible = p.stack.slice(0, STACK_VISIBLE);
          const overflow = p.stack.length - STACK_VISIBLE;
          return (
            <article
              key={i}
              id={`project-${slug}`}
              className="group relative flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated md:p-8"
            >
              {/* Clean white → icy-blue inner wash — luxury card feel */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(1 0 0) 0%, oklch(0.96 0.022 235 / 0.55) 60%, transparent 100%)",
                }}
                aria-hidden
              />
              {/* Top champagne-gold accent line — thin, refined frame edge */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "var(--gradient-gold-line)" }}
                aria-hidden
              />
              {/* Soft icy-blue hover halo (top-right) */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.78 0.10 235 / 0.40), transparent)",
                }}
                aria-hidden
              />
              {/* Royal navy hover halo (bottom-left) for premium depth */}
              <div
                className="pointer-events-none absolute -left-20 -bottom-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.45 0.13 250 / 0.40), transparent)",
                }}
                aria-hidden
              />

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {p.subtitle}
                  </p>
                  {isFeatured && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent/35 bg-surface-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-charcoal shadow-soft">
                      <Sparkles size={10} className="text-accent" />
                      {t("projects.featured")}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-[1.6rem]">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {visible.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-charcoal"
                    >
                      {s}
                    </span>
                  ))}
                  {overflow > 0 && (
                    <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      +{overflow} {t("projects.showMore")}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {p.site && (
                    <a
                      href={p.site}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-medium text-navy-foreground transition-all hover:-translate-y-0.5"
                    >
                      {t("projects.viewSite")} <ExternalLink size={12} />
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-4 py-2 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-muted"
                    >
                      <Github size={12} /> {t("projects.viewCode")}
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
