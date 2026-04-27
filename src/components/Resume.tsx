import { useTranslation } from "react-i18next";
import { Download, FileText } from "lucide-react";

export function Resume() {
  const { t } = useTranslation();
  return (
    <section id="resume" className="py-20 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-navy-foreground shadow-elevated md:px-14 md:py-20">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.7 0.18 250), transparent)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 -bottom-32 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.65 0.14 230), transparent)" }}
            aria-hidden
          />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-foreground/60">
                {t("resume.kicker")}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">
                {t("resume.title")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-foreground/70 md:text-lg">
                {t("resume.description")}
              </p>
            </div>
            <a
              href="/Ahmed_Ben_Hamouda_CV.pdf"
              download
              className="group inline-flex items-center gap-3 self-start rounded-full bg-surface-elevated px-6 py-4 text-sm font-medium text-navy shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow md:self-center"
            >
              <FileText size={18} />
              {t("resume.download")}
              <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
