"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServicesPageHeader from "@/components/services/ServicesPageHeader";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

const AREAS = [
  "Immigrate To Canada",
  "Work in Canada",
  "Refugee Claim",
  "Business Immigration",
  "Humanitarian and Compassionate",
  "Refusal Cases and Appeal Service",
];

const HOW_HEARD = [
  "Google / Search Engine",
  "Social Media",
  "Referral from a Friend",
  "Advertisement",
  "Other",
];

const MARITAL_STATUS = ["Single", "Married", "Common-Law", "Divorced", "Widowed", "Separated"];
const GENDER = ["Male", "Female", "Prefer not to say"];

type Step = "identify" | "new-form" | "returning-form";

export default function FreeAssessmentPage() {
  const [step, setStep] = useState<Step>("identify");
  const [identifier, setIdentifier] = useState({ email: "", phone: "" });
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    citizenship: "",
    residence: "",
    email: "",
    emailConfirm: "",
    phone: "",
    fax: "",
    visaRefusals: "",
    howHeard: "",
    furtherInfo: "",
  });

  const [areas, setAreas] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  /* ── Identify step ── */
  async function handleIdentify(e: React.FormEvent) {
    e.preventDefault();
    const email = identifier.email.trim();
    const phone = identifier.phone.trim();
    if (!email && !phone) {
      setCheckError("Please enter your email address or phone number to continue.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCheckError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }
    if (phone && phone.replace(/\D/g, "").length < 10) {
      setCheckError("Please enter a valid phone number (at least 10 digits).");
      return;
    }
    setCheckError("");
    setCheckLoading(true);
    try {
      const res = await fetch("/api/check-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? "Server error");
      if (json.isNew) {
        setForm((prev) => ({ ...prev, email, emailConfirm: email, phone }));
        setStep("new-form");
      } else {
        setStep("returning-form");
      }
    } catch {
      setCheckError("Something went wrong. Please try again.");
    } finally {
      setCheckLoading(false);
    }
  }

  /* ── New-user form ── */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleArea(area: string) {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.email !== form.emailConfirm) {
      setStatus("error");
      setMessage("Email addresses do not match. Please check and try again.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/form-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "free-assessment", data: { ...form, areasOfInterest: areas } }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! We've received your assessment request and will be in touch shortly.");
        setForm({
          firstName: "", lastName: "", dob: "", gender: "", maritalStatus: "",
          citizenship: "", residence: "", email: "", emailConfirm: "",
          phone: "", fax: "", visaRefusals: "", howHeard: "", furtherInfo: "",
        });
        setAreas([]);
      } else {
        throw new Error("Server error");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or call us directly at +1 (905) 858-5589.");
    }
  }

  /* ── Back to identify ── */
  function goBack() {
    setStep("identify");
    setCheckError("");
    setStatus("idle");
    setMessage("");
  }

  /* ── Titles per step ── */
  const titles: Record<Step, { title: string; sub: string }> = {
    "identify": {
      title: "Get Your Free Assessment",
      sub: "Enter your email or phone number so we can personalise your experience.",
    },
    "new-form": {
      title: "Tell Us About Yourself",
      sub: "Fill out the form below and one of our Regulated Canadian Immigration Consultants will review your case.",
    },
    "returning-form": {
      title: "Welcome Back",
      sub: "We already have a submission on file for you.",
    },
  };

  const { title, sub } = titles[step];

  return (
    <div className="zfc-assessment-page">
      <ServicesPageHeader activePage="Free Assessment" />

      {/* ── Hero ── */}
      <div className="zfc-about-hero-wrap">
        <section className="zfc-about-hero" aria-label="Free Assessment hero">
          <div className="zfc-about-hero__bg" aria-hidden="true">
            <Image
              src="/assets/services-hero-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="zfc-about-hero__overlay" aria-hidden="true" />
          <div className="zfc-about-hero__content">
            <h1 className="zfc-about-hero__title">Free Assessment</h1>
            <nav className="zfc-about-hero__breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="zfc-about-hero__breadcrumb-link">Home</Link>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span className="zfc-about-hero__breadcrumb-current">Free Assessment</span>
            </nav>
          </div>
        </section>
      </div>

      {/* ── Form section ── */}
      <section className="zfc-assessment-section">
        <div className="zfc-assessment-section__inner">
          <h2 className="zfc-assessment-title">{title}</h2>
          <p className="zfc-assessment-subtitle">{sub}</p>

          <div className="zfc-assessment-card">

            {/* ════════ STEP 1 — IDENTIFY ════════ */}
            {step === "identify" && (
              <form onSubmit={handleIdentify} noValidate>
                <div className="zfc-af-identify-grid">

                  {/* Email card */}
                  <div className="zfc-af-identify-card">
                    <div className="zfc-af-identify-card__icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M2 7l10 7 10-7"/>
                      </svg>
                    </div>
                    <p className="zfc-af-identify-card__title">Email Address</p>
                    <p className="zfc-af-identify-card__desc">We&apos;ll use this to look up your previous submission.</p>
                    <input
                      className="zfc-af-input"
                      type="email"
                      placeholder="your@email.com"
                      value={identifier.email}
                      onChange={(e) => setIdentifier((prev) => ({ ...prev, email: e.target.value }))}
                      autoComplete="email"
                    />
                  </div>

                  {/* Phone card */}
                  <div className="zfc-af-identify-card">
                    <div className="zfc-af-identify-card__icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.55 10.8 19.79 19.79 0 01.47 2.18 2 2 0 012.47 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-.76a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.92z"/>
                      </svg>
                    </div>
                    <p className="zfc-af-identify-card__title">Phone Number</p>
                    <p className="zfc-af-identify-card__desc">Alternatively, enter your phone number to check your record.</p>
                    <input
                      className="zfc-af-input"
                      type="tel"
                      placeholder="+1 (000) 000-0000"
                      value={identifier.phone}
                      onChange={(e) => setIdentifier((prev) => ({ ...prev, phone: e.target.value }))}
                      autoComplete="tel"
                    />
                  </div>

                </div>

                {checkError && (
                  <div className="zfc-af-message zfc-af-message--error" style={{ marginBottom: "18px" }}>
                    {checkError}
                  </div>
                )}

                <button type="submit" className="zfc-af-submit" disabled={checkLoading}>
                  {checkLoading ? "Checking…" : "Continue"}
                </button>
              </form>
            )}

            {/* ════════ STEP 2 — NEW USER FORM ════════ */}
            {step === "new-form" && (
              <>
                <button type="button" className="zfc-af-back" onClick={goBack} aria-label="Go back">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Back
                </button>

                <form className="zfc-assessment-form" onSubmit={handleSubmit} noValidate>

                  {/* First Name / Last Name */}
                  <div className="zfc-af-row">
                    <input className="zfc-af-input" type="text" name="firstName" placeholder="First Name"
                      value={form.firstName} onChange={handleChange} required />
                    <input className="zfc-af-input" type="text" name="lastName" placeholder="Last Name"
                      value={form.lastName} onChange={handleChange} required />
                  </div>

                  {/* DOB / Gender */}
                  <div className="zfc-af-row">
                    <input className="zfc-af-input" type="date" name="dob" placeholder="Date of Birth"
                      value={form.dob} onChange={handleChange} />
                    <div className="zfc-af-select-wrap">
                      <select className={`zfc-af-select${form.gender ? " has-value" : ""}`}
                        name="gender" value={form.gender} onChange={handleChange}>
                        <option value="">Gender</option>
                        {GENDER.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Marital Status */}
                  <div className="zfc-af-select-wrap">
                    <select className={`zfc-af-select${form.maritalStatus ? " has-value" : ""}`}
                      name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
                      <option value="">Marital Status</option>
                      {MARITAL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Country of citizenship / Current residence */}
                  <div className="zfc-af-row">
                    <input className="zfc-af-input" type="text" name="citizenship"
                      placeholder="Country of citizenship" value={form.citizenship} onChange={handleChange} />
                    <input className="zfc-af-input" type="text" name="residence"
                      placeholder="Current country of residence" value={form.residence} onChange={handleChange} />
                  </div>

                  {/* Email / Email confirm */}
                  <div className="zfc-af-row">
                    <input className="zfc-af-input" type="email" name="email" placeholder="Email"
                      value={form.email} onChange={handleChange} required />
                    <input className="zfc-af-input" type="email" name="emailConfirm"
                      placeholder="Email (please confirm again)" value={form.emailConfirm} onChange={handleChange} required />
                  </div>

                  {/* Phone / Fax */}
                  <div className="zfc-af-row">
                    <input className="zfc-af-input" type="tel" name="phone" placeholder="Phone"
                      value={form.phone} onChange={handleChange} />
                    <input className="zfc-af-input" type="tel" name="fax" placeholder="Fax (Optional)"
                      value={form.fax} onChange={handleChange} />
                  </div>

                  {/* Visa refusals */}
                  <textarea className="zfc-af-textarea" name="visaRefusals"
                    placeholder="Any Previous Visa Refusals and Reasons"
                    value={form.visaRefusals} onChange={handleChange} />

                  {/* How did you hear */}
                  <div className="zfc-af-select-wrap">
                    <select className={`zfc-af-select${form.howHeard ? " has-value" : ""}`}
                      name="howHeard" value={form.howHeard} onChange={handleChange}>
                      <option value="">How did you hear about us?</option>
                      {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>

                  <div className="zfc-af-divider" />

                  {/* Area of interest */}
                  <div>
                    <p className="zfc-af-label">Area of Interest</p>
                    <div className="zfc-af-checkboxes">
                      {AREAS.map((area) => (
                        <label key={area} className="zfc-af-checkbox-item">
                          <input type="checkbox" checked={areas.includes(area)} onChange={() => toggleArea(area)} />
                          {area}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="zfc-af-divider" />

                  {/* Further information */}
                  <textarea className="zfc-af-textarea" name="furtherInfo" placeholder="Further Information"
                    value={form.furtherInfo} onChange={handleChange} />

                  {status === "success" && (
                    <div className="zfc-af-message zfc-af-message--success">{message}</div>
                  )}
                  {status === "error" && (
                    <div className="zfc-af-message zfc-af-message--error">{message}</div>
                  )}

                  <button type="submit" className="zfc-af-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Submitting…" : "Submit Assessment"}
                  </button>

                </form>
              </>
            )}

            {/* ════════ STEP 3 — RETURNING USER ════════ */}
            {step === "returning-form" && (
              <>
                <button type="button" className="zfc-af-back" onClick={goBack} aria-label="Go back">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Back
                </button>

                <div className="zfc-af-returning-card">
                  <div className="zfc-af-returning-card__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Returning Client
                  </div>
                  <h3 className="zfc-af-returning-card__title">We Already Have Your Application</h3>
                  <p className="zfc-af-returning-card__sub">
                    It looks like you&apos;ve already submitted a free assessment with us. Our team will be in touch with you shortly — no need to submit again.
                  </p>
                  <p className="zfc-af-returning-card__sub" style={{ marginBottom: 0 }}>
                    If you have an urgent enquiry or would like to update your information, please call us directly at{" "}
                    <strong>+1 (905) 858-5589</strong>.
                  </p>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
