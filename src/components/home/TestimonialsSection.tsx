"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type TestimonialItem = { photo: string; text: string; name: string; role: string; rating: number };

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  { photo: "", text: "I would like to thank ZF Canada for their help and support in finding possible ways for our process. They are providing excellent services and their professional gesture is commendable. I am also grateful to Ms. Hina for her extraordinary support throughout the entire process.", name: "Anila Rafiq", role: "Google Review", rating: 5 },
  { photo: "", text: "I would like to thank ZF Canada to workout the very difficult & complex case to a happy ending. Highly qualified & professional attorney with a great experience in immigration process. I appreciate your support & generosity for this difficult case.", name: "DR AJ", role: "Google Review · Local Guide", rating: 5 },
  { photo: "", text: "I am impressed with the services provided. They informed me about various possible options and the requirements. Also guided us at every stage of the process. I found them professional in their responses and always replied to queries/questions in a timely manner.", name: "Mehdi Kazani", role: "Google Review", rating: 5 },
];

const AVATAR_COLORS = ["#cc1f1f", "#1a6fb5", "#1a9e6b", "#8e44ad", "#e67e22"];

function InitialAvatar({ name, size = 90 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: color, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <span style={{ color: "#fff", fontWeight: 700, fontSize: size * 0.36, lineHeight: 1 }}>
        {initials}
      </span>
    </div>
  );
}

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
  const raw = testimonials !== undefined ? testimonials : DEFAULT_TESTIMONIALS;
  const items = raw.filter((t) => t.text && t.text.trim() !== "");
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
                {/* Circular photo or initial avatar */}
                <div className="zfc-testimonial-card__photo">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.name} width={90} height={90} className="object-cover object-top" style={{ borderRadius: "50%", width: "90px", height: "90px" }} />
                  ) : (
                    <InitialAvatar name={t.name} size={90} />
                  )}
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

                {/* Star rating + Google badge */}
                <div className="zfc-testimonial-card__stars-row">
                  <div className="zfc-testimonial-card__stars" aria-label={t.rating + " out of 5 stars"}>
                    {[1,2,3,4,5].map((s) => <StarIcon key={s} filled={s <= t.rating} />)}
                  </div>
                  {t.role.toLowerCase().includes("google") && (
                    <svg className="zfc-testimonial-card__google" viewBox="0 0 24 24" aria-label="Google review" width="20" height="20">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
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
