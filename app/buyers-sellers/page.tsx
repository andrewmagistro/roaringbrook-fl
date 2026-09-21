import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Home, MapPin, Laptop, CreditCard, Users, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import StatBar from "@/components/stat-bar";

export const metadata: Metadata = {
  title: "For Buyers & Sellers | Roaring Brook Title and Escrow Agency",
  description:
    "Convenient Florida closings for buyers and sellers — at our office, your realtor's office, your new home, or fully remote. Residential, commercial, and FSBO.",
};

const process = [
  {
    title: "Contract and order",
    body: "Your agent, lender, or you send us the signed contract. We open the file, confirm receipt in writing, and tell you the closing date we're working toward.",
  },
  {
    title: "Title search and examination",
    body: "We pull the chain of title and the public record, then an attorney reviews what comes back — deeds, mortgages, liens, judgments, easements, and anything unusual.",
  },
  {
    title: "Clearing title",
    body: "If something needs fixing — an old mortgage never released, a missing heir, a probate or trust issue — we identify it early and clear it. This is the step most delays come from, and it's where being attorney-led matters most.",
  },
  {
    title: "Closing preparation",
    body: "We prepare the settlement statement, coordinate with the lender, verify every wire instruction, and send your figures ahead of time so there are no surprises at the table.",
  },
  {
    title: "Closing and recording",
    body: "You sign — at our office, yours, your new home, or remotely. We disburse funds, record the deed and mortgage with the county, and issue your title policy.",
  },
];

const locations = [
  { icon: Building2, label: "Our office", sub: "Melbourne, Brevard County" },
  { icon: Users, label: "Your Realtor's office", sub: "Wherever is easiest" },
  { icon: Home, label: "At your new home", sub: "We come to you" },
  { icon: Laptop, label: "Remote / digital", sub: "Close from anywhere" },
];

export default function BuyersSellersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Buyers & Sellers"
        title="Close where it's"
        italic="convenient for you."
        intro="Buying or selling should not mean rearranging your week. We close on your schedule, in the place that works for you."
      />

      {/* Closing locations */}
      <section className="bg-background py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4 text-brand/70">
              <span className="h-1 w-1 rounded-full bg-gold" /> Convenient closing options
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Four ways to sign.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="group rounded-[1.6rem] border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.07] transition-colors duration-500 group-hover:bg-gold/15">
                  <Icon className="h-6 w-6 text-brand transition-colors duration-500 group-hover:text-gold-dark" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-serif text-xl tracking-tight text-ink">{label}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How a closing works */}
      <section className="bg-cream py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow mb-4 text-brand/70">
                  <span className="h-1 w-1 rounded-full bg-gold" /> How it works
                </p>
                <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
                  What actually happens{" "}
                  <span className="italic text-brand">between contract and keys.</span>
                </h2>
                <p className="mt-6 leading-relaxed text-ink-soft">
                  Most people go through this two or three times in a lifetime.
                  Here is the whole process, start to finish, without the jargon.
                </p>
              </div>
            </div>

            <ol className="lg:col-span-8">
              {process.map((step, i) => (
                <li
                  key={step.title}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Rail */}
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-card font-serif text-sm text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < process.length - 1 && (
                      <span
                        className="mt-2 w-px flex-1 bg-border"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="pt-1.5">
                    <h3 className="font-serif text-2xl leading-snug tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-xl leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Payment + experience */}
      <section className="bg-background py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[1.6rem] border border-border bg-card p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.07]">
                <CreditCard className="h-6 w-6 text-brand" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-2xl tracking-tight text-ink">
                Flexible payment options
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                We work with you on how funds are delivered and disbursed, with
                secure wire verification on every transaction so your money
                lands where it should.
              </p>
            </div>

            <div className="rounded-[1.6rem] border border-border bg-card p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.07]">
                <Users className="h-6 w-6 text-brand" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-2xl tracking-tight text-ink">
                An experienced team
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Residential closings, commercial transactions, and for sale by
                owner deals — all handled by the same team, with an attorney
                reviewing the title.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FSBO */}
      <section className="bg-brand py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5 text-cream/70">
                <span className="h-1 w-1 rounded-full bg-gold" /> For Sale By Owner
              </p>
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream md:text-5xl">
                Selling without an agent?{" "}
                <span className="italic text-gold-light">We&apos;ll handle the rest.</span>
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-cream/70">
                FSBO sellers get the same full-service closing as everyone else.
                We prepare the documents, clear title requirements, coordinate
                with the buyer&apos;s lender, hold escrow, and record the deed —
                with an attorney available if the deal needs one.
              </p>
              <Link
                href="/submit-contract"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold py-3.5 pl-6 pr-2.5 text-sm font-semibold text-brand-deep transition-colors duration-300 hover:bg-gold-light"
              >
                Start your FSBO closing
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-deep/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <ul className="grid gap-px overflow-hidden rounded-[1.6rem] border border-white/15 bg-white/10">
                {[
                  "Contract review and document preparation",
                  "Title search, examination, and curative",
                  "Escrow and secure fund disbursement",
                  "Coordination with the buyer's lender",
                  "Deed recording with the county",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 bg-brand px-6 py-5 text-[15px] text-cream/85"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <StatBar />
      <CtaBand
        heading="Have a signed contract?"
        sub="Send it over and we'll open your file today."
      />
    </>
  );
}
