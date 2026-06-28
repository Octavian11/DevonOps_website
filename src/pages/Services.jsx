import { useState } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, LEVERS, DOMAINS,
} from "../constants.js";
import {
  Section, FAQBlock, ServicesSamplesRow, OfferCards,
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
    { href: "#method", label: "Method" },
    { href: "#lever-explorer", label: "Levers" },
    { href: "#red-flags", label: "Red Flags" },
    { href: "#faq", label: "FAQ" },
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

// ─── METHOD: FEDRSSQE SPINE (compact, expand-on-click) ───────

const METHOD_STEPS = [
  { n: "1", name: "Frame", q: "What does the sponsor need to decide?",
    detail: "Diligence hypotheses and materiality thresholds, set against the investment thesis, hold plan, and risk appetite." },
  { n: "2", name: "Evidence", q: "What facts confirm or refute each hypothesis?",
    detail: "An evidence map with gaps and confidence levels, built from the CIM, financials, interviews, systems, logs, contracts, and KPIs." },
  { n: "3", name: "Diagnose", q: "Where is operational friction concentrated?",
    detail: "Maturity scores across the six operating domains (incidents, change, vendor, audit, KPI cadence, process), with red flags and causal problem statements." },
  { n: "4", name: "Retrieve", q: "Which value levers are actually relevant?",
    detail: "A company-specific shortlist, drawn from a 355-lever operational value-creation library and filtered by sector and deal thesis." },
  { n: "5", name: "Score", q: "Which levers matter first?",
    detail: "Each lever scored against a seven-factor PE-fit rubric: time to proof, FCF impact, execution certainty, covenant/liquidity, exit multiple, reversibility, and management attention load." },
  { n: "6", name: "Sequence", q: "What must precede what?",
    detail: "Each initiative slotted as Immediate GO, Conditional GO, or Sequence Later — mapped across pre-close, Day 1, Days 1–30, 31–100, and the hold." },
  { n: "7", name: "Quantify", q: "What is the defensible value range?",
    detail: "EBITDA, cash, risk, scalability, and exit-readiness implications, framed as scenarios rather than a single point estimate." },
  { n: "8", name: "Execute", q: "Who owns each action, and how is progress measured?",
    detail: "A 100-day plan with named owners, milestones, KPIs, and an ongoing operating cadence, sequenced Visibility → Control → Cadence." },
];

const METHOD_PRINCIPLES = [
  ["Evidence before scoring", "The library structures inquiry; it never creates a finding without company-specific support."],
  ["Economics before activity", "Every recommendation ties to a measurable driver or an explicitly stated risk."],
  ["Portco ownership before consultant ownership", "I design, facilitate, and validate; management owns execution and sustainability."],
];

function MethodSpine() {
  const [open, setOpen] = useState(null);
  return (
    <Section title="How I Work a Deal" noCTA variant="tinted" id="method">
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "960px", marginBottom: "24px" }}>
        Every engagement runs the same eight-step method — from the sponsor's decision down to a measurable 100-day plan. Tap any step.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {METHOD_STEPS.map((s) => {
          const isOpen = open === s.n;
          return (
            <div key={s.n} style={{ background: COLORS.white, border: `1px solid ${isOpen ? COLORS.steel : COLORS.border}`, borderRadius: RADIUS.md, cursor: "pointer", transition: "all 0.15s" }}
              onClick={() => setOpen(isOpen ? null : s.n)}>
              <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.gold, width: "18px", flexShrink: 0 }}>{s.n}</span>
                <span style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, minWidth: "92px", flexShrink: 0 }}>{s.name}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, flex: 1 }}>{s.q}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: "1.1rem", color: COLORS.steel, flexShrink: 0 }}>{isOpen ? "▾" : "▸"}</span>
              </div>
              {isOpen && (
                <div className="lever-expand" style={{ padding: "0 18px 16px 50px", borderTop: `1px solid ${COLORS.border}` }} onClick={e => e.stopPropagation()}>
                  <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, margin: "12px 0 0" }}>{s.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {METHOD_PRINCIPLES.map(([t, d], i) => (
          <div key={i} style={{ flex: "1 1 240px", minWidth: "min(220px, 100%)", borderTop: `3px solid ${COLORS.gold}`, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: "18px 20px", background: COLORS.white }}>
            <div style={{ fontFamily: FONTS.heading, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, marginBottom: "6px" }}>{t}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.55, margin: 0 }}>{d}</p>
          </div>
        ))}
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
      { title: "Silent EBITDA drag", body: "Recurring incidents, rework, and unmanaged change inflate labor and vendor spend" },
      { title: "Day-1 governance gaps", body: "No incident command, no change control, no KPI cadence → risk compounds under new ownership" },
      { title: "Vendor concentration", body: "Single-vendor dependencies, auto-renew traps, and missing exit plans create holdback/TSA exposure" },
      { title: "Exit-readiness gaps", body: "Evidence scattered, controls inconsistent → diligence and exit readiness risk" },
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
        {LEVERS.length} operational friction points across 6 domains — severity-rated, PE impact framed. Every deal has 3–5 of these hiding in plain sight. {!showAll && !hasActiveFilter ? "Use the filters to find yours." : "Filter by timing, domain, or severity. Open any lever for symptoms and PE impact analysis."}
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
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, textDecoration: "underline" }}>Book a Fit Check (15 min)</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {idx === 4 && visible.length > 5 && (
            <div style={{ margin: "12px 0 16px", padding: "20px 28px", background: COLORS.navy, borderRadius: RADIUS.md, boxShadow: "0 4px 12px rgba(67, 97, 125, 0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontFamily: FONTS.body, color: COLORS.offWhite, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: COLORS.gold }}>Not sure which of these apply to your deal?</strong> Score it in 2 minutes — free, produces a prioritized assessment.
              </p>
              <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "220px", height: "52px", padding: "0 28px", background: COLORS.gold, color: "#FFFFFF", fontFamily: "'Arial', sans-serif", fontSize: "17px", fontWeight: 600, border: "none", borderRadius: RADIUS.md, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                  Book a Fit Check (15 min)
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

      <MethodSpine />

      <OfferCards />

      <LeverExplorerSection setPage={setPage} />

      <div id="red-flags"><TypicalRedFlags /></div>
      <div id="memo-samples"><MemoSampleScreenshots /></div>
      <div id="faq"><FAQBlock variant="tinted" /></div>
    </div>
  );
}
