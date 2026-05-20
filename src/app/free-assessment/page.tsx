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

export default function FreeAssessmentPage() {
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
        body: JSON.stringify({ ...form, areasOfInterest: areas, formType: "free-assessment" }),
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
          <h2 className="zfc-assessment-title">Get Your Free Assessment</h2>
          <p className="zfc-assessment-subtitle">
            Fill out the form below and one of our Regulated Canadian Immigration Consultants will review your case and get back to you.
          </p>

          <div className="zfc-assessment-card">
            <form className="zfc-assessment-form" onSubmit={handleSubmit} noValidate>

              {/* First Name / Last Name */}
              <div className="zfc-af-row">
                <input
                  className="zfc-af-input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="zfc-af-input"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DOB / Gender */}
              <div className="zfc-af-row">
                <input
                  className="zfc-af-input"
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={form.dob}
                  onChange={handleChange}
                />
                <div className="zfc-af-select-wrap">
                  <select
                    className={`zfc-af-select${form.gender ? " has-value" : ""}`}
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Gender</option>
                    {GENDER.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Marital Status */}
              <div className="zfc-af-select-wrap">
                <select
                  className={`zfc-af-select${form.maritalStatus ? " has-value" : ""}`}
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="">Marital Status</option>
                  {MARITAL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Country of citizenship / Current residence */}
              <div className="zfc-af-row">
                <input
                  className="zfc-af-input"
                  type="text"
                  name="citizenship"
                  placeholder="Country of citizenship"
                  value={form.citizenship}
                  onChange={handleChange}
                />
                <input
                  className="zfc-af-input"
                  type="text"
                  name="residence"
                  placeholder="Current country of residence"
                  value={form.residence}
                  onChange={handleChange}
                />
              </div>

              {/* Email / Email confirm */}
              <div className="zfc-af-row">
                <input
                  className="zfc-af-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="zfc-af-input"
                  type="email"
                  name="emailConfirm"
                  placeholder="Email (please confirm again)"
                  value={form.emailConfirm}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone / Fax */}
              <div className="zfc-af-row">
                <input
                  className="zfc-af-input"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <input
                  className="zfc-af-input"
                  type="tel"
                  name="fax"
                  placeholder="Fax (Optional)"
                  value={form.fax}
                  onChange={handleChange}
                />
              </div>

              {/* Visa refusals */}
              <textarea
                className="zfc-af-textarea"
                name="visaRefusals"
                placeholder="Any Previous Visa Refusals and Reasons"
                value={form.visaRefusals}
                onChange={handleChange}
              />

              {/* How did you hear */}
              <div className="zfc-af-select-wrap">
                <select
                  className={`zfc-af-select${form.howHeard ? " has-value" : ""}`}
                  name="howHeard"
                  value={form.howHeard}
                  onChange={handleChange}
                >
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
                      <input
                        type="checkbox"
                        checked={areas.includes(area)}
                        onChange={() => toggleArea(area)}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              <div className="zfc-af-divider" />

              {/* Further information */}
              <textarea
                className="zfc-af-textarea"
                name="furtherInfo"
                placeholder="Further Information"
                value={form.furtherInfo}
                onChange={handleChange}
              />

              {/* Status message */}
              {status === "success" && (
                <div className="zfc-af-message zfc-af-message--success">{message}</div>
              )}
              {status === "error" && (
                <div className="zfc-af-message zfc-af-message--error">{message}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="zfc-af-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting…" : "Submit"}
              </button>

            </form>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
