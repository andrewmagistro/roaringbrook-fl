"use client";

import { motion } from "motion/react";
import { FileText, UserRound, Calculator, HelpCircle, ArrowUpRight } from "lucide-react";

const items = [
  { icon: FileText, label: "Start a Closing", sub: "Begin your transaction", href: "#consultation" },
  { icon: UserRound, label: "Meet Chris", sub: "Attorney & title agent", href: "#attorneys" },
  { icon: Calculator, label: "Net Sheet", sub: "Estimate your costs", href: "#net-sheet" },
  { icon: HelpCircle, label: "FAQs", sub: "Common questions", href: "#faq" },
];

export default function QuickAccess() {
  return (
    <section className="relative bg-cream py-10 border-b border-border">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, sub, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy/[0.06] transition-colors duration-500 group-hover:bg-gold/15">
                <Icon className="h-6 w-6 text-navy transition-colors duration-500 group-hover:text-gold-dark" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 font-serif text-lg text-ink">
                  {label}
                  <ArrowUpRight className="h-4 w-4 text-navy opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </span>
                <span className="block text-xs text-ink-soft">{sub}</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
