import Image from "next/image";
import Link from "next/link";

type ServiceCard = { title: string; description: string; href: string; image?: string };

interface ServicesSectionProps {
  heading?: string;
  intro?: string;
  cards?: ServiceCard[];
}

const DEFAULT_CARDS: ServiceCard[] = [
  { title: "Refused Applications",         description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/refused-applications",        image: "/assets/svc-refused-applications.svg" },
  { title: "Humanitarian & Compassionate",  description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/humanitarian-compassionate", image: "/assets/svc-humanitarian-compassionate.svg" },
  { title: "Inadmissibility",               description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/inadmissibility",             image: "/assets/svc-inadmissibility.svg" },
  { title: "Misrepresentation",             description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/misrepresentation",           image: "/assets/svc-misrepresentation.svg" },
  { title: "Sponsorship",                   description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/sponsorship",                 image: "/assets/svc-sponsorship.svg" },
  { title: "Refugee Claim Application",     description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/refugee-claim",               image: "/assets/svc-6.png" },
  { title: "IRB – Hearing & Appeals",       description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/irb-hearings",               image: "/assets/svc-irb-hearings.svg" },
  { title: "Temporary Residence",           description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/temporary-residence",         image: "/assets/svc-temporary-residence.svg" },
  { title: "PR Card / Citizenship",         description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/pr-card-citizenship",         image: "/assets/svc-pr-card-citizenship.svg" },
  { title: "Permanent Residency",           description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/permanent-residency",         image: "/assets/svc-permanent-residency.webp" },
];

const LEGACY_IMAGE_MAP: Record<string, string> = {
  "/assets/svc-permanent-residency.svg": "/assets/svc-permanent-residency.webp",
};

function resolveServiceImage(image?: string) {
  if (!image) return "/assets/svc-refused-applications.svg";
  return LEGACY_IMAGE_MAP[image] ?? image;
}

export default function ServicesSection({
  heading = "ZF Immigration Solutions & Immigration Consultants offer services tailored to your needs",
  intro,
  cards,
}: ServicesSectionProps) {
  const items = cards !== undefined && cards.length > 0 ? cards : DEFAULT_CARDS;

  return (
    <section className="zfc-svc-list" aria-label="Our immigration services">
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
        <h2 className="zfc-svc-list__heading">{heading}</h2>
        {intro && <p className="zfc-svc-list__intro">{intro}</p>}
      </div>

      <div className="zfc-svc-list__grid">
        {items.map((svc, i) => (
          <article key={i} className="zfc-svc-card">
            <div className="zfc-svc-card__img-wrap">
              <Image
                src={resolveServiceImage(svc.image)}
                alt={svc.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                className="zfc-svc-card__img"
              />
            </div>
            <div className="zfc-svc-card__body">
              <h3 className="zfc-svc-card__title">{svc.title}</h3>
              <p className="zfc-svc-card__desc">{svc.description}</p>
              <Link href={svc.href} className="zfc-svc-card__cta">
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
