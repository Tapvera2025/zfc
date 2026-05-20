"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/home/Footer";

/* ── Accordion data ─────────────────────────────────────── */
const ACCORDION_SECTIONS = [
  {
    title: "Federal Links",
    defaultOpen: true,
    links: [
      { label: "Government of Canada",  href: "https://www.canada.ca" },
      { label: "Revenue Canada Agency", href: "https://www.canada.ca/en/revenue-agency.html" },
      { label: "Bank of Canada",        href: "https://www.bankofcanada.ca" },
    ],
  },
  {
    title: "Provincial Links",
    defaultOpen: false,
    links: [
      { label: "Ontario",                href: "https://www.ontario.ca" },
      { label: "British Columbia",       href: "https://www2.gov.bc.ca" },
      { label: "Alberta",                href: "https://www.alberta.ca" },
      { label: "Quebec",                 href: "https://www.quebec.ca" },
      { label: "Manitoba",              href: "https://www.gov.mb.ca" },
      { label: "Saskatchewan",          href: "https://www.saskatchewan.ca" },
    ],
  },
  {
    title: "City Specific Links",
    defaultOpen: false,
    links: [
      { label: "City of Mississauga",   href: "https://www.mississauga.ca" },
      { label: "City of Toronto",        href: "https://www.toronto.ca" },
      { label: "City of Vancouver",      href: "https://vancouver.ca" },
      { label: "City of Calgary",        href: "https://www.calgary.ca" },
      { label: "City of Ottawa",         href: "https://ottawa.ca" },
    ],
  },
  {
    title: "Current Weather",
    defaultOpen: false,
    links: [
      { label: "The Weather Network",   href: "https://www.theweathernetwork.com" },
      { label: "Environment Canada",    href: "https://weather.gc.ca" },
    ],
  },
  {
    title: "Job Search",
    defaultOpen: false,
    links: [
      { label: "Job Bank – Government of Canada", href: "https://www.jobbank.gc.ca" },
      { label: "Indeed Canada",                   href: "https://ca.indeed.com" },
      { label: "LinkedIn Jobs",                   href: "https://www.linkedin.com/jobs" },
      { label: "Workopolis",                      href: "https://www.workopolis.com" },
    ],
  },
  {
    title: "Newspapers",
    defaultOpen: false,
    links: [
      { label: "The Globe and Mail",  href: "https://www.theglobeandmail.com" },
      { label: "Toronto Star",        href: "https://www.thestar.com" },
      { label: "National Post",       href: "https://nationalpost.com" },
      { label: "CBC News",            href: "https://www.cbc.ca/news" },
    ],
  },
];

/* ── Chevron icon ──────────────────────────────────────── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`zfc-oc-accordion__chevron${open ? " zfc-oc-accordion__chevron--open" : ""}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Single accordion item ─────────────────────────────── */
function AccordionItem({
  title, links, defaultOpen,
}: { title: string; links: { label: string; href: string }[]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="zfc-oc-accordion">
      <div
        className="zfc-oc-accordion__header"
        onClick={() => setOpen((v) => !v)}
        role="button"
        aria-expanded={open}
      >
        <span className="zfc-oc-accordion__title">{title}</span>
        <ChevronIcon open={open} />
      </div>
      <div className={`zfc-oc-accordion__body${open ? " zfc-oc-accordion__body--open" : ""}`}>
        <ul className="zfc-oc-accordion__links">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="zfc-oc-accordion__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function OurClientPage() {
  return (
    <div className="zfc-ourclient-page">
      <ServicesPageHeader activePage="Our Client" />

      {/* Hero */}
      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero" aria-label="Our Client hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image
              src="/assets/services-hero-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">Our Client</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">Our Client</span>
            </nav>
          </div>
        </section>
      </div>

      {/* Intro — text + image */}
      <section className="zfc-oc-intro" aria-label="About our clients">
        <div className="zfc-oc-intro__inner">
          {/* Text */}
          <div className="zfc-oc-intro__text-col">
            <h2 className="zfc-oc-intro__heading">Our Client</h2>
            <div className="zfc-oc-intro__body">
              <p>
                Our clients include all types of prospective immigrants to Canada. We've served
                foreign skilled workers, students, refugees, entrepreneurs and most of all –
                businesses of all sizes (who seek us out for solutions to immigration issues
                related to human resources).
              </p>
              <p>
                In today's global market, borders no longer bind enterprises, and to remain
                competitive they must be able to relocate skilled professionals from abroad,
                quickly and efficiently. With a thorough knowledge of all government programs
                currently available to facilitate the entry of foreign workers, we focus on
                achieving this goal. We advise corporate clients on a broad spectrum of issues;
                from obtaining temporary employment authorizations for foreign workers and
                compliance that both protect the employers interests and are sensitive to the
                particular concerns of recently arrived employees. Our mission is to unite
                corporate clients with the skilled foreign professionals they require.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="zfc-oc-intro__img-col">
            <Image
              src="/assets/services-photo.png"
              alt="Happy client consulting with ZF Canada"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Accordion links */}
      <section className="zfc-oc-links" aria-label="Useful links">
        <div className="zfc-oc-links__inner">
          {ACCORDION_SECTIONS.map((section) => (
            <AccordionItem key={section.title} {...section} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
}
