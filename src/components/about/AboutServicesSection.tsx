import Image from "next/image";

export default function AboutServicesSection() {
  return (
    <section className="zfc-about-services" aria-labelledby="about-services-heading">
      <div className="zfc-about-services__inner">

        {/* ── Left: stacked tilted photos over world map ── */}
        <div className="zfc-about-services__media">
          {/* World map decorative background */}
          <div className="zfc-about-services__map" aria-hidden="true">
            <Image
              src="/assets/faq-world-map.png"
              alt=""
              fill
              sizes="(max-width: 800px) 90vw, 45vw"
              className="zfc-about-services__map-img"
            />
          </div>

          {/* Back photo — tilted slightly counter-clockwise */}
          <div className="zfc-about-services__photo zfc-about-services__photo--back">
            <Image
              src="/assets/about-photo.png"
              alt="ZF Canada immigration consultation office"
              fill
              sizes="(max-width: 800px) 80vw, 36vw"
              className="zfc-about-services__photo-img"
            />
          </div>

          {/* Front photo — tilted slightly clockwise, offset to the right/bottom */}
          <div className="zfc-about-services__photo zfc-about-services__photo--front">
            <Image
              src="/assets/services-photo.png"
              alt="Client receiving immigration guidance"
              fill
              sizes="(max-width: 800px) 70vw, 32vw"
              className="zfc-about-services__photo-img"
            />
          </div>
        </div>

        {/* ── Right: badge · heading · body · CTA ── */}
        <div className="zfc-about-services__content">

          {/* Red badge */}
          <div className="zfc-about-services__badge">
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            ABOUT COMPANY
          </div>

          {/* Heading */}
          <h2 className="zfc-about-services__heading" id="about-services-heading">
            Comprehensive<br />Immigration Services
          </h2>

          {/* Body paragraphs */}
          <p className="zfc-about-services__body">
            ZF Canada is a leading immigration consultancy firm in Canada,
            dedicated to providing professional and reliable pathways to Canada.
            Established in 1992, we bring over 25 years of experience as a
            Licensed Immigration Consultant, helping clients achieve their
            immigration goals successfully.
          </p>
          <p className="zfc-about-services__body">
            Our team of Regulated Canadian Immigration Consultants (RCIC-IRB)
            offers expert guidance across all major immigration streams — from
            Express Entry and family sponsorship to study permits, work permits,
            and provincial nominee programs.
          </p>

          {/* CTA button */}
          <a href="/services" className="zfc-about-services__cta">
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            LEARN MORE
          </a>

        </div>
      </div>
    </section>
  );
}
