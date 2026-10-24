"use client";

import { useState } from "react";

const projectTypes = [
  "Custom Shopify 2.0",
  "Speed & Core Web Vitals",
  "Store Migration",
  "Monthly Retainer",
  "Other / Custom",
];

const budgetRanges = [
  "< $1,500",
  "$1,500 – $3,500",
  "$3,500 – $7,000",
  "$7,000+",
];

const auditConcerns = [
  "Mobile Speed & Web Vitals",
  "Conversion & Checkout Drop-off",
  "Theme Bugs & Broken Layout",
  "General UX Health Check",
];

export function ProjectInquiryForm() {
  const [formMode, setFormMode] = useState<"inquiry" | "audit">("inquiry");

  // Project Inquiry State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Custom Shopify 2.0");
  const [budget, setBudget] = useState("$1,500 – $3,500");
  const [message, setMessage] = useState("");

  // Store Audit State
  const [storeUrl, setStoreUrl] = useState("");
  const [auditContact, setAuditContact] = useState("");
  const [auditConcern, setAuditConcern] = useState("Mobile Speed & Web Vitals");
  const [auditNotes, setAuditNotes] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formMode === "inquiry") {
      if (!name.trim() || !email.trim() || !message.trim()) {
        setStatus("error");
        setErrorMessage("Please fill in your name, email, and a brief message.");
        return;
      }
    } else {
      if (!storeUrl.trim()) {
        setStatus("error");
        setErrorMessage("Please enter your store URL (e.g. yourstore.com).");
        return;
      }
      if (!auditContact.trim()) {
        setStatus("error");
        setErrorMessage("Please enter your email or WhatsApp number so I can send the audit.");
        return;
      }
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const isAudit = formMode === "audit";
      const subject = isAudit
        ? `⚡ Free Shopify Store Audit Request: ${storeUrl.trim()}`
        : `New Shopify Inquiry: ${name.trim()} (${projectType})`;

      // 1. Submit directly to Web3Forms
      const web3Payload = isAudit
        ? {
            access_key: "6d6f4bc4-52d0-4206-bc7e-1db790d7954f",
            subject,
            from_name: "Lokesh Portfolio - Free Audit Request",
            "Store URL": storeUrl.trim(),
            "Contact (Email/WhatsApp)": auditContact.trim(),
            "Primary Focus": auditConcern,
            "Additional Notes": auditNotes.trim() || "None",
            message: `Free Store Audit Requested for: ${storeUrl.trim()}\nContact: ${auditContact.trim()}\nPrimary Focus: ${auditConcern}\nNotes: ${auditNotes.trim() || "None"}`,
          }
        : {
            access_key: "6d6f4bc4-52d0-4206-bc7e-1db790d7954f",
            subject,
            from_name: "Lokesh Portfolio",
            name: name.trim(),
            email: email.trim(),
            "Project Type": projectType,
            "Estimated Budget": budget,
            message: message.trim(),
          };

      const web3Promise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3Payload),
      }).catch((e) => {
        console.warn("[Web3Forms Client Send Failed]", e);
        return null;
      });

      // 2. Also forward to internal /api/contact/
      const apiPayload = isAudit
        ? {
            mode: "audit",
            storeUrl: storeUrl.trim(),
            contact: auditContact.trim(),
            concern: auditConcern,
            notes: auditNotes.trim(),
          }
        : {
            mode: "inquiry",
            name: name.trim(),
            email: email.trim(),
            projectType,
            budget,
            message: message.trim(),
          };

      const apiPromise = fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      }).catch(() => null);

      const [web3Res, apiRes] = await Promise.all([web3Promise, apiPromise]);

      if ((web3Res && web3Res.ok) || (apiRes && apiRes.ok)) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Unable to send request right now. Please message directly on WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please send a message directly via WhatsApp or email.");
    }
  }

  if (status === "success") {
    const isAudit = formMode === "audit";
    return (
      <div className="inquiry-card is-success" role="status" aria-live="polite">
        <div className="inquiry-success-badge" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="inquiry-title">{isAudit ? "Audit request received! ⚡" : "Inquiry received!"}</h3>
        <p className="inquiry-desc">
          {isAudit ? (
            <>
              Thank you! I will personally inspect <strong>{storeUrl}</strong> focusing on <strong>{auditConcern.toLowerCase()}</strong> and prepare 3 actionable fixes.
            </>
          ) : (
            <>
              Thank you <strong>{name}</strong>! Your requirements for <strong>{projectType}</strong> (Budget: {budget}) have been sent directly to Lokesh.
            </>
          )}
        </p>
        <p className="inquiry-reply-note">
          {isAudit ? (
            <>Expect your audit at <strong>{auditContact}</strong> within 12–24 hours.</>
          ) : (
            <>Expect a tailored response at <strong>{email}</strong> within 12–24 hours.</>
          )}
        </p>
        <div className="inquiry-success-actions">
          <a
            href={
              isAudit
                ? `https://wa.me/918120805721?text=${encodeURIComponent(`Hi Lokesh, I just requested a Free Shopify Store Audit for ${storeUrl}. My main focus is ${auditConcern}.`)}`
                : `https://wa.me/918120805721?text=${encodeURIComponent(`Hi Lokesh, I just submitted an inquiry on your website for ${projectType} (Budget: ${budget}). Brief: ${message}`)}`
            }
            target="_blank"
            rel="noreferrer"
            className="button button-whatsapp"
          >
            <span>{isAudit ? "Ping on WhatsApp for Instant Review" : "Ping on WhatsApp for Instant Reply"}</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <button
            type="button"
            className="button button-outline"
            onClick={() => {
              if (isAudit) {
                setStoreUrl("");
                setAuditContact("");
                setAuditNotes("");
              } else {
                setName("");
                setEmail("");
                setMessage("");
              }
              setStatus("idle");
            }}
          >
            {isAudit ? "Request another audit" : "Send another inquiry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="inquiry-card" onSubmit={handleSubmit} noValidate>
      {/* Mode Switcher Tabs: Project Inquiry vs Free Store Audit */}
      <div className="inquiry-mode-tabs" role="tablist" aria-label="Select inquiry type">
        <button
          type="button"
          role="tab"
          aria-selected={formMode === "inquiry"}
          className={`inquiry-mode-tab ${formMode === "inquiry" ? "is-active" : ""}`}
          onClick={() => {
            setFormMode("inquiry");
            setStatus("idle");
            setErrorMessage("");
          }}
        >
          <span>💼 Project Inquiry</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={formMode === "audit"}
          className={`inquiry-mode-tab ${formMode === "audit" ? "is-active" : ""}`}
          onClick={() => {
            setFormMode("audit");
            setStatus("idle");
            setErrorMessage("");
          }}
        >
          <span className="audit-tab-pill">⚡ Free</span>
          <span>Store Audit</span>
        </button>
      </div>

      {formMode === "inquiry" ? (
        <>
          <div className="inquiry-header">
            <span className="inquiry-badge">Start a project</span>
            <h3 className="inquiry-title">Tell me about your store</h3>
            <p className="inquiry-subtitle">Fill in the quick brief below or email me directly.</p>
          </div>

          {status === "error" && (
            <div className="inquiry-error-banner" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Project Type Pills */}
          <div className="inquiry-field">
            <label className="inquiry-label">Project Type</label>
            <div className="inquiry-pills-grid" role="group" aria-label="Project Type Selection">
              {projectTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`inquiry-pill ${projectType === type ? "is-selected" : ""}`}
                  onClick={() => setProjectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Name and Email Grid */}
          <div className="inquiry-row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name" className="inquiry-label">
                Your Name <span className="req">*</span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                className="inquiry-input"
                placeholder="e.g. Peter Clarkson"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inquiry-field">
              <label htmlFor="inquiry-email" className="inquiry-label">
                Work Email <span className="req">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                className="inquiry-input"
                placeholder="e.g. founder@brand.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Estimated Budget Pills */}
          <div className="inquiry-field">
            <label className="inquiry-label">Estimated Budget (USD)</label>
            <div className="inquiry-budget-pills" role="group" aria-label="Estimated Budget Selection">
              {budgetRanges.map((range) => (
                <button
                  type="button"
                  key={range}
                  className={`inquiry-budget-pill ${budget === range ? "is-selected" : ""}`}
                  onClick={() => setBudget(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div className="inquiry-field">
            <label htmlFor="inquiry-message" className="inquiry-label">
              Project Brief / Message <span className="req">*</span>
            </label>
            <textarea
              id="inquiry-message"
              rows={3}
              required
              className="inquiry-textarea"
              placeholder="Describe your store goals, current platform, timeline, or links to references..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="inquiry-footer">
            <button
              type="submit"
              className="button button-primary inquiry-submit-btn"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <span className="inquiry-spinner" aria-hidden="true" />
                  <span>Sending inquiry...</span>
                </>
              ) : (
                <>
                  <span>Send Project Inquiry</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </button>

            <span className="inquiry-trust-note">
              🔒 Direct to Lokesh · Zero spam · Replies in under 24h
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="inquiry-header">
            <span className="inquiry-badge audit-badge">⚡ 100% Free · Zero Obligation</span>
            <h3 className="inquiry-title">Free Shopify Speed &amp; UX Audit</h3>
            <p className="inquiry-subtitle">
              Drop your store URL below. I’ll send you 3 high-impact fixes for mobile speed &amp; checkout conversion.
            </p>
          </div>

          {status === "error" && (
            <div className="inquiry-error-banner" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Store URL Input */}
          <div className="inquiry-field">
            <label htmlFor="audit-store-url" className="inquiry-label">
              Shopify Store URL <span className="req">*</span>
            </label>
            <input
              id="audit-store-url"
              type="text"
              required
              className="inquiry-input"
              placeholder="e.g. yourbrand.com or brand.myshopify.com"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
            />
          </div>

          {/* Contact (Email or WhatsApp) */}
          <div className="inquiry-field">
            <label htmlFor="audit-contact" className="inquiry-label">
              Where should I send the audit? (Email or WhatsApp) <span className="req">*</span>
            </label>
            <input
              id="audit-contact"
              type="text"
              required
              className="inquiry-input"
              placeholder="e.g. founder@brand.com or +1 (555) 019-2834"
              value={auditContact}
              onChange={(e) => setAuditContact(e.target.value)}
            />
          </div>

          {/* Main Focus Area Pills */}
          <div className="inquiry-field">
            <label className="inquiry-label">Primary Concern / Goal</label>
            <div className="inquiry-pills-grid" role="group" aria-label="Primary Concern Selection">
              {auditConcerns.map((concern) => (
                <button
                  type="button"
                  key={concern}
                  className={`inquiry-pill ${auditConcern === concern ? "is-selected" : ""}`}
                  onClick={() => setAuditConcern(concern)}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Notes */}
          <div className="inquiry-field">
            <label htmlFor="audit-notes" className="inquiry-label">
              Specific Page or Issue <span className="inquiry-optional">(Optional)</span>
            </label>
            <textarea
              id="audit-notes"
              rows={2}
              className="inquiry-textarea"
              placeholder="e.g. 'PDP loads slowly on mobile', or 'cart drawer glitch on Safari'..."
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="inquiry-footer">
            <button
              type="submit"
              className="button button-primary inquiry-submit-btn"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <span className="inquiry-spinner" aria-hidden="true" />
                  <span>Submitting audit request...</span>
                </>
              ) : (
                <>
                  <span>Request Free 5-Min Store Audit</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </>
              )}
            </button>

            <span className="inquiry-trust-note">
              ⚡ 100% Free · No sales calls · Personalized audit within 24h
            </span>
          </div>
        </>
      )}
    </form>
  );
}
