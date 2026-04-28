import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Headphones,
  Wrench,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import useEmblaCarousel from "embla-carousel-react";
import { Section } from "./Section";

type ClusterKey =
  | "frontend"
  | "backend"
  | "databases"
  | "cloud"
  | "support"
  | "tools";

const CLUSTER_ORDER: ClusterKey[] = [
  "frontend",
  "backend",
  "databases",
  "cloud",
  "support",
  "tools",
];

const ICONS: Record<ClusterKey, typeof Code2> = {
  frontend: Code2,
  backend: Server,
  databases: Database,
  cloud: Cloud,
  support: Headphones,
  tools: Wrench,
};

const TECHS: Record<ClusterKey, string[]> = {
  frontend: [
    "React",
    "Vite",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Material UI",
  ],
  backend: [
    "C#",
    ".NET Core",
    "Node.js",
    "REST APIs",
    "Microsoft Graph API",
    "Supabase RPC",
    "Java",
    "JPA",
    "Spring Security",
  ],
  databases: [
    "Microsoft SQL Server",
    "Azure SQL",
    "MySQL",
    "Supabase / PostgreSQL",
    "Firebase NoSQL",
    "JSON",
  ],
  cloud: [
    "Microsoft Azure",
    "Azure Functions",
    "Azure DevOps",
    "Git",
    "GitHub",
    "Vercel",
  ],
  support: [
    "Troubleshooting",
    "Application diagnostics",
    "Incident analysis",
    "Escalation",
    "Technical documentation",
    "Customer communication",
  ],
  tools: [
    "VS Code",
    "Visual Studio",
    "SSMS",
    "Postman",
    "Browser DevTools",
    "Figma",
    "Scrum",
    "Agile",
  ],
};

const PROFICIENCY: Record<ClusterKey, number> = {
  frontend: 92,
  backend: 80,
  databases: 78,
  cloud: 76,
  support: 88,
  tools: 86,
};

const APPLIED: Record<ClusterKey, string[]> = {
  frontend: ["Carteron Industries", "Soléne"],
  backend: ["Carteron Industries", "TMF Carrier"],
  databases: ["Carteron Industries", "Soléne", "TMF Carrier"],
  cloud: ["Carteron Industries", "Soléne"],
  support: [],
  tools: ["Carteron Industries", "Soléne", "TMF Carrier"],
};

type ClusterPalette = {
  soft: string;
  strong: string;
  ring: string;
};

const CLUSTER_COLOR: Record<ClusterKey, ClusterPalette> = {
  frontend: {
    soft: "oklch(0.95 0.035 215)",
    strong: "oklch(0.55 0.13 215)",
    ring: "oklch(0.78 0.09 215)",
  },
  backend: {
    soft: "oklch(0.95 0.035 262)",
    strong: "oklch(0.45 0.14 262)",
    ring: "oklch(0.70 0.10 262)",
  },
  databases: {
    soft: "oklch(0.95 0.04 290)",
    strong: "oklch(0.50 0.15 290)",
    ring: "oklch(0.72 0.10 290)",
  },
  cloud: {
    soft: "oklch(0.95 0.035 230)",
    strong: "oklch(0.55 0.13 230)",
    ring: "oklch(0.75 0.10 230)",
  },
  support: {
    soft: "oklch(0.95 0.035 195)",
    strong: "oklch(0.52 0.11 195)",
    ring: "oklch(0.72 0.08 195)",
  },
  tools: {
    soft: "oklch(0.95 0.02 255)",
    strong: "oklch(0.38 0.04 255)",
    ring: "oklch(0.60 0.04 255)",
  },
};

export function slugifyProject(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export function Skills() {
  const { t } = useTranslation();
  const [active, setActive] = useState<ClusterKey>("frontend");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radarData = useMemo(
    () =>
      CLUSTER_ORDER.map((key) => ({
        key,
        cat: t(`skills.categories.${key}`) as string,
        value: PROFICIENCY[key],
      })),
    [t],
  );

  return (
    <Section
      id="skills"
      kicker={t("skills.kicker")}
      title={t("skills.title")}
      className="bg-surface"
    >
      <p className="-mt-8 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:-mt-10 md:mb-14 md:text-lg">
        {t("skills.subtitle")}
      </p>

      {/* Desktop: 2-pane layout */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
        <ClusterList active={active} onSelect={setActive} />
        <ClusterDetail
          active={active}
          radarData={radarData}
          mounted={mounted}
        />
      </div>

      {/* Mobile: swipeable cards */}
      <MobileSwipe active={active} onSelect={setActive} />
    </Section>
  );
}

function ClusterList({
  active,
  onSelect,
}: {
  active: ClusterKey;
  onSelect: (k: ClusterKey) => void;
}) {
  const { t } = useTranslation();
  return (
    <aside className="md:col-span-5 lg:col-span-4">
      <div className="space-y-1.5">
        {CLUSTER_ORDER.map((key) => {
          const Icon = ICONS[key];
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              aria-pressed={isActive}
              className="group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-surface-elevated/70 md:px-4 md:py-3.5"
            >
              {isActive && (
                <motion.span
                  layoutId="cluster-active"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-2xl border border-border bg-surface-elevated shadow-soft"
                  aria-hidden
                />
              )}
              <span
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors"
                style={{
                  background: isActive
                    ? CLUSTER_COLOR[key].strong
                    : CLUSTER_COLOR[key].soft,
                  color: isActive
                    ? "oklch(1 0 0)"
                    : "oklch(0.30 0.015 250)",
                }}
              >
                <Icon size={18} />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block font-display text-sm font-semibold tracking-tight text-foreground">
                  {t(`skills.categories.${key}`)}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {t(`skills.clusters.${key}.subtitle`)}
                </span>
              </span>
              <span className="relative shrink-0 text-xs font-medium text-muted-foreground tabular-nums">
                {PROFICIENCY[key]}%
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-6 flex items-center gap-1.5 px-3 text-xs text-muted-foreground md:px-4">
        <Sparkles size={12} className="text-accent" />
        {t("skills.interactHint")}
      </p>
    </aside>
  );
}

function ClusterDetail({
  active,
  radarData,
  mounted,
}: {
  active: ClusterKey;
  radarData: { key: ClusterKey; cat: string; value: number }[];
  mounted: boolean;
}) {
  const { t } = useTranslation();
  const Icon = ICONS[active];
  const techs = TECHS[active];
  const applied = APPLIED[active];

  return (
    <div className="md:col-span-7 lg:col-span-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-7 shadow-elevated md:p-9">
        <motion.div
          key={`halo-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${CLUSTER_COLOR[active].ring}, transparent)`,
          }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${CLUSTER_COLOR[active].ring}, transparent)`,
          }}
          aria-hidden
        />
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={fade}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: CLUSTER_COLOR[active].strong,
                    color: "oklch(1 0 0)",
                  }}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    {t(`skills.clusters.${active}.subtitle`)}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {t(`skills.categories.${active}`)}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-charcoal md:text-lg">
                {t(`skills.clusters.${active}.description`)}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-charcoal"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {applied.length > 0 && (
                <div className="mt-7">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {t("skills.appliedIn")}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {applied.map((name) => (
                      <a
                        key={name}
                        href={`#project-${slugifyProject(name)}`}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-charcoal transition-colors hover:bg-navy hover:text-navy-foreground"
                      >
                        {name}
                        <ArrowUpRight
                          size={12}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 rounded-2xl border border-border bg-background/60 p-4 md:p-6">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <p className="font-display text-sm font-semibold text-foreground">
                {t("skills.radarTitle")}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t("skills.radarSubtitle")}
              </p>
            </div>
            <div className="h-[280px] w-full md:h-[320px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="78%">
                    <PolarGrid stroke="oklch(0.88 0.012 75)" />
                    <PolarAngleAxis
                      dataKey="cat"
                      tick={{ fill: "oklch(0.40 0.018 70)", fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="proficiency"
                      dataKey="value"
                      stroke="oklch(0.30 0.06 255)"
                      fill="oklch(0.62 0.10 65)"
                      fillOpacity={0.20}
                      strokeWidth={1.5}
                      isAnimationActive={false}
                      dot={(props) => {
                        const { cx, cy, payload, index } = props as {
                          cx?: number;
                          cy?: number;
                          payload?: { key: ClusterKey };
                          index?: number;
                        };
                        const isActive = payload?.key === active;
                        return (
                          <circle
                            key={`radar-dot-${index ?? payload?.key ?? `${cx}-${cy}`}`}
                            cx={cx}
                            cy={cy}
                            r={isActive ? 5 : 3}
                            fill={
                              isActive
                                ? CLUSTER_COLOR[active].strong
                                : "oklch(0.62 0.10 65)"
                            }
                            stroke="oklch(0.992 0.012 85)"
                            strokeWidth={isActive ? 2 : 1}
                          />
                        );
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSwipe({
  active,
  onSelect,
}: {
  active: ClusterKey;
  onSelect: (k: ClusterKey) => void;
}) {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSel = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      onSelect(CLUSTER_ORDER[idx]);
    };
    onSel();
    emblaApi.on("select", onSel);
    return () => {
      emblaApi.off("select", onSel);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const idx = CLUSTER_ORDER.indexOf(active);
    if (idx !== -1 && idx !== emblaApi.selectedScrollSnap()) {
      emblaApi.scrollTo(idx);
    }
  }, [active, emblaApi]);

  return (
    <div className="md:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {CLUSTER_ORDER.map((key) => {
            const Icon = ICONS[key];
            const techs = TECHS[key];
            const applied = APPLIED[key];
            return (
              <div
                key={key}
                className="min-w-0 flex-[0_0_92%] pr-3"
              >
                <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${CLUSTER_COLOR[key].ring}, transparent)`,
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(closest-side, ${CLUSTER_COLOR[key].ring}, transparent)`,
                    }}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          background: CLUSTER_COLOR[key].strong,
                          color: "oklch(1 0 0)",
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                          {t(`skills.clusters.${key}.subtitle`)}
                        </p>
                        <h3 className="mt-0.5 font-display text-xl font-semibold tracking-tight">
                          {t(`skills.categories.${key}`)}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-charcoal">
                      {t(`skills.clusters.${key}.description`)}
                    </p>

                    <div className="mt-5">
                      <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{t("skills.proficiencyLabel")}</span>
                        <span className="tabular-nums">
                          {PROFICIENCY[key]}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${PROFICIENCY[key]}%`,
                            background: `linear-gradient(90deg, ${CLUSTER_COLOR[key].ring}, ${CLUSTER_COLOR[key].strong})`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-charcoal"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {applied.length > 0 && (
                      <div className="mt-5">
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          {t("skills.appliedIn")}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {applied.map((name) => (
                            <a
                              key={name}
                              href={`#project-${slugifyProject(name)}`}
                              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-charcoal transition-colors hover:bg-navy hover:text-navy-foreground"
                            >
                              {name}
                              <ArrowUpRight size={10} />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 px-1">
        <div className="flex gap-1.5">
          {CLUSTER_ORDER.map((key, i) => {
            const selected = i === selectedIndex;
            return (
              <button
                key={key}
                type="button"
                aria-label={key}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  selected ? "w-6" : "w-1.5 bg-border"
                }`}
                style={
                  selected
                    ? { background: CLUSTER_COLOR[key].strong }
                    : undefined
                }
              />
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground">
          {t("skills.swipeHint")}
        </p>
      </div>
    </div>
  );
}
