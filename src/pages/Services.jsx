import { useState } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  LEVERS, DOMAINS,
  mailtoHref,
} from "../constants.js";
import {
  CTAButton, SectionTitle, ButtonPair, Card, Section,
  TimelineRail, SplitContrast, FAQBlock, ServicesSamplesRow, OfferCards,
  SeverityBadge, TimingBadge, DomainTag,
} from "../components.jsx";

// ─── JUMP BAR ────────────────────────────────────────────────

function ServicesMethodJumpBar() {
  const linkStyle = {
    fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700,
    color: COLORS.navy, textDecoration: "none",
    padding: "8px 14px", borderRadius: RADIUS.md,
    border: `1px solid ${COLORS.steel}`, background: COLORS.white,
    transition: "all 0.15s",
  };

  const links = [
    { href: "#top", label: "Pricing" },
    { href: "#lever-explorer", label: "20 Levers" },
    { href: "#rubric", label: "Rubric" },
    { href: "#sequence", label: "100-Day Sequence" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
    { href: "#fit-check", label: "Fit Check" },
  ];

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: SPACING.md }}>
      {links.map(({ href, label }) => (
        <a key={href} href={href} style={linkStyle}
          onMouseEnter={e => { e.currentTarget.style.background = COLORS.navy; e.currentTarget.style.color = COLORS.white; e.currentTarget.style.borderColor = COLORS.navy; }}
          onMouseLeave={e => { e.currentTarget.style.background = COLORS.white; e.currentTarget.style.color = COLORS.navy; e.currentTarget.style.borderColor = COLORS.steel; }}>
          {label}
        </a>
      ))}
    </div>
  );
}

// ─── ACCORDION ───────────────────────────────────────────────

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card style={{ borderLeft: `3px solid ${COLORS.gold}` }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.25rem", fontWeight: 700, color: COLORS.navy }}>{title}</div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.bodyMuted, marginTop: "6px" }}>Click to {open ? "collapse" : "expand"}.</div>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: "1.25rem", fontWeight: 700, color: COLORS.navy }}>{open ? "−" : "+"}</div>
      </button>
      {open && <div style={{ marginTop: "16px" }}>{children}</div>}
    </Card>
  );
}

// ─── MINI METRIC ─────────────────────────────────────────────

function MiniMetric({ label, value, valueColor }) {
  return (
    <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "12px", background: COLORS.white }}>
      <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.bodyMuted, marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: FONTS.heading, fontSize: "1.25rem", fontWeight: 700, color: valueColor || COLORS.navy }}>{value}</div>
    </div>
  );
}

// ─── WORKED EXAMPLE ACCORDION ────────────────────────────────

function WorkedExampleAccordion() {
  return (
    <Accordion title='Worked example: "No Change Advisory Board or Change Control Process"' defaultOpen={false}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "12px" }}>
        <MiniMetric label="EBITDA Impact" value="Direct" valueColor="#8B1E1E" />
        <MiniMetric label="Time to Proof" value="< 30 days" valueColor="#1F6F3A" />
        <MiniMetric label="Execution Certainty" value="High" valueColor="#1F6F3A" />
        <MiniMetric label="Exit Story Impact" value="Strengthens" valueColor="#1F6F3A" />
        <MiniMetric label="Reversibility" value="Easily" valueColor="#1F6F3A" />
        <MiniMetric label="Attention Load" value="Low" valueColor="#1F6F3A" />
      </div>

      <div style={{ marginTop: "16px", fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          <strong>Pre-close implication:</strong> Uncontrolled changes are a leading cause of production incidents. If the target has no change control, flag it in the diligence memo — this is direct EBITDA drag hiding in incident correlation data.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>First 100 days implication:</strong> Install a lightweight CAB within the first two weeks. This is a high-certainty, low-attention, fast-proof intervention. Change-incident correlation tracking starts producing board-ready data within 30 days.
        </p>
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => window.location.hash = "#top"}
          style={{ padding: "10px 20px", background: COLORS.navy, color: "white", borderRadius: RADIUS.md, border: "none", fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
          See offers & pricing
        </button>
        <CTAButton text="Book a Fit Check" showAvailability={true} />
      </div>
    </Accordion>
  );
}

// ─── FRAMEWORK WHY FRICTION TIGHT ────────────────────────────

function FrameworkWhyFrictionTight() {
  const leftSide = {
    title: "Operational Friction",
    description: "Unmanaged ops risk compounds under leverage:",
    items: [
      "Disruption becomes covenant risk",
      "Months spent stabilizing compress the value creation window",
      "Unresolved friction becomes a multiple discount at exit",
      "Recurring incidents erode EBITDA through rework and churn",
      "Key-person dependency blocks scaling"
    ]
  };

  const rightSide = {
    title: "Operational Clarity",
    description: "Systematic governance unlocks value creation:",
    items: [
      "Incident command → faster resolution, fewer repeat failures",
      "Change governance → fewer outages, faster releases",
      "KPI cadence → board-ready reporting from Day 1",
      "Vendor governance → concentration risk managed, renewal leverage captured",
      "Compliance cadence → audit-ready by default"
    ],
    highlight: "Friction diagnosed early → value creation accelerated"
  };

  return (
    <Section title="Why Operational Friction Compounds Under PE Ownership" noCTA>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "24px" }}>
        My method: diagnose friction, prioritize by EBITDA impact and time to proof.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px", minWidth: "min(260px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${COLORS.critical}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{leftSide.title}</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{leftSide.description}</p>
          <ul style={{ paddingLeft: "18px", margin: 0 }}>
            {leftSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: "1 1 280px", minWidth: "min(260px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${COLORS.gold}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{rightSide.title}</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{rightSide.description}</p>
          <ul style={{ paddingLeft: "18px", margin: 0 }}>
            {rightSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
            ))}
          </ul>
          <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: `1px solid ${COLORS.border}`, fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, fontWeight: 600 }}>
            {rightSide.highlight}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── FRAMEWORK RUBRIC TABLE ──────────────────────────────────

function FrameworkRubricTable() {
  const [open, setOpen] = useState(false);
  return (
    <Section title="The Friction Evaluation Rubric" noCTA>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "12px" }}>
        Each lever is evaluated across six dimensions — EBITDA impact, time to proof, execution certainty, exit story impact, reversibility, and attention load.
      </p>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "8px 16px", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, fontWeight: 600, cursor: "pointer", marginBottom: "16px" }}>
        {open ? "Hide rubric ▾" : "Show scoring rubric — 6 evaluation criteria with action triggers ▸"}
      </button>

      {open && <>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONTS.body, fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
                {["Criterion", "What It Tests", "Scoring", "Action Trigger"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: COLORS.navy, fontSize: "0.9rem", letterSpacing: "0.3px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["EBITDA Impact", "Directly erode earnings or margin?", "Direct / Indirect / Minimal", "Direct → flag in IC memo, quantify drag"],
                ["Time to Proof", "How quickly does improvement appear?", "< 30 / 30–90 / 90+ days", "< 30 days → Day-1 quick win candidate"],
                ["Execution Certainty", "How proven is the playbook?", "High / Medium / Low", "High → include in 100-day plan scope"],
                ["Exit Story Impact", "Improve risk profile for next buyer?", "Strengthens / Neutral / None", "Strengthens → prioritize for exit prep"],
                ["Reversibility", "Can this be reversed if needed?", "Easily / Partially / One-way", "One-way → requires board approval"],
                ["Attention Load", "Management bandwidth required?", "Low / Medium / High", "High → defer early in hold period"],
              ].map(([c, w, s, a], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <td style={{ padding: "8px 10px", fontWeight: 600, color: COLORS.charcoal, whiteSpace: "nowrap", fontSize: "0.9rem" }}>{c}</td>
                  <td style={{ padding: "8px 10px", color: COLORS.charcoal, fontSize: "0.9rem" }}>{w}</td>
                  <td style={{ padding: "8px 10px", fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.charcoal }}>{s}</td>
                  <td style={{ padding: "8px 10px", fontSize: "0.85rem", color: COLORS.navy, fontWeight: 500 }}>{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginTop: "14px" }}>
          Levers scoring well on <em>EBITDA Impact + Time to Proof + Low Attention Load</em> are highest-priority quick wins. Strong <em>Exit Story Impact</em> with longer timelines are strategic investments.
        </p>
      </>}
    </Section>
  );
}

// ─── STABILIZATION SEQUENCE ──────────────────────────────────

function StabilizationSequence() {
  const timelineItems = [
    {
      title: "Phase 1: Visibility", meta: "Days 1–14",
      description: "You can't fix what you can't see. Establish baseline visibility into what's actually happening — not what management says is happening.",
      items: ["Incident volume, severity, MTTR, recurrence rate", "Change frequency, failure rate, rollback frequency", "Vendor inventory, contract terms, concentration exposure", "Current compliance posture vs. stated posture"],
      deliverable: "Baseline assessment memo + operational risk heatmap",
      completed: true
    },
    {
      title: "Phase 2: Control", meta: "Days 15–45",
      description: "Install the minimum governance gates that prevent new damage from accumulating while you address existing debt.",
      items: ["Incident command structure with severity classification", "Change control process with risk classification", "Escalation paths with defined thresholds", "Access review and vendor oversight cadence"],
      deliverable: "CAB charter + severity policy + escalation matrix",
      active: true
    },
    {
      title: "Phase 3: Cadence", meta: "Days 45–100",
      description: "Governance installed ad hoc decays without rhythm. Build the operating cadence that makes stability self-sustaining.",
      items: ["Weekly operating review with defined KPIs and thresholds", "Monthly board-ready reporting package", "Quarterly vendor scorecards and control testing", "Postmortem → recurrence prevention → backlog loop"],
      deliverable: "Board ops dashboard + first QBR pack + audit evidence index"
    }
  ];

  return (
    <Section noCTA title="The Stabilization Sequence" variant="tinted">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "32px" }}>
        Operational stabilization follows a consistent three-phase sequence: <strong>Visibility → Control → Cadence</strong>.
      </p>
      <TimelineRail items={timelineItems} />
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginTop: "24px" }}>
        After Day 100, the Control Tower Retainer maintains the cadence and prevents drift-back.
      </p>
    </Section>
  );
}

// ─── SERVICES STEPS ──────────────────────────────────────────

function ServicesSteps() {
  const steps = [
    { num: "1", title: "Fit Check", meta: "15 minutes", description: "15-minute call. Assess the situation, confirm scope, and determine fit." },
    { num: "2", title: "Scoping + Data Request", meta: "48 hours", description: "Targeted data request. Fixed-fee proposal with timeline within 48 hours." },
    { num: "3", title: "Diligence Deliverable", meta: "2–3 weeks", description: "Risk-rated findings memo — severity-rated, PE impact framed, IC-ready. This becomes the foundation of the Value Creation Plan." },
    { num: "4", title: "Value Creation Plan + 100-Day Execution", meta: "Days 1–100", description: "Diligence findings roll directly into the VCP. I execute against it for 100 days — incident command, change control, KPI cadence, board-ready reporting." },
  ];

  return (
    <Section noCTA title="How it works">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {steps.map((s) => (
          <div key={s.num} style={{ border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "1.4rem", fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>{s.num}</span>
              <span style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy }}>{s.title}</span>
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.78rem", fontWeight: 700, color: COLORS.steel, letterSpacing: "0.6px", textTransform: "uppercase" }}>{s.meta}</div>
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── FIT CHECK CTA ───────────────────────────────────────────

function FitCheckCTA() {
  const subject = "Devonshire Ops – Fit Check request";
  const body = "Hi Hassan,\n\nI reviewed the Services & Method page and would like to discuss fit.\n\nContext:\n- Company / deal stage:\n- Primary concern (incidents, change, vendor risk, KPI cadence, audit posture):\n- Timeline:\n\nBest,\n";

  return (
    <Section noCTA background={`${COLORS.navy}05`}>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", margin: "0 auto 20px", textAlign: "center" }}>
        Not sure where to start? Book a Fit Check. I'll assess the situation, identify the highest-priority friction points, and scope the right engagement.
      </p>
      <ButtonPair
        primaryText="Book a Fit Check"
        secondaryText="Email me instead"
        secondaryLink={mailtoHref(subject, body)}
        centered={true}
        showAvailability={true}
      />
      <div style={{ marginTop: "16px", padding: "10px 12px", borderRadius: RADIUS.md, border: `1px solid ${COLORS.border}`, background: `${COLORS.navy}03`, fontFamily: FONTS.body, fontSize: "0.92rem", color: COLORS.charcoal, lineHeight: 1.45, maxWidth: "960px", margin: "16px auto 0" }}>
        NDA-friendly. I can sign an NDA before receiving sensitive materials; initial triage can be done with high-level facts only.
      </div>
    </Section>
  );
}

// ─── TYPICAL RED FLAGS ───────────────────────────────────────

function TypicalRedFlags() {
  const leftSide = {
    title: "Red Flags I Surface",
    description: "Operational fragility that threatens deal value:",
    items: [
      { title: "Hidden EBITDA drag", body: "Recurring incidents, rework, and unmanaged change inflate labor and vendor spend" },
      { title: "Day-1 governance gaps", body: "No incident command, no change control, no KPI cadence → risk compounds under new ownership" },
      { title: "Vendor concentration", body: "Single-vendor dependencies, auto-renew traps, and missing exit plans create holdback/TSA exposure" },
      { title: "Audit fragility", body: "Evidence scattered, controls inconsistent → diligence and exit readiness risk" },
      { title: "Key-person dependency", body: "Tribal knowledge and fragile staffing → continuity risk and slower integration" }
    ]
  };

  const rightSide = {
    title: "Interventions I Install",
    description: "Systematic fixes that prevent recurrence:",
    items: [
      { title: "Incident command", body: "Severity classification, escalation paths, postmortem discipline → MTTR reduction" },
      { title: "Change governance", body: "CAB-lite process, risk classification, rollback discipline → change failure rate drops" },
      { title: "Vendor governance", body: "Contract mapping, renewal calendar, SLA monitoring → concentration risk managed" },
      { title: "Compliance cadence", body: "Evidence index, control testing, access reviews → audit-ready by default" },
      { title: "Knowledge capture", body: "Runbooks, RACI, cross-training → key-person risk mitigated" }
    ],
    highlight: "Day-1 governance → sustainable value creation"
  };

  return (
    <Section noCTA title="Typical Red Flags I Surface">
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px", minWidth: "min(260px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${COLORS.critical}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{leftSide.title}</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "14px" }}>{leftSide.description}</p>
          {leftSide.items.map((item, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: COLORS.navy, marginBottom: "2px" }}>{item.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.55 }}>{item.body}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: "1 1 280px", minWidth: "min(260px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${COLORS.gold}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{rightSide.title}</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "14px" }}>{rightSide.description}</p>
          {rightSide.items.map((item, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: COLORS.navy, marginBottom: "2px" }}>{item.title}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.55 }}>{item.body}</div>
            </div>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: `1px solid ${COLORS.border}`, fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, fontWeight: 600 }}>
            {rightSide.highlight}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── MEMO SAMPLE SCREENSHOTS ─────────────────────────────────

function MemoSampleScreenshots() {
  const [open, setOpen] = useState(false);
  const samples = [
    { src: "/memo-samples/ops-dd-exec-summary.png", alt: "Ops Diligence Scorecard executive summary excerpt", caption: "Ops Diligence Scorecard — Executive Summary (overall rating + deal implications)" },
    { src: "/memo-samples/domain-scores-1.png", alt: "Operational risk summary table excerpt (top)", caption: "Operational Risk Summary — domain ratings (excerpt 1 of 2)" },
    { src: "/memo-samples/domain-scores-2.png", alt: "Operational risk summary table excerpt (bottom)", caption: "Operational Risk Summary — domain ratings (excerpt 2 of 2)" },
    { src: "/memo-samples/100-day-phases.png", alt: "100-Day Stabilization Plan phase overview excerpt", caption: "100-Day Stabilization Plan — phase overview (Visibility → Control → Cadence)" },
  ];

  return (
    <Section noCTA background={`${COLORS.navy}03`} title="Sample Deliverable Excerpts (Anonymized)">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.55, marginBottom: "12px" }}>
        Real format, anonymized for readability — severity-rated, IC-ready.
      </p>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "8px 16px", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, fontWeight: 600, cursor: "pointer", marginBottom: "16px" }}>
        {open ? "Hide sample excerpts ▾" : "Show 4 anonymized deliverable excerpts (Scorecard + 100-Day Plan) ▸"}
      </button>

      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "14px" }}>
          {samples.map((s, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: "8px", overflow: "hidden", background: COLORS.white }}>
              <img src={s.src} alt={s.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ padding: "10px 12px", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.4 }}>
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

// ─── DOMAIN LEGEND ───────────────────────────────────────────

function DomainLegend() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONTS.body, fontSize: "1.1rem", color: COLORS.navy, display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
        <span style={{ fontSize: "1.4rem" }}>{open ? "▾" : "▸"}</span>
        <span>Domain codes legend</span>
        <div style={{ display: "inline-flex", gap: "6px", marginLeft: "8px" }}>
          {Object.entries(DOMAINS).map(([k]) => (
            <span key={k} style={{ display: "inline-block", padding: "2px 6px", borderRadius: "2px", fontSize: "0.75rem", fontFamily: FONTS.body, color: COLORS.steel, background: `${COLORS.steel}12` }}>{DOMAINS[k].short}</span>
          ))}
        </div>
      </button>
      {open && (
        <div className="fade-in" style={{ marginTop: "10px", padding: "16px 20px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: "6px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
            {Object.entries(DOMAINS).map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "0 12px", alignItems: "start" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "3px 8px", borderRadius: "3px", fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 500, color: COLORS.steel, background: `${COLORS.steel}12`, border: `1px solid ${COLORS.steel}25`, marginTop: "3px", textAlign: "center" }}>{v.short}</span>
                <div>
                  <span style={{ display: "block", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "4px" }}>{v.name}</span>
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, margin: 0, lineHeight: 1.5, maxWidth: "none" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LEVER EXPLORER SECTION ──────────────────────────────────

function LeverExplorerSection({ setPage }) {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [timingFilter, setTimingFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = LEVERS.filter(l => {
    if (domainFilter !== "All" && l.domain !== domainFilter) return false;
    if (timingFilter !== "All" && l.timing !== timingFilter) return false;
    if (severityFilter !== "All" && l.severity !== severityFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.definition.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const hasActiveFilter = search || domainFilter !== "All" || timingFilter !== "All" || severityFilter !== "All";
  const visible = hasActiveFilter ? filtered : (showAll ? filtered : filtered.filter(l => l.common));

  const selectStyle = { padding: "10px 14px", border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, background: COLORS.white, cursor: "pointer", minWidth: "160px", boxShadow: "0 1px 2px rgba(67, 97, 125, 0.05)" };

  return (
    <Section title="20 Operational Value Creation Levers" noCTA variant="tinted" id="lever-explorer">
      <style>{`
        @media (max-width: 540px) {
          .lever-filters input { width: 100% !important; flex: 1 1 100% !important; }
          .lever-filters select { flex: 1 1 calc(50% - 6px) !important; min-width: 120px !important; }
        }
      `}</style>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "960px", marginBottom: "32px" }}>
        {LEVERS.length} operational friction points across 6 domains — severity-rated, PE impact framed. {!showAll && !hasActiveFilter ? "Showing the 6 most common gaps. Use filters above or expand to see all 20." : "Filter by timing, domain, or severity. Open any lever for symptoms and PE impact analysis."}
      </p>

      <DomainLegend />

      <div className="lever-filters" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search levers..." style={{ ...selectStyle, minWidth: "220px", flex: "1 1 220px" }} />
        <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} style={selectStyle}>
          <option value="All">All Domains</option>
          {Object.entries(DOMAINS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
        <select value={timingFilter} onChange={e => setTimingFilter(e.target.value)} style={selectStyle}>
          <option value="All">All Timing</option>
          <option value="Pre-Close Red Flag">Pre-Close Red Flag</option>
          <option value="First 100 Days">First 100 Days</option>
          <option value="Ongoing Hold">Ongoing Hold</option>
        </select>
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} style={selectStyle}>
          <option value="All">All Severity</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select>
      </div>

      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "18px" }}>
        Showing {visible.length} of {LEVERS.length} levers
      </p>

      {visible.map((lever, idx) => {
        const showGroupHeader = domainFilter === "All" && (idx === 0 || visible[idx - 1].domain !== lever.domain);
        const domainInfo = DOMAINS[lever.domain];
        const domainCount = domainFilter === "All" ? filtered.filter(l => l.domain === lever.domain).length : null;
        return (
        <div key={lever.id}>
          {showGroupHeader && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: `${idx === 0 ? "0" : "24px"} 0 10px` }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: domainInfo?.color || COLORS.steel, background: `${domainInfo?.color || COLORS.steel}15`, padding: "4px 10px", borderRadius: "4px" }}>
                {domainInfo?.name || lever.domain}
              </span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted }}>
                {domainCount} lever{domainCount !== 1 ? "s" : ""}
              </span>
              <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
            </div>
          )}
          <div style={{ background: COLORS.white, border: `1px solid ${expanded === lever.id ? COLORS.steel : COLORS.border}`, borderRadius: RADIUS.md, marginBottom: "8px", transition: "all 0.15s", cursor: "pointer" }}
            onClick={() => setExpanded(expanded === lever.id ? null : lever.id)}>
            <div className="lever-row" style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "1.3rem", color: COLORS.navy, width: "20px", flexShrink: 0 }}>
                {expanded === lever.id ? "▾" : "▸"}
              </span>
              <DomainTag domain={lever.domain} />
              <span style={{ fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 500, color: COLORS.charcoal, flex: 1 }}>
                {lever.name}
              </span>
              <div className="lever-badges" style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <SeverityBadge severity={lever.severity} />
                <TimingBadge timing={lever.timing} />
              </div>
            </div>
            {expanded === lever.id && (
              <div className="lever-expand lever-expand-detail" style={{ padding: "0 22px 22px 52px", borderTop: `1px solid ${COLORS.border}` }} onClick={e => e.stopPropagation()}>
                <div style={{ paddingTop: "18px" }}>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>Definition</h4>
                  <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.definition}</p>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>Symptoms</h4>
                  <ul style={{ paddingLeft: "22px", marginBottom: "18px" }}>
                    {lever.symptoms.map((s, i) => <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "6px" }}>{s}</li>)}
                  </ul>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>PE Impact</h4>
                  <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.peImpact}</p>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>What Good Looks Like</h4>
                  <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.whatGood}</p>
                  <div style={{ display: "flex", gap: "16px", paddingTop: "8px", borderTop: `1px solid ${COLORS.border}` }}>
                    <button onClick={() => setPage("scorer")} style={{ background: "none", border: "none", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, cursor: "pointer", textDecoration: "underline", padding: 0 }}>→ Assess your readiness</button>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, textDecoration: "underline" }}>Book a Fit Check</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {idx === 4 && visible.length > 5 && (
            <div style={{ margin: "12px 0 16px", padding: "20px 28px", background: COLORS.navy, borderRadius: RADIUS.md, boxShadow: "0 4px 12px rgba(67, 97, 125, 0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontFamily: FONTS.body, color: COLORS.offWhite, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: COLORS.gold }}>Not sure which of these apply to your deal?</strong> Score Your Deal — free, 2 minutes, produces a prioritized assessment.
              </p>
              <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: COLORS.gold, color: "#FFFFFF", fontFamily: "'Arial', sans-serif", fontSize: "17px", fontWeight: 600, border: "none", borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                  Book a Fit Check
                </a>
                <button onClick={() => setPage("scorer")} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: "transparent", color: COLORS.gold, fontFamily: "'Arial', sans-serif", fontSize: "17px", fontWeight: 600, border: `1.5px solid ${COLORS.gold}`, borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                  Score Your Deal →
                </button>
              </div>
            </div>
          )}
        </div>
        );
      })}

      {!showAll && !hasActiveFilter && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button onClick={() => setShowAll(true)} style={{ padding: "12px 28px", background: "transparent", border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.navy, cursor: "pointer", fontWeight: 500 }}>
            Show all {LEVERS.length} levers ↓
          </button>
        </div>
      )}
    </Section>
  );
}

// ─── SERVICES PAGE ───────────────────────────────────────────

export default function ServicesPage({ setPage }) {
  return (
    <div>
      <Section noCTA>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 400, color: COLORS.navy, marginBottom: SPACING.sm }}>Framework</h1>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "14px" }}>
          Operational support for PE funds and portfolio companies — from pre-close diligence through post-close stabilization to ongoing governance. Fixed fees, board-ready deliverables, measurable from Day 1.
        </p>
        <div className="mckinsey-quote" style={{ maxWidth: "960px" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, margin: 0, lineHeight: 1.6 }}>
            <strong>53% of LPs now rank a GP's value creation strategy as a top-five criterion in manager selection</strong> — up to #3, above sector expertise. Operational execution is no longer a back-office function. It's a fund-level differentiator.
          </p>
          <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", color: COLORS.bodyMuted, letterSpacing: "0.4px", textTransform: "uppercase", display: "block", marginTop: "6px" }}>McKinsey Global Private Markets Review 2026</span>
        </div>
        <ServicesSamplesRow />
      </Section>
      <ServicesMethodJumpBar />
      <OfferCards />

      <LeverExplorerSection setPage={setPage} />

      <div id="rubric"><FrameworkRubricTable /></div>
      <div id="red-flags"><TypicalRedFlags /></div>
      <div id="why-friction"><FrameworkWhyFrictionTight /></div>
      <div id="sequence"><StabilizationSequence /></div>
      <div id="memo-samples"><MemoSampleScreenshots /></div>
      <div id="worked-example"><WorkedExampleAccordion /></div>
      <div id="how-it-works"><ServicesSteps /></div>
      <div id="faq"><FAQBlock variant="tinted" /></div>
    </div>
  );
}
