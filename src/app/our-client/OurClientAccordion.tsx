"use client";

import { useState } from "react";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={"zfc-oc-accordion__chevron" + (open ? " zfc-oc-accordion__chevron--open" : "")}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

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
      <div className={"zfc-oc-accordion__body" + (open ? " zfc-oc-accordion__body--open" : "")}>
        <ul className="zfc-oc-accordion__links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="zfc-oc-accordion__link" target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
      { label: "Ontario",          href: "https://www.ontario.ca" },
      { label: "British Columbia", href: "https://www2.gov.bc.ca" },
      { label: "Alberta",          href: "https://www.alberta.ca" },
      { label: "Quebec",           href: "https://www.quebec.ca" },
      { label: "Manitoba",         href: "https://www.gov.mb.ca" },
      { label: "Saskatchewan",     href: "https://www.saskatchewan.ca" },
    ],
  },
  {
    title: "City Specific Links",
    defaultOpen: false,
    links: [
      { label: "City of Mississauga", href: "https://www.mississauga.ca" },
      { label: "City of Toronto",     href: "https://www.toronto.ca" },
      { label: "City of Vancouver",   href: "https://vancouver.ca" },
      { label: "City of Calgary",     href: "https://www.calgary.ca" },
      { label: "City of Ottawa",      href: "https://ottawa.ca" },
    ],
  },
  {
    title: "Current Weather",
    defaultOpen: false,
    links: [
      { label: "The Weather Network", href: "https://www.theweathernetwork.com" },
      { label: "Environment Canada",  href: "https://weather.gc.ca" },
    ],
  },
  {
    title: "Job Search",
    defaultOpen: false,
    links: [
      { label: "Job Bank - Government of Canada", href: "https://www.jobbank.gc.ca" },
      { label: "Indeed Canada",                   href: "https://ca.indeed.com" },
      { label: "LinkedIn Jobs",                   href: "https://www.linkedin.com/jobs" },
      { label: "Workopolis",                      href: "https://www.workopolis.com" },
    ],
  },
  {
    title: "Newspapers",
    defaultOpen: false,
    links: [
      { label: "The Globe and Mail", href: "https://www.theglobeandmail.com" },
      { label: "Toronto Star",       href: "https://www.thestar.com" },
      { label: "National Post",      href: "https://nationalpost.com" },
      { label: "CBC News",           href: "https://www.cbc.ca/news" },
    ],
  },
];

export default function OurClientAccordion() {
  return (
    <section className="zfc-oc-links" aria-label="Useful links">
      <div className="zfc-oc-links__inner">
        {ACCORDION_SECTIONS.map((section) => (
          <AccordionItem key={section.title} {...section} />
        ))}
      </div>
    </section>
  );
}
