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
  title: "Refugee Claim Application – ZF Canada Immigration Consultants",
  description:
    "ZF Canada provides expert assistance with refugee claim applications in Canada. Our RCIC-IRB consultants help you navigate the refugee determination process with confidence.",
};

type SvcContent = { hero: { title: string } };

const refugeeClaimSteps = [
  {
    title: "Step 1: Determine Your Eligibility",
    description:
      "Before a refugee claim can move forward, Canadian authorities assess whether you are eligible to make a claim. Factors such as your immigration history, previous claims, and country of origin may affect eligibility.",
  },
  {
    title: "Step 2: Submit Your Refugee Claim",
    description:
      "You can make a refugee claim either after arriving in Canada or at a Canadian port of entry. The information you provide at this stage is important and should be accurate and complete.",
  },
  {
    title: "Step 3: Complete the Basis of Claim (BOC) Form",
    description:
      "The Basis of Claim form explains why you are seeking protection in Canada. It outlines your personal circumstances, fears, and the reasons you cannot safely return to your home country.",
  },
  {
    title: "Step 4: Gather Supporting Evidence",
    description:
      "Supporting documents play a vital role in strengthening your claim. Evidence may include identity documents, medical records, police reports, witness statements, and country-condition information.",
  },
  {
    title: "Step 5: Prepare for the Refugee Hearing",
    description:
      "Proper preparation helps you present your case clearly and consistently. Reviewing your documents and understanding the hearing process can improve your confidence and readiness.",
  },
  {
    title: "Step 6: Attend the IRB Hearing",
    description:
      "An Immigration and Refugee Board member will review your evidence and ask questions about your claim. The hearing provides an opportunity to explain your circumstances and present your case.",
  },
  {
    title: "Step 7: Receive a Decision",
    description:
      "After considering all evidence and testimony, the IRB will make a decision on your refugee claim. If approved, you may be eligible to remain in Canada and pursue permanent residence.",
  },
];

const refugeeClaimFaqQuestions = [
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

export default async function RefugeeClaimPage() {
  const raw = await getPageContent("svc-refugee-claim") as SvcContent;
  const title = raw?.hero?.title ?? "Refugee Claim Application";

  return (
    <div className="zfc-services-page zfc-refugee-claim-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <section className="zfc-refugee-claim-intro" aria-labelledby="refugee-claim-intro-heading">
        <div className="zfc-refugee-claim-intro__inner">
          <h2 id="refugee-claim-intro-heading" className="zfc-refugee-claim-intro__heading">
            Refugee Claim Applications and
            <span>Process in Canada</span>
          </h2>

          <div className="zfc-refugee-claim-intro__layout">
            <div className="zfc-refugee-claim-intro__content">
              <h3 className="zfc-refugee-claim-intro__subheading">
                What Is a Refugee Claim in Canada?
              </h3>
              <p className="zfc-refugee-claim-intro__text">
                A refugee claim is a claim filed by an individual who feels they would be persecuted, tortured, and harmed if they were to go back to their own country. There are people who receive protection from Canada on the condition that they meet all the criteria laid out in the Canadian immigration law as being a Convention refugee or a person in need of protection. The refugee claim is evaluated by the Immigration and Refugee Board of Canada.
              </p>
            </div>

            <div className="zfc-refugee-claim-intro__media">
              <Image
                src="/assets/refugee-claim-intro.png"
                alt="Immigration professionals reviewing a refugee claim application"
                width={496}
                height={310}
                sizes="(max-width: 900px) calc(100vw - 40px), 496px"
                className="zfc-refugee-claim-intro__image"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="zfc-refugee-claim-eligibility" aria-labelledby="refugee-claim-eligibility-heading">
        <div className="zfc-refugee-claim-eligibility__inner">
          <h2 id="refugee-claim-eligibility-heading" className="zfc-refugee-claim-eligibility__heading">
            Who Can Apply for Refugee
            <span>Protection in Canada?</span>
          </h2>

          <div className="zfc-refugee-claim-eligibility__layout">
            <div className="zfc-refugee-claim-eligibility__media">
              <Image
                src="/assets/refugee-claim-eligibility.png"
                alt="Person holding a passport beside a Canadian flag"
                width={486}
                height={285}
                sizes="(max-width: 900px) calc(100vw - 40px), 486px"
                className="zfc-refugee-claim-eligibility__image"
              />
            </div>

            <p className="zfc-refugee-claim-eligibility__text">
              People who are in Canada and have concerns about going back to their country of origin due to reasons such as persecution, war, torture, threat to one’s life or violence should apply for refugee protection. Such people could be at risk due to reasons relating to their religion, race, nationality, or political opinions or being part of certain social groups. Every case will be considered separately through the Immigration and Refugee Board of Canada (IRB)
            </p>
          </div>
        </div>
      </section>

      <section className="zfc-refugee-claim-process" aria-labelledby="refugee-claim-process-heading">
        <div className="zfc-refugee-claim-process__inner">
          <h2 id="refugee-claim-process-heading" className="zfc-refugee-claim-process__heading">
            Step-by-Step Refugee Claim Process in Canada
          </h2>

          <ol className="zfc-refugee-claim-process__steps">
            {refugeeClaimSteps.map((step) => (
              <li key={step.title} className="zfc-refugee-claim-process__step">
                <h3 className="zfc-refugee-claim-process__step-title">{step.title}</h3>
                <p className="zfc-refugee-claim-process__step-description">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="zfc-refugee-claim-process__cta-wrap">
            <Link href="/book-consultation" className="zfc-refugee-claim-process__cta">
              <span>Get Professional Refugee Claim Support</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="refugee-claim"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-refugee-claim-refusals" aria-labelledby="refugee-claim-refusals-heading">
        <div className="zfc-refugee-claim-refusals__inner">
          <h2 id="refugee-claim-refusals-heading" className="zfc-refugee-claim-refusals__heading">
            Common Reasons Refugee Claims Are Refused
          </h2>

          <div className="zfc-refugee-claim-refusals__layout">
            <ul className="zfc-refugee-claim-refusals__list">
              <li>Insufficient evidence</li>
              <li>Credibility concerns</li>
              <li>Inconsistent information</li>
              <li>Eligibility issues</li>
              <li>Failure to meet refugee protection requirements</li>
            </ul>

            <div className="zfc-refugee-claim-refusals__media">
              <Image
                src="/assets/refugee-claim-refusals.png"
                alt="People waiting for refugee claim decisions in front of the Toronto skyline"
                width={682}
                height={360}
                sizes="(max-width: 900px) calc(100vw - 40px), 714px"
                className="zfc-refugee-claim-refusals__image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="zfc-refugee-claim-strengthen" aria-labelledby="refugee-claim-strengthen-heading">
        <div className="zfc-refugee-claim-strengthen__inner">
          <h2 id="refugee-claim-strengthen-heading" className="zfc-refugee-claim-strengthen__heading">
            How to Strengthen Your Refugee Claim
          </h2>

          <div className="zfc-refugee-claim-strengthen__layout">
            <div className="zfc-refugee-claim-strengthen__copy">
              <p>
                Proper preparation of the case can be quite effective when you are going to make your case in front of the board. You must try to submit all necessary information, which is relevant and credible for your case. Make sure that all forms, statements, evidence and other materials are consistent. It will not be good if your documents are incomplete because they may take time. Applicants should prepare properly for their case by going through their cases and preparing themselves for questioning.
              </p>
              <p>
                They should also try to ensure that their answers are consistent with the information they have submitted so far in order to enhance credibility of the case. Professional advice on such cases can also be helpful in many ways.
              </p>
            </div>

            <div className="zfc-refugee-claim-strengthen__media">
              <Image
                src="/assets/refugee-claim-strengthen.png"
                alt="Family standing in front of a Canadian flag"
                width={574}
                height={449}
                sizes="(max-width: 900px) calc(100vw - 40px), 602px"
                className="zfc-refugee-claim-strengthen__image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="zfc-refugee-claim-start" aria-labelledby="refugee-claim-start-heading">
        <div className="zfc-refugee-claim-start__inner">
          <h2 id="refugee-claim-start-heading" className="zfc-refugee-claim-start__heading">
            Start Your Refugee Claim Process
            <span>in Canada Today</span>
          </h2>

          <p className="zfc-refugee-claim-start__text">
            Seeking protection in Canada can be a life-changing decision, and having the right support can make all the difference. Whether you are preparing a new refugee claim, gathering supporting evidence, or getting ready for an IRB hearing, ZF Canada is here to guide you every step of the way. Our team can assess your situation, explain your options, and help you navigate the refugee claim process with confidence.
          </p>

          <a href="tel:+19058585589" className="zfc-refugee-claim-start__call">
            Call +1 (905) 858-5589 today
          </a>
          <p className="zfc-refugee-claim-start__closing">
            to schedule a confidential consultation and discuss your case.
          </p>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="refugee-claim-journey-form"
        className="zfc-contact--journey zfc-contact--refugee-claim"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="refugee-claim-journey"
      />
      <FAQSection questions={refugeeClaimFaqQuestions} />

      <Footer />
    </div>
  );
}
