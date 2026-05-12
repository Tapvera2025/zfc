"use client";

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactFormCard() {
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
    <div className="zfc-cf-card">
      <h3 className="zfc-cf-card__heading">
        Get in <span className="zfc-cf-card__heading-red">touch</span>
      </h3>
      <p className="zfc-cf-card__sub">
        Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
        molestie vel, ornare non id blandit netus.
      </p>

      <form className="zfc-cf-card__form" onSubmit={handleSubmit}>

        <div className="zfc-cf-card__field">
          <input
            type="text" name="contactName" placeholder="Contact name"
            value={form.contactName} onChange={handleChange}
            className="zfc-cf-card__input" required
          />
        </div>

        <div className="zfc-cf-card__field">
          <input
            type="text" name="street" placeholder="Street"
            value={form.street} onChange={handleChange}
            className="zfc-cf-card__input"
          />
        </div>

        <div className="zfc-cf-card__field-row">
          <div className="zfc-cf-card__field">
            <input
              type="text" name="city" placeholder="City"
              value={form.city} onChange={handleChange}
              className="zfc-cf-card__input"
            />
          </div>
          <div className="zfc-cf-card__field">
            <input
              type="text" name="postcode" placeholder="Postcode"
              value={form.postcode} onChange={handleChange}
              className="zfc-cf-card__input"
            />
          </div>
        </div>

        <div className="zfc-cf-card__field">
          <input
            type="tel" name="phone" placeholder="Contact Phone"
            value={form.phone} onChange={handleChange}
            className="zfc-cf-card__input"
          />
        </div>

        <div className="zfc-cf-card__field">
          <input
            type="email" name="email" placeholder="E-mail"
            value={form.email} onChange={handleChange}
            className="zfc-cf-card__input" required
          />
        </div>

        <div className="zfc-cf-card__field">
          <textarea
            name="message" placeholder="Let's talk about your idea"
            value={form.message} onChange={handleChange}
            className="zfc-cf-card__textarea" rows={2}
          />
        </div>

        {/* Upload */}
        <label className="zfc-cf-card__upload" htmlFor="cf-file-upload">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 16 12 12 8 16"/>
            <line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
          </svg>
          <span>Upload Additional file</span>
          <input id="cf-file-upload" type="file" className="zfc-cf-card__file-input" />
        </label>
        <p className="zfc-cf-card__attach-note">
          Attach file. File size of your documents should not exceed 10MB
        </p>

        {/* NDA */}
        <label className="zfc-cf-card__nda">
          <input
            type="checkbox" name="nda"
            checked={form.nda} onChange={handleChange}
            className="zfc-cf-card__checkbox"
          />
          <span>I want to protect my data by signing an NDA</span>
        </label>

        <button
          type="submit"
          className="zfc-cf-card__submit"
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

      </form>
    </div>
  );
}
