'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    dropdown: [
      { label: "Express Entry", href: "/services/express-entry" },
      { label: "Family Sponsorship", href: "/services/family-sponsorship" },
      { label: "Study Permit", href: "/services/study-permit" },
      { label: "Work Permit", href: "/services/work-permit" },
      { label: "Visitor Visa", href: "/services/visitor-visa" },
      { label: "PNP Programs", href: "/services/pnp" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function PageHeader({ activePage = "" }: { activePage?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="zfc-page-header">
      {/* ── Top info bar ── */}
      <div className="zfc-page-topbar">
        <div className="zfc-page-topbar__inner">
          <div className="zfc-page-topbar__left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada</span>
          </div>
          <div className="zfc-page-topbar__right">
            <a href="mailto:info@zfcanada.com" className="zfc-page-topbar__link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@zfcanada.com
            </a>
            <span className="zfc-page-topbar__sep">|</span>
            <a href="tel:+19058585589" className="zfc-page-topbar__link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +1 (905) 858-5589
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav className="zfc-page-nav" aria-label="Main navigation">
        <div className="zfc-page-nav__inner">
          {/* Logo */}
          <Link href="/" className="zfc-page-nav__logo">
            <Image
              src="/assets/zfc-logo-final-01-1-1_1.png"
              alt="ZF Canada"
              width={80}
              height={80}
              className="object-contain"
              style={{ width: "auto", height: "72px" }}
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="zfc-page-nav__links">
            {navLinks.map((link) => (
              <li key={link.label} className="zfc-page-nav__item">
                {link.hasDropdown ? (
                  <button
                    className={`zfc-page-nav__link ${activePage === link.label ? "zfc-page-nav__link--active" : ""}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                  >
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`zfc-page-nav__link ${activePage === link.label ? "zfc-page-nav__link--active" : ""}`}
                  >
                    {link.label}
                  </Link>
                )}
                {link.hasDropdown && dropdownOpen && (
                  <ul className="zfc-page-nav__dropdown">
                    {link.dropdown?.map((sub) => (
                      <li key={sub.label}>
                        <Link href={sub.href} className="zfc-page-nav__dropdown-link">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Right: RCIC + CTA */}
          <div className="zfc-page-nav__right">
            <Image
              src="/assets/rcic-badge.png"
              alt="RCIC-IRB Regulated Canadian Immigration Consultant"
              width={120}
              height={46}
              className="object-contain"
              style={{ height: "40px", width: "auto" }}
            />
            <Link href="/contact" className="zfc-page-nav__cta">
              Get Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="zfc-page-nav__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="zfc-page-nav__mobile">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="zfc-page-nav__mobile-link"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="zfc-page-nav__cta" onClick={() => setMobileOpen(false)}>
              Get Consultation
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
