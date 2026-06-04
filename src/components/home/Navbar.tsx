"use client";

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
      { label: "Refused Applications", href: "/services/refused-applications" },
      { label: "Humanitarian & Compassionate", href: "/services/humanitarian-compassionate" },
      { label: "Inadmissibility", href: "/services/inadmissibility" },
      { label: "Misrepresentation", href: "/services/misrepresentation" },
      { label: "Sponsorship", href: "/services/sponsorship" },
      { label: "Refugee Claim Application", href: "/services/refugee-claim" },
      { label: "IRB – Hearing & Appeals", href: "/services/irb-hearings" },
      { label: "Temporary Residence", href: "/services/temporary-residence" },
      { label: "PR Card / Citizenship", href: "/services/pr-card-citizenship" },
      { label: "Permanent Residency", href: "/services/permanent-residency" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Our Client", href: "/our-client" },
  { label: "Free Assessment", href: "/free-assessment" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header 
      className="absolute top-0 left-0 right-0 z-50 w-full"
      style={{ paddingTop: 'clamp(26px, 3.4vw, 44px)' }}
    >
      <div 
        className="w-full box-border"
        style={{ 
          maxWidth: 'none',
          margin: '0 auto', 
          paddingLeft: 'clamp(34px, 4.8vw, 96px)',
          paddingRight: 'clamp(34px, 4.8vw, 96px)'
        }}
      >
        {/* TOP BAR */}
        <div className="hidden lg:flex items-center justify-between border border-white/60 bg-white/10 backdrop-blur-md rounded-[12px] shadow-sm mb-6 w-full"
             style={{ padding: 'clamp(14px, 1.15vw, 18px) clamp(24px, 2.2vw, 38px)' }}>
          <div className="flex items-center text-white font-bold gap-3" style={{ fontSize: 'clamp(15px, 1vw, 20px)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate max-w-[280px] xl:max-w-none">214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada</span>
          </div>
          <div className="flex items-center text-white font-bold gap-7 shrink-0" style={{ fontSize: 'clamp(15px, 1vw, 20px)' }}>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@zfcanada.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (905) 858-5589</span>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between w-full max-w-full gap-4">
          {/* LOGO */}
          <Link href="/" className="relative z-10 shrink-0 translate-y-6" style={{ width: 'clamp(188px, 13vw, 252px)' }}>
            <Image 
              src="/assets/zfc-logo-final-01-1-1_1.png" 
              alt="ZFC Logo" 
              width={180} 
              height={100} 
              className="object-contain drop-shadow-md w-full h-auto"
              priority
            />
          </Link>

          {/* RIGHT SIDE NAV PILL */}
          <div className="hidden xl:flex items-center bg-white rounded-[50px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] shrink min-w-0"
               style={{ padding: 'clamp(16px, 1.4vw, 22px) clamp(20px, 1.8vw, 32px)', gap: 'clamp(16px, 1.5vw, 30px)' }}>
            {/* LINKS */}
            <nav className="flex items-center min-w-0" style={{ gap: 'clamp(16px, 1.35vw, 26px)' }}>
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center gap-1 font-extrabold text-[#111] hover:text-[#d71920] transition-colors py-2 whitespace-nowrap"
                         style={{ fontSize: 'clamp(17px, 1.18vw, 23px)' }}>
                      <Link href={link.href}>{link.label}</Link>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {/* DROPDOWN MENU */}
                    {servicesOpen && (
                      <div className="absolute left-0 top-[calc(100%+8px)] z-[100] w-[460px] rounded-2xl border border-black/[0.07] bg-white/[0.92] shadow-[0_20px_60px_rgba(0,0,0,0.13)] backdrop-blur-[20px] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']">
                        <div className="border-b border-black/[0.06] px-4 pb-2 pt-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#cc1f1f]">
                          Our Services
                        </div>
                        <div className="grid grid-cols-2 gap-0.5 p-2">
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="group flex min-w-0 items-center justify-between rounded-lg py-2 pl-4 pr-2.5 text-[13px] font-semibold text-[#222] transition-colors hover:bg-[#cc1f1f]/[0.07] hover:text-[#cc1f1f]"
                            >
                              <span className="min-w-0 flex-1 truncate">{item.label}</span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="ml-1 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-black/[0.06] px-4 pb-2.5 pt-2">
                          <Link href={link.href} className="inline-flex w-fit items-center gap-1 text-[12px] font-bold text-[#cc1f1f] transition-all hover:gap-2">
                            View All Services <span>→</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-extrabold text-[#111] hover:text-[#d71920] transition-colors py-2 whitespace-nowrap"
                    style={{ fontSize: 'clamp(17px, 1.18vw, 23px)' }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="w-[1px] bg-gray-200 shrink-0" style={{ height: '34px', margin: '0 2px' }}></div>

            {/* RCIC LOGO */}
            <div className="relative shrink-0" style={{ width: 'clamp(118px, 8vw, 158px)', height: 'clamp(40px, 3vw, 54px)' }}>
              <Image
                src="/assets/rcic-badge.png"
                alt="RCIC-IRB"
                fill
                className="object-contain"
              />
            </div>

            {/* CTA BUTTON */}
            <Link
              href="/book-consultation"
              className="bg-[#cc1f1f] hover:bg-[#a81515] text-white font-extrabold rounded-full flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
              style={{ padding: 'clamp(12px, 1vw, 16px) clamp(20px, 1.75vw, 32px)', fontSize: 'clamp(17px, 1.18vw, 23px)' }}
            >
              Get Consultation <span className="leading-none ml-1" style={{ fontSize: '1.1em' }}>›</span>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="xl:hidden bg-white p-3 rounded-xl shadow-md z-20 relative shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileOpen && (
          <div className="xl:hidden absolute top-[100%] left-6 right-6 mt-4 bg-white rounded-[24px] shadow-2xl p-8 z-50">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="border-b border-gray-100 pb-5">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full text-left text-[22px] font-extrabold text-[#111]"
                    >
                      {link.label}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {servicesOpen && (
                      <div className="mt-4 flex flex-col gap-4 pl-5 border-l-2 border-gray-100">
                        <Link href={link.href} className="text-[19px] font-bold text-[#d71920] hover:underline">
                          All Services
                        </Link>
                        {link.dropdown?.map((item) => (
                          <Link key={item.label} href={item.href} className="text-[19px] font-bold text-[#555] hover:text-[#d71920]">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.label} href={link.href} className="text-[22px] font-extrabold text-[#111] border-b border-gray-100 pb-5">
                    {link.label}
                  </Link>
                )
              )}
              
              <div className="mt-6 flex flex-col gap-5">
                <div className="relative w-[150px] h-[45px] mx-auto">
                  <Image src="/assets/rcic-badge.png" alt="RCIC-IRB" fill className="object-contain" />
                </div>
                <Link href="/book-consultation" className="bg-[#cc1f1f] text-white text-[20px] font-extrabold px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-center w-full">
                  Get Consultation <span>›</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
