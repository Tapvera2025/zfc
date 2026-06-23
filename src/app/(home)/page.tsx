export const dynamic = "force-dynamic";

import HeroSection from "@/components/home/HeroSection";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import AboutSection from "@/components/home/AboutSection";
import HomeWhoWeAreSection from "@/components/home/HomeWhoWeAreSection";
import ServicesSection from "@/components/home/ServicesSection";
import AssessmentBannerSection from "@/components/home/AssessmentBannerSection";
import StatsSection from "@/components/home/StatsSection";
import CountriesSection from "@/components/home/CountriesSection";
import VisaStepsSection from "@/components/home/VisaStepsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MapSection from "@/components/home/MapSection";
import VideoTestimonialsSection from "@/components/home/VideoTestimonialsSection";
import BlogsSection from "@/components/home/BlogsSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { getPageContent } from "@/lib/page-content-store";

type HomeContent = {
  hero?: { title?: string; subtitle?: string; description?: string; ctaText?: string; ctaHref?: string };
  about?: { heading?: string; body?: string };
  whyUs?: { heading?: string; points?: string[] };
  stats?: { label: string; value: string }[];
  servicesSection?: { heading?: string; intro?: string; cards?: { title: string; description: string; href: string; image?: string }[] };
  countries?: { heading?: string; body?: string; otherCount?: string };
  testimonialsSection?: { heading?: string; subheading?: string };
  testimonials?: { photo: string; text: string; name: string; role: string; rating: number }[];
  whyChooseSection?: { heading?: string; cards?: { title: string; body: string }[] };
  visaStepsSection?: { heading?: string; ctaText?: string; steps?: { title: string; body: string }[] };
  videoTestimonialsSection?: { reviews?: { text: string; name: string; role: string; rating: number }[] };
  faqSection?: { heading?: string; questions?: string[] };
  mapSection?: { embedUrl?: string };
};

const REQUESTED_HOME_HERO = {
  title: "Welcome to\nZF Canada",
  subtitle: "Immigration Consultants Canada",
  description: "Book a consultation with trusted immigration consultants in Canada to explore your visa, PR, and permit options.",
  ctaText: "Explore More",
  ctaHref: "/about",
};

const STALE_HOME_HERO = {
  title: "We Speak for You.\nWe Make the Law Work for You.",
  subtitle: "Regulated Canadian Immigration Consultants helping families, students, workers and businesses navigate Canada's immigration system.",
  ctaText: "Get Free Consultation",
  ctaHref: "/free-assessment",
};

function resolveHomeHero(hero: HomeContent["hero"]) {
  return {
    title: hero?.title && hero.title !== STALE_HOME_HERO.title ? hero.title : REQUESTED_HOME_HERO.title,
    subtitle: hero?.subtitle && hero.subtitle !== STALE_HOME_HERO.subtitle ? hero.subtitle : REQUESTED_HOME_HERO.subtitle,
    description: hero?.description || REQUESTED_HOME_HERO.description,
    ctaText: hero?.ctaText && hero.ctaText !== STALE_HOME_HERO.ctaText ? hero.ctaText : REQUESTED_HOME_HERO.ctaText,
    ctaHref: hero?.ctaHref && hero.ctaHref !== STALE_HOME_HERO.ctaHref ? hero.ctaHref : REQUESTED_HOME_HERO.ctaHref,
  };
}

export default async function HomePage() {
  const cms = await getPageContent("home") as HomeContent;
  const hero = resolveHomeHero(cms?.hero);

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
            title={hero.title}
            subtitle={hero.subtitle}
            description={hero.description}
            ctaText={hero.ctaText}
            ctaHref={hero.ctaHref}
          />
        </div>
      </div>

      {/* ── All other sections: full width ── */}
      <AboutSection
        heading={cms?.about?.heading}
        body={cms?.about?.body}
      />
      <HomeWhoWeAreSection />
      <ServicesSection
        heading={cms?.servicesSection?.heading}
        intro={cms?.servicesSection?.intro}
        cards={cms?.servicesSection?.cards}
      />
      <AssessmentBannerSection
        heading={cms?.whyChooseSection?.heading}
        cards={cms?.whyChooseSection?.cards}
      />
      <StatsSection stats={cms?.stats} />
      <CountriesSection
        heading={cms?.countries?.heading}
        body={cms?.countries?.body}
        otherCount={cms?.countries?.otherCount}
      />
      <VisaStepsSection />
      <TestimonialsSection
        heading={cms?.testimonialsSection?.heading}
        subheading={cms?.testimonialsSection?.subheading}
        testimonials={cms?.testimonials}
      />
      <MapSection />
      <VideoTestimonialsSection />
      <BlogsSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
