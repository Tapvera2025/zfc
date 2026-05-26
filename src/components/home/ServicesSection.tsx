import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    icon: "/assets/service-icon-1.svg",
    title: "Refused Applications",
    description:
      "We assist in reapplying and appealing refused immigration applications.",
    href: "/services/refused-applications",
  },
  {
    id: 2,
    icon: "/assets/service-icon-2.svg",
    title: "Humanitarian & Compassionate",
    description:
      "We assist in reapplying and appealing refused immigration applications.",
    href: "/services/humanitarian-compassionate",
  },
  {
    id: 3,
    icon: "/assets/service-icon-3.svg",
    title: "Inadmissibility",
    description:
      "We assist in reapplying and appealing refused immigration applications.",
    href: "/services/inadmissibility",
  },
  {
    id: 4,
    icon: "/assets/service-icon-4.svg",
    title: "Misrepresentation",
    description:
      "We assist in reapplying and appealing refused immigration applications.",
    href: "/services/misrepresentation",
  },
];

export default function ServicesSection() {
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
      <h2 className="zfc-services__heading">
        Comprehensive Immigration Services
      </h2>

      {/* Body: cards + image */}
      <div className="zfc-services__body">

        {/* Left — 2×2 card grid */}
        <div className="zfc-services__grid">
          {services.map((svc) => (
            <article key={svc.id} className="zfc-service-card">
              <div className="zfc-service-card__icon" aria-hidden="true">
                <Image
                  src={svc.icon}
                  alt=""
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <h3 className="zfc-service-card__title">{svc.title}</h3>
              <p className="zfc-service-card__desc">{svc.description}</p>
              <Link href={svc.href} className="zfc-service-card__link">
                Explore More &nearr;
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
