import { useState } from "react";
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
    <div style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, margin: "-40px -32px 32px", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />
      <div style={{ position: "relative", maxWidth: "720px" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
          Portfolio Operations · Pre-Close Diligence · Post-Close Stabilization
        </div>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "18px" }}>
          Operational red flags that standard diligence misses — and the governance baseline for the first 100 days.
        </h1>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "22px" }}>
          15+ years running "cannot go down" trading operations across JP Morgan, Barclays, Bank of America, and Lazard — building incident command, change governance, and KPI control towers across multi-manager platforms managing $10B+ in assets.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "26px" }}>
          {[
            "Ops Diligence Report: risk-rated findings memo for the IC (investment committee). 2–3 weeks.",
            "100-Day Stabilization Plan: incident command, change control, KPIs, vendor governance, board reporting.",
            "For PE funds, operating partners, and independent sponsors evaluating or managing portfolio companies.",
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: COLORS.gold, fontSize: "0.95rem", lineHeight: "28px", flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: SPACING.sm, flexWrap: "wrap" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", padding: "12px 28px", background: COLORS.gold, color: "white", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: RADIUS.sm, textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: "none" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; }}>
            15-Minute Fit Check
          </a>
          <button onClick={() => setPage("services")}
            style={{ display: "inline-block", padding: "12px 28px", background: "transparent", color: COLORS.gold, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: RADIUS.sm, letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: `2px solid ${COLORS.gold}` }}
            onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.gold}15`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            View Services & Pricing
          </button>
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
      title="Want the Red-Flag Memo Format?"
      primaryCTA={{ text: "View Sample Scorecard (PDF)", link: SAMPLE_SCORECARD_PDF }}
      secondaryCTA={{ text: "View 100-Day Plan (PDF)", link: SAMPLE_100DAY_PDF }}
      centered={true}
    >
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "12px" }}>
        See the exact structure of the Ops Diligence Scorecard: severity-rated findings, PE impact, and a stabilization priority matrix.
      </p>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.bodyMuted, marginBottom: "0" }}>
        Samples are anonymized/fictional and provided for format demonstration only.
      </p>
      <SecondaryCaptureRow contextLabel="Ops diligence / stabilization" />
    </Section>
  );
}

// ─── EARLY CTA ───────────────────────────────────────────────

function EarlyCTA() {
  return (
    <Section
      primaryCTA={{ text: "15-Minute Fit Check", link: CALENDLY }}
      secondaryCTA={{
        text: "Email me instead",
        link: mailtoHref("Devonshire Ops – Fit Check request", "Hi Hassan,\n\nI reviewed the operational levers and would like to discuss fit.\n\nContext:\n- Company / deal stage:\n- Primary concern:\n- Timeline:\n\nBest,\n")
      }}
      centered={true}
      background={`${COLORS.navy}05`}
    >
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, textAlign: "center", margin: 0 }}>
        Recognizing these patterns in a target or portfolio company?
      </p>
    </Section>
  );
}

// ─── OFFER CARDS ─────────────────────────────────────────────

function OfferCards({ setPage }) {
  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "260px" };
  const boxGold = { ...box, border: `2px solid ${COLORS.gold}`, boxShadow: SHADOWS.md };
  const tag = { fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, fontWeight: 600, marginBottom: "10px" };
  const li = { marginBottom: "8px", lineHeight: 1.55 };

  return (
    <Section title="Services & Pricing (Fast Orientation)" type="windowWithCards" noCTA>
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
          <SectionTitle sub>Bundle (Recommended)</SectionTitle>
          <div style={tag}>$25,000–$35,000 · diligence + 100 days</div>
          <ul style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, paddingLeft: "18px", margin: 0 }}>
            <li style={li}>Diligence findings roll straight into execution</li>
            <li style={li}>Day-1 critical path + phased stabilization plan</li>
            <li style={li}>Clear ownership + cadence for the first 100 days</li>
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
      />
    </Section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────

function HowItWorks() {
  const timelineItems = [
    { title: "1) Baseline", meta: "Week 1", description: "We request what exists: incident history, change/release artifacts, vendor list/contracts, KPI packs, org/RACI, audit evidence folders, and escalation/on-call.", completed: true },
    { title: "2) Diagnose", meta: "Weeks 1–3", description: "You receive a decision-useful output: severity-rated findings, PE impact framing, and a prioritized Day-1 critical path.", active: true },
    { title: "3) Stabilize", meta: "Day 1–100", description: "Post-close, we install the governance baseline: incident command, change control, KPI cadence, vendor governance, and board-ready reporting." }
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
    <Section title="Deal Implications We Surface" noCTA>
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
  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "260px" };

  return (
    <Section title="Proof in the Format PE Expects" noCTA type="windowWithCards">
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", marginBottom: "20px" }}>
        Example outcomes (anonymized). The point: <strong>install visibility, control, and cadence—then keep it durable</strong>.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={box}>
          <SectionTitle sub>Incident instability</SectionTitle>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 8px 0" }}><strong>Situation:</strong> Recurring incidents with unclear ownership and inconsistent escalation.</p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 8px 0" }}><strong>Delivered:</strong> Severity model, incident command roles, escalation paths, postmortem discipline.</p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}><strong>Result:</strong> Faster containment, fewer repeat incidents, clearer executive visibility.</p>
        </div>

        <div style={box}>
          <SectionTitle sub>Change-driven outages</SectionTitle>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 8px 0" }}><strong>Situation:</strong> Releases correlated with incidents; no consistent controls.</p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 8px 0" }}><strong>Delivered:</strong> CAB-lite, risk classification, rollback readiness, change-incident correlation tracking.</p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}><strong>Result:</strong> Reduced change failure rate and improved release confidence.</p>
        </div>

        <div style={box}>
          <SectionTitle sub>Board reporting / KPI ambiguity</SectionTitle>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 8px 0" }}><strong>Situation:</strong> KPIs undefined or ad hoc; board reporting inconsistent and lagging.</p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 8px 0" }}><strong>Delivered:</strong> KPI library + thresholds, weekly cadence, executive dashboard, board-ready pack structure.</p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}><strong>Result:</strong> Predictable operating rhythm and faster issue detection.</p>
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

      <div style={{ marginBottom: "28px" }}>
        <SectionTitle>20 Operational Levers PE Funds Should Check</SectionTitle>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "720px" }}>
          {LEVERS.length} operational friction points across 6 domains — with severity ratings, symptoms, and PE impact analysis. The levers show <em>what</em> is broken and <em>why</em> it matters. The remediation playbooks — the <em>how</em> — are delivered in the engagement.
        </p>
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
            <div style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "1.3rem", color: COLORS.navy, width: "20px", flexShrink: 0 }}>
                {expanded === lever.id ? "▾" : "▸"}
              </span>
              <DomainTag domain={lever.domain} />
              <span style={{ fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 500, color: COLORS.charcoal, flex: 1 }}>
                {lever.name}
              </span>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
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
                <strong style={{ color: COLORS.gold }}>Want the red-flag memo format?</strong> See exactly what the Ops Diligence Report delivers.
              </p>
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <button onClick={() => setPage("services")} style={{ padding: "8px 18px", background: "transparent", color: COLORS.offWhite, border: `1px solid ${COLORS.offWhite}60`, borderRadius: RADIUS.sm, fontFamily: FONTS.body, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
                  View Services & Pricing
                </button>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 18px", background: COLORS.gold, color: COLORS.white, border: "none", borderRadius: RADIUS.sm, fontFamily: FONTS.body, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
                  15-Minute Fit Check
                </a>
              </div>
            </div>
          )}
        </div>
      ))}

      <MicroProofStrip />
      <ChooseSituation setPage={setPage} />
      <EarlyCTA />
      <OfferCards setPage={setPage} />
      <ProofStrip />
      <DealImplications />
      <MiniCases />
      <HowItWorks />
      <First14Days />
      <FAQBlock />

      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginBottom: "20px", textAlign: "center" }}>
          Not sure where to start? Let's assess fit and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="15-Minute Fit Check"
          secondaryText="Email me instead"
          secondaryLink={mailtoHref("Devonshire Ops – Fit Check request", "Hi Hassan,\n\nI reviewed the operational levers and would like to discuss fit.\n\nContext:\n- Company / deal stage:\n- Primary concern:\n- Timeline:\n\nBest,\n")}
          centered={true}
        />
      </Section>
    </div>
  );
}
