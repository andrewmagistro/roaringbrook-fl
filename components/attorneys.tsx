"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const credentials = [
  { label: "Licensed Attorney", sub: "NJ, PA, NY & FL Bar" },
  { label: "Licensed Title Agent", sub: "First American" },
  { label: "Real Property Focus", sub: "Title & Closings" },
  { label: "BBB A+ Rated", sub: "Accredited Business" },
];

export default function Attorneys() {
  return (
    <section id="attorneys" className="relative overflow-hidden bg-navy-deep py-28 text-cream">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-navy/40 blur-3xl" />
      <div className="container relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow text-gold-light mb-4">
            <span className="h-1 w-1 rounded-full bg-gold" /> The difference
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Attorney-led, <span className="italic text-gold-light">personally</span>.
          </h2>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[1.6rem] border border-cream/10 bg-cream/5 p-2.5">
              <div className="relative overflow-hidden rounded-inner">
                <img
                  src="/chris-kimler.jpg"
                  alt="Christopher R. Kimler, Esq."
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "4/5" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-cream">Christopher R. Kimler</h3>
                  <p className="mt-1 text-sm font-medium text-gold-light">Attorney &amp; Title Agent</p>
                </div>
              </div>
            </div>

            {/* contact pills */}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Phone, label: "Call", val: "(321) 498-0135", href: "tel:3214980135" },
                { icon: MapPin, label: "Office", val: "Melbourne, FL", href: "#consultation" },
                { icon: Mail, label: "Email", val: "Message", href: "mailto:crkimler@kimlerlaw.com" },
              ].map(({ icon: Icon, label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-3 transition-colors hover:bg-cream/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                    <Icon className="h-4 w-4 text-gold-light" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wide text-cream/50">{label}</span>
                    <span className="block truncate text-sm font-semibold text-cream">{val}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 lg:pt-4"
          >
            <div className="space-y-6 text-lg leading-relaxed text-cream/75">
              <p>
                <span className="font-medium text-cream">Roaring Brook Abstract</span>{" "}
                is owned and run by <span className="font-medium text-cream">Chris Kimler</span> —
                an attorney and title agent who limits his law practice to real
                property and title.
              </p>
              <p>
                In a market where you can't wait a week for a returned call — and
                where you don't want your matter "pushed off" onto someone else —
                Chris and his staff answer your questions and close your deal{" "}
                <span className="font-medium text-cream">right away</span>.
              </p>
              <p>
                Most deals only need a title search, examination, and policy — so
                Roaring Brook Abstract is all you need. When a deal calls for legal
                representation, the{" "}
                <span className="font-medium text-cream">Law Offices of Christopher R. Kimler, PC</span>{" "}
                works right alongside us.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-cream/5 px-4 py-3.5"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <span className="block text-sm font-semibold text-cream">{c.label}</span>
                    <span className="block text-xs text-cream/50">{c.sub}</span>
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#consultation"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-light"
            >
              Work with Chris
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
