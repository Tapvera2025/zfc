import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Humanitarian & Compassionate – ZF Canada Immigration Consultants",
  description:
    "ZF Canada guides clients through Humanitarian & Compassionate applications, helping those with exceptional circumstances obtain permanent residence in Canada.",
};

export default function HumanitarianCompassionatePage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Humanitarian & Compassionate"
          image="/assets/svc-2.png"
          breadcrumb="Humanitarian & Compassionate"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/humanitarian-compassionate">
        <h2 className="zfc-svc-detail__heading">
          Humanitarian &amp; Compassionate Applications in Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Humanitarian &amp; Compassionate (H&amp;C) applications provide a pathway to permanent residence for individuals who do not meet the standard immigration requirements but have compelling personal circumstances that warrant special consideration. At ZF Canada, our RCIC-IRB consultants carefully assess your situation and build a thorough application that highlights the humanitarian factors, establishment in Canada, and best interests of any children involved.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-2.png"
            alt="Humanitarian and Compassionate immigration application"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          H&amp;C applications are assessed on a case-by-case basis. Officers consider factors such as the degree of establishment in Canada, family ties, health conditions, and the hardship an applicant would face if required to leave. Our team ensures every relevant detail is documented clearly and persuasively to give your application the strongest possible foundation.
        </p>

        <p className="zfc-svc-detail__body">
          Whether you are already in Canada on a temporary status, have been refused other immigration pathways, or face exceptional personal hardship, ZF Canada is here to evaluate your eligibility and guide you through every step of the H&amp;C process. Contact us today for a confidential assessment.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-3.png", "/assets/svc-4.png"]}
        paragraphs={[
          "Our consultants have extensive experience preparing successful Humanitarian & Compassionate applications for clients from diverse backgrounds. We gather comprehensive evidence — including medical records, community letters, employment history, and proof of establishment — to paint a complete picture of your ties to Canada.",
          "We understand that H&C cases are deeply personal. Our team takes the time to listen to your story, identify the strongest humanitarian factors, and present your case in the most compelling way possible to immigration officers.",
          "Time-sensitive situations — such as imminent removal orders or deteriorating health — require swift and precise action. ZF Canada acts quickly to protect your status and explore all available legal options, including stays of removal and simultaneous Pre-Removal Risk Assessments (PRRAs) where applicable.",
        ]}
      />

      <Footer />
    </div>
  );
}
