import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ContractForm from "@/components/contract-form";

export const metadata: Metadata = {
  title: "Submit a Contract | Roaring Brook Title and Escrow Agency",
  description:
    "Upload your executed Florida real estate contract and we'll open your title file the same business day.",
};

export default function SubmitContractPage() {
  return (
    <>
      <PageHero
        eyebrow="Title file intake"
        title="Submit your"
        italic="executed contract."
        intro="Upload the signed contract and we'll open your title file the same business day."
      />

      <section className="bg-background py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="mb-10 rounded-[1.4rem] border border-gold/30 bg-gold/[0.07] p-7">
            <p className="leading-relaxed text-ink">
              <span className="font-semibold">What we need:</span> the fully
              executed purchase and sale contract, signed by all parties, in PDF
              form. If you have addenda, riders, or amendments, combine them into
              a single PDF and attach it in the second slot. Anything else we
              need, we&apos;ll request by email after intake.
            </p>
          </div>

          <ContractForm />
        </div>
      </section>
    </>
  );
}
