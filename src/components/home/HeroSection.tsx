import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  title = "Welcome to\nZF Canada",
  subtitle = "Immigration Consultants Canada",
  description = "Book a consultation with trusted immigration consultants in Canada to explore your visa, PR, and permit options.",
  ctaText = "Explore More",
  ctaHref = "/about",
}: HeroSectionProps) {
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
            {title.split(/\n|\\n/).map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="zfc-hero__subheading">{subtitle}</p>
          {description && (
            <p className="zfc-hero__body">{description}</p>
          )}
          <div className="zfc-hero__cta-group">
            <Link href={ctaHref} className="zfc-btn zfc-btn--red" id="hero-explore-btn">
              {ctaText} <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/book-consultation" className="zfc-btn zfc-btn--red" id="hero-consultation-btn">
              Book a Consultation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
