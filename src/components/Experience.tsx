import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { Briefcase, MapPin } from "lucide-react";

interface ExpItem {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  stack?: string;
}

export function Experience() {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true }) as ExpItem[];

  return (
    <Section id="experience" kicker={t("experience.kicker")} title={t("experience.title")}>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-6" aria-hidden />
        <ol className="space-y-10">
          {items.map((it, i) => (
            <li key={i} className="relative pl-12 md:pl-16">
              <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-accent shadow-soft md:h-12 md:w-12">
                <Briefcase size={16} />
              </span>
              <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold md:text-xl">{it.role}</h3>
                  <span className="text-xs font-medium text-muted-foreground">{it.period}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-charcoal">
                  <span className="font-medium">{it.company}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin size={12} /> {it.location}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {it.points.map((p, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {it.stack && (
                  <div className="mt-4 rounded-xl bg-muted px-3 py-2 text-xs font-medium text-charcoal">
                    {it.stack}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
