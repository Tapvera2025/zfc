'use client';

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({
    contactName: "",
    street: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    message: "",
    nda: false,
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.contactName.trim() || !form.email.trim()) return;
    setSubmitState("loading");
    try {
      const res = await fetch("/api/form-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", data: form }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitState("success");
        setForm({ contactName: "", street: "", city: "", postcode: "", phone: "", email: "", message: "", nda: false });
        setTimeout(() => setSubmitState("idle"), 4000);
      } else {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 4000);
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  }

  return (
    <section className="zfc-contact" aria-label="Get in touch">
      <div className="zfc-contact__inner">

        {/* Left: Form */}
        <div className="zfc-contact__left">
          <h2 className="zfc-contact__heading">
            Get in <span className="zfc-contact__heading-red">touch</span>
          </h2>
          <p className="zfc-contact__subtitle">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
            molestie vel, ornare non id blandit netus.
          </p>

          <form className="zfc-contact__form" onSubmit={handleSubmit}>
            <div className="zfc-contact__field">
              <input
                type="text" name="contactName" placeholder="Contact name"
                value={form.contactName} onChange={handleChange}
                className="zfc-contact__input" required
              />
            </div>
            <div className="zfc-contact__field">
              <input
                type="text" name="street" placeholder="Street"
                value={form.street} onChange={handleChange}
                className="zfc-contact__input"
              />
            </div>
            <div className="zfc-contact__field-row">
              <div className="zfc-contact__field">
                <input
                  type="text" name="city" placeholder="City"
                  value={form.city} onChange={handleChange}
                  className="zfc-contact__input"
                />
              </div>
              <div className="zfc-contact__field">
                <input
                  type="text" name="postcode" placeholder="Postcode"
                  value={form.postcode} onChange={handleChange}
                  className="zfc-contact__input"
                />
              </div>
            </div>
            <div className="zfc-contact__field">
              <input
                type="tel" name="phone" placeholder="Contact Phone"
                value={form.phone} onChange={handleChange}
                className="zfc-contact__input"
              />
            </div>
            <div className="zfc-contact__field">
              <input
                type="email" name="email" placeholder="E-mail"
                value={form.email} onChange={handleChange}
                className="zfc-contact__input" required
              />
            </div>
            <div className="zfc-contact__field">
              <textarea
                name="message" placeholder="Let's talk about your idea"
                value={form.message} onChange={handleChange}
                className="zfc-contact__textarea" rows={3}
              />
            </div>

            <label className="zfc-contact__upload" htmlFor="file-upload">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="16 16 12 12 8 16"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
              <span>Upload Additional file</span>
              <input id="file-upload" type="file" className="zfc-contact__file-input" />
            </label>
            <p className="zfc-contact__attach-note">
              Attach file. File size of your documents should not exceed 10MB
            </p>

            <label className="zfc-contact__nda">
              <input
                type="checkbox" name="nda"
                checked={form.nda}
                onChange={handleChange}
                className="zfc-contact__checkbox"
              />
              <span>I want to protect my data by signing an NDA</span>
            </label>

            <button
              type="submit"
              className="zfc-contact__submit"
              disabled={submitState === "loading"}
            >
              {submitState === "loading" ? "SENDING…" :
               submitState === "success" ? "✓ SUBMITTED!" :
               submitState === "error"   ? "✗ TRY AGAIN" :
               "SUBMIT"}
            </button>

            {submitState === "success" && (
              <p style={{ color: "#16a34a", fontSize: "13px", marginTop: "8px" }}>
                Thank you! Your message has been sent. We&apos;ll be in touch soon.
              </p>
            )}
            {submitState === "error" && (
              <p style={{ color: "#cc1f1f", fontSize: "13px", marginTop: "8px" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <div className="zfc-contact__info-row">
              <div className="zfc-contact__info-item">
                <div className="zfc-contact__info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21c.3862 0 .7691-.0141 1.1483-.0419.4351-.0319.6526-.0478.8507-.1618.164-.0944.3195-.2618.4017-.4323C21 20.1582 21 19.9181 21 19.438v-2.8173c0-.4038 0-.6057-.0665-.7787a1.5 1.5 0 0 0-.6376-.6319c-.1399-.1216-.3297-.1906-.7091-.3286L16.74 13.9509c-.4415-.1605-.6623-.2408-.8717-.2272a1.5 1.5 0 0 0-.7234.2093c-.1712.1213-.2920.3227-.5337.7256L14 16c-2.6499-1.2001-4.7981-3.3511-6-6l1.36863-.82118c.40282-.24169.60423-.36254.72557-.53376A1.5 1.5 0 0 0 10.2763 8.1317c.0136-.20943-.0667-.4302-.2272-.8716L8.88299 4.05321C8.745 3.67376 8.676 3.48403 8.55442 3.3441A1.5 1.5 0 0 0 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201c-.48013 0-.72020 0-.92603.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103 3.08968 3.69907 3.07375 3.91662 3.04189 4.35173 3.01413 4.73086 3 5.11378 3 5.5z"/>
                  </svg>
                </div>
                <div className="zfc-contact__info-text">
                  <span className="zfc-contact__info-label">Phone</span>
                  <span className="zfc-contact__info-value">+1 (905) 858-5589</span>
                </div>
              </div>

              <div className="zfc-contact__info-item">
                <div className="zfc-contact__info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.4009 19.2C15.8965 20.3302 14.0265 21 12 21 7.02944 21 3 16.9706 3 12 3 7.02944 7.02944 3 12 3c4.9706 0 9 4.02944 9 9v1.5c0 1.3807-1.1193 2.5-2.5 2.5S16 13.8807 16 12.5V8M16 12c0 2.2091-1.7909 4-4 4s-4-1.7909-4-4 1.7909-4 4-4 4 1.7909 4 4z"/>
                  </svg>
                </div>
                <div className="zfc-contact__info-text">
                  <span className="zfc-contact__info-label">E-MAIL</span>
                  <span className="zfc-contact__info-value">info@zfcanada.com</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Map */}
        <div className="zfc-contact__right">
          <div className="zfc-contact__map-decor" aria-hidden="true" />
          <div className="zfc-contact__map-wrap">
            <iframe
              src="https://www.google.com/maps?q=214-808+Britannia+Rd+W,+Mississauga,+ON+L5V+0A7,+Canada&output=embed"
              className="zfc-contact__map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ZF Canada office location"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
