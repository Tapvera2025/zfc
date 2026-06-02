export const dynamic = "force-dynamic";

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
import { getPageContent } from "@/lib/page-content-store";

type HomeContent = {
  hero?: { title?: string; subtitle?: string; ctaText?: string; ctaHref?: string };
  about?: { heading?: string; body?: string };
  whyUs?: { heading?: string; points?: string[] };
  stats?: { label: string; value: string }[];
  servicesSection?: { heading?: string; intro?: string; cards?: { title: string; description: string; href: string }[] };
  countries?: { heading?: string; body?: string; otherCount?: string };
  testimonialsSection?: { heading?: string; subheading?: string };
  testimonials?: { photo: string; text: string; name: string; role: string; rating: number }[];
};

export default function HomePage() {
  const cms = getPageContent("home") as HomeContent;

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
          <HeroSection
            title={cms?.hero?.title}
            subtitle={cms?.hero?.subtitle}
            ctaText={cms?.hero?.ctaText}
            ctaHref={cms?.hero?.ctaHref}
          />
        </div>
      </div>

      {/* ── All other sections: full width ── */}
      <AboutSection
        heading={cms?.about?.heading}
        body={cms?.about?.body}
        whyUsHeading={cms?.whyUs?.heading}
        points={cms?.whyUs?.points}
      />
      <ServicesSection
        heading={cms?.servicesSection?.heading}
        intro={cms?.servicesSection?.intro}
        cards={cms?.servicesSection?.cards}
      />
      <StatsSection stats={cms?.stats} />
      <CountriesSection
        heading={cms?.countries?.heading}
        body={cms?.countries?.body}
        otherCount={cms?.countries?.otherCount}
      />
      <TestimonialsSection
        heading={cms?.testimonialsSection?.heading}
        subheading={cms?.testimonialsSection?.subheading}
        testimonials={cms?.testimonials}
      />
      <BlogsSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
