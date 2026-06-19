export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import MapSection from "@/components/home/MapSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Humanitarian & Compassionate – ZF Canada Immigration Consultants",
  description:
    "ZF Canada guides clients through Humanitarian & Compassionate applications, helping those with exceptional circumstances obtain permanent residence in Canada.",
};

const humanitarianKeyPoints = [
  {
    title: "Available to Individuals in Canada",
    text: "H&C applications are generally submitted by people who are already living in Canada.",
  },
  {
    title: "Based on Compassionate Circumstances",
    text: "Applications are assessed based on factors such as hardship, family ties, establishment in Canada, and other humanitarian considerations.",
  },
  {
    title: "Best Interests of Children",
    text: "IRCC may consider the impact a decision could have on any children affected by the application.",
  },
  {
    title: "Exemption from Certain Immigration Requirements",
    text: "Applicants can request special consideration when they do not qualify under traditional immigration pathways.",
  },
  {
    title: "Strong Supporting Evidence Is Required",
    text: "Documents and detailed explanations are essential to demonstrate why special consideration should be granted.",
  },
  {
    title: "Each Case Is Reviewed Individually",
    text: "There are no automatic approvals, and every application is assessed on its own merits.",
  },
  {
    title: "Approval Is Not Guaranteed",
    text: "Decisions are discretionary and depend on the strength of the application and supporting evidence.",
  },
];

const eligibleCases = [
  "You are currently living in Canada without valid immigration status, such as after a visa overstay.",
  "You have received a removal order but have compelling reasons to remain in Canada.",
  "Returning to your home country would cause significant personal, financial, medical, or family hardship.",
  "You have established strong ties to Canada through work, education, community involvement, or long-term residence.",
  "Your departure from Canada would have a serious impact on your spouse, partner, children, or other close family members.",
  "The best interests of a child would be negatively affected if you were required to leave Canada.",
];

const ineligibleCases = [
  "You currently have an active refugee claim being processed by Canadian immigration authorities.",
  "You received a negative refugee decision within the last 12 months, unless specific exceptions or extraordinary circumstances apply.",
  "You do not have sufficient evidence to demonstrate hardship or compassionate grounds.",
];

const commonCases = [
  {
    title: "Parents of Canadian-Born Children",
    text: "Individuals who have spent years raising children in Canada and whose removal could significantly affect their children's well-being and stability.",
  },
  {
    title: "Long-Term Residents Without Status",
    text: "People who have lived, worked, and contributed to Canadian communities for an extended period despite lacking valid immigration status.",
  },
  {
    title: "Caregivers for Family Members",
    text: "Individuals who provide essential care and support to relatives with serious medical conditions, disabilities, or special needs.",
  },
  {
    title: "Individuals Facing Significant Hardship",
    text: "People who may not qualify for refugee protection but would experience serious personal, financial, social, or humanitarian hardship if required to return to their home country.",
  },
  {
    title: "Victims of Abuse or Domestic Violence",
    text: "Individuals who cannot safely return to their country of origin due to domestic violence, abuse, or other vulnerable circumstances.",
  },
];

const strengtheningCircumstances = [
  "Parents raising Canadian-born children whose lives would be significantly affected by a parent's removal.",
  "Individuals who have lived, worked, and contributed to their communities in Canada for many years without legal status.",
  "People providing care and support to family members with serious medical conditions or special needs.",
  "Failed refugee claimants who may not qualify for refugee protection but would face significant hardship if required to return home.",
  "Victims of domestic violence, abuse, or vulnerable situations who cannot safely return to their country of origin.",
];

const strengtheningEvidence = [
  "Proof of employment, education, tax filings, housing arrangements, and community involvement.",
  "Letters from employers, schools, community leaders, or religious organizations.",
  "Medical and psychological reports that explain health concerns or special circumstances.",
  "Documentation showing the impact a decision may have on children and family members.",
  "Evidence demonstrating the hardship you may face if required to leave Canada.",
];

const humanitarianFaqQuestions = [
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

export default function HumanitarianCompassionatePage() {
  return (
    <div className="zfc-services-page zfc-humanitarian-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title="Humanitarian & Compassionate" image="/assets/services-banner.png" breadcrumb="Humanitarian & Compassionate" />
      </div>

      <main className="zfc-hc-intro" aria-labelledby="humanitarian-intro-heading">
        <div className="zfc-hc-intro__inner">
          <h2 id="humanitarian-intro-heading" className="zfc-hc-intro__heading">
            Expert Assistance for Humanitarian &amp;{" "}
            <span>Compassionate Applications in Canada</span>
          </h2>

          <h3 className="zfc-hc-intro__subheading">
            What Does Humanitarian &amp; Compassionate in Canada Mean for Applicants?
          </h3>

          <p className="zfc-hc-intro__body">
            The Humanitarian and Compassionate route in Canada lets some people apply for permanent residency if they have unique personal situations. Even if they don&apos;t fit standard program requirements, this lets them stay if they show exceptional circumstances.
          </p>

          <p className="zfc-hc-intro__body">
            Key points about Humanitarian &amp; Compassionate in Canada include:
          </p>

          <ul className="zfc-hc-intro__list">
            {humanitarianKeyPoints.map((point) => (
              <li key={point.title} className="zfc-hc-intro__item">
                <strong>{point.title}</strong> - {point.text}
              </li>
            ))}
          </ul>

          <p className="zfc-hc-intro__body zfc-hc-intro__body--closing">
            A well-prepared Humanitarian &amp; Compassionate application in Canada can help set out your circumstances clearly and improve your chances of a favourable outcome.
          </p>
        </div>
      </main>

      <section className="zfc-hc-feature-image" aria-label="Humanitarian and compassionate application support">
        <div className="zfc-hc-feature-image__inner">
          <Image
            src="/assets/humanitarian-compassionate-team-hd.webp"
            alt="Students reviewing a Humanitarian and Compassionate application with an advisor"
            width={2480}
            height={1246}
            className="zfc-hc-feature-image__photo"
            priority={false}
          />
        </div>
      </section>

      <section className="zfc-hc-eligibility" aria-labelledby="humanitarian-eligibility-heading">
        <div className="zfc-hc-eligibility__inner">
          <h2 id="humanitarian-eligibility-heading" className="zfc-hc-eligibility__heading">
            Who Is Eligible for Humanitarian Compassionate Cases in Canada?
          </h2>

          <p className="zfc-hc-eligibility__text">
            Canadian Humanitarian Compassionate Cases are a way for individuals with unique circumstances to apply for permanent residence when they do not qualify through standard immigration programs.
          </p>

          <p className="zfc-hc-eligibility__text">You may be eligible to apply if:</p>

          <ul className="zfc-hc-eligibility__list">
            {eligibleCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="zfc-hc-eligibility__text">
            However, you may not be eligible for Humanitarian Compassionate Cases in Canada if:
          </p>

          <ul className="zfc-hc-eligibility__list">
            {ineligibleCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="zfc-hc-eligibility__text zfc-hc-eligibility__text--closing">
            Each case is different and eligibility will be decided by your individual circumstances and evidence you provide with your application.
          </p>
        </div>
      </section>

      <section className="zfc-hc-common" aria-labelledby="humanitarian-common-heading">
        <div className="zfc-hc-common__inner">
          <h2 id="humanitarian-common-heading" className="zfc-hc-common__heading">
            Common Humanitarian Compassionate Cases in Canada
          </h2>

          <div className="zfc-hc-common__grid">
            <div className="zfc-hc-common__media">
              <Image
                src="/assets/humanitarian-common-cases-portrait.webp"
                alt="Applicants holding passports and a phone for immigration support"
                width={1020}
                height={1716}
                className="zfc-hc-common__image"
              />
            </div>

            <div className="zfc-hc-common__content">
              <p className="zfc-hc-common__text">
                Humanitarian Compassionate Cases in Canada are often used by individuals facing exceptional personal circumstances that make it difficult or unreasonable for them to leave the country. Some common situations include:
              </p>

              <ul className="zfc-hc-common__list">
                {commonCases.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong> - {item.text}
                  </li>
                ))}
              </ul>

              <p className="zfc-hc-common__text">
                Each case is different and eligibility will be decided by your individual circumstances and evidence you provide with your application. Each application is considered on its own merits, based on the applicant&apos;s circumstances, supporting evidence, family ties, settling in Canada and the level of hardship they may face if they are asked to leave Canada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="humanitarian-compassionate"
        heading={(
          <>
            ZF Immigration Solutions & Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-hc-strengthen" aria-labelledby="humanitarian-strengthen-heading">
        <div className="zfc-hc-strengthen__inner">
          <h2 id="humanitarian-strengthen-heading" className="zfc-hc-strengthen__heading">
            Circumstances That May Strengthen a Humanitarian &amp; Compassionate Application
          </h2>

          <div className="zfc-hc-strengthen__top">
            <div className="zfc-hc-strengthen__intro">
              <p className="zfc-hc-strengthen__text">
                When people find themselves in extraordinary circumstances that make it difficult to leave their country, they often turn to Humanitarian Compassionate Cases in Canada. Typical examples are:
              </p>

              <ul className="zfc-hc-strengthen__list">
                {strengtheningCircumstances.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="zfc-hc-strengthen__media">
              <Image
                src="/assets/humanitarian-strengthen-application.webp"
                alt="Applicant holding a passport and boarding pass for travel to Canada"
                width={760}
                height={960}
                className="zfc-hc-strengthen__image"
              />
            </div>
          </div>

          <div className="zfc-hc-strengthen__block">
            <h3 className="zfc-hc-strengthen__subheading">How to Strengthen Your Application</h3>
            <p className="zfc-hc-strengthen__text">
              A strong application can improve your chances of success. Supporting evidence may include:
            </p>
            <ul className="zfc-hc-strengthen__list">
              {strengtheningEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="zfc-hc-strengthen__text">
              And a detailed personal statement is a must too. It should clearly state your situation, your ties to Canada and why you should be considered on compassionate grounds.
            </p>
          </div>

          <div className="zfc-hc-strengthen__block">
            <h3 className="zfc-hc-strengthen__subheading">Processing Times and Legal Support</h3>
            <p className="zfc-hc-strengthen__text">
              Applying for Humanitarian and Compassionate (H&amp;C) cases in Canada takes several months, and each one is judged based on its own strengths. If accepted, you could get permanent residency.
            </p>
            <p className="zfc-hc-strengthen__text">
              At ZF Canada Immigration, we aid clients in assembling robust H&amp;C applications. We gather support, highlight hardships, and polish how your situation is presented. Our team strives to boost your odds of success.
            </p>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="humanitarian-journey-form"
        className="zfc-contact--journey zfc-contact--humanitarian"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="humanitarian-journey"
      />
      <FAQSection questions={humanitarianFaqQuestions} />

      <Footer />
    </div>
  );
}
