import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  kicker?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Section({ id, kicker, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fade}
          className="mb-12 max-w-2xl md:mb-16"
        >
          {kicker && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {kicker}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl text-gradient">
            {title}
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fade}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
