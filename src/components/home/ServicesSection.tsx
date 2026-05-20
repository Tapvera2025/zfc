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

        {/* Right — portrait photo with badge OUTSIDE the clipped image */}
        <div className="zfc-services__photo-outer">
          {/* Badge sits here, outside overflow:hidden */}
          <div className="zfc-services__no1" aria-label="No. 1 Immigration Service">
            <svg
              viewBox="0 0 80 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="zfc-services__laurel"
            >
              {/* Star */}
              <path
                d="M40 4l2.5 7.5H50l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z"
                fill="white"
              />
              {/* Left laurel leaves */}
              <path d="M25 18 C22 14 19 10 21 6 C23 10 25 14 27 18Z" fill="white" opacity="0.9"/>
              <path d="M20 22 C17 18 15 13 17 9 C19 13 21 17 23 22Z" fill="white" opacity="0.9"/>
              <path d="M16 27 C13 23 12 18 14 14 C16 18 17 22 19 27Z" fill="white" opacity="0.9"/>
              {/* Right laurel leaves */}
              <path d="M55 18 C58 14 61 10 59 6 C57 10 55 14 53 18Z" fill="white" opacity="0.9"/>
              <path d="M60 22 C63 18 65 13 63 9 C61 13 59 17 57 22Z" fill="white" opacity="0.9"/>
              <path d="M64 27 C67 23 68 18 66 14 C64 18 63 22 61 27Z" fill="white" opacity="0.9"/>
            </svg>
            <span className="zfc-services__no1-label">No. 1</span>
            <span className="zfc-services__no1-sub">Immigration<br />Service</span>
          </div>

          {/* Image clipped independently */}
          <div className="zfc-services__photo-wrap">
            <Image
              src="/assets/about-photo.png"
              alt="ZF Canada immigration clients celebrating"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
