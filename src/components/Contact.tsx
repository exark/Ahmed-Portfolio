import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { Mail, Github, MapPin, Send, Check } from "lucide-react";

export function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Section id="contact" kicker={t("contact.kicker")} title={t("contact.title")} className="bg-surface">
      <div className="grid gap-8 md:grid-cols-5 md:gap-10">
        <div className="space-y-4 md:col-span-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("contact.description")}
          </p>

          <div className="space-y-3 pt-2">
            <ContactRow
              icon={<Mail size={16} />}
              label={t("contact.email")}
              value="ali.ahmed.benhamouda@gmail.com"
              href="mailto:ali.ahmed.benhamouda@gmail.com"
            />
            <ContactRow
              icon={<Github size={16} />}
              label={t("contact.github")}
              value="github.com/exark"
              href="https://github.com/exark"
            />
            <ContactRow
              icon={<MapPin size={16} />}
              label={t("contact.location")}
              value="Tunis / Ariana, Tunisia"
            />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="md:col-span-3 space-y-4 rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field placeholder={t("contact.form.name")} type="text" required />
            <Field placeholder={t("contact.form.email")} type="email" required />
          </div>
          <textarea
            placeholder={t("contact.form.message")}
            rows={5}
            required
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-navy-foreground shadow-soft transition-all hover:-translate-y-0.5 disabled:opacity-80"
          >
            {sent ? (
              <>
                <Check size={16} /> {t("contact.form.sent")}
              </>
            ) : (
              <>
                <Send size={14} /> {t("contact.form.send")}
              </>
            )}
          </button>
        </form>
      </div>
    </Section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated p-3 transition-colors hover:bg-muted">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
    />
  );
}
