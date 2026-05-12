import Image from "next/image";
import Link from "next/link";

export default function ServicesHero() {
  return (
    <section className="zfc-about-hero" aria-label="Our Services hero">
      {/* Background image */}
      <div className="zfc-about-hero__bg" aria-hidden="true">
        <Image
          src="/assets/services-hero-main.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="zfc-about-hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="zfc-about-hero__content">
        <h1 className="zfc-about-hero__title">Our Services</h1>
        <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span className="zfc-about-hero__breadcrumb-current">Our Services</span>
        </nav>
      </div>
    </section>
  );
}
