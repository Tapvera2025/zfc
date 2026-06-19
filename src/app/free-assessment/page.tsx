export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { getPageContent } from "@/lib/page-content-store";
import FreeAssessmentForm from "./FreeAssessmentForm";

type FreeAssessmentContent = {
  hero?: { title?: string };
  intro?: { heading?: string; body?: string };
  submitButtonText?: string;
};

export default async function FreeAssessmentPage() {
  const cms = await getPageContent("free-assessment") as FreeAssessmentContent;
  const heroTitle = cms?.hero?.title ?? "Free Assessment";

  return (
    <div className="zfc-assessment-page">
      <ServicesPageHeader activePage="Free Assessment" />

      {/* ── Hero ── */}
      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero" aria-label="Free Assessment hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image
              src="/assets/services-hero-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">{heroTitle}</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">{heroTitle}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* ── Form section ── */}
      <FreeAssessmentForm
        introHeading={cms?.intro?.heading}
        introBody={cms?.intro?.body}
        submitButtonText={cms?.submitButtonText}
      />

      <FAQSection />
      <Footer />
    </div>
  );
}
