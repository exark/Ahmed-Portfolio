import { useTranslation, Trans } from "react-i18next";
import { Section } from "./Section";

const highlightComponents = {
  hi: <span className="font-semibold text-foreground" />,
};

export function About() {
  const { t } = useTranslation();
  return (
    <Section
      id="about"
      kicker={t("about.kicker")}
      title={t("about.title")}
      className="relative overflow-hidden"
    >
      <div className="relative">
        <div className="grid gap-12 md:grid-cols-5 md:gap-14">
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

          {/* Glass-frosted stat cards stacked vertically over the bust */}
          <div className="grid grid-cols-1 gap-4 md:col-span-2 md:gap-5">
            {[
              { v: "3+", k: t("about.stats.years"), pos: "0% 0%" },
              { v: "10+", k: t("about.stats.projects"), pos: "0% 50%" },
              { v: "20+", k: t("about.stats.stack"), pos: "0% 100%" },
            ].map((s) => (
              <div
                key={s.k}
                className="relative overflow-hidden rounded-2xl border border-white/55 bg-white/30 px-6 py-6 shadow-elevated backdrop-blur-xl backdrop-saturate-150 md:px-7 md:py-7"
              >
                {/* Card-specific background image portion */}
                <div
                  className="pointer-events-none absolute inset-0 -z-10"
                  aria-hidden
                  style={{
                    backgroundImage: "url(/marble-bust.png)",
                    backgroundSize: "cover",
                    backgroundPosition: s.pos,
                    opacity: 0.25,
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Fine champagne-gold top edge — luxury card detail */}
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: "var(--gradient-gold-line)" }}
                  aria-hidden
                />
                <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs text-charcoal/80 md:text-sm">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
