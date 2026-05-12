"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    active: true,
    hasDropdown: true,
    dropdown: [
      { label: "Express Entry",      href: "/services/express-entry" },
      { label: "Family Sponsorship", href: "/services/family-sponsorship" },
      { label: "Study Permit",       href: "/services/study-permit" },
      { label: "Work Permit",        href: "/services/work-permit" },
      { label: "Visitor Visa",       href: "/services/visitor-visa" },
      { label: "PNP Programs",       href: "/services/pnp" },
    ],
  },
  { label: "Blog",    href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function ServicesPageHeader() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="zfc-about-header">
      {/* ── Top info bar ── */}
      <div className="zfc-about-topbar">
        <div className="zfc-about-topbar__inner">
          <div className="zfc-about-topbar__location-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada</span>
          </div>
          <div className="zfc-about-topbar__right">
            <a href="mailto:info@zfcanada.com" className="zfc-about-topbar__contact-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>info@zfcanada.com</span>
            </a>
            <a href="tel:+19058585589" className="zfc-about-topbar__contact-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+1 (905) 858-5589</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <div className="zfc-about-nav">
        <div className="zfc-about-nav__inner">

          {/* Logo */}
          <Link href="/" className="zfc-about-nav__logo">
            <Image
              src="/assets/zfc-logo-final-01-1-1_1.png"
              alt="ZF Canada — We Speak for you, We make the law work for you"
              width={220}
              height={150}
              className="object-contain"
              style={{ width: "auto", height: "clamp(100px, 11vw, 160px)" }}
              priority
            />
          </Link>

          {/* Desktop floating pill */}
          <div className="zfc-about-nav__pill">
            <nav className="zfc-about-nav__links" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="zfc-about-nav__item"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`zfc-about-nav__link${link.active ? " zfc-about-nav__link--active" : ""}`}
                      aria-expanded={dropdownOpen}
                    >
                      {link.label}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`zfc-about-nav__chevron${dropdownOpen ? " zfc-about-nav__chevron--open" : ""}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="zfc-about-nav__dropdown">
                        {link.dropdown?.map((item) => (
                          <Link key={item.label} href={item.href} className="zfc-about-nav__dropdown-link">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`zfc-about-nav__link${link.active ? " zfc-about-nav__link--active" : ""}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="zfc-about-nav__sep" aria-hidden="true" />

            <div className="zfc-about-nav__rcic">
              <Image
                src="/assets/rcic-badge.png"
                alt="RCIC-IRB Regulated Canadian Immigration Consultant"
                width={110}
                height={42}
                className="object-contain"
                style={{ height: "38px", width: "auto" }}
              />
            </div>

            <Link href="/contact" className="zfc-about-nav__cta">
              Get Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="zfc-about-nav__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="zfc-about-nav__mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`zfc-about-nav__mobile-link${link.active ? " zfc-about-nav__mobile-link--active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="zfc-about-nav__cta"
              style={{ marginTop: "8px", justifyContent: "center" }}
              onClick={() => setMobileOpen(false)}
            >
              Get Consultation
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
