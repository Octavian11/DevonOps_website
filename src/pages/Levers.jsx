import { useState, useEffect } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  LEVERS, DOMAINS,
} from "../constants.js";
import {
  DomainTag,
  CTAButton, SectionTitle, ButtonPair, Section,
  SplitContrast, FAQBlock,
  LeadMagnetLink, OfferCards,
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
          Your deal team handles the financials. Who's stress-testing the operations?
        </h1>
        <p className="hero-subheadline" style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "22px" }}>
          Pre-close ops diligence and 100-day post-close execution for PE funds, independent sponsors, and family offices. I find what financial DD misses — and build the plan that turns it into EBITDA improvement in 100 days.
        </p>

        <div className="hero-ctas" style={{ display: "flex", gap: SPACING.sm, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "14px 28px", background: COLORS.gold, color: "white", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: RADIUS.md, textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; }}>
              Book a 15-Min Fit Check
            </a>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: "rgba(255,255,255,0.95)", textAlign: "center" }}>
              Currently accepting 1–2 new engagements
            </span>
          </div>
          <button onClick={() => setPage("scorer")}
            style={{ display: "inline-block", padding: "12px 26px", background: "transparent", color: COLORS.gold, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: RADIUS.md, textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: `2px solid ${COLORS.gold}` }}
            onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.gold}15`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Run the Ops Scorer →
          </button>
        </div>
      </div>
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
    <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}08 0%, ${COLORS.gold}08 100%)`, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "16px 24px", marginBottom: "24px", display: "flex", gap: SPACING.lg, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
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
      action: "calendly",
      cta: "Book a Fit Check →",
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
      action: "calendly",
      cta: "Book a Fit Check →",
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
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        Three buyer types, three distinct problems. Each gets a tailored diligence depth and post-close playbook.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${seg.accentColor}`, borderRadius: RADIUS.md, padding: "20px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: RADIUS.sm, fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: seg.accentColor, background: `${seg.accentColor}15`, border: `1px solid ${seg.accentColor}30` }}>
                {seg.code}
              </span>
              <span style={{ fontFamily: FONTS.heading, fontSize: "1.2rem", fontWeight: 700, color: COLORS.navy }}>
                {seg.title}
              </span>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "14px", fontStyle: "italic" }}>
              {seg.pain}
            </p>
            <ul style={{ paddingLeft: "18px", margin: "0 0 16px 0", flex: "1" }}>
              {seg.items.map((item, j) => (
                <li key={j} style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAction(seg.action)}
              style={{ alignSelf: "flex-start", padding: "10px 20px", background: seg.action === "scorer" ? COLORS.navy : COLORS.gold, color: "white", border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
              {seg.cta}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── LEVERS TEASER SECTION ───────────────────────────────────

function LeversTeaserSection({ setPage }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <SectionTitle>20 Operational Value Creation Levers</SectionTitle>
      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "720px" }}>
        {LEVERS.length} operational friction points across 6 domains — severity-rated, PE impact framed. Browse the full interactive lever explorer on the Services page.
      </p>

      <div style={{ marginTop: "18px", padding: "14px 18px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0`, maxWidth: "720px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.92rem", color: COLORS.charcoal, margin: 0, lineHeight: 1.6 }}>
          <strong>16,000+ PE-backed companies are currently held 4+ years — 52% of total PE inventory, the highest on record.</strong> With median hold periods now at 6.6 years, the window for operational value creation is finite. Funds that identify and close these gaps early capture disproportionate returns.
        </p>
        <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", color: COLORS.bodyMuted, letterSpacing: "0.4px", textTransform: "uppercase", display: "block", marginTop: "6px" }}>McKinsey Global Private Markets Review 2026</span>
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {Object.entries(DOMAINS).map(([k]) => (
          <DomainTag key={k} domain={k} />
        ))}
      </div>

      <div style={{ marginTop: "18px" }}>
        <ButtonPair
          primaryText="Book a Fit Check"
          primaryLink={CALENDLY}
          secondaryText="Browse All 20 Levers →"
          secondaryAction={() => setPage("services")}
          secondaryLink={null}
        />
      </div>
    </div>
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

// ─── MINI CASES ──────────────────────────────────────────────

function MiniCases() {
  const box = { border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(220px, 100%)" };
  const fieldLabel = { fontFamily: FONTS.body, fontSize: "0.75rem", fontWeight: 700, color: COLORS.navy, letterSpacing: "0.6px", textTransform: "uppercase", display: "block", marginBottom: "4px" };
  const fieldVal = { fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 14px 0" };
  const valueCreated = { fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0, padding: "10px 12px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` };

  return (
    <Section title="Representative Outcomes" noCTA type="windowWithCards">
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", marginBottom: "20px" }}>
        Anonymized engagement outcomes. Gap → intervention → result.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={box}>
          <SectionTitle sub>Incident instability</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>Same failures recurring every 4–6 weeks. No severity model, no ownership, no postmortems.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>Severity model, incident command, escalation paths, postmortem cadence.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>~67% incident reduction. ~31% faster resolution. Board reporting shifted from crisis-driven to weekly structured reviews.</p>
        </div>

        <div style={box}>
          <SectionTitle sub>Change-driven outages</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>Deployments causing outages. No change calendar, no risk classification, no rollback plans.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>CAB-lite process, risk classification, rollback discipline, change-incident correlation.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>~60% fewer critical outages. Uptime: 94% → 99%. Change-incident correlation visible to the board within 30 days.</p>
        </div>

        <div style={box}>
          <SectionTitle sub>Board reporting / KPI ambiguity</SectionTitle>
          <span style={fieldLabel}>GAP</span>
          <p style={fieldVal}>No KPIs. Board updates were verbal and anecdotal. No baselines, no targets, no measurement.</p>
          <span style={fieldLabel}>FIX</span>
          <p style={fieldVal}>KPI library, weekly operating review, executive dashboard, board-ready reporting pack.</p>
          <span style={fieldLabel}>RESULT</span>
          <p style={valueCreated}>Weekly operating rhythm installed. Issues surfaced through cadence, not crisis. Board gained real-time ops visibility — direct input to exit narrative.</p>
        </div>
      </div>
    </Section>
  );
}

// ─── LEVER EXPLORER PAGE ─────────────────────────────────────

export default function LeverExplorer({ setPage }) {
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

  return (
    <div className="fade-in">
      <HeroBlockWithNav setPage={setPage} />
      <MicroProofStrip />
      <BuyerSegmentCards setPage={setPage} />
      <LeversTeaserSection setPage={setPage} />
      <ChooseSituation setPage={setPage} />
      <OfferCards setPage={setPage} />
      <MiniCases />
      <FAQBlock />

      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, textAlign: "center", fontStyle: "italic", margin: "0 auto 8px" }}>
          ~67% incident volume reduction · ~31% MTTR improvement · $2M+ annual vendor savings — representative outcomes from prior institutional operating roles
        </p>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, textAlign: "center", margin: "0 auto 20px" }}>
          Not sure where to start? Let's assess fit and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="Book a Fit Check"
          primaryLink={CALENDLY}
          secondaryText="Run the Ops Scorer →"
          secondaryLink={null}
          secondaryAction={() => setPage("scorer")}
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
              style={{ padding: "10px 20px", background: COLORS.gold, color: "white", border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Run the Ops Scorer →
            </button>
            <button
              onClick={handleStickyDismiss}
              aria-label="Dismiss"
              style={{ padding: "10px 14px", background: "transparent", border: `1px solid ${COLORS.offWhite}40`, borderRadius: RADIUS.md, color: COLORS.offWhite, fontFamily: FONTS.body, fontSize: "1rem", cursor: "pointer", lineHeight: 1 }}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
