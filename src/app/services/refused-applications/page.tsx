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
  title: "Refused Applications – ZF Canada Immigration Consultants",
  description:
    "ZF Canada helps clients reapply and appeal refused immigration applications. Expert guidance from a Regulated Canadian Immigration Consultant (RCIC-IRB).",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function RefusedApplicationsPage() {
  const raw = getPageContent("svc-refused-applications") as SvcContent;
  const title = raw?.hero?.title ?? "Refused Applications";
  const heading = raw?.detail?.heading ?? "Refused Applications in Canada";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/svc-refused-hero.svg" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/refused-applications">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-refused-body.svg" alt="Refused Applications — immigration documents being reviewed" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-refused-applications-detail.svg"
        photoAlt="ZF Canada immigration consultant"
        redBanner="/assets/svc-refused-applications-red.svg"
        images={["/assets/svc-refused-duo-left.svg", "/assets/svc-refused-duo-right.svg"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
