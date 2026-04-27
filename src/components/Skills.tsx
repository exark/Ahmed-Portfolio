import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { Code2, Server, Database, Cloud, Headphones, Wrench } from "lucide-react";

const skillData = {
  frontend: {
    icon: Code2,
    items: ["React", "Vite", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI", "Responsive Design"],
  },
  backend: {
    icon: Server,
    items: ["C#", ".NET Core", "Node.js", "REST APIs", "Microsoft Graph API", "Supabase RPC", "Java", "JPA", "Spring Security"],
  },
  databases: {
    icon: Database,
    items: ["Microsoft SQL Server", "Azure SQL", "MySQL", "Supabase / PostgreSQL", "Firebase NoSQL", "JSON"],
  },
  cloud: {
    icon: Cloud,
    items: ["Microsoft Azure", "Azure Functions Timer Trigger", "Azure DevOps", "Git", "GitHub", "Vercel", "Environment variables"],
  },
  support: {
    icon: Headphones,
    items: ["Troubleshooting", "Application diagnostics", "Incident analysis", "Escalation", "Technical documentation", "Customer communication"],
  },
  tools: {
    icon: Wrench,
    items: ["VS Code", "Visual Studio", "SSMS", "Postman", "Browser DevTools", "Figma", "Scrum", "Agile methods"],
  },
};

export function Skills() {
  const { t } = useTranslation();
  return (
    <Section id="skills" kicker={t("skills.kicker")} title={t("skills.title")} className="bg-surface">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skillData).map(([key, data]) => {
          const Icon = data.icon;
          return (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-navy-foreground">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-base font-semibold">
                  {t(`skills.categories.${key}`)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-charcoal"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
