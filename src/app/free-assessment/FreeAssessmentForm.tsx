"use client";

import { useState } from "react";

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const MARITAL_STATUS = ["Single", "Married", "Common-Law", "Divorced", "Widowed", "Separated"];
const GENDER = ["Male", "Female", "Prefer not to say"];
const HOW_HEARD = ["Google / Search Engine", "Social Media", "Referral from a Friend", "Advertisement", "Other"];
const AREAS = [
  "Immigrate To Canada",
  "Work in Canada",
  "Refugee Claim",
  "Business Immigration",
  "Humanitarian and Compassionate",
  "Refusal Cases and Appeal Service",
];

const EMPTY_FORM = {
  // Personal
  title: "", firstName: "", lastName: "", dob: "", age: "", gender: "", maritalStatus: "",
  // Contact
  phone: "", email: "", emailConfirm: "", fax: "",
  // Location
  citizenship: "", residence: "",
  // Education
  highestDegree: "", degreeYears: "", totalEducationYears: "",
  // Work
  profession: "", totalWorkYears: "", workInCanada: "",
  // English
  hasEnglishTest: "", englishTestType: "", engExamDate: "", engListening: "", engWriting: "", engSpeaking: "", engReading: "",
  // French
  hasFrenchTest: "", frenchTestType: "", frExamDate: "", frListening: "", frWriting: "", frSpeaking: "", frReading: "",
  // Spouse
  spouseName: "", spouseDob: "", spouseEducation: "", spouseWorkExp: "", spouseLanguageInfo: "",
  // Children
  numChildren: "", childrenAges: "",
  // Canada connections
  relativeInCanada: "", relativeDetails: "",
  studiedInCanada: "",
  // Previous applications
  prevPRorTRV: "", prevApplicationDetails: "", visaRefusals: "",
  // Finances
  fundsAvailable: "", realEstate: "",
  // Travel
  travelHistory: "",
  // Other
  howHeard: "", furtherInfo: "",
};

interface FreeAssessmentFormProps {
  introHeading?: string;
  introBody?: string;
  submitButtonText?: string;
}

export default function FreeAssessmentForm({
  introHeading = "Get Your Free Assessment",
  introBody = "Fill in the form below and one of our Regulated Canadian Immigration Consultants will review your case and get back to you.",
  submitButtonText = "Submit Assessment",
}: FreeAssessmentFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [areas, setAreas] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isMarried = form.maritalStatus === "Married" || form.maritalStatus === "Common-Law";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleArea(area: string) {
    setAreas((prev) => prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]);
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
        setForm({ ...EMPTY_FORM });
        setAreas([]);
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or call us at +1 (905) 858-5589.");
    }
  }

  if (status === "success") {
    return (
      <section className="zfc-assessment-section">
        <div className="zfc-assessment-section__inner">
          <div className="zfc-assessment-card zfc-af-success-card">
            <div className="zfc-af-success-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="zfc-af-success-title">Form Submitted Successfully</h2>
            <p className="zfc-af-success-sub">{message}</p>
            <button className="zfc-af-submit" style={{ maxWidth: 320, margin: "0 auto" }}
              onClick={() => setStatus("idle")}>
              Submit Another Assessment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="zfc-assessment-section">
      <div className="zfc-assessment-section__inner">
        <h2 className="zfc-assessment-title">{introHeading}</h2>
        <p className="zfc-assessment-subtitle">{introBody}</p>

        <div className="zfc-assessment-card">
          <form className="zfc-assessment-form" onSubmit={handleSubmit} noValidate>

            {/* ── 1. Personal Information ── */}
            <h3 className="zfc-af-section-heading">Personal Information</h3>

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="text" name="firstName"
                placeholder="First Name *" value={form.firstName} onChange={handleChange} required />
              <input className="zfc-af-input" type="text" name="lastName"
                placeholder="Last Name *" value={form.lastName} onChange={handleChange} required />
            </div>

            <div className="zfc-af-row zfc-af-row--personal">
              <div className="zfc-af-field">
                <label className="zfc-af-field-label" htmlFor="title">Title</label>
                <div className="zfc-af-select-wrap">
                  <select id="title" className={`zfc-af-select${form.title ? " has-value" : ""}`}
                    name="title" value={form.title} onChange={handleChange}>
                    <option value="">Select</option>
                    {TITLES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="zfc-af-field">
                <label className="zfc-af-field-label" htmlFor="dob">Date of Birth</label>
                <input id="dob" className="zfc-af-input" type="date" name="dob" value={form.dob} onChange={handleChange} />
              </div>
              <div className="zfc-af-field">
                <label className="zfc-af-field-label" htmlFor="age">Age</label>
                <input id="age" className="zfc-af-input" type="number" name="age"
                  placeholder="Enter age" min={0} max={120} value={form.age} onChange={handleChange} />
              </div>
            </div>

            <div className="zfc-af-row">
              <div className="zfc-af-select-wrap">
                <select className={`zfc-af-select${form.gender ? " has-value" : ""}`}
                  name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Gender</option>
                  {GENDER.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="zfc-af-select-wrap">
                <select className={`zfc-af-select${form.maritalStatus ? " has-value" : ""}`}
                  name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
                  <option value="">Marital Status</option>
                  {MARITAL_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="zfc-af-divider" />

            {/* ── 2. Contact Information ── */}
            <h3 className="zfc-af-section-heading">Contact Information</h3>

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="tel" name="phone"
                placeholder="Contact Phone Number *" value={form.phone} onChange={handleChange} required />
              <input className="zfc-af-input" type="tel" name="fax"
                placeholder="Fax (Optional)" value={form.fax} onChange={handleChange} />
            </div>

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="email" name="email"
                placeholder="Email Address *" value={form.email} onChange={handleChange} required />
              <input className="zfc-af-input" type="email" name="emailConfirm"
                placeholder="Confirm Email Address *" value={form.emailConfirm} onChange={handleChange} required />
            </div>

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="text" name="citizenship"
                placeholder="Country of Citizenship" value={form.citizenship} onChange={handleChange} />
              <input className="zfc-af-input" type="text" name="residence"
                placeholder="Current Country of Residence" value={form.residence} onChange={handleChange} />
            </div>

            <div className="zfc-af-divider" />

            {/* ── 3. Education ── */}
            <h3 className="zfc-af-section-heading">Education</h3>

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="text" name="highestDegree"
                placeholder="Highest Degree / Diploma Name" value={form.highestDegree} onChange={handleChange} />
              <input className="zfc-af-input" type="number" name="degreeYears"
                placeholder="Duration of that Degree (years)" min={0} value={form.degreeYears} onChange={handleChange} />
            </div>

            <input className="zfc-af-input" type="number" name="totalEducationYears"
              placeholder="Total Years of Education (School + College + University)" min={0}
              value={form.totalEducationYears} onChange={handleChange} />

            <div className="zfc-af-divider" />

            {/* ── 4. Work Experience ── */}
            <h3 className="zfc-af-section-heading">Work Experience</h3>

            <input className="zfc-af-input" type="text" name="profession"
              placeholder="Profession / Occupation in Last 5 Years" value={form.profession} onChange={handleChange} />

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="number" name="totalWorkYears"
                placeholder="Total Years of Work Experience" min={0} value={form.totalWorkYears} onChange={handleChange} />
              <input className="zfc-af-input" type="text" name="workInCanada"
                placeholder="Any Work Experience in Canada? (Yes / No / Details)" value={form.workInCanada} onChange={handleChange} />
            </div>

            <div className="zfc-af-divider" />

            {/* ── 5. English Language Test ── */}
            <h3 className="zfc-af-section-heading">English Language Proficiency</h3>

            <div className="zfc-af-row">
              <div className="zfc-af-select-wrap">
                <select className={`zfc-af-select${form.hasEnglishTest ? " has-value" : ""}`}
                  name="hasEnglishTest" value={form.hasEnglishTest} onChange={handleChange}>
                  <option value="">Have you taken IELTS / CELPIP?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {form.hasEnglishTest === "yes" && (
                <div className="zfc-af-select-wrap">
                  <select className={`zfc-af-select${form.englishTestType ? " has-value" : ""}`}
                    name="englishTestType" value={form.englishTestType} onChange={handleChange}>
                    <option value="">Test Type</option>
                    <option value="IELTS">IELTS</option>
                    <option value="CELPIP">CELPIP</option>
                  </select>
                </div>
              )}
            </div>

            {form.hasEnglishTest === "yes" && (
              <div className="zfc-af-scores-group">
                <div className="zfc-af-field" style={{ maxWidth: 300, marginBottom: "0.75rem" }}>
                  <label className="zfc-af-field-label" htmlFor="engExamDate">Date of Exam Taken</label>
                  <input id="engExamDate" className="zfc-af-input" type="date" name="engExamDate"
                    value={form.engExamDate} onChange={handleChange} />
                </div>
                <p className="zfc-af-scores-label">Band Scores</p>
                <div className="zfc-af-row zfc-af-row--4">
                  <input className="zfc-af-input" type="text" name="engListening"
                    placeholder="Listening" value={form.engListening} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="engWriting"
                    placeholder="Writing" value={form.engWriting} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="engSpeaking"
                    placeholder="Speaking" value={form.engSpeaking} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="engReading"
                    placeholder="Reading" value={form.engReading} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="zfc-af-divider" />

            {/* ── 6. French Language Test ── */}
            <h3 className="zfc-af-section-heading">French Language Proficiency (TEF)</h3>

            <div className="zfc-af-row">
              <div className="zfc-af-select-wrap">
                <select className={`zfc-af-select${form.hasFrenchTest ? " has-value" : ""}`}
                  name="hasFrenchTest" value={form.hasFrenchTest} onChange={handleChange}>
                  <option value="">Have you taken TEF / TCF?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {form.hasFrenchTest === "yes" && (
                <div className="zfc-af-select-wrap">
                  <select className={`zfc-af-select${form.frenchTestType ? " has-value" : ""}`}
                    name="frenchTestType" value={form.frenchTestType} onChange={handleChange}>
                    <option value="">Test Type</option>
                    <option value="TEF">TEF</option>
                    <option value="TCF">TCF</option>
                  </select>
                </div>
              )}
            </div>

            {form.hasFrenchTest === "yes" && (
              <div className="zfc-af-scores-group">
                <div className="zfc-af-field" style={{ maxWidth: 300, marginBottom: "0.75rem" }}>
                  <label className="zfc-af-field-label" htmlFor="frExamDate">Date of Exam Taken</label>
                  <input id="frExamDate" className="zfc-af-input" type="date" name="frExamDate"
                    value={form.frExamDate} onChange={handleChange} />
                </div>
                <p className="zfc-af-scores-label">Band Scores</p>
                <div className="zfc-af-row zfc-af-row--4">
                  <input className="zfc-af-input" type="text" name="frListening"
                    placeholder="Listening" value={form.frListening} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="frWriting"
                    placeholder="Writing" value={form.frWriting} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="frSpeaking"
                    placeholder="Speaking" value={form.frSpeaking} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="frReading"
                    placeholder="Reading" value={form.frReading} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="zfc-af-divider" />

            {/* ── 7. Family Information ── */}
            <h3 className="zfc-af-section-heading">Family Information</h3>

            {isMarried && (
              <>
                <p className="zfc-af-hint">Spouse / Partner Information</p>
                <div className="zfc-af-row">
                  <div className="zfc-af-field">
                    <label className="zfc-af-field-label" htmlFor="spouseName">Spouse / Partner Full Name</label>
                    <input id="spouseName" className="zfc-af-input" type="text" name="spouseName"
                      placeholder="Full Name" value={form.spouseName} onChange={handleChange} />
                  </div>
                  <div className="zfc-af-field">
                    <label className="zfc-af-field-label" htmlFor="spouseDob">Spouse / Partner Date of Birth</label>
                    <input id="spouseDob" className="zfc-af-input" type="date" name="spouseDob" value={form.spouseDob} onChange={handleChange} />
                  </div>
                </div>
                <div className="zfc-af-row">
                  <input className="zfc-af-input" type="text" name="spouseEducation"
                    placeholder="Spouse Education (Degree & Years)" value={form.spouseEducation} onChange={handleChange} />
                  <input className="zfc-af-input" type="text" name="spouseWorkExp"
                    placeholder="Spouse Work Experience (Years)" value={form.spouseWorkExp} onChange={handleChange} />
                </div>
                <input className="zfc-af-input" type="text" name="spouseLanguageInfo"
                  placeholder="Spouse Language Test Scores (IELTS / TEF if applicable)"
                  value={form.spouseLanguageInfo} onChange={handleChange} />
              </>
            )}

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="number" name="numChildren"
                placeholder="Number of Children" min={0} value={form.numChildren} onChange={handleChange} />
              <input className="zfc-af-input" type="text" name="childrenAges"
                placeholder="Children's Ages (e.g. 3, 7, 12)" value={form.childrenAges} onChange={handleChange} />
            </div>

            <div className="zfc-af-divider" />

            {/* ── 8. Canada Connections ── */}
            <h3 className="zfc-af-section-heading">Canada Connections</h3>

            <div className="zfc-af-row">
              <div className="zfc-af-select-wrap">
                <select className={`zfc-af-select${form.relativeInCanada ? " has-value" : ""}`}
                  name="relativeInCanada" value={form.relativeInCanada} onChange={handleChange}>
                  <option value="">Blood Relative in Canada?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="zfc-af-select-wrap">
                <select className={`zfc-af-select${form.studiedInCanada ? " has-value" : ""}`}
                  name="studiedInCanada" value={form.studiedInCanada} onChange={handleChange}>
                  <option value="">Studied in Canada?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {form.relativeInCanada === "yes" && (
              <input className="zfc-af-input" type="text" name="relativeDetails"
                placeholder="Relative Details (relationship, city, status)"
                value={form.relativeDetails} onChange={handleChange} />
            )}

            <div className="zfc-af-divider" />

            {/* ── 9. Previous Applications ── */}
            <h3 className="zfc-af-section-heading">Previous Immigration Applications</h3>

            <div className="zfc-af-select-wrap" style={{ maxWidth: 400 }}>
              <select className={`zfc-af-select${form.prevPRorTRV ? " has-value" : ""}`}
                name="prevPRorTRV" value={form.prevPRorTRV} onChange={handleChange}>
                <option value="">Applied for PR or TRV before?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {form.prevPRorTRV === "yes" && (
              <textarea className="zfc-af-textarea" name="prevApplicationDetails"
                placeholder="What happened with that application? (outcome, date, details)"
                value={form.prevApplicationDetails} onChange={handleChange} />
            )}

            <textarea className="zfc-af-textarea" name="visaRefusals"
              placeholder="Any Previous Visa Refusals and Reasons (leave blank if none)"
              value={form.visaRefusals} onChange={handleChange} />

            <div className="zfc-af-divider" />

            {/* ── 10. Finances ── */}
            <h3 className="zfc-af-section-heading">Financial Information</h3>

            <div className="zfc-af-row">
              <input className="zfc-af-input" type="text" name="fundsAvailable"
                placeholder="Funds Available (Approximate / Investments)" value={form.fundsAvailable} onChange={handleChange} />
              <input className="zfc-af-input" type="text" name="realEstate"
                placeholder="Real Estate Property (if any)" value={form.realEstate} onChange={handleChange} />
            </div>

            <div className="zfc-af-divider" />

            {/* ── 11. Travel History ── */}
            <h3 className="zfc-af-section-heading">Travel History</h3>

            <textarea className="zfc-af-textarea" name="travelHistory"
              placeholder="Any Travel History Abroad — mention countries and year of travel (e.g. USA 2019, UK 2022)"
              value={form.travelHistory} onChange={handleChange} />

            <div className="zfc-af-divider" />

            {/* ── 12. Area of Interest ── */}
            <h3 className="zfc-af-section-heading">Area of Interest</h3>

            <div className="zfc-af-checkboxes zfc-af-checkboxes--grid">
              {AREAS.map((area) => (
                <label key={area} className="zfc-af-checkbox-item">
                  <input type="checkbox" checked={areas.includes(area)} onChange={() => toggleArea(area)} />
                  {area}
                </label>
              ))}
            </div>

            <div className="zfc-af-divider" />

            {/* ── 13. Additional Information ── */}
            <h3 className="zfc-af-section-heading">Additional Information</h3>

            <div className="zfc-af-select-wrap" style={{ maxWidth: 400 }}>
              <select className={`zfc-af-select${form.howHeard ? " has-value" : ""}`}
                name="howHeard" value={form.howHeard} onChange={handleChange}>
                <option value="">How did you hear about us?</option>
                {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            <textarea className="zfc-af-textarea" name="furtherInfo"
              placeholder="Any other information you would like to provide"
              value={form.furtherInfo} onChange={handleChange} />

            {status === "error" && (
              <div className="zfc-af-message zfc-af-message--error">{message}</div>
            )}

            <button type="submit" className="zfc-af-submit" disabled={status === "loading"}>
              {status === "loading" ? "Submitting…" : submitButtonText}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
