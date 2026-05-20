import AboutPageHeader from "@/components/about/AboutPageHeader";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import AboutServicesSection from "@/components/about/AboutServicesSection";
import StatsSection from "@/components/home/StatsSection";
import CountriesSection from "@/components/home/CountriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogsSection from "@/components/home/BlogsSection";
import Footer from "@/components/home/Footer";

export default function AboutPage() {
  return (
    <div className="zfc-about-page">
      <AboutPageHeader />
      <div className="zfc-about-hero-wrap">
        <AboutHero />
        <AboutIntroSection />
      </div>
      <AboutServicesSection />
      <StatsSection />
      <CountriesSection />
      <TestimonialsSection />
      <BlogsSection />
      <Footer />
    </div>
  );
}
