import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  kicker?: string;
  title: string;
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  backgroundPosition?: string;
}

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Section({ id, kicker, title, children, className = "", backgroundImage, backgroundOpacity = 0.12, backgroundPosition = "center" }: SectionProps) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            style={{ objectPosition: backgroundPosition, opacity: backgroundOpacity }}
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, oklch(1 0 0 / 0.70) 0%, oklch(1 0 0 / 0.50) 50%, oklch(1 0 0 / 0.70) 100%)",
            }}
          />
        </>
      )}
      <div className="container-page relative z-10">
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
