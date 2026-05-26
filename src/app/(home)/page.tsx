import HeroSection from "@/components/home/HeroSection";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import CountriesSection from "@/components/home/CountriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogsSection from "@/components/home/BlogsSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="zfc-home-page bg-white min-h-screen overflow-x-hidden">
      {/* ── Hero card: constrained + rounded on all sides ── */}
      <div
        className="flex justify-center items-start box-border"
        style={{ padding: "clamp(14px, 2.3vw, 30px)" }}
      >
        <div
          className="zfc-home-hero-frame relative w-full rounded-[28px] overflow-hidden flex flex-col mx-auto"
          style={{ minHeight: "calc(100svh - clamp(28px, 4.6vw, 60px))" }}
        >
          <ServicesPageHeader activePage="Home" />
          <HeroSection />
        </div>
      </div>

      {/* ── All other sections: full width ── */}
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <CountriesSection />
      <TestimonialsSection />
      <BlogsSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
