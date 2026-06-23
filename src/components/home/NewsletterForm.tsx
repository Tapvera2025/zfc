"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || state === "loading") return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setState("success");
      } else {
        setState("error");
        setErrorMsg(json?.message || "We could not subscribe this email right now. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("We could not reach the newsletter service. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="zfc-footer__newsletter-form" style={{ justifyContent: "center", gap: "10px" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span style={{ color: "white", fontSize: "14px", fontWeight: 500 }}>
          You&apos;re subscribed! Thanks for joining.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="zfc-footer__newsletter-form">
        <span className="zfc-footer__newsletter-at">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
          </svg>
        </span>
        <input
          type="email"
          placeholder="Enter your email"
          className="zfc-footer__newsletter-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
          required
        />
        <button
          type="submit"
          className="zfc-footer__newsletter-btn"
          disabled={state === "loading"}
        >
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {state === "error" && (
        <p style={{ color: "#ff8080", fontSize: "12px", marginTop: "8px" }}>{errorMsg}</p>
      )}
    </form>
  );
}
