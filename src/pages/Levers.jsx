import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  LEVERS, DOMAINS,
} from "../constants.js";
import {
  DomainTag, SectionTitle, Section,
  LeadMagnetLink, TestimonialBlock,
} from "../components.jsx";

// ─── HERO BLOCK WITH NAV ─────────────────────────────────────

function HeroBlockWithNav({ setPage }) {
  return (
    <div className="hero-block" style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, marginTop: "-40px", marginBottom: "0", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />
      <div style={{ position: "relative", maxWidth: "920px" }}>
        <div className="hero-category">
          Ops Diligence · Value Creation Plans · Post-Close Governance
        </div>
        <h1 className="hero-headline" style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 400, color: "white", lineHeight: 1.2, marginBottom: "18px" }}>
          Your deal team handles the financials. Who's stress-testing the operations?
        </h1>
        <p className="hero-subheadline" style={{ fontFamily: FONTS.body, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "22px" }}>
          The operating layer beneath the financials is where value creation plans live or die. I surface the ops risks that kill them — typically between LOI and Day 100 — and fix them before they compound. Pre-close operational diligence and 100-day post-close execution for PE-backed deals.
        </p>

        <div className="hero-ctas" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: COLORS.gold, color: "#FFFFFF", fontFamily: "'Arial', sans-serif", fontSize: "17px", fontWeight: 600, border: "none", borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#A07D2E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; }}>
              Book a Fit Check (15 min)
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

// ─── HERO CREDIBILITY STRIP ──────────────────────────────────

function HeroCredStrip() {
  const metrics = [
    { value: "~50%", label: "incident reduction" },
    { value: "$2M+", label: "annual savings" },
    { value: "94→99%", label: "uptime" },
  ];
  return (
    <div style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.border}`, padding: "12px 32px", width: "100vw", marginLeft: "calc(-50vw + 50%)", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, color: COLORS.steel, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Background</span>
        {["JPMorgan", "Barclays", "Lazard", "Bank of America", "Columbia MBA"].map((name, i) => (
          <span key={i} style={{ fontFamily: FONTS.body, fontSize: "0.78rem", fontWeight: 600, color: COLORS.charcoal, opacity: 0.65, whiteSpace: "nowrap" }}>{name}</span>
        ))}
      </div>
      <div style={{ width: "1px", height: "28px", background: COLORS.border, flexShrink: 0 }} />
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
            <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: "0.95rem", color: COLORS.gold }}>{m.value}</span>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", color: COLORS.steel }}>{m.label}</span>
          </div>
        ))}
      </div>
      <div style={{ width: "1px", height: "28px", background: COLORS.border, flexShrink: 0 }} />
      <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel }}>Pressure-tested in a <strong style={{ color: COLORS.charcoal }}>$10B+ platform</strong></span>
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
      timing: "Most relevant: LOI through close",
      items: [
        "IC-credible ops findings without Big 4 costs",
        "Evidence the ops won't blow up in Year 1",
        "Day-1 critical path if you close",
      ],
      proof: "I kept a $10B platform at zero critical outages for 18 straight months. I install the same governance playbook for your deal — scoped for a smaller team and a tighter timeline.",
      action: "scorer",
      cta: "Score Your Deal →",
      accentColor: COLORS.steel,
    },
    {
      code: "PE",
      title: "LMM PE Funds",
      pain: "Your portco's ops team is three people and a Slack channel. Post-close stabilization risk is one of the biggest EBITDA threats in Year 1.",
      timing: "Most visible in the first 90 days post-close",
      items: [
        "100-day governance installation from Day 1",
        "Board-ready ops reporting LPs can trust",
        "IC memo — severity-rated, PE impact framed",
      ],
      proof: ">$2M in annual savings from a $40M vendor program in under 6 months. I find the same gaps in portfolio companies — and close them in 100 days with a structured plan, not a slide deck.",
      action: "calendly",
      cta: "Book a Fit Check (15 min)",
      accentColor: COLORS.navy,
    },
    {
      code: "FO",
      title: "Family Offices",
      pain: "Longer holds amplify operational drift. Buying from founders means zero institutional process — and no specialist ops bench.",
      timing: "Most relevant: mid-hold without institutional ops in place",
      items: [
        "The Control Tower: ongoing operational oversight with real visibility into what's actually happening",
        "Governance that scales without adding headcount",
        "Vendor controls and compliance cadence built for long holds",
      ],
      proof: "I was the operator before I was the advisor — incident command, vendor governance, KPI cadence at a $10B platform.",
      action: "calendly",
      cta: "Book a Fit Check (15 min)",
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
        Three buyer types, three distinct risk profiles — each gets a tailored diligence depth and post-close playbook.
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
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "10px", fontStyle: "italic" }}>
              {seg.pain}
            </p>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.82rem", color: COLORS.steel, fontStyle: "italic", marginBottom: "10px" }}>
              {seg.timing}
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
        {LEVERS.length} operational friction points across 6 domains.
      </p>
      <p style={{ fontFamily: FONTS.body, marginTop: "10px", maxWidth: "960px" }}>
        <a href="#" onClick={(e) => { e.preventDefault(); setPage("services"); setTimeout(() => document.getElementById("levers")?.scrollIntoView({ behavior: "smooth" }), 120); }} style={{ color: COLORS.gold, textDecoration: "underline", fontWeight: 600 }}>
          See which ones are hiding in your deal →
        </a>
      </p>

      <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "12px" }}>
        {Object.entries(DOMAINS).map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: "10px", alignItems: "flex-start", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "12px 14px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: v.color, flexShrink: 0, marginTop: "6px" }} />
            <div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: COLORS.navy }}>{v.name}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted, lineHeight: 1.45 }}>{v.desc}</div>
            </div>
          </div>
        ))}
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
      title: "No KPI cadence → board flying blind",
      what: "Six months post-close, board updates are still verbal and anecdotal. No baselines, no targets, no operating rhythm. Exit prep begins with no operational track record to show.",
      consequence: "Multiple compression at exit. Buyer diligence surfaces what the seller should have already fixed — and prices it in.",
    },
  ];

  return (
    <Section title="The Cost of Not Acting" noCTA variant="tinted">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "32px" }}>
        Operational gaps don't stay static under PE ownership — leverage amplifies friction, and these issues typically surface in the first 60–90 days post-close, not during diligence.
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
              <p style={{ fontFamily: FONTS.body, fontSize: "0.92rem", color: COLORS.charcoal, lineHeight: 1.55, margin: 0 }}><strong>{s.consequence}</strong></p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: FONTS.body, color: COLORS.bodyMuted, fontStyle: "italic", marginTop: "20px", maxWidth: "700px" }}>
        These issues don't come from bad management. They come from missing operating infrastructure.
      </p>
    </Section>
  );
}

// ─── COMPACT ABOUT BIO ───────────────────────────────────────

function CompactAboutBio({ setPage }) {
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
            15+ years platform ops · JPMorgan · Barclays · Bank of America · Lazard<br />Columbia MBA '26
          </div>
          <div className="credential-logos">
            <span className="credential-label">Institutional background</span>
            {["JPMorgan", "Barclays", "Lazard", "Bank of America", "Columbia MBA"].map((name, i) => (
              <span key={i} style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, color: COLORS.charcoal, opacity: 0.65 }}>{name}</span>
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

// ─── OFFER TEASER ────────────────────────────────────────────

function OfferTeaser({ setPage }) {
  const offers = [
    { label: "Pre-Close", name: "Ops Diligence Snapshot", price: "from $7,500", highlight: false },
    { label: "Recommended", name: "Diligence + 100-Day Operating Playbook Bundle", price: "$30,000–40,000", highlight: true },
    { label: "Post-Close", name: "Embedded Operating Sprint", price: "$15,000–30,000", highlight: false },
    { label: "Ongoing Hold", name: "Post-Close Control Tower", price: "$7,500–10,000+/mo", highlight: false },
  ];
  return (
    <Section title="Engagement Options" noCTA>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        Four engagement structures — from a focused pre-close diagnostic to an ongoing post-close retainer.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "680px", marginBottom: "24px" }}>
        {offers.map((o, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 175px", alignItems: "center", gap: "12px", padding: "10px 14px", borderLeft: `3px solid ${o.highlight ? COLORS.gold : COLORS.navy}`, background: `${COLORS.navy}06`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` }}>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: o.highlight ? COLORS.gold : COLORS.navy, lineHeight: 1.3 }}>{o.label}</span>
            <span style={{ fontFamily: FONTS.body, fontWeight: 600, color: COLORS.navy, lineHeight: 1.4 }}>{o.name}</span>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.navy, fontWeight: 600, whiteSpace: "nowrap" }}>{o.price}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "44px", padding: "0 22px", background: COLORS.gold, color: "#fff", fontFamily: "'Arial', sans-serif", fontSize: "0.95rem", fontWeight: 600, borderRadius: RADIUS.md, textDecoration: "none", whiteSpace: "nowrap" }}>
          Book a Fit Check (15 min)
        </a>
        <button onClick={() => { setPage("services"); setTimeout(() => document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" }), 120); }}
          style={{ background: "none", border: "none", padding: 0, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
          View full engagement details →
        </button>
      </div>
    </Section>
  );
}

// ─── LEVER EXPLORER PAGE ─────────────────────────────────────

export default function LeverExplorer({ setPage }) {

  return (
    <div className="fade-in">
      <HeroBlockWithNav setPage={setPage} />
      <HeroCredStrip />
      <BuyerSegmentCards setPage={setPage} />
      <LeversTeaserSection setPage={setPage} />
      <div className="mckinsey-quote">
        <p>
          <strong>16,000+ PE-backed companies are currently held 4+ years — 52% of total PE inventory, the highest on record.</strong> With median hold periods now at 6.6 years, the window for operational value creation is finite.
        </p>
        <small>McKinsey Global Private Markets Review 2026</small>
      </div>
      <CostOfInaction />
      <TestimonialBlock />
      <CompactAboutBio setPage={setPage} />
      <OfferTeaser setPage={setPage} />
    </div>
  );
}
