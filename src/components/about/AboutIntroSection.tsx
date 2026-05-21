import Image from "next/image";
import Link from "next/link";

export default function AboutIntroSection() {
  return (
    <section className="zfc-about-intro" aria-labelledby="about-intro-heading">

      {/* ── LEFT: two overlapping photos + ____6 decorative SVG ── */}
      <div className="zfc-about-intro__img-col">

        {/* Back photo — Rectangle_19 (office scene), upper-left, tilted left */}
        <div className="zfc-about-intro__img-back">
          <Image
            src="/assets/about-rect-19.png"
            alt="ZF Canada team at work"
            fill
            sizes="(max-width: 900px) 70vw, 32vw"
            className="object-cover object-center"
          />
        </div>

        {/* Front photo — Rectangle_13_2 (woman with passport), lower-right, tilted right */}
        <div className="zfc-about-intro__img-front">
          <Image
            src="/assets/about-rect-13-2.png"
            alt="Client holding passport"
            fill
            sizes="(max-width: 900px) 60vw, 28vw"
            className="object-cover object-center"
          />
        </div>

        {/* Decorative ____6 SVG — right edge, overlapping toward content */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/about-6.svg"
          alt=""
          aria-hidden="true"
          className="zfc-about-intro__deco-svg"
        />

      </div>

      {/* ── RIGHT: badge + heading + body + CTA ── */}
      <div className="zfc-about-intro__content-col">

        {/* Badge */}
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
          ABOUT COMPANY
        </div>

        {/* Heading */}
        <h2 className="zfc-about-intro__heading" id="about-intro-heading">
          Comprehensive<br />Immigration Services
        </h2>

        {/* Body */}
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
          Established in 1992, we bring over 25 years of experience as a
          Licensed Immigration Consultant Canada, helping clients achieve
          their immigration goals successfully.
        </p>

        {/* CTA */}
        <Link href="/about" className="zfc-about-intro__cta">
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          LEARN MORE
        </Link>

      </div>
    </section>
  );
}
