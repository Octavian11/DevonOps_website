import { useState } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  LEVERS, DOMAINS,
} from "../constants.js";
import {
  DomainTag,
  CTAButton, SectionTitle, ButtonPair, Section,
  SplitContrast, FAQBlock,
  LeadMagnetLink, OfferCards, TestimonialBlock,
} from "../components.jsx";

// ─── HERO BLOCK WITH NAV ─────────────────────────────────────

function HeroBlockWithNav({ setPage }) {
  return (
    <div className="hero-block" style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, marginTop: "-40px", marginBottom: "0", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />
      <div style={{ position: "relative", maxWidth: "920px" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
          Ops Diligence · Value Creation Plans · Post-Close Governance
        </div>
        <h1 className="hero-headline" style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "18px" }}>
          Your deal team handles the financials. Who's stress-testing the operations?
        </h1>
        <p className="hero-subheadline" style={{ fontFamily: FONTS.body, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "22px" }}>
          Pre-close ops diligence and 100-day post-close execution for PE funds, independent sponsors, and family offices. I find what financial DD misses — and build the plan that turns it into EBITDA improvement in 100 days.
        </p>

        <div className="hero-ctas" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: COLORS.gold, color: "#FFFFFF", fontFamily: "'Arial', sans-serif", fontSize: "17px", fontWeight: 600, border: "none", borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; }}>
              Book a Fit Check
            </a>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: "rgba(255,255,255,0.95)", textAlign: "center" }}>
              Currently accepting 1–2 new engagements
            </span>
          </div>
          <button onClick={() => setPage("scorer")}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: "transparent", color: COLORS.gold, fontFamily: "'Arial', sans-serif", fontSize: "17px", fontWeight: 600, border: `1.5px solid ${COLORS.gold}`, borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.gold}15`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Score Your Deal →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PROOF METRICS STRIP (Item 04) ──────────────────────────

function ProofMetricsStrip() {
  const metrics = [
    { value: "~67%", label: "incident reduction" },
    { value: "$2M+", label: "annual savings" },
    { value: "94→99%", label: "uptime" },
  ];
  return (
    <div className="proof-metrics-strip">
      {metrics.map((m, i) => (
        <div key={i} className="proof-metric">
          <div className="proof-metric-number">{m.value}</div>
          <div className="proof-metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── MICRO PROOF STRIP ───────────────────────────────────────

function MicroProofStrip() {
  const proofItems = [
    { icon: "✓", text: "Severity-rated findings", pdf: SAMPLE_SCORECARD_PDF },
    { icon: "✓", text: "IC-ready memo format", pdf: SAMPLE_SCORECARD_PDF },
    { icon: "✓", text: "100-day stabilization plan", pdf: SAMPLE_100DAY_PDF },
  ];

  return (
    <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}08 0%, ${COLORS.gold}08 100%)`, padding: "16px 32px", width: "100vw", marginLeft: "calc(-50vw + 50%)", marginBottom: "24px", display: "flex", gap: SPACING.lg, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
      {proofItems.map((item, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: COLORS.gold, fontSize: "1.1rem" }}>{item.icon}</span>
          <LeadMagnetLink pdfUrl={item.pdf} variant="micro-proof">
            {item.text}
          </LeadMagnetLink>
        </div>
      ))}
    </div>
  );
}

// ─── BUYER SEGMENT CARDS ─────────────────────────────────────

function BuyerSegmentCards({ setPage }) {
  const segments = [
    {
      code: "IS",
      title: "Independent Sponsors",
      pain: "Smaller deal teams mean no dedicated ops function. Diligence gaps surface post-close — after price is locked.",
      items: [
        "IC-credible ops findings without Big 4 cost",
        "LP-ready evidence that you stress-tested operations",
        "Day-1 critical path if you close",
      ],
      proof: "Zero critical outages for 18 straight months at a $10B fund — same playbook, faster install for your deal.",
      action: "scorer",
      cta: "Score Your Deal →",
      accentColor: COLORS.steel,
    },
    {
      code: "PE",
      title: "LMM PE Funds",
      pain: "Portfolio companies rarely have institutional ops infrastructure. Post-close stabilization risk is the #1 EBITDA threat in Year 1.",
      items: [
        "100-day governance installation from Day 1",
        "Board-ready ops reporting LPs can trust",
        "IC memo — severity-rated, PE impact framed",
      ],
      proof: ">$2M in annual savings from a $40M vendor program in under 6 months. Same gaps exist at portfolio scale — I find them in 100 days.",
      action: "calendly",
      cta: "Book a Fit Check",
      accentColor: COLORS.navy,
    },
    {
      code: "FO",
      title: "Family Offices",
      pain: "Longer holds amplify operational drift. Buying from founders means zero institutional process — and no specialist ops bench.",
      items: [
        "Ongoing Control Tower — visibility into what's actually happening",
        "Governance that scales without adding headcount",
        "Vendor controls and compliance cadence built for long holds",
      ],
      proof: "I was the operator before I was the advisor — incident command, vendor governance, KPI cadence at a $10B platform.",
      action: "calendly",
      cta: "Book a Fit Check",
      accentColor: COLORS.gold,
    },
  ];

  const handleAction = (action) => {
    if (action === "scorer") {
      setPage("scorer");
    } else {
      window.open(CALENDLY, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Section title="Who This Is Built For" noCTA type="windowWithCards">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        Three buyer types, three distinct problems. Each gets a tailored diligence depth and post-close playbook.
      </p>
      <div className="buyer-cards-wrapper" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap" }}>
        {segments.map((seg, i) => (
          <div key={i} className="buyer-card" style={{ border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${seg.accentColor}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: RADIUS.sm, fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: seg.accentColor, background: `${seg.accentColor}15`, border: `1px solid ${seg.accentColor}30` }}>
                {seg.code}
              </span>
              <span style={{ fontFamily: FONTS.heading, fontSize: "1.2rem", fontWeight: 700, color: COLORS.navy }}>
                {seg.title}
              </span>
            </div>
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "14px", fontStyle: "italic" }}>
              {seg.pain}
            </p>
            <ul style={{ paddingLeft: "18px", margin: "0 0 14px 0" }}>
              {seg.items.map((item, j) => (
                <li key={j} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="proof-quote" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.55, margin: "0 0 16px", padding: "10px 12px", background: `${COLORS.navy}05`, borderRadius: RADIUS.sm, borderLeft: `2px solid ${seg.accentColor}` }}>
              {seg.proof}
            </p>
            <div style={{ marginTop: "auto", paddingTop: "16px" }}>
              {seg.action === "scorer" ? (
                <button className="card-text-link" onClick={() => setPage("scorer")}>
                  {seg.cta}
                </button>
              ) : (
                <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  {seg.cta} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── LEVERS TEASER SECTION ───────────────────────────────────

function LeversTeaserSection({ setPage }) {
  return (
    <Section noCTA variant="tinted">
      <SectionTitle>20 Operational Value Creation Levers</SectionTitle>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "960px" }}>
        {LEVERS.length} operational friction points across 6 domains — severity-rated, PE impact framed. Browse the full interactive lever explorer on the{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); setPage("services"); }} style={{ color: COLORS.gold, textDecoration: "underline", fontWeight: 600 }}>Services page</a>.
      </p>

      <div className="domain-pills-row" style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {Object.entries(DOMAINS).map(([k]) => (
          <DomainTag key={k} domain={k} />
        ))}
      </div>

      <div style={{ padding: "12px 16px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.md} ${RADIUS.md} 0`, maxWidth: "960px", marginTop: "24px" }}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, margin: 0, lineHeight: 1.6 }}>
          <strong>16,000+ PE-backed companies are currently held 4+ years — 52% of total PE inventory, the highest on record.</strong> With median hold periods now at 6.6 years, the window for operational value creation is finite. Funds that identify and close these gaps early capture disproportionate returns.
        </p>
        <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", color: COLORS.bodyMuted, letterSpacing: "0.4px", textTransform: "uppercase", display: "block", marginTop: "6px" }}>McKinsey Global Private Markets Review 2026</span>
      </div>
    </Section>
  );
}

// ─── COST OF INACTION ────────────────────────────────────────

function CostOfInaction() {
  const scenarios = [
    {
      title: "No incident governance post-close",
      what: "A production failure in month 2 has no severity classification, no escalation path, and no owner. Resolution takes 3 days. Board emergency call. SLA breach letter follows.",
      consequence: "EBITDA drag from rework and churn. LP questions about management quality — in month 2 of the hold.",
    },
    {
      title: "No change control → value creation stalls",
      what: "40% of incidents trace to recent deployments. Releases freeze as the team tries to stabilize. Every VCP initiative requiring a technology change gets deferred.",
      consequence: "Value creation execution delayed 60–90 days. The operational narrative that supports your exit thesis doesn't exist yet.",
    },
    {
      title: "No KPI cadence → board flying blind",
      what: "Six months post-close, board updates are still verbal and anecdotal. No baselines, no targets, no operating rhythm. Exit prep begins with no operational track record to show.",
      consequence: "Multiple risk at exit. Buyer diligence surfaces what the seller should have already fixed — and prices it in.",
    },
  ];

  return (
    <Section title="The Cost of Not Acting" noCTA variant="tinted">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "32px" }}>
        Operational gaps don't stay static under PE ownership. Leverage amplifies friction. These are the scenarios that play out when diligence misses them — and post-close stabilization doesn't happen.
      </p>
      <div className="cost-cards-grid" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap" }}>
        {scenarios.map((s, i) => (
          <div key={i} className="cost-card" style={{ border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.costRed}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, flex: "1 1 260px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
              <span style={{ color: COLORS.critical, fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>⚠</span>
              <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy }}>
                {s.title}
              </div>
            </div>
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, margin: 0, flex: 1 }}>
              {s.what}
            </p>
            <div className="pe-consequence" style={{ padding: "10px 12px", background: `${COLORS.navy}05`, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.sm }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, color: COLORS.critical, letterSpacing: "0.7px", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>PE Consequence</span>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.92rem", color: COLORS.charcoal, lineHeight: 1.55, margin: 0 }}>{s.consequence}</p>
            </div>
          </div>
        ))}
      </div>
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
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "24px" }}>
        Pick the track that matches where you are in the lifecycle. Both paths deliver <strong>risk-rated findings, PE impact framing, and a clear Day-1 critical path</strong>.
      </p>
      <div className="path-cards-grid" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap" }}>
        <div className="path-card" style={{ flex: "1 1 280px", minWidth: "min(260px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{leftSide.title}</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{leftSide.description}</p>
          <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            {leftSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
            ))}
          </ul>
          <div style={{ marginTop: "auto", paddingTop: "16px" }}>
            <button className="card-text-link" onClick={() => setPage("scorer")}>
              Score Your Deal →
            </button>
          </div>
        </div>
        <div className="path-card" style={{ flex: "1 1 280px", minWidth: "min(260px, 100%)", border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.navy}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "10px" }}>{rightSide.title}</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>{rightSide.description}</p>
          <ul style={{ paddingLeft: "18px", margin: 0, flexGrow: 1 }}>
            {rightSide.items.map((item, i) => (
              <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>{item}</li>
            ))}
          </ul>
          <div style={{ marginTop: "auto", paddingTop: "16px" }}>
            <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a Fit Check →
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── MINI CASES ──────────────────────────────────────────────

function MiniCases() {
  const [moreExpanded, setMoreExpanded] = useState(false);
  const box = { border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.gold}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column" };
  const fieldLabel = { fontFamily: FONTS.body, fontSize: "10px", fontWeight: 700, color: COLORS.navy, letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "4px" };
  const fieldVal = { fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 14px 0" };
  const valueCreated = { fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, margin: 0, padding: "14px 16px", background: "#FFFBF0", borderLeft: `3px solid #C8952E`, borderRadius: "0 6px 6px 0" };

  return (
    <Section title="Representative Outcomes" noCTA variant="tinted">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "32px" }}>
        Anonymized engagement outcomes from $10B+ institutional operating roles. Gap → intervention → result.
      </p>

      <div className="outcomes-visible">
        <div className="outcome-card" style={box}>
          <SectionTitle sub>Incident instability</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>Same failures recurring every 4–6 weeks. No severity model, no ownership, no postmortems.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>Severity model, incident command, escalation paths, postmortem cadence.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>~67% incident reduction. ~31% faster resolution. Board reporting shifted from crisis-driven to weekly structured reviews.</p>
        </div>

        <div className="outcome-card" style={box}>
          <SectionTitle sub>Change-driven outages</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>Deployments causing outages. No change calendar, no risk classification, no rollback plans.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>CAB-lite process, risk classification, rollback discipline, change-incident correlation.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>~60% fewer critical outages. Uptime: 94% → 99%. Change-incident correlation visible to the board within 30 days.</p>
        </div>
      </div>

      <div className={`outcomes-hidden${moreExpanded ? " expanded" : ""}`}>
        <div className="outcome-card" style={box}>
          <SectionTitle sub>Board reporting / KPI ambiguity</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>No KPIs. Board updates were verbal and anecdotal. No baselines, no targets, no measurement.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>KPI library, weekly operating review, executive dashboard, board-ready reporting pack.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>Weekly operating rhythm installed. Issues surfaced through cadence, not crisis. Board gained real-time ops visibility — direct input to exit narrative.</p>
        </div>

        <div className="outcome-card" style={box}>
          <SectionTitle sub>Vendor concentration risk</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>Single vendor covering 80%+ of critical infrastructure. Auto-renewing contracts, no SLA tracking, change-of-control clause missed in diligence.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>Full vendor mapping, contract consolidation, renewal calendar, SLA monitoring, concentration reduction plan.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>$2M+ annual savings via renegotiation. Concentration reduced: 1 vendor → 3. Exit plan documented for top 5 vendors — turned a diligence liability into a hold narrative.</p>
        </div>
      </div>

      <button
        onClick={() => setMoreExpanded(!moreExpanded)}
        style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "8px 16px", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, fontWeight: 600, cursor: "pointer", marginTop: "16px" }}>
        {moreExpanded ? "Hide ▾" : "Show 2 more outcomes ▸"}
      </button>
    </Section>
  );
}

// ─── COMPACT ABOUT BIO ───────────────────────────────────────

function CompactAboutBio({ setPage }) {
  const metrics = [
    { value: "~67%", label: "incident reduction" },
    { value: "$2M+", label: "annual savings" },
    { value: "94→99%", label: "uptime" },
  ];

  return (
    <Section noCTA background={`${COLORS.navy}04`}>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <img
          src="/images/hassan-tariq-headshot.jpg"
          alt="Hassan Tariq — Founder, Devonshire Operations"
          width="80" height="80"
          loading="lazy"
          className="bio-headshot"
        />
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.2rem", fontWeight: 700, color: COLORS.navy, marginBottom: "4px" }}>Hassan Tariq</div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.steel, lineHeight: 1.5, marginBottom: "14px" }}>
            15+ years platform ops · JPMorgan · Barclays · Bank of America · Lazard<br />Columbia Executive MBA '26
          </div>
          <div className="credential-logos">
            <span className="credential-label">Institutional background</span>
            <img src="/images/logo-jpmorgan.svg" alt="JPMorgan" height="18" loading="lazy" />
            <img src="/images/logo-barclays.svg" alt="Barclays" height="18" loading="lazy" />
            <img src="/images/logo-bofa.svg" alt="Bank of America" height="18" loading="lazy" />
            <img src="/images/logo-lazard.svg" alt="Lazard" height="18" loading="lazy" />
            <img src="/images/logo-columbia.svg" alt="Columbia Business School" height="18" loading="lazy" />
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "16px" }}>
            {metrics.map((m, i) => (
              <div key={i}>
                <div style={{ fontFamily: FONTS.body, fontSize: "1.1rem", fontWeight: 700, color: COLORS.gold }}>{m.value}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.78rem", color: COLORS.steel }}>{m.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setPage("about")}
            style={{ background: "none", border: "none", padding: 0, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Read full credentials →
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── ENDORSEMENT QUOTE (Item 07) ────────────────────────────

function EndorsementQuote() {
  return (
    <div className="endorsement-section">
      <div className="endorsement-container">
        <div className="endorsement-quote-mark">"</div>
        <blockquote className="endorsement-text">
          Hassan brings a rare combination of institutional-grade operational rigor and the practical urgency of someone who has actually run the platform during a crisis.
        </blockquote>
        <div className="endorsement-attribution">
          <div>
            <div className="endorser-name">Senior Director, Platform Operations</div>
            <div className="endorser-title">Multi-Strategy Hedge Fund, ~$10B AUM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LEVER EXPLORER PAGE ─────────────────────────────────────

export default function LeverExplorer({ setPage }) {

  return (
    <div className="fade-in">
      <HeroBlockWithNav setPage={setPage} />
      <MicroProofStrip />
      <ProofMetricsStrip />
      <BuyerSegmentCards setPage={setPage} />
      <LeversTeaserSection setPage={setPage} />
      <CostOfInaction />
      <ChooseSituation setPage={setPage} />
      <OfferCards setPage={setPage} />
      <MiniCases />
      <CompactAboutBio setPage={setPage} />
      <TestimonialBlock />
      <EndorsementQuote />
      <FAQBlock />

      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, textAlign: "center", fontStyle: "italic", margin: "0 auto 8px" }}>
          ~67% incident volume reduction · ~31% MTTR improvement · $2M+ annual vendor savings — representative outcomes from prior institutional operating roles
        </p>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, textAlign: "center", margin: "0 auto 20px" }}>
          Not sure where to start? Let's assess fit and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="Book a Fit Check"
          primaryLink={CALENDLY}
          secondaryText="Score Your Deal →"
          secondaryLink={null}
          secondaryAction={() => setPage("scorer")}
          centered={true}
          showAvailability={true}
        />
      </Section>

    </div>
  );
}
