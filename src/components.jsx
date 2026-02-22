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
    <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: RADIUS.sm, fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: s.text, background: s.bg, border: `1px solid ${s.border}`, lineHeight: 1, minWidth: "80px", textAlign: "center" }}>
      {severity}
    </span>
  );
}

export function TimingBadge({ timing }) {
  return (
    <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: RADIUS.sm, fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "white", background: TIMING_COLORS[timing] || COLORS.ongoing, lineHeight: 1, minWidth: "145px", textAlign: "center" }}>
      {timing}
    </span>
  );
}

export function DomainTag({ domain }) {
  const d = DOMAINS[domain];
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: RADIUS.sm, fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: d.color, background: `${d.color}15`, border: `1px solid ${d.color}30` }}>
      {d.short}
    </span>
  );
}

// ─── BUTTONS ─────────────────────────────────────────────────

export function CTAButton({ text, small, variant, style: extraStyle, showAvailability }) {
  const isPrimary = variant !== "secondary";
  const bg = isPrimary ? COLORS.gold : "transparent";
  const color = isPrimary ? "white" : COLORS.goldDark;
  const border = isPrimary ? "none" : `2px solid ${COLORS.goldDark}`;
  const hoverBg = isPrimary ? "#A07D2E" : `${COLORS.gold}15`;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", padding: small ? "10px 20px" : "14px 28px", background: bg, color, fontFamily: FONTS.body, fontSize: small ? "0.9rem" : "1rem", fontWeight: 600, borderRadius: RADIUS.md, textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border, ...extraStyle }}
        onMouseEnter={e => { e.currentTarget.style.background = hoverBg; }}
        onMouseLeave={e => { e.currentTarget.style.background = bg; }}>
        {text || "15-Minute Fit Check"}
      </a>
      {showAvailability && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy }}>
          Currently accepting 1–2 new engagements
        </span>
      )}
    </div>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "16px" : SPACING.lg }}>
      <h2 style={{
        fontFamily: FONTS.heading,
        fontSize: sub ? "1.25rem" : "1.75rem",
        fontWeight: 700,
        color: COLORS.navy,
        lineHeight: 1.3,
        marginTop: 0
      }}>
        {children}
      </h2>
    </div>
  );
}

export function ButtonPair({
  primaryText = "15-Minute Fit Check",
  primaryAction,
  secondaryText,
  secondaryAction,
  primaryLink = CALENDLY,
  secondaryLink,
  centered = false,
  showAvailability = false
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: centered ? "center" : "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: SPACING.sm, justifyContent: centered ? "center" : "flex-start", flexWrap: "wrap" }}>
        {primaryLink ? (
          <a href={primaryLink} target="_blank" rel="noopener noreferrer"
             style={{ display: "inline-block", padding: "14px 28px", background: COLORS.navy, color: "white", borderRadius: RADIUS.md, textDecoration: "none", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, textAlign: "center", transition: "all 0.2s", border: "none", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "180px" }}
             onMouseEnter={e => { e.currentTarget.style.background = "#0F1829"; }}
             onMouseLeave={e => { e.currentTarget.style.background = COLORS.navy; }}>
            {primaryText}
          </a>
        ) : (
          <button onClick={primaryAction}
             style={{ display: "inline-block", padding: "14px 28px", background: COLORS.navy, color: "white", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, textAlign: "center", transition: "all 0.2s", border: "none", cursor: "pointer", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "180px" }}
             onMouseEnter={e => { e.currentTarget.style.background = "#0F1829"; }}
             onMouseLeave={e => { e.currentTarget.style.background = COLORS.navy; }}>
            {primaryText}
          </button>
        )}

        {(secondaryText || secondaryAction || secondaryLink) && (
          secondaryLink ? (
            <a href={secondaryLink} target="_blank" rel="noopener noreferrer"
               style={{ display: "inline-block", padding: "12px 26px", background: "white", color: COLORS.navy, borderRadius: RADIUS.md, textDecoration: "none", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, textAlign: "center", border: `2px solid ${COLORS.navy}`, transition: "all 0.2s", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "180px" }}
               onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.navy}08`; }}
               onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
              {secondaryText}
            </a>
          ) : (
            <button onClick={secondaryAction}
               style={{ display: "inline-block", padding: "12px 26px", background: "white", color: COLORS.navy, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, textAlign: "center", border: `2px solid ${COLORS.navy}`, transition: "all 0.2s", cursor: "pointer", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "180px" }}
               onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.navy}08`; }}
               onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
              {secondaryText}
            </button>
          )
        )}
      </div>
      {showAvailability && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy }}>
          Currently accepting 1–2 new engagements
        </span>
      )}
    </div>
  );
}

export function Card({ children, style: extraStyle }) {
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: "28px", marginBottom: SPACING.md, boxShadow: SHADOWS.sm, ...extraStyle }}>
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
          cardGlow = `0 0 0 3px rgba(184, 134, 11, 0.15)`;
        }

        return (
          <div key={i} style={{ position: "relative", marginBottom: isLast ? "0" : (compact ? "24px" : SPACING.lg) }}>
            <div style={{ position: "absolute", left: compact ? "-32px" : "-46px", top: "12px", width: compact ? "16px" : "18px", height: compact ? "16px" : "18px", borderRadius: "50%", background: nodeColor, border: `3px solid ${nodeBorder}`, boxShadow: isActive ? `0 0 0 4px rgba(184, 134, 11, 0.1)` : "none", zIndex: 1 }} />

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
                <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, margin: item.items ? "0 0 12px 0" : "0" }}>
                  {item.description}
                </p>
              )}

              {item.items && item.items.length > 0 && (
                <ul style={{ paddingLeft: "20px", margin: item.deliverable ? "0 0 12px 0" : "0" }}>
                  {item.items.map((subItem, j) => (
                    <li key={j} style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "4px" }}>
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}

              {item.deliverable && (
                <div style={{ padding: "10px 14px", background: COLORS.offWhite, borderRadius: "6px", display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", color: COLORS.navy, letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 700, flexShrink: 0 }}>
                    Deliverable
                  </span>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, fontWeight: 500 }}>
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
    <div className="split-contrast" style={{ display: "grid", gap: "0", borderRadius: RADIUS.lg, overflow: "hidden", border: `1px solid ${COLORS.border}`, minHeight: "300px" }}>
      <div style={{ background: COLORS.navy, color: COLORS.offWhite, padding: SPACING.lg, display: "flex", flexDirection: "column", position: "relative" }}>
        {leftSide.title && (
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.3rem", color: COLORS.gold, margin: "0 0 16px 0", letterSpacing: "0.5px" }}>
            {leftSide.title}
          </h3>
        )}
        {leftSide.description && (
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.offWhite, lineHeight: 1.7, marginBottom: leftSide.items ? "20px" : "0", opacity: 0.95 }}>
            {leftSide.description}
          </p>
        )}
        {leftSide.items && leftSide.items.length > 0 && (
          <ul style={{ paddingLeft: "20px", margin: "0", flex: "1" }}>
            {leftSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.offWhite, lineHeight: 1.7, marginBottom: "12px", opacity: 0.9 }}>
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
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: rightSide.items ? "20px" : "0" }}>
            {rightSide.description}
          </p>
        )}
        {rightSide.items && rightSide.items.length > 0 && (
          <ul style={{ paddingLeft: "20px", margin: "0", flex: "1" }}>
            {rightSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "12px" }}>
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

export function Section({ title, subtitle, children, primaryCTA, secondaryCTA, noCTA, centered, background, noPadding, type, id }) {
  const isWindowWithCards = type === "windowWithCards";
  const defaultBackground = isWindowWithCards ? COLORS.offWhite : COLORS.white;

  return (
    <div style={{ background: background || defaultBackground, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: noPadding ? "0" : SPACING.lg, marginBottom: SPACING.md, boxShadow: SHADOWS.sm }} id={id}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {subtitle && (
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted, lineHeight: 1.7, marginTop: "-16px", marginBottom: "20px" }}>
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

export function FAQBlock() {
  const q = { fontFamily: FONTS.heading, fontSize: "1.05rem", color: COLORS.navy, margin: 0, marginBottom: "6px" };
  const a = { fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, margin: 0, marginBottom: "16px" };

  return (
    <Section title="FAQ" noCTA background={`${COLORS.navy}04`}>
      <div style={{ borderTop: `2px solid ${COLORS.gold}30`, paddingTop: SPACING.md }}>
        <h3 style={q}>Do you replace the operating team?</h3>
        <p style={a}>No. I install the operating system—governance, cadence, and controls—while ownership stays internal.</p>

        <h3 style={q}>What do you need from us?</h3>
        <p style={a}>A lightweight artifact pull (incident/change history, vendor list/contracts, KPIs, org/RACI, audit evidence folders) plus targeted stakeholder access.</p>

        <h3 style={q}>How do you handle confidentiality?</h3>
        <p style={a}>NDA-friendly by default. Minimal data handling; formats can be anonymized.</p>

        <h3 style={q}>When are you not a fit?</h3>
        <p style={a}>
          If the company already has mature incident/change governance, a live KPI cadence, and low volatility, you likely don't need stabilization—only optimization.
        </p>

        <h3 style={q}>What is a Value Creation Plan (VCP) and what does it include?</h3>
        <p style={a}>A VCP is the named operational deliverable from the diligence phase — not a slide deck. It defines which gaps to fix, in what sequence, with what accountability structure, and what measurable outcomes to expect in 100 days. It's the document that converts diligence findings into operating results. The VCP is what prevents the post-close "now what?" problem.</p>

        <h3 style={q}>Why should we hire you instead of a Big 4 firm?</h3>
        <p style={a}>Big 4 firms deliver audit-grade frameworks. I deliver practitioner-grade execution. I've been the operator — incident command at 2am, vendor governance under regulatory scrutiny, KPI cadences built from zero. If you need a framework, hire a Big 4 firm. If you need someone who installs the operating system in 100 days and hands it off running, let's talk.</p>

        <h3 style={q}>Why should we hire you instead of building an in-house operating team?</h3>
        <p style={{ ...a, marginBottom: 0 }}>Build in-house — eventually. I'm the bridge. I install the infrastructure, cadence, and playbook in 100 days. Your in-house team inherits a system that works, instead of building one from scratch while also running the business. GP operating teams have doubled since 2021 (McKinsey GPMR 2026). I'm the on-demand version for funds that aren't there yet.</p>
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
    link: { fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}`, cursor: "pointer", transition: "all 0.2s" },
    button: { display: "inline-block", padding: "14px 28px", background: COLORS.navy, color: "white", borderRadius: RADIUS.md, textDecoration: "none", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, textAlign: "center", transition: "all 0.2s", border: "none", cursor: "pointer", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "180px" },
    "inline-button": { padding: "12px 16px", borderRadius: RADIUS.md, border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, textDecoration: "none", fontFamily: FONTS.body, fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "all 0.2s" },
    "footer-link": { fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s", cursor: "pointer" },
    "micro-proof": { display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: COLORS.navy, fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, transition: "all 0.2s", padding: "4px 8px", borderRadius: RADIUS.sm, cursor: "pointer" }
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
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, marginBottom: "12px", fontWeight: 600 }}>
          Enter your email to download: <strong>{children}</strong>
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={{ padding: "8px 10px", borderRadius: RADIUS.sm, border: `1px solid ${COLORS.steel}`, fontFamily: FONTS.body, fontSize: "0.9rem", background: COLORS.white }}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@fund.com"
            required
            style={{ padding: "8px 10px", borderRadius: RADIUS.sm, border: `1px solid ${COLORS.steel}`, fontFamily: FONTS.body, fontSize: "0.9rem", background: COLORS.white }}
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
            <p style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: "#FC8181", margin: 0 }}>
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
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, marginBottom: "12px" }}>
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
        Sample 100-Day Stabilization Plan (PDF)
      </LeadMagnetLink>
    </div>
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────

// ─── OFFER CARDS (SHARED SERVICES PRICING) ──────────────────

export function OfferCards({ setPage }) {
  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(260px, 100%)" };
  const boxGold = { ...box, border: `2px solid ${COLORS.gold}`, boxShadow: SHADOWS.md };
  const tag = { fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, fontWeight: 600, marginBottom: "10px" };
  const li = { marginBottom: "8px", lineHeight: 1.55 };

  return (
    <Section title="Services & Pricing" type="windowWithCards" noCTA>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        <div style={box}>
          <SectionTitle sub>Ops Diligence Report (Pre-Close)</SectionTitle>
          <div style={tag}>Starting at $15,000 · 2–3 weeks</div>
          <ul style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, paddingLeft: "18px", margin: 0 }}>
            <li style={li}>Risk-rated red flags with severity + PE impact</li>
            <li style={li}>Evidence requests + diligence questions</li>
            <li style={li}>IC-ready memo format</li>
          </ul>
        </div>

        <div style={boxGold}>
          <SectionTitle sub>Bundle (Recommended): Diligence → VCP → Execution</SectionTitle>
          <div style={tag}>$25,000–$35,000 · diligence + 100 days</div>
          <ul style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, paddingLeft: "18px", margin: 0 }}>
            <li style={li}>Diligence findings roll directly into the Value Creation Plan — no re-learning, no gap between discovery and execution</li>
            <li style={li}>Day-1 critical path + phased 100-day execution</li>
            <li style={li}>Clear ownership + cadence from close to value</li>
          </ul>
        </div>

        <div style={box}>
          <SectionTitle sub>Control Tower Retainer (Ongoing)</SectionTitle>
          <div style={tag}>Starting at $7,500/month · ongoing</div>
          <ul style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, paddingLeft: "18px", margin: 0 }}>
            <li style={li}>Weekly operating review + board-ready KPI pack</li>
            <li style={li}>Incident + change governance discipline</li>
            <li style={li}>Vendor controls + audit readiness cadence</li>
          </ul>
        </div>
      </div>

      <ButtonPair
        primaryText="15-Minute Fit Check"
        secondaryText={setPage ? "View Full Services & Details" : undefined}
        secondaryAction={setPage ? () => setPage("services") : undefined}
        centered={true}
        showAvailability={true}
      />
    </Section>
  );
}

export function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "levers", label: "Operational Gaps" },
    { key: "services", label: "Services" },
    { key: "scorer", label: "Score Your Deal" },
    { key: "about", label: "About" },
  ];
  const handleNav = (key) => { setPage(key); setMenuOpen(false); };
  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.white, borderBottom: `3px solid ${COLORS.gold}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px", minHeight: "76px", boxShadow: "0 2px 8px rgba(20, 33, 61, 0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src="/Devonshire_Operations_Logo_Exact-cropped1.svg"
            alt="Devonshire Operations"
            style={{ height: "64px", cursor: "pointer" }}
            onClick={() => handleNav("levers")}
          />
          <div style={{ width: "1px", height: "36px", background: COLORS.border }} className="nav-links" />
          <div className="nav-links" style={{ display: "flex", gap: "4px" }}>
            {items.map(({ key, label }) => (
              <button key={key} onClick={() => handleNav(key)}
                style={{ background: page === key ? `${COLORS.gold}35` : "transparent", border: "none", padding: "10px 16px", borderRadius: RADIUS.sm, color: page === key ? COLORS.gold : COLORS.navy, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: page === key ? 700 : 600, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.3px", borderBottom: page === key ? `2px solid ${COLORS.gold}` : "2px solid transparent" }}
                onMouseEnter={e => { if (page !== key) e.currentTarget.style.color = COLORS.gold; }}
                onMouseLeave={e => { if (page !== key) e.currentTarget.style.color = COLORS.navy; }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-cta"><CTAButton text="15-Minute Fit Check" /></div>
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
          <div style={{ marginTop: "8px" }}><CTAButton text="15-Minute Fit Check" /></div>
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
    fontSize: "0.875rem",
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
        setStatus({ state: "ok", msg: "Thanks! We'll be in touch soon." });
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
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.gold, marginBottom: "16px", letterSpacing: "0.5px" }}>
        Not ready to book?
      </h3>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.875rem", color: `${COLORS.offWhite}B0`, lineHeight: 1.55, marginBottom: "14px" }}>
        Share your situation and I'll reply with fit and next steps.
      </p>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          <p style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: status.state === "ok" ? "#68D391" : status.state === "loading" ? COLORS.offWhite : "#FC8181", margin: 0 }}>
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
        {/* Contact */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.gold, marginBottom: "16px", letterSpacing: "0.5px" }}>Contact</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.gold} onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
              {CONTACT_EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.offWhite, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.gold} onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
              LinkedIn →
            </a>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, textDecoration: "none", fontWeight: 600, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                15-Minute Fit Check →
              </a>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.offWhite }}>
                Currently accepting 1–2 new engagements
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.gold, marginBottom: "16px", letterSpacing: "0.5px" }}>Navigation</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { key: "levers", label: "Operational Gaps" },
              { key: "services", label: "Services" },
              { key: "scorer", label: "Score Your Deal" },
              { key: "about", label: "About" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setPage(key)}
                style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.offWhite, background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.offWhite}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.gold, marginBottom: "16px", letterSpacing: "0.5px" }}>Resources</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <LeadMagnetLink pdfUrl={SAMPLE_SCORECARD_PDF} variant="footer-link">
              Ops Diligence Scorecard (PDF)
            </LeadMagnetLink>
            <LeadMagnetLink pdfUrl={SAMPLE_100DAY_PDF} variant="footer-link">
              100-Day Stabilization Plan (PDF)
            </LeadMagnetLink>
          </div>
        </div>

        {/* Email form */}
        <FooterLeadCapture />
      </div>

      {/* Copyright */}
      <div style={{ maxWidth: "1200px", margin: "32px auto 0", padding: "24px 24px 0 24px", borderTop: `1px solid ${COLORS.steel}40`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.offWhite, opacity: 0.7, margin: "0 0 4px 0" }}>
            © {new Date().getFullYear()} Devonshire Ops. All rights reserved.
          </p>
          <p style={{ fontFamily: FONTS.heading, fontSize: "0.9rem", color: COLORS.gold, opacity: 0.85, margin: 0, fontStyle: "italic" }}>
            Find the gaps. Build the plan. Deliver the alpha.
          </p>
        </div>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.offWhite, opacity: 0.7, margin: 0 }}>
          NDA-friendly. Minimal data handling. Anonymized formats accepted.
        </p>
      </div>
    </footer>
  );
}
