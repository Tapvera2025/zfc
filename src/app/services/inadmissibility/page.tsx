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

export const metadata: Metadata = {
  title: "Inadmissibility – ZF Canada Immigration Consultants",
  description:
    "ZF Canada helps clients overcome inadmissibility to Canada caused by criminality, health issues, or misrepresentation. Expert RCIC-IRB guidance for complex cases.",
};


const introParagraphs = [
  "Being found inadmissible to Canada means you might not get a visa, enter the country, or gain temporary or permanent resident status. Under Canadian law, folks can be turned away for lots of reasons - criminal history, health problems, lying on forms, money troubles, or past rule breaking.",
  "This finding can happen when you apply for a visa, perm residenceness, get checked at the border, or try to come into the country. It's a stressful situation that blocks your immigration hopes.",
  "At ZF Canada, we offer pro inadmissibility consultations to help people figure out why they got denied and how to fix it. Our expert team looks over your situation, sees what legal choices you've got, and comes up with a plan just for you.",
  "So whether you've been rejected already or think you might run into trouble, our consultation service can help you handle things with confidence. Get in touch with ZF Canada for reliable advice and personal support on your immigration journey.",
];

const admissibilityServices = [
  {
    title: "Procedural Fairness Letters",
    text: "Assistance in responding to concerns raised by Canadian immigration authorities before a decision is made on your application.",
  },
  {
    title: "Medical Inadmissibility",
    text: "Guidance for applicants facing refusal due to health-related concerns or excessive demand findings.",
  },
  {
    title: "Foreign Criminal Charges or Convictions (Denied Entry Into Canada)",
    text: "Support for individuals who have been refused entry due to criminal records outside Canada.",
  },
  {
    title: "In Canada Charges or Convictions",
    text: "Professional advice for temporary residents, international students, workers, and permanent residents facing criminal charges within Canada.",
  },
  {
    title: "Authorizations to Return to Canada (ARC)",
    text: "Assistance with ARC applications for individuals who require permission to return to Canada after a deportation order.",
  },
];

const inadmissibilityReasons = [
  {
    title: "Criminal Convictions",
    text: "DUI, assault, theft, fraud, or drug-related offences.",
  },
  {
    title: "Misrepresentation",
    text: "Providing false, misleading, or incomplete information on an immigration application.",
  },
  {
    title: "Medical Inadmissibility",
    text: "Health conditions that may place excessive demand on Canada's healthcare system.",
  },
  {
    title: "Security Concerns",
    text: "Involvement in espionage, terrorism, organized crime, or war crimes.",
  },
  {
    title: "Financial Insufficiency",
    text: "Inability to demonstrate adequate funds to support your stay in Canada.",
  },
  {
    title: "Immigration Violations",
    text: "Overstaying a visa, unauthorized work, or failure to comply with immigration conditions.",
  },
];

const inadmissibilityFaqQuestions = [
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

export default function InadmissibilityPage() {
  const title = "Inadmissibility";

  return (
    <div className="zfc-services-page zfc-inadmissibility-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-inadmissibility-intro" aria-labelledby="inadmissibility-intro-heading">
        <div className="zfc-inadmissibility-intro__inner">
          <h2 id="inadmissibility-intro-heading" className="zfc-inadmissibility-intro__heading">
            Get Reliable Inadmissibility
            <span>Consultation in Canada</span>
          </h2>

          <div className="zfc-inadmissibility-intro__copy">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="zfc-inadmissibility-intro__body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="zfc-inadmissibility-intro__image-wrap">
            <Image
              src="/assets/inadmissibility-consultation-hd.webp"
              alt="Couple holding travel documents for inadmissibility consultation in Canada"
              width={2040}
              height={1472}
              sizes="(max-width: 900px) calc(100vw - 40px), 82vw"
              className="zfc-inadmissibility-intro__image"
              priority={false}
            />
          </div>
        </div>
      </main>

      <section className="zfc-inadmissibility-admissibility" aria-labelledby="inadmissibility-admissibility-heading">
        <div className="zfc-inadmissibility-admissibility__inner">
          <h2 id="inadmissibility-admissibility-heading" className="zfc-inadmissibility-admissibility__heading">
            Trusted Immigration
            <span>Admissibility Services in Canada</span>
          </h2>

          <div className="zfc-inadmissibility-admissibility__grid">
            <div className="zfc-inadmissibility-admissibility__content">
              <p className="zfc-inadmissibility-admissibility__text">
                ZF Canada offers professional Inadmissibility Consultations for folks facing Canadian immigration hurdles due to things like criminal records or old removal orders. They help people spot possible issues and find ways to beat those barriers too.
              </p>

              <p className="zfc-inadmissibility-admissibility__text zfc-inadmissibility-admissibility__text--label">
                Our services include:
              </p>

              <ul className="zfc-inadmissibility-admissibility__list">
                {admissibilityServices.map((service) => (
                  <li key={service.title}>
                    <strong>{service.title}</strong> - {service.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="zfc-inadmissibility-admissibility__media">
              <Image
                src="/assets/about-care-team.webp"
                alt="Immigration consultants reviewing admissibility cases in an office"
                width={501}
                height={540}
                sizes="(max-width: 900px) calc(100vw - 40px), 38vw"
                className="zfc-inadmissibility-admissibility__image"
              />
            </div>
          </div>

          <p className="zfc-inadmissibility-admissibility__closing">
            Our experienced team will thoroughly review your case and create a strategy specifically designed to help you achieve your immigration goals with confidence.
          </p>

          <Link href="/free-assessment" className="zfc-inadmissibility-admissibility__cta">
            <span>Get Expert Immigration Advice</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="inadmissibility"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-inadmissibility-reasons" aria-labelledby="inadmissibility-reasons-heading">
        <div className="zfc-inadmissibility-reasons__inner">
          <h2 id="inadmissibility-reasons-heading" className="zfc-inadmissibility-reasons__heading">
            Why Someone May Become
            <span>Inadmissible to Canada</span>
          </h2>

          <div className="zfc-inadmissibility-reasons__grid">
            <div className="zfc-inadmissibility-reasons__content">
              <p className="zfc-inadmissibility-reasons__text">
                Individuals may be found inadmissible to Canada for various reasons, including:
              </p>

              <ul className="zfc-inadmissibility-reasons__list">
                {inadmissibilityReasons.map((reason) => (
                  <li key={reason.title}>
                    <strong>{reason.title}</strong> - {reason.text}
                  </li>
                ))}
              </ul>

              <p className="zfc-inadmissibility-reasons__text zfc-inadmissibility-reasons__text--closing">
                Each case is unique and may require a different approach to overcome inadmissibility concerns.
              </p>
            </div>

            <div className="zfc-inadmissibility-reasons__media">
              <Image
                src="/assets/inadmissibility-passport-consultation.webp"
                alt="Canadian passport held in front of a Canadian flag"
                width={928}
                height={1360}
                sizes="(max-width: 900px) calc(100vw - 40px), 34vw"
                className="zfc-inadmissibility-reasons__image"
              />
            </div>
          </div>

          <div className="zfc-inadmissibility-reasons__cta-block">
            <h2 className="zfc-inadmissibility-reasons__cta-heading">
              Need Professional Inadmissibility
              <span>Consultation in Canada?</span>
            </h2>

            <p className="zfc-inadmissibility-reasons__cta-text">
              If you have been found inadmissible to Canada or are concerned about issues that could affect your immigration application, ZF Canada is here to help. Our experienced team will assess your situation, explain your options, and develop a personalized strategy to help you move forward with confidence.
            </p>

            <Link href="/free-assessment" className="zfc-inadmissibility-reasons__cta">
              <span>Get Expert Immigration Advice</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="inadmissibility-journey-form"
        className="zfc-contact--journey zfc-contact--inadmissibility"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="inadmissibility-journey"
      />
      <FAQSection questions={inadmissibilityFaqQuestions} />

      <Footer />
    </div>
  );
}
