import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const services = [
  {
    id: 1,
    slug: "refused-applications",
    title: "Refused Applications",
    description: "We assist in reapplying and appealing refused immigration applications to improve your chances of approval.",
    image: "/assets/svc-refused-applications.svg",
  },
  {
    id: 2,
    slug: "humanitarian-compassionate",
    title: "Humanitarian & Compassionate",
    description: "Helping individuals gain permanent residency based on exceptional humanitarian circumstances.",
    image: "/assets/svc-humanitarian-compassionate.svg",
  },
  {
    id: 3,
    slug: "inadmissibility",
    title: "Inadmissibility",
    description: "Overcoming criminal, medical, or misrepresentation inadmissibility issues to restore your eligibility.",
    image: "/assets/svc-inadmissibility.svg",
  },
  {
    id: 6,
    slug: "refugee-claim",
    title: "Refugee Claim Application",
    description: "Helping asylum seekers file and defend refugee claims in Canada with comprehensive legal support.",
    image: "/assets/svc-6.png",
  },
  {
    id: 7,
    slug: "irb-hearings",
    title: "IRB – Hearing & Appeals",
    description: "Legal representation for immigration and refugee hearings across all four IRB divisions.",
    image: "/assets/svc-irb-hearings.svg",
  },
  {
    id: 8,
    slug: "temporary-residence",
    title: "Temporary Residence",
    description: "Assistance with visitor visas, work permits, super visas, and temporary stays in Canada.",
    image: "/assets/svc-temporary-residence.svg",
  },
  {
    id: 9,
    slug: "pr-card-citizenship",
    title: "PR Card / Citizenship",
    description: "Helping with PR card renewals, residency obligations, and Canadian citizenship applications.",
    image: "/assets/svc-pr-card-citizenship.svg",
  },
  {
    id: 10,
    slug: "permanent-residency",
    title: "Permanent Residency",
    description: "Guiding applicants through Express Entry, PNP, family sponsorship, and all PR pathways.",
    image: "/assets/svc-permanent-residency.svg",
  },
  {
    id: 4,
    slug: "misrepresentation",
    title: "Misrepresentation",
    description: "Providing false or misleading information can lead to refusals or a five-year ban. We help you respond.",
    image: "/assets/svc-misrepresentation.svg",
  },
  {
    id: 5,
    slug: "sponsorship",
    title: "Sponsorship",
    description: "Assisting in family reunification through spousal, common-law, and parent & grandparent sponsorship programs.",
    image: "/assets/svc-sponsorship.svg",
  },
];

interface ServicesListSectionProps {
  className?: string;
  excludeSlug?: string;
  heading?: ReactNode;
}

export default function ServicesListSection({
  className,
  excludeSlug,
  heading = <>Choose Required Services<br />From Our List</>,
}: ServicesListSectionProps) {
  const visibleServices = excludeSlug
    ? services.filter((service) => service.slug !== excludeSlug)
    : services;

  return (
    <section className={`zfc-svc-list${className ? ` ${className}` : ""}`} aria-labelledby="svc-list-heading">
      {/* Header */}
      <div className="zfc-svc-list__header">
        <div className="zfc-svc-list__badge">
          <svg
            width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          OUR SERVICES
        </div>
        <h2 className="zfc-svc-list__heading" id="svc-list-heading">
          {heading}
        </h2>
      </div>

      {/* Grid */}
      <div className="zfc-svc-list__grid">
        {visibleServices.map((svc) => (
          <article key={svc.id} className="zfc-svc-card">
            {/* Image */}
            <div className="zfc-svc-card__img-wrap">
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                className="zfc-svc-card__img"
              />
            </div>

            {/* Body */}
            <div className="zfc-svc-card__body">
              <h3 className="zfc-svc-card__title">{svc.title}</h3>
              <p className="zfc-svc-card__desc">{svc.description}</p>
              <Link
                href={`/services/${svc.slug}`}
                className="zfc-svc-card__cta"
              >
                Explore More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
