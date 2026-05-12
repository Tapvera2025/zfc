'use client';

import { useState } from "react";
import Image from "next/image";

type SubmitState = "idle" | "loading" | "success" | "error";

const faqs = [
  { id: 1, question: "What immigration services does ZF Canada offer?" },
  { id: 2, question: "Can ZF Canada help with visa refusals?" },
  { id: 3, question: "Do I need a job offer for immigration?" },
  { id: 4, question: "How do I know if I qualify for the Start-Up Visa?" },
  { id: 5, question: "What is LMIA and why do I need it?" },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit() {
    if (!question.trim()) return;
    setSubmitState("loading");
    try {
      const res = await fetch("/api/faq-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitState("success");
        setQuestion("");
        setTimeout(() => setSubmitState("idle"), 3000);
      } else {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 3000);
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    }
  }

  return (
    <section className="zfc-faq" aria-label="Frequently Asked Questions">
      {/* World map background */}
      <div className="zfc-faq__map-bg" aria-hidden="true">
        <Image
          src="/assets/faq-map.png"
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>

      <div className="zfc-faq__inner">
        <h2 className="zfc-faq__heading">Frequently Ask Questions</h2>

        {/* Left: accordion */}
        <div className="zfc-faq__left">
          <ul className="zfc-faq__list">
            {faqs.map((faq) => (
              <li key={faq.id} className="zfc-faq__item">
                <button
                  className="zfc-faq__trigger"
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  aria-expanded={open === faq.id}
                >
                  <span className="zfc-faq__question">
                    {faq.id}. {faq.question}
                  </span>
                  <span className="zfc-faq__icon">
                    {open === faq.id ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect opacity="0.8" y="7.5" width="18" height="3" rx="1.5" fill="#1B1139"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect opacity="0.8" y="7.5" width="18" height="3" rx="1.5" fill="#1B1139"/>
                        <rect opacity="0.8" x="10.5" width="18" height="3" rx="1.5" transform="rotate(90 10.5 0)" fill="#1B1139"/>
                      </svg>
                    )}
                  </span>
                </button>
                {open === faq.id && (
                  <p className="zfc-faq__answer">
                    Our team of licensed immigration consultants will provide you with
                    personalized guidance tailored to your specific situation and goals.
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Any Question widget */}
        <div className="zfc-faq__right">
          {/* SVG blob shape — Vector_1 (fill) + Vector_2 (stroke) stacked */}
          <div className="zfc-faq__blob-wrap" aria-hidden="true">
            {/* Filled blob */}
            <Image
              src="/assets/blob-fill.svg"
              alt=""
              width={282}
              height={257}
              className="zfc-faq__blob-fill"
            />
            {/* Stroke outline */}
            <Image
              src="/assets/blob-stroke.svg"
              alt=""
              width={301}
              height={275}
              className="zfc-faq__blob-stroke"
            />
            <span className="zfc-faq__blob-q">?</span>
          </div>

          <h3 className="zfc-faq__widget-heading">Any Question?</h3>
          <p className="zfc-faq__widget-sub">
            You can ask anything you want to know Feedback
          </p>

          <div className="zfc-faq__widget-form">
            <label className="zfc-faq__widget-label">Let me know</label>
            <div className="zfc-faq__widget-input-wrap">
              <input
                type="text"
                placeholder="Enter Here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="zfc-faq__widget-input"
              />
              {question && (
                <button
                  className="zfc-faq__widget-clear"
                  onClick={() => setQuestion("")}
                  aria-label="Clear"
                >
                  X
                </button>
              )}
            </div>
            <button
              className="zfc-faq__widget-submit"
              onClick={handleSubmit}
              disabled={submitState === "loading" || !question.trim()}
            >
              {submitState === "loading" ? "Sending…" :
               submitState === "success" ? "✓ Sent!" :
               submitState === "error"   ? "✗ Error" :
               <>Submit &nbsp;●</>}
            </button>
            {submitState === "success" && (
              <p className="zfc-faq__widget-feedback zfc-faq__widget-feedback--success">
                Your question has been submitted. We&apos;ll get back to you soon!
              </p>
            )}
            {submitState === "error" && (
              <p className="zfc-faq__widget-feedback zfc-faq__widget-feedback--error">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
