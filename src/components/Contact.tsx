import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { Mail, Github, MapPin, Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/contactSchema";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export function Contact() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState({ status: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        let message = t("contact.form.errorGeneric");
        try {
          const data = (await res.json()) as { error?: string };
          if (res.status === 429) message = t("contact.form.errorRateLimit");
          else if (data?.error) message = data.error;
        } catch {
          /* ignore JSON parse errors */
        }
        setSubmitState({ status: "error", message });
        return;
      }

      setSubmitState({ status: "success" });
      reset();
      setTimeout(() => setSubmitState({ status: "idle" }), 6000);
    } catch {
      setSubmitState({ status: "error", message: t("contact.form.errorNetwork") });
    }
  };

  const translateError = (key?: string) => (key ? t(`contact.form.${key}`) : undefined);

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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative md:col-span-3 space-y-4 overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8"
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "var(--gradient-gold-line)" }}
            aria-hidden
          />

          {/* Honeypot — hidden from humans, visible to bots */}
          <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={t("contact.form.name")}
              type="text"
              autoComplete="name"
              error={translateError(errors.name?.message)}
              {...register("name")}
            />
            <Field
              label={t("contact.form.email")}
              type="email"
              autoComplete="email"
              error={translateError(errors.email?.message)}
              {...register("email")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={t("contact.form.phone")}
              type="tel"
              autoComplete="tel"
              optional
              error={translateError(errors.phone?.message)}
              {...register("phone")}
            />
            <Field
              label={t("contact.form.company")}
              type="text"
              autoComplete="organization"
              optional
              error={translateError(errors.company?.message)}
              {...register("company")}
            />
          </div>

          <Field
            label={t("contact.form.subject")}
            type="text"
            error={translateError(errors.subject?.message)}
            {...register("subject")}
          />

          <TextArea
            label={t("contact.form.message")}
            rows={5}
            error={translateError(errors.message?.message)}
            {...register("message")}
          />

          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-2 focus:ring-accent/30"
            />
            <span>{t("contact.form.consent")}</span>
          </label>
          {errors.consent?.message && (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle size={12} /> {translateError(errors.consent.message)}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting || submitState.status === "loading"}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-navy-foreground shadow-soft transition-all hover:-translate-y-0.5 disabled:opacity-70"
            >
              {submitState.status === "loading" ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> {t("contact.form.sending")}
                </>
              ) : submitState.status === "success" ? (
                <>
                  <Check size={16} /> {t("contact.form.sent")}
                </>
              ) : (
                <>
                  <Send size={14} /> {t("contact.form.send")}
                </>
              )}
            </button>

            {submitState.status === "error" && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
                <AlertCircle size={14} /> {submitState.message}
              </p>
            )}
            {submitState.status === "success" && (
              <p className="text-sm text-emerald-600">{t("contact.form.successDetail")}</p>
            )}
          </div>
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

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  optional?: boolean;
};

const Field = ({ label, error, optional, id, ...rest }: FieldProps) => {
  const inputId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {optional && <span className="normal-case tracking-normal text-muted-foreground/60">(opt.)</span>}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        {...rest}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-border focus:border-accent focus:ring-accent/20"
        }`}
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
};

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const TextArea = ({ label, error, id, ...rest }: TextAreaProps) => {
  const inputId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={!!error}
        {...rest}
        className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-border focus:border-accent focus:ring-accent/20"
        }`}
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
};
