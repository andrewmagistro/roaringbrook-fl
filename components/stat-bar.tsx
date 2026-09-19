"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const stats = [
  { value: "30+", label: "Years of experience" },
  { value: "10,000+", label: "Closings completed" },
  { value: "$1.5B+", label: "In closings" },
  { value: "4.8", label: "Google rating", star: true },
];

export default function StatBar() {
  return (
    <section className="bg-brand" aria-label="Firm at a glance">
      <div className="container mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-white/15">
          {stats.map(({ value, label, star }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="px-4 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 font-serif text-4xl tracking-tight text-white md:text-5xl">
                {value}
                {star && (
                  <Star className="h-7 w-7 fill-gold text-gold md:h-8 md:w-8" aria-hidden="true" />
                )}
              </div>
              <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
