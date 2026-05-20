"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    photo: "/assets/testimonial-1.png",
    text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in",
    name: "Amelia",
    role: "Student",
    rating: 4,
  },
  {
    id: 2,
    photo: "/assets/testimonial-2.png",
    text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in",
    name: "Waliya",
    role: "Student",
    rating: 4,
  },
  {
    id: 3,
    photo: "/assets/testimonial-3.png",
    text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in",
    name: "Ezaz",
    role: "Student",
    rating: 5,
  },
];

// Duplicate for seamless infinite loop: [t1,t2,t3, t1,t2,t3]
const ITEMS = [...testimonials, ...testimonials];
const TOTAL = ITEMS.length;   // 6
const VISIBLE = 3;
const STEP_PCT = 100 / TOTAL; // each card = 16.666% of track

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="19" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.4127 0L14.1068 8.2918H22.8254L15.7719 13.4164L18.4661 21.7082L11.4127 16.5836L4.35925 21.7082L7.05342 13.4164L0 8.2918H8.71851L11.4127 0Z" fill={filled ? "#FFD900" : "#D1D5DB"} />
  </svg>
);

export default function TestimonialsSection() {
  // step = how many cards we have shifted (0-5, snaps back after 3)
  const [step, setStep] = useState(0);
  const [animated, setAnimated] = useState(true);
  const busy = useRef(false);

  const advance = useCallback((dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setAnimated(true);
    setStep((prev) => prev + dir);
  }, []);

  // After each transition, check if we need to snap
  useEffect(() => {
    const timer = setTimeout(() => {
      busy.current = false;
      if (step >= VISIBLE) {
        // Snap back to start without animation
        setAnimated(false);
        setStep(0);
      } else if (step < 0) {
        setAnimated(false);
        setStep(VISIBLE - 1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [step]);

  // Auto-advance every 4s
  useEffect(() => {
    const t = setInterval(() => advance(1), 4000);
    return () => clearInterval(t);
  }, [advance]);

  const trackStyle: React.CSSProperties = {
    transform: `translateX(-${step * STEP_PCT}%)`,
    transition: animated ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
  };

  // Dot active index maps: step 0→card 0, step 1→card 1, step 2→card 2
  const dotActive = ((step % VISIBLE) + VISIBLE) % VISIBLE;

  return (
    <section className="zfc-testimonials" aria-label="Client testimonials">
      {/* Heading block */}
      <div className="zfc-testimonials__header">
        <h2 className="zfc-testimonials__heading">WHAT OUR CLIENTS SAY</h2>
        <p className="zfc-testimonials__sub">
          Community development is often linked with community work or community
          planning, and may involve stakeholders, foundations,
        </p>
      </div>

      {/* Slider */}
      <div className="zfc-testimonials__outer">
        {/* Left arrow */}
        <button className="zfc-testimonials__arrow zfc-testimonials__arrow--prev" onClick={() => advance(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Overflow window */}
        <div className="zfc-testimonials__window">
          {/* Sliding track — 200% wide for 6 cards */}
          <div className="zfc-testimonials__track" style={trackStyle}>
            {ITEMS.map((t, i) => (
              <article key={i} className="zfc-testimonial-card">
                {/* Circular photo — top left */}
                <div className="zfc-testimonial-card__photo">
                  <Image src={t.photo} alt={t.name} width={90} height={90} className="object-cover object-top" style={{ borderRadius: "50%", width: "90px", height: "90px" }} />
                </div>

                {/* Review text */}
                <p className="zfc-testimonial-card__text">{t.text}</p>

                {/* Dots + name + role */}
                <div className="zfc-testimonial-card__meta">
                  <span className="zfc-testimonial-card__dots" aria-hidden="true">
                    <span /><span />
                  </span>
                  <div className="zfc-testimonial-card__info">
                    <p className="zfc-testimonial-card__name">{t.name}</p>
                    <p className="zfc-testimonial-card__role">{t.role}</p>
                  </div>
                </div>

                {/* Star rating */}
                <div className="zfc-testimonial-card__stars" aria-label={t.rating + " out of 5 stars"}>
                  {[1,2,3,4,5].map((s) => <StarIcon key={s} filled={s <= t.rating} />)}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button className="zfc-testimonials__arrow zfc-testimonials__arrow--next" onClick={() => advance(1)} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="zfc-testimonials__dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={"zfc-testimonials__dot" + (i === dotActive ? " zfc-testimonials__dot--active" : "")}
            onClick={() => { setAnimated(true); setStep(i); }}
            aria-label={"Go to testimonial " + (i + 1)}
          />
        ))}
      </div>
    </section>
  );
}
