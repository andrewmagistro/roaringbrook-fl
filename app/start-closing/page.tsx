import type { Metadata } from "next";
import { PhoneCall, FileSearch, CalendarCheck, KeyRound } from "lucide-react";
import PageHero from "@/components/page-hero";
import StartClosingForm from "@/components/start-closing-form";

export const metadata: Metadata = {
  title: "Start Your Closing | Roaring Brook Title and Escrow Agency",
  description:
    "Getting started doesn't require a signed contract. Tell us about your Brevard County transaction and we'll walk you through what happens next.",
};

const steps = [
  {
    icon: PhoneCall,
    title: "Tell us about the deal",
    body: "A few details below. No contract required — if you're still negotiating, that's fine.",
  },
  {
    icon: FileSearch,
    title: "We open the file",
    body: "Title search and examination begin, and we tell you exactly what we'll need from you.",
  },
  {
    icon: CalendarCheck,
    title: "We clear requirements early",
    body: "Anything that could delay closing gets identified and cleared up front, not the day before.",
  },
  {
    icon: KeyRound,
    title: "You close",
    body: "At our office, at your office, remotely, or wherever works. Then we record and issue the policy.",
  },
];

export default function StartClosingPage() {
  return (
    <>
      <PageHero
        eyebrow="Start your closing"
        title="Let's get your file"
        italic="moving."
        intro="You don't need a signed contract to get started. Tell us where things stand and we'll take it from there — usually the same business day."
      />

      {/* How it works */}
      <section className="bg-background py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="relative rounded-[1.6rem] border border-border bg-card p-7"
              >
                <span className="font-serif text-sm text-gold-dark">
                  0{i + 1}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.07]">
                  <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-xl leading-snug tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background pb-24">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="mb-10 rounded-[1.4rem] border border-gold/30 bg-gold/[0.07] p-7">
            <p className="leading-relaxed text-ink">
              <span className="font-semibold">Already have a signed contract?</span>{" "}
              Skip this and{" "}
              <a
                href="/submit-contract"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-light"
              >
                submit it directly
              </a>{" "}
              — we&apos;ll open the title file the same business day.
            </p>
          </div>

          <StartClosingForm />
        </div>
      </section>
    </>
  );
}
