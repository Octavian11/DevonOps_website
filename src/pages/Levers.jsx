import { useState, useEffect } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  LEVERS, DOMAINS, mailtoHref,
} from "../constants.js";
import {
  SeverityBadge, TimingBadge, DomainTag,
  CTAButton, SectionTitle, ButtonPair, Section,
  TimelineRail, SplitContrast, FAQBlock,
} from "../components.jsx";

// ─── HERO BLOCK WITH NAV ─────────────────────────────────────

function HeroBlockWithNav({ setPage }) {
  return (
    <div className="hero-block" style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, marginTop: "-40px", marginBottom: "0", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />
      <div style={{ position: "relative", maxWidth: "720px" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
          Ops Diligence · Value Creation Plans · Post-Close Governance
        </div>
        <h1 className="hero-headline" style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "18px" }}>
          Operational gaps are your biggest value creation lever. We find them before close and convert them into alpha.
        </h1>
        <p className="hero-subheadline" style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "14px" }}>
          15+ years at JPM, Barclays, BofA, Lazard. $10B+ in assets. I surface the operational friction PE funds miss — and build the Value Creation Plan that converts it into EBITDA improvement in 100 days.
        </p>
        <p className="hero-subheadline" style={{ fontFamily: FONTS.body, fontSize: "0.92rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: "22px", fontStyle: "italic" }}>
          Engagements start within 2 weeks of signing. First deliverables hit the board in 30 days.
        </p>

        {/* McKinsey GPMR 2026 data anchor */}
        <div style={{ borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: "16px", marginBottom: "28px" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6, margin: "0 0 5px 0", fontStyle: "italic" }}>
            "Leverage and multiple expansion drove 59% of PE returns from 2010–2022. That era is compressing. Operational value creation is the primary remaining lever."
          </p>
          <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", color: COLORS.gold, letterSpacing: "0.6px", textTransform: "uppercase", fontWeight: 600 }}>
            McKinsey Global Private Markets Review 2026
          </span>
        </div>

        <div className="hero-ctas" style={{ display: "flex", gap: SPACING.sm, flexWrap: "wrap", alignItems: "flex-start" }}>
          <button onClick={() => setPage("scorer")}
            style={{ display: "inline-block", padding: "12px 28px", background: COLORS.gold, color: "white", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: RADIUS.sm, letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: "none" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; }}>
            Run the Ops Scorer →
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "12px 28px", background: "transparent", color: COLORS.gold, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: RADIUS.sm, textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: `2px solid ${COLORS.gold}` }}
              onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.gold}15`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              Book a 15-Min Fit Check
            </a>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontStyle: "italic", textAlign: "center" }}>
              Currently accepting 1–2 new engagements
            </span>
          </div>
        </div>
      </div>
    </div>
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
          {Object.entries(DOMAINS).map(([k, v]) => (
            <span key={k} style={{ display: "inline-block", padding: "2px 6px", borderRadius: "2px", fontSize: "0.75rem", fontFamily: FONTS.body, color: v.color, background: `${v.color}10` }}>{v.short}</span>
          ))}
        </div>
      </button>
      {open && (
        <div className="fade-in" style={{ marginTop: "10px", padding: "16px 20px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: "6px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {Object.entries(DOMAINS).map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "3px", fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 500, color: v.color, background: `${v.color}15`, border: `1px solid ${v.color}30`, flexShrink: 0, marginTop: "2px" }}>{v.short}</span>
                <div>
                  <span style={{ fontFamily: FONTS.body, fontSize: "1.05rem", fontWeight: 600, color: COLORS.charcoal }}>{v.name}</span>
                  <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginTop: "2px", lineHeight: 1.5 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MICRO PROOF STRIP ───────────────────────────────────────

function MicroProofStrip() {
  const proofItems = [
    { icon: "✓", text: "Severity-rated findings", link: SAMPLE_SCORECARD_PDF },
    { icon: "✓", text: "IC-ready memo format", link: SAMPLE_SCORECARD_PDF },
    { icon: "✓", text: "100-day stabilization plan", link: SAMPLE_100DAY_PDF },
  ];

  return (
    <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}08 0%, ${COLORS.gold}08 100%)`, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "16px 24px", marginBottom: "24px", display: "flex", gap: SPACING.lg, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
      {proofItems.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: COLORS.navy, fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, transition: "all 0.2s", padding: "4px 8px", borderRadius: RADIUS.sm }}
          onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.navy}08`; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}>
          <span style={{ color: COLORS.gold, fontSize: "1.1rem" }}>{item.icon}</span>
          <span>{item.text}</span>
        </a>
      ))}
    </div>
  );
}

// ─── TRIGGER SCENARIOS ───────────────────────────────────────

function TriggerScenarios({ setPage }) {
  const scenarios = [
    {
      title: "Pre-close diligence or Day 1 post-close",
      description: "Diligence uncovered incident patterns with unclear root cause, or new ownership needs a stabilization baseline fast. You need severity-rated findings for the IC and a Day-1 critical path.",
      action: "scorer"
    },
    {
      title: "Mid-hold: operational drift is blocking value creation",
      description: "EBITDA improvement initiatives keep stalling due to operational fragility. The board wants visibility and a plan.",
      action: "calendly"
    },
    {
      title: "Exit prep: operational risk surfacing in buyer DD",
      description: "Buyers are asking about incident history, vendor concentration, and compliance posture. You need audit-ready evidence.",
      action: "calendly"
    }
  ];

  const handleAction = (action) => {
    if (action === "scorer" || action === "services") {
      setPage(action);
    } else if (action === "calendly") {
      window.open(CALENDLY, "_blank", "noopener,noreferrer");
    }
  };

  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(260px, 100%)", display: "flex", flexDirection: "column" };

  return (
    <Section title="Common Situations Where Funds Engage Us" noCTA type="windowWithCards">
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        These are the scenarios where operational friction becomes urgent — and where early intervention creates disproportionate value.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {scenarios.map((scenario, i) => (
          <div key={i} style={box}>
            <SectionTitle sub>{scenario.title}</SectionTitle>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "16px", flex: "1" }}>
              {scenario.description}
            </p>
            <button
              onClick={() => handleAction(scenario.action)}
              style={{ alignSelf: "flex-start", padding: "10px 20px", background: COLORS.navy, color: "white", border: "none", borderRadius: RADIUS.sm, fontFamily: FONTS.body, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0F1829"; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.navy; }}>
              {scenario.action === "scorer" ? "Run the Ops Scorer →" : scenario.action === "services" ? "View Services →" : "Book a Fit Check →"}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── SECONDARY CAPTURE ROW ───────────────────────────────────

function SecondaryCaptureRow({ contextLabel, bodyExtra }) {
  const subject = `Devonshire Ops – ${contextLabel} (request)`;
  const body = `Hi Hassan,\n\nI reviewed Devonshire Operations and would like the memo format / examples.\n\nContext:\n${bodyExtra || "- (add a sentence about the deal/portco)"}\n\nBest,\n`;

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginTop: "10px" }}>
      <a href={SAMPLE_SCORECARD_PDF} target="_blank" rel="noopener noreferrer"
        style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}>
        View sample memo format
      </a>
      <a href={mailtoHref(subject, body)}
        style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}>
        Email for examples
      </a>
    </div>
  );
}

// ─── PROOF STRIP ─────────────────────────────────────────────

function ProofStrip() {
  return (
    <Section
      title="See What the Deliverables Actually Look Like"
      primaryCTA={{ text: "Sample Ops Diligence Scorecard — IC-ready, severity-rated (PDF)", link: SAMPLE_SCORECARD_PDF }}
      secondaryCTA={{ text: "Sample 100-Day Stabilization Plan — Visibility → Control → Cadence (PDF)", link: SAMPLE_100DAY_PDF }}
      centered={true}
    >
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "12px" }}>
        These are the exact formats delivered to investment committees. See what your IC diligence memo and 100-day operating plan should look like — severity-rated, PE-impact framed, board-ready from Day 1.
      </p>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.bodyMuted, marginBottom: "0" }}>
        Samples are anonymized/fictional and provided for format demonstration only.
      </p>
      <SecondaryCaptureRow contextLabel="Ops diligence / stabilization" />
    </Section>
  );
}

// ─── EARLY CTA ───────────────────────────────────────────────

function EarlyCTA({ setPage }) {
  return (
    <Section
      primaryCTA={{ text: "Run the Ops Scorer →", action: () => setPage("scorer") }}
      secondaryCTA={{ text: "Book a Fit Check", link: CALENDLY }}
      centered={true}
      background={`${COLORS.navy}05`}
    >
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, textAlign: "center", margin: 0 }}>
        Want to see which operational gaps exist in your next deal?
      </p>
    </Section>
  );
}

// ─── OFFER CARDS ─────────────────────────────────────────────

function OfferCards({ setPage }) {
  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(260px, 100%)" };
  const boxGold = { ...box, border: `2px solid ${COLORS.gold}`, boxShadow: SHADOWS.md };
  const tag = { fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, fontWeight: 600, marginBottom: "10px" };
  const li = { marginBottom: "8px", lineHeight: 1.55 };

  return (
    <Section title="Services & Pricing (Fast Orientation)" type="windowWithCards" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "6px", maxWidth: "760px", fontStyle: "italic" }}>
        Diligence without execution is a risk report. Execution without diligence is change without a plan.
      </p>
      <p style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px", maxWidth: "760px" }}>
        Choose the track that matches your deal lifecycle. Each deliverable is designed to be <strong>decision-useful for PE: severity-rated findings, PE impact, and a pragmatic Day-1 critical path</strong>.
      </p>

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
        secondaryText="View Full Services & Details"
        secondaryAction={() => setPage("services")}
        centered={true}
        showAvailability={true}
      />
    </Section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────

function HowItWorks() {
  const timelineItems = [
    { title: "1) Baseline", meta: "Week 1", description: "We request what exists: incident history, change/release artifacts, vendor list/contracts, KPI packs, org/RACI, audit evidence folders, and escalation/on-call.", completed: true },
    { title: "2) Diagnose", meta: "Weeks 1–3", description: "You receive a decision-useful output: severity-rated findings, PE impact framing, and a prioritized Day-1 critical path.", completed: true },
    { title: "3) Value Creation Plan", meta: "At close", description: "Diligence findings roll directly into the Value Creation Plan (VCP). The VCP defines which gaps to fix, in what order, with what accountability — so Day 1 post-close has a clear operating mandate.", active: true },
    { title: "4) Execute + Govern", meta: "Days 1–100", description: "Post-close, we execute the VCP: install incident command, change control, KPI cadence, vendor governance, and board-ready reporting. The plan and the execution are the same engagement." }
  ];

  return (
    <Section title="How It Works" noCTA>
      <TimelineRail items={timelineItems} compact />
    </Section>
  );
}

// ─── CHOOSE SITUATION ────────────────────────────────────────

function ChooseSituation({ setPage }) {
  const leftSide = {
    title: "Evaluating a Target",
    description: "Decision-useful ops diligence designed for the IC: severity-rated red flags + evidence requests.",
    items: ["Risk-rated findings memo (IC-ready)", "Evidence requests + diligence questions", "Day-1 → Day-100 stabilization priorities if you close"]
  };

  const rightSide = {
    title: "First 100 Days Post-Close",
    description: "Install a governance baseline so value creation isn't blocked by instability.",
    items: ["Incident command (severity model, escalation, postmortems)", "Change governance (CAB-lite, risk classification, rollback discipline)", "KPI cadence (weekly operating reviews + board-ready pack)"],
    highlight: "Governance installed → value creation unlocked"
  };

  return (
    <Section title="Choose Your Situation" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", marginBottom: "24px" }}>
        Pick the track that matches where you are in the lifecycle. Both paths deliver <strong>risk-rated findings, PE impact framing, and a clear Day-1 critical path</strong>.
      </p>
      <SplitContrast leftSide={leftSide} rightSide={rightSide} />
      <div style={{ marginTop: "24px" }}>
        <ButtonPair
          primaryText="15-Minute Fit Check"
          secondaryText="Use the Ops Scorer"
          secondaryLink={null}
          secondaryAction={() => setPage("scorer")}
          centered={true}
        />
      </div>
    </Section>
  );
}

// ─── DEAL IMPLICATIONS ───────────────────────────────────────

function DealImplications() {
  const leftSide = {
    title: "Risks We Surface",
    description: "Operational risks that belong in the IC memo and impact value creation:",
    items: ["Operational fragility that threatens EBITDA and customer retention", "Vendor concentration risk and change-of-control clauses", "Key-person dependency and 'tribal knowledge' failure modes", "Incident/change patterns that predict outages and SLA misses"]
  };

  const rightSide = {
    title: "Value We Unlock",
    description: "Turn operational risk into a value creation advantage:",
    items: ["Severity-rated findings that inform hold pricing and deal structure", "Day-1 critical path that prevents EBITDA erosion in first 100 days", "Board-ready governance that builds credibility with LPs", "Exit-ready operational narrative that protects multiples in diligence"],
    highlight: "Operational clarity → better hold outcomes"
  };

  return (
    <Section title="Where Operational Gaps Show Up in Your Deal" noCTA
      subtitle="These are the risk vectors that compress your return — and the value creation levers that reverse them.">
      <SplitContrast leftSide={leftSide} rightSide={rightSide} />
    </Section>
  );
}

// ─── FIRST 14 DAYS ───────────────────────────────────────────

function First14Days() {
  const timelineItems = [
    {
      title: "Day 1-3: Install Incident Command", meta: "Days 1-3",
      description: "Stop new damage from accumulating. Establish ownership, severity classification, and escalation protocols.",
      items: ["Define severity levels (Critical/High/Medium/Low)", "Designate incident commanders for each severity tier", "Set escalation thresholds to management and board", "Implement postmortem discipline for Sev-1/Sev-2 incidents"],
      active: true
    },
    {
      title: "Day 4-7: Install Change Control", meta: "Days 4-7",
      description: "Prevent uncontrolled changes from creating new incidents. Establish CAB-lite process with risk classification.",
      items: ["CAB-lite charter with approval gates", "Risk classification for all changes", "Rollback discipline and testing requirements", "Change-incident correlation tracking"]
    },
    {
      title: "Day 8-14: Define KPI Baseline & Cadence", meta: "Days 8-14",
      description: "You can't improve what you don't measure. Establish baseline metrics and start weekly operating reviews.",
      items: ["Define core KPI set (MTTR, change success rate, incident volume)", "Baseline current performance", "Launch weekly operating review meetings", "Create board-ready reporting template"],
      deliverable: "Day 14: Operating baseline memo + first weekly KPI dashboard"
    }
  ];

  return (
    <Section title="The First 14 Days Post-Close" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px" }}>
        The Day-1 critical path is simple: <strong>stop new damage, then start measuring</strong>.
      </p>
      <TimelineRail items={timelineItems} />
    </Section>
  );
}

// ─── MINI CASES ──────────────────────────────────────────────

function MiniCases() {
  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(260px, 100%)" };
  const fieldLabel = { fontFamily: FONTS.body, fontSize: "0.75rem", fontWeight: 700, color: COLORS.navy, letterSpacing: "0.6px", textTransform: "uppercase", display: "block", marginBottom: "4px" };
  const fieldVal = { fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 14px 0" };
  const valueCreated = { fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0, padding: "10px 12px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` };

  return (
    <Section title="Proof in the Format PE Expects" noCTA type="windowWithCards">
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", marginBottom: "20px" }}>
        Example outcomes (anonymized). The point: <strong>find the gaps, build the Value Creation Plan, deliver measurable improvement</strong>.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={box}>
          <SectionTitle sub>Incident instability</SectionTitle>
          <span style={fieldLabel}>Gap Identified</span>
          <p style={fieldVal}>Recurring incidents with unclear ownership, no severity classification, and no postmortem discipline. Same failures repeating every 4–6 weeks.</p>
          <span style={fieldLabel}>VCP Intervention</span>
          <p style={fieldVal}>Severity model, incident command roles, escalation thresholds, mandatory postmortem cadence.</p>
          <span style={fieldLabel}>Value Created</span>
          <p style={valueCreated}>~67% incident volume reduction and ~31% MTTR improvement within the hold period. Executive time recaptured from firefighting. Board reporting shifted from reactive crisis updates to weekly structured reviews.</p>
        </div>

        <div style={box}>
          <SectionTitle sub>Change-driven outages</SectionTitle>
          <span style={fieldLabel}>Gap Identified</span>
          <p style={fieldVal}>Uncontrolled deployments correlated with production incidents. No change calendar, no risk classification, no rollback documentation.</p>
          <span style={fieldLabel}>VCP Intervention</span>
          <p style={fieldVal}>CAB-lite charter, risk classification framework, rollback discipline, change-incident correlation tracking.</p>
          <span style={fieldLabel}>Value Created</span>
          <p style={valueCreated}>~60% reduction in critical outages over 8 months. Uptime improved ~94% → 99%. Change-incident correlation visible in board reporting within 30 days of installation.</p>
        </div>

        <div style={box}>
          <SectionTitle sub>Board reporting / KPI ambiguity</SectionTitle>
          <span style={fieldLabel}>Gap Identified</span>
          <p style={fieldVal}>No defined KPIs. Board received verbal, anecdotal operational updates. No baseline, no targets, no way to demonstrate or measure improvement.</p>
          <span style={fieldLabel}>VCP Intervention</span>
          <p style={fieldVal}>KPI library + thresholds defined, weekly operating review installed, executive dashboard built, board-ready reporting pack structured.</p>
          <span style={fieldLabel}>Value Created</span>
          <p style={valueCreated}>Predictable weekly operating rhythm established. Issues surfaced proactively through cadence, not reactively through crisis. Board gained real-time visibility into operational health — direct input to exit narrative.</p>
        </div>
      </div>
    </Section>
  );
}

// ─── LEVER EXPLORER PAGE ─────────────────────────────────────

export default function LeverExplorer({ setPage }) {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [timingFilter, setTimingFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  // ── Scroll-depth sticky bar ──────────────────────────────────
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(() => {
    try { return sessionStorage.getItem("scorerBarDismissed") === "true"; } catch { return false; }
  });

  useEffect(() => {
    if (stickyDismissed) return;
    const handleScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setShowStickyBar(scrolled > 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyDismissed]);

  const handleStickyDismiss = () => {
    setShowStickyBar(false);
    setStickyDismissed(true);
    try { sessionStorage.setItem("scorerBarDismissed", "true"); } catch {}
  };

  const filtered = LEVERS.filter(l => {
    if (domainFilter !== "All" && l.domain !== domainFilter) return false;
    if (timingFilter !== "All" && l.timing !== timingFilter) return false;
    if (severityFilter !== "All" && l.severity !== severityFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.definition.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectStyle = { padding: "10px 14px", border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, background: COLORS.white, cursor: "pointer", minWidth: "160px", boxShadow: "0 1px 2px rgba(67, 97, 125, 0.05)" };

  return (
    <div className="fade-in">
      <HeroBlockWithNav setPage={setPage} />
      <MicroProofStrip />
      <TriggerScenarios setPage={setPage} />

      <div style={{ marginBottom: "28px" }}>
        <SectionTitle>20 Operational Value Creation Levers Hidden in Your Next Deal</SectionTitle>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "720px" }}>
          {LEVERS.length} operational friction points across 6 domains — with severity ratings, symptoms, and PE impact analysis. The levers show <em>what</em> is broken and <em>why</em> it matters. The remediation playbooks — the <em>how</em> — are delivered in the engagement.
        </p>
        {/* McKinsey GPMR 2026 — aging portfolio urgency stat */}
        <div style={{ marginTop: "18px", padding: "14px 18px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0`, maxWidth: "720px" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.92rem", color: COLORS.charcoal, margin: 0, lineHeight: 1.6 }}>
            <strong>16,000+ PE-backed companies are currently held 4+ years — 52% of total PE inventory, the highest on record.</strong> With median hold periods now at 6.6 years, the window for operational value creation is finite. Funds that identify and close these gaps early capture disproportionate returns.
          </p>
          <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", color: COLORS.bodyMuted, letterSpacing: "0.4px", textTransform: "uppercase", display: "block", marginTop: "6px" }}>McKinsey Global Private Markets Review 2026</span>
        </div>
      </div>

      <DomainLegend />

      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, marginBottom: "14px", fontStyle: "italic" }}>
        Filter by timing (Pre-Close vs. First 100 Days), domain, or severity. Open any lever for symptoms and PE impact analysis.
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px", alignItems: "center" }}>
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

      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, marginBottom: "18px" }}>
        Showing {filtered.length} of {LEVERS.length} levers
      </p>

      {filtered.map((lever, idx) => (
        <div key={lever.id}>
          <div style={{ background: COLORS.white, border: `1px solid ${expanded === lever.id ? COLORS.steel : COLORS.border}`, borderRadius: "6px", marginBottom: "8px", transition: "all 0.15s", cursor: "pointer" }}
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
              <div className="lever-expand" style={{ padding: "0 22px 22px 52px", borderTop: `1px solid ${COLORS.border}` }} onClick={e => e.stopPropagation()}>
                <div style={{ paddingTop: "18px" }}>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>Definition</h4>
                  <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.definition}</p>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>Symptoms</h4>
                  <ul style={{ paddingLeft: "22px", marginBottom: "18px" }}>
                    {lever.symptoms.map((s, i) => <li key={i} style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "6px" }}>{s}</li>)}
                  </ul>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>PE Impact</h4>
                  <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.peImpact}</p>
                  <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "8px" }}>What Good Looks Like</h4>
                  <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.whatGood}</p>
                  <div style={{ display: "flex", gap: "16px", paddingTop: "8px", borderTop: `1px solid ${COLORS.border}` }}>
                    <button onClick={() => setPage("scorer")} style={{ background: "none", border: "none", fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.navy, cursor: "pointer", textDecoration: "underline" }}>→ Assess your readiness</button>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, textDecoration: "underline" }}>→ 15-Minute Fit Check</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {idx === 4 && filtered.length > 5 && (
            <div style={{ margin: "12px 0 16px", padding: "20px 28px", background: COLORS.navy, borderRadius: RADIUS.md, boxShadow: "0 4px 12px rgba(67, 97, 125, 0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.offWhite, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: COLORS.gold }}>Not sure which of these apply to your deal?</strong> Run the Ops Scorer — free, 2 minutes, produces a prioritized assessment.
              </p>
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <button onClick={() => setPage("scorer")} style={{ padding: "8px 18px", background: COLORS.gold, color: COLORS.white, border: "none", borderRadius: RADIUS.sm, fontFamily: FONTS.body, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
                  Run the Ops Scorer →
                </button>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 18px", background: "transparent", color: COLORS.offWhite, border: `1px solid ${COLORS.offWhite}60`, borderRadius: RADIUS.sm, fontFamily: FONTS.body, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
                  Book a Fit Check
                </a>
              </div>
            </div>
          )}
        </div>
      ))}

      <ChooseSituation setPage={setPage} />
      <EarlyCTA setPage={setPage} />
      <OfferCards setPage={setPage} />
      <ProofStrip />
      <DealImplications />
      <MiniCases />
      <HowItWorks />
      <First14Days />
      <FAQBlock />

      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, textAlign: "center", marginBottom: "8px", fontStyle: "italic" }}>
          ~67% incident volume reduction · ~31% MTTR improvement · $2M+ annual vendor savings — representative outcomes from prior institutional operating roles
        </p>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginBottom: "20px", textAlign: "center" }}>
          Not sure where to start? Let's assess fit and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="Run the Ops Scorer →"
          primaryAction={() => setPage("scorer")}
          secondaryText="Book a Fit Check"
          secondaryLink={CALENDLY}
          centered={true}
          showAvailability={true}
        />
      </Section>

      {/* ── Scroll-depth sticky bar ── */}
      {showStickyBar && !stickyDismissed && (
        <div className="scorer-sticky-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: COLORS.navy, borderTop: `3px solid ${COLORS.gold}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", boxShadow: "0 -4px 20px rgba(20,33,61,0.25)" }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.offWhite, margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: COLORS.gold }}>Before you go —</strong> run the free Ops Scorer. Takes 2 minutes, produces a prioritized assessment.
          </p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
            <button
              onClick={() => { handleStickyDismiss(); setPage("scorer"); }}
              style={{ padding: "9px 18px", background: COLORS.gold, color: "white", border: "none", borderRadius: RADIUS.sm, fontFamily: FONTS.body, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Run the Ops Scorer →
            </button>
            <button
              onClick={handleStickyDismiss}
              aria-label="Dismiss"
              style={{ padding: "9px 13px", background: "transparent", border: `1px solid ${COLORS.offWhite}40`, borderRadius: RADIUS.sm, color: COLORS.offWhite, fontFamily: FONTS.body, fontSize: "1rem", cursor: "pointer", lineHeight: 1 }}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
