import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "Temporary Residence – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists with all temporary residence applications including visitor visas, study permits, and work permits. Expert RCIC-IRB guidance for a smooth process.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function TemporaryResidencePage() {
  const raw = getPageContent("svc-temporary-residence") as SvcContent;
  const title = raw?.hero?.title ?? "Temporary Residence";
  const heading = raw?.detail?.heading ?? "Temporary Residence in Canada";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/svc-temporary-residence.svg" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/temporary-residence">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-temporary-residence.svg" alt="Temporary residence visa study permit work permit Canada" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-temporary-residence.svg"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-9.png", "/assets/svc-10.png"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
