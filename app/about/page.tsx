import type { Metadata } from "next";
import { Scale, Landmark, MapPin, Award } from "lucide-react";
import PageHero from "@/components/page-hero";
import StatBar from "@/components/stat-bar";

export const metadata: Metadata = {
  title: "Meet Chris Kimler | Roaring Brook Title and Escrow Agency",
  description:
    "Roaring Brook Title and Escrow Agency is owned and operated by Chris Kimler, an attorney and title agent with 30 years of experience and over $1.5 billion in transactions.",
};

const credentials = [
  { icon: Scale, label: "Attorney & title agent", sub: "Real estate and title insurance" },
  { icon: MapPin, label: "Licensed in four states", sub: "FL · NJ · NY · PA" },
  { icon: Landmark, label: "30 years of experience", sub: "$1.5B+ in transactions" },
  { icon: Award, label: "BBB A+ accredited", sub: "Accredited business" },
];

const family = [
  {
    name: "Evan",
    detail:
      "His oldest son, an Eagle Scout, is currently studying environmental science at the University of Central Florida.",
  },
  {
    name: "Wesley",
    detail: "His middle son is proudly serving in the United States Navy.",
  },
  {
    name: "Abigail",
    detail:
      "His daughter is studying marketing and pre-law at the University of Tampa in preparation to attend law school.",
  },
  {
    name: "Zachary",
    detail: "His youngest son is attending Merritt Island High School.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Chris Kimler"
        title="Experienced Attorney"
        italic="with Proven Results."
      />

      {/* Bio */}
      <section className="bg-background py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[1.8rem] border border-border bg-card p-2.5">
                <img
                  src="/chris-kimler.jpg"
                  alt="Christopher R. Kimler, attorney and title agent"
                  className="w-full rounded-inner object-cover object-top"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
              <div className="mt-4 grid gap-px overflow-hidden rounded-[1.4rem] border border-border bg-border">
                {credentials.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-4 bg-card px-5 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/[0.07]">
                      <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink">{label}</span>
                      <span className="block text-xs text-ink-soft">{sub}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                Christopher R. Kimler
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Owner · Attorney &amp; Title Agent
              </p>

              <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-ink-soft">
                <p>
                  Roaring Brook Title and Escrow Agency is owned and operated by
                  Chris Kimler, an attorney and title agent who focuses on real
                  estate and title insurance.
                </p>
                <p>
                  With 30 years of experience and over $1.5 billion in
                  transactions, Chris and his team bring the kind of in-depth
                  knowledge that only comes from handling files at that scale.
                </p>
                <p>
                  Chris is licensed to conduct closings in{" "}
                  <span className="font-medium text-ink">
                    Florida, New Jersey, New York, and Pennsylvania
                  </span>
                  .
                </p>
              </div>

              {/* Family */}
              <div className="mt-12 rounded-[1.6rem] border border-border bg-cream p-8">
                <h3 className="font-serif text-2xl tracking-tight text-ink">
                  Outside the office
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Chris lives with his wife of 28 years and his four children on
                  Merritt Island, Florida.
                </p>
                <ul className="mt-6 space-y-4 border-t border-border pt-6">
                  {family.map(({ name, detail }) => (
                    <li key={name} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <p className="text-[15px] leading-relaxed text-ink-soft">
                        <span className="font-medium text-ink">{name}.</span> {detail}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-border pt-6 text-[15px] text-ink-soft">
                  The family is rounded out by two dogs, Ollie and Knox, and a
                  cat named Loki.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatBar />
    </>
  );
}
