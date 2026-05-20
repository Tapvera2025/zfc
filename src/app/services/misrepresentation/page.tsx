import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Misrepresentation – ZF Canada Immigration Consultants",
  description:
    "Facing a misrepresentation finding in Canada? ZF Canada's RCIC-IRB consultants can help you understand your options, respond to allegations, and rebuild your case.",
};

export default function MisrepresentationPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Misrepresentation"
          image="/assets/svc-4.png"
          breadcrumb="Misrepresentation"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/misrepresentation">
        <h2 className="zfc-svc-detail__heading">
          Misrepresentation in Canadian Immigration
        </h2>

        <p className="zfc-svc-detail__body">
          A misrepresentation finding under Canada's Immigration and Refugee Protection Act (IRPA) can have serious and long-lasting consequences, including a five-year bar from entering or applying for status in Canada. Misrepresentation can occur unintentionally — through errors, omissions, or the actions of a third-party representative — and can still result in a finding against you. At ZF Canada, we help clients understand the allegation, respond effectively, and explore all available remedies.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-4.png"
            alt="Misrepresentation in Canadian immigration"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Our RCIC-IRB consultants conduct a thorough review of your case — examining what information was provided, what was omitted, and whether the misrepresentation was direct or indirect. We then prepare a comprehensive response that addresses the officer's concerns, presents mitigating factors, and demonstrates your commitment to honest and transparent dealings with immigration authorities.
        </p>

        <p className="zfc-svc-detail__body">
          If you have already received a misrepresentation finding, there are still options available, including Humanitarian &amp; Compassionate grounds, Judicial Review at the Federal Court, and in some cases, an appeal before the Immigration Appeal Division. ZF Canada will assess your situation and recommend the most effective course of action. Do not wait — contact us as soon as possible, as strict deadlines apply.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-5.png", "/assets/svc-6.png"]}
        paragraphs={[
          "Misrepresentation allegations are taken extremely seriously by IRCC and the Immigration Division. Having an experienced RCIC-IRB consultant in your corner can make the difference between a successful response and a life-altering immigration ban. We know exactly what officers look for and how to craft a response that addresses each concern head-on.",
          "Many clients come to us after an unauthorized representative filed inaccurate documents on their behalf. These 'ghost consultant' cases are unfortunately common, and there are specific legal arguments available to clients who were victims of such fraud. We build these defences carefully with the supporting evidence needed to demonstrate good faith.",
          "If time has passed since a misrepresentation finding and the five-year bar has lifted, ZF Canada can help you reapply for immigration status with a strengthened application that proactively addresses the prior finding and demonstrates your commitment to accuracy and transparency.",
        ]}
      />

      <Footer />
    </div>
  );
}
