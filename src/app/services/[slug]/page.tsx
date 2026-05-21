import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailLayout from "@/components/services/ServiceDetailLayout";
import ServiceDetailExtra from "@/components/services/ServiceDetailExtra";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

/* ─────────────────────────────────────────────────────
   Service content — scraped & ported from old website
   ───────────────────────────────────────────────────── */
interface Section {
  subheading?: string;
  paragraphs: string[];
}

interface ServiceData {
  title: string;
  metaDescription: string;
  heading: string;
  sections: Section[];
  extraParagraphs: string[];
}

const SERVICES: Record<string, ServiceData> = {

  "refused-applications": {
    title: "Refused Applications",
    metaDescription: "Facing a refused immigration application in Canada? ZF Canada specializes in reapplying and appealing refused cases to improve your chances of approval.",
    heading: "Refused Applications in Canada",
    sections: [
      {
        paragraphs: [
          "Dealing with Refused Applications in Canada can be frustrating and discouraging, but it does not mean the end of your immigration journey. Many applications are refused due to incomplete documentation, missing information, or submission errors. At ZF Canada, we specialize in reviewing Refused Applications in Canada, identifying the reasons for refusal, and preparing stronger reapplications or appeals to improve your chances of approval.",
          "Our team has extensive experience handling Refused Applications in Canada across various categories, including sponsorships, permanent residency, visitor visas, study permits, work permits, and Humanitarian & Compassionate cases. We carefully assess each case and develop customized strategies to address the specific concerns raised by immigration authorities.",
          "If an appeal is required, we represent clients before the Immigration Appeal Division (IAD) or through Federal Court proceedings in collaboration with experienced lawyers. We prepare detailed legal submissions, supporting documents, and strong arguments to seek a fair reconsideration.",
        ],
      },
    ],
    extraParagraphs: [
      "Whether your case involves financial proof issues, inadmissibility concerns, or procedural errors, our experts provide step-by-step guidance to resolve Refused Applications in Canada effectively. Our goal is to help you overcome setbacks and turn a refusal into a successful outcome.",
      "We also assist businesses and employees with immigration matters such as Intra-Company Transfers (ICT), ensuring compliance with Canadian immigration laws while addressing any refused applications related to corporate mobility.",
    ],
  },

  "humanitarian-compassionate": {
    title: "Humanitarian & Compassionate",
    metaDescription: "Apply under Humanitarian & Compassionate grounds in Canada. ZF Canada handles H&C cases with expert guidance and personalized strategy.",
    heading: "What is Humanitarian & Compassionate in Canada?",
    sections: [
      {
        paragraphs: [
          "Humanitarian & Compassionate (H&C) in Canada is a special immigration pathway that allows individuals to apply for permanent residency even if they do not qualify under standard programs. It is designed for people facing exceptional circumstances where returning to their home country would cause serious hardship.",
          "Under Canadian immigration law, H&C applications are assessed on a case-by-case basis, considering factors such as establishment in Canada, family ties, and risks in the applicant's home country. This pathway is often considered a last resort, but when properly prepared, it can provide a life-changing opportunity to remain in Canada.",
        ],
      },
      {
        subheading: "Who Should Apply for H&C?",
        paragraphs: [
          "You may qualify for Humanitarian & Compassionate grounds if you are currently living in Canada and do not qualify under Express Entry, PNP, or family sponsorship. H&C is especially relevant for individuals who have lived in Canada for several years, have Canadian-born children, are dealing with medical or humanitarian issues, or cannot safely return to their home country.",
          "Immigration officers evaluate multiple factors: establishment in Canada (employment, education, community involvement), family ties, best interests of children, and hardship in the home country — assessed collectively, not individually.",
        ],
      },
      {
        subheading: "Eligibility & Important Rules",
        paragraphs: [
          "You cannot apply if you have an active refugee claim. You must wait 12 months after a refugee refusal (with exceptions for life-threatening medical conditions or child welfare). Only one H&C application can be submitted at a time. A strong application must clearly explain why you deserve an exemption, what hardship you will face if removed, and why remaining in Canada is justified.",
        ],
      },
    ],
    extraParagraphs: [
      "At ZF Canada, we specialize in handling complex Humanitarian & Compassionate cases with a strategic and personalized approach — including case eligibility assessment, strong personal statement drafting, evidence collection, legal strategy development, and full application preparation.",
      "H&C applications are highly discretionary. Common reasons for refusal include weak evidence, lack of clear hardship, or missing documentation. Professional guidance is highly recommended to maximize your approval chances.",
    ],
  },

  "inadmissibility": {
    title: "Inadmissibility",
    metaDescription: "Professional inadmissibility consultation in Canada. Overcome criminal, medical, or misrepresentation barriers with expert legal support from ZF Canada.",
    heading: "Inadmissibility Consultation in Canada",
    sections: [
      {
        paragraphs: [
          "Inadmissibility Consultation in Canada is essential for individuals who are unable to enter or remain in the country due to immigration restrictions. Issues such as criminal records, misrepresentation, medical conditions, or financial concerns can create serious barriers. At ZF Canada, we provide expert Inadmissibility Consultation in Canada to help clients understand their situation and explore legal solutions.",
          "Many people believe that being found inadmissible means their immigration journey is over. However, with the right consultation, there are several pathways available to overcome these challenges. Options may include Criminal Rehabilitation applications, Temporary Resident Permits (TRPs), or appeals. Our team carefully evaluates each case to develop the most effective strategy.",
          "For individuals facing criminal inadmissibility, our consultation includes assistance with Criminal Rehabilitation applications. Once approved, this allows individuals to enter Canada without restrictions. In cases of misrepresentation, we guide clients through appeals, prepare detailed explanation letters, and provide strong supporting evidence to demonstrate credibility.",
        ],
      },
    ],
    extraParagraphs: [
      "If you have been deemed inadmissible, seeking professional Inadmissibility Consultation in Canada can significantly improve your chances of success. Our experienced team is dedicated to providing strategic guidance and legal solutions to help you regain eligibility to study, work, travel, or immigrate to Canada.",
      "Whether the issue stems from a past criminal conviction, a medical condition, financial instability, or a previous misrepresentation, we work diligently to identify the strongest available remedy for your specific situation.",
    ],
  },

  "misrepresentation": {
    title: "Misrepresentation",
    metaDescription: "Facing a misrepresentation charge in Canada? ZF Canada helps with appeals, reconsideration, and strong legal defenses to protect your immigration status.",
    heading: "Misrepresentation",
    sections: [
      {
        paragraphs: [
          "Providing false or misleading information in an immigration application can result in a misrepresentation charge, leading to serious consequences including a five-year ban from Canada. Misrepresentation can be intentional or unintentional, and our role is to clarify any misunderstandings and correct inaccuracies in your case.",
          "If you have been accused of misrepresentation, we assist in filing appeals, submitting reconsideration requests, and preparing strong legal defenses to prove your credibility. Our team ensures that all future submissions are accurate and transparent, helping you rebuild your immigration profile.",
        ],
      },
      {
        subheading: "Criminal Inadmissibility",
        paragraphs: [
          "A criminal record can make an individual inadmissible to Canada, but options are available to overcome this issue. We assist with Criminal Rehabilitation applications, Temporary Resident Permits (TRPs), and legal representation to help clients regain entry into Canada. If your offense was committed over ten years ago, you may be deemed rehabilitated automatically, depending on the severity of the crime.",
        ],
      },
      {
        subheading: "Deportation & Removal Orders",
        paragraphs: [
          "If you have received a Deportation, Departure, or Exclusion Order, it is crucial to take immediate action. ZF Canada provides legal representation for Pre-Removal Risk Assessments (PRRA), appeals, and requests for reconsideration, helping clients remain in Canada. We assess each case carefully to determine the best legal avenues to challenge removal orders.",
        ],
      },
      {
        subheading: "Detention Review & CBSA/IRCC Interviews",
        paragraphs: [
          "If detained by Canada Border Services Agency (CBSA), individuals have the right to a Detention Review Hearing before the Immigration Division. We provide legal support in arguing for release, presenting evidence, and ensuring clients are treated fairly. We also help clients prepare for CBSA and IRCC interviews through mock sessions, case file reviews, and strategic guidance.",
        ],
      },
    ],
    extraParagraphs: [
      "Our team works diligently to submit bail proposals, negotiate conditions for release, and challenge the reasons for detention, ensuring your rights are upheld throughout the process.",
      "Preparation is key for any immigration interview or hearing. Our legal experts ensure you are well-prepared to answer difficult questions confidently and truthfully.",
    ],
  },

  "sponsorship": {
    title: "Sponsorship",
    metaDescription: "Explore immigration sponsorship in Canada with ZF Canada. We assist with spousal, common-law, and parent & grandparent sponsorship programs.",
    heading: "Sponsorship",
    sections: [
      {
        subheading: "Spousal Sponsorship",
        paragraphs: [
          "Canada allows citizens and permanent residents to sponsor their spouse, common-law partner, or conjugal partner to become permanent residents. This sponsorship is designed to reunite families and ensure that loved ones can live together in Canada. Whether applying for inland (while in Canada) or outland (from outside Canada) sponsorship, applicants must demonstrate a genuine relationship and meet specific eligibility requirements.",
          "Spousal sponsorship requires thorough documentation, including proof of marriage or partnership, financial stability, and supporting evidence such as shared financial responsibilities and communication records. The process can be complex, but our team ensures that applications are accurate, complete, and prepared to avoid unnecessary delays. If a case is refused due to insufficient evidence or doubts about the relationship's authenticity, we assist with appeals and reconsideration requests.",
        ],
      },
      {
        subheading: "Parent & Grandparent Sponsorship",
        paragraphs: [
          "Through the Parent and Grandparent Sponsorship Program (PGP), Canadian citizens and permanent residents can bring their parents and grandparents to live in Canada permanently. This program allows sponsored family members to access healthcare, social benefits, and a path to citizenship.",
          "To qualify, sponsors must meet minimum income requirements to ensure they can financially support their parents or grandparents. Given that this program operates through lottery-based selection, we help clients submit strong and timely applications, improving their chances of being selected for sponsorship.",
        ],
      },
    ],
    extraParagraphs: [
      "Family reunification is at the heart of Canadian immigration policy. Our experienced team guides you through every step of the sponsorship process — from eligibility assessment to document preparation and final submission.",
      "Whether you are sponsoring a spouse from abroad or bringing your parents to Canada, ZF Canada ensures your application is complete, accurate, and presents the strongest possible case for approval.",
    ],
  },

  "refugee-claim": {
    title: "Refugee Claim Application",
    metaDescription: "Get trusted legal support for your refugee claim application in Canada. ZF Canada assists asylum seekers from the initial filing to the final decision.",
    heading: "Refugee Claim Applications",
    sections: [
      {
        paragraphs: [
          "Canada is recognized worldwide for its commitment to protecting refugees and asylum seekers who face persecution, violence, or human rights violations in their home countries. The Refugee Claim Application process allows individuals to seek protection in Canada if they can prove that they are unable to return to their country due to a well-founded fear of persecution based on race, religion, nationality, political opinion, or membership in a particular social group.",
          "A refugee claim can be made at a port of entry, such as an airport or border crossing, or from within Canada if the individual is already in the country. Once a claim is submitted, the applicant undergoes an eligibility assessment by the Canada Border Services Agency (CBSA) or Immigration, Refugees, and Citizenship Canada (IRCC). If deemed eligible, the claim is referred to the Refugee Protection Division (RPD) of the Immigration and Refugee Board (IRB) for a hearing.",
          "The success of a refugee claim depends on credible evidence, including personal statements, witness testimonies, country condition reports, and documentation of past persecution. Even minor inconsistencies can lead to a claim being rejected, which is why legal guidance is crucial. At ZF Canada, we work closely with clients to build a strong and convincing case, ensuring that all details are accurately presented.",
        ],
      },
    ],
    extraParagraphs: [
      "If a claim is denied, we also assist with appeals to the Refugee Appeal Division (RAD) or judicial reviews at the Federal Court. Navigating the refugee claim process can be overwhelming, but with the right legal representation, claimants have a much higher chance of securing protection.",
      "Canada offers successful refugee claimants the opportunity to apply for permanent residency, eventually leading to citizenship. Our dedicated team is committed to helping refugees find safety and security in Canada, offering comprehensive legal support from the initial application to final decision-making.",
    ],
  },

  "irb-hearings": {
    title: "IRB – Hearing & Appeals",
    metaDescription: "Need IRB hearing & appeals consultation in Canada? ZF Canada provides expert legal representation for refugee hearings, RAD, IAD, and Immigration Division proceedings.",
    heading: "IRB – Hearings & Appeals",
    sections: [
      {
        subheading: "Refugee Protection Division (RPD)",
        paragraphs: [
          "The Refugee Protection Division (RPD) is responsible for hearing refugee claims and determining eligibility for protection under Canadian law. Applicants must provide strong evidence to support their case. We help clients prepare detailed case files, gather supporting documents, and represent them during hearings to improve their chances of success.",
        ],
      },
      {
        subheading: "Refugee Appeal Division (RAD)",
        paragraphs: [
          "If a refugee claim is refused, individuals may appeal the decision through the Refugee Appeal Division (RAD). A successful appeal requires new evidence, strong legal arguments, and clear identification of errors in the initial decision. Our team offers strategic support, helping clients build compelling appeals and seek fair reconsideration.",
        ],
      },
      {
        subheading: "Immigration Appeal Division (IAD)",
        paragraphs: [
          "The Immigration Appeal Division (IAD) deals with appeals related to sponsorship refusals, residency obligations, and removal orders. Individuals can challenge decisions based on inadmissibility or insufficient documentation. We prepare thorough legal submissions, supporting evidence, and represent clients to strengthen their appeal.",
        ],
      },
      {
        subheading: "Immigration Division (ID)",
        paragraphs: [
          "The Immigration Division (ID) handles admissibility hearings, detention reviews, and removal orders. Individuals facing deportation or inadmissibility may have their cases reviewed here. Our experienced team provides guidance ensuring clients understand their rights, prepare strong defenses, and explore all legal options to remain in Canada.",
        ],
      },
    ],
    extraParagraphs: [
      "The Immigration and Refugee Board (IRB) is Canada's largest independent administrative tribunal, responsible for making well-reasoned decisions on immigration and refugee matters. Understanding how it works is critical to achieving a positive outcome.",
      "At ZF Canada, our RCIC-IRB authorized consultants have deep experience navigating all four divisions of the IRB. We provide full legal support — from preparation to final representation — ensuring every client has the best possible chance of success.",
    ],
  },

  "temporary-residence": {
    title: "Temporary Residence",
    metaDescription: "Get Temporary Residence in Canada for work, travel, or family visits. ZF Canada offers expert support for visitor visas, work permits, super visas, and TRPs.",
    heading: "Temporary Residence in Canada",
    sections: [
      {
        paragraphs: [
          "Temporary Residence in Canada allows individuals to visit, work, or stay in the country for a limited period. Whether for tourism, family visits, or employment, there are multiple pathways available depending on your purpose. At ZF Canada, we provide expert guidance to help applicants successfully obtain Temporary Residence in Canada with complete and accurate applications.",
        ],
      },
      {
        subheading: "Visitor Visas & Super Visas",
        paragraphs: [
          "A Visitor Visa is one of the most common ways to obtain Temporary Residence in Canada for tourism, family visits, or short stays. Typically granted for up to six months, applicants must demonstrate strong ties to their home country, financial stability, and a clear purpose of visit. We assist clients in preparing well-documented applications to improve approval chances.",
          "The Super Visa is a special option allowing parents and grandparents of Canadian citizens or permanent residents to stay for up to five years per visit. This visa requires proof of private medical insurance and financial sponsorship. Our team ensures all documentation is accurate and meets immigration requirements.",
        ],
      },
      {
        subheading: "Work Permits",
        paragraphs: [
          "Work permits are a key pathway to Temporary Residence in Canada, enabling foreign nationals to work legally. Employer-Specific Work Permits require a job offer and Labour Market Impact Assessment (LMIA), while Open Work Permits allow individuals to work for any employer in Canada. We help professionals, skilled workers, and students choose the right option and submit strong applications.",
        ],
      },
      {
        subheading: "Intra-Company Transfers & Temporary Resident Permits",
        paragraphs: [
          "The Intra-Company Transfer (ICT) Program allows multinational companies to transfer employees to Canadian branches. Eligible employees must have at least one year of experience in managerial or specialized roles. For individuals facing inadmissibility, Temporary Resident Permits (TRPs) offer a unique route, granted in exceptional cases where there are valid reasons to enter Canada despite restrictions.",
        ],
      },
    ],
    extraParagraphs: [
      "Temporary Residence is often the first step in a longer immigration journey toward permanent residency or citizenship. Choosing the right permit type and submitting a complete, well-supported application is essential.",
      "Our experts help clients navigate every stage — from determining the appropriate permit category to gathering documentation and responding to IRCC requests — ensuring a smooth and successful application.",
    ],
  },

  "pr-card-citizenship": {
    title: "PR Card & Citizenship",
    metaDescription: "Get expert help with PR card renewal and Canadian citizenship applications. ZF Canada guides you through every step to maintain your status in Canada.",
    heading: "PR Card & Citizenship",
    sections: [
      {
        subheading: "PR Card Renewal",
        paragraphs: [
          "A Permanent Resident (PR) Card is essential proof of a person's status in Canada and must be renewed every five years. If your PR card is expired, lost, or stolen, you must apply for a renewal to maintain your ability to travel in and out of Canada. To qualify, applicants must meet residency obligations, having spent at least 730 days in Canada within the last five years. At ZF Canada, we assist in preparing accurate renewal applications, ensuring a smooth and hassle-free process.",
          "Failing to renew your PR card on time can lead to travel restrictions and complications in proving your PR status. If you are outside Canada with an expired PR card, you may need to apply for a Permanent Resident Travel Document (PRTD) to return. Our team helps clients navigate PR card renewals, address residency issues, and avoid unnecessary delays.",
        ],
      },
      {
        subheading: "Canadian Citizenship",
        paragraphs: [
          "Becoming a Canadian citizen is a significant milestone, granting individuals the right to vote, obtain a Canadian passport, and access full legal rights. To qualify, applicants must have physically lived in Canada for at least 1,095 days within the last five years, meet language proficiency requirements, and pass a citizenship test.",
          "Many applications face delays or refusals due to missing documents, unclear residency records, or language test issues. Our team provides expert support in preparing strong applications, tracking residency days, and preparing for the citizenship test and interview. If you need assistance with your citizenship application or proof of Canadian citizenship, we are here to make the process fast, efficient, and stress-free.",
        ],
      },
    ],
    extraParagraphs: [
      "Maintaining your permanent resident status and eventually achieving citizenship are milestones that require careful planning and accurate documentation. Missing key deadlines or residency thresholds can have serious consequences.",
      "At ZF Canada, we track every detail of your case — from residency day counts to document checklists — so you can focus on building your life in Canada with confidence.",
    ],
  },

  "permanent-residency": {
    title: "Permanent Residency",
    metaDescription: "Trusted PR consultants in Canada. ZF Canada guides applicants through Express Entry, PNP, family sponsorship, and all permanent residency pathways.",
    heading: "Permanent Residency in Canada",
    sections: [
      {
        paragraphs: [
          "Achieving Permanent Residency in Canada is a major milestone for individuals seeking long-term stability, career growth, and a high quality of life. Canada offers multiple immigration pathways for skilled workers, students, entrepreneurs, and families. As a permanent resident, you can live, work, and study anywhere in the country, access healthcare, and enjoy many benefits similar to Canadian citizens.",
        ],
      },
      {
        subheading: "Federal Skilled Worker & Trades Programs",
        paragraphs: [
          "The Federal Skilled Worker Program (FSWP) is one of the most popular routes for skilled professionals. It evaluates candidates through the Comprehensive Ranking System (CRS) based on age, education, work experience, language skills, and adaptability. The Federal Skilled Trades Program (FSTP) is designed for trade professionals such as electricians, plumbers, and welders, providing a practical pathway to permanent residency.",
        ],
      },
      {
        subheading: "Express Entry & Canadian Experience Class",
        paragraphs: [
          "Express Entry manages applications for FSWP, FSTP, and the Canadian Experience Class (CEC). CEC is ideal for temporary foreign workers and international graduates with Canadian work experience, offering a faster route to permanent residency. Our team helps candidates optimize CRS profiles, gather required documents, and streamline the application process.",
        ],
      },
      {
        subheading: "Provincial Nominee Program (PNP)",
        paragraphs: [
          "The Provincial Nominee Program allows provinces to nominate candidates based on labor market needs. It is a strong pathway to permanent residency, especially for individuals with in-demand skills in specific provinces. A professional consultant can help identify the best province, prepare documentation, and increase your chances of receiving a nomination.",
        ],
      },
      {
        subheading: "Business Immigration & Other Pathways",
        paragraphs: [
          "Canada's Start-Up Visa Program offers entrepreneurs an opportunity to gain permanent residency by launching innovative businesses with support from designated investors or incubators. Business Class Immigration is designed for investors and self-employed individuals who want to contribute to the Canadian economy. Family-Class Sponsorship allows Canadian citizens and permanent residents to sponsor their spouse, children, parents, or grandparents.",
        ],
      },
    ],
    extraParagraphs: [
      "Humanitarian & Compassionate (H&C) applications offer a unique route to permanent residency for individuals facing exceptional circumstances. These cases consider factors such as establishment in Canada, family ties, and hardship.",
      "At ZF Canada, we guide applicants through every step of the permanent residency process — from selecting the right pathway and optimizing eligibility to preparing a strong application and responding to IRCC requests.",
    ],
  },
};

/* ─────────────────────────────────────────────────────
   Static params for build-time generation
   ───────────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────────────
   Metadata
   ───────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES[slug];
  if (!svc) return { title: "Service Not Found" };
  return {
    title: `${svc.title} – ZF Canada Immigration Consultants`,
    description: svc.metaDescription,
  };
}

/* ─────────────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────────────── */
export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const svc = SERVICES[slug];
  if (!svc) notFound();

  return (
    <div className="zfc-services-page">
      <ServicesPageHeader activePage="Services" />

      {/* Hero */}
      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title={svc.title}
          image="/assets/services-hero-bg.png"
          breadcrumb={svc.title}
        />
      </div>

      {/* Sidebar + Content */}
      <ServiceDetailLayout activeHref={`/services/${slug}`}>
        <h2 className="zfc-svc-detail__heading">{svc.heading}</h2>

        {svc.sections.map((section, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {section.subheading && (
              <h3 style={{
                fontFamily: "var(--zfc-font-heading)",
                fontSize: "clamp(18px, 1.6vw, 24px)",
                fontWeight: 700,
                color: "#cc1f1f",
                margin: "8px 0 0",
                lineHeight: 1.3,
              }}>
                {section.subheading}
              </h3>
            )}
            {section.paragraphs.map((para, j) => (
              <p key={j} className="zfc-svc-detail__body">{para}</p>
            ))}
          </div>
        ))}
      </ServiceDetailLayout>

      {/* Extra section with photo, FAQ, CTA */}
      <ServiceDetailExtra
        photo="/assets/about-photo.png"
        photoAlt={`ZF Canada – ${svc.title} consultants`}
        images={["/assets/services-hero-bg.png", "/assets/services-hero-main.png"]}
        paragraphs={svc.extraParagraphs}
      />

      <FAQSection />
      <Footer />
    </div>
  );
}
