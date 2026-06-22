import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

/* ─────────────────────────────────────────────────────
   Service content — scraped & ported from old website
   ───────────────────────────────────────────────────── */
interface Section {
  subheading?: string;
  paragraphs: string[];
}

interface ServiceData {
  title: string;
  metaDescription: string;
  heading: string;
  sections: Section[];
  extraParagraphs: string[];
}

const SERVICES: Record<string, ServiceData> = {};

/* ─────────────────────────────────────────────────────
   Static params for build-time generation
   ───────────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────────────
   Metadata
   ───────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES[slug];
  if (!svc) return { title: "Service Not Found" };
  return {
    title: `${svc.title} – ZF Canada Immigration Consultants`,
    description: svc.metaDescription,
  };
}

/* ─────────────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────────────── */
export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const svc = SERVICES[slug];
  if (!svc) notFound();

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader activePage="Services" />

      {/* Hero */}
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title={svc.title}
          image="/assets/services-banner.png"
          breadcrumb={svc.title}
        />
      </div>

      {/* Sidebar + Content */}
      <ServiceDetailLayout activeHref={`/services/${slug}`}>
        <h2 className="zfc-svc-detail__heading">{svc.heading}</h2>

        {svc.sections.map((section, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {section.subheading && (
              <h3 style={{
                fontFamily: "var(--zfc-font-heading)",
                fontSize: "clamp(18px, 1.6vw, 24px)",
                fontWeight: 700,
                color: "#cc1f1f",
                margin: "8px 0 0",
                lineHeight: 1.3,
              }}>
                {section.subheading}
              </h3>
            )}
            {section.paragraphs.map((para, j) => (
              <p key={j} className="zfc-svc-detail__body">{para}</p>
            ))}
          </div>
        ))}
      </ServiceDetailLayout>

      {/* Extra section with photo, FAQ, CTA */}
      <ServiceDetailExtra
        photo="/assets/about-photo.png"
        photoAlt={`ZF Canada – ${svc.title} consultants`}
        images={["/assets/services-hero-bg.png", "/assets/services-hero-main.png"]}
        paragraphs={svc.extraParagraphs}
      />

      <FAQSection />
      <Footer />
    </div>
  );
}
