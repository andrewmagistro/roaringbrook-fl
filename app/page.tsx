import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import QuickAccess from "@/components/quick-access";
import AudienceCards from "@/components/audience-cards";
import NetSheet from "@/components/net-sheet";
import Partners from "@/components/partners";
import PracticeAreas from "@/components/practice-areas";
import Attorneys from "@/components/attorneys";
import CaseResults from "@/components/case-results";
import TestimonialsSection from "@/components/testimonials-section";
import Consultation from "@/components/consultation";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuickAccess />
      <AudienceCards />
      <Partners />
      <PracticeAreas />
      <Attorneys />
      <CaseResults />
      <TestimonialsSection />
      <NetSheet />
      <FAQ />
      <Consultation />
      <Footer />
      <Chatbot />
    </main>
  );
}
