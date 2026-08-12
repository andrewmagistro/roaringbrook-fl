"use client";

import { motion } from "motion/react";
import { Home, KeyRound, Landmark, ArrowUpRight } from "lucide-react";

const audiences = [
  {
    icon: Home,
    title: "Realtors",
    description:
      "Reliable, on-time closings and proactive updates so your deals stay on track. We make you look good to your clients.",
    points: ["Same-day call backs", "Clear closing timelines", "Order title in minutes"],
  },
  {
    icon: KeyRound,
    title: "Buyers & Sellers",
    description:
      "Title insurance and closings explained in plain English — with an attorney personally reviewing your title.",
    points: ["Owner's & lender's policies", "Attorney-examined title", "No surprises at the table"],
  },
  {
    icon: Landmark,
    title: "Lenders",
    description:
      "Accurate title commitments and dependable closings that protect your loan and keep funding on schedule.",
    points: ["Lender's policies", "Thorough title searches", "On-time fundings"],
  },
];

export default function AudienceCards() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow text-navy/70 mb-4">
            <span className="h-1 w-1 rounded-full bg-gold" /> Who we serve
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Built for everyone <span className="italic text-navy">at the table</span>.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {audiences.map(({ icon: Icon, title, description, points }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group rounded-[1.6rem] border border-border bg-card p-2.5 transition-all duration-500 hover:shadow-lift"
            >
              <div className="flex h-full flex-col rounded-inner bg-cream p-7">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/[0.06] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-navy" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 -translate-y-1 translate-x-1 text-navy opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
                <h3 className="mt-7 font-serif text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{description}</p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-ink">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
