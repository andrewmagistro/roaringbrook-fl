import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import FeatureBlocks, { type FeatureBlock } from "@/components/feature-blocks";
import StatBar from "@/components/stat-bar";

export const metadata: Metadata = {
  title: "For Realtors | Roaring Brook Title and Escrow Agency",
  description:
    "Accurate, on-time Florida closings for real estate agents. Real-time secure portal updates, proactive communication, and closings on your terms.",
};

const blocks: FeatureBlock[] = [
  {
    icon: "shield",
    title: "Accuracy you can count on.",
    description:
      "Every file is prepared with precision - your closings stay free of last-minute surprises.",
  },
  {
    icon: "handshake",
    title: "Your trusted closing partner.",
    description:
      "We get the work done right and on time so you can stay focused on your clients.",
  },
  {
    icon: "monitor",
    title: "Real time secure portal updates.",
    description:
      "Safe, simple, and secure status for you and your clients — no extra calls required.",
  },
  {
    icon: "pin",
    title: "Closings on your terms.",
    description:
      "We come to you and close when and how it works best for your deal.",
  },
  {
    icon: "message",
    title: "Proactive and reliable communication.",
    description:
      "You always know exactly where the file stands — no guessing, no chasing.",
  },
];

export default function RealtorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Realtors"
        title="Close with Confidence."
        italic="Every Deal. Every Time."
        intro="You can be confident your deal is in the right hands. Accurate files, early requirements, and an experienced team working for you."
      />
      <FeatureBlocks blocks={blocks} />
      <StatBar />
    </>
  );
}
