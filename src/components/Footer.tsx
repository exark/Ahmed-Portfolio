import { useTranslation } from "react-i18next";
import { Github, Mail, Linkedin, MapPin, Phone } from "lucide-react";

const footerLinks = [
  { href: "#about", key: "nav.about" },
  { href: "#skills", key: "nav.skills" },
  { href: "#experience", key: "nav.experience" },
  { href: "#projects", key: "nav.projects" },
  { href: "#education", key: "nav.education" },
  { href: "#contact", key: "nav.contact" },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/exark-logo.png"
                alt="Exark"
                className="h-14 w-auto object-contain md:h-16"
                draggable={false}
              />
            </div>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/exark"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github size={16} />
              </a>
              <a
                href="mailto:ali.ahmed.benhamouda@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://linkedin.com/in/ahmed-ben-hamouda"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("footer.contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{t("hero.location")}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Mail size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                <a
                  href="mailto:ali.ahmed.benhamouda@gmail.com"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  ali.ahmed.benhamouda@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Github size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                <a
                  href="https://github.com/exark"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  github.com/exark
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px"
          style={{ background: "var(--gradient-gold-line)" }}
          aria-hidden
        />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">{t("footer.copy")}</p>
          <p className="text-xs text-muted-foreground">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
