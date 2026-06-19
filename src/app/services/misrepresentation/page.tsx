export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import MapSection from "@/components/home/MapSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { getPageContent } from "@/lib/page-content-store";

export const metadata: Metadata = {
  title: "Misrepresentation – ZF Canada Immigration Consultants",
  description:
    "Facing a misrepresentation finding in Canada? ZF Canada's RCIC-IRB consultants can help you understand your options, respond to allegations, and rebuild your case.",
};

type SvcContent = { hero: { title: string } };

const misrepresentationExamples = [
  "Failing to disclose a previous visa refusal from Canada or another country",
  "Submitting documents that are false, altered, or non-genuine",
  "Omitting information about a spouse, child, or other family member",
  "Claiming work experience, qualifications, or education that cannot be verified",
  "Obtaining immigration status through a marriage or relationship that is not genuine",
  "Providing incomplete or inaccurate information in immigration forms or supporting documents",
];

const accusedParagraphs = [
  "When IRCC feels that some information contained in your application might not be accurate, complete, or even misleading, you will be given an opportunity to respond prior to the issuance of a decision. The name of this procedure is procedural fairness, and it usually means receipt of a Procedural Fairness Letter (PFL). You should study the letter carefully and respond in time according to the requirement - either in writing or during an interview.",
  "A conclusion on Misrepresentation in Canada entails certain penalties. Once IRCC finds out that there was misrepresentation, both you and your family members who accompany you are likely to become inadmissible to Canada. As a result, your applications for temporary/permanent residency will be refused, and in addition, you could be banned from submitting other immigration applications for the next five years.",
  "In case you receive a Procedural Fairness Letter, getting expert advice at an early stage can play a big role. An adequately prepared response with supporting documentation may serve the purpose of clearing up any misunderstanding. At ZF Canada, we work with people to prepare comprehensive responses and develop sound strategies for preserving their immigration rights.",
];

const challengeOptions = [
  {
    title: "Reconsideration Requests",
    text: "There might be instances where it is possible for one to request the IRCC to reconsider their decision. It will be most appropriate to do this in cases where the information provided is new, crucial information has been left out, or if there has been any mistake in the evaluation of the application.",
  },
  {
    title: "Federal Court Judicial Review",
    text: "In the event that you think the decision was unreasonable and was done in an improper way, there is a chance that you could be entitled to seek a Judicial Review from the Federal Court of Canada. The court does not redo the process but determines if the decision was made in an appropriate manner according to the law.",
  },
  {
    title: "Appeals (Where Applicable)",
    text: "In some cases, appeals may be available based on certain aspects of immigration applications depending on the nature of such applications and the personal situation of the applicant. Appeals enable one to submit more information in order to overturn a decision made.",
  },
  {
    title: "Humanitarian and Compassionate Considerations",
    text: "In certain situations, applicants may ask for consideration based on humanitarian and compassionate reasons. These include family ties in Canada, best interests of the child, establishment in Canada, and possible hardship that could arise from not being allowed to enter the country.",
  },
  {
    title: "Legal Submissions to IRCC",
    text: "Legal submissions in great detail can be made to counter any issues that the immigration officer may have regarding possible misrepresentation of the case at hand. Good evidence and legal grounds for the case can assist a lot in protecting the immigrant’s status in Canada.",
  },
];

const misrepresentationFaqQuestions = [
  "How Do I Start My Canada Immigration Process?",
  "Benefits of Choosing ZF Canada?",
  "Can You Help With Misrepresentation Allegations?",
  "Do You Assist Clients Outside Canada?",
  "How Long Does the Immigration Process Take?",
  "Do You Provide Personalized Immigration Solutions?",
  "Can I Apply for Permanent Residency in Canada?",
  "How Can I Book a Consultation With ZF Canada?",
  "Is My Information Kept Confidential?",
];

export default async function MisrepresentationPage() {
  const raw = await getPageContent("svc-misrepresentation") as SvcContent;
  const title = raw?.hero?.title ?? "Misrepresentation";

  return (
    <div className="zfc-services-page zfc-misrepresentation-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-misrepresentation-intro" aria-labelledby="misrepresentation-intro-heading">
        <div className="zfc-misrepresentation-intro__inner">
          <h2 id="misrepresentation-intro-heading" className="zfc-misrepresentation-intro__heading">
            Professional Assistance for
            <span>Misrepresentation in Canada Cases</span>
          </h2>

          <h3 className="zfc-misrepresentation-intro__subheading">
            What Is Misrepresentation in Canada?
          </h3>

          <div className="zfc-misrepresentation-intro__grid">
            <div className="zfc-misrepresentation-intro__content">
              <p className="zfc-misrepresentation-intro__text">
                Misrepresentation in Canada arises where the relevant immigration authorities, namely IRCC or CBSA, receive wrong, misleading, inaccurate, or insufficient information about an applicant during the immigration application or process. The misrepresentation could be made in good faith or bad faith, but there may be negative consequences on one&apos;s immigration status.
              </p>

              <p className="zfc-misrepresentation-intro__text zfc-misrepresentation-intro__text--label">
                Common examples of misrepresentation include:
              </p>

              <ul className="zfc-misrepresentation-intro__list">
                {misrepresentationExamples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>

            <div className="zfc-misrepresentation-intro__media">
              <Image
                src="/assets/inadmissibility-consultation-hd.webp"
                alt="Applicants holding passports while discussing a Canadian immigration case"
                fill
                sizes="(max-width: 900px) calc(100vw - 40px), 34vw"
                className="zfc-misrepresentation-intro__image"
                priority={false}
              />
            </div>
          </div>

          <p className="zfc-misrepresentation-intro__closing">
            Misinformation can be supplied by the applicant, by a family member, or perhaps by the authorized representative. In Canada, however, in terms of immigration legislation, it is necessary to mention that the primary responsibility for all provided information rests with the applicant. Any inaccurate or incomplete information supplied must be verified and corrected as early as possible.
          </p>

          <Link href="/book-consultation" className="zfc-misrepresentation-intro__cta">
            <span>Book a Misrepresentation Consultation</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </main>

      <section className="zfc-misrepresentation-accused" aria-labelledby="misrepresentation-accused-heading">
        <div className="zfc-misrepresentation-accused__inner">
          <h2 id="misrepresentation-accused-heading" className="zfc-misrepresentation-accused__heading">
            What Can You Do If You Are Accused of
            <span>Misrepresentation in Canada?</span>
          </h2>

          <div className="zfc-misrepresentation-accused__grid">
            <div className="zfc-misrepresentation-accused__media">
              <Image
                src="/assets/about-care-team.webp"
                alt="Immigration consultants discussing a case in an office"
                fill
                sizes="(max-width: 900px) calc(100vw - 40px), 42vw"
                className="zfc-misrepresentation-accused__image"
              />
            </div>

            <div className="zfc-misrepresentation-accused__content">
              {accusedParagraphs.map((paragraph) => (
                <p key={paragraph} className="zfc-misrepresentation-accused__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="zfc-misrepresentation-challenge" aria-labelledby="misrepresentation-challenge-heading">
        <div className="zfc-misrepresentation-challenge__inner">
          <h2 id="misrepresentation-challenge-heading" className="zfc-misrepresentation-challenge__heading">
            Can a Misrepresentation Decision in
            <span>Canada Be Challenged?</span>
          </h2>

          <p className="zfc-misrepresentation-challenge__intro">
            Misrepresentation is not necessarily a last resort in the event of its determination within Canada. In light of the unique circumstances of your situation, you may find yourself able to explore other legal avenues and immigration opportunities.
          </p>

          <div className="zfc-misrepresentation-challenge__items">
            {challengeOptions.map((option) => (
              <section key={option.title} className="zfc-misrepresentation-challenge__item">
                <h3 className="zfc-misrepresentation-challenge__subheading">{option.title}</h3>
                <p className="zfc-misrepresentation-challenge__text">{option.text}</p>
              </section>
            ))}
          </div>

          <Link href="/book-consultation" className="zfc-misrepresentation-challenge__cta">
            <span>Book an Appointment</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="misrepresentation"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-misrepresentation-trust" aria-labelledby="misrepresentation-trust-heading">
        <div className="zfc-misrepresentation-trust__inner">
          <div className="zfc-misrepresentation-trust__block">
            <h2 id="misrepresentation-trust-heading" className="zfc-misrepresentation-trust__heading">
              Why ZF Canada Is a Trusted Choice
              <span>for Complex Immigration Matters?</span>
            </h2>
            <p className="zfc-misrepresentation-trust__text">
              We at ZF Canada know for certain that immigration cases can be very complex in nature, thus demanding much attention, precision, and a proper course of action. We give careful consideration to each and every case, determining possible difficulties and finding ways to tackle them with efficiency and ease. Be it a matter of misrepresentation, inadmissibility, visa denial, or some other kind of immigration difficulty, rest assured that you will receive expert guidance along the way.
            </p>
          </div>

          <div className="zfc-misrepresentation-trust__block zfc-misrepresentation-trust__block--cta">
            <h2 className="zfc-misrepresentation-trust__heading">
              Facing a Misrepresentation Allegation?
              <span>Speak With Our Team Today</span>
            </h2>
            <p className="zfc-misrepresentation-trust__text">
              Facing a misrepresentation allegation can put your immigration future at risk, but timely action can make a significant difference. Whether you have received a Procedural Fairness Letter, a visa refusal, or concerns about information submitted in your application, ZF Canada is here to help. To discuss your situation and understand your available options, contact our team today at +1 (905) 858-5589 and schedule a confidential consultation.
            </p>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="misrepresentation-journey-form"
        className="zfc-contact--journey zfc-contact--misrepresentation"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="misrepresentation-journey"
      />
      <FAQSection questions={misrepresentationFaqQuestions} />

      <Footer />
    </div>
  );
}
