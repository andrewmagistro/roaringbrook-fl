"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const points = [
  "Attorney led title company",
  "Responsive communication",
  "Closings convenient for you — remote and digital closings",
  "On time closings",
  "Clean commitments",
  "Insured closings and lender protection",
  "Requirements identified early and cleared",
];

export default function WhyUs() {
  return (
    <section className="bg-cream py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-4 text-brand/70">
              <span className="h-1 w-1 rounded-full bg-gold" /> Why Roaring Brook
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              An attorney on your file,{" "}
              <span className="italic text-brand">start to finish</span>.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              Most title companies hand the hard parts to outside counsel. We
              handle them in house — which is why requirements get identified
              early and closings stay on schedule.
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-[1.6rem] border border-border bg-border">
              {points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-card px-6 py-5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/[0.08]">
                    <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] text-ink">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
