import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import Footer from "@/components/home/Footer";

const sections = [
  {
    title: "Contact Information",
    paragraphs: [
      "214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada\nPhone: +1 (905) 858-5589\nEmail: info@zfcanada.com",
    ],
  },
  {
    title: "Purpose",
    paragraphs: ["This Privacy Policy informs users of:"],
    list: [
      "Compliance with Canadian privacy law;",
      "Types of personal data collected;",
      "How collected data is used;",
      "Who has access to collected data;",
      "Users' rights; and",
      "Our cookie policy.",
    ],
  },
  {
    title: "Consent",
    paragraphs: [
      "By accessing and using our Site, you agree to the collection, use, and retention of your data as outlined in this Privacy Policy.",
    ],
  },
  {
    title: "Compliance with Canadian Privacy Law",
    paragraphs: [
      "Our Privacy Policy adheres to Canada's Personal Information Protection and Electronic Documents Act (PIPEDA). We are committed to protecting personal information collected in compliance with all relevant provincial and federal privacy regulations.",
    ],
  },
  {
    title: "Data Collected Automatically",
    list: ["Clicked links;", "Content viewed."],
  },
  {
    title: "Data Collected Non-Automatically",
    paragraphs: [
      'We collect the following personal information through our "Contact Us" and "Book Consultation" forms:',
    ],
    list: [
      "First and last name;",
      "Email address;",
      "Phone number;",
      "Program of interest;",
      "Location.",
    ],
  },
  {
    title: "Use of Personal Data",
    paragraphs: [
      "Data collected automatically is used for:\n- Statistical analysis;\n- Marketing purposes.\nData collected from forms is used for:\n- Communication purposes.",
    ],
  },
  {
    title: "Data Sharing",
    paragraphs: [],
  },
  {
    title: "Internal Sharing",
    paragraphs: [
      "Your data may be disclosed internally to employees who require access to fulfill the purposes described in this Privacy Policy.",
    ],
  },
  {
    title: "External Sharing",
    paragraphs: ["We do not sell or share your data with third parties except if:"],
    list: [
      "Required by law;",
      "Required for legal proceedings;",
      "Necessary to protect our legal rights;",
      "Involved in business transactions such as company sales.",
    ],
    note: "Note: External links on our Site are not governed by this Privacy Policy.",
  },
  {
    title: "Data Retention",
    accent: true,
    paragraphs: [
      "Your data will be stored until the intended purpose is fulfilled. You will be notified if your data is retained beyond this period.",
    ],
  },
  {
    title: "Data Security",
    accent: true,
    paragraphs: [
      "We employ advanced encryption, secure server storage, and strict employee confidentiality agreements. Despite rigorous security measures, absolute data security cannot be guaranteed due to inherent internet risks.",
    ],
  },
  {
    title: "Children's Privacy",
    accent: true,
    paragraphs: [
      "Our services are not intended for children under 13. If we inadvertently collect such data, we will delete it promptly upon notification by a parent or guardian.",
    ],
  },
  {
    title: "Your Rights",
    accent: true,
    paragraphs: [
      "You may request details about personal data we hold about you, including how it's used, disclosed, or to request modifications or deletion. Please contact our Privacy Officer:\n\n214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada\nPhone: +1 (905) 858-5589\nEmail: info@zfcanada.com",
    ],
  },
  {
    title: "Cookie Policy",
    accent: true,
    paragraphs: [
      "Cookies are small files stored on your device by websites, capturing browsing behaviors.",
    ],
  },
  {
    title: "Types of Cookies We Use",
    paragraphs: [
      "Analytical Cookies:\nEnhance site design and functionality through usage data.\n\nTargeting Cookies:\nPersonalize your site experience based on browsing habits.\n\nThird-Party Cookies:\nMonitor preferences to tailor advertisements to your interests.\n\nYou can manage cookies through your browser settings. Note, disabling cookies may impact your user experience.",
    ],
  },
  {
    title: "Policy Updates",
    paragraphs: [
      'This Privacy Policy may be periodically updated to reflect changes in practices or legal compliance. Updates will be indicated by a revised "Last Updated" date. We recommend reviewing this policy regularly. Major updates may also be communicated via email. For further questions, please contact our Privacy Officer listed above.',
    ],
  },
];

function renderText(text: string) {
  return text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < text.split("\n").length - 1 ? <br /> : null}
    </span>
  ));
}

export default function PrivacyPolicyPage() {
  return (
    <div className="zfc-privacy-page">
      <ServicesPageHeader activePage="" />

      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero zfc-privacy-hero" aria-label="Privacy Policy hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image
              src="/assets/our-client-hero.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">Privacy Policy</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">Privacy Policy</span>
            </nav>
          </div>
        </section>
      </div>

      <main className="zfc-privacy-content" aria-label="Privacy Policy content">
        <p className="zfc-privacy-lead">
          This Privacy Policy outlines how ZFCanada Immigration. ("ZFCanada," "we," "us," "our")
          collects, uses, protects, and discloses your personal information through our website
          zfcanada.com (the "Site"). By using our Site, you consent to this Privacy Policy.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="zfc-privacy-section">
            <h2 className={section.accent ? "zfc-privacy-section__title zfc-privacy-section__title--accent" : "zfc-privacy-section__title"}>
              {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="zfc-privacy-section__text">
                {renderText(paragraph)}
              </p>
            ))}
            {section.list ? (
              <ul className="zfc-privacy-section__list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.note ? <p className="zfc-privacy-section__note">{section.note}</p> : null}
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
