import Image from "next/image";
import Link from "next/link";

const CARD_ICONS = [
  "/assets/service-icon-1.svg",
  "/assets/service-icon-2.svg",
  "/assets/service-icon-3.svg",
  "/assets/service-icon-4.svg",
];

type ServiceCard = { title: string; description: string; href: string };

interface ServicesSectionProps {
  heading?: string;
  intro?: string;
  cards?: ServiceCard[];
}

const DEFAULT_CARDS: ServiceCard[] = [
  { title: "Refused Applications",        description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/refused-applications" },
  { title: "Humanitarian & Compassionate",description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/humanitarian-compassionate" },
  { title: "Inadmissibility",             description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/inadmissibility" },
  { title: "Misrepresentation",           description: "We assist in reapplying and appealing refused immigration applications.", href: "/services/misrepresentation" },
];

export default function ServicesSection({
  heading = "Comprehensive Immigration Services",
  intro,
  cards,
}: ServicesSectionProps) {
  const items = cards !== undefined ? cards : DEFAULT_CARDS;

  return (
    <section className="zfc-services" aria-label="Our immigration services">
      {/* Badge */}
      <div className="zfc-services__badge-row">
        <span className="zfc-services__badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
          OUR SERVICES
        </span>
      </div>

      {/* Heading */}
      <h2 className="zfc-services__heading">{heading}</h2>
      {intro && <p className="zfc-services__intro">{intro}</p>}

      {/* Body: cards + image */}
      <div className="zfc-services__body">

        {/* Left — card grid */}
        <div className="zfc-services__grid">
          {items.map((svc, i) => (
            <article key={i} className="zfc-service-card">
              <div className="zfc-service-card__icon" aria-hidden="true">
                <Image
                  src={CARD_ICONS[i % CARD_ICONS.length]}
                  alt=""
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <h3 className="zfc-service-card__title">{svc.title}</h3>
              <p className="zfc-service-card__desc">{svc.description}</p>
              <Link href={svc.href} className="zfc-service-card__link">
                Explore More
              </Link>
            </article>
          ))}
        </div>

        {/* Right — provided composite image */}
        <div className="zfc-services__photo-outer">
          <Image
            src="/assets/home-services-composite.png"
            alt="No. 1 Immigration Service"
            width={518}
            height={729}
            sizes="(max-width: 1024px) 100vw, 38vw"
            className="zfc-services__photo-composite"
          />
        </div>

      </div>
    </section>
  );
}
