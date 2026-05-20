import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sponsorship – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists Canadian citizens and permanent residents in sponsoring their family members for permanent residence. Expert sponsorship guidance from RCIC-IRB consultants.",
};

export default function SponsorshipPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Sponsorship"
          image="/assets/svc-5.png"
          breadcrumb="Sponsorship"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/sponsorship">
        <h2 className="zfc-svc-detail__heading">
          Family Sponsorship in Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Canada's Family Sponsorship program allows Canadian citizens and permanent residents to reunite with their loved ones by sponsoring them for permanent residence. Whether you wish to sponsor a spouse, common-law partner, dependent children, parents, grandparents, or other eligible relatives, ZF Canada's experienced RCIC-IRB consultants are here to guide both you and your sponsored family members through every stage of the process.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-5.png"
            alt="Family sponsorship immigration Canada"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          The sponsorship process involves two simultaneous assessments: the sponsor's eligibility and the sponsored person's admissibility. Both parts must be carefully prepared to avoid delays or refusals. Our team reviews your financial situation, relationship documentation, and the sponsored person's background to identify and address potential concerns before they become problems.
        </p>

        <p className="zfc-svc-detail__body">
          Sponsorship applications — particularly those involving spouses or partners — are subject to heightened scrutiny to ensure the genuineness of the relationship. ZF Canada helps you gather compelling evidence of your relationship and present it in a clear, organized manner that satisfies immigration officers. If a sponsorship has been refused, we also assist with appeals to the Immigration Appeal Division (IAD).
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-6.png", "/assets/svc-7.png"]}
        paragraphs={[
          "Spousal and partner sponsorship is one of the most personal immigration pathways, and we treat it with the care it deserves. Our consultants help you compile a comprehensive relationship package — photographs, communication records, financial ties, and statutory declarations — to demonstrate the genuineness of your relationship beyond any doubt.",
          "Parent and Grandparent sponsorship under the Super Visa program or the annual lottery requires careful planning and precise timing. ZF Canada monitors program openings and ensures your application is complete, accurate, and submitted at the right moment to maximize your chances of success.",
          "If your sponsorship application has been refused or your relationship is being questioned, ZF Canada can represent you at an Immigration Appeal Division (IAD) hearing. Our RCIC-IRB consultants are authorized to appear at the IRB and will advocate strongly on your behalf to reunite you with your family.",
        ]}
      />

      <Footer />
    </div>
  );
}
