import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    slug: "refused-applications",
    title: "Refused Applications",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-1.png",
  },
  {
    id: 2,
    slug: "humanitarian-compassionate",
    title: "Humanitarian & Compassionate",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-2.png",
  },
  {
    id: 3,
    slug: "inadmissibility",
    title: "Inadmissibility",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-3.png",
  },
  {
    id: 4,
    slug: "misrepresentation",
    title: "Misrepresentation",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-4.png",
  },
  {
    id: 5,
    slug: "sponsorship",
    title: "Sponsorship",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-5.png",
  },
  {
    id: 6,
    slug: "refugee-claim",
    title: "Refugee Claim Application",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-6.png",
  },
  {
    id: 7,
    slug: "irb-hearings",
    title: "IRB – Hearing & Appeals",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-7.png",
  },
  {
    id: 8,
    slug: "temporary-residence",
    title: "Temporary Residence",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-8.png",
  },
  {
    id: 9,
    slug: "pr-card-citizenship",
    title: "PR Card / Citizenship",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-9.png",
  },
  {
    id: 10,
    slug: "permanent-residency",
    title: "Permanent Residency",
    description: "We assist in reapplying and appealing refused immigration applications.",
    image: "/assets/svc-10.png",
  },
];

export default function ServicesListSection() {
  return (
    <section className="zfc-svc-list" aria-labelledby="svc-list-heading">
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
          Choose Required Services<br />From Our List
        </h2>
      </div>

      {/* Grid */}
      <div className="zfc-svc-list__grid">
        {services.map((svc) => (
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
