import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import Trust from "@/components/home/Trust";
import Cta from "@/components/home/Cta";

export default function HomePage() {
  return (
    <main className="page-bottom-space">
      <Hero />
      <Services />
      <HowItWorks />
      <Trust />
      <Cta />
    </main>
  );
}