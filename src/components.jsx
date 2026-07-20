import { useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics/react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  SEVERITY_STYLE, TIMING_COLORS, DOMAINS,
  CALENDLY, CONTACT_EMAIL, LINKEDIN_URL,
  SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  FORMSPREE_URL,
  mailtoHref,
} from "./constants.js";
import { OFFERS } from "./offerArchitecture.js";

// ─── BADGES & TAGS ───────────────────────────────────────────

export function SeverityBadge({ severity }) {
  const s = SEVERITY_STYLE[severity];
  return (
    <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: RADIUS.sm, fontSize: "0.72rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: s.text, background: s.bg, border: `1px solid ${s.border}`, lineHeight: 1, minWidth: "80px", textAlign: "center" }}>
      {severity}
    </span>
  );
}

export function TimingBadge({ timing }) {
  return (
    <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: RADIUS.sm, fontSize: "0.72rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "white", background: TIMING_COLORS[timing] || COLORS.ongoing, lineHeight: 1, minWidth: "auto", textAlign: "center" }}>
      {timing}
    </span>
  );
}

export function DomainTag({ domain }) {
  const d = DOMAINS[domain];
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: RADIUS.sm, fontSize: "0.72rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: COLORS.steel, background: `${COLORS.steel}12`, border: `1px solid ${COLORS.steel}25` }}>
      {d.short}
    </span>
  );
}

// ─── BUTTONS ─────────────────────────────────────────────────

export function CTAButton({ text, variant, style: extraStyle, showAvailability, location = "shared_cta" }) {
  const isPrimary = variant !== "secondary";
  const btnStyle = isPrimary ? PRIMARY_BTN : SECONDARY_BTN;
  const hoverBg = isPrimary ? "#571825" : `${COLORS.navy}08`;
  const restoreBg = isPrimary ? COLORS.gold : "transparent";
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
        style={{ ...btnStyle, ...extraStyle }}
        onClick={() => track("fit_check_click", { location })}
        onMouseEnter={e => { e.currentTarget.style.background = hoverBg; }}
        onMouseLeave={e => { e.currentTarget.style.background = restoreBg; }}>
        {text || "Book a Fit Check"}
      </a>
      {showAvailability && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy }}>
          Limited concurrent capacity. Every engagement is led directly by Hassan.
        </span>
      )}
    </div>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "16px" : "12px" }}>
      <h2 className={`section-title${sub ? " section-title-sub" : ""}`} style={{
        fontFamily: FONTS.heading,
        fontSize: sub ? "1rem" : "1.4rem",
        fontWeight: sub ? 600 : 400,
        color: COLORS.navy,
        lineHeight: 1.3,
        marginTop: 0
      }}>
        {children}
      </h2>
    </div>
  );
}

export const PRIMARY_BTN = { display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 32px", background: COLORS.gold, color: "#FFFFFF", fontFamily: "'Inter', -apple-system, 'Helvetica Neue', sans-serif", fontSize: "0.9rem", fontWeight: 600, border: "none", borderRadius: "8px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" };
export const SECONDARY_BTN = { display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: "transparent", color: COLORS.navy, fontFamily: "'Inter', -apple-system, 'Helvetica Neue', sans-serif", fontSize: "0.9rem", fontWeight: 500, border: "1.5px solid #D6D4CE", borderRadius: "8px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" };

export function ButtonPair({
  primaryText = "Book a Fit Check",
  primaryAction,
  secondaryText,
  secondaryAction,
  primaryLink = CALENDLY,
  secondaryLink,
  showAvailability = false
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
        {primaryLink ? (
          <a href={primaryLink} target="_blank" rel="noopener noreferrer"
             style={PRIMARY_BTN}
             onClick={() => track("cta_click", { label: primaryText, destination: primaryLink })}
             onMouseEnter={e => { e.currentTarget.style.background = "#571825"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(110,31,46,0.25)"; }}
             onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {primaryText}
          </a>
        ) : (
          <button onClick={primaryAction}
             style={PRIMARY_BTN}
             onMouseEnter={e => { e.currentTarget.style.background = "#571825"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(110,31,46,0.25)"; }}
             onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {primaryText}
          </button>
        )}

        {(secondaryText || secondaryAction || secondaryLink) && (
          secondaryLink ? (
            <a href={secondaryLink} target="_blank" rel="noopener noreferrer"
               style={SECONDARY_BTN}
               onClick={() => track("cta_click", { label: secondaryText, destination: secondaryLink })}
               onMouseEnter={e => { e.currentTarget.style.borderColor = "#1B1C1F"; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = "#D6D4CE"; }}>
              {secondaryText}
            </a>
          ) : (
            <button onClick={secondaryAction}
               style={SECONDARY_BTN}
               onMouseEnter={e => { e.currentTarget.style.borderColor = "#1B1C1F"; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = "#D6D4CE"; }}>
              {secondaryText}
            </button>
          )
        )}
      </div>
      {showAvailability && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, marginTop: "8px" }}>
          Limited concurrent capacity. Every engagement is led directly by Hassan.
        </span>
      )}
    </div>
  );
}

export function Card({ children, style: extraStyle }) {
  return (
    <div className="card-inner" style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: "28px", marginBottom: SPACING.md, boxShadow: SHADOWS.sm, ...extraStyle }}>
      {children}
    </div>
  );
}

// ─── TIMELINE RAIL ───────────────────────────────────────────

export function TimelineRail({ items, compact = false }) {
  return (
    <div className="timeline-rail" style={{ position: "relative", paddingLeft: compact ? "40px" : "60px" }}>
      <div style={{ position: "absolute", left: compact ? "15px" : "23px", top: "12px", bottom: "12px", width: "2px", background: COLORS.steel, zIndex: 0 }} />

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isActive = item.active;
        const isCompleted = item.completed;

        let nodeColor = COLORS.white;
        let nodeBorder = COLORS.steel;
        let cardGlow = "none";

        if (isCompleted) {
          nodeColor = COLORS.steel;
          nodeBorder = COLORS.steel;
        } else if (isActive) {
          nodeColor = COLORS.gold;
          nodeBorder = COLORS.gold;
          cardGlow = `0 0 0 3px rgba(214, 166, 63, 0.15)`;
        }

        return (
          <div key={i} style={{ position: "relative", marginBottom: isLast ? "0" : (compact ? "24px" : SPACING.lg) }}>
            <div style={{ position: "absolute", left: compact ? "-32px" : "-46px", top: "12px", width: compact ? "16px" : "18px", height: compact ? "16px" : "18px", borderRadius: "50%", background: nodeColor, border: `3px solid ${nodeBorder}`, boxShadow: isActive ? `0 0 0 4px rgba(214, 166, 63, 0.1)` : "none", zIndex: 1 }} />

            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: compact ? "16px" : SPACING.md, boxShadow: cardGlow !== "none" ? `${SHADOWS.sm}, ${cardGlow}` : SHADOWS.sm, transition: "all 0.3s ease" }}>
              {(item.title || item.meta) && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: item.description ? "8px" : "0", gap: SPACING.sm, flexWrap: "wrap" }}>
                  {item.title && (
                    <h3 style={{ fontFamily: FONTS.heading, fontSize: compact ? "1rem" : "1.1rem", color: COLORS.navy, margin: 0, flex: "1 1 auto" }}>
                      {item.title}
                    </h3>
                  )}
                  {item.meta && (
                    <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: isActive ? COLORS.gold : COLORS.steel, fontWeight: 600, flexShrink: 0 }}>
                      {item.meta}
                    </span>
                  )}
                </div>
              )}

              {item.description && (
                <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, margin: item.items ? "0 0 12px 0" : "0" }}>
                  {item.description}
                </p>
              )}

              {item.items && item.items.length > 0 && (
                <ul style={{ paddingLeft: "20px", margin: item.deliverable ? "0 0 12px 0" : "0" }}>
                  {item.items.map((subItem, j) => (
                    <li key={j} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "4px" }}>
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}

              {item.deliverable && (
                <div style={{ padding: "10px 14px", background: COLORS.offWhite, borderRadius: "6px", display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                  <span className="timeline-deliverable-label" style={{ fontFamily: FONTS.body, fontSize: "0.72rem", color: COLORS.navy, letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 700, flexShrink: 0 }}>
                    Deliverable
                  </span>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, fontWeight: 500 }}>
                    {item.deliverable}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SPLIT CONTRAST ──────────────────────────────────────────

export function SplitContrast({ leftSide, rightSide }) {
  return (
    <div className="split-contrast" style={{ display: "grid", gap: "0", borderRadius: RADIUS.lg, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
      <div style={{ background: COLORS.navy, color: COLORS.offWhite, padding: SPACING.lg, display: "flex", flexDirection: "column", position: "relative" }}>
        {leftSide.title && (
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.3rem", color: COLORS.gold, margin: "0 0 16px 0", letterSpacing: "0.5px" }}>
            {leftSide.title}
          </h3>
        )}
        {leftSide.description && (
          <p style={{ fontFamily: FONTS.body, color: COLORS.offWhite, lineHeight: 1.7, marginBottom: leftSide.items ? "20px" : "0", opacity: 0.95 }}>
            {leftSide.description}
          </p>
        )}
        {leftSide.items && leftSide.items.length > 0 && (
          <ul style={{ paddingLeft: "20px", margin: "0", flex: "1" }}>
            {leftSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.offWhite, lineHeight: 1.7, marginBottom: "12px", opacity: 0.9 }}>
                {typeof item === "string" ? item : (
                  <><strong style={{ color: COLORS.gold }}>{item.title}:</strong> {item.body}</>
                )}
              </li>
            ))}
          </ul>
        )}
        <div style={{ position: "absolute", right: "-1px", top: "0", bottom: "0", width: "4px", background: `linear-gradient(180deg, ${COLORS.gold} 0%, ${COLORS.steel} 100%)`, zIndex: 1 }} />
      </div>

      <div style={{ background: COLORS.offWhite, color: COLORS.charcoal, padding: SPACING.lg, display: "flex", flexDirection: "column" }}>
        {rightSide.title && (
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.3rem", color: COLORS.navy, margin: "0 0 16px 0", letterSpacing: "0.5px" }}>
            {rightSide.title}
          </h3>
        )}
        {rightSide.description && (
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: rightSide.items ? "20px" : "0" }}>
            {rightSide.description}
          </p>
        )}
        {rightSide.items && rightSide.items.length > 0 && (
          <ul style={{ paddingLeft: "20px", margin: "0", flex: "1" }}>
            {rightSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "12px" }}>
                {typeof item === "string" ? item : (
                  <><strong style={{ color: COLORS.gold }}>{item.title}:</strong> {item.body}</>
                )}
              </li>
            ))}
          </ul>
        )}
        {rightSide.highlight && (
          <div style={{ marginTop: "auto", padding: "12px 16px", background: COLORS.white, border: `2px solid ${COLORS.gold}`, borderRadius: RADIUS.md }}>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, fontWeight: 600, margin: 0 }}>
              {rightSide.highlight}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION ─────────────────────────────────────────────────

export function Section({ title, subtitle, children, primaryCTA, secondaryCTA, noCTA, centered, background, noPadding, type, id, variant }) {
  const isWindowWithCards = type === "windowWithCards";
  const isTinted = variant === "tinted";
  const defaultBackground = isWindowWithCards ? COLORS.offWhite : COLORS.white;

  const classNames = [
    "section-wrapper",
    isTinted ? "section-tinted" : "section-contained",
    noPadding ? "section-no-pad" : ""
  ].filter(Boolean).join(" ");

  const sectionStyle = isTinted
    ? { background: "#F8F7F4", marginBottom: 0 }
    : {
        background: background || defaultBackground,
        border: "1px solid #E4E2DC",
        borderRadius: "12px",
        padding: noPadding ? "0" : "48px 40px",
        marginBottom: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      };

  return (
    <div className={classNames} style={sectionStyle} id={id}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {subtitle && (
        <p style={{ fontFamily: FONTS.body, color: COLORS.bodyMuted, lineHeight: 1.7, marginTop: "-16px", marginBottom: "20px" }}>
          {subtitle}
        </p>
      )}
      <div style={{ marginBottom: (primaryCTA || secondaryCTA) && !noCTA ? "24px" : "0" }}>
        {children}
      </div>
      {!noCTA && (primaryCTA || secondaryCTA) && (
        <ButtonPair
          primaryText={primaryCTA?.text}
          primaryLink={primaryCTA?.link ?? null}
          primaryAction={primaryCTA?.action}
          secondaryText={secondaryCTA?.text}
          secondaryLink={secondaryCTA?.link ?? null}
          secondaryAction={secondaryCTA?.action}
          centered={centered}
        />
      )}
    </div>
  );
}

// ─── SHARED PAGE COMPONENTS ──────────────────────────────────
// FAQBlock used by both LeverExplorer and ServicesPage

export function FAQBlock({ variant }) {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  const faqs = [
    { q: "Do you replace the operating team?", a: "No. I install the operating system—governance, cadence, and controls—while ownership stays internal." },
    { q: "How do you work with an Operating Partner or platform COO?", a: "Devonshire does not replace either. I own the transaction-specific evidence, dependencies, Day-1 sequence, and 100-day operating architecture that senior leaders need but may not have capacity to produce while running the platform and the deal pipeline." },
    { q: "What do you need from us?", a: "A lightweight, targeted artifact pull tailored to the deal—typically organization and process materials, KPI reporting, vendor and contract data, incident or escalation history, change records, and relevant audit evidence—plus focused stakeholder access." },
    { q: "How do you handle confidentiality?", a: "NDA-friendly by default. Minimal data handling; formats can be anonymized." },
    { q: "When are you not a fit?", a: "If the company already has mature incident/change governance, a live KPI cadence, and low volatility, you likely don't need stabilization—only optimization." },
    { q: "What does 100-Day Operating Design produce?", a: "The engagement produces a 100-Day Operating Playbook—not a slide deck. It defines which gaps to address, in what sequence, with what accountability structure, and how progress will be measured. It converts validated findings into an operating plan management can own after the engagement." },
    { q: "What industries do you cover?", a: "Devonshire is designed for financial services, fintech, market infrastructure, and acquisition-heavy professional and tech-enabled services. The method travels across sectors; the evidence requests and selected levers remain company-specific." },
    { q: "How long does an Execution Risk Review take?", a: "Typically 2–3 weeks from data receipt to the Execution Risk Memo, assuming standard access to organization, process, KPI, vendor, control, and risk evidence. Expedited timelines may be possible for deals in exclusivity—discuss during the Fit Check." },
    { q: "What if we're still in LOI or haven't entered exclusivity yet?", a: "Earlier is better. A light-touch review can shape the diligence scope and identify the evidence required once access expands. Even limited materials—an organization chart, KPI pack, vendor list, process documentation, and management interviews—can reveal ownership, visibility, and key-person risks." },
    { q: "Do you work with family offices?", a: "Yes. The work is most relevant where a direct-investing family office inherits a founder-led operating model without a dedicated portfolio-operations bench. Depending on the trigger, the starting point may be an Execution Risk Review, an Operating Control Sprint, or a Post-Close Control Tower for longer-hold sponsor visibility." },
  ];

  const workingWithMe = faqs.filter((_, i) => [0,1,2,3,4,6,9].includes(i));
  const engagementProcess = faqs.filter((_, i) => [5,7,8].includes(i));

  const q = { fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, margin: 0, flex: 1 };
  const a = { fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, margin: 0, paddingBottom: "14px" };

  const renderFAQItem = (item, globalIndex) => (
    <div key={globalIndex} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      <button
        className="faq-row"
        id={`faq-button-${globalIndex}`}
        aria-expanded={open === globalIndex}
        aria-controls={`faq-panel-${globalIndex}`}
        onClick={() => toggle(globalIndex)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={q}>{item.q}</h3>
        <span className="expand-icon" style={{ color: COLORS.steel, fontSize: "1rem", marginLeft: "12px", flexShrink: 0 }}>
          {open === globalIndex ? "▾" : "▸"}
        </span>
      </button>
      {open === globalIndex && (
        <p id={`faq-panel-${globalIndex}`} role="region" aria-labelledby={`faq-button-${globalIndex}`} style={a}>{item.a}</p>
      )}
    </div>
  );

  return (
    <Section title="FAQ" noCTA variant={variant} background={variant ? undefined : `${COLORS.navy}04`}>
      <div className="faq-categories" style={{ borderTop: `2px solid ${COLORS.gold}30`, paddingTop: SPACING.md }}>
        <div className="faq-category">
          <h3 className="faq-category-heading">Working with me</h3>
          {workingWithMe.map((item) => renderFAQItem(item, faqs.indexOf(item)))}
        </div>
        <div className="faq-category">
          <h3 className="faq-category-heading">Engagement &amp; process</h3>
          {engagementProcess.map((item) => renderFAQItem(item, faqs.indexOf(item)))}
        </div>
      </div>
    </Section>
  );
}

// ─── LEAD MAGNET LINK ────────────────────────────────────────
// Gated PDF download component — captures email before providing PDF access

export function LeadMagnetLink({ pdfUrl, children, variant = "link", style: extraStyle }) {
  const [state, setState] = useState("initial"); // initial | form | loading | success | error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fieldId = useId().replace(/:/g, "");

  const downloadPdf = (source) => {
    track("lead_magnet_download", { pdf: pdfUrl, source });
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "devonshire-sample.pdf";
    link.setAttribute("aria-hidden", "true");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setState("form");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    setState("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          pdfRequested: pdfUrl,
          source: "lead_magnet_gate"
        }),
      });

      if (res.ok) {
        track("lead_magnet_submit", { pdf: pdfUrl });
        setState("success");
        downloadPdf("gate_success");
      } else {
        setState("error");
        setErrorMsg("Something went wrong. Please try again.");
        setTimeout(() => { setState("form"); setErrorMsg(""); }, 4000);
      }
    } catch {
      setState("error");
      setErrorMsg("Something went wrong. Please try again.");
      setTimeout(() => { setState("form"); setErrorMsg(""); }, 4000);
    }
  };

  // ── Variant styles ───────────────────────────────────────────
  const linkStyle = {
    link: { fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}`, cursor: "pointer", transition: "all 0.2s" },
    button: { display: "inline-block", padding: "14px 28px", background: COLORS.navy, color: "white", borderRadius: RADIUS.md, textDecoration: "none", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, textAlign: "center", transition: "all 0.2s", border: "none", cursor: "pointer", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "min(180px, 100%)" },
    "inline-button": { padding: "12px 16px", borderRadius: RADIUS.md, border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, textDecoration: "none", fontFamily: FONTS.body, fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "all 0.2s" },
    "footer-link": { fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s", cursor: "pointer" }
  }[variant] || linkStyle.link;

  // ── Initial state: clickable link/button ─────────────────────
  if (state === "initial") {
    return (
      <button type="button" onClick={handleClick} style={{ border: 0, padding: 0, background: "transparent", ...linkStyle, ...extraStyle }}>
        {children}
      </button>
    );
  }

  // ── Form state: email capture ────────────────────────────────
  if (state === "form" || state === "loading" || state === "error") {
    return (
      <div style={{ padding: "16px 20px", background: COLORS.offWhite, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, marginTop: "8px", marginBottom: "8px" }}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "12px", fontWeight: 600 }}>
          Enter your email to download: <strong>{children}</strong>
        </p>
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label htmlFor={`${fieldId}-name`} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, fontSize: "0.9rem", fontWeight: 600 }}>Name <span style={{ fontWeight: 400 }}>(optional)</span></label>
          <input
            id={`${fieldId}-name`}
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            style={{ padding: "11px 12px", borderRadius: RADIUS.sm, border: `1px solid ${COLORS.steel}`, fontFamily: FONTS.body, fontSize: "0.9rem", background: COLORS.white, width: "100%", boxSizing: "border-box" }}
          />
          <label htmlFor={`${fieldId}-email`} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, fontSize: "0.9rem", fontWeight: 600 }}>Work email</label>
          <input
            id={`${fieldId}-email`}
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
            aria-invalid={Boolean(errorMsg)}
            aria-describedby={`${fieldId}-message`}
            style={{ padding: "11px 12px", borderRadius: RADIUS.sm, border: `1px solid ${COLORS.steel}`, fontFamily: FONTS.body, fontSize: "0.9rem", background: COLORS.white, width: "100%", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="submit"
              disabled={state === "loading"}
              style={{ padding: "10px 20px", background: state === "loading" ? COLORS.bodyMuted : COLORS.gold, color: COLORS.white, border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: state === "loading" ? "default" : "pointer" }}>
              {state === "loading" ? "Sending…" : "Send Me the PDF →"}
            </button>
            <button
              type="button"
              onClick={() => setState("initial")}
              style={{ padding: "10px 14px", background: "transparent", border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
          <p id={`${fieldId}-message`} className="lead-magnet-form-message" role={errorMsg ? "alert" : "status"} aria-live={errorMsg ? "assertive" : "polite"} style={{ minHeight: "20px", fontFamily: FONTS.body, fontSize: "0.8rem", color: errorMsg ? COLORS.critical : COLORS.charcoal, margin: 0 }}>{errorMsg || (state === "loading" ? "Submitting your request…" : "")}</p>
        </form>
      </div>
    );
  }

  // ── Success state: download link ─────────────────────────────
  if (state === "success") {
    return (
      <div role="status" aria-live="polite" style={{ padding: "16px 20px", background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}`, borderRadius: RADIUS.md, marginTop: "8px", marginBottom: "8px" }}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "12px" }}>
          ✓ Thanks! Your download is ready:
        </p>
        <a href={pdfUrl} download onClick={() => track("lead_magnet_download", { pdf: pdfUrl, source: "success_link" })}
          style={{ fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, textDecoration: "underline" }}>
          Download {children} →
        </a>
      </div>
    );
  }

  return null;
}

// ServicesSamplesRow used by ServicesPage and AboutPage
export function ServicesSamplesRow() {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "14px" }}>
      <LeadMagnetLink pdfUrl={SAMPLE_SCORECARD_PDF} variant="inline-button">
        Sample Execution Risk Scorecard (PDF)
      </LeadMagnetLink>
      <LeadMagnetLink pdfUrl={SAMPLE_100DAY_PDF} variant="inline-button">
        100-Day Operating Playbook (PDF)
      </LeadMagnetLink>
    </div>
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────

// ─── OFFER CARDS (SHARED SERVICES PRICING) ──────────────────

export function OfferCards({ setPage }) {
  const [mobileDetails, setMobileDetails] = useState({});
  const toggleDetails = (key) => setMobileDetails((current) => ({ ...current, [key]: !current[key] }));
  const box = { border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 calc(50% - 10px)", minWidth: "min(240px, 100%)", display: "flex", flexDirection: "column" };
  const tag = { fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, fontWeight: 600, marginBottom: "10px" };
  const li = { marginBottom: "8px", lineHeight: 1.55 };
  const segLabel = { fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "10px", display: "block" };

  const pathLeft = {
    title: "Evaluating a Target",
    question: OFFERS.executionRiskReview.buyerQuestion,
    description: OFFERS.executionRiskReview.purpose,
    items: ["Execution Risk Memo + Execution Risk Scorecard", "Targeted Evidence Request List", "Day-1 Critical Path + Day-1 to Day-100 Priority Map"]
  };
  const pathRight = {
    title: "First 100 Days Post-Close",
    question: OFFERS.operatingDesign.buyerQuestion,
    description: OFFERS.operatingDesign.purpose,
    items: OFFERS.operatingDesign.deliverables,
  };

  const pathAddon = {
    title: "Add-On Acquisition Support",
    description: "A relevant use case for platforms whose acquisition pace is outrunning available operating capacity.",
    items: [
      "Operational diligence on the add-on target",
      "Integration ownership, Day-1 sequencing, and critical dependencies",
      "Platform-aligned reporting, governance, and benefit tracking",
    ],
  };

  return (
    <Section title={setPage ? "Choose Your Path & Pricing" : "Engagement Options"} type="windowWithCards" noCTA>
      {setPage && (
        <>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "8px" }}>
            Pick the track that matches where you are in the deal lifecycle. Both deliver risk-rated findings, PE impact framing, and a clear Day-1 critical path.
          </p>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "24px" }}>
            Most engagements begin during the <strong>LOI → close window</strong> to avoid post-close rework.
          </p>
          <div className="path-cards-grid" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap" }}>
            <div className="path-card" style={{ flex: "1 1 260px", minWidth: "min(240px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{pathLeft.title}</div>
              <p className="path-buyer-question">{pathLeft.question}</p>
              <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{pathLeft.description}</p>
              <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
                {pathLeft.items.map((item, i) => (
                  <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                <button className="card-text-link" onClick={() => { track("pricing_cta", { offer: OFFERS.executionRiskReview.key, destination: "scorer" }); setPage("scorer"); }}>Score Your Deal →</button>
              </div>
            </div>
            <div className="path-card" style={{ flex: "1 1 260px", minWidth: "min(240px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{pathRight.title}</div>
              <p className="path-buyer-question">{pathRight.question}</p>
              <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{pathRight.description}</p>
              <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
                {pathRight.items.map((item, i) => (
                  <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { offer: OFFERS.operatingDesign.key, destination: "calendly" })}>Book a Fit Check (15 min) →</a>
              </div>
            </div>
            <div className="path-card" style={{ flex: "1 1 260px", minWidth: "min(240px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{pathAddon.title}</div>
              <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{pathAddon.description}</p>
              <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
                {pathAddon.items.map((item, i) => (
                  <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { offer: OFFERS.operatingControlSprint.key, destination: "calendly" })}>Book a Fit Check (15 min) →</a>
              </div>
            </div>
          </div>
          <h3 className="pricing-subheading">Engagement options</h3>
        </>
      )}
      {!setPage && (
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "20px" }}>
          Fixed fees are scoped to transaction stage, complexity, and required access. Most engagements begin during the <strong>LOI → close window</strong> to avoid post-close rework.
        </p>
      )}
      <div className="pricing-grid" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap", marginBottom: "24px" }}>
        <div className="pricing-card" style={{...box, borderTop: `3px solid ${COLORS.steel}`}}>
          <span style={segLabel}>Pre-Close · LOI to Close</span>
          <SectionTitle sub>{OFFERS.executionRiskReview.name}</SectionTitle>
          <div className="price" style={tag}>{OFFERS.executionRiskReview.price}</div>
          <div className="price-detail">{OFFERS.executionRiskReview.timing}</div>
          <p className="pricing-buyer-question">{OFFERS.executionRiskReview.buyerQuestion}</p>
          <p className="pricing-purpose">{OFFERS.executionRiskReview.purpose}</p>
          <button className="offer-details-toggle" aria-expanded={!!mobileDetails.review} aria-controls="review-deliverables" onClick={() => toggleDetails("review")}>View deliverables <span>{mobileDetails.review ? "−" : "+"}</span></button>
          <ul id="review-deliverables" className={`offer-deliverables-list${mobileDetails.review ? " open" : ""}`} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0 }}>
            {OFFERS.executionRiskReview.deliverables.map((item) => <li key={item} style={li}>{item}</li>)}
          </ul>
          <div style={{ marginTop: "16px" }}>
            <button className="card-text-link" onClick={() => { track("pricing_cta", { offer: OFFERS.executionRiskReview.key, destination: "scorer" }); setPage ? setPage("scorer") : window.location.assign("/pe/scorer"); }}>Score Your Deal →</button>
          </div>
        </div>

        <div className="pricing-card recommended" style={{...box, borderTop: `3px solid ${COLORS.gold}`}}>
          <span style={segLabel}>LOI → Day 100</span>
          <SectionTitle sub>{OFFERS.diligenceToExecution.name}</SectionTitle>
          <div className="price" style={tag}>{OFFERS.diligenceToExecution.price}</div>
          <div className="price-detail">{OFFERS.diligenceToExecution.timing}</div>
          <p className="pricing-buyer-question">{OFFERS.diligenceToExecution.buyerQuestion}</p>
          <p className="pricing-purpose">{OFFERS.diligenceToExecution.purpose}</p>
          <p className="pricing-integration-note"><strong>Integrated mandate:</strong> {OFFERS.diligenceToExecution.integrationNote}</p>
          <button className="offer-details-toggle" aria-expanded={!!mobileDetails.mandate} aria-controls="mandate-deliverables" onClick={() => toggleDetails("mandate")}>View deliverables <span>{mobileDetails.mandate ? "−" : "+"}</span></button>
          <ul id="mandate-deliverables" className={`offer-deliverables-list${mobileDetails.mandate ? " open" : ""}`} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            {OFFERS.diligenceToExecution.deliverables.map((item) => <li key={item} style={li}>{item}</li>)}
          </ul>
          <div style={{ marginTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { offer: OFFERS.diligenceToExecution.key, destination: "calendly" })}>Book a Fit Check (15 min) →</a>
          </div>
        </div>

        <div className="pricing-card" style={{...box, borderTop: `3px solid ${COLORS.gold}`}}>
          <span style={segLabel}>Post-Close · Hands-On</span>
          <SectionTitle sub>{OFFERS.operatingControlSprint.name}</SectionTitle>
          <div className="price" style={tag}>{OFFERS.operatingControlSprint.price}</div>
          <div className="price-detail">{OFFERS.operatingControlSprint.timing}</div>
          <p className="pricing-buyer-question">{OFFERS.operatingControlSprint.buyerQuestion}</p>
          <p className="pricing-purpose">{OFFERS.operatingControlSprint.purpose}</p>
          <button className="offer-details-toggle" aria-expanded={!!mobileDetails.sprint} aria-controls="sprint-deliverables" onClick={() => toggleDetails("sprint")}>View deliverables <span>{mobileDetails.sprint ? "−" : "+"}</span></button>
          <ul id="sprint-deliverables" className={`offer-deliverables-list${mobileDetails.sprint ? " open" : ""}`} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            {OFFERS.operatingControlSprint.deliverables.map((item) => <li key={item} style={li}>{item}</li>)}
          </ul>
          <div style={{ marginTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { offer: OFFERS.operatingControlSprint.key, destination: "calendly" })}>Book a Fit Check (15 min) →</a>
          </div>
        </div>

        <div className="pricing-card" style={{...box, borderTop: `3px solid ${COLORS.navy}`}}>
          <span style={segLabel}>Ongoing Hold</span>
          <SectionTitle sub>{OFFERS.postCloseControlTower.name}</SectionTitle>
          <div className="price" style={tag}>{OFFERS.postCloseControlTower.price}</div>
          <div className="price-detail">{OFFERS.postCloseControlTower.timing}</div>
          <p className="pricing-buyer-question">{OFFERS.postCloseControlTower.buyerQuestion}</p>
          <p className="pricing-purpose">{OFFERS.postCloseControlTower.purpose}</p>
          <button className="offer-details-toggle" aria-expanded={!!mobileDetails.tower} aria-controls="tower-deliverables" onClick={() => toggleDetails("tower")}>View deliverables <span>{mobileDetails.tower ? "−" : "+"}</span></button>
          <ul id="tower-deliverables" className={`offer-deliverables-list${mobileDetails.tower ? " open" : ""}`} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            {OFFERS.postCloseControlTower.deliverables.map((item) => <li key={item} style={li}>{item}</li>)}
          </ul>
          <div style={{ marginTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { offer: OFFERS.postCloseControlTower.key, destination: "calendly" })}>Book a Fit Check (15 min) →</a>
          </div>
        </div>
      </div>

      <aside className="standalone-playbook-note" aria-labelledby="operating-design-title">
        <strong id="operating-design-title">{OFFERS.operatingDesign.name}: {OFFERS.operatingDesign.price}</strong>
        <span>{OFFERS.operatingDesign.buyerQuestion}</span>
        <p>{OFFERS.operatingDesign.purpose}</p>
        <p><strong>What you receive:</strong> {OFFERS.operatingDesign.deliverables.join("; ")}.</p>
        <p><strong>Continuity Credit:</strong> 100% of the Execution Risk Review fee is applied to a Diligence-to-Execution Mandate commissioned before close or within 30 days after close.</p>
      </aside>

      {!setPage && (
        <aside className="buy-build-use-case" aria-labelledby="buy-build-use-case-title">
          <div>
            <span>Priority use case</span>
            <h3 id="buy-build-use-case-title">Buy-and-Build / Tuck-In Support</h3>
            <p>For platforms where acquisition pace has outgrown internal operating capacity. The Review, Mandate, or Sprint can be scoped to one live acquisition while strengthening the platform's operating baseline for the next.</p>
          </div>
          <ul>
            <li>Absorption capacity and critical dependencies before close</li>
            <li>Integration ownership and Day-1 sequence</li>
            <li>A common operating baseline that improves across acquisitions</li>
          </ul>
        </aside>
      )}

      {setPage && <ButtonPair
        primaryText="Book a Fit Check (15 min)"
        secondaryText={setPage ? "View Full Services & Details" : undefined}
        secondaryAction={setPage ? () => setPage("services", "offers") : undefined}
        centered={true}
        showAvailability={true}
      />}
    </Section>
  );
}

export function TrackRecordBlock() {
  const [expandedPlatform, setExpandedPlatform] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState(false);

  return (
    <Section title="Track Record & Outcomes" noCTA id="track-record">
      <p style={{ fontFamily: FONTS.body, color: COLORS.bodyMuted, lineHeight: 1.6, marginBottom: "24px", maxWidth: "600px" }}>
        Representative outcomes from institutional operating roles—not Devonshire client case studies. The governance methods are adapted to lower-middle-market deals and portfolio companies.
      </p>

      <span className="measured-outcomes-label">Measured Outcomes (Post-Implementation)</span>

      {/* Platform Stabilization Case Card */}
      <div className="case-card">
        <div className="case-header">
          <div className="case-header-left">
            <div className="case-icon stability">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div className="case-label">Platform Stabilization &amp; Reliability</div>
              <div className="case-context">$10B+ platform</div>
            </div>
          </div>
          <span className="case-domain-tag ops">Platform Ops</span>
        </div>

        <div className="case-body">
          <div className="case-situation">
            <div className="case-section-heading situation">Situation</div>
            <p>Inherited a platform with 4 critical outages in 12 months, 94% availability, and a declining NPS. Leadership time consumed by firefighting. Operating cadence hadn't kept pace with AUM growth.</p>
          </div>
          <div className="case-intervention">
            <div className="case-section-heading intervention">What I Installed</div>
            <ul>
              <li>8-person global ops team (NY, London, Hong Kong)</li>
              <li>Incident command: severity model, escalation paths, postmortem discipline</li>
              <li>KPI cadence: 18 metrics, weekly review, quarterly stakeholder reviews</li>
              <li>Change governance: CAB-lite process, runbooks, rollback discipline</li>
            </ul>
          </div>
        </div>

        <div className="case-metrics">
          <div className="case-metric">
            <div className="case-metric-number">~50%</div>
            <div className="case-metric-label">Critical incident<br />reduction</div>
          </div>
          <div className="case-metric">
            <div className="case-metric-number">99.2%</div>
            <div className="case-metric-label">Availability<br />(from 94%)</div>
          </div>
          <div className="case-metric">
            <div className="case-metric-number">−31%</div>
            <div className="case-metric-label">MTTR reduction</div>
          </div>
          <div className="case-metric">
            <div className="case-metric-number">+22</div>
            <div className="case-metric-label">NPS improvement<br />(38 → 60)</div>
          </div>
        </div>

        <div className="case-footer">
          <div className="case-pe-translation">
            <strong>PE Translation</strong> The same operating principles—clear ownership, evidence, escalation, and cadence—can be adapted to portfolio-company scale and sequenced through the first 100 days.
          </div>
        </div>

        <div className="outcome-expandable">
          <button
            className={`outcome-toggle${expandedPlatform ? " active" : ""}`}
            onClick={() => setExpandedPlatform(!expandedPlatform)}>
            Related outcomes <span className="chevron">▸</span>
          </button>
          <div className={`outcome-cards-container${expandedPlatform ? " visible" : ""}`}>
            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-card-title"><span className="domain-dot incidents"></span>Incident Instability</div>
                <div className="outcome-step">
                  <div className="outcome-step-label gap">Gap</div>
                  <p>Same failures recurring every 4–6 weeks. No severity model, no ownership, no postmortems.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label fix">Fix</div>
                  <p>Severity model, incident command, escalation paths, postmortem cadence.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label result">Result</div>
                  <p>~50% incident reduction. ~31% faster resolution. Board reporting shifted from crisis-driven to weekly structured reviews.</p>
                </div>
              </div>
              <div className="outcome-card">
                <div className="outcome-card-title"><span className="domain-dot change"></span>Change-Driven Outages</div>
                <div className="outcome-step">
                  <div className="outcome-step-label gap">Gap</div>
                  <p>Deployments causing outages. No change calendar, no risk classification, no rollback plans.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label fix">Fix</div>
                  <p>CAB-lite process, risk classification, rollback discipline, change-incident correlation.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label result">Result</div>
                  <p>Uptime improved from 94% to 99%. Change-incident correlation visible to the board within 30 days.</p>
                </div>
              </div>
              <div className="outcome-card">
                <div className="outcome-card-title"><span className="domain-dot kpi"></span>Board Reporting / KPI Ambiguity</div>
                <div className="outcome-step">
                  <div className="outcome-step-label gap">Gap</div>
                  <p>No KPIs. Board updates were verbal and anecdotal. No baselines, no targets, no measurement.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label fix">Fix</div>
                  <p>KPI library, weekly operating review, executive dashboard, board-ready reporting pack.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label result">Result</div>
                  <p>Weekly operating rhythm installed. Issues surfaced through cadence, not crisis. Board gained real-time ops visibility.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Optimization Case Card */}
      <div className="case-card">
        <div className="case-header">
          <div className="case-header-left">
            <div className="case-icon vendor">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div>
              <div className="case-label">Vendor Optimization &amp; Cost Control</div>
              <div className="case-context">Global asset manager · $40M program · $240M annual spend base</div>
            </div>
          </div>
          <span className="case-domain-tag vendor-tag">Vendor Governance</span>
        </div>

        <div className="case-body">
          <div className="case-situation">
            <div className="case-section-heading situation">Situation</div>
            <p>Vendor costs growing 22% annually, outpacing business growth. 15 fragmented providers, no utilization visibility, no governance. Auto-renewing contracts with no SLA tracking.</p>
          </div>
          <div className="case-intervention">
            <div className="case-section-heading intervention">What I Installed</div>
            <ul>
              <li>Spend transparency and utilization analytics</li>
              <li>Consolidated 15 vendors to 8 strategic partners</li>
              <li>Scorecard governance with quarterly business reviews</li>
              <li>Renewal calendar with proactive renegotiation</li>
            </ul>
          </div>
        </div>

        <div className="case-metrics">
          <div className="case-metric">
            <div className="case-metric-number">&gt;$2M</div>
            <div className="case-metric-label">Annual run-rate<br />reduction</div>
          </div>
          <div className="case-metric">
            <div className="case-metric-number">10–15%</div>
            <div className="case-metric-label">Licensing savings<br />via right-sizing</div>
          </div>
          <div className="case-metric">
            <div className="case-metric-number">~28%</div>
            <div className="case-metric-label">Cost per $1B AUM<br />reduction</div>
          </div>
          <div className="case-metric">
            <div className="case-metric-number">&lt;6 mo</div>
            <div className="case-metric-label">Payback period</div>
          </div>
        </div>

        <div className="case-footer">
          <div className="case-pe-translation">
            <strong>PE Translation</strong> Vendor visibility, ownership, renewal discipline, and performance cadence can be adapted to portfolio-company scale and prioritized against the evidence found in diligence.
          </div>
        </div>

        <div className="outcome-expandable">
          <button
            className={`outcome-toggle${expandedVendor ? " active" : ""}`}
            onClick={() => setExpandedVendor(!expandedVendor)}>
            Related outcomes <span className="chevron">▸</span>
          </button>
          <div className={`outcome-cards-container${expandedVendor ? " visible" : ""}`}>
            <div className="outcome-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="outcome-card">
                <div className="outcome-card-title"><span className="domain-dot vendor-dot"></span>Vendor Concentration Risk</div>
                <div className="outcome-step">
                  <div className="outcome-step-label gap">Gap</div>
                  <p>Single vendor covering 80%+ of critical infrastructure. Auto-renewing contracts, no SLA tracking, change-of-control clause missed in diligence.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label fix">Fix</div>
                  <p>Full vendor mapping, contract consolidation, renewal calendar, SLA monitoring, concentration reduction plan.</p>
                </div>
                <div className="outcome-step">
                  <div className="outcome-step-label result">Result</div>
                  <p>$2M+ annual savings via renegotiation. Concentration reduced: 1 vendor → 3. Exit plan documented for top 5 vendors — turned a diligence liability into a hold narrative.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="confidentiality-note">NDA protection is available as standard. Institutional outcome detail and illustrative work-product formats are available on request.</p>
    </Section>
  );
}

export function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const items = [
    { key: "levers", label: "Home" },
    { key: "services", label: "Services & Method" },
    { key: "scorer", label: "Score Your Deal" },
    { key: "about", label: "About" },
    { key: "resources", label: "Resources" },
  ];
  const handleNav = (key) => { setPage(key); setMenuOpen(false); };
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const focusable = () => [...menu.querySelectorAll('a[href],button:not([disabled])')];
    focusable()[0]?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const items = focusable(); const first = items[0]; const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    menu.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { menu.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);
  return (
    <>
      <nav className="site-nav" style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.white, borderBottom: `3px solid ${COLORS.gold}`, padding: "0 clamp(12px, 3.5vw, 28px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px", minHeight: "76px", boxShadow: "0 2px 8px rgba(20, 33, 61, 0.08)" }}>
        <div className="nav-logo-col" style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
          <a className="editorial-brand" href="/pe/" onClick={(e) => { e.preventDefault(); handleNav("levers"); }} aria-label="Devonshire Operations home">
            <span className="editorial-brand-mark">D</span>
            <span className="editorial-brand-word"><b>DEVONSHIRE</b><small>Operations</small></span>
          </a>
          <div style={{ width: "1px", height: "36px", background: COLORS.border }} className="nav-links" />
          <div className="nav-links" style={{ display: "flex", gap: "4px" }}>
            {items.map(({ key, label }) => (
              <a key={key} href={key === "levers" ? "/pe/" : `/pe/${key}`} onClick={(e) => { e.preventDefault(); handleNav(key); }}
                style={{ background: "transparent", border: "none", padding: "10px 16px", borderRadius: RADIUS.sm, color: COLORS.navy, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: page === key ? 700 : 500, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.3px", borderBottom: page === key ? `2px solid ${COLORS.gold}` : "2px solid transparent" }}
                onMouseEnter={e => { if (page !== key) e.currentTarget.style.color = COLORS.gold; }}
                onMouseLeave={e => { if (page !== key) e.currentTarget.style.color = COLORS.navy; }}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <span className="nav-current-page">
          {items.find(i => i.key === page)?.label ?? ""}
        </span>
        <div className="nav-cta"><CTAButton text="Book a Fit Check (15 min)" location="desktop_navigation" /></div>
        <button ref={toggleRef} className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
          {menuOpen
            ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="4" y1="4" x2="18" y2="18" stroke={COLORS.navy} strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke={COLORS.navy} strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect y="4" width="22" height="2" rx="1" fill={COLORS.navy}/><rect y="10" width="22" height="2" rx="1" fill={COLORS.navy}/><rect y="16" width="22" height="2" rx="1" fill={COLORS.navy}/></svg>
          }
        </button>
      </nav>
      {menuOpen && (
        <div ref={menuRef} id="mobile-navigation" className="nav-mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
          {items.map(({ key, label }) => (
            <a key={key} href={key === "levers" ? "/pe/" : `/pe/${key}`} className="nav-mobile-item" onClick={(e) => { e.preventDefault(); handleNav(key); }}
              style={{ color: page === key ? COLORS.gold : COLORS.navy, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.3px", background: page === key ? `${COLORS.gold}12` : "transparent" }}>
              {label}
            </a>
          ))}
          <div style={{ marginTop: "8px" }}><CTAButton text="Book a Fit Check (15 min)" location="mobile_navigation" /></div>
        </div>
      )}
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────

function FooterLeadCapture() {
  const [email, setEmail] = useState("");
  const [situation, setSituation] = useState("Evaluating a target");
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: RADIUS.sm,
    border: `1px solid ${COLORS.steel}`,
    fontFamily: FONTS.body,
    fontSize: "0.9rem",
    background: `${COLORS.white}10`,
    color: COLORS.offWhite,
    boxSizing: "border-box",
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ state: "error", msg: "Enter a valid email." });
      setTimeout(() => setStatus({ state: "idle", msg: "" }), 4000);
      return;
    }

    setStatus({ state: "loading", msg: "Sending…" });

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          situation,
          source: "footer_lead_capture"
        }),
      });
      if (res.ok) {
        track("footer_lead_submit", { situation });
        setStatus({ state: "ok", msg: "Thanks! I'll be in touch soon." });
        setEmail("");
        setSituation("Evaluating a target");
        setTimeout(() => setStatus({ state: "idle", msg: "" }), 5000);
      } else {
        setStatus({ state: "error", msg: "Something went wrong. Please try again." });
        setTimeout(() => setStatus({ state: "idle", msg: "" }), 4000);
      }
    } catch {
      setStatus({ state: "error", msg: "Something went wrong. Please try again." });
      setTimeout(() => setStatus({ state: "idle", msg: "" }), 4000);
    }
  };

  return (
    <div>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.goldOnDark, marginBottom: "16px", letterSpacing: "0.5px" }}>
        Not ready to book?
      </h3>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: `${COLORS.offWhite}B0`, lineHeight: 1.55, marginBottom: "14px" }}>
        Share your situation and I'll reply with fit and next steps.
      </p>
      <form className="footer-form" onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label className="footer-field-label" htmlFor="footer-situation">Situation</label>
        <select id="footer-situation" value={situation} onChange={e => setSituation(e.target.value)} style={inputStyle}>
          <option>Evaluating a target</option>
          <option>First 100 days post-close</option>
          <option>Mid-hold optimization</option>
        </select>
        <label className="footer-field-label" htmlFor="footer-email">Email address</label>
        <input id="footer-email" name="email" type="email" required autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); if (status.state === "error") setStatus({ state: "idle", msg: "" }); }} placeholder="you@fund.com" aria-invalid={status.state === "error"} aria-describedby="footer-form-status" style={inputStyle} />
        <button type="submit" disabled={status.state === "loading"} style={{ padding: "10px 20px", background: status.state === "loading" ? COLORS.bodyMuted : COLORS.gold, color: COLORS.white, border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: status.state === "loading" ? "default" : "pointer", textAlign: "center" }}>
          {status.state === "loading" ? "Sending…" : "Send →"}
        </button>
        <p id="footer-form-status" role={status.state === "error" ? "alert" : "status"} aria-live={status.state === "error" ? "assertive" : "polite"} style={{ minHeight: "20px", fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.white, margin: 0 }}>{status.msg}</p>
      </form>
    </div>
  );
}

export function Footer({ setPage }) {
  return (
    <footer style={{ marginTop: "60px", padding: "40px 0 32px 0", borderTop: `2px solid ${COLORS.steel}`, background: COLORS.navy }}>
      <div className="footer-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "32px" }}>
        {/* Contact */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.goldOnDark, marginBottom: "16px", letterSpacing: "0.5px" }}>Contact</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.goldOnDark} onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
              {CONTACT_EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.goldOnDark} onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
              LinkedIn →
            </a>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.goldOnDark, textDecoration: "none", fontWeight: 600, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Book a Fit Check
              </a>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.offWhite }}>
                Currently accepting 1–2 new engagements.
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.goldOnDark, marginBottom: "16px", letterSpacing: "0.5px" }}>Navigation</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { key: "levers", label: "Home" },
              { key: "services", label: "Services & Method" },
              { key: "scorer", label: "Score Your Deal" },
              { key: "about", label: "About" },
              { key: "resources", label: "Resources" },
            ].map(({ key, label }) => (
              <a key={key} href={key === "levers" ? "/pe/" : `/pe/${key}`} onClick={(e) => { e.preventDefault(); setPage(key); }}
                style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.offWhite, background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.goldOnDark}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.goldOnDark, marginBottom: "16px", letterSpacing: "0.5px" }}>Resources</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <LeadMagnetLink pdfUrl={SAMPLE_SCORECARD_PDF} variant="footer-link">
              Execution Risk Scorecard (PDF)
            </LeadMagnetLink>
            <LeadMagnetLink pdfUrl={SAMPLE_100DAY_PDF} variant="footer-link">
              100-Day Operating Playbook (PDF)
            </LeadMagnetLink>
          </div>
        </div>

        {/* Email form */}
        <FooterLeadCapture />
      </div>

      {/* Copyright */}
      <div style={{ maxWidth: "1200px", margin: "32px auto 0", padding: "24px 24px 0 24px", borderTop: `1px solid ${COLORS.steel}40`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.offWhite, opacity: 0.7, margin: "0 0 4px 0" }}>
            © {new Date().getFullYear()} Devonshire Operations. All rights reserved.
          </p>
          <p className="footer-tagline" style={{ fontFamily: FONTS.heading, fontSize: "0.9rem", color: COLORS.goldOnDark, opacity: 0.9, margin: 0, fontWeight: 600 }}>
            Find the gaps. Build the plan. Create the value.
          </p>
        </div>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.offWhite, opacity: 0.7, margin: 0 }}>
          NDA-friendly. Minimal data handling. Anonymized formats accepted.
        </p>
      </div>
    </footer>
  );
}
