import {
  COLORS, FONTS, SHADOWS, RADIUS,
  CALENDLY,
  LEVERS, DOMAINS,
} from "../constants.js";
import { OFFERS } from "../offerArchitecture.js";
import { track } from "@vercel/analytics/react";
import { SectionTitle, Section } from "../components.jsx";

// ─── HERO BLOCK WITH NAV ─────────────────────────────────────

function HeroBlockWithNav({ setPage }) {
  return (
    <div className="hero-block" style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, marginTop: "-40px", marginBottom: "0", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />
      <div className="hero-layout">
        <div className="hero-copy">
        <div className="hero-category">
          Operational Diligence · Day-1 Readiness · Post-Close Execution
        </div>
        <h1 className="hero-headline" style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 400, color: "white", lineHeight: 1.2, marginBottom: "18px" }}>
          Your deal team handles the financials. <em>Who's stress-testing the operations?</em>
        </h1>
        <p className="hero-subheadline" style={{ fontFamily: FONTS.body, color: "rgba(255,255,255,0.94)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "600px" }}>
          Financial diligence shows what the business earned. I test whether the operating model can deliver the investment thesis—then convert the evidence into an IC-ready risk view, pre-close priorities, and an owned 100-day plan.
        </p>

        <div className="hero-ctas" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("hero_fit_check")}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: COLORS.gold, color: "#FFFFFF", fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, border: "none", borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#571825"; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; }}>
              Book a Fit Check (15 min)
            </a>
          </div>
          <a className="hero-secondary" href="/pe/scorer" onClick={(e) => { track("hero_score_deal"); e.preventDefault(); setPage("scorer"); }}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: "transparent", color: COLORS.goldOnDark, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, border: `1.5px solid ${COLORS.goldOnDark}`, borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${COLORS.goldOnDark}15`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            Score Your Deal →
          </a>
        </div>
        <div className="hero-availability"><span />Currently accepting 1–2 new engagements</div>
        </div>
        <div className="hero-visual-panel">
          <div className="hero-photo-slice" aria-hidden="true" />
          <div className="hero-chart-card">
            <div className="hero-chart-label">The Window Where Value Is Won or Lost</div>
            <h3>LOI → Close → Day 100</h3>
            <svg viewBox="0 0 520 226" role="img" aria-label="Operational risk from LOI through Day 100">
              <title>Operational risk from LOI through Day 100</title>
              <desc>Two lines compare operational risk surfaced at LOI and governed down by Day 100 with risk left unexamined and compounding under new ownership.</desc>
              <defs><linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6E1F2E" stopOpacity=".2"/><stop offset="1" stopColor="#6E1F2E" stopOpacity="0"/></linearGradient></defs>
              <line x1="44" y1="28" x2="44" y2="196" stroke="#D7D7D5"/><line x1="44" y1="196" x2="496" y2="196" stroke="#BFC0C1"/>
              <line x1="44" y1="72" x2="496" y2="72" stroke="#E7E7E5"/><line x1="44" y1="134" x2="496" y2="134" stroke="#E7E7E5"/>
              <text x="24" y="120" transform="rotate(-90 24 120)" textAnchor="middle">OPERATIONAL RISK</text>
              <path d="M44 178 C150 169 250 145 326 98 C390 58 445 35 494 24 L494 196 L44 196Z" fill="url(#riskFill)"/>
              <path d="M44 178 C150 169 250 145 326 98 C390 58 445 35 494 24" fill="none" stroke="#6E1F2E" strokeWidth="2.5"/>
              <path d="M44 178 C145 167 226 140 300 142 C370 143 432 158 494 166" fill="none" stroke="#212226" strokeWidth="2.4"/>
              <rect x="87" y="169" width="9" height="9" transform="rotate(45 91.5 173.5)" fill="#212226"/><circle cx="414" cy="153" r="5" fill="#212226"/>
              <g className="chart-axis"><text x="92" y="220" textAnchor="middle">LOI</text><text x="260" y="220" textAnchor="middle">CLOSE</text><text x="414" y="220" textAnchor="middle">DAY 100</text></g>
            </svg>
            <div className="hero-chart-legend" aria-label="Chart legend">
              <span><i className="legend-governed" aria-hidden="true"/>Surfaced early; governed down</span>
              <span><i className="legend-unexamined" aria-hidden="true"/>Left unexamined; compounds</span>
            </div>
            <p>Built for the window from LOI through close and the first 30 days afterward — when operating risks become owned problems. The earlier the diagnosis, the cheaper the fix.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonaIcon({ code }) {
  if (code === "IS") return <svg className="persona-icon" viewBox="0 0 46 46" fill="none" aria-hidden="true" focusable="false"><path d="M23 6L28 20 23 40 18 20Z" stroke="currentColor" strokeWidth="1.7"/><circle cx="23" cy="23" r="2.6" fill="#6E1F2E"/><path d="M23 2v5M23 39v5M2 23h5M39 23h5" stroke="#6E1F2E" strokeWidth="1.5"/></svg>;
  if (code === "PE") return <svg className="persona-icon" viewBox="0 0 46 46" fill="none" aria-hidden="true" focusable="false"><path d="M9 34V19M18 34V11M27 34V22M36 34V7" stroke="currentColor" strokeWidth="1.9"/><path d="M6 40h34" stroke="#6E1F2E" strokeWidth="1.7"/></svg>;
  return <svg className="persona-icon" viewBox="0 0 46 46" fill="none" aria-hidden="true" focusable="false"><path d="M23 6L40 14v2H6v-2Z" stroke="currentColor" strokeWidth="1.6"/><path d="M11 20v13M19 20v13M27 20v13M35 20v13" stroke="currentColor" strokeWidth="1.7"/><path d="M7 37h32" stroke="#6E1F2E" strokeWidth="1.7"/></svg>;
}

function DomainIcon({ code }) {
  const paths = {
    IM: <><rect x="6" y="6" width="28" height="28"/><path d="M13 20l5 5 9-11"/></>,
    CG: <><circle cx="20" cy="20" r="14"/><path d="M20 12v8l6 4"/></>,
    VP: <><path d="M8 28V14l12-6 12 6v14"/><path d="M14 30h12M20 16v14"/></>,
    AC: <><path d="M20 6l11 5v8c0 8-5 13-11 15-6-2-11-7-11-15v-8z"/><path d="M15 20l4 4 7-8"/></>,
    KO: <><path d="M8 30l8-9 6 5 10-13"/><path d="M8 34h24"/></>,
    OP: <><circle cx="14" cy="14" r="5"/><circle cx="28" cy="24" r="5"/><path d="M14 19v6a5 5 0 005 5h4"/></>,
  };
  return <svg className="domain-line-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">{paths[code]}</svg>;
}

// ─── HERO CREDIBILITY STRIP ──────────────────────────────────

function HeroCredStrip() {
  const metrics = [
    { value: "15+", label: "years in institutional platform operations" },
    { value: "1,500+", label: "companies screened through a buyer's lens" },
    { value: "100+", label: "acquisition targets reviewed" },
    { value: "$2M+", label: "annual vendor savings delivered" },
    { value: "−50%", label: "critical incident reduction" },
  ];
  return (
    <div className="proof-band">
      <div className="proof-band-grid">
        {metrics.map((m, i) => (
          <div className="proof-band-item" key={i}>
            <span>{m.value}</span><p>{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BUYER SEGMENT CARDS ─────────────────────────────────────

function BuyerSegmentCards({ setPage }) {
  const segments = [
    {
      code: "IS",
      title: "Independent Sponsors",
      pain: "A lean deal team needs a decision-useful operating view before price, terms, and ownership plans are locked.",
      timing: "Most relevant: LOI through close",
      items: [
        "Material execution risks, evidenced",
        "Day-1 priorities if the deal closes",
        "Direct senior operator judgment",
      ],
      proofLabel: "Operator proof",
      proof: "I cut critical incidents by nearly 50% on a $10B+ platform. I bring that governance playbook to your deal—at the scale and speed it requires.",
      action: "scorer",
      cta: "Score Your Deal →",
      accentColor: COLORS.steel,
    },
    {
      code: "PE",
      title: "LMM PE Funds",
      pain: "On an early buy-and-build platform, multiple tuck-ins can move before the management and shared-services bench is fully built. Devonshire gives the operating work a dedicated senior owner.",
      timing: "Most relevant: LOI through Day 30",
      items: [
        "Absorption capacity and critical dependencies tested before close",
        "Platform and target ownership established for Day 1",
        "A common operating baseline that strengthens with each acquisition",
      ],
      proofLabel: "Operator proof",
      proof: "More than $2M in annual savings from a $40M vendor program in under six months—delivered through an operating plan, not a slide deck.",
      action: "calendly",
      cta: "Book a Fit Check (15 min)",
      accentColor: COLORS.navy,
    },
    {
      code: "FO",
      title: "Family Offices",
      pain: "Founder-led businesses often reach new ownership before institutional operating infrastructure is in place.",
      timing: "Most relevant: acquisition through longer hold",
      items: [
        "Key-person and process-dependency visibility",
        "Controls and cadence that scale with the business",
        "Ongoing oversight without permanent headcount",
      ],
      proofLabel: "Operator proof",
      proof: "I was the operator before the advisor—running incident command, vendor governance, and KPI cadence on a $10B+ platform.",
      action: "calendly",
      cta: "Book a Fit Check (15 min)",
      accentColor: COLORS.gold,
    },
  ];

  return (
    <Section title="Built for sponsors without spare operating capacity." noCTA type="windowWithCards">
      <div className="editorial-label">01 · Who This Is Built For</div>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        The operating trigger differs by buyer, but the need is consistent: senior ownership of work that cannot be allowed to fall between the deal team and management.
      </p>
      <div className="buyer-cards-wrapper" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap" }}>
        {segments.map((seg, i) => (
          <div key={i} className="buyer-card" style={{ border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${seg.accentColor}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 260px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column" }}>
            <PersonaIcon code={seg.code} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", fontWeight: 700, color: COLORS.navy }}>
                {seg.title}
              </span>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "12px" }}>
              {seg.timing}
            </p>
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px" }}>
              {seg.pain}
            </p>
            <ul className="persona-outcomes" style={{ margin: "0 0 14px 0", flexGrow: 1 }}>
              {seg.items.map((item, j) => (
                <li key={j} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "6px" }}>
                  {item}
                </li>
              ))}
            </ul>
            <div className="persona-proof">
              <div className="persona-proof-label">{seg.proofLabel}</div>
              <p className="proof-quote">{seg.proof}</p>
            </div>
            <div style={{ paddingTop: "16px" }}>
              {seg.action === "scorer" ? (
                <button className="card-text-link" onClick={() => { track("persona_cta", { persona: seg.code, destination: "scorer" }); setPage("scorer"); }}>
                  {seg.cta}
                </button>
              ) : (
                <a className="card-text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("persona_cta", { persona: seg.code, destination: "calendly" })}>
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
  const diligenceQuestions = {
    IM: "Which critical services fail repeatedly—and who owns the escalation?",
    CG: "Which material operating changes can occur without an accountable decision owner?",
    VP: "Where is vendor concentration hidden in the P&L?",
    AC: "Can management produce evidence without a fire drill?",
    KO: "Which operating indicators reach the board weekly?",
    OP: "Which critical processes depend on one person?",
  };
  return (
    <Section noCTA variant="tinted">
      <div className="editorial-label">04 · The operating system</div>
      <SectionTitle>20 Representative Operational Levers</SectionTitle>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "960px" }}>
        {LEVERS.length} operational friction points organized across six connected domains.
      </p>

      <div className="domain-system">
        <div className="home-domain-grid">
          {Object.entries(DOMAINS).map(([k, v]) => (
            <div className="home-domain" key={k}>
              <DomainIcon code={k} />
              <div>
                <div className="domain-name" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: COLORS.navy }}>{v.name}</div>
                <div className="domain-description" style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted, lineHeight: 1.45 }}>{v.desc}</div>
                <div className="domain-diligence-question"><span>Diligence question</span>{diligenceQuestions[k]}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="domain-convergence" aria-hidden="true">
          <svg viewBox="0 0 1200 112" preserveAspectRatio="none">
            {[100, 300, 500, 700, 900, 1100].map((x) => <g key={x}><circle cx={x} cy="8" r="5"/><path d={`M${x} 13 L600 78`}/></g>)}
            <circle className="convergence-node" cx="600" cy="78" r="8"/>
          </svg>
          <span>Six domains converge into one operating model</span>
        </div>
        <div className="domain-outcome">
          <div className="domain-outcome-statement"><span>The operating outcome</span><strong>One governed operating system</strong></div>
          <div className="domain-outcome-flow" aria-label="IC visibility leads to management control, which leads to board cadence">
            <span><b>01</b>IC visibility</span><i aria-hidden="true">→</i><span><b>02</b>Management control</span><i aria-hidden="true">→</i><span><b>03</b>Board cadence</span>
          </div>
        </div>
      </div>
      <div className="home-lever-cta"><span><strong>20 levers, risk-rated.</strong> See which ones are hiding in your deal.</span><a href="/pe/services#levers" onClick={(e) => { track("lever_explorer_click"); e.preventDefault(); setPage("services", "levers"); }}>Explore the Levers →</a></div>
    </Section>
  );
}

// ─── COST OF INACTION ────────────────────────────────────────

function CostOfInaction() {
  const progression = [
    ["01", "The next acquisition", "The operating load expands"],
    ["02", "Divided attention", "Management still runs the business"],
    ["03", "Unowned dependency", "Critical work falls between teams"],
    ["04", "Post-close rework", "Decisions are revisited under pressure"],
    ["05", "Inherited complexity", "The next deal starts with unresolved work"],
  ];
  const scenarios = [
    {
      title: "No single owner across the transaction",
      what: "Functional leaders each carry a piece of the closing and integration plan, but no one owns the dependencies, unresolved decisions, or combined critical path.",
      consequence: "Decisions may be delayed, duplicated, or revisited after close—consuming management capacity when the operating plan should be accelerating.",
    },
    {
      title: "No common operating baseline",
      what: "The platform and target use different definitions, ownership models, and evidence sources. Early reporting requires manual reconciliation and produces competing versions of performance.",
      consequence: "The sponsor may lack an early, decision-useful view of whether continuity is protected and the value-creation plan is moving as underwritten.",
    },
  ];

  return (
    <Section title="The Cost of Not Acting" noCTA variant="tinted">
      <div className="editorial-label">03 · The compounding risk</div>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "960px", marginBottom: "32px" }}>
        In buy-and-build, operating complexity compounds deal by deal. Each tuck-in adds people, systems, vendors, reporting definitions, key-person dependencies, and unresolved decisions—often faster than the platform's operating capacity grows.
      </p>
      <figure className="risk-progression" aria-labelledby="risk-progression-title">
        <figcaption id="risk-progression-title">How an ungoverned operating gap carries into the next acquisition</figcaption>
        <div className="risk-curve" aria-hidden="true"><svg viewBox="0 0 1000 82" preserveAspectRatio="none"><path d="M8 70 C210 68 350 60 492 48 C690 31 820 13 992 6"/><path className="risk-curve-fill" d="M8 70 C210 68 350 60 492 48 C690 31 820 13 992 6 L992 80 L8 80Z"/><g className="risk-curve-markers"><circle cx="100" cy="69" r="6"/><circle cx="300" cy="64" r="6"/><circle cx="500" cy="47" r="6"/><circle cx="700" cy="29" r="6"/><circle cx="900" cy="10" r="6"/></g></svg></div>
        <div className="risk-stages">
          {progression.map(([n, title, copy]) => <div className="risk-stage" key={n}><span>{n}</span><i aria-hidden="true"/><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </figure>
      <div className="cost-cards-grid" style={{ display: "flex", gap: "20px", alignItems: "stretch", flexWrap: "wrap" }}>
        {scenarios.map((s, i) => (
          <div key={i} className="cost-card" style={{ border: `1px solid ${COLORS.border}`, borderTop: `3px solid ${COLORS.costRed}`, borderRadius: RADIUS.lg, padding: "24px", background: COLORS.white, flex: "1 1 260px", minWidth: "min(220px, 100%)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="scenario-number">0{i + 1}</div><div className="scenario-label">Scenario</div>
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
              <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.55, margin: 0 }}><strong>{s.consequence}</strong></p>
            </div>
          </div>
        ))}
      </div>
      <div className="compounding-paths" aria-label="Two ways operating capability compounds across acquisitions">
        <div className="compounding-path unmanaged">
          <span>Without operating control</span>
          <strong>Acquisition → exceptions → workarounds → rework</strong>
        </div>
        <div className="compounding-path governed">
          <span>With operating control</span>
          <strong>Acquisition → evidence → common standards → stronger baseline</strong>
        </div>
      </div>
      <p className="cost-bridge">
        The objective is not simply to integrate the next acquisition. It is to strengthen the operating system that must absorb <strong>every acquisition after it.</strong>
      </p>
    </Section>
  );
}

function StabilizationSequence() {
  const phases = [
    ["Visibility", "Days 1–14", "Baseline the operating reality: ownership, management capacity, critical dependencies, available evidence, and thesis-linked indicators.", "Operating baseline", "RISK"],
    ["Control", "Days 15–45", "Resolve material obligations, establish decision rights, and close the ownership gaps most likely to interrupt execution.", "Governance + ownership map", "RACI"],
    ["Cadence", "Days 45–100", "Launch weekly operating reviews, concise sponsor reporting, and an execution rhythm the management team owns—and keeps.", "Sponsor operating pack", "KPI"],
  ];
  return (
    <Section title="The First 100 Days" noCTA>
      <div className="editorial-label">05 · The stabilization sequence</div>
      <h2 className="editorial-heading">Visibility → Control → Cadence</h2>
      <p className="editorial-intro">Post-close stabilization runs in three phases—so value creation isn't blocked by instability.</p>
      <div className="sequence-figure">
        <div className="sequence-rail" aria-hidden="true"><i/><i/><i/><i/><span className="rail-visibility">Visibility</span><span className="rail-control">Control</span><span className="rail-cadence">Cadence</span><b className="rail-day1">DAY 1</b><b className="rail-day14">DAY 14</b><b className="rail-day45">DAY 45</b><b className="rail-day100">DAY 100</b></div>
        <div className="sequence-grid">
        {phases.map(([title, days, copy, artifact, code], i) => (
          <div className="sequence-phase" key={title}>
            <span className="sequence-number">0{i + 1}</span>
            <h3>{title}</h3><div className="sequence-days">{days}</div><p>{copy}</p>
            <div className="sequence-artifact" aria-label={`Representative deliverable: ${artifact}`}><div className="artifact-sheet" aria-hidden="true"><b>{code}</b><i/><i/><i/><span/></div><div><small>Representative deliverable</small><strong>{artifact}</strong></div></div>
          </div>
        ))}
        </div>
      </div>
      <p className="sequence-bridge">After Day 100, the <strong>Post-Close Control Tower</strong> maintains execution governance, sponsor visibility, and management cadence.</p>
    </Section>
  );
}

function MarketBand() {
  return (
    <section className="market-band">
      <div className="market-band-inner">
        <div className="market-kicker"><span>02</span> Why Now</div>
        <h2>Hold periods are the longest on record.<br/>The window for operational value creation is finite.</h2>
        <div className="market-stats">
          <div><strong>16,000+</strong><p>buyout-backed companies held more than four years</p></div>
          <div><strong>52%</strong><p>of buyout-backed inventory — the highest share on record</p></div>
          <div><strong>6.6 yrs</strong><p>average holding period — every quarter of drift compounds</p></div>
        </div>
        <a className="market-source" href="https://www.mckinsey.com/industries/private-capital/our-insights/global-private-markets-report/private-equity" target="_blank" rel="noopener noreferrer">— McKinsey Global Private Markets Report 2026 ↗</a>
      </div>
    </section>
  );
}

function ObjectionHandlers() {
  const comparisons = [
    ["Senior involvement", "Team model varies", "Direct", "Direct throughout"],
    ["Operating execution", "Often a separate workstream", "Depends on individual capacity", "Diligence through implementation"],
    ["Institutional operating depth", "Broad functional bench", "Varies by practitioner", "15+ years in platform operations"],
    ["Lower-middle-market fit", "Enterprise delivery model", "Flexible", "Scoped to the deal and portco"],
  ];
  return (
    <div className="positioning-dark">
    <Section noCTA variant="tinted">
      <div className="editorial-label">Positioning</div>
      <h2 className="editorial-heading">The operating depth of an institution.<br/>The accountability of a principal.</h2>
      <p className="editorial-intro objection-intro">Different advisory models solve different problems. Devonshire is built for sponsors that need senior operating judgment to continue through implementation.</p>
      <div className="advisory-comparison" role="table" aria-label="Comparison of advisory delivery models">
        <div className="comparison-row comparison-head" role="row"><div role="columnheader">What matters</div><div role="columnheader">Large advisory firm</div><div role="columnheader">Solo generalist</div><div role="columnheader">Devonshire</div></div>
        {comparisons.map((row) => <div className="comparison-row" role="row" key={row[0]}>{row.map((cell, i) => <div role={i === 0 ? "rowheader" : "cell"} key={cell}>{cell}{i === 3 && <span aria-hidden="true">✓</span>}</div>)}</div>)}
      </div>
      <div className="objection-grid">
        <div className="objection-note">
          <div className="editorial-label">Why Not a Big 4 Firm?</div>
          <h3>Audit-grade frameworks aren't operating experience.</h3>
          <p>Big 4 firms build excellent audit-grade frameworks. Devonshire installs practitioner-grade operating discipline through one accountable senior operator.</p>
          <div className="editorial-kicker">That's not advisory. That's operating.</div>
        </div>
        <div className="objection-note">
          <div className="editorial-label">Why Trust a Solo Practitioner?</div>
          <h3>No handoff to a team of juniors.</h3>
          <p>I run the diagnostic, write the findings, and execute the plan. The operating system was pressure-tested at a $10B+ platform.</p>
          <div className="editorial-kicker">Senior on day one. Senior on day one hundred.</div>
        </div>
      </div>
    </Section>
    </div>
  );
}

// ─── COMPACT ABOUT BIO ───────────────────────────────────────

function CompactAboutBio({ setPage }) {
  return (
    <Section noCTA background={`${COLORS.navy}04`}>
      <div className="practitioner-layout">
        {/* Temporary visual treatment: replace with Hassan's approved headshot when supplied. */}
        <div className="practitioner-plate" data-portrait-status="awaiting-approved-headshot" aria-label="Hassan Tariq, operator and advisor">
          <div className="founder-monogram" aria-hidden="true">HT</div>
          <div className="plate-role">Operator <span>→</span> Advisor</div>
          <div className="plate-facts"><span><strong>15+</strong> years</span><span><strong>$10B+</strong> platform</span><span><strong>$2M+</strong> savings</span></div>
        </div>
        <div className="practitioner-profile">
          <div className="editorial-label">The practitioner</div>
          <div className="practitioner-name">Hassan Tariq</div>
          <div className="practitioner-credentials">
            15+ years platform ops · JPMorgan · Barclays · Bank of America · Lazard<br />Columbia MBA '26
          </div>
          <blockquote className="practitioner-copy">“I've spent 15 years inside the machine—running platform operations at global banks and a $10B+ investment platform. Now I install the same operating discipline for PE portfolio companies, at the scale the deal requires.”</blockquote>
          <div className="credential-evidence" aria-label="Institutional experience and its relevance to sponsor mandates">
            <div className="credential-evidence-heading">
              <span className="credential-label">Institutional experience, applied to the deal</span>
              <p>Operating judgment shaped across platforms, markets, controls, and investing.</p>
            </div>
            <div className="credential-evidence-grid">
              {[
                ["JPMorgan", "Platform operations"],
                ["Barclays", "Markets infrastructure"],
                ["Bank of America", "Control discipline"],
                ["Lazard", "Executive context"],
                ["Columbia MBA", "Sponsor perspective"],
              ].map(([name, relevance]) => (
                <div className="credential-evidence-item" key={name}>
                  <strong>{name}</strong>
                  <span>{relevance}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setPage("about")}
            style={{ background: "none", border: "none", padding: 0, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Read the full story →
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── OFFER TEASER ────────────────────────────────────────────

function OfferTeaser({ setPage }) {
  const offers = [
    { ...OFFERS.executionRiskReview, label: "Pre-Close · LOI to Close", description: "For one live deal: determine whether the platform can absorb the acquisition without weakening the core business—or carrying unresolved work into the next deal.", bullets: ["Execution Risk Memo", "Evidence requests + severity-rated findings", "Day-1 Critical Path—decisions, owners, dependencies + immediate actions", "100-day priority map"], action: "score" },
    { ...OFFERS.diligenceToExecution, label: "LOI → Day 100", description: "Review findings carry directly into the 100-Day Operating Playbook—no reset between diligence and execution. What the platform learns becomes a stronger baseline for the next acquisition.", bullets: ["Execution Risk Memo + Scorecard", "Day-1 Readiness Plan + 100-Day Operating Playbook", "Ownership, milestones + operating cadence"], featured: true },
    { ...OFFERS.operatingControlSprint, label: "Post-Close · Hands-On", description: "Install one high-priority operating control or integration capability, then transfer ownership to management.", bullets: ["One operating control, fully installed", "Working governance + ownership map", "Capability Transfer Pack"] },
    { ...OFFERS.postCloseControlTower, label: "Ongoing Hold", description: "Ongoing execution governance and sponsor visibility without permanent operating-partner headcount.", bullets: ["Sponsor Operating Pack + Control Tower Dashboard", "Weekly review + action register", "Risk watchlist + board-readiness pack"] },
  ];
  return (
    <Section title="Pick the track that matches your deal stage." noCTA id="engagements-home">
      <div className="editorial-label">06 · Engagements</div>
      <p className="editorial-intro">Fixed fees scoped to transaction stage, complexity, and required access. Board-ready deliverables. Findings rated by severity and PE impact, with a clear Day-1 critical path.</p>
      <figure className="engagement-lifecycle" aria-labelledby="engagement-lifecycle-title">
        <figcaption id="engagement-lifecycle-title">Engagement coverage across the deal lifecycle</figcaption>
        <div className="lifecycle-axis" aria-hidden="true"><span>LOI</span><span>Close</span><span>Day 100</span><span>Ongoing hold</span></div>
        <div className="lifecycle-tracks">
          <div className="lifecycle-track snapshot"><b>Risk Review</b><i/></div>
          <div className="lifecycle-track playbook"><b>Diligence-to-Execution</b><i/></div>
          <div className="lifecycle-track sprint"><b>Control Sprint</b><i/></div>
          <div className="lifecycle-track tower"><b>Control Tower</b><i/></div>
        </div>
      </figure>
      <div className="home-offer-grid">
        {offers.map((o, i) => (
          <article key={i} className={`home-offer${o.featured ? " featured" : ""}`}>
            {o.featured && <span className="offer-recommended">Recommended</span>}
            <div className="offer-identity"><div className="offer-stage">{o.label}</div><h3>{o.name}</h3></div>
            <div className="offer-commercial"><div className="offer-price">{o.price}</div><div className="offer-timing">{o.timing}</div><p>{o.description}</p></div>
            <div className="offer-deliverables"><ul>{o.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              {o.action === "score" ? <button className="editorial-link" onClick={() => { track("pricing_cta", { offer:o.key, destination:"scorer" }); setPage("scorer"); }}>Score Your Deal →</button> : <a className="editorial-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { offer:o.key, destination:"calendly" })}>Book a Fit Check (15 min) →</a>}
            </div>
          </article>
        ))}
      </div>
      <p className="timing-note">Most engagements begin during the LOI → close window. The <strong>Continuity Credit</strong> applies 100% of the Execution Risk Review fee to a Diligence-to-Execution Mandate commissioned before close or within 30 days after close. 100-Day Operating Design is also available as a standalone engagement from $30,000. Add-on acquisition support is available for platform portcos.</p>
      <button className="editorial-link" onClick={() => setPage("services", "method")}>View full services &amp; method →</button>
    </Section>
  );
}

function HomeTrackRecord() {
  const cases = [
    { label:"Institutional outcome · Platform Stabilization", title:"Critical incidents cut in half", copy:"A $10B+ platform running on verbal escalations and hero culture. Installed severity model, incident command, and KPI cadence.", metrics:[
      {value:"−50%",label:"critical incidents over 18 months",before:"Prior rate",after:"50% lower"},
      {value:"99.2%",label:"platform availability",before:"94%",after:"99.2%"},
      {value:"−31%",label:"mean time to resolution",before:"Prior MTTR",after:"31% faster"},
      {value:"+22",label:"NPS improvement",before:"38",after:"60"},
    ] },
    { label:"Institutional outcome · Vendor Optimization", title:"$2M+ out of a $40M vendor program", copy:"Unmanaged vendor sprawl, auto-renewals, and concentration risk. Rebuilt vendor governance, renegotiated licensing, and installed a scorecard cadence.", metrics:[
      {value:">$2M",label:"annual run-rate reduction",before:"Prior run rate",after:">$2M lower"},
      {value:"10–15%",label:"licensing savings",before:"Prior cost",after:"10–15% lower"},
      {value:"~28%",label:"cost per $1B AUM reduction",before:"Prior unit cost",after:"28% lower"},
      {value:"<6 mo",label:"payback period",before:"Start",after:"<6 months"},
    ] },
  ];
  return <section className="home-track" id="track-record"><div className="home-track-inner">
    <div className="market-kicker"><span>07</span> Track Record &amp; Outcomes</div>
    <h2>Measured outcomes. Delivered.</h2><p className="track-intro">Operating systems built and pressure-tested at institutional scale—now applied to lower-middle-market deals and portfolio companies.</p>
    <div className="home-case-grid">{cases.map(c => <article className="home-case" key={c.title}><div className="case-overline">{c.label}</div><h3>{c.title}</h3><p>{c.copy}</p><div className="home-metrics">{c.metrics.map((m) => <div className="outcome-visual" key={m.label}><div className="outcome-heading"><strong>{m.value}</strong><span>{m.label}</span></div><div className="outcome-change" aria-label={`${m.label}: ${m.before} to ${m.after}`}><span>{m.before}</span><i aria-hidden="true">→</i><span>{m.after}</span></div></div>)}</div></article>)}</div>
    <p className="home-nda">NDA protection is available as standard. Institutional outcome detail and illustrative work-product formats are available on request.</p>
  </div></section>;
}

function FinalCTA() {
  return <section className="home-final"><div className="home-final-inner"><h2>Start with <em>one live deal.</em></h2><p>A 15-minute Fit Check confirms the operating trigger, timing, and whether a dedicated workstream is warranted.</p><a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("final_fit_check")}>Book a Fit Check (15 min)</a><div className="final-availability"><span/>Limited concurrent capacity. Every engagement is led directly by Hassan.</div></div></section>;
}

// ─── LEVER EXPLORER PAGE ─────────────────────────────────────

export default function LeverExplorer({ setPage }) {

  return (
    <div className="fade-in">
      <HeroBlockWithNav setPage={setPage} />
      <HeroCredStrip />
      <BuyerSegmentCards setPage={setPage} />
      <MarketBand />
      <CostOfInaction />
      <LeversTeaserSection setPage={setPage} />
      <StabilizationSequence />
      <ObjectionHandlers />
      <OfferTeaser setPage={setPage} />
      <HomeTrackRecord />
      <CompactAboutBio setPage={setPage} />
      <FinalCTA />
    </div>
  );
}
