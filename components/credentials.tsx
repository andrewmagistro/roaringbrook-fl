"use client";

import { motion } from "motion/react";

const credentials = [
  {
    name: "Better Business Bureau — A+ Accredited",
    caption: "A+ Accredited",
    logo: "/bbb-logo.png",
    height: "h-12",
  },
  {
    name: "American Land Title Association",
    caption: "ALTA Member",
    logo: "/alta-logo.png",
    height: "h-12",
  },
  {
    name: "Florida Land Title Association",
    caption: "FLTA Member",
    logo: "/flta-logo.png",
    height: "h-14",
  },
  {
    name: "First American Title Insurance Company",
    caption: "Underwriter",
    logo: "/first-american-logo.png",
    height: "h-12",
  },
];

export default function Credentials() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="eyebrow justify-center text-brand/70">
            <span className="h-1 w-1 rounded-full bg-gold" /> Accredited &amp; affiliated
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-ink md:text-4xl">
            Backed by the industry&apos;s standard bearers.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map(({ name, caption, logo, height }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group rounded-[1.4rem] border border-border bg-card p-2 transition-shadow duration-500 hover:shadow-lift"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-inner border border-border/60 bg-cream px-6 py-10">
                <img
                  src={logo}
                  alt={name}
                  className={`${height} w-auto object-contain opacity-75 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
