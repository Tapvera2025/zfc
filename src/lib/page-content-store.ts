/**
 * Page Content Store — file-backed CMS for editable page content.
 * Content is saved to  data/pages/<slug>.json  and survives server restarts.
 * Each page has a typed schema; the store handles reads/writes generically.
 */

import fs   from "fs";
import path from "path";

// ── Storage path ────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data", "pages");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(slug: string) {
  return path.join(DATA_DIR, `${slug}.json`);
}

// ── Default content for every page ─────────────────────────────────────────

export const PAGE_DEFAULTS: Record<string, unknown> = {

  home: {
    hero: {
      title: "We Speak for You.\nWe Make the Law Work for You.",
      subtitle: "Regulated Canadian Immigration Consultants helping families, students, workers and businesses navigate Canada's immigration system.",
      ctaText: "Get Free Consultation",
      ctaHref: "/free-assessment",
    },
    about: {
      heading: "About ZF Canada",
      body: "ZF Canada Immigration Consultants is a full-service immigration firm based in Mississauga, Ontario. Our team of Regulated Canadian Immigration Consultants (RCICs) has helped thousands of clients achieve their Canadian immigration goals.",
      highlight: "Trusted by thousands of immigrants across Canada.",
    },
    stats: [
      { label: "Years of Experience", value: "15+" },
      { label: "Successful Cases",    value: "5,000+" },
      { label: "Countries Served",    value: "80+" },
      { label: "Success Rate",        value: "97%" },
    ],
    whyUs: {
      heading: "Why Choose ZF Canada?",
      points: [
        "Regulated Canadian Immigration Consultants (RCIC) — licensed and accountable.",
        "Personalized service with transparent, honest advice on every case.",
        "Comprehensive expertise covering all immigration pathways.",
        "Proven track record with thousands of successful applications.",
      ],
    },
    countries: {
      heading: "Licensed Canada Immigration\nConsultant serving Applicants\nFrom Anywhere",
      body: "We help you migrate smoothly with expert guidance and tailored solutions for your needs.",
      otherCount: "50+",
    },
    servicesSection: {
      heading: "Comprehensive Immigration Services",
      intro: "",
      cards: [
        { title: "Refused Applications",        description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/refused-applications" },
        { title: "Humanitarian & Compassionate", description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/humanitarian-compassionate" },
        { title: "Inadmissibility",             description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/inadmissibility" },
        { title: "Misrepresentation",           description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/misrepresentation" },
      ],
    },
    testimonialsSection: {
      heading: "WHAT OUR CLIENTS SAY",
      subheading: "Community development is often linked with community work or community planning, and may involve stakeholders, foundations,",
    },
    testimonials: [
      { photo: "/assets/testimonial-1.png", text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in", name: "Amelia", role: "Student", rating: 4 },
      { photo: "/assets/testimonial-2.png", text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in", name: "Waliya", role: "Student", rating: 4 },
      { photo: "/assets/testimonial-3.png", text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in", name: "Ezaz",   role: "Student", rating: 5 },
    ],
  },

  about: {
    hero: {
      title: "About Us",
      breadcrumb: "About",
    },
    intro: {
      heading: "ZF Canada Immigration Consultants",
      body: "ZF Canada is a full-service immigration consulting firm based in Mississauga, Ontario. We are Regulated Canadian Immigration Consultants (RCICs) licensed by the College of Immigration and Citizenship Consultants (CICC). Our mission is simple: to make your immigration journey as smooth, transparent, and successful as possible.",
    },
    mission: {
      heading: "Our Mission",
      body: "We believe every client deserves personalized attention, honest advice, and dedicated advocacy. We stand beside our clients every step of the way — from the initial consultation through to the final decision on their application.",
    },
    vision: {
      heading: "Our Vision",
      body: "To be Canada's most trusted immigration consultancy by providing expert, ethical, and compassionate service to every client, regardless of their background or circumstances.",
    },
  },

  "our-client": {
    hero: {
      title: "Our Client",
      breadcrumb: "Our Client",
    },
    intro: {
      heading: "Our Client",
      paragraphs: [
        "Our clients include all types of prospective immigrants to Canada. We've served foreign skilled workers, students, refugees, entrepreneurs and most of all – businesses of all sizes (who seek us out for solutions to immigration issues related to human resources).",
        "In today's global market, borders no longer bind enterprises, and to remain competitive they must be able to relocate skilled professionals from abroad, quickly and efficiently. With a thorough knowledge of all government programs currently available to facilitate the entry of foreign workers, we focus on achieving this goal. We advise corporate clients on a broad spectrum of issues; from obtaining temporary employment authorizations for foreign workers and compliance that both protect the employers interests and are sensitive to the particular concerns of recently arrived employees. Our mission is to unite corporate clients with the skilled foreign professionals they require.",
      ],
    },
  },

  toronto: {
    hero: {
      title: "Immigration Consultants Serving Toronto",
      breadcrumb: "Toronto",
    },
    content: {
      title: "Immigration Consultants Serving Toronto",
      paragraphs: [
        "Toronto is Canada's largest city and one of the most multicultural urban centres in the world. With over half of its residents born outside Canada, Toronto has long been the destination of choice for immigrants seeking opportunity, safety, and a better quality of life. At ZF Canada Immigration Consultants, we are proud to serve the vibrant and diverse communities of Toronto and the Greater Toronto Area (GTA).",
        "Our team of experienced Regulated Canadian Immigration Consultants (RCICs) provides comprehensive immigration services tailored to the unique needs of Toronto residents and newcomers. Whether you are a skilled worker seeking permanent residency, a student planning to study at one of Toronto's world-class institutions, a business owner looking to bring skilled professionals from abroad, or a family hoping to reunite with loved ones, we have the expertise to guide you through every step of the Canadian immigration process.",
        "Toronto continues to attract hundreds of thousands of immigrants each year, drawn by its robust economy, world-class healthcare, excellent education system, and unparalleled cultural diversity. The city is home to immigrants from more than 200 countries, speaking over 140 languages. This incredible diversity has become Toronto's greatest strength — fueling innovation, entrepreneurship, and economic growth across every sector.",
        "We understand that navigating Canada's complex immigration system can be daunting. Immigration rules and policies change frequently, and mistakes in applications can lead to costly delays or refusals. That is why working with an experienced RCIC is essential. Our consultants stay up to date with the latest policy changes, program requirements, and processing times to ensure your application is as strong as possible.",
        "From Express Entry and Provincial Nominee Programs (PNP) to study permits, work permits, visitor visas, family sponsorship, and refugee claims — ZF Canada offers the full spectrum of Canadian immigration services to clients in Toronto and across the GTA. We also assist businesses of all sizes in navigating corporate immigration needs, including Labour Market Impact Assessments (LMIAs) and intra-company transfers.",
        "Our mission is simple: to make your immigration journey as smooth, transparent, and successful as possible. We believe every client deserves personalized attention, honest advice, and dedicated advocacy. Contact us today to schedule a free consultation and take the first step toward your Canadian dream.",
      ],
    },
    contact: {
      phone: "+1 (905) 858-5589",
      email: "info@zfcanada.com",
      address: "214-808 Britannia Rd W,\nMississauga, ON L5V 0A7",
    },
  },

  "free-assessment": {
    hero: {
      title: "Free Assessment",
      breadcrumb: "Free Assessment",
    },
    intro: {
      heading: "Start Your Free Immigration Assessment",
      body: "Fill out the form below and one of our Regulated Canadian Immigration Consultants will review your information and contact you within 1–2 business days.",
    },
    submitButtonText: "Submit Assessment",
  },

  services: {
    hero: {
      title: "Our Services",
      breadcrumb: "Services",
    },
    intro: {
      heading: "Comprehensive Canadian Immigration Services",
      body: "ZF Canada offers a full range of immigration services for individuals, families, and businesses. Our RCICs have the expertise to handle even the most complex cases.",
    },
  },

  "svc-permanent-residency": {
    hero: { title: "Permanent Residency" },
    detail: {
      heading: "Permanent Residency in Canada",
      paragraphs: [
        "Achieving permanent residence in Canada opens the door to living, working, and studying anywhere in the country, accessing most social benefits, and eventually applying for Canadian citizenship. There are numerous pathways to permanent residence — from the federal Express Entry system and Provincial Nominee Programs (PNPs) to caregiver programs and Atlantic Immigration Program (AIP). ZF Canada's RCIC-IRB consultants assess your profile and recommend the most advantageous pathway for your unique situation.",
        "Express Entry manages applications for the Federal Skilled Worker Program (FSWP), the Federal Skilled Trades Program (FSTP), and the Canadian Experience Class (CEC). Your Comprehensive Ranking System (CRS) score determines your likelihood of receiving an Invitation to Apply (ITA). ZF Canada conducts a thorough review of your profile to maximize your CRS score — including identifying eligible foreign work experience, arranging educational credential assessments, and advising on language testing strategies.",
        "Provincial Nominee Programs (PNPs) provide an alternative route for candidates who may not rank competitively in federal Express Entry draws. Many provinces have streams tailored to specific occupations, regions, or employer connections. ZF Canada monitors all active PNP streams and identifies the best provincial opportunities for your profile, guiding you through the two-stage nomination and permanent residence application process.",
      ],
    },
    extra: {
      paragraphs: [
        "Express Entry profile optimization is one of the most impactful services we offer. A higher CRS score dramatically increases your chances of receiving an ITA in competitive draws. ZF Canada reviews every factor — age, education, language scores, Canadian work experience, job offers, and provincial nominations — and provides a clear action plan to boost your score.",
        "Provincial Nominee Programs are constantly evolving, with new streams opening and closing regularly. Our consultants track every provincial program and alert you when a stream aligns with your occupation and experience, ensuring you never miss a valuable opportunity to receive a provincial nomination.",
        "Once you receive an Invitation to Apply (ITA) or a provincial nomination, the permanent residence application itself must be submitted accurately and completely within strict deadlines. ZF Canada prepares your full application package — collecting police certificates, medical exams, biographical documents, and settlement funds proof — to ensure a smooth and timely transition to permanent residence.",
      ],
    },
  },

  "svc-sponsorship": {
    hero: { title: "Sponsorship" },
    detail: {
      heading: "Family Sponsorship in Canada",
      paragraphs: [
        "Canada's Family Sponsorship program allows Canadian citizens and permanent residents to reunite with their loved ones by sponsoring them for permanent residence. Whether you wish to sponsor a spouse, common-law partner, dependent children, parents, grandparents, or other eligible relatives, ZF Canada's experienced RCIC-IRB consultants are here to guide both you and your sponsored family members through every stage of the process.",
        "The sponsorship process involves two simultaneous assessments: the sponsor's eligibility and the sponsored person's admissibility. Both parts must be carefully prepared to avoid delays or refusals. Our team reviews your financial situation, relationship documentation, and the sponsored person's background to identify and address potential concerns before they become problems.",
        "Sponsorship applications — particularly those involving spouses or partners — are subject to heightened scrutiny to ensure the genuineness of the relationship. ZF Canada helps you gather compelling evidence of your relationship and present it in a clear, organized manner that satisfies immigration officers. If a sponsorship has been refused, we also assist with appeals to the Immigration Appeal Division (IAD).",
      ],
    },
    extra: {
      paragraphs: [
        "Spousal and partner sponsorship is one of the most personal immigration pathways, and we treat it with the care it deserves. Our consultants help you compile a comprehensive relationship package — photographs, communication records, financial ties, and statutory declarations — to demonstrate the genuineness of your relationship beyond any doubt.",
        "Parent and Grandparent sponsorship under the Super Visa program or the annual lottery requires careful planning and precise timing. ZF Canada monitors program openings and ensures your application is complete, accurate, and submitted at the right moment to maximize your chances of success.",
        "If your sponsorship application has been refused or your relationship is being questioned, ZF Canada can represent you at an Immigration Appeal Division (IAD) hearing. Our RCIC-IRB consultants are authorized to appear at the IRB and will advocate strongly on your behalf to reunite you with your family.",
      ],
    },
  },

  "svc-temporary-residence": {
    hero: { title: "Temporary Residence" },
    detail: {
      heading: "Temporary Residence in Canada",
      paragraphs: [
        "Temporary residence allows individuals to visit, study, or work in Canada for a defined period. Whether you are applying for a Temporary Resident Visa (TRV), an Electronic Travel Authorization (eTA), a study permit, or a work permit, the application process requires careful attention to eligibility criteria, documentation, and how your personal circumstances are presented. ZF Canada's RCIC-IRB consultants ensure your application is complete, accurate, and compelling.",
        "Visitor visas are frequently refused when officers are not satisfied that the applicant will leave Canada at the end of their authorized stay. Our team helps you demonstrate strong ties to your home country — including employment, family, property, and financial commitments — while also clearly establishing the genuine purpose of your visit to Canada.",
        "For study and work permit applicants, eligibility requirements have become increasingly detailed and program-specific. ZF Canada keeps up with the latest IRCC policy changes and ensures your application under the correct stream — whether PGWP, LMIA-based, LMIA-exempt, or otherwise — is submitted correctly the first time. We also assist with extensions and changes to conditions once you are already in Canada.",
      ],
    },
    extra: {
      paragraphs: [
        "Visitor visa refusals are often the result of an officer's concern about the applicant's intent to return home. ZF Canada prepares a strong application package that clearly communicates your ties to your home country, your purpose of visit, and your financial ability to support yourself during your stay in Canada.",
        "Study and work permits are increasingly subject to policy changes and processing backlogs. Our consultants monitor IRCC updates in real time and advise you on the best strategy — including whether to apply from inside or outside Canada — to minimize delays and maximize your chances of approval.",
        "If you are already in Canada and need to extend your status, restore your status after it lapses, or change the conditions of your permit, ZF Canada provides prompt, accurate assistance to keep your temporary residence lawful and uninterrupted.",
      ],
    },
  },

  "svc-refugee-claim": {
    hero: { title: "Refugee Claim Application" },
    detail: {
      heading: "Refugee Claim Applications in Canada",
      paragraphs: [
        "Canada's refugee protection system offers safety to individuals who face persecution, torture, or cruel and unusual treatment in their home country. Filing a refugee claim is a complex, multi-stage legal process with strict timelines and documentation requirements. At ZF Canada, our RCIC-IRB consultants — authorized to appear before the Immigration and Refugee Board (IRB) — provide expert support at every stage of your claim.",
        "A successful refugee claim requires a compelling and well-documented Basis of Claim (BOC) form that clearly establishes your fear of persecution and the connection to one of the five protected grounds: race, religion, nationality, political opinion, or membership in a particular social group. Our team helps you prepare a thorough and coherent narrative supported by country condition evidence and personal documentation.",
        "If your refugee claim has been rejected, options may include a Pre-Removal Risk Assessment (PRRA), appeal to the Refugee Appeal Division (RAD), or Judicial Review at the Federal Court. ZF Canada assesses your situation quickly and moves to protect your safety and status in Canada without delay.",
      ],
    },
    extra: {
      paragraphs: [
        "The Basis of Claim (BOC) form is the foundation of your refugee hearing. ZF Canada works closely with you to document your personal history, your fear of persecution, and the reasons you cannot return to your home country — creating a clear, credible, and complete narrative for the Refugee Protection Division (RPD).",
        "Country condition evidence plays a critical role in refugee hearings. Our consultants gather current and authoritative documentation — including reports from human rights organizations, government country reports, and news sources — that corroborates your personal account and demonstrates the general risk faced by people in your situation.",
        "If your claim is rejected and you wish to appeal to the Refugee Appeal Division (RAD) or seek Judicial Review at the Federal Court, ZF Canada moves swiftly to meet strict filing deadlines. Our RCIC-IRB consultants are experienced in appellate proceedings and will advocate effectively on your behalf at every level of review.",
      ],
    },
  },

  "svc-irb-hearings": {
    hero: { title: "IRB – Hearing & Appeals" },
    detail: {
      heading: "IRB Hearings & Appeals",
      paragraphs: [
        "The Immigration and Refugee Board (IRB) is Canada's largest independent administrative tribunal, responsible for making decisions on immigration and refugee matters. ZF Canada's RCIC-IRB consultants hold the designation that authorizes them to appear and represent clients before all four IRB divisions: the Refugee Protection Division (RPD), the Refugee Appeal Division (RAD), the Immigration Division (ID), and the Immigration Appeal Division (IAD).",
        "Whether you are attending a refugee hearing, appealing a deportation order, challenging a sponsorship refusal, or responding to a removal or inadmissibility proceeding, having a qualified representative who knows IRB procedures inside and out is essential. Our consultants prepare meticulous submissions, gather the strongest evidence, and advocate effectively on your behalf at every hearing.",
        "IRB proceedings are governed by strict rules of procedure and tight deadlines. Missing a filing deadline or submitting insufficient evidence can be fatal to your case. ZF Canada ensures your case is always prepared well in advance — with comprehensive legal arguments, organized documentary evidence, and thorough witness preparation — so you walk into your hearing with confidence.",
      ],
    },
    extra: {
      paragraphs: [
        "Preparation is the cornerstone of a successful IRB hearing. ZF Canada begins working with you well before your hearing date — reviewing all documentary evidence, identifying weaknesses in the opposing case, preparing you for questions from the adjudicator, and ensuring every procedural requirement is met on time.",
        "The Immigration Appeal Division (IAD) hears appeals on sponsorship refusals, removal orders, and residency obligation decisions. Our consultants have extensive experience before the IAD and understand how to frame arguments persuasively, present compelling humanitarian and compassionate factors, and challenge procedural or substantive errors in the original decision.",
        "If an IRB decision is legally flawed, Judicial Review at the Federal Court may be available. While ZF Canada's consultants handle IRB representation directly, we work closely with immigration lawyers when Federal Court proceedings are required — ensuring seamless, coordinated advocacy throughout your entire case.",
      ],
    },
  },

  "svc-refused-applications": {
    hero: { title: "Refused Applications" },
    detail: {
      heading: "Refused Applications in Canada",
      paragraphs: [
        "Dealing with refused applications in Canada can be frustrating and discouraging, but it does not mean the end of your immigration journey. Many applications are refused due to incomplete documentation, missing information, or submission errors. At ZF Canada, we specialize in reviewing refused applications, identifying the reasons for refusal, and preparing stronger reapplications or appeals to improve your chances of approval.",
        "Our team has extensive experience handling refused applications across various categories, including sponsorships, permanent residency, visitor visas, study permits, work permits, and Humanitarian & Compassionate cases. We carefully assess each case and develop customized strategies to address the specific concerns raised by immigration officers, ensuring your next application is as strong as possible.",
        "At ZF Canada, we understand the urgency and stress that comes with a refused immigration application. Our Regulated Canadian Immigration Consultants (RCIC-IRB) are committed to providing timely and effective solutions. Whether you need to reapply, file a reconsideration request, or appeal to the Immigration and Refugee Board (IRB), we are here to guide you every step of the way.",
      ],
    },
    extra: {
      paragraphs: [
        "Our team of Regulated Canadian Immigration Consultants (RCIC-IRB) has a proven track record of successfully overturning refused applications across all visa and permit categories. We conduct a thorough review of your previous refusal letter, identify the exact grounds cited by the officer, and build a compelling reapplication or appeal tailored to address each concern.",
        "Whether your application was refused due to insufficient ties to your home country, inadequate financial documentation, or misrepresentation concerns, we develop a customized strategy that strengthens every aspect of your file. Our consultants stay current with IRCC policies and case law to give your application the best possible chance of approval.",
        "Time is often critical when dealing with a refusal. ZF Canada moves quickly to assess your situation, advise you on available legal remedies — including Judicial Review at the Federal Court if necessary — and begin building your next submission without delay. Reach out today for a confidential assessment of your case.",
      ],
    },
  },

  "svc-humanitarian-compassionate": {
    hero: { title: "Humanitarian & Compassionate" },
    detail: {
      heading: "Humanitarian & Compassionate Applications in Canada",
      paragraphs: [
        "Humanitarian & Compassionate (H&C) applications provide a pathway to permanent residence for individuals who do not meet the standard immigration requirements but have compelling personal circumstances that warrant special consideration. At ZF Canada, our RCIC-IRB consultants carefully assess your situation and build a thorough application that highlights the humanitarian factors, establishment in Canada, and best interests of any children involved.",
        "H&C applications are assessed on a case-by-case basis. Officers consider factors such as the degree of establishment in Canada, family ties, health conditions, and the hardship an applicant would face if required to leave. Our team ensures every relevant detail is documented clearly and persuasively to give your application the strongest possible foundation.",
        "Whether you are already in Canada on a temporary status, have been refused other immigration pathways, or face exceptional personal hardship, ZF Canada is here to evaluate your eligibility and guide you through every step of the H&C process. Contact us today for a confidential assessment.",
      ],
    },
    extra: {
      paragraphs: [
        "The strength of an H&C application lies in the quality and depth of the personal narrative and supporting evidence. ZF Canada works closely with you to document your establishment in Canada — employment history, community ties, tax records, and letters of support — and to present your case in the most compelling way possible.",
        "The best interests of children (BIOC) is a primary consideration in H&C applications involving minors. Our consultants ensure this factor is thoroughly addressed, with detailed evidence of the children's ties to Canada, their educational and social integration, and the impact that separation or removal would have on their well-being.",
        "H&C applications are often filed alongside other proceedings — such as Pre-Removal Risk Assessments (PRRAs) or appeals — to maximize protection while your status is being determined. ZF Canada coordinates all concurrent proceedings strategically, ensuring no deadline is missed and every available remedy is pursued.",
      ],
    },
  },

  "svc-inadmissibility": {
    hero: { title: "Inadmissibility" },
    detail: {
      heading: "Overcoming Inadmissibility to Canada",
      paragraphs: [
        "Being found inadmissible to Canada can feel like an insurmountable barrier, but it does not have to be the end of your journey. Inadmissibility can arise from criminal history, security concerns, health grounds, financial reasons, or misrepresentation. At ZF Canada, our RCIC-IRB consultants have the expertise to assess your specific inadmissibility ground and identify the most effective legal remedies available to you.",
        "Depending on the nature and severity of the inadmissibility, there are several potential solutions, including Temporary Resident Permits (TRPs), Criminal Rehabilitation applications, Minister's relief, or appeals before the Immigration Appeal Division (IAD). Our team carefully reviews your history and recommends the most appropriate pathway to restore your admissibility to Canada.",
        "ZF Canada takes a proactive approach to inadmissibility cases. We work diligently to gather the supporting documentation required, prepare comprehensive submissions, and represent your interests before immigration authorities. If you have been refused entry or told you are inadmissible, contact us today for a confidential evaluation of your options.",
      ],
    },
    extra: {
      paragraphs: [
        "Criminal inadmissibility is one of the most common grounds for refusal at the Canadian border or in visa applications. ZF Canada helps clients determine whether their offence renders them inadmissible under Canadian law, and if so, whether they are eligible for Criminal Rehabilitation — a permanent solution that removes the inadmissibility finding for most applicants.",
        "Temporary Resident Permits (TRPs) provide a short-term solution for individuals who are inadmissible but have a compelling reason to enter Canada — such as attending a family event, conducting business, or receiving medical treatment. Our consultants prepare strong TRP applications that clearly justify the need for entry despite the inadmissibility.",
        "Health inadmissibility — arising when a foreign national's condition is deemed a danger to public health, public safety, or would cause excessive demand on Canadian health or social services — can often be addressed with proper medical documentation and legal arguments. ZF Canada works with medical professionals and immigration authorities to present the strongest possible case for your admissibility.",
      ],
    },
  },

  "svc-misrepresentation": {
    hero: { title: "Misrepresentation" },
    detail: {
      heading: "Misrepresentation in Canadian Immigration",
      paragraphs: [
        "A misrepresentation finding under Canada's Immigration and Refugee Protection Act (IRPA) can have serious and long-lasting consequences, including a five-year bar from entering or applying for status in Canada. Misrepresentation can occur unintentionally — through errors, omissions, or the actions of a third-party representative — and can still result in a finding against you. At ZF Canada, we help clients understand the allegation, respond effectively, and explore all available remedies.",
        "Our RCIC-IRB consultants conduct a thorough review of your case — examining what information was provided, what was omitted, and whether the misrepresentation was direct or indirect. We then prepare a comprehensive response that addresses the officer's concerns, presents mitigating factors, and demonstrates your commitment to honest and transparent dealings with immigration authorities.",
        "If you have already received a misrepresentation finding, there are still options available, including Humanitarian & Compassionate grounds, Judicial Review at the Federal Court, and in some cases, an appeal before the Immigration Appeal Division. ZF Canada will assess your situation and recommend the most effective course of action. Do not wait — contact us as soon as possible, as strict deadlines apply.",
      ],
    },
    extra: {
      paragraphs: [
        "Responding to a procedural fairness letter (PFL) alleging misrepresentation is one of the most time-sensitive situations in immigration. ZF Canada moves quickly to prepare a thorough, well-reasoned response that addresses every allegation, presents all available evidence of innocent intent, and argues for a fair and proportionate outcome.",
        "If misrepresentation occurred through the actions of a fraudulent or negligent representative — commonly known as ghost consultant fraud — ZF Canada helps you document the third-party's actions and present a compelling case that you were a victim, not a willing participant in the misrepresentation.",
        "A misrepresentation finding does not always have to be final. Judicial Review at the Federal Court can challenge the legal validity of the finding, while Humanitarian & Compassionate applications can provide an alternative pathway to status for those who have established themselves in Canada. ZF Canada evaluates all options and pursues the most effective strategy for your specific circumstances.",
      ],
    },
  },

  "svc-pr-card-citizenship": {
    hero: { title: "PR Card / Citizenship" },
    detail: {
      heading: "PR Card Renewal & Canadian Citizenship",
      paragraphs: [
        "Maintaining your permanent resident status and ultimately achieving Canadian citizenship are two of the most important milestones in your immigration journey. ZF Canada provides expert guidance for PR card renewals, residency obligation compliance, Travel Document applications, and citizenship applications — ensuring you protect and build on the status you have worked hard to achieve.",
        "Permanent residents must meet the residency obligation — physically present in Canada for at least 730 days in every five-year period. If you have spent significant time outside Canada, your PR status may be at risk. ZF Canada reviews your travel history, assesses your residency obligation compliance, and advises you on the best approach, whether that is a straightforward renewal, a humanitarian argument, or an appeal before the Immigration Appeal Division (IAD).",
        "When it comes to Canadian citizenship, eligibility is determined by factors including physical presence (1,095 days in the five years before applying), language ability, and knowledge of Canada. ZF Canada helps you calculate your eligibility accurately, prepare your application, and address any complications — such as criminal records or prior absences — that could affect your citizenship grant.",
      ],
    },
    extra: {
      paragraphs: [
        "PR card renewals are straightforward when residency obligations are clearly met, but they become complex when travel history raises questions. ZF Canada conducts a thorough analysis of your travel records, calculates your days of physical presence precisely, and advises you on whether a humanitarian argument is needed to support your renewal application.",
        "If your PR card has expired while you are outside Canada, a Permanent Resident Travel Document (PRTD) is required to return. ZF Canada assists with urgent PRTD applications, helping you document your ties to Canada and any compelling reasons for your extended absence to secure approval as quickly as possible.",
        "Canadian citizenship is one of the most valuable statuses in the world, offering a Canadian passport, the right to vote, and full social benefits without the need to maintain residency obligations. ZF Canada guides you through every step of the citizenship application process — from eligibility calculations and language testing to the citizenship test and ceremony.",
      ],
    },
  },
};

// ── Deep-merge: fill missing keys from defaults without overwriting saved values ──

function deepMerge(defaults: unknown, saved: unknown): unknown {
  if (
    typeof defaults === "object" && defaults !== null && !Array.isArray(defaults) &&
    typeof saved   === "object" && saved   !== null && !Array.isArray(saved)
  ) {
    const out: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
    for (const key of Object.keys(saved as Record<string, unknown>)) {
      out[key] = deepMerge(
        (defaults as Record<string, unknown>)[key],
        (saved   as Record<string, unknown>)[key],
      );
    }
    return out;
  }
  return saved !== undefined ? saved : defaults;
}

// ── Public API ──────────────────────────────────────────────────────────────

export function getPageContent(slug: string): unknown {
  ensureDir();
  const fp = filePath(slug);
  const defaults = PAGE_DEFAULTS[slug] ?? {};

  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, JSON.stringify(defaults, null, 2), "utf8");
    return defaults;
  }

  try {
    const saved = JSON.parse(fs.readFileSync(fp, "utf8"));
    return deepMerge(defaults, saved);
  } catch {
    return defaults;
  }
}

export function setPageContent(slug: string, content: unknown): void {
  ensureDir();
  fs.writeFileSync(filePath(slug), JSON.stringify(content, null, 2), "utf8");
}

export function listPages(): { slug: string; label: string }[] {
  return [
    { slug: "home",            label: "Home Page"           },
    { slug: "about",           label: "About Us"            },
    { slug: "services",        label: "Services"            },
    { slug: "our-client",      label: "Our Client"          },
    { slug: "toronto",         label: "Toronto (Immigration Consultants)" },
    { slug: "free-assessment", label: "Free Assessment"     },
    { slug: "svc-permanent-residency",        label: "Service: Permanent Residency"        },
    { slug: "svc-sponsorship",                label: "Service: Sponsorship"                },
    { slug: "svc-temporary-residence",        label: "Service: Temporary Residence"        },
    { slug: "svc-refugee-claim",              label: "Service: Refugee Claim"              },
    { slug: "svc-irb-hearings",               label: "Service: IRB Hearings & Appeals"     },
    { slug: "svc-refused-applications",       label: "Service: Refused Applications"       },
    { slug: "svc-humanitarian-compassionate", label: "Service: Humanitarian & Compassionate" },
    { slug: "svc-inadmissibility",            label: "Service: Inadmissibility"            },
    { slug: "svc-misrepresentation",          label: "Service: Misrepresentation"          },
    { slug: "svc-pr-card-citizenship",        label: "Service: PR Card / Citizenship"      },
  ];
}
