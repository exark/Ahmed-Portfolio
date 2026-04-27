import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", key: "nav.about" },
  { href: "#skills", key: "nav.skills" },
  { href: "#experience", key: "nav.experience" },
  { href: "#projects", key: "nav.projects" },
  { href: "#education", key: "nav.education" },
  { href: "#contact", key: "nav.contact" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLang = (lng: "en" | "fr") => i18n.changeLanguage(lng);
  const current = i18n.language?.startsWith("fr") ? "fr" : "en";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-page">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-navy-foreground text-sm font-semibold">
              A
            </span>
            <span className="hidden sm:inline">Ahmed Ben Hamouda</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(l.key)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-border bg-surface-elevated p-0.5 text-xs font-medium">
              {(["en", "fr"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => switchLang(lng)}
                  className={`rounded-full px-2.5 py-1 transition-all ${
                    current === lng
                      ? "bg-navy text-navy-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={`Switch to ${lng}`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              className="rounded-full p-2 text-foreground lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="mt-2 flex flex-col rounded-2xl bg-surface-elevated p-2 shadow-elevated lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-foreground hover:bg-muted"
              >
                {t(l.key)}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
