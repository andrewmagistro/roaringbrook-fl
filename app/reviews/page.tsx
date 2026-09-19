import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import TestimonialsSection from "@/components/testimonials-section";
import CaseResults from "@/components/case-results";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Reviews | Roaring Brook Title and Escrow Agency",
  description:
    "What buyers, sellers, realtors, and lenders say about closing with Roaring Brook Title and Escrow Agency.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What it's like to close"
        italic="with us."
        intro="Rated 4.8 on Google by the buyers, sellers, agents, and lenders we work with."
      />
      <TestimonialsSection />
      <CaseResults />
      <CtaBand />
    </>
  );
}
