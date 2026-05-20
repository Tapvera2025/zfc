import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PR Card / Citizenship – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists permanent residents with PR card renewals, residency obligation appeals, and citizenship applications. Expert help from RCIC-IRB consultants.",
};

export default function PrCardCitizenshipPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="PR Card / Citizenship"
          image="/assets/svc-9.png"
          breadcrumb="PR Card / Citizenship"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/pr-card-citizenship">
        <h2 className="zfc-svc-detail__heading">
          PR Card Renewal &amp; Canadian Citizenship
        </h2>

        <p className="zfc-svc-detail__body">
          Maintaining your permanent resident status and ultimately achieving Canadian citizenship are two of the most important milestones in your immigration journey. ZF Canada provides expert guidance for PR card renewals, residency obligation compliance, Travel Document applications, and citizenship applications — ensuring you protect and build on the status you have worked hard to achieve.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-9.png"
            alt="PR card renewal and Canadian citizenship application"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Permanent residents must meet the residency obligation — physically present in Canada for at least 730 days in every five-year period. If you have spent significant time outside Canada, your PR status may be at risk. ZF Canada reviews your travel history, assesses your residency obligation compliance, and advises you on the best approach, whether that is a straightforward renewal, a humanitarian argument, or an appeal before the Immigration Appeal Division (IAD).
        </p>

        <p className="zfc-svc-detail__body">
          When it comes to Canadian citizenship, eligibility is determined by factors including physical presence (1,095 days in the five years before applying), language ability, and knowledge of Canada. ZF Canada helps you calculate your eligibility accurately, prepare your application, and address any complications — such as criminal records or prior absences — that could affect your citizenship grant.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-10.png", "/assets/svc-1.png"]}
        paragraphs={[
          "PR card renewals appear straightforward but can become complicated when there are concerns about residency obligation compliance. ZF Canada calculates your days of physical presence precisely, identifies any humanitarian factors that may help explain extended absences, and prepares a complete and credible renewal package.",
          "If your PR card application or renewal has been refused due to residency obligation concerns, you may have the right to appeal to the Immigration Appeal Division (IAD). Our RCIC-IRB consultants are authorized to represent you at the IAD and will argue both legal and humanitarian grounds to preserve your permanent resident status.",
          "Citizenship applications require careful documentation of your physical presence in Canada. ZF Canada helps you compile travel records, employment documentation, and tax records to support your application. If your application is held up or refused, we advise on the next steps including requesting reconsideration or seeking Judicial Review at the Federal Court.",
        ]}
      />

      <Footer />
    </div>
  );
}
