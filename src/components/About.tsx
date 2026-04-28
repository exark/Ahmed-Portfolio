import { useTranslation, Trans } from "react-i18next";
import { Section } from "./Section";

const highlightComponents = {
  hi: <span className="font-semibold text-foreground" />,
};

export function About() {
  const { t } = useTranslation();
  return (
    <Section id="about" kicker={t("about.kicker")} title={t("about.title")}>
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="space-y-6 text-lg leading-relaxed text-charcoal md:col-span-3">
          <p>
            <Trans i18nKey="about.p1" components={highlightComponents} />
          </p>
          <p>
            <Trans i18nKey="about.p2" components={highlightComponents} />
          </p>
          <p className="text-muted-foreground">
            <Trans
              i18nKey="about.p3"
              components={{
                hi: <span className="font-semibold text-foreground" />,
              }}
            />
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:col-span-2 md:grid-cols-1">
          {[
            { v: "3+", k: t("about.stats.years") },
            { v: "10+", k: t("about.stats.projects") },
            { v: "20+", k: t("about.stats.stack") },
          ].map((s) => (
            <div
              key={s.k}
              className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft"
            >
              {/* Fine bronze top edge — gallery card detail */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "var(--gradient-bronze-line)" }}
                aria-hidden
              />
              <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
