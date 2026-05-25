import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "Misrepresentation – ZF Canada Immigration Consultants",
  description:
    "Facing a misrepresentation finding in Canada? ZF Canada's RCIC-IRB consultants can help you understand your options, respond to allegations, and rebuild your case.",
};

type SvcContent = { hero: { title: string }; detail: { heading: string; paragraphs: string[] }; extra: { paragraphs: string[] } };

export default function MisrepresentationPage() {
  const raw = getPageContent("svc-misrepresentation") as SvcContent;
  const title = raw?.hero?.title ?? "Misrepresentation";
  const heading = raw?.detail?.heading ?? "Misrepresentation in Canadian Immigration";
  const detail = raw?.detail?.paragraphs ?? [];
  const extra = raw?.extra?.paragraphs ?? [];

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/svc-misrepresentation.svg" breadcrumb={title} />
      </div>

      <ServiceDetailLayout activeHref="/services/misrepresentation">
        <h2 className="zfc-svc-detail__heading">{heading}</h2>

        {detail[0] && <p className="zfc-svc-detail__body">{detail[0]}</p>}

        <div className="zfc-svc-detail__img-wrap">
          <Image src="/assets/svc-misrepresentation.svg" alt="Misrepresentation in Canadian immigration" fill sizes="(max-width: 900px) 100vw, 60vw" className="zfc-svc-detail__img" />
        </div>

        {detail.slice(1).map((p, i) => <p key={i} className="zfc-svc-detail__body">{p}</p>)}
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/svc-misrepresentation.svg"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-5.png", "/assets/svc-6.png"]}
        paragraphs={extra}
      />

      <Footer />
    </div>
  );
}
