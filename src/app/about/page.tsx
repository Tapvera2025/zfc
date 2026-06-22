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
export default function AboutPage() {
  return (
    <div className="zfc-about-page">
      <ServicesPageHeader activePage="About Us" />
      <div className="zfc-about-hero-wrap">
        <AboutHero title="About Us" />
        <AboutIntroSection
          heading="ZF Canada - Trusted Canada Visa Consultants Since 1992"
          body={"ZF Canada is a go-to Canada Visa Consultant that guides individuals, families, and businesses through the Canadian immigration process. Since 1992, they've provided expert advice and personal assistance to folks all over the world.\n\nThe company is led by Sufian Ahmed (RCIC-IRB) along with a team of pros who give reliable advice and custom immigration plans. Sufian is an active member of the College of Immigration and Citizenship Consultants (CICC), which is the main regulator for immigration consultants in Canada.\n\nWith a lot of experience under their belts, the ZF Canada team is known for giving honest advice and stellar service. They stay up-to-date on Canadian immigration laws to help their clients accurately and efficiently.\n\nIntegrity, transparency, and putting clients first are key at ZF Canada. Because of these values, they're seen as a top choice for those looking for help with immigration. When it comes to refused or complicated applications, ZF Canada steps in to help. If your application was rejected, the team can evaluate your situation, discuss your choices, and guide you toward reaching your immigration goals in Canada."}
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
