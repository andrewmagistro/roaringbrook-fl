import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import FAQ from "@/components/faq";

export const metadata: Metadata = {
  title: "FAQs | Roaring Brook Title and Escrow Agency",
  description:
    "Common questions about title insurance, escrow, closing costs, and the Florida closing process.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Common questions"
        title="Title work,"
        italic="explained plainly."
        intro="Title insurance confuses almost everyone. Here are the questions we get asked most, answered the way we'd explain them to a neighbor."
      />
      <FAQ />
    </>
  );
}
