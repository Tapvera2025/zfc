import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Inadmissibility – ZF Canada Immigration Consultants",
  description:
    "ZF Canada helps clients overcome inadmissibility to Canada caused by criminality, health issues, or misrepresentation. Expert RCIC-IRB guidance for complex cases.",
};

export default function InadmissibilityPage() {
  return (
    <div className="zfc-services-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Inadmissibility"
          image="/assets/svc-3.png"
          breadcrumb="Inadmissibility"
        />
      </div>

      <ServiceDetailLayout activeHref="/services/inadmissibility">
        <h2 className="zfc-svc-detail__heading">
          Overcoming Inadmissibility to Canada
        </h2>

        <p className="zfc-svc-detail__body">
          Being found inadmissible to Canada can feel like an insurmountable barrier, but it does not have to be the end of your journey. Inadmissibility can arise from criminal history, security concerns, health grounds, financial reasons, or misrepresentation. At ZF Canada, our RCIC-IRB consultants have the expertise to assess your specific inadmissibility ground and identify the most effective legal remedies available to you.
        </p>

        <div className="zfc-svc-detail__img-wrap">
          <Image
            src="/assets/svc-3.png"
            alt="Inadmissibility to Canada — legal pathways"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            className="zfc-svc-detail__img"
          />
        </div>

        <p className="zfc-svc-detail__body">
          Depending on the nature and severity of the inadmissibility, there are several potential solutions, including Temporary Resident Permits (TRPs), Criminal Rehabilitation applications, Minister's relief, or appeals before the Immigration Appeal Division (IAD). Our team carefully reviews your history and recommends the most appropriate pathway to restore your admissibility to Canada.
        </p>

        <p className="zfc-svc-detail__body">
          ZF Canada takes a proactive approach to inadmissibility cases. We work diligently to gather the supporting documentation required, prepare comprehensive submissions, and represent your interests before immigration authorities. If you have been refused entry or told you are inadmissible, contact us today for a confidential evaluation of your options.
        </p>
      </ServiceDetailLayout>

      <ServiceDetailExtra
        photo="/assets/services-photo.png"
        photoAlt="ZF Canada immigration consultant"
        images={["/assets/svc-4.png", "/assets/svc-5.png"]}
        paragraphs={[
          "Criminal inadmissibility is one of the most common barriers our clients face. Whether you have a single past conviction or a more complex criminal history, ZF Canada can assess whether you qualify for Criminal Rehabilitation — a permanent solution that removes the inadmissibility once approved.",
          "For clients who need to enter or remain in Canada urgently despite their inadmissibility, a Temporary Resident Permit (TRP) may be the right short-term solution. Our consultants build compelling TRP applications that clearly demonstrate the purpose and necessity of your travel or stay.",
          "Health-related inadmissibility — including conditions that may cause excessive demand on Canadian health or social services — requires careful medical and legal analysis. We work closely with clients to understand the specific concerns raised and prepare detailed responses supported by medical evidence and expert opinion.",
        ]}
      />

      <Footer />
    </div>
  );
}
