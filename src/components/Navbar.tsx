import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";

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
        scrolled ? "py-2.5" : "py-5"
      }`}
    >
      <div className="container-page">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 md:px-6 md:py-3.5 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            aria-label="Exark — Ahmed Ben Hamouda"
            className="group relative flex items-center transition-opacity hover:opacity-90"
          >
            {/* Soft warm halo behind the logo on hover — premium, subtle */}
            <span
              className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.78 0.09 70 / 0.30), transparent 70%)",
              }}
              aria-hidden
            />
            <img
              src="/exark-logo.png"
              alt="Exark logo"
              width={180}
              height={52}
              className="h-12 w-auto object-contain md:h-14"
              draggable={false}
            />
            {/* Fine bronze underline accent — appears on hover */}
            <span
              className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "var(--gradient-bronze-line)" }}
              aria-hidden
            />
          </a>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative z-10">{t(l.key)}</span>
                <span
                  className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <Globe size={12} className="text-muted-foreground" aria-hidden />
              {(["en", "fr"] as const).map((lng, i) => (
                <span key={lng} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="mr-2 h-3 w-px bg-border"
                      aria-hidden
                    />
                  )}
                  <button
                    onClick={() => switchLang(lng)}
                    className={`tracking-wider transition-colors ${
                      current === lng
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={`Switch to ${lng}`}
                    aria-pressed={current === lng}
                  >
                    {lng.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <button
              className="rounded-full p-2 text-foreground lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
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
