import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import PracticeAreas from "@/components/practice-areas";
import AudienceCards from "@/components/audience-cards";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Services | Roaring Brook Title and Escrow Agency",
  description:
    "Title insurance, title searches, title examination, escrow, curative work, and residential, commercial, and FSBO real estate closings in Florida.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Title, escrow, and closings —"
        italic="handled in house."
        intro="Search, examination, curative, escrow, and closing. One team from contract through recording, with an attorney reviewing the title."
      />
      <PracticeAreas />
      <AudienceCards />
      <CtaBand />
    </>
  );
}
