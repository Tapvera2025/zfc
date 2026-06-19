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

export const metadata: Metadata = {
  title: "Refused Applications – ZF Canada Immigration Consultants",
  description:
    "ZF Canada helps clients reapply and appeal refused immigration applications. Expert guidance from a Regulated Canadian Immigration Consultant (RCIC-IRB).",
};

const refusedApplicationCopy = [
  "Refused applications in Canada can be super stressful and let's face it, pretty disappointing too. It’s a bummer after you put in all that time, energy, and money into your immigration process. But here's the thing, getting refused doesn't automatically slam the door on you.",
  "There are times when those decisions can be challenged. For instance, if mistakes were made, or if the process wasn't fair, or if the info just didn’t quite add up right. The first thing you should do is find out why your application was refused. That can point you towards what you need to do next.",
  "That's where places like ZF Canada Immigration come in. They look closely at refused applications, figure out what went wrong, and help people think about their choices. These choices could be resubmitting an application, asking for another look, going through an appeal, or even a judicial review. They want to help you get clear on your rights and give you a shot at getting a different result.",
  "So, if you hear back that your application was refused, reach out to the ZF Canada Immigration team for some solid guidance.",
];

const refusalReasons = [
  {
    title: "Insufficient Proof of Funds",
    text: "Not providing enough evidence that you can financially support yourself during your stay in Canada.",
  },
  {
    title: "Weak Ties to Your Home Country",
    text: "Lack of employment, family, property, or other commitments that demonstrate your intention to return home.",
  },
  {
    title: "Unclear Purpose of Travel",
    text: "Failure to clearly explain the reason for your visit, study, work, or immigration plans.",
  },
  {
    title: "Incomplete or Incorrect Documentation",
    text: "Missing, inaccurate, or inadequate supporting documents.",
  },
  {
    title: "Previous Immigration Violations",
    text: "A history of visa overstays, deportation, or non-compliance with immigration rules.",
  },
  {
    title: "Health or Criminal Inadmissibility",
    text: "Medical or criminal issues that may affect eligibility.",
  },
  {
    title: "Misrepresentation",
    text: "Providing false, misleading, or incorrect information in your application.",
  },
];

const approachParagraphs = [
  "Rejection from IRCC can really let you down, but that doesn't necessarily close the door on your immigration dreams. At ZF Canada Immigration, we offer expert guidance to help folks navigate through application refusals and find the best way ahead.",
  "First off, our process starts with diving into the refusal letter and the application itself. We figure out why it got rejected – it could be about funds, past travels, job status, family connections, papers submitted, or admissibility problems.",
  "With that info, we tailor a plan just for you. This might mean resubmitting your application, asking for a second look, filling in gaps, or exploring appeal or judicial review possibilities when those are available.",
  "Our team is there every step of the way, working hard to fortify your application. That includes fixing errors, making sure everything's complete and accurate, and presenting it clearly.",
  "At ZF Canada Immigration, we know how vital this is to you. No matter if it's a visitor visa, study permit, work permit, or application for permanent residence that got denied, we're dedicated to guiding you forward confidently, with strategies for achieving success.",
];

const refusedFaqQuestions = [
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

export default function RefusedApplicationsPage() {
  return (
    <div className="zfc-services-page zfc-refused-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title="Refused Applications" image="/assets/services-banner.png" breadcrumb="Refused Applications" />
      </div>

      <main className="zfc-refused-main" aria-labelledby="refused-applications-heading">
        <div className="zfc-refused-main__inner">
          <h2 id="refused-applications-heading" className="zfc-refused-main__heading">
            Professional Support for
            <span>Refused Applications in Canada</span>
          </h2>

          <h3 className="zfc-refused-main__subheading">
            Canadian Immigration Application Refusal: What to do Next?
          </h3>

          <div className="zfc-refused-main__copy">
            {refusedApplicationCopy.map((paragraph) => (
              <p key={paragraph} className="zfc-refused-main__body">
                {paragraph}
              </p>
            ))}
          </div>

          <Link href="/free-assessment" className="zfc-refused-main__cta">
            <span>Re Apply Today</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>

          <div className="zfc-refused-main__image-wrap">
            <Image
              src="/assets/refused-applications-passports-hd.webp"
              alt="Hands passing passports and immigration documents across a desk"
              fill
              sizes="(max-width: 900px) calc(100vw - 40px), 86vw"
              className="zfc-refused-main__image"
            />
          </div>

          <section className="zfc-refused-reasons" aria-labelledby="refused-reasons-heading">
            <h2 id="refused-reasons-heading" className="zfc-refused-reasons__heading">
              Common Reasons Why Canadian Visa Applications Get Refused
            </h2>

            <p className="zfc-refused-reasons__body">
              Refused Applications in Canada can be frustrating and stressful, especially when your plans to visit, study, work, or settle in Canada are affected by an unexpected decision. It is important to know the reason for the refusal as this will help you decide the best way forward and increase your chances of success in the future.
            </p>

            <p className="zfc-refused-reasons__body">
              Some of the major reasons for visa and immigration refusals include:
            </p>

            <ul className="zfc-refused-reasons__list">
              {refusalReasons.map((reason) => (
                <li key={reason.title} className="zfc-refused-reasons__item">
                  <strong>{reason.title}</strong> – {reason.text}
                </li>
              ))}
            </ul>

            <p className="zfc-refused-reasons__body zfc-refused-reasons__body--closing">
              If you have received a refusal, professional guidance can help you understand the decision and explore options such as reapplying, requesting reconsideration, or pursuing an appeal where applicable.
            </p>
          </section>
        </div>
      </main>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="refused-applications"
        heading={(
          <>
            ZF Immigration Solutions & Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-refused-approach" aria-labelledby="refused-approach-heading">
        <div className="zfc-refused-approach__inner">
          <h2 id="refused-approach-heading" className="zfc-refused-approach__heading">
            Our Approach to Resolving
            <span>Refused Applications in Canada</span>
          </h2>

          <div className="zfc-refused-approach__layout">
            <div className="zfc-refused-approach__image-frame">
              <Image
                src="/assets/refused-approach-canada-flag.webp"
                alt="Canadian flag held by people outdoors in winter"
                width={469}
                height={728}
                sizes="(max-width: 900px) 100vw, 42vw"
                className="zfc-refused-approach__image"
              />
            </div>

            <div className="zfc-refused-approach__copy">
              {approachParagraphs.map((paragraph) => (
                <p key={paragraph} className="zfc-refused-approach__body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="refused-journey-form"
        className="zfc-contact--journey zfc-contact--refused"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="refused-journey"
      />

      <FAQSection questions={refusedFaqQuestions} />

      <Footer />
    </div>
  );
}
