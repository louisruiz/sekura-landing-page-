import { getDictionary } from "@/dictionaries";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import ComparatifSection from "@/components/ComparatifSection";
import PersonasSection from "@/components/PersonasSection";
import FAQSection from "@/components/FAQSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import GlobalEnhancements from "@/components/GlobalEnhancements";

export default async function Home({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale);

  return (
    <main>
      <GlobalEnhancements />
      <Hero dict={dict} locale={params.locale} />
      <ProblemSection dict={dict} />
      <HowItWorksSection dict={dict} />
      <FeaturesSection dict={dict} />
      <ComparatifSection dict={dict} />
      <PersonasSection dict={dict} />
      <FAQSection dict={dict} />
      <CTAFinalSection dict={dict} />
    </main>
  );
}
