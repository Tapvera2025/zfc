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
  title: "Permanent Residency – ZF Canada Immigration Consultants",
  description:
    "ZF Canada guides clients through Express Entry, PNP, and other permanent residency pathways. Expert RCIC-IRB consultants helping you make Canada your permanent home.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function PermanentResidencyPage() {
  const raw = getPageContent("svc-permanent-residency") as SvcContent;
  const title = raw?.hero?.title ?? "Permanent Residency";
  const heading = raw?.detail?.heading ?? "Permanent Residency in Canada";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/permanent-residency">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-permanent-residency.svg" alt="Permanent residency Canada Express Entry PNP" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-permanent-residency.svg"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-2.png", "/assets/svc-3.png"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
