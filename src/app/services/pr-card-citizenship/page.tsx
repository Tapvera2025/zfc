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

export const metadata: Metadata = {
  title: "PR Card / Citizenship – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists permanent residents with PR card renewals, residency obligation appeals, and citizenship applications. Expert help from RCIC-IRB consultants.",
};


const permanentResidentBenefits = [
  { label: "Live Anywhere in Canada", text: "Choose to live in any province or territory across Canada." },
  { label: "Work for Most Employers", text: "Access a wide range of employment opportunities without requiring a work permit." },
  { label: "Study in Canada", text: "Enroll in educational institutions and pursue academic or professional goals." },
  { label: "Access Healthcare Benefits", text: "Qualify for provincial or territorial healthcare coverage, subject to local requirements." },
  { label: "Sponsor Eligible Family Members", text: "Help certain family members immigrate to Canada through family sponsorship programs." },
  { label: "Protection Under Canadian Law", text: "Benefit from the rights and protections provided by Canadian laws and the Canadian Charter of Rights and Freedoms." },
  { label: "Pathway to Canadian Citizenship", text: "Eligible permanent residents may apply for Canadian citizenship after meeting the required criteria." },
  { label: "Build a Stable Future", text: "Enjoy long-term opportunities for personal, educational, and professional growth in Canada." },
];

const citizenshipApplicationChecklist = [
  "Incomplete application forms or missing supporting documents.",
  "Errors or inconsistencies in personal information.",
  "Failure to meet the required physical presence requirements.",
  "Insufficient proof of language proficiency, where applicable.",
  "Unresolved income tax filing obligations.",
  "Misrepresentation or inaccurate information provided in the application.",
  "Criminal charges, convictions, or ongoing legal matters.",
  "Failure to respond to additional document requests from IRCC.",
  "Missing travel history or residency records.",
  "Eligibility requirements not fully met at the time of application.",
];

const prCardHelpSteps = [
  "Initial Consultation",
  "Eligibility Assessment",
  "Document Checklist Preparation",
  "Application Review",
  "Application Submission",
  "Follow-Up Support",
  "Responding to Additional Requests",
  "Decision Guidance",
];

const prCardFaqQuestions = [
  "How Do I Start My PR Card Renewal or Citizenship Application?",
  "Can You Help Replace a Lost or Expired PR Card?",
  "What If I Have Not Met the Residency Obligation?",
  "Can You Help With a Permanent Resident Travel Document?",
  "How Long Does a PR Card or Citizenship Application Take?",
  "What Documents Do I Need for Canadian Citizenship?",
  "Can You Review My Application Before Submission?",
  "How Can I Book a Consultation With ZF Canada?",
  "Is My Information Kept Confidential?",
];

export default function PrCardCitizenshipPage() {
  const title = "PR Card / Citizenship";

  return (
    <div className="zfc-services-page zfc-pr-card-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-pr-card-intro" aria-labelledby="pr-card-intro-heading">
        <div className="zfc-pr-card-intro__inner">
          <h2 id="pr-card-intro-heading" className="zfc-pr-card-intro__heading">
            PR Card and Canadian Citizenship
            <span>Support for Permanent Residents</span>
          </h2>

          <div className="zfc-pr-card-intro__layout">
            <div className="zfc-pr-card-intro__image-wrap">
              <Image
                src="/assets/pr-card-citizenship-intro.png"
                alt="Passport, boarding passes, and Canadian visa application form"
                width={499}
                height={370}
                sizes="(max-width: 820px) calc(100vw - 48px), 536px"
                className="zfc-pr-card-intro__image"
                priority
              />
            </div>

            <div className="zfc-pr-card-intro__copy">
              <h3>What Are PR Cards and Canadian Citizenship?</h3>
              <p>
                Permanent Resident (PR) Card is the legal documentation that proves that you are a permanent resident of Canada. This card serves as a proof that you have the right to live, work, and study in Canada and is commonly required upon entering the country after traveling. Citizenship comes afterward in many cases for those who qualify as permanent residents to apply. With Canadian citizenship comes the right to vote, hold a Canadian passport, and even participate in politics by standing for elections.
              </p>
              <Link href="/book-consultation" className="zfc-pr-card-intro__cta">
                Get Professional Advice
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section className="zfc-pr-card-benefits" aria-labelledby="pr-card-benefits-heading">
        <div className="zfc-pr-card-benefits__inner">
          <h2 id="pr-card-benefits-heading" className="zfc-pr-card-benefits__heading">
            Benefits of Permanent Resident Status
            <span>in Canada</span>
          </h2>
          <p className="zfc-pr-card-benefits__intro">
            Permanent residency in Canada provides many benefits and possibilities for people interested in settling in Canada for their future. Permanent residents have similar rights and privileges to that of Canadian citizens but still hold their own nationality.
          </p>

          <div className="zfc-pr-card-benefits__image-wrap">
            <Image
              src="/assets/pr-card-permanent-resident-benefits.png"
              alt="Canadian passport held in front of a Canadian flag"
              width={1143}
              height={613}
              sizes="(max-width: 1280px) calc(100vw - 48px), 1230px"
              className="zfc-pr-card-benefits__image"
            />
          </div>

          <p className="zfc-pr-card-benefits__lead">
            Some key benefits of permanent resident status include:
          </p>
          <ul className="zfc-pr-card-benefits__list">
            {permanentResidentBenefits.map((benefit) => (
              <li key={benefit.label}>
                <strong>{benefit.label}</strong> – {benefit.text}
              </li>
            ))}
          </ul>
          <p className="zfc-pr-card-benefits__closing">
            Permanent resident status is an important step toward establishing a successful life in Canada and may eventually lead to Canadian citizenship for eligible applicants.
          </p>
        </div>
      </section>

      <section className="zfc-pr-card-citizenship" aria-labelledby="pr-card-citizenship-heading">
        <div className="zfc-pr-card-citizenship__inner">
          <h2 id="pr-card-citizenship-heading" className="zfc-pr-card-citizenship__heading">
            Who Can Apply for Canadian Citizenship?
          </h2>

          <div className="zfc-pr-card-citizenship__image-wrap">
            <Image
              src="/assets/pr-card-citizenship-eligibility.png"
              alt="Canadian passport and citizenship application paperwork"
              width={1262}
              height={520}
              sizes="(max-width: 1080px) calc(100vw - 48px), 1040px"
              className="zfc-pr-card-citizenship__image"
            />
          </div>

          <p className="zfc-pr-card-citizenship__body">
            Canadian citizenship is generally available to permanent residents who meet the eligibility requirements established by Immigration, Refugees and Citizenship Canada (IRCC). Applicants must typically have permanent resident status, meet physical presence requirements, and comply with applicable tax obligations. Depending on their age, they may also need to demonstrate English or French language proficiency and pass a citizenship test. Applications must be complete, accurate, and supported by the required documentation. At ZF Canada, we help eligible permanent residents assess their qualifications and navigate the Canadian citizenship application process with confidence.
          </p>

          <div className="zfc-pr-card-citizenship__cta-wrap">
            <Link href="/book-consultation" className="zfc-pr-card-citizenship__cta">
              Check Your Eligibility Today
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="zfc-pr-card-citizenship-checklist" aria-labelledby="pr-card-checklist-heading">
        <div className="zfc-pr-card-citizenship-checklist__inner">
          <h2 id="pr-card-checklist-heading" className="zfc-pr-card-citizenship-checklist__heading">
            Common Issues That Can Delay PR Card
            <span>or Citizenship Applications</span>
          </h2>
          <ul className="zfc-pr-card-citizenship-checklist__list">
            {citizenshipApplicationChecklist.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="zfc-pr-card-citizenship-checklist__closing">
            ZF Canada can help review your eligibility, prepare supporting documents, and ensure your citizenship application is complete and accurate before submission.
          </p>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="pr-card-citizenship"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-pr-card-help" aria-labelledby="pr-card-help-heading">
        <div className="zfc-pr-card-help__heading-wrap">
          <h2 id="pr-card-help-heading" className="zfc-pr-card-help__heading">
            How We Help With PR Card
            <span>and Citizenship Applications</span>
          </h2>
        </div>

        <div className="zfc-pr-card-help__timeline" aria-label="PR card and citizenship application support process">
          <Image
            src="/assets/pr-card-citizenship-help-wave.png"
            alt=""
            width={1440}
            height={101}
            sizes="100vw"
            className="zfc-pr-card-help__wave"
          />
          <ol className="zfc-pr-card-help__steps">
            {prCardHelpSteps.map((step) => (
              <li key={step} className="zfc-pr-card-help__step">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="zfc-pr-card-help__cta">
          <h2 className="zfc-pr-card-help__cta-heading">
            Ready to Apply for a PR Card or
            <span>Canadian Citizenship?</span>
          </h2>
          <p className="zfc-pr-card-help__cta-text">
            Ready to renew your PR card, replace a lost card, apply for a Permanent Resident Travel Document, or pursue Canadian citizenship? ZF Canada is here to help. Our experienced team can assess your eligibility, prepare your application, and guide you through every step of the process.
          </p>
          <p className="zfc-pr-card-help__call">
            Call +1 (905) 858-5589 today
          </p>
          <p className="zfc-pr-card-help__cta-text zfc-pr-card-help__cta-text--closing">
            to get started with trusted immigration support.
          </p>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="pr-card-citizenship-journey-form"
        className="zfc-contact--journey zfc-contact--pr-card"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="pr-card-citizenship-journey"
      />
      <FAQSection questions={prCardFaqQuestions} />

      <Footer />
    </div>
  );
}
