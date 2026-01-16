import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { HeroMotionCanvas } from "@/components/HeroMotionCanvas";
import { IndustriesSection } from "@/components/IndustriesSection";
import { LogoWall } from "@/components/LogoWall";
import { PhilosophySection } from "@/components/PhilosophySection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ServiceSection } from "@/components/ServiceSection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroMotionCanvas />
      <ServiceSection />
      <PortfolioSection />
      <IndustriesSection />
      <LogoWall />
      <Testimonials />
      <PhilosophySection />
      <CTASection />
      <Footer />
    </main>
  );
}
