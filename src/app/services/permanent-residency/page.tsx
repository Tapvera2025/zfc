import type { Metadata } from "next";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import Footer from "@/components/home/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Permanent Residency – ZF Canada Immigration Consultants",
  description:
    "ZF Canada guides clients through Express Entry, PNP, and other permanent residency pathways. Expert RCIC-IRB consultants helping you make Canada your permanent home.",
};


const permanentResidencyBenefitDetails = [
  {
    label: "Live Anywhere in Canada",
    text: "Choose to live in any province or territory based on your personal, educational, or career goals.",
  },
  {
    label: "Work for Most Canadian Employers",
    text: "Access a wide range of employment opportunities across various industries without requiring a separate work permit.",
  },
  {
    label: "Study in Canada",
    text: "Enroll in Canadian educational institutions and pursue academic and professional development opportunities.",
  },
  {
    label: "Access Public Healthcare",
    text: "Benefit from Canada's publicly funded healthcare system, subject to provincial eligibility requirements.",
  },
  {
    label: "Enjoy Social Benefits",
    text: "Eligible permanent residents may access certain social programs and benefits available under Canadian law.",
  },
  {
    label: "Sponsor Eligible Family Members",
    text: "Help reunite with loved ones by sponsoring eligible family members for immigration to Canada.",
  },
  {
    label: "Protection Under Canadian Law",
    text: "Receive legal rights and protections under the Canadian Charter of Rights and Freedoms and other applicable laws.",
  },
  {
    label: "Travel In and Out of Canada",
    text: "Maintain the ability to travel internationally while retaining permanent resident status, provided residency obligations are met.",
  },
  {
    label: "Pathway to Canadian Citizenship",
    text: "Permanent residency can be an important step toward becoming a Canadian citizen once eligibility requirements are fulfilled.",
  },
  {
    label: "Build a Secure Future",
    text: "Establish long-term roots, career growth, and greater opportunities for yourself and your family in Canada.",
  },
];

const permanentResidencyBasicRequirements = [
  {
    label: "Age",
    text: "Some immigration programs award points based on the applicant's age.",
  },
  {
    label: "Education",
    text: "Educational qualifications may be assessed to determine eligibility and ranking.",
  },
  {
    label: "Work Experience",
    text: "Relevant skilled work experience is often an important requirement for many PR programs.",
  },
  {
    label: "Language Proficiency",
    text: "Applicants may need to demonstrate their English and/or French language abilities through approved language tests.",
  },
  {
    label: "Medical Examination",
    text: "A medical assessment may be required to confirm admissibility to Canada.",
  },
  {
    label: "Police Clearance Certificates",
    text: "Applicants may need to provide police certificates from countries where they have lived.",
  },
  {
    label: "Proof of Funds",
    text: "Certain immigration pathways require applicants to show they have sufficient financial resources to settle in Canada.",
  },
  {
    label: "Program-Specific Requirements",
    text: "Additional criteria may apply depending on the immigration stream, such as job offers, provincial nominations, family sponsorship, or business qualifications.",
  },
];

const permanentResidencyRefusalReasons = [
  "Missing or inadequate supporting documents",
  "Wrong or inaccurate information provided",
  "Not meeting eligibility criteria of the program",
  "Inadequate work experience or educational credentials",
  "Unsatisfactory language test scores",
  "Medical grounds for inadmissibility",
  "Inadmissibility related to criminal history",
  "Inability to provide sufficient evidence of settlement money (when necessary)",
];

export default function PermanentResidencyPage() {
  const title = "Permanent Residency";

  return (
    <div className="zfc-services-page zfc-permanent-residency-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-permanent-residency-intro" aria-labelledby="permanent-residency-intro-heading">
        <div className="zfc-permanent-residency-intro__inner">
          <h2 id="permanent-residency-intro-heading" className="zfc-permanent-residency-intro__heading">
            Start Your Permanent Residency
            <span>Journey in Canada</span>
          </h2>

          <div className="zfc-permanent-residency-intro__layout">
            <div className="zfc-permanent-residency-intro__content">
              <h3 className="zfc-permanent-residency-intro__subheading">
                What Is Permanent Residency in Canada?
              </h3>

              <div className="zfc-permanent-residency-intro__copy">
                <p>
                  Canada&apos;s Permanent Residency (PR) program allows non-Canadians to reside, work, and study throughout Canada permanently without being citizens of Canada. PR entitles the holder to a wide range of privileges enjoyed by Canadian citizens. These include health care coverage, social security benefits, and the right to legal protection accorded to Canadians.
                </p>

                <p>
                  There are several options available for foreigners wishing to apply for Canadian PR. Among them are the Express Entry system, Provincial Nominee Programs (PNPs), family sponsorship, and other eligible programs. Permanent residents are obligated to comply with some conditions regarding their residency. After complying with all the requisite requirements, permanent residents become eligible for naturalization as Canadian citizens.
                </p>
              </div>

              <Link href="/book-consultation" className="zfc-permanent-residency-intro__cta">
                <span>Check Your PR Eligibility</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Link>
            </div>

            <div className="zfc-permanent-residency-intro__media">
              <Image
                src="/assets/permanent-residency-intro.png"
                alt="Permanent residency applicant handing over a passport and travel documents"
                width={522}
                height={444}
                sizes="(max-width: 900px) calc(100vw - 40px), 522px"
                className="zfc-permanent-residency-intro__image"
                priority={false}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="zfc-permanent-residency-benefits" aria-labelledby="permanent-residency-benefits-heading">
        <div className="zfc-permanent-residency-benefits__inner">
          <h2 id="permanent-residency-benefits-heading" className="zfc-permanent-residency-benefits__heading">
            Key Benefits of Permanent
            <span>Residency in Canada</span>
          </h2>

          <p className="zfc-permanent-residency-benefits__intro">
            There are many benefits that come with becoming a permanent resident of Canada. Becoming a permanent resident comes with many of the same privileges that citizens of Canada have while retaining your nationality at the same time.
          </p>

          <div className="zfc-permanent-residency-benefits__media">
            <Image
              src="/assets/permanent-residency-benefits.png"
              alt="Approved Canadian permanent residency application with Canadian flag"
              width={1144}
              height={613}
              sizes="(max-width: 1280px) calc(100vw - 40px), 1144px"
              className="zfc-permanent-residency-benefits__image"
            />
          </div>
        </div>
      </section>

      <section className="zfc-permanent-residency-benefit-list" aria-labelledby="permanent-residency-benefit-list-heading">
        <div className="zfc-permanent-residency-benefit-list__inner">
          <h2 id="permanent-residency-benefit-list-heading" className="zfc-permanent-residency-benefit-list__heading">
            What Is Permanent Residency in Canada?
          </h2>

          <ul className="zfc-permanent-residency-benefit-list__items">
            {permanentResidencyBenefitDetails.map((benefit) => (
              <li key={benefit.label} className="zfc-permanent-residency-benefit-list__item">
                <strong>{benefit.label}</strong>
                {" – "}
                {benefit.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="zfc-permanent-residency-eligibility" aria-labelledby="permanent-residency-eligibility-heading">
        <div className="zfc-permanent-residency-eligibility__inner">
          <h2 id="permanent-residency-eligibility-heading" className="zfc-permanent-residency-eligibility__heading">
            Eligibility Requirements for Permanent
            <span>Residency in Canada</span>
          </h2>

          <div className="zfc-permanent-residency-eligibility__media">
            <Image
              src="/assets/permanent-residency-eligibility.png"
              alt="Canadian ballot box with Canadian flags"
              width={1262}
              height={520}
              sizes="(max-width: 1280px) calc(100vw - 40px), 1108px"
              className="zfc-permanent-residency-eligibility__image"
            />
          </div>

          <div className="zfc-permanent-residency-eligibility__copy">
            <p>
              The eligibility criteria for obtaining permanent residency in Canada varies depending on which immigration program is used. Age, education, work experience, proficiency in the language, and adaptability may be some of the considerations made during the evaluation process. Other special requirements may be made in relation to employment, sponsorship by the applicant&apos;s family members, investments in business ventures, or humanitarian grounds.
            </p>

            <p>
              Applicants should expect to submit documentation of various types, go through medical testing, and get clearance from the police department. Proving funds for settlement and passing the language proficiency test may also be among the requirements. Among the popular immigration programs to become a Canadian citizen are Express Entry, PNPs, Family Sponsorship, and Humanitarian streams.
            </p>

            <p>
              As different immigrant programs have distinct eligibility criteria, an expert eligibility assessment is recommended to choose the best pathway.
            </p>
          </div>

          <Link href="/book-consultation" className="zfc-permanent-residency-eligibility__cta">
            <span>Book a Consultation Today</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="zfc-permanent-residency-basic" aria-labelledby="permanent-residency-basic-heading">
        <div className="zfc-permanent-residency-basic__inner">
          <h2 id="permanent-residency-basic-heading" className="zfc-permanent-residency-basic__heading">
            Basic Eligibility Requirements for
            <span>Permanent Residency</span>
          </h2>

          <div className="zfc-permanent-residency-basic__media">
            <Image
              src="/assets/permanent-residency-basic-eligibility.png"
              alt="Person holding a large Canadian flag against the sky"
              width={1262}
              height={643}
              sizes="(max-width: 1280px) calc(100vw - 40px), 1108px"
              className="zfc-permanent-residency-basic__image"
            />
          </div>

          <div className="zfc-permanent-residency-basic__content">
            <p className="zfc-permanent-residency-basic__intro">
              While eligibility criteria may differ from one immigration program to another, most of the immigration programs used to get permanent residency in Canada evaluate applications according to some crucial aspects. Satisfying the above-stated criteria could help you gain permanent residence.
            </p>

            <ul className="zfc-permanent-residency-basic__list">
              {permanentResidencyBasicRequirements.map((requirement) => (
                <li key={requirement.label} className="zfc-permanent-residency-basic__item">
                  <strong>{requirement.label}</strong>
                  {" – "}
                  {requirement.text}
                </li>
              ))}
            </ul>

            <p className="zfc-permanent-residency-basic__closing">
              A professional assessment can help determine which permanent residency pathway best matches your qualifications and immigration goals.
            </p>
          </div>
        </div>
      </section>

      <section className="zfc-permanent-residency-refusals" aria-labelledby="permanent-residency-refusals-heading">
        <div className="zfc-permanent-residency-refusals__inner">
          <h2 id="permanent-residency-refusals-heading" className="zfc-permanent-residency-refusals__heading">
            Common Reasons Permanent Residency
            <span>Applications Are Refused</span>
          </h2>

          <div className="zfc-permanent-residency-refusals__media">
            <Image
              src="/assets/permanent-residency-refusal-reasons.png"
              alt="People holding Canadian flags at an outdoor gathering"
              width={1168}
              height={520}
              sizes="(max-width: 1280px) calc(100vw - 40px), 980px"
              className="zfc-permanent-residency-refusals__image"
            />
          </div>

          <div className="zfc-permanent-residency-refusals__content">
            <p className="zfc-permanent-residency-refusals__intro">
              Permanent Residency applications may get rejected based on the following grounds, among others:
            </p>

            <ul className="zfc-permanent-residency-refusals__list">
              {permanentResidencyRefusalReasons.map((reason) => (
                <li key={reason} className="zfc-permanent-residency-refusals__item">
                  {reason}
                </li>
              ))}
            </ul>

            <p className="zfc-permanent-residency-refusals__closing">
              Ensuring your application is well prepared with the right information will go a long way towards avoiding a rejection.
            </p>
          </div>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="permanent-residency"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-permanent-residency-process" aria-label="How we help you apply for Permanent Residency in Canada">
        <div className="zfc-permanent-residency-process__top">
          <div className="zfc-permanent-residency-process__timeline" aria-label="Permanent residency application process">
            <Image
              src="/assets/permanent-residency-process-wave.png"
              alt="How we help you apply for Permanent Residency in Canada: Initial Consultation, Eligibility Assessment, Program Selection, Document Collection, Application Preparation, Application Submission, Application Monitoring, and Ongoing Support"
              width={1440}
              height={288}
              sizes="100vw"
              className="zfc-permanent-residency-process__wave"
            />
          </div>
        </div>

        <div className="zfc-permanent-residency-process__content">
          <h3 className="zfc-permanent-residency-process__cta-heading">
            Start Your Permanent Residency
            <span>Journey With ZF Canada</span>
          </h3>

          <p className="zfc-permanent-residency-process__body">
            Whether you are applying through Express Entry, a Provincial Nominee Program (PNP), family sponsorship, or another immigration pathway, ZF Canada is here to help you navigate the process with confidence. Our experienced team will assess your eligibility, prepare your application, and provide guidance throughout every stage of your permanent residency journey.
          </p>

          <p className="zfc-permanent-residency-process__contact">
            <a href="tel:+19058585589">contact us today at +1 (905) 858-5589</a>
          </p>

          <p className="zfc-permanent-residency-process__note">
            to discuss your options and take the next step toward building your future in Canada.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
