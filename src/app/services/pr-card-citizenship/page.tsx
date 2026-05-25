import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "PR Card / Citizenship – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists permanent residents with PR card renewals, residency obligation appeals, and citizenship applications. Expert help from RCIC-IRB consultants.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function PrCardCitizenshipPage() {
  const raw = getPageContent("svc-pr-card-citizenship") as SvcContent;
  const title = raw?.hero?.title ?? "PR Card / Citizenship";
  const heading = raw?.detail?.heading ?? "PR Card Renewal & Canadian Citizenship";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/svc-pr-card-citizenship.svg" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/pr-card-citizenship">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-pr-card-citizenship.svg" alt="PR card renewal and Canadian citizenship application" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-pr-card-citizenship.svg"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-10.png", "/assets/svc-1.png"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
