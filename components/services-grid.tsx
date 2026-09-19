"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  Landmark,
  Home,
  Wrench,
  Building2,
  Handshake,
} from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "Title",
    description:
      "Searches, examination, and owner's and lender's title insurance policies.",
  },
  {
    icon: Landmark,
    title: "Escrow",
    description:
      "Secure escrow and disbursement, with wire fraud safeguards on every file.",
  },
  {
    icon: Home,
    title: "Closings",
    description:
      "In person, at your convenience, or fully remote and digital.",
  },
  {
    icon: Wrench,
    title: "Curative",
    description:
      "Liens, judgments, probate gaps, and chain defects cleared before closing.",
  },
  {
    icon: Building2,
    title: "Residential & Commercial",
    description:
      "From first homes to commercial and investor transactions.",
  },
  {
    icon: Handshake,
    title: "For Sale By Owner",
    description:
      "FSBO sellers and buyers get the same full-service closing, start to finish.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-background py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4 text-brand/70">
            <span className="h-1 w-1 rounded-full bg-gold" /> Services provided
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            Everything your closing needs,{" "}
            <span className="italic text-brand">in one place</span>.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group rounded-[1.6rem] border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.07] transition-colors duration-500 group-hover:bg-gold/15">
                <Icon className="h-6 w-6 text-brand transition-colors duration-500 group-hover:text-gold-dark" />
              </div>
              <h3 className="mt-6 font-serif text-2xl tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
