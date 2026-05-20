"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    q: "What immigration services does ZF Canada offer?",
    a: "ZF Canada offers a full range of immigration services including Express Entry, Family Sponsorship, Study Permits, Work Permits, Visitor Visas, PNP Programs, Refugee Claims, IRB Hearings & Appeals, and more.",
  },
  {
    q: "Can ZF Canada help with visa refusals?",
    a: "Yes. Our RCIC-IRB consultants specialize in reviewing refused applications, identifying the reasons for refusal, and preparing stronger reapplications or appeals to improve your chances of approval.",
  },
  {
    q: "Do I need a job offer for immigration?",
    a: "Not always. Many immigration pathways such as Express Entry do not require a job offer, although having one can significantly boost your Comprehensive Ranking System (CRS) score.",
  },
  {
    q: "How do I know if I qualify for the Start-Up Visa?",
    a: "To qualify for the Start-Up Visa, you need a qualifying business, a letter of support from a designated Canadian organization, sufficient settlement funds, and meet language requirements. Contact us for a free assessment.",
  },
];

interface ServiceDetailExtraProps {
  photo: string;
  photoAlt?: string;
  images: [string, string];
  paragraphs: string[];
}

export default function ServiceDetailExtra({
  photo,
  photoAlt = "Immigration consultant",
  images,
  paragraphs,
}: ServiceDetailExtraProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="zfc-svc-extra">
      <div className="zfc-svc-extra__inner">

        {/* ── Left column ── */}
        <div className="zfc-svc-extra__left">

          {/* Portrait photo */}
          <div className="zfc-svc-extra__portrait">
            <Image
              src={photo}
              alt={photoAlt}
              fill
              sizes="(max-width: 900px) 100vw, 35vw"
              className="zfc-svc-extra__portrait-img"
            />
            {/* Contact card overlaid at the bottom */}
            <div className="zfc-svc-extra__contact-card">
              <div className="zfc-svc-extra__contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="zfc-svc-extra__contact-text">
                <span className="zfc-svc-extra__contact-label">Need Help? Book a call</span>
                <a href="tel:+19058585589" className="zfc-svc-extra__contact-number">+1 (905) 858-5589</a>
              </div>
            </div>
          </div>

          {/* FAQ accordion */}
          <ul className="zfc-svc-extra__faq">
            {faqs.map((item, i) => (
              <li key={i} className="zfc-svc-extra__faq-item">
                <button
                  className="zfc-svc-extra__faq-trigger"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                >
                  <span className="zfc-svc-extra__faq-q">
                    <span className="zfc-svc-extra__faq-plus">+</span>
                    {item.q}
                  </span>
                  <span className={`zfc-svc-extra__faq-icon${openIdx === i ? " zfc-svc-extra__faq-icon--open" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {openIdx === i
                        ? <line x1="5" y1="12" x2="19" y2="12"/>
                        : <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>
                      }
                    </svg>
                  </span>
                </button>
                {openIdx === i && (
                  <p className="zfc-svc-extra__faq-answer">{item.a}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right column ── */}
        <div className="zfc-svc-extra__right">

          {/* Two side-by-side photos */}
          <div className="zfc-svc-extra__duo">
            <div className="zfc-svc-extra__duo-img">
              <Image
                src={images[0]}
                alt=""
                fill
                sizes="(max-width: 900px) 50vw, 30vw"
                className="object-cover object-center"
              />
            </div>
            <div className="zfc-svc-extra__duo-img">
              <Image
                src={images[1]}
                alt=""
                fill
                sizes="(max-width: 900px) 50vw, 30vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Body paragraphs */}
          {paragraphs.map((p, i) => (
            <p key={i} className="zfc-svc-detail__body">{p}</p>
          ))}

          {/* Book Consultation CTA */}
          <Link href="/contact" className="zfc-svc-extra__cta">
            Book Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>

        </div>
      </div>
    </section>
  );
}
