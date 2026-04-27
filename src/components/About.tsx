import { useTranslation } from "react-i18next";
import { Section } from "./Section";

export function About() {
  const { t } = useTranslation();
  return (
    <Section id="about" kicker={t("about.kicker")} title={t("about.title")}>
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="space-y-6 md:col-span-3 text-lg leading-relaxed text-charcoal">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p className="text-muted-foreground">{t("about.p3")}</p>
        </div>

        <div className="md:col-span-2 grid grid-cols-3 gap-3 md:grid-cols-1">
          {[
            { v: "3+", k: t("about.stats.years") },
            { v: "10+", k: t("about.stats.projects") },
            { v: "20+", k: t("about.stats.stack") },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft"
            >
              <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
