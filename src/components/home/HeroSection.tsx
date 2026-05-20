import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="zfc-hero"
      aria-label="Hero section – Welcome to ZF Canada"
    >
      {/* Background image */}
      <div className="zfc-hero__bg">
        <Image
          src="/assets/Rectangle_1.png"
          alt="Happy couple in Canada's wilderness – ZF Canada immigration consultants"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center right" }}
        />
        {/* Gradient overlay – dark on left, clear on right */}
        <div className="zfc-hero__overlay" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="zfc-hero__content">
        <div className="zfc-hero__text">
          <h1 className="zfc-hero__heading">
            Welcome to<br />
            ZF Canada
          </h1>
          <p className="zfc-hero__subheading font-sans">
            Trusted &amp; Licensed Immigration<br className="hidden md:block" />
            Consultant Firm in Canada
          </p>
          <div className="zfc-hero__cta-group">
            <Link href="/about" className="zfc-btn zfc-btn--red" id="hero-explore-btn">
              Explore More <span className="text-lg leading-none">↘</span>
            </Link>
            <Link href="/contact" className="zfc-btn zfc-btn--red" id="hero-consultation-btn">
              Book a Consultation <span className="text-lg leading-none">↘</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
