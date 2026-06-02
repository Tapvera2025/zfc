"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type TestimonialItem = { photo: string; text: string; name: string; role: string; rating: number };

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  { photo: "/assets/testimonial-1.png", text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in", name: "Amelia", role: "Student", rating: 4 },
  { photo: "/assets/testimonial-2.png", text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in", name: "Waliya", role: "Student", rating: 4 },
  { photo: "/assets/testimonial-3.png", text: "Lorem ipsum dolor sit amet consectetur. Habitasse lacus a sit ultrices sem nulla donec pulvinar. Vitae nam laoreet senectus porttitor aliquet. Vel diam ut eu arcu scelerisque erat. A lorem curabitur consectetur in", name: "Ezaz",   role: "Student", rating: 5 },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="19" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.4127 0L14.1068 8.2918H22.8254L15.7719 13.4164L18.4661 21.7082L11.4127 16.5836L4.35925 21.7082L7.05342 13.4164L0 8.2918H8.71851L11.4127 0Z" fill={filled ? "#FFD900" : "#D1D5DB"} />
  </svg>
);

interface TestimonialsSectionProps {
  heading?: string;
  subheading?: string;
  testimonials?: TestimonialItem[];
}

export default function TestimonialsSection({
  heading = "WHAT OUR CLIENTS SAY",
  subheading = "Community development is often linked with community work or community planning, and may involve stakeholders, foundations,",
  testimonials,
}: TestimonialsSectionProps) {
  const items = testimonials !== undefined ? testimonials : DEFAULT_TESTIMONIALS;
  const VISIBLE = Math.min(3, items.length) || 1;
  const ITEMS = items.length > 0 ? [...items, ...items] : DEFAULT_TESTIMONIALS;
  const TOTAL = ITEMS.length;
  const STEP_PCT = 100 / TOTAL;

  // step = how many cards we have shifted (0-TOTAL-1, snaps back after VISIBLE)
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
        setAnimated(false);
        setStep(0);
      } else if (step < 0) {
        setAnimated(false);
        setStep(VISIBLE - 1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [step, VISIBLE]);

  // Auto-advance every 4s
  useEffect(() => {
    const t = setInterval(() => advance(1), 4000);
    return () => clearInterval(t);
  }, [advance]);

  const trackStyle: React.CSSProperties = {
    transform: `translateX(-${step * STEP_PCT}%)`,
    transition: animated ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
  };

  const dotActive = ((step % VISIBLE) + VISIBLE) % VISIBLE;

  return (
    <section className="zfc-testimonials" aria-label="Client testimonials">
      {/* Heading block */}
      <div className="zfc-testimonials__header">
        <h2 className="zfc-testimonials__heading">{heading}</h2>
        <p className="zfc-testimonials__sub">{subheading}</p>
      </div>

      {/* Slider */}
      <div className="zfc-testimonials__outer">
        {/* Left arrow */}
        <button className="zfc-testimonials__arrow zfc-testimonials__arrow--prev" onClick={() => advance(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Overflow window */}
        <div className="zfc-testimonials__window">
          {/* Sliding track — 200% wide for duplicated cards */}
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
        {items.map((_, i) => (
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
