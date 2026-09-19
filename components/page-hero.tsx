"use client";

import { motion } from "motion/react";

export default function PageHero({
  eyebrow,
  title,
  italic,
  intro,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container relative mx-auto max-w-7xl px-6 py-24 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-5 text-cream/70"
        >
          <span className="h-1 w-1 rounded-full bg-gold" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-cream md:text-6xl"
        >
          {title}{" "}
          {italic && <span className="italic text-gold-light">{italic}</span>}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/70"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
