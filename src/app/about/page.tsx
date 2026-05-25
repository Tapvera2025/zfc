import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import StatsSection from "@/components/home/StatsSection";
import CountriesSection from "@/components/home/CountriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogsSection from "@/components/home/BlogsSection";
import Footer from "@/components/home/Footer";

export default function AboutPage() {
  return (
    <div className="zfc-about-page">
      <ServicesPageHeader activePage="About Us" />
      <div className="zfc-about-hero-wrap">
        <AboutHero />
        <AboutIntroSection />
      </div>
      <StatsSection />
      <CountriesSection />
      <TestimonialsSection />
      <BlogsSection />
      <Footer />
    </div>
  );
}
