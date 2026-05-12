import Image from "next/image";

export default function AboutIntroSection() {
  return (
    <section className="zfc-about-intro" aria-labelledby="about-intro-heading">

      {/* ── Top: two-column — badge+heading LEFT · body text RIGHT ── */}
      <div className="zfc-about-intro__top">

        {/* Left column */}
        <div className="zfc-about-intro__left">
          {/* Red badge */}
          <div className="zfc-about-intro__badge">
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            ABOUT ZF CANADA
          </div>

          {/* Heading */}
          <h2 className="zfc-about-intro__heading" id="about-intro-heading">
            We help Making Your<br />Dream Into Reality
          </h2>
        </div>

        {/* Right column — body text */}
        <div className="zfc-about-intro__right">
          <p className="zfc-about-intro__body">
            ZF Canada is a leading immigration consultancy firm in Canada,
            dedicated to providing professional and reliable pathways to Canada.
            Established in 1992, we bring over 25 years of experience as a
            Licensed Immigration Consultant Canada, helping clients achieve
            their immigration goals successfully.
          </p>
          <p className="zfc-about-intro__body">
            ZF Canada is a leading immigration consultancy firm in Canada,
            dedicated to providing professional and reliable pathways to Canada.
          </p>
        </div>
      </div>

      {/* ── Full-width photo ── */}
      <div className="zfc-about-intro__photo-wrap">
        <Image
          src="/assets/about-photo.png"
          alt="ZF Canada immigration consultant meeting with a client"
          fill
          sizes="(max-width: 960px) 100vw, 90vw"
          className="zfc-about-intro__photo-img"
          priority={false}
        />
      </div>

    </section>
  );
}
