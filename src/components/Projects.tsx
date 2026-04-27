import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { ExternalLink, Github } from "lucide-react";

interface ProjectItem {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  site?: string;
  github?: string;
}

export function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) as ProjectItem[];

  return (
    <Section id="projects" kicker={t("projects.kicker")} title={t("projects.title")} className="bg-surface">
      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((p, i) => (
          <article
            key={i}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-elevated p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:p-8"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background: "radial-gradient(closest-side, oklch(0.75 0.12 250 / 0.4), transparent)",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {p.subtitle}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-charcoal"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
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
        ))}
      </div>
    </Section>
  );
}
