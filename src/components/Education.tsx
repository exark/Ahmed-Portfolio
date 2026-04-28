import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { GraduationCap, Languages as LangIcon } from "lucide-react";

interface EduItem { degree: string; school: string; period: string; }
interface LangItem { name: string; level: string; }

export function Education() {
  const { t } = useTranslation();
  const eduItems = t("education.items", { returnObjects: true }) as EduItem[];
  const langItems = t("languages.items", { returnObjects: true }) as LangItem[];

  return (
    <Section 
      id="education" 
      kicker={t("education.kicker")} 
      title={t("education.title")}
      backgroundImage="/ChatGPT Image 28 avr. 2026, 02_54_51.png"
      backgroundOpacity={1}
      backgroundPosition="center"
      className="overflow-hidden"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {eduItems.map((e, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <GraduationCap size={18} />
            </div>
            <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
            <p className="mt-1 text-sm text-charcoal">{e.school}</p>
            <p className="mt-2 text-xs text-muted-foreground">{e.period}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-navy-foreground">
            <LangIcon size={18} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {t("languages.kicker")}
            </p>
            <h3 className="font-display text-lg font-semibold">{t("languages.title")}</h3>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {langItems.map((l) => (
            <div key={l.name} className="rounded-xl bg-muted px-4 py-3">
              <div className="text-sm font-semibold text-foreground">{l.name}</div>
              <div className="text-xs text-muted-foreground">{l.level}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
