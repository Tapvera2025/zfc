import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
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
    <main className="bg-white min-h-screen overflow-x-hidden">
      {/* ── Hero card: constrained + rounded on all sides ── */}
      <div
        className="flex justify-center items-start box-border"
        style={{ padding: "clamp(16px, 2.5vw, 40px)" }}
      >
        <div
          className="relative w-full max-w-[1520px] rounded-[40px] overflow-hidden flex flex-col shadow-2xl mx-auto"
          style={{ minHeight: "calc(100vh - clamp(32px, 5vw, 80px))" }}
        >
          <Navbar />
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
