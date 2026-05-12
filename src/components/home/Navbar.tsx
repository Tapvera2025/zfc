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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header 
      className="absolute top-0 left-0 right-0 z-50 w-full"
      style={{ paddingTop: 'clamp(30px, 4vw, 50px)' }}
    >
      <div 
        className="w-full box-border"
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          paddingLeft: 'clamp(24px, 5vw, 64px)', 
          paddingRight: 'clamp(24px, 5vw, 64px)' 
        }}
      >
        {/* TOP BAR */}
        <div className="hidden lg:flex items-center justify-between border border-white/60 bg-white/10 backdrop-blur-md rounded-[12px] shadow-sm mb-6 w-full"
             style={{ padding: '12px 32px' }}>
          <div className="flex items-center text-white font-medium gap-3" style={{ fontSize: '15px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate max-w-[280px] xl:max-w-none">214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada</span>
          </div>
          <div className="flex items-center text-white font-medium gap-8 shrink-0" style={{ fontSize: '15px' }}>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@zfcanada.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (905) 858-5589</span>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between w-full max-w-full gap-4">
          {/* LOGO */}
          <Link href="/" className="relative z-10 shrink-0" style={{ width: 'clamp(140px, 12vw, 180px)' }}>
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
          <div className="hidden lg:flex items-center bg-white rounded-[50px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] shrink-0"
               style={{ padding: '8px 12px 8px 32px', gap: 'clamp(16px, 2vw, 32px)' }}>
            {/* LINKS */}
            <nav className="flex items-center" style={{ gap: 'clamp(16px, 2vw, 32px)' }}>
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center gap-1 font-bold text-[#111] hover:text-[#d71920] transition-colors py-2 whitespace-nowrap"
                         style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}>
                      {link.label}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {/* DROPDOWN MENU */}
                    {servicesOpen && (
                      <div className="absolute top-[100%] left-0 pt-2 w-[240px]">
                        <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] py-4 flex flex-col border border-gray-100">
                          {link.dropdown?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="px-6 py-3 font-semibold text-[#333] hover:bg-gray-50 hover:text-[#d71920] transition-colors"
                              style={{ fontSize: '15px' }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-bold text-[#111] hover:text-[#d71920] transition-colors py-2 whitespace-nowrap"
                    style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="w-[1px] bg-gray-200 shrink-0" style={{ height: '32px', margin: '0 4px' }}></div>

            {/* RCIC LOGO */}
            <div className="relative shrink-0" style={{ width: 'clamp(90px, 8vw, 120px)', height: 'clamp(28px, 2.5vw, 36px)' }}>
              <Image
                src="/assets/RCIC-IRB_EN_HORZ_CLR_POS-1-2048x783_1.png"
                alt="RCIC-IRB"
                fill
                className="object-contain"
              />
            </div>

            {/* CTA BUTTON */}
            <Link
              href="/contact"
              className="bg-[#cc1f1f] hover:bg-[#a81515] text-white font-bold rounded-full flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
              style={{ padding: '10px 24px', fontSize: 'clamp(14px, 1.2vw, 16px)' }}
            >
              Get Consultation <span className="leading-none ml-1" style={{ fontSize: '1.2em' }}>↘</span>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden bg-white p-3 rounded-xl shadow-md z-20 relative shrink-0"
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
          <div className="lg:hidden absolute top-[100%] left-6 right-6 mt-4 bg-white rounded-[24px] shadow-2xl p-8 z-50">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="border-b border-gray-100 pb-5">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full text-left text-[19px] font-bold text-[#111]"
                    >
                      {link.label}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {servicesOpen && (
                      <div className="mt-4 flex flex-col gap-4 pl-5 border-l-2 border-gray-100">
                        {link.dropdown?.map((item) => (
                          <Link key={item.label} href={item.href} className="text-[17px] font-semibold text-[#555] hover:text-[#d71920]">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.label} href={link.href} className="text-[19px] font-bold text-[#111] border-b border-gray-100 pb-5">
                    {link.label}
                  </Link>
                )
              )}
              
              <div className="mt-6 flex flex-col gap-5">
                <div className="relative w-[150px] h-[45px] mx-auto">
                  <Image src="/assets/RCIC-IRB_EN_HORZ_CLR_POS-1-2048x783_1.png" alt="RCIC-IRB" fill className="object-contain" />
                </div>
                <Link href="/contact" className="bg-[#cc1f1f] text-white text-[18px] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-center w-full">
                  Get Consultation <span>↘</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}