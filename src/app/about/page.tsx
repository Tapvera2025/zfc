export const dynamic = "force-dynamic";

import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import AboutCommitmentSection from "@/components/about/AboutCommitmentSection";
import StatsSection from "@/components/home/StatsSection";
import CountriesSection from "@/components/home/CountriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MapSection from "@/components/home/MapSection";
import VideoTestimonialsSection from "@/components/home/VideoTestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import { getPageContent } from "@/lib/page-content-store";

type AboutContent = {
  hero?: { title?: string };
  intro?: { heading?: string; body?: string };
};

export default async function AboutPage() {
  const cms = await getPageContent("about") as AboutContent;

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
      <AboutCommitmentSection />
      <CountriesSection />
      <TestimonialsSection />
      <MapSection />
      <VideoTestimonialsSection />
      <ContactSection
        id="about-journey-form"
        className="zfc-contact--journey"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="about-journey"
      />
      <Footer />
    </div>
  );
}
