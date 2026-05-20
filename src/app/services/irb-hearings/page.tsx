import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "IRB – Hearing & Appeals – ZF Canada Immigration Consultants",
  description:
    "ZF Canada's RCIC-IRB consultants are authorized to represent clients at Immigration and Refugee Board hearings and appeals, including the IAD, RPD, RAD, and ID.",
};

export default function IrbHearingsPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="IRB – Hearing & Appeals"
          image="/assets/svc-7.png"
          breadcrumb="IRB – Hearing & Appeals"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/irb-hearings">
        <h2 className="zfc-svc-detail__heading">
          IRB Hearings &amp; Appeals
        </h2>

        <p className="zfc-svc-detail__body">
          The Immigration and Refugee Board (IRB) is Canada's largest independent administrative tribunal, responsible for making decisions on immigration and refugee matters. ZF Canada's RCIC-IRB consultants hold the designation that authorizes them to appear and represent clients before all four IRB divisions: the Refugee Protection Division (RPD), the Refugee Appeal Division (RAD), the Immigration Division (ID), and the Immigration Appeal Division (IAD).
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-7.png"
            alt="IRB hearings and appeals representation Canada"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Whether you are attending a refugee hearing, appealing a deportation order, challenging a sponsorship refusal, or responding to a removal or inadmissibility proceeding, having a qualified representative who knows IRB procedures inside and out is essential. Our consultants prepare meticulous submissions, gather the strongest evidence, and advocate effectively on your behalf at every hearing.
        </p>

        <p className="zfc-svc-detail__body">
          IRB proceedings are governed by strict rules of procedure and tight deadlines. Missing a filing deadline or submitting insufficient evidence can be fatal to your case. ZF Canada ensures your case is always prepared well in advance — with comprehensive legal arguments, organized documentary evidence, and thorough witness preparation — so you walk into your hearing with confidence.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada RCIC-IRB consultant"
        images={["/assets/svc-8.png", "/assets/svc-9.png"]}
        paragraphs={[
          "The Immigration Appeal Division (IAD) hears appeals of sponsorship refusals, removal orders, and residency obligation cases. At the IAD, both legal arguments and humanitarian considerations can be raised. Our consultants present a compelling combination of legal submissions and personal evidence to give your appeal the best possible chance of success.",
          "The Immigration Division (ID) conducts admissibility hearings and detention reviews. If you or a family member is detained by the Canada Border Services Agency (CBSA) or facing an admissibility hearing, ZF Canada provides urgent representation to argue for release or contest the inadmissibility allegation as quickly as possible.",
          "At the Refugee Appeal Division (RAD), we challenge RPD decisions that contain errors of law, fact, or mixed law and fact. Our written submissions are detailed, carefully researched, and supported by updated country condition evidence and, where permitted, new evidence that was not available at the RPD stage.",
        ]}
      />

      <Footer />
    </div>
  );
}
