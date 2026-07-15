import { useState } from "react";
import { track } from "@vercel/analytics/react";
import {
  COLORS, FONTS, RADIUS,
  CALENDLY, LEVERS, DOMAINS,
} from "../constants.js";
import {
  Section, FAQBlock, ServicesSamplesRow, OfferCards,
  SeverityBadge, TimingBadge, DomainTag, SectionTitle,
} from "../components.jsx";

// ─── METHOD: FEDRSSQE SPINE (compact, expand-on-click) ───────

const METHOD_STEPS = [
  { n: "1", name: "Frame", q: "What does the sponsor need to decide?",
    detail: "Diligence hypotheses and materiality thresholds, set against the investment thesis, hold plan, and risk appetite." },
  { n: "2", name: "Evidence", q: "What facts confirm or refute each hypothesis?",
    detail: "An evidence map that distinguishes what is known, what remains unproven, and where confidence is strong enough to support an investment decision." },
  { n: "3", name: "Diagnose", q: "Where is operational friction concentrated?",
    detail: "Maturity scores across the six operating domains (incidents, change, vendor, audit, KPI cadence, process), with red flags and causal problem statements." },
  { n: "4", name: "Retrieve", q: "Which value levers are actually relevant?",
    detail: "A company-specific shortlist drawn from Devonshire’s proprietary 355-lever value-creation library and filtered by the business model, observed evidence, and deal thesis. The work distinguishes what must be fixed, what should be standardized, and which target strengths should be preserved or propagated across the platform." },
  { n: "5", name: "Score", q: "Which levers matter first?",
    detail: "Applicable levers are prioritized using Devonshire’s proprietary seven-factor PE-fit rubric. The result is a defensible sequence—not a generic list of attractive initiatives." },
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
  ["Management ownership before advisor dependence", "The deliverable is not the document. I design, facilitate, and validate; management owns an operating system it can use and improve after Devonshire leaves."],
];

function MethodFlowGraphic({ active, onSelect }) {
  const layers = [
    { n: "01", step: "1", label: "Sponsor thesis", className: "layer-thesis" },
    { n: "02", step: "2", label: "Evidence collected and tested", className: "layer-evidence" },
    { n: "03", step: "3", label: "Operating friction diagnosed", className: "layer-friction" },
    { n: "04", step: "4", label: "Relevant levers selected", className: "layer-levers" },
    { n: "05", step: "6", label: "Priorities sequenced and quantified", className: "layer-priorities" },
  ];
  return (
    <figure className="method-layers" aria-labelledby="method-layers-title method-layers-desc">
      <figcaption id="method-layers-title">The operating layers beneath the thesis</figcaption>
      <p id="method-layers-desc">Move inward from the sponsor thesis to evidence, diagnosis, selected priorities, and 100-day operating control.</p>
      <svg className="method-contours" viewBox="0 0 440 440" aria-hidden="true">
        <path className={active === "1" ? "active" : ""} d="M221 18C305 12 389 61 416 139C446 224 414 330 337 386C266 438 153 428 79 369C6 311-10 207 25 125C59 47 137 24 221 18Z" />
        <path className={active === "2" ? "active" : ""} d="M221 64C290 58 355 93 381 153C409 217 386 292 328 339C272 385 184 384 122 343C60 302 36 224 62 157C86 94 151 70 221 64Z" />
        <path className={active === "3" ? "active" : ""} d="M221 109C277 104 329 132 349 181C371 233 349 288 306 319C260 351 194 348 148 316C102 283 85 226 105 177C126 129 168 113 221 109Z" />
        <path className={active === "4" ? "active" : ""} d="M220 151C260 148 301 170 315 207C330 245 313 282 281 303C246 326 198 322 166 299C133 275 125 231 142 198C158 166 184 154 220 151Z" />
        <path className={["5", "6", "7"].includes(active) ? "active" : ""} d="M220 188C249 186 275 201 285 224C296 250 283 277 261 289C236 303 203 299 184 281C164 262 161 233 176 211C187 195 201 190 220 188Z" />
      </svg>
      <div className="method-layer-controls">
        {layers.map((layer) => {
          const isActive = active === layer.step || (layer.step === "6" && ["5", "6", "7"].includes(active));
          return <button key={layer.n} className={`${layer.className}${isActive ? " active" : ""}`} onClick={() => onSelect(layer.step)} aria-label={`Open methodology step: ${layer.label}`}><span>{layer.n}</span>{layer.label}</button>;
        })}
        <button className={`layer-control${active === "8" ? " active" : ""}`} onClick={() => onSelect("8")} aria-label="Open methodology step: 100-Day Operating Control"><span>06</span><strong>100-Day<br />Operating Control</strong></button>
      </div>
    </figure>
  );
}

function MethodSpine() {
  const [open, setOpen] = useState(null);
  return (
    <Section noCTA variant="tinted" id="method">
      <SectionTitle>The Method Behind the Work</SectionTitle>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "960px", marginBottom: "20px" }}>
        Every engagement runs the same eight-step method—from the sponsor's decision to an evidence-backed, management-owned 100-day plan. <strong className="method-tap-prompt">Tap any step for detail.</strong>
      </p>
      <div className="method-workbench">
      <MethodFlowGraphic active={open} onSelect={(step) => setOpen(open === step ? null : step)} />
      <div className="method-accordion">
        {METHOD_STEPS.map((s) => {
          const isOpen = open === s.n;
          return (
            <div key={s.n} className={`method-step-card${isOpen ? " open" : ""}`} role="button" tabIndex={0} aria-expanded={isOpen} aria-controls={`method-detail-${s.n}`}
              onClick={() => setOpen(isOpen ? null : s.n)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpen(isOpen ? null : s.n);
                }
              }}>
              <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.gold, width: "18px", flexShrink: 0 }}>{s.n}</span>
                <span style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, minWidth: "92px", flexShrink: 0 }}>{s.name}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, flex: 1 }}>{s.q}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: "1.1rem", color: COLORS.steel, flexShrink: 0 }}>{isOpen ? "▾" : "▸"}</span>
              </div>
              {isOpen && (
                <div id={`method-detail-${s.n}`} className="method-step-detail lever-expand" onClick={e => e.stopPropagation()}>
                  <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.6, margin: "12px 0 0" }}>{s.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
      <div className="method-proof-band">
      <div className="method-principles">
        {METHOD_PRINCIPLES.map(([t, d], i) => (
          <div key={i} className="method-principle">
            <div style={{ fontFamily: FONTS.heading, fontSize: "0.9rem", fontWeight: 700, color: COLORS.navy, marginBottom: "6px" }}>{t}</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.55, margin: 0 }}>{d}</p>
          </div>
        ))}
      </div>
      </div>
    </Section>
  );
}

// ─── TYPICAL RED FLAGS ───────────────────────────────────────

// ─── MEMO SAMPLE SCREENSHOTS ─────────────────────────────────

function OperatingTranslation() {
  const rows = [
    ["Reactive firefighting", "Incident command and escalation discipline", "Fewer disruptions and clearer accountability"],
    ["Vendor sprawl and weak oversight", "Vendor governance and commercial cadence", "Cost control and reduced concentration risk"],
    ["Key-person dependency", "Documented ownership and operating routines", "Greater continuity and scalability"],
  ];

  return (
    <Section noCTA variant="tinted" id="operating-translation">
      <div className="translation-heading">
        <div className="editorial-label">From operating friction to operating control</div>
        <h2>Translate the problem into an owned operating outcome.</h2>
        <p>Three examples of how observed operating gaps become practical controls. The catalog below shows the underlying issues in greater depth.</p>
      </div>
      <div className="translation-grid" role="table" aria-label="Examples of operating gaps, installed controls, and sponsor outcomes">
        <div className="translation-labels" role="row">
          <span role="columnheader">Typical operating gap</span>
          <span role="columnheader">Devonshire installs</span>
          <span role="columnheader">Sponsor outcome</span>
        </div>
        {rows.map(([gap, control, outcome]) => (
          <div className="translation-row" role="row" key={gap}>
            <div role="cell"><span>Operating gap</span><strong>{gap}</strong></div>
            <i aria-hidden="true">→</i>
            <div role="cell"><span>Installed control</span><strong>{control}</strong></div>
            <i aria-hidden="true">→</i>
            <div role="cell"><span>Sponsor outcome</span><strong>{outcome}</strong></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhatSponsorReceives() {
  const [open, setOpen] = useState(false);
  const outputs = [
    ["Execution Risk Memo", "What could impair the investment thesis?", "Material findings, supporting evidence, investment implications, and recommended actions."],
    ["Execution Risk Scorecard", "Where is exposure concentrated?", "A severity and investment-impact view across six operating domains."],
    ["Day-1 Critical Path", "What must be ready before close?", "The decisions, owners, dependencies, and immediate actions that must be ready before close."],
    ["100-Day Operating Playbook", "What must management own?", "Sequenced initiatives, milestones, KPIs, and an operating cadence management can sustain."],
  ];
  const samples = [
    { src: "/memo-samples/execution-risk-scorecard-preview.png", width:1200, height:900, alt: "Illustrative Execution Risk Scorecard executive summary", caption: "Execution Risk Scorecard — executive risk summary and six-domain findings" },
    { src: "/memo-samples/100-day-operating-playbook-preview.png", width:1200, height:900, alt: "Illustrative 100-Day Operating Playbook execution architecture", caption: "100-Day Operating Playbook — Visibility → Control → Cadence" },
  ];

  return (
    <Section noCTA background={`${COLORS.navy}03`} title="What the Sponsor Receives" id="outputs">
      <p className="sponsor-outputs-intro">The work converts operating evidence into decision-ready outputs for the IC, management team, and board.</p>
      <div className="sponsor-output-grid">
        {outputs.map(([title, question, copy], index) => (
          <article className="sponsor-output-card" key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <strong>{question}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="sponsor-output-samples">
        <div>
          <span className="editorial-label">Illustrative work product</span>
          <p>Review the format and level of specificity used in the Scorecard and 100-Day Playbook.</p>
        </div>
        <ServicesSamplesRow />
      </div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="memo-sample-grid"
        className="sample-toggle">
        {open ? "Hide sample excerpts ▾" : "Preview sample excerpts ▸"}
      </button>

      {open && (
        <div id="memo-sample-grid" className="sample-grid">
          {samples.map((s, i) => (
            <figure key={i} className="sample-card">
              <img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
              <figcaption>
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    ["Fit Check", "Trigger, timing, and fit."],
    ["Scope + Underwrite", "Evidence and fixed-fee scope."],
    ["Diligence Deliverable", "Severity-rated, PE impact framed, IC-ready findings."],
    ["Plan + Execute", "Ownership, execution, and board cadence."],
  ];
  return (
    <div className="how-it-works-dark" id="process">
    <Section title="How an Engagement Works" noCTA>
      <figure className="process-sline" aria-label="Four-stage engagement process from Fit Check through 100-Day Execution">
        <svg className="process-sline-curve" viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 160C90 145 180 145 250 160S410 175 500 160S660 145 750 160S910 175 980 160" />
          <circle cx="125" cy="148" r="7" />
          <circle cx="375" cy="172" r="7" />
          <circle cx="625" cy="148" r="7" />
          <circle cx="875" cy="172" r="7" />
        </svg>
        <svg className="process-sline-mobile" viewBox="0 0 320 780" preserveAspectRatio="none" aria-hidden="true">
          <path d="M74 20C248 82 248 178 74 240S-78 398 74 455S248 620 74 760" />
          <circle cx="150" cy="61" r="7" /><circle cx="150" cy="213" r="7" /><circle cx="25" cy="407" r="7" /><circle cx="150" cy="716" r="7" />
        </svg>
        <div className="process-sline-stages">
        {steps.map(([title, copy], i) => (
          <div className={`process-step process-step-${i + 1}`} key={title}>
            <span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p>
          </div>
        ))}
        </div>
      </figure>
    </Section>
    </div>
  );
}

// ─── DOMAIN × DEAL-STAGE OPERATING-CONTROL MATRIX ───────────

const MATRIX_STAGES = [
  ["Pre-Close Red Flag", "Pre-Close", "Underwrite the exposure"],
  ["First 100 Days", "First 100 Days", "Install the control"],
  ["Ongoing Hold", "Ongoing Hold", "Sustain the cadence"],
];

function OperatingControlMatrix({ domainFilter, timingFilter, onSelect }) {
  return (
    <div className="control-matrix" aria-label="Representative levers by operating domain and deal stage">
      <div className="control-matrix-intro">
        <div><span>Operating-control matrix</span><strong>Where operating risk appears—and when to act</strong></div>
        <p>Select any cell to inspect the representative levers beneath it.</p>
      </div>
      <div className="control-matrix-grid">
        <div className="matrix-corner"><span>Operating domain</span></div>
        {MATRIX_STAGES.map(([value, label, note]) => <div className="matrix-stage" key={value}><strong>{label}</strong><span>{note}</span></div>)}
        {Object.entries(DOMAINS).map(([domain, info]) => (
          <div className="matrix-row" key={domain}>
            <div className="matrix-domain"><span>{info.short}</span><strong>{info.name}</strong></div>
            {MATRIX_STAGES.map(([timing, label]) => {
              const matches = LEVERS.filter((lever) => lever.domain === domain && lever.timing === timing);
              const isActive = domainFilter === domain && timingFilter === timing;
              const severityCounts = ["Critical", "High", "Medium"].map((severity) => [severity, matches.filter((lever) => lever.severity === severity).length]);
              return (
                <button key={timing} className={`matrix-cell${isActive ? " active" : ""}${matches.length === 0 ? " empty" : ""}`} onClick={() => onSelect(domain, timing)} aria-pressed={isActive} aria-label={`${info.short}, ${label}: ${matches.length} representative ${matches.length === 1 ? "lever" : "levers"}`}>
                  <strong>{matches.length}</strong><span>{matches.length === 1 ? "lever" : "levers"}</span>
                  <div className="matrix-severity" aria-hidden="true">{severityCounts.map(([severity, count]) => count > 0 && <i key={severity} className={severity.toLowerCase()}>{count}</i>)}</div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="matrix-key" aria-hidden="true"><span><i className="critical" />Critical</span><span><i className="high" />High</span><span><i className="medium" />Medium</span></div>
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
  const [catalogOpen, setCatalogOpen] = useState(false);

  const filtered = LEVERS.filter(l => {
    if (domainFilter !== "All" && l.domain !== domainFilter) return false;
    if (timingFilter !== "All" && l.timing !== timingFilter) return false;
    if (severityFilter !== "All" && l.severity !== severityFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.definition.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const hasActiveFilter = search || domainFilter !== "All" || timingFilter !== "All" || severityFilter !== "All";
  const compactPreview = Object.keys(DOMAINS).map((domain) => filtered.find((lever) => lever.domain === domain && lever.common)).filter(Boolean);
  const visible = hasActiveFilter ? filtered : (showAll ? filtered : compactPreview);
  const clearFilters = () => { setSearch(""); setDomainFilter("All"); setTimingFilter("All"); setSeverityFilter("All"); setExpanded(null); };
  const selectMatrixCell = (domain, timing) => {
    const isActive = domainFilter === domain && timingFilter === timing;
    setDomainFilter(isActive ? "All" : domain);
    setTimingFilter(isActive ? "All" : timing);
    setSeverityFilter("All");
    setSearch("");
    setExpanded(null);
    setShowAll(true);
    setCatalogOpen(true);
  };

  const selectStyle = { padding: "10px 14px", border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, background: COLORS.white, cursor: "pointer", minWidth: "160px", boxShadow: "0 1px 2px rgba(20, 33, 61, 0.05)" };

  return (
    <Section title="Representative Operational Lever Catalog" noCTA variant="tinted" id="lever-explorer">
      <div className="editorial-label">20 representative levers · proprietary 355-lever library</div>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "960px", marginBottom: "32px" }}>
        Explore {LEVERS.length} representative examples from Devonshire’s proprietary 355-lever library. Each is severity-rated, PE impact framed, validated against deal evidence, and prioritized using Devonshire’s proprietary seven-factor PE-fit rubric—not applied as a checklist. {!catalogOpen ? "The preview shows one issue from each operating domain." : "Open any result for symptoms, deal implications, and what good looks like."}
      </p>

      {catalogOpen && <OperatingControlMatrix domainFilter={domainFilter} timingFilter={timingFilter} onSelect={selectMatrixCell} />}

      {catalogOpen && (
      <div className="lever-filter-panel">
      <div className="lever-filters">
        <label className="filter-field filter-search"><span>Search</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search names and definitions…" style={{ ...selectStyle, minWidth: "220px" }} /></label>
        <label className="filter-field"><span>Domain</span><select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} style={selectStyle}>
          <option value="All">All Domains</option>
          {Object.entries(DOMAINS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select></label>
        <label className="filter-field"><span>Timing</span><select value={timingFilter} onChange={e => setTimingFilter(e.target.value)} style={selectStyle}>
          <option value="All">All Timing</option>
          <option value="Pre-Close Red Flag">Pre-Close Red Flag</option>
          <option value="First 100 Days">First 100 Days</option>
          <option value="Ongoing Hold">Ongoing Hold</option>
        </select></label>
        <label className="filter-field"><span>Severity</span><select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} style={selectStyle}>
          <option value="All">All Severity</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select></label>
      </div>
      <div className="lever-results-bar"><p role="status" aria-live="polite">Showing <strong>{visible.length}</strong> of {LEVERS.length} levers</p>{hasActiveFilter && <button onClick={clearFilters}>Clear filters</button>}</div>
      </div>
      )}

      {visible.map((lever, idx) => {
        const showGroupHeader = domainFilter === "All" && (idx === 0 || visible[idx - 1].domain !== lever.domain);
        const domainInfo = DOMAINS[lever.domain];
        const domainCount = domainFilter === "All" ? filtered.filter(l => l.domain === lever.domain).length : null;
        return (
        <div key={lever.id}>
          {showGroupHeader && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: `${idx === 0 ? "0" : "24px"} 0 10px` }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: domainInfo?.color || COLORS.steel, background: `${domainInfo?.color || COLORS.steel}15`, padding: "4px 10px", borderRadius: "4px" }}>
                {domainInfo?.name || lever.domain}
              </span>
              <span className="domain-lever-count" style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.charcoal }}>
                {catalogOpen ? `${domainCount} lever${domainCount !== 1 ? "s" : ""}` : "Representative example"}
              </span>
              <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
            </div>
          )}
          <article className={`lever-card${expanded === lever.id ? " expanded" : ""}`}>
            <button className="lever-row" aria-expanded={expanded === lever.id} aria-controls={`lever-detail-${lever.id}`}
              onClick={() => setExpanded(expanded === lever.id ? null : lever.id)}>
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
            </button>
            {expanded === lever.id && (
              <div id={`lever-detail-${lever.id}`} role="region" aria-label={`${lever.name} details`} className="lever-expand lever-expand-detail">
                <div style={{ paddingTop: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "0 32px", marginBottom: "10px" }}>
                    <div>
                      <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.8rem", color: COLORS.steel, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Definition</h4>
                      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.definition}</p>
                      <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.8rem", color: COLORS.steel, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Symptoms</h4>
                      <ul style={{ paddingLeft: "22px", marginBottom: "18px" }}>
                        {lever.symptoms.map((s, i) => <li key={i} style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "6px" }}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.8rem", color: COLORS.critical, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>PE Impact</h4>
                      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.peImpact}</p>
                      <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.8rem", color: COLORS.stable, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>What Good Looks Like</h4>
                      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "18px" }}>{lever.whatGood}</p>
                    </div>
                  </div>
                  <div className="lever-detail-actions">
                    <button onClick={() => { track("services_scorer_click", { location: "lever_detail", lever: lever.id }); setPage("scorer"); }} style={{ background: "none", border: "none", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, cursor: "pointer", textDecoration: "underline", padding: 0 }}>→ Assess your readiness</button>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => track("services_fit_check_click", { location: "lever_detail", lever: lever.id })} style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.gold, textDecoration: "underline" }}>Book a Fit Check (15 min)</a>
                  </div>
                </div>
              </div>
            )}
          </article>

        </div>
        );
      })}

      {!showAll && !hasActiveFilter && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button onClick={() => { setCatalogOpen(true); setShowAll(true); }} style={{ padding: "12px 28px", background: "transparent", border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.navy, cursor: "pointer", fontWeight: 700 }}>
            Explore the representative catalog ↓
          </button>
        </div>
      )}
    </Section>
  );
}

// ─── SERVICES PAGE ───────────────────────────────────────────

export default function ServicesPage({ setPage }) {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-inner">
        <div className="services-kicker">Services · Method · Execution</div>
        <h1>Services, Method &amp; the Operating Lever Library</h1>
        <p className="services-lead">
          Operator-led diligence and post-close execution for sponsors who need to know whether a business can deliver the investment thesis under new ownership. Devonshire converts operating evidence into an IC-ready risk view, pre-close priorities, and a management-owned 100-day plan.
        </p>
        <p className="services-trigger"><strong>Especially relevant for buy-and-build platforms:</strong> when acquisition pace is outrunning integration ownership, management capacity, or the operating baseline needed to absorb the next tuck-in.</p>
        <div className="services-proof-line" aria-label="Engagement characteristics">
          <span>Fixed-fee engagements</span><span>Board-ready outputs</span><span>Senior ownership throughout</span>
        </div>
        </div>
      </section>

      <OperatingTranslation />
      <MethodSpine />
      <div id="levers"><LeverExplorerSection setPage={setPage} /></div>
      <WhatSponsorReceives />
      <div id="offers"><OfferCards /></div>
      <HowItWorks />
      <aside className="services-market-note" aria-label="Private-equity value-creation research">
        <p><span><strong>53%</strong> of LPs rank value creation among their top-five manager-selection criteria—above sector expertise.</span><a href="https://www.mckinsey.com/industries/private-capital/our-insights/global-private-markets-report/private-equity" target="_blank" rel="noopener noreferrer">McKinsey Global Private Markets Review 2026 ↗</a></p>
      </aside>
      <div id="faq"><FAQBlock variant="tinted" /></div>
    </div>
  );
}
