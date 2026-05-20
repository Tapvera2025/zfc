import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Temporary Residence – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists with all temporary residence applications including visitor visas, study permits, and work permits. Expert RCIC-IRB guidance for a smooth process.",
};

export default function TemporaryResidencePage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Temporary Residence"
          image="/assets/svc-8.png"
          breadcrumb="Temporary Residence"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/temporary-residence">
        <h2 className="zfc-svc-detail__heading">
          Temporary Residence in Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Temporary residence allows individuals to visit, study, or work in Canada for a defined period. Whether you are applying for a Temporary Resident Visa (TRV), an Electronic Travel Authorization (eTA), a study permit, or a work permit, the application process requires careful attention to eligibility criteria, documentation, and how your personal circumstances are presented. ZF Canada's RCIC-IRB consultants ensure your application is complete, accurate, and compelling.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-8.png"
            alt="Temporary residence visa study permit work permit Canada"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Visitor visas are frequently refused when officers are not satisfied that the applicant will leave Canada at the end of their authorized stay. Our team helps you demonstrate strong ties to your home country — including employment, family, property, and financial commitments — while also clearly establishing the genuine purpose of your visit to Canada.
        </p>

        <p className="zfc-svc-detail__body">
          For study and work permit applicants, eligibility requirements have become increasingly detailed and program-specific. ZF Canada keeps up with the latest IRCC policy changes and ensures your application under the correct stream — whether PGWP, LMIA-based, LMIA-exempt, or otherwise — is submitted correctly the first time. We also assist with extensions and changes to conditions once you are already in Canada.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-9.png", "/assets/svc-10.png"]}
        paragraphs={[
          "Visitor visa refusals are one of the most common immigration challenges. ZF Canada reviews refused applications to identify exactly why the officer was not satisfied and prepares a stronger reapplication that directly addresses those concerns with targeted supporting evidence.",
          "Study permit applications require demonstrating both acceptance at a Designated Learning Institution (DLI) and sufficient financial resources to support yourself throughout your studies. Our team ensures your application package — including the Student Direct Stream (SDS) where eligible — is organized and complete to minimize processing times.",
          "Work permits in Canada cover a wide range of streams, from employer-specific permits requiring a Labour Market Impact Assessment (LMIA) to LMIA-exempt permits under international agreements such as CUSMA/USMCA. ZF Canada identifies the correct pathway for your situation and handles the entire application process from start to finish.",
        ]}
      />

      <Footer />
    </div>
  );
}
