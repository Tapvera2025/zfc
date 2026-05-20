import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Permanent Residency – ZF Canada Immigration Consultants",
  description:
    "ZF Canada guides clients through Express Entry, PNP, and other permanent residency pathways. Expert RCIC-IRB consultants helping you make Canada your permanent home.",
};

export default function PermanentResidencyPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Permanent Residency"
          image="/assets/svc-10.png"
          breadcrumb="Permanent Residency"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/permanent-residency">
        <h2 className="zfc-svc-detail__heading">
          Permanent Residency in Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Achieving permanent residence in Canada opens the door to living, working, and studying anywhere in the country, accessing most social benefits, and eventually applying for Canadian citizenship. There are numerous pathways to permanent residence — from the federal Express Entry system and Provincial Nominee Programs (PNPs) to caregiver programs and Atlantic Immigration Program (AIP). ZF Canada's RCIC-IRB consultants assess your profile and recommend the most advantageous pathway for your unique situation.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-10.png"
            alt="Permanent residency Canada Express Entry PNP"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Express Entry manages applications for the Federal Skilled Worker Program (FSWP), the Federal Skilled Trades Program (FSTP), and the Canadian Experience Class (CEC). Your Comprehensive Ranking System (CRS) score determines your likelihood of receiving an Invitation to Apply (ITA). ZF Canada conducts a thorough review of your profile to maximize your CRS score — including identifying eligible foreign work experience, arranging educational credential assessments, and advising on language testing strategies.
        </p>

        <p className="zfc-svc-detail__body">
          Provincial Nominee Programs (PNPs) provide an alternative route for candidates who may not rank competitively in federal Express Entry draws. Many provinces have streams tailored to specific occupations, regions, or employer connections. ZF Canada monitors all active PNP streams and identifies the best provincial opportunities for your profile, guiding you through the two-stage nomination and permanent residence application process.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-2.png", "/assets/svc-3.png"]}
        paragraphs={[
          "Express Entry profile optimization is one of the most impactful services we offer. A higher CRS score dramatically increases your chances of receiving an ITA in competitive draws. ZF Canada reviews every factor — age, education, language scores, Canadian work experience, job offers, and provincial nominations — and provides a clear action plan to boost your score.",
          "Provincial Nominee Programs are constantly evolving, with new streams opening and closing regularly. Our consultants track every provincial program and alert you when a stream aligns with your occupation and experience, ensuring you never miss a valuable opportunity to receive a provincial nomination.",
          "Once you receive an Invitation to Apply (ITA) or a provincial nomination, the permanent residence application itself must be submitted accurately and completely within strict deadlines. ZF Canada prepares your full application package — collecting police certificates, medical exams, biographical documents, and settlement funds proof — to ensure a smooth and timely transition to permanent residence.",
        ]}
      />

      <Footer />
    </div>
  );
}
