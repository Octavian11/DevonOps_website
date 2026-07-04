import { useState } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  SEVERITY_STYLE, TIMING_COLORS, DOMAINS,
  CALENDLY, CONTACT_EMAIL, LINKEDIN_URL,
  SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  FORMSPREE_URL,
  mailtoHref,
} from "./constants.js";

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

export function CTAButton({ text, variant, style: extraStyle, showAvailability }) {
  const isPrimary = variant !== "secondary";
  const btnStyle = isPrimary ? PRIMARY_BTN : SECONDARY_BTN;
  const hoverBg = isPrimary ? "#A07D2E" : `${COLORS.navy}08`;
  const restoreBg = isPrimary ? COLORS.gold : "transparent";
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
        style={{ ...btnStyle, ...extraStyle }}
        onMouseEnter={e => { e.currentTarget.style.background = hoverBg; }}
        onMouseLeave={e => { e.currentTarget.style.background = restoreBg; }}>
        {text || "Book a Fit Check"}
      </a>
      {showAvailability && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy }}>
          Engagements typically book 2–3 weeks out
        </span>
      )}
    </div>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "16px" : "12px" }}>
      <h2 className="section-title" style={{
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

export const PRIMARY_BTN = { display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 32px", background: COLORS.gold, color: "#FFFFFF", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", fontSize: "0.9rem", fontWeight: 600, border: "none", borderRadius: "8px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" };
export const SECONDARY_BTN = { display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: "transparent", color: COLORS.navy, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", fontSize: "0.9rem", fontWeight: 500, border: "1.5px solid #D6D4CE", borderRadius: "8px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" };

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
             onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(214,166,63,0.25)"; }}
             onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {primaryText}
          </a>
        ) : (
          <button onClick={primaryAction}
             style={PRIMARY_BTN}
             onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(214,166,63,0.25)"; }}
             onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {primaryText}
          </button>
        )}

        {(secondaryText || secondaryAction || secondaryLink) && (
          secondaryLink ? (
            <a href={secondaryLink} target="_blank" rel="noopener noreferrer"
               style={SECONDARY_BTN}
               onMouseEnter={e => { e.currentTarget.style.borderColor = "#1B2A4A"; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = "#D6D4CE"; }}>
              {secondaryText}
            </a>
          ) : (
            <button onClick={secondaryAction}
               style={SECONDARY_BTN}
               onMouseEnter={e => { e.currentTarget.style.borderColor = "#1B2A4A"; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = "#D6D4CE"; }}>
              {secondaryText}
            </button>
          )
        )}
      </div>
      {showAvailability && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, marginTop: "8px" }}>
          Engagements typically book 2–3 weeks out
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
    <div style={{ position: "relative", paddingLeft: compact ? "40px" : "60px" }}>
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
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", color: COLORS.navy, letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 700, flexShrink: 0 }}>
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
    { q: "What do you need from us?", a: "A lightweight artifact pull (incident/change history, vendor list/contracts, KPIs, org/RACI, audit evidence folders) plus targeted stakeholder access." },
    { q: "How do you handle confidentiality?", a: "NDA-friendly by default. Minimal data handling; formats can be anonymized." },
    { q: "When are you not a fit?", a: "If the company already has mature incident/change governance, a live KPI cadence, and low volatility, you likely don't need stabilization—only optimization." },
    { q: "What does the 100-Day Operating Playbook include?", a: "The 100-Day Operating Playbook is the operational deliverable from the diligence phase — not a slide deck. It defines which gaps to fix, in what sequence, with what accountability structure, and what measurable outcomes to expect in 100 days. It's the document that converts diligence findings into operating results and prevents the post-close \"now what?\" problem." },
    { q: "What industries do you cover?", a: "The 20 levers apply to any operationally complex business. Whether the portfolio company is a fintech platform or a regional services company, the same governance gaps—incident management, vendor concentration, key-person risk, and KPI cadence—drive the same value erosion." },
    { q: "How long does a pre-close diligence engagement take?", a: "2–3 weeks from data receipt to findings memo, assuming standard artifact availability (incident history, change logs, vendor contracts, org chart, compliance evidence). Expedited timelines are possible for deals in exclusivity — discuss during the fit check." },
    { q: "What if we're still in LOI or haven't entered exclusivity yet?", a: "Earlier is better. A light-touch ops review before exclusivity can shape the diligence scope and, in some cases, inform the structure of the deal itself. Even limited access produces useful signals — incident volume patterns and change frequency are often visible without full document access." },
    { q: "Do you work with family offices?", a: "Yes, specifically on the Post-Close Control Tower for longer holds. Family offices buying from founders often inherit zero institutional process — the gap between what's described in diligence and what's actually operating is widest in these deals. I install the governance baseline and operating cadence that prevents drift over a 5–7+ year hold." },
  ];

  const workingWithMe = faqs.filter((_, i) => [0,1,2,3,5,8].includes(i));
  const engagementProcess = faqs.filter((_, i) => [4,6,7].includes(i));

  const q = { fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, margin: 0, flex: 1 };
  const a = { fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, margin: 0, paddingBottom: "14px" };

  const renderFAQItem = (item, globalIndex) => (
    <div key={globalIndex} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      <button
        className="faq-row"
        onClick={() => toggle(globalIndex)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={q}>{item.q}</h3>
        <span className="expand-icon" style={{ color: COLORS.steel, fontSize: "1rem", marginLeft: "12px", flexShrink: 0 }}>
          {open === globalIndex ? "▾" : "▸"}
        </span>
      </button>
      {open === globalIndex && (
        <p style={a}>{item.a}</p>
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
        setState("success");
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
    "footer-link": { fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s", cursor: "pointer" },
    "micro-proof": { display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: COLORS.navy, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, transition: "all 0.2s", padding: "8px 10px", borderRadius: RADIUS.sm, cursor: "pointer" }
  }[variant] || linkStyle.link;

  // ── Initial state: clickable link/button ─────────────────────
  if (state === "initial") {
    return (
      <span onClick={handleClick} style={{ ...linkStyle, ...extraStyle }}>
        {children}
      </span>
    );
  }

  // ── Form state: email capture ────────────────────────────────
  if (state === "form" || state === "loading" || state === "error") {
    return (
      <div style={{ padding: "16px 20px", background: COLORS.offWhite, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, marginTop: "8px", marginBottom: "8px" }}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "12px", fontWeight: 600 }}>
          Enter your email to download: <strong>{children}</strong>
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={{ padding: "11px 12px", borderRadius: RADIUS.sm, border: `1px solid ${COLORS.steel}`, fontFamily: FONTS.body, fontSize: "0.9rem", background: COLORS.white, width: "100%", boxSizing: "border-box" }}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@fund.com"
            required
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
          {errorMsg && (
            <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: "#FC8181", margin: 0 }}>
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    );
  }

  // ── Success state: download link ─────────────────────────────
  if (state === "success") {
    return (
      <div style={{ padding: "16px 20px", background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}`, borderRadius: RADIUS.md, marginTop: "8px", marginBottom: "8px" }}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "12px" }}>
          ✓ Thanks! Your download is ready:
        </p>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
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
        Sample Ops Diligence Scorecard (PDF)
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
  const box = { border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 calc(50% - 10px)", minWidth: "min(240px, 100%)", display: "flex", flexDirection: "column" };
  const tag = { fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, fontWeight: 600, marginBottom: "10px" };
  const li = { marginBottom: "8px", lineHeight: 1.55 };
  const segLabel = { fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "10px", display: "block" };

  const pathLeft = {
    title: "Evaluating a Target",
    description: "Decision-useful ops diligence designed for the IC: severity-rated red flags + evidence requests.",
    items: ["Risk-rated findings memo (IC-ready)", "Evidence requests + diligence questions", "Day-1 → Day-100 stabilization priorities if you close"]
  };
  const pathRight = {
    title: "First 100 Days Post-Close",
    description: "Install a governance baseline so value creation isn't blocked by instability.",
    items: ["Incident command (severity model, escalation, postmortems)", "Change governance (CAB-lite, risk classification, rollback discipline)", "KPI cadence (weekly operating reviews + board-ready pack)"],
  };

  const pathAddon = {
    title: "Add-On Acquisition Support",
    description: "Operational diligence and integration support for portfolio companies evaluating add-on acquisitions.",
    items: [
      "Ops diligence on the add-on target (same rigor as standalone deals)",
      "Integration risk assessment — systems overlap, vendor consolidation, process harmonization",
      "Post-merger governance alignment with the platform company's operating model",
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
              <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{pathLeft.description}</p>
              <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
                {pathLeft.items.map((item, i) => (
                  <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                <button className="card-text-link" onClick={() => setPage("scorer")}>Score Your Deal →</button>
              </div>
            </div>
            <div className="path-card" style={{ flex: "1 1 260px", minWidth: "min(240px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{pathRight.title}</div>
              <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{pathRight.description}</p>
              <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
                {pathRight.items.map((item, i) => (
                  <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Fit Check (15 min) →</a>
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
                <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Fit Check (15 min) →</a>
              </div>
            </div>
          </div>
          <h3 className="pricing-subheading">Engagement options</h3>
        </>
      )}
      {!setPage && (
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "20px" }}>
          Most engagements begin during the <strong>LOI → close window</strong> to avoid post-close rework.
        </p>
      )}
      <div className="pricing-grid" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap", marginBottom: "24px" }}>
        <div className="pricing-card" style={{...box, borderTop: `3px solid ${COLORS.steel}`}}>
          <span style={segLabel}>Pre-Close · LOI to Close</span>
          <SectionTitle sub>Ops Diligence Snapshot</SectionTitle>
          <div className="price" style={tag}>$7,500–15,000 · 2–3 weeks</div>
          <ul style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0 }}>
            <li style={li}>Risk-rated red flags with severity + PE impact</li>
            <li style={li}>Evidence requests + diligence questions</li>
            <li style={li}>Top execution risks + stabilization priorities</li>
          </ul>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, lineHeight: 1.5, marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${COLORS.border}`, marginBottom: "auto" }}>
            Best for funds that need the diagnostic before they commit.
          </p>
          <div style={{ marginTop: "16px" }}>
            <button className="card-text-link" onClick={() => setPage ? setPage("scorer") : window.location.assign("/pe/scorer")}>Score Your Deal →</button>
          </div>
        </div>

        <div className="pricing-card recommended" style={{...box, borderTop: `3px solid ${COLORS.gold}`}}>
          <SectionTitle sub>Diligence + 100-Day Operating Playbook (Recommended)</SectionTitle>
          <div className="price" style={tag}>$30,000–40,000 · Snapshot + Playbook (scoped on the Fit Check call)</div>
          <ul style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            <li style={li}>Diligence findings roll directly into the 100-day plan — no re-learning, no gap</li>
            <li style={li}>Day-1 critical path + phased 100-day execution</li>
            <li style={li}>Clear ownership + cadence from close to value</li>
          </ul>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, lineHeight: 1.5, marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${COLORS.border}`, marginBottom: "auto" }}>
            100-Day Operating Playbook on its own: $20,000–35,000.
          </p>
          <div style={{ marginTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Fit Check (15 min) →</a>
          </div>
        </div>

        <div className="pricing-card" style={{...box, borderTop: `3px solid ${COLORS.gold}`}}>
          <span style={segLabel}>Post-Close · Hands-On</span>
          <SectionTitle sub>Embedded Operating Sprint</SectionTitle>
          <div className="price" style={tag}>$15,000–30,000 · 2–6 weeks</div>
          <ul style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            <li style={li}>Embedded execution on one priority: KPI architecture, operating cadence, vendor governance, post-close stabilization, incident/reliability, or transformation PMO</li>
            <li style={li}>Built and installed on-site or hybrid</li>
            <li style={li}>Converts to a retainer at $7,500–12,000/month</li>
          </ul>
          <div style={{ marginTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Fit Check (15 min) →</a>
          </div>
        </div>

        <div className="pricing-card" style={{...box, borderTop: `3px solid ${COLORS.navy}`}}>
          <span style={segLabel}>Ongoing Hold</span>
          <SectionTitle sub>Post-Close Control Tower</SectionTitle>
          <div className="price" style={tag}>$7,500–10,000+/month · ongoing</div>
          <ul style={{ fontFamily: FONTS.body, color: COLORS.charcoal, paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            <li style={li}>Weekly operating review + board-ready KPI pack</li>
            <li style={li}>Incident + change governance discipline</li>
            <li style={li}>Vendor controls + audit readiness cadence</li>
          </ul>
          <div style={{ marginTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Fit Check (15 min) →</a>
          </div>
        </div>
      </div>

      {!setPage && (
        <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, padding: "14px 18px", background: `${COLORS.navy}05`, borderRadius: RADIUS.md, border: `1px solid ${COLORS.border}`, marginBottom: SPACING.md }}>
          <p style={{ margin: "0 0 8px 0" }}>
            <strong>Pre-close option:</strong> Add an Ops Diligence Snapshot (from $7,500, 2–3 weeks) before signing to surface red flags for the IC.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Recommended:</strong> Choose the bundle if you expect to close — diligence findings feed directly into Day-1 priorities with no re-learning.
          </p>
        </div>
      )}

      <ButtonPair
        primaryText="Book a Fit Check (15 min)"
        secondaryText={setPage ? "View Full Services & Details" : undefined}
        secondaryAction={setPage ? () => setPage("services") : undefined}
        centered={true}
        showAvailability={true}
      />
    </Section>
  );
}

export function TestimonialBlock() {
  const [expandedPlatform, setExpandedPlatform] = useState(false);
  const [expandedVendor, setExpandedVendor] = useState(false);

  return (
    <Section title="Track Record & Outcomes" noCTA>
      <p style={{ fontFamily: FONTS.body, color: COLORS.bodyMuted, lineHeight: 1.6, marginBottom: "24px", maxWidth: "600px" }}>
        Outcomes from institutional operating roles — same governance playbook, now installed for PE portfolio companies.
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
            <strong>PE Translation</strong> Same playbook installs in a portfolio company in 100 days — at a fraction of the complexity of a $10B fund.
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
            <strong>PE Translation</strong> Same vendor governance installs at portfolio scale. Most portcos have 40–60% of these gaps on day one — I find and close them in the first 100 days.
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

      <p className="confidentiality-note">All engagements are NDA-protected. Anonymized metrics and references available on request.</p>
    </Section>
  );
}

export function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "levers", label: "Home" },
    { key: "services", label: "Services & Pricing" },
    { key: "scorer", label: "Score Your Deal" },
    { key: "about", label: "About" },
    { key: "resources", label: "Resources" },
  ];
  const handleNav = (key) => { setPage(key); setMenuOpen(false); };
  return (
    <>
      <nav className="site-nav" style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.white, borderBottom: `3px solid ${COLORS.gold}`, padding: "0 clamp(12px, 3.5vw, 28px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px", minHeight: "76px", boxShadow: "0 2px 8px rgba(20, 33, 61, 0.08)" }}>
        <div className="nav-logo-col" style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
          <img
            src="/Devonshire_Operations_Logo_Exact-cropped1.svg"
            alt="Devonshire Operations"
            className="nav-logo"
            style={{ height: "64px", maxWidth: "100%", cursor: "pointer" }}
            onClick={() => handleNav("levers")}
          />
          <div style={{ width: "1px", height: "36px", background: COLORS.border }} className="nav-links" />
          <div className="nav-links" style={{ display: "flex", gap: "4px" }}>
            {items.map(({ key, label }) => (
              <button key={key} onClick={() => handleNav(key)}
                style={{ background: "transparent", border: "none", padding: "10px 16px", borderRadius: RADIUS.sm, color: COLORS.navy, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: page === key ? 700 : 500, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.3px", borderBottom: page === key ? `2px solid ${COLORS.gold}` : "2px solid transparent" }}
                onMouseEnter={e => { if (page !== key) e.currentTarget.style.color = COLORS.gold; }}
                onMouseLeave={e => { if (page !== key) e.currentTarget.style.color = COLORS.navy; }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <span className="nav-current-page">
          {items.find(i => i.key === page)?.label ?? ""}
        </span>
        <div className="nav-cta"><CTAButton text="Book a Fit Check (15 min)" /></div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen
            ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="4" y1="4" x2="18" y2="18" stroke={COLORS.navy} strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke={COLORS.navy} strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect y="4" width="22" height="2" rx="1" fill={COLORS.navy}/><rect y="10" width="22" height="2" rx="1" fill={COLORS.navy}/><rect y="16" width="22" height="2" rx="1" fill={COLORS.navy}/></svg>
          }
        </button>
      </nav>
      {menuOpen && (
        <div className="nav-mobile-menu">
          {items.map(({ key, label }) => (
            <button key={key} className="nav-mobile-item" onClick={() => handleNav(key)}
              style={{ color: page === key ? COLORS.gold : COLORS.navy, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.3px", background: page === key ? `${COLORS.gold}12` : "transparent" }}>
              {label}
            </button>
          ))}
          <div style={{ marginTop: "8px" }}><CTAButton text="Book a Fit Check (15 min)" /></div>
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
      <form className="footer-form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <select value={situation} onChange={e => setSituation(e.target.value)} style={inputStyle}>
          <option>Evaluating a target</option>
          <option>First 100 days post-close</option>
          <option>Mid-hold optimization</option>
        </select>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@fund.com" style={inputStyle} />
        <button type="submit" disabled={status.state === "loading"} style={{ padding: "10px 20px", background: status.state === "loading" ? COLORS.bodyMuted : COLORS.gold, color: COLORS.white, border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: status.state === "loading" ? "default" : "pointer", textAlign: "center" }}>
          {status.state === "loading" ? "Sending…" : "Send →"}
        </button>
        {status.state !== "idle" && (
          <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: status.state === "ok" ? "#68D391" : status.state === "loading" ? COLORS.offWhite : "#FC8181", margin: 0 }}>
            {status.msg}
          </p>
        )}
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
              { key: "services", label: "Services & Pricing" },
              { key: "scorer", label: "Score Your Deal" },
              { key: "about", label: "About" },
              { key: "resources", label: "Resources" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setPage(key)}
                style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.offWhite, background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.goldOnDark}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.goldOnDark, marginBottom: "16px", letterSpacing: "0.5px" }}>Resources</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <LeadMagnetLink pdfUrl={SAMPLE_SCORECARD_PDF} variant="footer-link">
              Ops Diligence Scorecard (PDF)
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
            © {new Date().getFullYear()} Devonshire Ops. All rights reserved.
          </p>
          <p style={{ fontFamily: FONTS.heading, fontSize: "0.9rem", color: COLORS.goldOnDark, opacity: 0.9, margin: 0, fontWeight: 600 }}>
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
