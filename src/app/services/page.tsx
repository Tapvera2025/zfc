import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

export default function ServicesPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServicesHero />
      </div>
      <ServicesListSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
