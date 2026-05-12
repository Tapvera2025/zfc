import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="zfc-footer">
      {/* Map background texture */}
      <div className="zfc-footer__map-bg" aria-hidden="true">
        <Image
          src="/assets/footer-map.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── Newsletter Card ── */}
      <div className="zfc-footer__newsletter-wrap">
        <div className="zfc-footer__newsletter-card">
          {/* Mailbox illustration — inside card, flush to bottom */}
          <div className="zfc-footer__mailbox">
            <Image
              src="/assets/mailbox.png"
              alt="Newsletter mailbox"
              width={273}
              height={273}
              className="zfc-footer__mailbox-img"
            />
          </div>

          {/* Newsletter text + form */}
          <div className="zfc-footer__newsletter-content">
            <h3 className="zfc-footer__newsletter-heading">
              Subscribe to our newsletter for the latest updates and insights.
            </h3>
            <div className="zfc-footer__newsletter-form">
              <span className="zfc-footer__newsletter-at">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="zfc-footer__newsletter-input"
              />
              <button className="zfc-footer__newsletter-btn">Subscribe</button>
            </div>
            <p className="zfc-footer__newsletter-sub">
              Stay ahead with the latest updates, insights, and events from ZF Canada.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main body: logo col + 3 nav cols ── */}
      <div className="zfc-footer__body">
        {/* Logo + tagline + social */}
        <div>
          <div className="zfc-footer__logo-wrap">
            <Image
              src="/assets/zfc-logo-final-01-1-1_2.png"
              alt="ZF Canada"
              width={140}
              height={60}
              className="object-contain"
              style={{ width: "140px", height: "auto" }}
            />
          </div>
          <p className="zfc-footer__tagline">
            We Speak for you, We make the<br />law work for you
          </p>
          <p className="zfc-footer__description">
            ZF Canada is a leading immigration<br />consultancy firm in Canada.
          </p>
          <div className="zfc-footer__socials">
            {/* Facebook */}
            <Link href="#" className="zfc-footer__social-btn" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </Link>
            {/* Instagram */}
            <Link href="#" className="zfc-footer__social-btn" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </Link>
            {/* Google+ */}
            <Link href="#" className="zfc-footer__social-btn" aria-label="Google Plus">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
              </svg>
            </Link>
            {/* X / Twitter */}
            <Link href="#" className="zfc-footer__social-btn" aria-label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link href="#" className="zfc-footer__social-btn" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="zfc-footer__col-heading">Company</h4>
          <ul className="zfc-footer__nav">
            <li><Link href="#">About us</Link></li>
            <li><Link href="#">Services</Link></li>
            <li><Link href="#">Community</Link></li>
            <li><Link href="#">Testimonial</Link></li>
          </ul>
        </div>

        {/* Our communities */}
        <div>
          <h4 className="zfc-footer__col-heading">Our communities</h4>
          <ul className="zfc-footer__nav">
            <li><Link href="#">ZF Communities</Link></li>
            <li><Link href="#">ZF Forum</Link></li>
            <li><Link href="#">ZF Chat</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="zfc-footer__col-heading">Contact</h4>
          <ul className="zfc-footer__contact">
            <li className="zfc-footer__contact-item">
              <div className="zfc-footer__contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span className="zfc-footer__contact-text">+1 (905) 858-5589</span>
            </li>
            <li className="zfc-footer__contact-item">
              <div className="zfc-footer__contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span className="zfc-footer__contact-text">info@zfcanada.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="zfc-footer__bottom">
        <p className="zfc-footer__copyright">
          Copyright 2026 ZF Canada. All Right Reserved By Tapvera Technologies Pvt. Ltd.
        </p>
        <div className="zfc-footer__bottom-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Legal</Link>
          <Link href="#">Site Map</Link>
        </div>
      </div>
    </footer>
  );
}
