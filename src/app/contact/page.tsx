import type { Metadata } from "next";
import ContactPageHeader from "@/components/contact/ContactPageHeader";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ContactFormCard from "@/components/contact/ContactFormCard";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Contact Us – ZF Canada Immigration Consultants",
  description:
    "Get in touch with ZF Canada's Regulated Canadian Immigration Consultants. Book a consultation or reach us by phone, email, or visit our Mississauga office.",
};

export default function ContactPage() {
  return (
    <div className="zfc-contact-page">
      <ContactPageHeader />

      <div className="zfc-about-hero-wrap">
        <ServiceDetailHero
          title="Contact Us"
          image="/assets/services-hero-main.png"
          breadcrumb="Contact us"
        />
      </div>

      {/* ── Find Our Office section ── */}
      <section className="zfc-office">
        <div className="zfc-office__inner">

          {/* Heading */}
          <div className="zfc-office__header">
            <h2 className="zfc-office__heading">FIND OUR OFFICE</h2>
            <p className="zfc-office__sub">Explore Our Office Worldwide</p>
          </div>

          {/* Three info items */}
          <div className="zfc-office__info-row">

            <div className="zfc-office__info-item">
              <div className="zfc-office__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="zfc-office__info-body">
                <span className="zfc-office__info-label">Call</span>
                <a href="tel:+19058585589" className="zfc-office__info-value">+1 (905) 858-5589</a>
              </div>
            </div>

            <div className="zfc-office__info-item">
              <div className="zfc-office__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="zfc-office__info-body">
                <span className="zfc-office__info-label">Email</span>
                <a href="mailto:info@zfcanada.com" className="zfc-office__info-value">info@zfcanada.com</a>
              </div>
            </div>

            <div className="zfc-office__info-item">
              <div className="zfc-office__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="zfc-office__info-body">
                <span className="zfc-office__info-label">Location</span>
                <span className="zfc-office__info-value">
                  214-808 Britannia Rd W,<br />
                  Mississauga, ON L5V 0A7,<br />
                  Canada
                </span>
              </div>
            </div>

          </div>

          {/* Google Map embed */}
          <div className="zfc-office__map-wrap">
            <iframe
              className="zfc-office__map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.2!2d-79.6854!3d43.6002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47a3b3e2b4e5%3A0x7e1e6a4e2c0a4e2b!2s808%20Britannia%20Rd%20W%20%23214%2C%20Mississauga%2C%20ON%20L5V%200A7%2C%20Canada!5e0!3m2!1sen!2sca!4v1699999999999!5m2!1sen!2sca"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ZF Canada Office Location"
            />
          </div>

        </div>
      </section>

      {/* ── Let's Contact heading + reused form ── */}
      <div className="zfc-contact-page__form-wrap">
        <div className="zfc-contact-page__form-header">
          <h2 className="zfc-contact-page__form-heading">LET&apos;S CONTACT</h2>
          <p className="zfc-contact-page__form-sub">Don&apos;t Hesitate to Contact Us</p>
        </div>
        <ContactFormCard />
      </div>

      {/* ── CTA Banner ── */}
      <section className="zfc-contact-cta" aria-label="Call to action">
        <div className="zfc-contact-cta__inner">
          <h2 className="zfc-contact-cta__heading">
            Choose The Right<br />Way to Canada
          </h2>
          <div className="zfc-contact-cta__right">
            <p className="zfc-contact-cta__text">
              Navigate your immigration journey with clarity, expert guidance, and the right strategy.
            </p>
            <a href="/services" className="zfc-contact-cta__btn">
              Service More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
