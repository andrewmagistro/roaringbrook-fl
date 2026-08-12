"use client";

import { motion } from "motion/react";
import { Umbrella, Search, CheckSquare, Home, ArrowUpRight } from "lucide-react";

const areas = [
  {
    icon: Umbrella,
    title: "Title Insurance Policies",
    description:
      "Owner's and lender's policies that protect against title defects, liens, and ownership disputes — peace of mind long after closing.",
    tags: ["Owner's Policies", "Lender's Policies", "First American"],
    span: "lg:col-span-7",
    feature: true,
  },
  {
    icon: Search,
    title: "Title Searches",
    description:
      "A thorough search of public records to uncover judgments, unpaid taxes, easements, or other encumbrances before you close.",
    tags: ["Public Records", "Lien Discovery", "Chain of Title"],
    span: "lg:col-span-5",
  },
  {
    icon: CheckSquare,
    title: "Title Examination",
    description:
      "Attorney Chris Kimler personally examines results to resolve defects — ensuring your transaction is legally sound and ready to close.",
    tags: ["Attorney Review", "Defect Resolution", "Legal Opinion"],
    span: "lg:col-span-5",
  },
  {
    icon: Home,
    title: "Real Estate Closings",
    description:
      "We handle the entire closing — from document preparation to fund disbursement — so every party closes smoothly and on time.",
    tags: ["Residential", "Commercial", "Refinancing"],
    span: "lg:col-span-7",
    feature: true,
  },
];

export default function PracticeAreas() {
  return (
    <section id="practice-areas" className="relative overflow-hidden bg-background py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-navy/70 mb-4">
              <span className="h-1 w-1 rounded-full bg-gold" /> What we do
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
              Title work, handled <span className="italic text-navy">in-house</span>.
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Whether your deal needs a title search and policy, or full legal
            advice and representation — we have you covered.
          </p>
        </motion.div>

        {/* Asymmetric bento */}
        <div className="grid gap-5 lg:grid-cols-12">
          {areas.map(({ icon: Icon, title, description, tags, span, feature }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`group ${span} rounded-[1.6rem] border border-border bg-card p-2.5 transition-all duration-500 hover:shadow-lift`}
            >
              {/* inner bezel */}
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-inner p-7 transition-colors duration-500 ${
                  feature ? "bg-navy text-cream" : "bg-cream"
                }`}
              >
                {/* decorative glow */}
                {feature && (
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60" />
                )}

                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
                      feature ? "bg-cream/10" : "bg-navy/[0.06]"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${feature ? "text-gold-light" : "text-navy"}`} />
                  </div>
                  <ArrowUpRight
                    className={`h-5 w-5 -translate-y-1 translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 ${
                      feature ? "text-cream" : "text-navy"
                    }`}
                  />
                </div>

                <h3
                  className={`relative z-10 mt-8 font-serif text-2xl tracking-tight ${
                    feature ? "text-cream" : "text-ink"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`relative z-10 mt-3 max-w-md text-sm leading-relaxed ${
                    feature ? "text-cream/70" : "text-ink-soft"
                  }`}
                >
                  {description}
                </p>

                <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-6">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
                        feature
                          ? "border-cream/20 text-cream/70"
                          : "border-border text-ink-soft"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 rounded-[1.6rem] border border-gold/30 bg-gold/[0.07] p-8 text-center"
        >
          <p className="mx-auto max-w-2xl leading-relaxed text-ink">
            <span className="font-semibold">Need legal advice too?</span> Roaring
            Brook Abstract works closely with the{" "}
            <span className="font-semibold">Law Offices of Christopher R. Kimler, PC</span>.
            If your deal requires legal representation, we can help with that as
            well — Chris limits his law practice to{" "}
            <span className="font-semibold">real property and title</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
