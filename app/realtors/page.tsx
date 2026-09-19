import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import FeatureBlocks, { type FeatureBlock } from "@/components/feature-blocks";
import StatBar from "@/components/stat-bar";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "For Realtors | Roaring Brook Title and Escrow Agency",
  description:
    "Accurate, on-time Florida closings for real estate agents. Real-time secure portal updates, proactive communication, and closings on your terms.",
};

const blocks: FeatureBlock[] = [
  {
    icon: "shield",
    title: "Close with confidence.",
    description:
      "Every file is prepared with precision so closings stay accurate and free of last-minute surprises.",
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
        title="Closings that keep your deals"
        italic="on track."
        intro="You brought the deal together. We make sure the closing doesn't get in the way — accurate files, early requirements, and a team that answers the phone."
      />
      <FeatureBlocks blocks={blocks} />
      <StatBar />
      <CtaBand
        heading="Send us your next contract."
        sub="We open the file the same business day and keep you posted from there."
      />
    </>
  );
}
