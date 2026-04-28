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

// Chaotic champagne-gold cracks revealed when the navbar lifts off (scroll).
// Coordinates use the Navbar SVG viewBox (1000 x 60). Path lengths are
// normalized via pathLength=100 so the dasharray reveal is uniform.
// Designed as organic clusters: Y-junctions, diagonals, horizontal travel,
// branching forks — never a clean vertical line.
const CRACK_PATHS: { d: string; dur: number; delay: number }[] = [
  // ── Cluster 1: top-left fracture point at (180,18) with three radiating branches ──
  // Stem entering from the top edge into the junction
  { d: "M 165 0 L 175 8 L 180 18", dur: 0.7, delay: 0 },
  // Long branch shooting down-right with kinks
  { d: "M 180 18 L 200 25 L 215 32 L 235 38", dur: 1.1, delay: 0.5 },
  // Long branch sliding down-left, exits at the bottom edge
  { d: "M 180 18 L 175 28 L 165 35 L 155 50 L 162 60", dur: 1.2, delay: 0.5 },
  // Delayed fork from the right-branch tip
  { d: "M 235 38 L 250 35 L 265 42", dur: 0.6, delay: 1.4 },
  // ── Cluster 2: near-horizontal zigzag travelling sideways across the middle ──
  { d: "M 320 22 L 345 25 L 370 21 L 395 28 L 420 24 L 445 30", dur: 1.5, delay: 0.15 },
  // Small branch shooting upward to the top edge
  { d: "M 370 21 L 365 12 L 358 6", dur: 0.6, delay: 0.9 },
  // ── Cluster 3: steep diagonal from top-right falling down to the bottom edge ──
  { d: "M 590 0 L 580 10 L 575 22 L 565 32 L 560 44 L 552 60", dur: 1.4, delay: 0.1 },
  // Perpendicular flick to the right
  { d: "M 575 22 L 595 25 L 610 22", dur: 0.7, delay: 0.8 },
  // ── Cluster 4: bottom fracture point at (712,40) with three branches ──
  // Stem rising from the bottom edge to the junction
  { d: "M 700 60 L 705 50 L 712 40", dur: 1.0, delay: 0.05 },
  // Continuation rising from the junction to the top
  { d: "M 712 40 L 720 30 L 728 22 L 735 12", dur: 0.9, delay: 0.85 },
  // Lateral branch from the junction going left
  { d: "M 712 40 L 695 36 L 680 38", dur: 0.7, delay: 0.85 },
  // Lateral branch from the junction going right
  { d: "M 712 40 L 730 42 L 745 38", dur: 0.7, delay: 0.9 },
  // ── Cluster 5: short hairlines near the right edge ──
  { d: "M 800 0 L 805 12 L 798 24 L 803 32", dur: 0.9, delay: 0.25 },
  { d: "M 855 60 L 851 50 L 858 42", dur: 0.7, delay: 0.3 },
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

  // Re-used in two places: desktop right cluster + mobile dropdown menu.
  const renderLangSwitcher = () => (
    <div className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
      <Globe size={12} className="text-muted-foreground" aria-hidden />
      {(["en", "fr"] as const).map((lng, i) => (
        <span key={lng} className="flex items-center">
          {i > 0 && <span className="mr-2 h-3 w-px bg-border" aria-hidden />}
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
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "pt-6 pb-2.5" : "py-5"
      }`}
    >
      <div className="container-page">
        <nav
          className={`relative flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 md:px-6 md:py-3.5 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          {/* Subtle champagne-gold cracks — only revealed when the bar lifts off (scrolled) */}
          <span
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
            aria-hidden
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              style={{
                opacity: scrolled ? 1 : 0,
                transition: "opacity 700ms ease-out",
              }}
            >
              <defs>
                <linearGradient
                  id="exark-navbar-crack"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgb(245,220,170)" stopOpacity="0" />
                  <stop offset="30%" stopColor="rgb(245,220,170)" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="rgb(245,220,170)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="rgb(245,220,170)" stopOpacity="0" />
                </linearGradient>
                {/* Soft halo: blurred copy stacked twice + sharp source on top => luminous gold */}
                <filter
                  id="exark-navbar-crack-glow"
                  x="-10%"
                  y="-30%"
                  width="120%"
                  height="160%"
                >
                  <feGaussianBlur stdDeviation="1.1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g
                fill="none"
                stroke="url(#exark-navbar-crack)"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                strokeWidth={0.75}
                filter="url(#exark-navbar-crack-glow)"
              >
                {CRACK_PATHS.map((c, i) => (
                  <path
                    key={i}
                    d={c.d}
                    pathLength={100}
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: scrolled ? 0 : 100,
                      transition: `stroke-dashoffset ${c.dur}s cubic-bezier(0.22, 1, 0.36, 1) ${c.delay}s`,
                    }}
                  />
                ))}
              </g>
            </svg>
          </span>

          {/* Burger button — mobile/tablet only, anchors the LEFT side so the logo sits centred via justify-between + a matching spacer on the right */}
          <button
            className="relative z-10 rounded-full p-2 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a
            href="#top"
            aria-label="Exark — Ahmed Ben Hamouda"
            className="group relative z-10 flex items-center transition-opacity hover:opacity-90"
          >
            {/* Soft icy-blue halo behind the logo on hover — cool, premium */}
            <span
              className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.85 0.05 235 / 0.45), transparent 70%)",
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
            {/* Fine champagne-gold underline accent — appears on hover */}
            <span
              className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: "var(--gradient-gold-line)" }}
              aria-hidden
            />
          </a>

          <div className="relative z-10 hidden items-center gap-0.5 lg:flex">
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

          {/* Lang switcher — desktop only (right) */}
          <div className="relative z-10 hidden items-center lg:flex">
            {renderLangSwitcher()}
          </div>

          {/* Mobile/tablet spacer — same dimensions as the burger button so the centred logo lands exactly mid-nav */}
          <div className="invisible rounded-full p-2 lg:hidden" aria-hidden>
            <Menu size={20} />
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
            {/* Subtle gold separator before the language switcher */}
            <div
              className="mx-3 my-1.5 h-px"
              style={{ background: "var(--gradient-gold-line)" }}
              aria-hidden
            />
            <div className="flex justify-center px-2 pb-1 pt-0.5">
              {renderLangSwitcher()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
