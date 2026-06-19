export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/home/Footer";
import OurClientAccordion from "./OurClientAccordion";
import { getPageContent } from "@/lib/page-content-store";

const DEFAULTS = {
  hero:  { title: "Our Client", breadcrumb: "Our Client" },
  intro: {
    heading: "Our Client",
    paragraphs: [
      "Our clients include all types of prospective immigrants to Canada. We've served foreign skilled workers, students, refugees, entrepreneurs and most of all - businesses of all sizes (who seek us out for solutions to immigration issues related to human resources).",
      "In today's global market, borders no longer bind enterprises, and to remain competitive they must be able to relocate skilled professionals from abroad, quickly and efficiently. With a thorough knowledge of all government programs currently available to facilitate the entry of foreign workers, we focus on achieving this goal. We advise corporate clients on a broad spectrum of issues; from obtaining temporary employment authorizations for foreign workers and compliance that both protect the employers interests and are sensitive to the particular concerns of recently arrived employees. Our mission is to unite corporate clients with the skilled foreign professionals they require.",
    ],
  },
};

export default async function OurClientPage() {
  const raw = await getPageContent("our-client") as typeof DEFAULTS;
  const c = {
    hero:  { ...DEFAULTS.hero,  ...(raw?.hero  ?? {}) },
    intro: {
      heading:    raw?.intro?.heading    ?? DEFAULTS.intro.heading,
      paragraphs: raw?.intro?.paragraphs ?? DEFAULTS.intro.paragraphs,
    },
  };

  return (
    <div className="zfc-ourclient-page">
      <ServicesPageHeader activePage="Our Client" />

      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero zfc-oc-hero" aria-label="Our Client hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image src="/assets/our-client-hero.png" alt="" fill sizes="100vw" className="object-cover object-center" priority />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">{c.hero.title}</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">{c.hero.breadcrumb}</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="zfc-oc-intro" aria-label="About our clients">
        <div className="zfc-oc-intro__inner">
          <div className="zfc-oc-intro__text-col">
            <h2 className="zfc-oc-intro__heading">{c.intro.heading}</h2>
            <div className="zfc-oc-intro__body">
              {c.intro.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <div className="zfc-oc-intro__img-col">
            <Image
              src="/assets/our-client-intro.png"
              alt="Happy client consulting with ZF Canada"
              fill
              sizes="(max-width: 900px) 100vw, 34vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <OurClientAccordion />

      <TestimonialsSection />
      <Footer />
    </div>
  );
}
