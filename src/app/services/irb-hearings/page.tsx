export const dynamic = "force-dynamic";

import type { Metadata } from "next";
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
  title: "IRB – Hearing & Appeals – ZF Canada Immigration Consultants",
  description:
    "ZF Canada's RCIC-IRB consultants are authorized to represent clients at Immigration and Refugee Board hearings and appeals, including the IAD, RPD, RAD, and ID.",
};

type SvcContent = { hero: { title: string } };

const irbDivisions = [
  {
    title: "Refugee Protection Division (RPD)",
    paragraphs: [
      "The Refugee Protection Division (RPD) is responsible for hearing refugee claims and determining eligibility for protection under Canadian law. Applicants must provide strong evidence to support their case.",
      "Through our IRB – Hearing & Appeals Consultation in Canada, we help clients prepare detailed case files, gather supporting documents, and represent them during hearings to improve their chances of success.",
    ],
  },
  {
    title: "Refugee Appeal Division (RAD)",
    paragraphs: [
      "If a refugee claim is refused, individuals may appeal the decision through the Refugee Appeal Division (RAD). A successful appeal requires new evidence, strong legal arguments, and clear identification of errors in the initial decision.",
      "Our team offers strategic support under IRB – Hearing & Appeals Consultation in Canada, helping clients build compelling appeals and seek fair reconsideration.",
    ],
  },
  {
    title: "Immigration Appeal Division (IAD)",
    paragraphs: [
      "The Immigration Appeal Division (IAD) deals with appeals related to sponsorship refusals, residency obligations, and removal orders. Individuals can challenge decisions based on inadmissibility or insufficient documentation.",
      "With our IRB – Hearing & Appeals Consultation in Canada, we prepare thorough legal submissions, supporting evidence, and represent clients to strengthen their appeal.",
    ],
  },
  {
    title: "Immigration Division (ID)",
    paragraphs: [
      "The Immigration Division (ID) handles admissibility hearings, detention reviews, and removal orders. Individuals facing deportation or inadmissibility may have their cases reviewed here.",
      "Our experienced team provides guidance through IRB – Hearing & Appeals Consultation in Canada, ensuring clients understand their rights, prepare strong defenses, and explore all legal options to remain in Canada.",
    ],
  },
];

const irbFaqQuestions = [
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

export default async function IrbHearingsPage() {
  const raw = await getPageContent("svc-irb-hearings") as SvcContent;
  const title = raw?.hero?.title ?? "IRB – Hearing & Appeals";

  return (
    <div className="zfc-services-page zfc-irb-page">
      <ServicesPageHeader />
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero title={title} image="/assets/services-banner.png" breadcrumb={title} />
      </div>

      <main className="zfc-irb-intro" aria-labelledby="irb-intro-heading">
        <div className="zfc-irb-intro__inner">
          <h2 id="irb-intro-heading" className="zfc-irb-intro__heading">
            Immigration and Refugee Board (IRB)
            <span>Hearings &amp; Appeals Consultation</span>
          </h2>

          <div className="zfc-irb-intro__layout">
            <div className="zfc-irb-intro__copy">
              <h3 className="zfc-irb-intro__subheading">
                Trusted IRB Hearing and Appeal Support in Canada
              </h3>

              <p>
                The process of dealing with the Immigration and Refugee Board may be difficult without the necessary guidance and assistance. ZF Canada offers you a professional service in regards to the IRB – Hearing &amp; Appeals Consultation in Canada which will make the immigration process more manageable and understandable.
              </p>
              <p>
                Our company will assist you in dealing with a range of matters from refugee hearing to appeal of refusal of an application, dealing with your admissibility issue, and even removing an order. We will carefully examine your situation, organize documentation, recognize possible problems, and get you ready for any procedure.
              </p>
              <p>
                We can deal with such types of consultations as refugee claim hearing, refugee appeal, sponsorship appeal, detention review, residency obligation appeal, and admissibility hearing. Our main aim is to present your case effectively and efficiently.
              </p>
              <p>
                In other words, the process is in our hands, and your understanding of it will not be a problem.
              </p>
            </div>

            <div className="zfc-irb-intro__image-wrap">
              <Image
                src="/assets/irb-hearings-consultation.png"
                alt="Immigration consultants reviewing an IRB case together"
                width={522}
                height={654}
                sizes="(max-width: 820px) calc(100vw - 48px), 42vw"
                className="zfc-irb-intro__image"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <section className="zfc-irb-board" aria-labelledby="irb-board-heading">
        <div className="zfc-irb-board__inner">
          <h2 id="irb-board-heading" className="zfc-irb-board__heading">
            What Is the Immigration and
            <span>Refugee Board of Canada?</span>
          </h2>

          <div className="zfc-irb-board__layout">
            <div className="zfc-irb-board__image-wrap">
              <Image
                src="/assets/irb-board-hearing.png"
                alt="A Canadian flag displayed during an immigration hearing"
                width={498}
                height={285}
                sizes="(max-width: 820px) calc(100vw - 48px), 447px"
                className="zfc-irb-board__image"
              />
            </div>

            <p className="zfc-irb-board__body">
              The Immigration and Refugee Board of Canada (IRB) is a separate entity which makes decisions related to immigration and refugees. These include decisions on refugees, refugee appeal hearings, sponsor appeal hearings, admissibility hearings, detention hearings, and residency obligation hearings. The decision of the IRB is done independently of immigration authorities. This decision is made based on Canadian immigration legislation and evidence produced during hearing. Such a decision might have major implications for the future of an individual&apos;s stay or entry to Canada.
            </p>
          </div>
        </div>
      </section>

      <section className="zfc-irb-services" aria-labelledby="irb-services-heading">
        <div className="zfc-irb-services__inner">
          <h2 id="irb-services-heading" className="zfc-irb-services__heading">
            Our IRB – Hearing &amp; Appeals Consultation in
            <span>Canada Services</span>
          </h2>

          <div className="zfc-irb-services__image-wrap">
            <Image
              src="/assets/irb-consultation-services.png"
              alt="People receiving immigration consultation support"
              width={1144}
              height={613}
              sizes="(max-width: 1080px) calc(100vw - 48px), 1028px"
              className="zfc-irb-services__image"
            />
          </div>
        </div>
      </section>

      <section className="zfc-irb-divisions" aria-label="IRB hearing and appeal divisions">
        <div className="zfc-irb-divisions__inner">
          {irbDivisions.map((division) => (
            <article key={division.title} className="zfc-irb-divisions__item">
              <h3 className="zfc-irb-divisions__heading">{division.title}</h3>
              {division.paragraphs.map((paragraph) => (
                <p key={paragraph} className="zfc-irb-divisions__body">{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <ServicesListSection
        className="zfc-svc-list--related"
        excludeSlug="irb-hearings"
        heading={(
          <>
            ZF Immigration Solutions &amp; Immigration Consultants
            <br />
            offer services tailored to your needs
          </>
        )}
      />

      <section className="zfc-irb-hearing" aria-labelledby="irb-hearing-heading">
        <div className="zfc-irb-hearing__inner">
          <h2 id="irb-hearing-heading" className="zfc-irb-hearing__heading">
            What Happens at an IRB Hearing?
          </h2>

          <div className="zfc-irb-hearing__layout">
            <p className="zfc-irb-hearing__body">
              An IRB hearing is a process during which a board member considers your case along with the information you have submitted. During the process, you may be questioned regarding your application, documents, and other related aspects. Witnesses or interpreters might be included in the hearing as well, depending on the case requirements. A hearing takes place either face-to-face, through videoconference or telephone calls. In the end, after all the information has been considered, the board member gives their verdict on your case or at some other time.
            </p>

            <div className="zfc-irb-hearing__image-wrap">
              <Image
                src="/assets/irb-hearing-approval.png"
                alt="Approved visa application documents and stamp"
                width={522}
                height={520}
                sizes="(max-width: 820px) calc(100vw - 48px), 586px"
                className="zfc-irb-hearing__image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="zfc-irb-closing" aria-labelledby="irb-mistakes-heading">
        <div className="zfc-irb-closing__inner">
          <h2 id="irb-mistakes-heading" className="zfc-irb-closing__heading">
            Common Mistakes That Can Affect IRB Cases
          </h2>

          <div className="zfc-irb-closing__mistakes-layout">
            <div className="zfc-irb-closing__image-wrap zfc-irb-closing__image-wrap--mistakes">
              <Image
                src="/assets/irb-common-mistakes.png"
                alt="Canadian flag pinned on a map of Canada"
                width={522}
                height={520}
                sizes="(max-width: 820px) calc(100vw - 48px), 587px"
                className="zfc-irb-closing__image"
              />
            </div>

            <ul className="zfc-irb-closing__mistakes-list">
              <li>Inconsistent statements</li>
              <li>Weak or missing evidence</li>
              <li>Poor preparation before the hearing</li>
              <li>Late document submission</li>
              <li>Unclear explanation of risk or hardship</li>
              <li>Not understanding the role of CBSA or the IRB member</li>
            </ul>
          </div>

          <div className="zfc-irb-closing__consultation-layout">
            <div className="zfc-irb-closing__consultation-copy">
              <h2 className="zfc-irb-closing__consultation-heading">
                Book an IRB Hearing &amp; Appeals
                <span>Consultation in Canada</span>
              </h2>
              <p className="zfc-irb-closing__consultation-body">
                Facing an IRB hearing or appeal can be stressful, but you do not have to navigate the process alone. Whether you are preparing for a refugee hearing, responding to an admissibility concern, appealing a sponsorship refusal, or challenging a removal order, ZF Canada is here to help. Our experienced team can assess your case, explain your options, help prepare supporting documentation, and guide you through every stage of the process.
              </p>
              <a href="tel:+19058585589" className="zfc-irb-closing__call">
                Call +1 (905) 858-5589 today
              </a>
              <p className="zfc-irb-closing__call-note">
                to schedule your consultation and take the next step with confidence.
              </p>
            </div>

            <div className="zfc-irb-closing__image-wrap zfc-irb-closing__image-wrap--consultation">
              <Image
                src="/assets/irb-book-consultation.png"
                alt="Canadian visa application and passport on a Canadian flag"
                width={448}
                height={462}
                sizes="(max-width: 820px) calc(100vw - 48px), 504px"
                className="zfc-irb-closing__image"
              />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <ContactSection
        id="irb-hearings-journey-form"
        className="zfc-contact--journey zfc-contact--irb-hearings"
        heading={"Start Your Canada\nImmigration"}
        headingHighlight="Journey Today"
        showNda
        visual={{
          type: "image",
          src: "/assets/about-journey-form.webp",
          alt: "Canadian passport held in front of a Canadian flag",
        }}
        idPrefix="irb-hearings-journey"
      />
      <FAQSection questions={irbFaqQuestions} />

      <Footer />
    </div>
  );
}
