import { useTranslation } from "react-i18next";
import { Github, Mail } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <p className="text-xs text-muted-foreground">{t("footer.copy")}</p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/exark"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={15} />
          </a>
          <a
            href="mailto:ali.ahmed.benhamouda@gmail.com"
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
