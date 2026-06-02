export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "Inadmissibility – ZF Canada Immigration Consultants",
  description:
    "ZF Canada helps clients overcome inadmissibility to Canada caused by criminality, health issues, or misrepresentation. Expert RCIC-IRB guidance for complex cases.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function InadmissibilityPage() {
  const raw = getPageContent("svc-inadmissibility") as SvcContent;
  const title = raw?.hero?.title ?? "Inadmissibility";
  const heading = raw?.detail?.heading ?? "Overcoming Inadmissibility to Canada";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/svc-inadmissibility.svg" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/inadmissibility">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-inadmissibility.svg" alt="Inadmissibility to Canada — legal pathways" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-inadmissibility.svg"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-4.png", "/assets/svc-5.png"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
