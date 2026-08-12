"use client";

import { motion } from "motion/react";

const partners = [
  { name: "BBB Accredited Business", sub: "A+ Rating", logo: "/bbb-logo.png", height: "h-9" },
  { name: "First American Title", sub: "Underwriter", logo: "/first-american-logo.png", height: "h-12" },
  { name: "ALTA", sub: "American Land Title Association", logo: "/alta-logo.png", height: "h-10" },
  { name: "FLTA", sub: "Florida Land Title Association", logo: "/flta-logo.png", height: "h-14" },
];

export default function Partners() {
  return (
    <section className="relative bg-cream py-14 border-y border-border">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <p className="eyebrow text-navy/70">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Backed by the best
            </p>
            <p className="mt-3 font-serif text-2xl leading-tight text-ink">
              Affiliations &amp; partnerships
            </p>
          </motion.div>

          <div className="lg:col-span-9 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center justify-center gap-3 bg-card px-4 py-8 transition-colors duration-300 hover:bg-cream-dark"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className={`${p.height} w-auto object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0`}
                />
                <p className="text-center text-[10px] uppercase tracking-wider text-ink-soft">
                  {p.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
