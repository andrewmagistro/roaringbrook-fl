"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  Handshake,
  MonitorSmartphone,
  MapPin,
  MessageSquare,
  FileInput,
  CalendarCheck,
  Stamp,
  FileCheck2,
} from "lucide-react";

/**
 * Icons are referenced by name, not by component. Server components render the
 * pages that use this file, and a lucide icon is a forwardRef object — React
 * can't serialize one across the server/client boundary.
 */
const icons = {
  shield: ShieldCheck,
  handshake: Handshake,
  monitor: MonitorSmartphone,
  pin: MapPin,
  message: MessageSquare,
  fileInput: FileInput,
  calendar: CalendarCheck,
  stamp: Stamp,
  fileCheck: FileCheck2,
} as const;

export type FeatureIcon = keyof typeof icons;

export type FeatureBlock = {
  icon: FeatureIcon;
  title: string;
  description: string;
};

export default function FeatureBlocks({
  blocks,
  className = "",
}: {
  blocks: FeatureBlock[];
  className?: string;
}) {
  return (
    <section className={`bg-background py-24 ${className}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map(({ icon, title, description }, i) => {
            const Icon = icons[icon];
            return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-[1.6rem] border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.07] transition-colors duration-500 group-hover:bg-gold/15">
                <Icon
                  className="h-6 w-6 text-brand transition-colors duration-500 group-hover:text-gold-dark"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl leading-snug tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {description}
              </p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
