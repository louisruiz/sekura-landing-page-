import Hero from "@/components/Hero";
import SocialProofSection from "@/components/SocialProofSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import ComparatifSection from "@/components/ComparatifSection";
import PersonasSection from "@/components/PersonasSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import GlobalEnhancements from "@/components/GlobalEnhancements";
import StickyCTA from "@/components/ui/StickyCTA";

export default function Home() {
  return (
    <main>
      <GlobalEnhancements />
      <Hero />
      <SocialProofSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ComparatifSection />
      <PersonasSection />
      <TestimonialsSection />
      <FAQSection />
      <CTAFinalSection />
      <StickyCTA />
    </main>
  );
}
