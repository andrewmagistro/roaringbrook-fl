import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import FeatureBlocks, { type FeatureBlock } from "@/components/feature-blocks";
import StatBar from "@/components/stat-bar";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "For Lenders | Roaring Brook Title and Escrow Agency",
  description:
    "Comprehensive lender services in Florida: CertifID wire fraud protection, clean commitments, prompt mortgage recording, and on-time policy issuance.",
};

const blocks: FeatureBlock[] = [
  {
    icon: "shield",
    title: "Simple, secure closings with CertifID protection.",
    description:
      "Wire fraud safeguards and a clean process so funds move safely and without delay.",
  },
  {
    icon: "message",
    title: "Proactive, clear communication.",
    description:
      "You stay informed at every stage with our secure portal — no extra calls needed.",
  },
  {
    icon: "fileInput",
    title: "Flexible document submission.",
    description:
      "We adapt to your workflow so files move the way your team already works.",
  },
  {
    icon: "calendar",
    title: "Accurate, on-time commitments.",
    description:
      "Clear title work delivered when you need it so underwriting and scheduling stay on track.",
  },
  {
    icon: "stamp",
    title: "Prompt mortgage recording.",
    description:
      "Documents are recorded quickly to protect your lien position and your investment.",
  },
  {
    icon: "fileCheck",
    title: "Title policy issuance and delivery.",
    description:
      "Policies are issued and delivered promptly so the file is complete when you need it.",
  },
];

export default function LendersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Lenders"
        title="Comprehensive lender services,"
        italic="handled in house."
        intro="Clean commitments, protected wires, and recording that happens when it should. Attorney-led title work that keeps your lien position secure."
      />
      <FeatureBlocks blocks={blocks} />
      <StatBar />
      <CtaBand
        heading="Order title for your next loan."
        sub="Send the contract and we'll confirm receipt and timeline the same day."
        ctaLabel="Order Title"
        ctaHref="/start-closing"
      />
    </>
  );
}
