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
  title: "IRB – Hearing & Appeals – ZF Canada Immigration Consultants",
  description:
    "ZF Canada's RCIC-IRB consultants are authorized to represent clients at Immigration and Refugee Board hearings and appeals, including the IAD, RPD, RAD, and ID.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function IrbHearingsPage() {
  const raw = getPageContent("svc-irb-hearings") as SvcContent;
  const title = raw?.hero?.title ?? "IRB – Hearing & Appeals";
  const heading = raw?.detail?.heading ?? "IRB Hearings & Appeals";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/irb-hearings">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-irb-hearings.svg" alt="IRB hearings and appeals representation Canada" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-irb-hearings.svg"
        photoAlt="ZF Canada RCIC-IRB consultant"
        images={["/assets/svc-8.png", "/assets/svc-9.png"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
