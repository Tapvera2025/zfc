'use client';

import { useState, useMemo } from "react";

const SERVICES = [
  { name: "Humanitarian & Compassionate", price: 150 },
  { name: "Inadmissibility",              price: 150 },
  { name: "IRB – Hearings & Appeals",     price: 150 },
  { name: "Misrepresentation",            price: 150 },
  { name: "Permanent Residency",          price: 125 },
  { name: "PR Card & Citizenship",        price: 100 },
  { name: "Refugee Claim Applications",   price: 200 },
  { name: "Refused Applications",         price: 175 },
  { name: "Sponsorship",                  price: 100 },
  { name: "Temporary Residence",          price:  75 },
];

const TIME_SLOTS = [
  "9:00 AM", "9:45 AM", "10:30 AM", "11:15 AM", "12:00 PM",
  "12:45 PM", "1:30 PM", "2:15 PM", "3:00 PM", "3:45 PM", "4:30 PM",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

interface ServiceType { name: string; price: number }
type Step = 1 | 2 | 3 | 4;

interface Booking {
  service: ServiceType | null;
  date: Date | null;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const EMPTY: Booking = {
  service: null, date: null, time: "",
  firstName: "", lastName: "", email: "", phone: "",
};

export default function BookingWizard() {
  const [step, setStep]       = useState<Step>(1);
  const [booking, setBooking] = useState<Booking>(EMPTY);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");

  const today = useMemo(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d;
  }, []);

  const calendarCells = useMemo(() => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const first = new Date(y, m, 1);
    let dow = first.getDay(); // 0=Sun
    dow = dow === 0 ? 6 : dow - 1; // convert to Mon=0
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    const cells: (Date | null)[] = Array(dow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewDate]);

  function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth()    === b.getMonth()    &&
           a.getDate()     === b.getDate();
  }

  function formatDate(d: Date) {
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  function combineDateAndTime(date: Date, slot: string): Date {
    const [timePart, ampm] = slot.split(" ");
    const [hStr, mStr]     = timePart.split(":");
    let h = parseInt(hStr, 10);
    const mn = parseInt(mStr, 10);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, mn);
  }

  function fmtUTC(d: Date) {
    return d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  }

  function googleCalLink() {
    if (!booking.date || !booking.time || !booking.service) return "#";
    const s = combineDateAndTime(booking.date, booking.time);
    const e = new Date(s.getTime() + 45 * 60 * 1000);
    const title = encodeURIComponent(`Consultation: ${booking.service.name} – ZF Canada`);
    const loc   = encodeURIComponent("214-808 Britannia Rd W, Mississauga, ON L5V 0A7, Canada");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmtUTC(s)}/${fmtUTC(e)}&location=${loc}`;
  }

  function outlookLink() {
    if (!booking.date || !booking.time || !booking.service) return "#";
    const s = combineDateAndTime(booking.date, booking.time);
    const e = new Date(s.getTime() + 45 * 60 * 1000);
    const title = encodeURIComponent(`Consultation: ${booking.service.name} – ZF Canada`);
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${s.toISOString().slice(0,19)}&enddt=${e.toISOString().slice(0,19)}`;
  }

  function yahooLink() {
    if (!booking.date || !booking.time || !booking.service) return "#";
    const s = combineDateAndTime(booking.date, booking.time);
    const e = new Date(s.getTime() + 45 * 60 * 1000);
    const title = encodeURIComponent(`Consultation: ${booking.service.name} – ZF Canada`);
    return `https://calendar.yahoo.com/?v=60&title=${title}&st=${fmtUTC(s)}&et=${fmtUTC(e)}`;
  }

  function icsContent() {
    if (!booking.date || !booking.time || !booking.service) return "";
    const s = combineDateAndTime(booking.date, booking.time);
    const e = new Date(s.getTime() + 45 * 60 * 1000);
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${fmtUTC(s)}`,
      `DTEND:${fmtUTC(e)}`,
      `SUMMARY:Consultation: ${booking.service.name} – ZF Canada`,
      "LOCATION:214-808 Britannia Rd W\\, Mississauga\\, ON L5V 0A7\\, Canada",
      "DESCRIPTION:Consultation with ZF Canada Immigration Consultants",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("loading");
    try {
      const res = await fetch("/api/form-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "consultation",
          data: {
            service:      booking.service?.name,
            servicePrice: booking.service?.price,
            date:         booking.date ? formatDate(booking.date) : "",
            time:         booking.time,
            firstName:    booking.firstName,
            lastName:     booking.lastName,
            email:        booking.email,
            phone:        booking.phone,
          },
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStep(4);
      } else {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 4000);
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  }

  const STEP_LABELS = [
    { num: 1 as const, label: "Select Service" },
    { num: 2 as const, label: "Pick Date & Time" },
    { num: 3 as const, label: "Your Information" },
  ];

  const isConfirmed = step === 4;

  return (
    <section className="zfc-booking-section">
      <div className="zfc-booking__inner">

        {/* ── Sidebar ── */}
        <div className="zfc-booking__sidebar">
          <div className="zfc-booking__sidebar-header">
            <h2 className="zfc-booking__sidebar-title">Book a Consultation</h2>
            <p className="zfc-booking__sidebar-sub">45-minute session with our immigration experts</p>
          </div>

          <div className="zfc-booking__steps">
            {STEP_LABELS.map((s) => (
              <div
                key={s.num}
                className={[
                  "zfc-booking__step",
                  step === s.num          ? "zfc-booking__step--active" : "",
                  step > s.num || isConfirmed ? "zfc-booking__step--done"   : "",
                ].filter(Boolean).join(" ")}
              >
                <div className="zfc-booking__step-num">
                  {(step > s.num || isConfirmed) ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : s.num}
                </div>
                <div className="zfc-booking__step-info">
                  <span className="zfc-booking__step-label">{s.label}</span>
                  {(step > s.num || isConfirmed) && (
                    <span className="zfc-booking__step-value">
                      {s.num === 1 && booking.service?.name}
                      {s.num === 2 && booking.date && `${formatDate(booking.date)}, ${booking.time}`}
                      {s.num === 3 && booking.firstName && `${booking.firstName} ${booking.lastName}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="zfc-booking__sidebar-contact">
            <div className="zfc-booking__sidebar-contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5.5C3 14.06 9.94 21 18.5 21c.39 0 .77-.01 1.15-.04.44-.03.65-.05.85-.16.16-.09.32-.26.4-.43.09-.2.09-.44.09-.92v-2.82c0-.4 0-.6-.07-.78a1.5 1.5 0 0 0-.64-.63c-.14-.06-.33-.13-.71-.27l-2.84-.86c-.44-.16-.66-.24-.87-.23a1.5 1.5 0 0 0-.72.21c-.17.12-.29.32-.53.73L14 16c-2.65-1.2-4.8-3.35-6-6l1.37-.82c.4-.24.6-.36.73-.53a1.5 1.5 0 0 0 .21-.72c.01-.21-.07-.43-.23-.87l-.86-2.84c-.14-.38-.21-.57-.27-.71a1.5 1.5 0 0 0-.63-.64C7.93 3 7.73 3 7.33 3H4.56c-.48 0-.72 0-.93.1-.16.09-.33.25-.43.4C3.09 3.7 3.07 3.92 3.04 4.35 3.01 4.73 3 5.11 3 5.5z"/>
              </svg>
              <a href="tel:+19058585589" className="zfc-booking__sidebar-contact-link">+1 (905) 858-5589</a>
            </div>
            <div className="zfc-booking__sidebar-contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:info@zfcanada.com" className="zfc-booking__sidebar-contact-link">info@zfcanada.com</a>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="zfc-booking__content">

          {/* ── Step 1: Service ── */}
          {step === 1 && (
            <div className="zfc-booking__pane">
              <h3 className="zfc-booking__pane-title">Select a Service</h3>
              <p className="zfc-booking__pane-sub">Choose the immigration service you&apos;d like to consult about.</p>

              <div className="zfc-booking__service-select-wrap">
                <div className="zfc-booking__service-select-field">
                  <label className="zfc-booking__form-label" htmlFor="service-select">Service</label>
                  <div className="zfc-booking__select-outer">
                    <select
                      id="service-select"
                      className="zfc-booking__select"
                      value={booking.service?.name ?? ""}
                      onChange={(e) => {
                        const svc = SERVICES.find((s) => s.name === e.target.value) ?? null;
                        setBooking((b) => ({ ...b, service: svc }));
                      }}
                    >
                      <option value="" disabled>— Select a service —</option>
                      {SERVICES.map((svc) => (
                        <option key={svc.name} value={svc.name}>
                          {svc.name}
                        </option>
                      ))}
                    </select>
                    <span className="zfc-booking__select-arrow" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {booking.service && (
                  <div className="zfc-booking__service-preview">
                    <div className="zfc-booking__service-preview-row">
                      <span className="zfc-booking__service-preview-name">{booking.service.name}</span>
                      <span className="zfc-booking__service-preview-price">${booking.service.price.toFixed(2)}</span>
                    </div>
                    <p className="zfc-booking__service-preview-note">45-minute consultation · Mississauga, ON</p>
                  </div>
                )}
              </div>

              <div className="zfc-booking__nav">
                <button
                  type="button"
                  className="zfc-booking__btn-next"
                  disabled={!booking.service}
                  onClick={() => setStep(2)}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Date & Time ── */}
          {step === 2 && (
            <div className="zfc-booking__pane">
              <h3 className="zfc-booking__pane-title">Pick a Date &amp; Time</h3>
              <p className="zfc-booking__pane-sub">All appointments are 45 minutes. Monday to Friday only.</p>

              <div className="zfc-booking__calendar">
                <div className="zfc-booking__cal-header">
                  <button
                    type="button"
                    className="zfc-booking__cal-nav"
                    aria-label="Previous month"
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                  >
                    ‹
                  </button>
                  <span className="zfc-booking__cal-month">
                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </span>
                  <button
                    type="button"
                    className="zfc-booking__cal-nav"
                    aria-label="Next month"
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                  >
                    ›
                  </button>
                </div>

                <div className="zfc-booking__cal-grid">
                  {DAYS.map((d) => (
                    <div key={d} className="zfc-booking__cal-dow">{d}</div>
                  ))}
                  {calendarCells.map((cell, i) => {
                    if (!cell) return <div key={`e-${i}`} className="zfc-booking__cal-empty" />;
                    const dow      = cell.getDay(); // 0=Sun,6=Sat
                    const isWE     = dow === 0 || dow === 6;
                    const isPast   = cell < today;
                    const disabled = isWE || isPast;
                    const selected = booking.date ? sameDay(cell, booking.date) : false;
                    const isToday  = sameDay(cell, today);
                    return (
                      <button
                        key={cell.toISOString()}
                        type="button"
                        disabled={disabled}
                        className={[
                          "zfc-booking__cal-day",
                          disabled ? "zfc-booking__cal-day--disabled" : "",
                          isWE     ? "zfc-booking__cal-day--weekend"  : "",
                          isToday && !selected ? "zfc-booking__cal-day--today" : "",
                          selected ? "zfc-booking__cal-day--selected" : "",
                        ].filter(Boolean).join(" ")}
                        onClick={() => setBooking((b) => ({ ...b, date: cell, time: "" }))}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {booking.date && (
                <div className="zfc-booking__timeslots">
                  <h4 className="zfc-booking__timeslots-title">
                    Available Times — {formatDate(booking.date)}
                  </h4>
                  <div className="zfc-booking__timeslots-grid">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`zfc-booking__slot${booking.time === slot ? " zfc-booking__slot--selected" : ""}`}
                        onClick={() => setBooking((b) => ({ ...b, time: slot }))}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="zfc-booking__nav">
                <button type="button" className="zfc-booking__btn-back" onClick={() => setStep(1)}>← Back</button>
                <button
                  type="button"
                  className="zfc-booking__btn-next"
                  disabled={!booking.date || !booking.time}
                  onClick={() => setStep(3)}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Info ── */}
          {step === 3 && (
            <div className="zfc-booking__pane">
              <h3 className="zfc-booking__pane-title">Your Information</h3>
              <p className="zfc-booking__pane-sub">Provide your contact details to confirm your appointment.</p>

              <form className="zfc-booking__form" onSubmit={handleSubmit}>
                <div className="zfc-booking__form-row">
                  <div className="zfc-booking__form-field">
                    <label className="zfc-booking__form-label">First Name</label>
                    <input
                      type="text" className="zfc-booking__form-input" placeholder="First name" required
                      value={booking.firstName}
                      onChange={(e) => setBooking((b) => ({ ...b, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="zfc-booking__form-field">
                    <label className="zfc-booking__form-label">Last Name</label>
                    <input
                      type="text" className="zfc-booking__form-input" placeholder="Last name" required
                      value={booking.lastName}
                      onChange={(e) => setBooking((b) => ({ ...b, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="zfc-booking__form-field">
                  <label className="zfc-booking__form-label">Email Address</label>
                  <input
                    type="email" className="zfc-booking__form-input" placeholder="your@email.com" required
                    value={booking.email}
                    onChange={(e) => setBooking((b) => ({ ...b, email: e.target.value }))}
                  />
                </div>

                <div className="zfc-booking__form-field">
                  <label className="zfc-booking__form-label">Phone Number</label>
                  <input
                    type="tel" className="zfc-booking__form-input" placeholder="+1 (000) 000-0000" required
                    value={booking.phone}
                    onChange={(e) => setBooking((b) => ({ ...b, phone: e.target.value }))}
                  />
                </div>

                <div className="zfc-booking__summary">
                  <div className="zfc-booking__summary-row">
                    <span className="zfc-booking__summary-label">Service</span>
                    <span className="zfc-booking__summary-value">{booking.service?.name}</span>
                  </div>
                  <div className="zfc-booking__summary-row">
                    <span className="zfc-booking__summary-label">Date</span>
                    <span className="zfc-booking__summary-value">{booking.date ? formatDate(booking.date) : ""}</span>
                  </div>
                  <div className="zfc-booking__summary-row">
                    <span className="zfc-booking__summary-label">Time</span>
                    <span className="zfc-booking__summary-value">{booking.time}</span>
                  </div>
                  <div className="zfc-booking__summary-row">
                    <span className="zfc-booking__summary-label">Duration</span>
                    <span className="zfc-booking__summary-value">45 minutes</span>
                  </div>
                  <div className="zfc-booking__summary-row zfc-booking__summary-row--total">
                    <span className="zfc-booking__summary-label">Consultation Fee</span>
                    <span className="zfc-booking__summary-price">${booking.service?.price.toFixed(2)}</span>
                  </div>
                </div>

                {submitState === "error" && (
                  <p className="zfc-booking__error">Something went wrong. Please try again.</p>
                )}

                <div className="zfc-booking__nav">
                  <button type="button" className="zfc-booking__btn-back" onClick={() => setStep(2)}>← Back</button>
                  <button
                    type="submit"
                    className="zfc-booking__btn-next"
                    disabled={submitState === "loading"}
                  >
                    {submitState === "loading" ? "Booking…" : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── Step 4: Confirmation ── */}
          {step === 4 && (
            <div className="zfc-booking__pane zfc-booking__pane--confirm">
              <div className="zfc-booking__confirm-icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="zfc-booking__confirm-title">Booking Confirmed!</h3>
              <p className="zfc-booking__confirm-sub">
                Thank you, {booking.firstName}. Your consultation has been booked.
                We&apos;ll reach out to {booking.email} to confirm your appointment.
              </p>

              <div className="zfc-booking__confirm-details">
                <div className="zfc-booking__confirm-row">
                  <span className="zfc-booking__confirm-label">Service</span>
                  <span className="zfc-booking__confirm-value">{booking.service?.name}</span>
                </div>
                <div className="zfc-booking__confirm-row">
                  <span className="zfc-booking__confirm-label">Date</span>
                  <span className="zfc-booking__confirm-value">{booking.date ? formatDate(booking.date) : ""}</span>
                </div>
                <div className="zfc-booking__confirm-row">
                  <span className="zfc-booking__confirm-label">Time</span>
                  <span className="zfc-booking__confirm-value">{booking.time}</span>
                </div>
                <div className="zfc-booking__confirm-row">
                  <span className="zfc-booking__confirm-label">Duration</span>
                  <span className="zfc-booking__confirm-value">45 minutes</span>
                </div>
                <div className="zfc-booking__confirm-row">
                  <span className="zfc-booking__confirm-label">Location</span>
                  <span className="zfc-booking__confirm-value">214-808 Britannia Rd W, Mississauga, ON L5V 0A7</span>
                </div>
              </div>

              <div className="zfc-booking__calendar-btns">
                <p className="zfc-booking__calendar-label">Add to your calendar</p>
                <div className="zfc-booking__calendar-row">
                  <a href={googleCalLink()} target="_blank" rel="noopener noreferrer" className="zfc-booking__cal-btn zfc-booking__cal-btn--google">
                    Google Calendar
                  </a>
                  <a href={outlookLink()} target="_blank" rel="noopener noreferrer" className="zfc-booking__cal-btn zfc-booking__cal-btn--outlook">
                    Outlook
                  </a>
                  <a href={yahooLink()} target="_blank" rel="noopener noreferrer" className="zfc-booking__cal-btn zfc-booking__cal-btn--yahoo">
                    Yahoo
                  </a>
                  <a
                    href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent())}`}
                    download="consultation.ics"
                    className="zfc-booking__cal-btn zfc-booking__cal-btn--apple"
                  >
                    Apple Calendar
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
