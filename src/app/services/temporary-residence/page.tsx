export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import MapSection from "@/components/home/MapSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "Temporary Residence – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists with all temporary residence applications including visitor visas, study permits, and work permits. Expert RCIC-IRB guidance for a smooth process.",
};

type SvcContent = { hero: { title: string } };

const temporaryResidenceApplications = [
  {
    title: "Visitor Visa Applications",
    text: "A visitor visa permits qualified foreign citizens to enter Canada as tourists, visitors, businessmen, or for a temporary period. We provide assistance in determining your eligibility, completing documentation, and submitting applications in order to make your application more favorable.",
  },
  {
    title: "Super Visa Applications",
    text: "The Super Visa program targets parents and grandparents of Canadians. It is a good option compared to normal visitor visa application since it permits long-term visits to Canada. We assist you in fulfilling all the conditions necessary for the issuance of this special permit.",
  },
  {
    title: "Work Permit Applications",
    text: "Should you have an employment offer or be eligible for a certain work permit program, we would be able to help with your application preparation process. We have experts who will guide you regarding the necessary steps that need to be taken.",
  },
  {
    title: "Study Permit Applications",
    text: "Canada is a popular destination for international students. We help prospective students navigate the study permit process, including admission requirements, financial documentation, and application preparation.",
  },
  {
    title: "Intra-Company Transfers (ICT)",
    text: "The owners, managers, and essential employees can be transferred from the foreign-based company to their Canada-based branch/affiliate. We assist our clients through the entire Intra-Company Transfer process in establishing and developing their businesses in Canada.",
  },
  {
    title: "Temporary Resident Permit (TRP) Applications",
    text: "Individuals who are inadmissible to Canada due to criminal, medical, or other concerns may still be eligible for entry through a Temporary Resident Permit. We assess your circumstances and help prepare a comprehensive application where appropriate.",
  },
  {
    title: "Status Extension or Restoration",
    text: "In case you are in Canada on a temporary basis and you are approaching the end of your validity period, then you have the chance of getting yourself extended or having your status restored. We are here to assist you and take you through the process smoothly.",
  },
  {
    title: "Refused Temporary Residence Applications",
    text: "A refusal is not necessarily a stop sign on your road to immigration. We look into your rejection letters, point out possible issues, and work with you on strategies for another attempt at immigration.",
  },
];

const temporaryResidenceDocuments = [
  { label: "Valid Passport:", text: "A passport that remains valid for the duration of your intended stay in Canada." },
  { label: "Completed Application Forms", text: "All required immigration forms completed accurately and signed where necessary." },
  { label: "Proof of Financial Support", text: "Bank statements, pay slips, tax documents, or other evidence showing you can support yourself during your stay." },
  { label: "Purpose of Visit Documents", text: "Travel itinerary, invitation letter, conference registration, school acceptance letter, or employment documents, depending on your application type." },
  { label: "Employment or Business Evidence", text: "Employment letters, business registration documents, or proof of ongoing professional commitments." },
  { label: "Proof of Home Country Ties", text: "Documents demonstrating family, employment, property ownership, or other reasons to return home after your temporary stay." },
  { label: "Travel History Records", text: "Copies of previous visas, entry stamps, and travel records, where applicable." },
  { label: "Photographs", text: "Recent photographs that meet Canadian immigration specifications." },
  { label: "Medical Examination Results", text: "Required for certain applicants depending on their circumstances and length of stay." },
  { label: "Police Clearance Certificates", text: "May be requested for specific temporary residence applications." },
  { label: "Additional Supporting Documents", text: "Any other documents requested by Immigration, Refugees and Citizenship Canada (IRCC) based on your individual case." },
];

const temporaryResidenceFaqQuestions = [
  "How Do I Start My Canada Immigration Process?",
  "Benefits of Choosing ZF Canada?",
  "Can You Help With Refused Visa Applications?",
  "Do You Assist Clients Outside Canada?",
  "How Long Does the Immigration Process Take?",
  "Do You Provide Personalized Immigration Solutions?",
  "Can I Apply for Permanent Residency in Canada?",
  "How Can I Book a Consultation With ZF Canada?",
  "Is My Information Kept Confidential?",
];

export default async function TemporaryResidencePage() {
  const raw = await getPageContent("svc-temporary-residence") as SvcContent;
  const title = raw?.hero?.title ?? "Temporary Residence";

  return (
    <div className="zfc-services-page zfc-temporary-residence-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-temporary-intro" aria-labelledby="temporary-intro-heading">
        <div className="zfc-temporary-intro__inner">
          <h2 id="temporary-intro-heading" className="zfc-temporary-intro__heading">
            Apply for Temporary Residence in
            <span>Canada With Confidence</span>
          </h2>

          <div className="zfc-temporary-intro__layout">
            <div className="zfc-temporary-intro__copy">
              <h3 className="zfc-temporary-intro__subheading">
                Understanding Temporary Residence in Canada
              </h3>
              <p className="zfc-temporary-intro__body">
                Temporary residence in Canada provides foreigners with the opportunity to enter Canada temporarily for purposes like tourism, family visit, studies, employment, or business. The visa requirement depends on the individual&apos;s purpose of entering the country. For example, one needs either a visitor visa, a study permit, or a work permit to be able to enter the country temporarily. One will need to understand the different types of visa options in order to select the best one.
              </p>
              <Link href="/book-consultation" className="zfc-temporary-intro__cta">
                Let Our Experts Guide
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="zfc-temporary-intro__image-wrap">
              <Image
                src="/assets/temporary-residence-intro.png"
                alt="Travellers holding passports and travel documents"
                width={522}
                height={314}
                sizes="(max-width: 820px) calc(100vw - 48px), 586px"
                className="zfc-temporary-intro__image"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <section className="zfc-temporary-services" aria-labelledby="temporary-services-heading">
        <div className="zfc-temporary-services__inner">
          <h2 id="temporary-services-heading" className="zfc-temporary-services__heading">
            Types of Temporary Residence Services
            <span>ZF Canada Offer</span>
          </h2>
          <p className="zfc-temporary-services__body">
            ZF Canada offers expert advice on all types of temporary resident applications. If you plan to visit, study, work, or handle any intricate immigration issue, our professionals can guide you in making decisions about your application process.
          </p>

          <div className="zfc-temporary-services__image-wrap">
            <Image
              src="/assets/temporary-residence-services.png"
              alt="People holding Canadian flags"
              width={1144}
              height={613}
              sizes="(max-width: 1320px) calc(100vw - 48px), 1284px"
              className="zfc-temporary-services__image"
            />
          </div>
        </div>
      </section>

      <section className="zfc-temporary-applications" aria-label="Temporary residence application types">
        <div className="zfc-temporary-applications__inner">
          {temporaryResidenceApplications.map((application) => (
            <article key={application.title} className="zfc-temporary-applications__item">
              <h3 className="zfc-temporary-applications__heading">{application.title}</h3>
              <p className="zfc-temporary-applications__body">{application.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="zfc-temporary-refusals" aria-labelledby="temporary-refusals-heading">
        <div className="zfc-temporary-refusals__inner">
          <h2 id="temporary-refusals-heading" className="zfc-temporary-refusals__heading">
            Common Reasons Temporary Residence in
            <span>Canada Applications Are Refused</span>
          </h2>

          <div className="zfc-temporary-refusals__image-wrap">
            <Image
              src="/assets/temporary-residence-refusals.png"
              alt="Smiling visitor with Canadian flag face paint"
              width={1262}
              height={520}
              sizes="(max-width: 1320px) calc(100vw - 48px), 1284px"
              className="zfc-temporary-refusals__image"
            />
          </div>

          <div className="zfc-temporary-refusals__copy">
            <p>
              Getting Temporary Residence in Canada might turn out to be a difficult endeavor, especially when there are problems with meeting the conditions set by immigration officers. Even small errors or lack of details may lead to the refusal of one&apos;s application.
            </p>

            <ul className="zfc-temporary-refusals__list">
              <li>
                Common reasons for refusal include:
                <ul>
                  <li>Insufficient financial evidence to support your stay in Canada.</li>
                  <li>An unclear purpose for travel, study, work, or family visits.</li>
                  <li>Lack of strong ties to your home country, such as employment, family, or property ownership.</li>
                  <li>Missing, incomplete, or inconsistent supporting documents.</li>
                  <li>Concerns that the applicant may not leave Canada at the end of their authorized stay.</li>
                  <li>Previous immigration violations or negative travel history.</li>
                  <li>Medical, criminal, or security-related inadmissibility issues.</li>
                  <li>Misrepresentation or inaccurate information provided during the application process.</li>
                </ul>
              </li>
            </ul>

            <p>
              When applying for Temporary Residence in Canada, it is important to submit a complete and well-documented application. At ZF Canada, we help clients identify potential concerns, strengthen their applications, and address refusal issues to improve their chances of success.
            </p>
          </div>

          <div className="zfc-temporary-refusals__cta-wrap">
            <Link href="/book-consultation" className="zfc-temporary-refusals__cta">
              Book a Consultation With ZF Canada
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="temporary-residence"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-temporary-documents" aria-labelledby="temporary-documents-heading">
        <div className="zfc-temporary-documents__inner">
          <h2 id="temporary-documents-heading" className="zfc-temporary-documents__heading">
            Key Documents Required for a Temporary
            <span>Residence in Canada Application</span>
          </h2>

          <div className="zfc-temporary-documents__image-wrap">
            <Image
              src="/assets/temporary-residence-documents.png"
              alt="Visa application form and stamped passport"
              width={1168}
              height={520}
              sizes="(max-width: 1080px) calc(100vw - 48px), 1040px"
              className="zfc-temporary-documents__image"
            />
          </div>

          <ul className="zfc-temporary-documents__list">
            {temporaryResidenceDocuments.map((document) => (
              <li key={document.label}>
                <strong>{document.label}</strong> – {document.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="zfc-temporary-process" aria-labelledby="temporary-process-heading">
        <h2 id="temporary-process-heading" className="zfc-temporary-process__heading">
          Our Temporary Residence
          <span>Application Process</span>
        </h2>

        <div className="zfc-temporary-process__graphic" aria-label="Temporary residence application process steps">
          <Image
            src="/assets/temporary-residence-process.png"
            alt=""
            width={1440}
            height={155}
            sizes="100vw"
            className="zfc-temporary-process__graphic-image"
          />
        </div>

        <div className="zfc-temporary-process__help">
          <h2>Need Help With Temporary<br />Residence in Canada?</h2>
          <p>
            Temporary residence applications can be refused if the purpose, documents, or eligibility are not presented clearly. ZF Canada can review your situation, prepare your application, and guide you through the right pathway.
          </p>
          <a href="tel:+19058585589">Call +1 (905) 858-5589 today</a>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="temporary-residence-journey-form"
        className="zfc-contact--journey zfc-contact--temporary-residence"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="temporary-residence-journey"
      />
      <FAQSection questions={temporaryResidenceFaqQuestions} />

      <Footer />
    </div>
  );
}
