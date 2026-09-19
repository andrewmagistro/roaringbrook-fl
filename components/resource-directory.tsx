"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Resource = { name: string; note: string; href: string };

const groups: { id: string; label: string; count: string; items: Resource[] }[] = [
  {
    id: "brevard",
    label: "Brevard County",
    count: "Our home county",
    items: [
      {
        name: "Brevard County Property Appraiser",
        note: "Parcel data, assessed values, homestead exemption forms, and plat maps",
        href: "https://www.bcpao.us/",
      },
      {
        name: "Brevard County Clerk of the Court",
        note: "Official records search — deeds, mortgages, liens, and judgments",
        href: "https://www.brevardclerk.us/official-records",
      },
      {
        name: "Brevard County Tax Collector",
        note: "Property tax bills, payment status, and prior-year balances",
        href: "https://www.brevardtaxcollector.com/",
      },
    ],
  },
  {
    id: "nearby",
    label: "Nearby counties",
    count: "Central Florida & Treasure Coast",
    items: [
      {
        name: "Indian River County Property Appraiser",
        note: "Vero Beach, Sebastian, and unincorporated Indian River County",
        href: "https://www.ircpa.org/",
      },
      {
        name: "Orange County Property Appraiser",
        note: "Orlando and surrounding Orange County parcels",
        href: "https://ocpaweb.ocpafl.org/",
      },
      {
        name: "Osceola County Property Appraiser",
        note: "Kissimmee, St. Cloud, and Osceola County records",
        href: "https://www.property-appraiser.org/",
      },
      {
        name: "Volusia County Property Appraiser",
        note: "Daytona, New Smyrna, and Volusia County parcels",
        href: "https://vcpa.vcgov.org/",
      },
    ],
  },
  {
    id: "state",
    label: "Statewide",
    count: "Florida resources",
    items: [
      {
        name: "Florida Division of Corporations (Sunbiz)",
        note: "Entity lookups when a company, LLC, or trust is on title",
        href: "https://dos.myflorida.com/sunbiz/",
      },
      {
        name: "Florida Department of Revenue",
        note: "Documentary stamp tax and intangible tax rates",
        href: "https://floridarevenue.com/",
      },
      {
        name: "Florida Association of Court Clerks",
        note: "Find any county clerk and recorder office in the state",
        href: "https://www.flclerks.com/",
      },
      {
        name: "MyFloridaCounty.com",
        note: "Search official public records across Florida counties",
        href: "https://www.myfloridacounty.com/",
      },
    ],
  },
];

export default function ResourceDirectory() {
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active) ?? groups[0];

  return (
    <section className="bg-cream py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-4 text-brand/70">
            <span className="h-1 w-1 rounded-full bg-gold" /> Helpful resources
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            Look it up yourself.
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Property records, tax bills, and recorded documents are all public.
            These are the offices we pull from every day — bookmark whichever
            one covers your property.
          </p>
        </div>

        {/* Selector */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Resource region"
        >
          {groups.map((g) => (
            <button
              key={g.id}
              role="tab"
              type="button"
              aria-selected={active === g.id}
              onClick={() => setActive(g.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                active === g.id
                  ? "bg-brand text-white"
                  : "border border-border bg-card text-ink-soft hover:border-brand/30 hover:text-ink"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 text-sm text-ink-soft">{group.count}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {group.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-5 rounded-[1.4rem] border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-lift"
                >
                  <span>
                    <span className="block font-serif text-lg leading-snug tracking-tight text-ink">
                      {item.name}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                      {item.note}
                    </span>
                  </span>
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/[0.07] text-brand transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold/20 group-hover:text-gold-dark">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-xs leading-relaxed text-ink-soft">
          These links go to third-party government sites we don&apos;t control.
          If one has moved, call us at{" "}
          <a href="tel:3214980135" className="font-medium text-brand hover:underline">
            (321) 498-0135
          </a>{" "}
          and we&apos;ll pull the record for you.
        </p>
      </div>
    </section>
  );
}
