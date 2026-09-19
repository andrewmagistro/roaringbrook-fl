import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Consultation from "@/components/consultation";
import Credentials from "@/components/credentials";

export const metadata: Metadata = {
  title: "Contact | Roaring Brook Title and Escrow Agency",
  description:
    "Reach Roaring Brook Title and Escrow Agency in Melbourne, Florida. Call (321) 498-0135 or send us a message — calls are returned the same day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to someone who can"
        italic="actually help."
        intro="Calls are returned the same day. If you already have an executed contract, use Submit a Contract instead and we'll open the file today."
      />
      <Consultation />
      <Credentials />
    </>
  );
}
