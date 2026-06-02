export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "Our Services – ZF Canada Immigration Consultants",
  description: "Explore ZF Canada immigration services including Refused Applications, Sponsorship, Refugee Claims, IRB Hearings, Permanent Residency, and more.",
};

type ServicesContent = { hero?: { title?: string } };

export default function ServicesPage() {
  const cms = getPageContent("services") as ServicesContent;

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServicesHero title={cms?.hero?.title} />
      </div>
      <ServicesListSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
