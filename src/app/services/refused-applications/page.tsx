import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Refused Applications – ZF Canada Immigration Consultants",
  description:
    "ZF Canada helps clients reapply and appeal refused immigration applications. Expert guidance from a Regulated Canadian Immigration Consultant (RCIC-IRB).",
};

export default function RefusedApplicationsPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Refused Applications"
          image="/assets/svc-1.png"
          breadcrumb="Refused Applications"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/refused-applications">
        <h2 className="zfc-svc-detail__heading">
          Refused Applications in Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Dealing with Refused Applications in Canada can be frustrating and
          discouraging, but it does not mean the end of your immigration journey.
          Many applications are refused due to incomplete documentation, missing
          information, or submission errors. At ZF Canada, we specialize in
          reviewing Refused Applications in Canada, identifying the reasons for
          refusal, and preparing stronger reapplications or appeals to improve
          your chances of approval.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-1.png"
            alt="Refused Applications — immigration documents being reviewed"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Our team has extensive experience handling Refused Applications in
          Canada across various categories, including sponsorships, permanent
          residency, visitor visas, study permits, work permits, and Humanitarian
          &amp; Compassionate cases. We carefully assess each case and develop
          customized strategies to address the specific concerns raised by
          immigration officers, ensuring your next application is as strong as
          possible.
        </p>

        <p className="zfc-svc-detail__body">
          At ZF Canada, we understand the urgency and stress that comes with a
          refused immigration application. Our Regulated Canadian Immigration
          Consultants (RCIC-IRB) are committed to providing timely and effective
          solutions. Whether you need to reapply, file a reconsideration request,
          or appeal to the Immigration and Refugee Board (IRB), we are here to
          guide you every step of the way.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-2.png", "/assets/svc-3.png"]}
        paragraphs={[
          "Our team of Regulated Canadian Immigration Consultants (RCIC-IRB) has a proven track record of successfully overturning refused applications across all visa and permit categories. We conduct a thorough review of your previous refusal letter, identify the exact grounds cited by the officer, and build a compelling reapplication or appeal tailored to address each concern.",
          "Whether your application was refused due to insufficient ties to your home country, inadequate financial documentation, or misrepresentation concerns, we develop a customized strategy that strengthens every aspect of your file. Our consultants stay current with IRCC policies and case law to give your application the best possible chance of approval.",
          "Time is often critical when dealing with a refusal. ZF Canada moves quickly to assess your situation, advise you on available legal remedies — including Judicial Review at the Federal Court if necessary — and begin building your next submission without delay. Reach out today for a confidential assessment of your case.",
        ]}
      />

      <Footer />
    </div>
  );
}
