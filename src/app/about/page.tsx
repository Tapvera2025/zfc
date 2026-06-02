export const dynamic = "force-dynamic";

import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import StatsSection from "@/components/home/StatsSection";
import CountriesSection from "@/components/home/CountriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogsSection from "@/components/home/BlogsSection";
import Footer from "@/components/home/Footer";
import { getPageContent } from "@/lib/page-content-store";

type AboutContent = {
  hero?: { title?: string };
  intro?: { heading?: string; body?: string };
};

export default function AboutPage() {
  const cms = getPageContent("about") as AboutContent;

  return (
    <div className="zfc-about-page">
      <ServicesPageHeader activePage="About Us" />
      <div className="zfc-about-hero-wrap">
        <AboutHero title={cms?.hero?.title} />
        <AboutIntroSection
          heading={cms?.intro?.heading}
          body={cms?.intro?.body}
        />
      </div>
      <StatsSection />
      <CountriesSection />
      <TestimonialsSection />
      <BlogsSection />
      <Footer />
    </div>
  );
}
