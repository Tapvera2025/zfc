import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Refugee Claim Application – ZF Canada Immigration Consultants",
  description:
    "ZF Canada provides expert assistance with refugee claim applications in Canada. Our RCIC-IRB consultants help you navigate the refugee determination process with confidence.",
};

export default function RefugeeClaimPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Refugee Claim Application"
          image="/assets/svc-6.png"
          breadcrumb="Refugee Claim Application"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/refugee-claim">
        <h2 className="zfc-svc-detail__heading">
          Refugee Claim Applications in Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Canada's refugee protection system offers safety to individuals who face persecution, torture, or cruel and unusual treatment in their home country. Filing a refugee claim is a complex, multi-stage legal process with strict timelines and documentation requirements. At ZF Canada, our RCIC-IRB consultants — authorized to appear before the Immigration and Refugee Board (IRB) — provide expert support at every stage of your claim.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-6.png"
            alt="Refugee claim application in Canada"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          A successful refugee claim requires a compelling and well-documented Basis of Claim (BOC) form that clearly establishes your fear of persecution and the connection to one of the five protected grounds: race, religion, nationality, political opinion, or membership in a particular social group. Our team helps you prepare a thorough and coherent narrative supported by country condition evidence and personal documentation.
        </p>

        <p className="zfc-svc-detail__body">
          If your refugee claim has been rejected, options may include a Pre-Removal Risk Assessment (PRRA), appeal to the Refugee Appeal Division (RAD), or Judicial Review at the Federal Court. ZF Canada assesses your situation quickly and moves to protect your safety and status in Canada without delay.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-7.png", "/assets/svc-8.png"]}
        paragraphs={[
          "Preparing for your Refugee Protection Division (RPD) hearing is one of the most critical steps in your claim. Our consultants conduct thorough pre-hearing preparation — reviewing your BOC, anticipating questions from the Member, organizing country condition documents, and preparing you for the hearing environment so you can present your case with clarity and confidence.",
          "Country condition evidence plays a crucial role in refugee claims. We research and compile up-to-date documentation from credible sources — including UNHCR reports, human rights organizations, and news sources — that corroborate your specific fear and demonstrate that state protection is unavailable or ineffective in your country of origin.",
          "If your claim is denied at the RPD, the Refugee Appeal Division (RAD) provides an opportunity to challenge the decision based on errors of law or fact. ZF Canada prepares detailed written submissions and, where permitted, new evidence to maximize your chances of a successful outcome at the appeal stage.",
        ]}
      />

      <Footer />
    </div>
  );
}
