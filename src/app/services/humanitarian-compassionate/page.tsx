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
  title: "Humanitarian & Compassionate – ZF Canada Immigration Consultants",
  description:
    "ZF Canada guides clients through Humanitarian & Compassionate applications, helping those with exceptional circumstances obtain permanent residence in Canada.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function HumanitarianCompassionatePage() {
  const raw = getPageContent("svc-humanitarian-compassionate") as SvcContent;
  const title = raw?.hero?.title ?? "Humanitarian & Compassionate";
  const heading = raw?.detail?.heading ?? "Humanitarian & Compassionate Applications in Canada";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/svc-humanitarian-compassionate.svg" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/humanitarian-compassionate">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-hc-body.svg" alt="Humanitarian and Compassionate immigration application" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-humanitarian-compassionate.svg"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-hc-duo-left.svg", "/assets/svc-hc-duo-right.svg"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
