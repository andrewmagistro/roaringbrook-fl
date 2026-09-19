import Hero from "@/components/hero";
import ServicesGrid from "@/components/services-grid";
import StatBar from "@/components/stat-bar";
import WhyUs from "@/components/why-us";
import Credentials from "@/components/credentials";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatBar />
      <WhyUs />
      <Credentials />
    </>
  );
}
