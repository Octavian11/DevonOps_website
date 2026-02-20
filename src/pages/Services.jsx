import { useState } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  mailtoHref,
} from "../constants.js";
import {
  CTAButton, SectionTitle, ButtonPair, Card, Section,
  TimelineRail, SplitContrast, FAQBlock, ServicesSamplesRow,
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
    { href: "#ongoing", label: "Ongoing" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#rubric", label: "Rubric" },
    { href: "#sequence", label: "100-Day sequence" },
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
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.25rem", fontWeight: 800, color: COLORS.navy }}>{title}</div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.bodyMuted, marginTop: "6px" }}>Click to {open ? "collapse" : "expand"}.</div>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: "1.25rem", fontWeight: 900, color: COLORS.navy }}>{open ? "−" : "+"}</div>
      </button>
      {open && <div style={{ marginTop: "16px" }}>{children}</div>}
    </Card>
  );
}

// ─── MINI METRIC ─────────────────────────────────────────────

function MiniMetric({ label, value, valueColor }) {
  return (
    <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "12px", background: COLORS.white }}>
      <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 900, color: COLORS.bodyMuted, marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: FONTS.heading, fontSize: "1.25rem", fontWeight: 900, color: valueColor || COLORS.navy }}>{value}</div>
    </div>
  );
}

// ─── WORKED EXAMPLE ACCORDION ────────────────────────────────

function WorkedExampleAccordion() {
  return (
    <Accordion title='Worked example: "No Change Advisory Board or Change Control Process"' defaultOpen={false}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
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
        <button onClick={() => window.location.hash = "#offers"}
          style={{ padding: "12px 18px", background: COLORS.navy, color: "white", borderRadius: "4px", border: "none", fontFamily: FONTS.body, fontWeight: 800, cursor: "pointer" }}>
          See offers & pricing
        </button>
        <CTAButton text="15-Minute Fit Check" showAvailability={true} />
      </div>
    </Accordion>
  );
}

// ─── FRAMEWORK WHY FRICTION TIGHT ────────────────────────────

function FrameworkWhyFrictionTight() {
  const leftSide = {
    title: "Operational Friction",
    description: "Unmanaged operational risk compounds under PE ownership:",
    items: [
      "Leverage amplifies friction: disruption becomes covenant risk",
      "Hold periods create urgency: months spent stabilizing compress the value creation window",
      "Exit narratives rely on operational credibility: unresolved friction becomes a multiple discount",
      "Recurring incidents erode EBITDA through rework and customer churn",
      "Key-person dependency blocks scaling and threatens continuity"
    ]
  };

  const rightSide = {
    title: "Operational Clarity",
    description: "Systematic governance unlocks value creation:",
    items: [
      "Incident command + postmortem discipline → MTTR reduction and recurrence prevention",
      "Change governance → lower failure rates and faster feature velocity",
      "KPI cadence → board-ready reporting and credible value creation narratives",
      "Vendor governance → concentration risk managed and renewal leverage captured",
      "Compliance cadence → audit-ready by default, exit diligence frictionless"
    ],
    highlight: "Friction diagnosed early → value creation accelerated"
  };

  return (
    <Section title="Operational Friction Matters in PE" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "860px", marginBottom: "24px" }}>
        This is the evaluation method used in the Ops Diligence Report and 100-Day Stabilization Plan: <strong>diagnose friction, then prioritize interventions by EBITDA impact, execution risk, and time to proof</strong>.
      </p>
      <SplitContrast leftSide={leftSide} rightSide={rightSide} />
    </Section>
  );
}

// ─── FRAMEWORK RUBRIC TABLE ──────────────────────────────────

function FrameworkRubricTable() {
  return (
    <Section title="The Friction Evaluation Rubric" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        Each lever is evaluated across six dimensions. The output is a prioritization logic you can use in diligence and in the first 100 days.
      </p>

      <div style={{ marginTop: "14px", overflowX: "auto" }}>
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
              ["Time to Proof", "How quickly can we show improvement?", "< 30 / 30–90 / 90+ days", "< 30 days → Day-1 quick win candidate"],
              ["Execution Certainty", "How proven is the playbook?", "High / Medium / Low", "High → include in 100-day plan scope"],
              ["Exit Story Impact", "Improve risk profile for next buyer?", "Strengthens / Neutral / None", "Strengthens → prioritize for exit prep"],
              ["Reversibility", "Can we course-correct if it fails?", "Easily / Partially / One-way", "One-way → requires board approval"],
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

      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginTop: "14px" }}>
        Levers scoring well on <em>EBITDA Impact + Time to Proof + Low Attention Load</em> are highest-priority quick wins. Strong <em>Exit Story Impact</em> with longer timelines are strategic investments.
      </p>
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
    <Section noCTA title="The stabilization sequence">
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px" }}>
        Operational stabilization follows a consistent three-phase sequence: <strong>Visibility → Control → Cadence</strong>.
      </p>
      <TimelineRail items={timelineItems} />
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginTop: "24px" }}>
        After Day 100, the Control Tower Retainer maintains the cadence and prevents drift-back.
      </p>
    </Section>
  );
}

// ─── SERVICES PRICING LADDER ─────────────────────────────────

function ServicesPricingLadder() {
  const items = [
    { id: "post-close", label: "100-Day Stabilization", name: "100-Day Stabilization", price: "$30–$40K", time: "100 days", desc: "Most funds start here. Install incident command, change control, KPI cadence, and board-ready reporting from Day 1." },
    { id: "ongoing", label: "Control Tower Retainer", name: "Control Tower Retainer", price: "$7.5K+/month", time: "Ongoing", desc: "After the 100-day baseline is installed, the Control Tower Retainer keeps governance on track through exit." },
    { id: "bundle", label: "Bundle (Recommended): Diligence → VCP → Execution", name: "Diligence + Value Creation Plan + 100-Day Execution", price: "$25–$35K", time: "2–3 weeks + 100 days", desc: "Diligence findings roll directly into the VCP — no re-learning, no gap between discovery and execution" },
  ];

  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 220px", minWidth: "min(220px, 100%)", position: "relative" };
  const boxGold = { ...box, border: `2px solid ${COLORS.gold}`, boxShadow: SHADOWS.md };

  return (
    <Section title="Services & Pricing"
      subtitle="Operational support for PE funds and portfolio companies — from pre-close diligence through post-close stabilization to ongoing governance."
      type="windowWithCards" noCTA id="top">
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
        Diligence without execution is a risk report. Execution without diligence is change without a plan.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: SPACING.md }}>
        {items.map((item, i) => (
          <div key={i} id={item.id} style={i === 2 ? boxGold : box}>
            {i === 2 && (
              <div style={{ position: "absolute", top: "-1px", left: 0, right: 0, height: "3px", background: COLORS.gold, borderRadius: `${RADIUS.md} ${RADIUS.md} 0 0` }} />
            )}
            <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 600 }}>{item.label}</span>
            <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, fontWeight: 700, margin: "8px 0 4px" }}>{item.name}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, fontWeight: 700, marginBottom: "4px" }}>{item.price}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal }}>{item.time}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, marginTop: "4px", fontStyle: "italic" }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, padding: "14px 18px", background: `${COLORS.navy}05`, borderRadius: RADIUS.md, border: `1px solid ${COLORS.border}`, marginBottom: SPACING.md }}>
        <p style={{ margin: "0 0 8px 0" }}>
          <strong>Pre-close option:</strong> Add an Ops Diligence Report ($15K, 2–3 weeks) before signing to surface red flags for the IC.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Recommended:</strong> Choose the bundle if you expect to close — diligence findings feed directly into Day-1 priorities with no re-learning.
        </p>
      </div>
    </Section>
  );
}

// ─── SERVICES STEPS ──────────────────────────────────────────

function ServicesSteps() {
  const timelineItems = [
    { title: "Step 1: Fit Check", meta: "15 minutes", description: "15-minute call. Assess the situation, confirm scope, and determine fit.", completed: true },
    { title: "Step 2: Scoping + Data Request", meta: "48 hours", description: "Targeted data request. Fixed-fee proposal with timeline within 48 hours.", completed: true },
    { title: "Step 3: Diligence Deliverable", meta: "2–3 weeks", description: "Risk-rated findings memo — severity-rated, PE impact framed, IC-ready. This becomes the foundation of the Value Creation Plan.", active: true },
    { title: "Step 4: Value Creation Plan + 100-Day Execution", meta: "Days 1–100", description: "Diligence findings roll directly into the VCP. The VCP defines what to fix, in what order, with what accountability. We execute against it for 100 days — incident command, change control, KPI cadence, board-ready reporting.", deliverable: "VCP document + 100-day execution tracker + board reporting cadence" }
  ];

  return (
    <Section noCTA title="How it works">
      <TimelineRail items={timelineItems} compact />
    </Section>
  );
}

// ─── FIT CHECK CTA ───────────────────────────────────────────

function FitCheckCTA() {
  const subject = "Devonshire Ops – Fit Check request";
  const body = "Hi Hassan,\n\nI reviewed the Services & Method page and would like to discuss fit.\n\nContext:\n- Company / deal stage:\n- Primary concern (incidents, change, vendor risk, KPI cadence, audit posture):\n- Timeline:\n\nBest,\n";

  return (
    <Section noCTA background={`${COLORS.navy}05`}>
      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", margin: "0 auto 20px", textAlign: "center" }}>
        Not sure where to start? Book a 15-minute fit check. We'll assess the situation, identify the highest-priority friction points, and scope the right engagement.
      </p>
      <ButtonPair
        primaryText="15-Minute Fit Check"
        secondaryText="Email me instead"
        secondaryLink={mailtoHref(subject, body)}
        centered={true}
        showAvailability={true}
      />
    </Section>
  );
}

// ─── NDA MICRO BLOCK ─────────────────────────────────────────

function NDAMicroBlock() {
  return (
    <div style={{ marginTop: "10px", padding: "10px 12px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, background: `${COLORS.navy}03`, fontFamily: FONTS.body, fontSize: "0.92rem", color: COLORS.charcoal, lineHeight: 1.45 }}>
      NDA-friendly. We can sign an NDA before receiving sensitive materials; initial triage can be done with high-level facts only.
    </div>
  );
}

// ─── TYPICAL RED FLAGS ───────────────────────────────────────

function TypicalRedFlags() {
  const leftSide = {
    title: "Red Flags We Surface",
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
    title: "Interventions We Install",
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
    <Section noCTA>
      <SectionTitle sub>Typical Red Flags We Surface (Mapped to IC Implications)</SectionTitle>
      <SplitContrast leftSide={leftSide} rightSide={rightSide} />
    </Section>
  );
}

// ─── MEMO SAMPLE SCREENSHOTS ─────────────────────────────────

function MemoSampleScreenshots() {
  const samples = [
    { src: "/memo-samples/ops-dd-exec-summary.png", alt: "Ops Diligence Scorecard executive summary excerpt", caption: "Ops Diligence Scorecard — Executive Summary (overall rating + deal implications)" },
    { src: "/memo-samples/domain-scores-1.png", alt: "Operational risk summary table excerpt (top)", caption: "Operational Risk Summary — domain ratings (excerpt 1 of 2)" },
    { src: "/memo-samples/domain-scores-2.png", alt: "Operational risk summary table excerpt (bottom)", caption: "Operational Risk Summary — domain ratings (excerpt 2 of 2)" },
    { src: "/memo-samples/100-day-phases.png", alt: "100-Day Stabilization Plan phase overview excerpt", caption: "100-Day Stabilization Plan — phase overview (Visibility → Control → Cadence)" },
  ];

  return (
    <Section noCTA background={`${COLORS.navy}03`}>
      <SectionTitle sub>Sample Deliverable Excerpts (Anonymized)</SectionTitle>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.55, marginBottom: "14px" }}>
        Real format, clipped for readability. Full deliverables are severity-rated and IC-ready.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
        {samples.map((s, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: "8px", overflow: "hidden", background: COLORS.white }}>
            <img src={s.src} alt={s.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ padding: "10px 12px", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.4 }}>
              {s.caption}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── SERVICES PAGE ───────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div>
      <div style={{ marginBottom: SPACING.lg }}>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: SPACING.sm }}>Services & Method</h1>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "720px", marginBottom: "14px" }}>
          Operational support for PE funds and portfolio companies — from pre-close diligence through post-close stabilization to ongoing governance. Fixed fees, board-ready deliverables, measurable from Day 1.
        </p>
        {/* McKinsey GPMR 2026 — LP selection criterion stat */}
        <div style={{ padding: "12px 16px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.md} ${RADIUS.md} 0`, maxWidth: "720px" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, margin: 0, lineHeight: 1.6 }}>
            <strong>53% of LPs now rank a GP's value creation strategy as a top-five criterion in manager selection</strong> — up to #3, above sector expertise. Operational execution is no longer a back-office function. It's a fund-level differentiator.
          </p>
          <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", color: COLORS.bodyMuted, letterSpacing: "0.4px", textTransform: "uppercase", display: "block", marginTop: "6px" }}>McKinsey Global Private Markets Review 2026</span>
        </div>
      </div>
      <ServicesMethodJumpBar />
      <ServicesPricingLadder />
      <ServicesSamplesRow />
      <NDAMicroBlock />

      <div id="rubric" style={{ marginTop: "28px" }}>
        <FrameworkRubricTable />
      </div>

      <div id="red-flags" style={{ marginTop: "28px" }}>
        <TypicalRedFlags />
      </div>

      <div id="why-friction" style={{ marginTop: "28px" }}>
        <FrameworkWhyFrictionTight />
      </div>

      <div id="sequence" style={{ marginTop: "28px" }}>
        <StabilizationSequence />
      </div>

      <div id="memo-samples" style={{ marginTop: "28px" }}>
        <MemoSampleScreenshots />
      </div>

      <div id="worked-example" style={{ marginTop: "28px" }}>
        <WorkedExampleAccordion />
      </div>

      <div id="how-it-works" style={{ marginTop: "28px" }}>
        <ServicesSteps />
      </div>

      <div id="faq" style={{ marginTop: "28px" }}>
        <FAQBlock />
      </div>

      <div id="fit-check" style={{ marginTop: "28px" }}>
        <FitCheckCTA />
      </div>
    </div>
  );
}
