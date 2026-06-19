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
  title: "Sponsorship – ZF Canada Immigration Consultants",
  description:
    "ZF Canada assists Canadian citizens and permanent residents in sponsoring their family members for permanent residence. Expert sponsorship guidance from RCIC-IRB consultants.",
};

type SvcContent = { hero: { title: string } };

const sponsorshipIntroParagraphs = [
  "The Canadian sponsorship program is aimed at helping families reunite and allowing the citizens and permanent residents of Canada to sponsor certain family members to become permanent residents of Canada through family sponsorship. As such, you can use your family sponsorship privileges to invite your spouse or common-law partner, your children, and even your parents and grandparents to join you in Canada.",
  "In the case of sponsorship of a family member, one is required to financially guarantee the sponsored person for a period and assure the relevant authorities that they will not require social assistance in Canada. There are certain conditions to qualify as an eligible sponsor and the relevant family documentation must be provided.",
  "The family sponsorship program is created to bring together loved ones and grant the latter the chance to live permanently in Canada. Immigrating to Canada may be difficult but with proper preparations and correct documentation it becomes easy.",
];

const sponsorshipQualifiesBullets = [
  {
    lead: "Spouses",
    text: "and legally married partners",
  },
  {
    lead: "Common-law partners",
    text: "who have lived together in a marriage-like relationship",
  },
  {
    lead: "Conjugal partners",
    text: "in exceptional circumstances",
  },
  {
    lead: "Dependent children,",
    text: "including adopted children who meet eligibility requirements",
  },
  {
    lead: "Parents and grandparents",
    text: "through the Parents amd Grandparents Sponsorship Program",
  },
  {
    lead: "Certain other relatives",
    text: "in limited situations where no closer family members are available for sponsorship",
  },
];

const sponsorshipTrustBullets = [
  "Personalized guidance tailored to each family's situation",
  "Careful review of eligibility and supporting documents",
  "Clear communication throughout the application process",
  "Assistance with complex sponsorship and immigration matters",
  "Professional support from submission to final decision",
  "A client-focused approach built on integrity and transparency",
];

const sponsorshipFaqQuestions = [
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

export default async function SponsorshipPage() {
  const raw = await getPageContent("svc-sponsorship") as SvcContent;
  const title = raw?.hero?.title ?? "Sponsorship";

  return (
    <div className="zfc-services-page zfc-sponsorship-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-sponsorship-intro" aria-labelledby="sponsorship-intro-heading">
        <div className="zfc-sponsorship-intro__inner">
          <h2 id="sponsorship-intro-heading" className="zfc-sponsorship-intro__heading">
            Helping Families Reunite Through
            <span>Sponsorship in Canada</span>
          </h2>

          <div className="zfc-sponsorship-intro__layout">
            <div className="zfc-sponsorship-intro__content">
              <h3 className="zfc-sponsorship-intro__subheading">
                What Is Sponsorship in Canada?
              </h3>

              <div className="zfc-sponsorship-intro__copy">
                {sponsorshipIntroParagraphs.map((paragraph) => (
                  <p key={paragraph} className="zfc-sponsorship-intro__text">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Link href="/book-consultation" className="zfc-sponsorship-intro__cta">
                <span>Book a Consultation</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Link>
            </div>

            <div className="zfc-sponsorship-intro__media">
              <Image
                src="/assets/sponsorship-family.png"
                alt="Family smiling together while preparing for sponsorship in Canada"
                width={496}
                height={610}
                sizes="(max-width: 900px) calc(100vw - 40px), 416px"
                className="zfc-sponsorship-intro__image"
                priority={false}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="zfc-sponsorship-qualifies" aria-labelledby="sponsorship-qualifies-heading">
        <div className="zfc-sponsorship-qualifies__inner">
          <h2 id="sponsorship-qualifies-heading" className="zfc-sponsorship-qualifies__heading">
            Who Qualifies for Family Sponsorship in
            <span>Canada?</span>
          </h2>

          <div className="zfc-sponsorship-qualifies__layout">
            <div className="zfc-sponsorship-qualifies__media">
              <Image
                src="/assets/sponsorship-qualifies-family.png"
                alt="Family sitting by a lake while learning about sponsorship eligibility"
                width={484}
                height={910}
                sizes="(max-width: 900px) calc(100vw - 40px), 406px"
                className="zfc-sponsorship-qualifies__image"
              />
            </div>

            <div className="zfc-sponsorship-qualifies__content">
              <p className="zfc-sponsorship-qualifies__text">
                To be eligible for Family Sponsorship in Canada, both the sponsor and the sponsored individual need to fulfill particular criteria set out by IRCC (Immigration, Refugees, and Citizenship Canada). Normally, the sponsor should be a Canadian citizen or permanent resident, have attained 18 years or older, and have the capability to meet all obligations related to sponsorship.
              </p>

              <p className="zfc-sponsorship-qualifies__text">
                The family sponsorship program in Canada enables individuals to sponsor particular members of their family for residency. Possible sponsors for this program could include:
              </p>

              <ul className="zfc-sponsorship-qualifies__list">
                {sponsorshipQualifiesBullets.map((item) => (
                  <li key={item.lead}>
                    <strong>{item.lead}</strong> {item.text}
                  </li>
                ))}
              </ul>

              <p className="zfc-sponsorship-qualifies__text">
                The sponsor is supposed to pay certain funds to help the sponsored relative during the specified time frame and ensure that they are not dependent on social services. There could be additional criteria based on the type of sponsorship program, nature of the relationship, and immigration background of the applicant.
              </p>

              <p className="zfc-sponsorship-qualifies__text">
                Due to the diversity of criteria used, one may benefit from receiving expert advice prior to applying for sponsorship in order to comply with all relevant eligibility criteria.
              </p>

              <Link href="/book-consultation" className="zfc-sponsorship-qualifies__cta">
                <span>Speak With an Advisor</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="zfc-sponsorship-programs" aria-labelledby="sponsorship-programs-heading">
        <div className="zfc-sponsorship-programs__inner">
          <div className="zfc-sponsorship-programs__block">
            <h2 id="sponsorship-programs-heading" className="zfc-sponsorship-programs__heading">
              Understanding Spousal Sponsorship in Canada
            </h2>
            <p className="zfc-sponsorship-programs__text">
              In Spousal Sponsorship in Canada, Canadian citizens and permanent residents may apply for their spouses or partners to receive permanent residency status. Proof of an authentic relationship is needed from the applicant, who must submit documentation to IRCC. An adequately completed application will aid in obtaining a successful sponsorship for family reunion in Canada.
            </p>
          </div>

          <div className="zfc-sponsorship-programs__block">
            <h2 className="zfc-sponsorship-programs__heading">
              Parents and Grandparents Sponsorship
            </h2>
            <p className="zfc-sponsorship-programs__text">
              Parents and Grandparents Sponsorship Program Canadian citizens and permanent residents are permitted to sponsor their parents or grandparents for immigration into Canada under certain conditions. They have to be eligible according to the criteria established by the IRCC. This sponsorship is important as it brings families together, providing family members an opportunity to reside with their loved ones in Canada.
            </p>
          </div>

          <div className="zfc-sponsorship-programs__block">
            <h2 className="zfc-sponsorship-programs__heading">
              Dependent Child Sponsorship
            </h2>
            <p className="zfc-sponsorship-programs__text">
              Through Dependent Child Sponsorship, eligible Canadian citizens and permanent residents have the opportunity to sponsor their children and bring them into Canada as permanent residents. By facilitating the process of sponsorship, the program aims at keeping families united through letting children have a chance to live and develop their career in Canada.
            </p>
          </div>

          <div className="zfc-sponsorship-programs__media">
            <Image
              src="/assets/sponsorship-programs-family.png"
              alt="Family holding a Canadian flag outside their home"
              width={1233}
              height={650}
              sizes="(max-width: 900px) calc(100vw - 40px), 1040px"
              className="zfc-sponsorship-programs__image"
            />
          </div>
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="sponsorship"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-sponsorship-trust" aria-labelledby="sponsorship-trust-heading">
        <div className="zfc-sponsorship-trust__inner">
          <div className="zfc-sponsorship-trust__block">
            <h2 id="sponsorship-trust-heading" className="zfc-sponsorship-trust__heading">
              Why Families Trust ZF Canada for
              <span>Sponsorship Applications</span>
            </h2>

            <p className="zfc-sponsorship-trust__text">
              At ZF Canada, we understand that family sponsorship applications are about more than paperwork—they are about bringing loved ones together. Families trust us because we provide:
            </p>

            <ul className="zfc-sponsorship-trust__list">
              {sponsorshipTrustBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="zfc-sponsorship-trust__text">
              Our goal is to help make your sponsorship journey as smooth and stress-free as possible.
            </p>
          </div>

          <div className="zfc-sponsorship-trust__block">
            <h2 className="zfc-sponsorship-trust__heading zfc-sponsorship-trust__heading--narrow">
              Begin Your Family Sponsorship
              <span>Application Today</span>
            </h2>

            <p className="zfc-sponsorship-trust__text">
              Reuniting with your loved ones starts with the right guidance. Whether you are sponsoring a spouse, child, parent, or grandparent, ZF Canada is here to help. Our team can assess your eligibility, prepare your application, and support you throughout the process.
            </p>

            <p className="zfc-sponsorship-trust__call">
              Call +1(905)858-5589 today
            </p>

            <p className="zfc-sponsorship-trust__text zfc-sponsorship-trust__text--closing">
              to take the first step toward bringing your family together in Canada.
            </p>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="sponsorship-journey-form"
        className="zfc-contact--journey zfc-contact--sponsorship"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="sponsorship-journey"
      />
      <FAQSection questions={sponsorshipFaqQuestions} />

      <Footer />
    </div>
  );
}
