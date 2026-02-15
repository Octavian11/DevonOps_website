import { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

// ─── CONSTANTS ──────────────────────────────────────────────
const CALENDLY = "https://calendly.com/hassantariq1/15-minute-triage-call-hassan-tariq";

const COLORS = {
  navy: "#14213D",
  steel: "#43617D",
  gold: "#B8860B",
  offWhite: "#FCFCFC",
  charcoal: "#1A202C",
  border: "#E2E8F0",
  white: "#FFFFFF",
  primary: "#14213D",
  bodyMuted: "#6B7280",
  criticalBg: "#FFF5F5",
  criticalText: "#9B2C2C",
  criticalBorder: "#FEB2B2",
  highBg: "#FFFAF0",
  highText: "#C05621",
  highBorder: "#FBD38D",
  mediumBg: "#FFFFF0",
  mediumText: "#B7791F",
  mediumBorder: "#FEFCBF",
  preClose: "#2C5282",
  first100: "#2C7A7B",
  ongoing: "#4A5568",
  stable: "#276749",
  atRisk: "#C05621",
  critical: "#9B2C2C",
  heroGradientStart: "#14213D",
  heroGradientEnd: "#0F1A2E",
};

const FONTS = {
  heading: "'EB Garamond', Garamond, 'Times New Roman', serif",
  body: "Georgia, 'Times New Roman', serif",
};

const SEVERITY_STYLE = {
  Critical: { bg: COLORS.criticalBg, text: COLORS.criticalText, border: COLORS.criticalBorder },
  High: { bg: COLORS.highBg, text: COLORS.highText, border: COLORS.highBorder },
  Medium: { bg: COLORS.mediumBg, text: COLORS.mediumText, border: COLORS.mediumBorder },
};

const TIMING_COLORS = { "Pre-Close Red Flag": COLORS.preClose, "First 100 Days": COLORS.first100, "Ongoing Hold": COLORS.ongoing };

const DOMAINS = {
  IM: { name: "Incident Management", short: "IM", color: "#E53E3E", desc: "Outage response, severity classification, postmortems, escalation" },
  CG: { name: "Change Governance", short: "CG", color: "#DD6B20", desc: "Deployment control, CAB process, rollback, change-incident correlation" },
  VP: { name: "Vendor & Third-Party", short: "VP", color: "#D69E2E", desc: "Contracts, concentration risk, scorecards, fourth-party visibility" },
  AC: { name: "Audit & Compliance", short: "AC", color: "#38A169", desc: "Evidence trails, SOC 2, access reviews, control testing" },
  KO: { name: "KPI & Operating Cadence", short: "KO", color: "#3182CE", desc: "Board reporting, operating reviews, metrics, targets" },
  OP: { name: "Organizational & Process", short: "OP", color: "#805AD5", desc: "Runbooks, RACI, key-person risk, knowledge management" },
};

// ─── 20 LEVERS (MVP) ───────────────────────────────────────
const LEVERS = [
  { id: 1, domain: "IM", name: "No Formal Incident Command Structure", severity: "Critical", timing: "First 100 Days",
    definition: "The portfolio company lacks a defined incident command process — no severity classification, no designated incident commander, and no structured communication protocol during outages. Response is ad hoc and depends on whoever happens to be available.",
    symptoms: ["Multiple people troubleshooting without coordination", "No clear escalation to management or the board", "Customers and clients learn about outages before internal teams do", "Post-incident: no root cause analysis, same failures recur", "Operating partner hears about issues days late"],
    peImpact: "MTTR inflated 2–5× vs. structured response. Client churn risk from repeated outages. EBITDA drag from firefighting — executive time diverted from growth initiatives. Compliance exposure creates risk in diligence for the next buyer. Exit narrative weakened if incident history is visible.",
    whatGood: "Severity-classified incidents with designated commanders, structured comms (internal + board), defined escalation thresholds, mandatory postmortems feeding a recurrence prevention backlog, and clean incident history for exit diligence." },
  { id: 2, domain: "IM", name: "No Severity Classification System", severity: "Critical", timing: "First 100 Days",
    definition: "All incidents are treated equally — a minor UI bug gets the same response as a production outage affecting revenue. Without severity classification, everything is either an emergency or ignored.",
    symptoms: ["Every incident triggers all-hands response or none at all", "No SLA differentiation between critical and low-severity issues", "Management cannot distinguish signal from noise in incident reporting", "Board reports show incident counts without severity context"],
    peImpact: "Without severity classification, incident metrics are meaningless for board reporting. The operating partner cannot assess operational risk accurately. Resource allocation is inefficient — senior engineers are pulled into low-severity issues while critical problems queue.",
    whatGood: "4-tier severity model (Critical/High/Medium/Low) with defined criteria, response SLAs per tier, escalation thresholds, and severity-weighted reporting that gives the board an accurate risk picture." },
  { id: 3, domain: "IM", name: "No Postmortem / Root Cause Discipline", severity: "Critical", timing: "First 100 Days",
    definition: "When incidents occur, the team fixes the immediate problem and moves on. No root cause analysis, no postmortem review, no documentation of what happened or what would prevent recurrence.",
    symptoms: ["Same incidents recur on a predictable cycle", "Fixes are tactical patches rather than structural solutions", "No shared learning from failures — lessons die with the responder", "Diligence team finds no incident documentation or trend data"],
    peImpact: "Recurring incidents compound into EBITDA drag — each outage costs revenue, client trust, and management time. Without postmortems, the same problems resurface under new ownership. Exit diligence reveals a pattern of unresolved operational instability.",
    whatGood: "Mandatory blameless postmortems for all Sev-1/Sev-2 incidents, documented root cause and contributing factors, action items tracked to completion, recurrence prevention backlog reviewed weekly, and trend analysis reported to the board quarterly." },
  { id: 10, domain: "IM", name: "Hero Dependency in Incident Response", severity: "High", timing: "Pre-Close Red Flag",
    definition: "One or two people are the only ones who can resolve critical incidents. When they are unavailable, incidents escalate or remain unresolved for extended periods.",
    symptoms: ["Incident resolution time spikes when specific individuals are on vacation or unavailable", "On-call rotation is nominal — the same person always gets called", "Knowledge of critical systems exists only in one person's head", "Team morale issues from burnout of key responders"],
    peImpact: "Key-person risk that directly threatens operational continuity. If the hero leaves post-acquisition, incident capability collapses. This is a pre-close red flag that should inform deal pricing and the 100-day plan.",
    whatGood: "Cross-trained incident responders with documented runbooks, rotating on-call schedules with real distribution of load, knowledge transfer programs, and no single point of failure for any critical system." },
  { id: 11, domain: "CG", name: "No Change Advisory Board or Change Control Process", severity: "Critical", timing: "First 100 Days",
    definition: "Changes to production systems happen without review, approval, or risk assessment. There is no CAB, no change calendar, and no process to evaluate whether a proposed change is safe to deploy.",
    symptoms: ["Production changes happen at any time without notice", "No one can tell you what changed when an incident occurs", "Failed changes are discovered by users, not by the team", "Change-related incidents are frequent but not tracked as such"],
    peImpact: "Uncontrolled changes are the #1 cause of production incidents in portfolio companies. Without change governance, every deployment is a potential revenue-impacting event. The correlation between changes and incidents — invisible without tracking — is where most EBITDA drag hides.",
    whatGood: "Change Advisory Board (or lightweight equivalent) with risk classification (Standard/Normal/Emergency), mandatory approval workflows, deployment windows, rollback procedures, and change-incident correlation tracking." },
  { id: 12, domain: "CG", name: "Undocumented or Ad Hoc Deployment Process", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Code and configuration changes are deployed manually with no standard process, no checklists, and no rollback plan. Deployment knowledge lives in individual heads.",
    symptoms: ["Deployments require specific people to be present", "No deployment checklists, runbooks, or automation", "Rollback is manual and slow — or impossible", "Post-deployment validation is inconsistent or absent"],
    peImpact: "A pre-close red flag that signals operational fragility. If deployment depends on tribal knowledge, any personnel change (voluntary or involuntary) risks deployment capability. For the next buyer's diligence team, this is a reliability concern that affects the multiple.",
    whatGood: "Documented deployment procedures with checklists, automated where possible, mandatory pre/post validation steps, rollback procedures tested regularly, and deployment capability distributed across the team." },
  { id: 19, domain: "CG", name: "Shadow IT / Uncontrolled Tool Sprawl", severity: "High", timing: "Pre-Close Red Flag",
    definition: "Teams adopt tools, platforms, and services without IT or management approval. No inventory of what tools are in use, who has access, or what they cost.",
    symptoms: ["Finance discovers SaaS subscriptions during expense review", "Security cannot enumerate all systems that store company data", "Multiple tools serve the same function across different teams", "No one knows the total technology spend"],
    peImpact: "Hidden cost exposure that erodes EBITDA. Security risk from unmanaged data flows. Vendor rationalization (a standard PE value creation lever) is impossible without a complete inventory. Change-of-control clauses in undiscovered contracts can create post-close surprises.",
    whatGood: "Complete tool inventory with ownership, cost, and data classification. Procurement governance for new tools. Regular rationalization reviews. All tools subject to security and compliance review." },
  { id: 21, domain: "VP", name: "No Vendor Inventory or Contract Visibility", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "No central record of who the company's vendors are, what contracts exist, what the terms are, or when renewals occur. Vendor information is scattered across email inboxes, shared drives, and individual knowledge.",
    symptoms: ["Cannot produce a list of all active vendors with contract terms", "Renewal dates are missed or discovered last-minute", "Duplicate vendor relationships exist across departments", "Contract terms are unfavorable because no one reviewed them before auto-renewal"],
    peImpact: "Vendor spend is one of the first value creation levers PE funds pull. Without an inventory, you cannot rationalize, renegotiate, or benchmark. Change-of-control clauses in undiscovered contracts can create cost exposure or service disruption post-close.",
    whatGood: "Centralized vendor registry with contract terms, renewal dates, spend data, and owner assignment. Renewal calendar with 90-day advance review triggers. Annual vendor rationalization review." },
  { id: 23, domain: "VP", name: "Vendor Concentration Risk (Single Points of Failure)", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Critical business functions depend on a single vendor with no alternative, no exit plan, and no negotiating leverage. If the vendor fails, raises prices, or terminates the relationship, the business is disrupted.",
    symptoms: ["Single vendor for a critical function with no documented alternative", "Vendor has significant pricing power due to switching costs", "No exit or transition plan exists for key vendors", "Vendor outage directly causes business outage"],
    peImpact: "Concentration risk is a material diligence finding. It represents both business continuity risk (vendor failure = business failure) and value capture risk (vendor can extract margin through pricing power). Exit diligence will flag unmitigated concentration.",
    whatGood: "Concentration risk mapped for all critical vendors. Exit and transition plans documented for top-10 vendors. Alternative sourcing identified. Contract terms include adequate notice periods and data portability." },
  { id: 28, domain: "VP", name: "Vendor Access Not Governed (Entitlements Drift)", severity: "High", timing: "Pre-Close Red Flag",
    definition: "Vendor staff have persistent access to company systems with no regular review, no access certification, and no offboarding process when vendor personnel change.",
    symptoms: ["Former vendor employees still have active credentials", "Vendor access levels exceed what's needed for their current scope", "No access certification or review process for vendor accounts", "Audit findings related to vendor access management"],
    peImpact: "Security and compliance exposure. SOC 2 auditors flag vendor access governance as a control failure. For regulated industries, this can trigger regulatory action. Diligence teams treat ungoverned vendor access as both a security risk and a governance maturity indicator.",
    whatGood: "Quarterly vendor access reviews, just-in-time access provisioning where possible, vendor personnel change notifications contractually required, and vendor access included in the regular access certification process." },
  { id: 31, domain: "AC", name: "No Evidence Collection Process or Evidence Index", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "When auditors or diligence teams request evidence of controls (access reviews, change approvals, incident postmortems), the team scrambles to locate or reconstruct documentation.",
    symptoms: ["Audit preparation takes weeks and pulls people off productive work", "Evidence is reconstructed from memory rather than collected contemporaneously", "Different people produce conflicting evidence for the same control", "Audit findings cite missing or insufficient evidence"],
    peImpact: "Audit readiness is a proxy for operational maturity. If evidence collection is a scramble, the company will fail SOC 2 Type II, struggle with regulatory exams, and present poorly in exit diligence. The cost of audit remediation post-finding is 3–5× the cost of maintaining evidence trails proactively.",
    whatGood: "Evidence index maintained continuously, not assembled for audits. Evidence collection automated where possible. Clear mapping between controls, evidence artifacts, and audit requirements. Audit prep takes hours, not weeks." },
  { id: 32, domain: "AC", name: "SOC 2 Controls Not Mapped to Operating Procedures", severity: "Critical", timing: "First 100 Days",
    definition: "The company has SOC 2 controls documented on paper, but the actual operating procedures do not align with what the controls describe. The gap between stated controls and practiced procedures is significant.",
    symptoms: ["SOC 2 report describes processes that don't match reality", "Control owners cannot explain how their controls are implemented", "Auditors find exceptions because actual practice diverges from documented controls", "Employees follow undocumented workarounds"],
    peImpact: "A SOC 2 report with Type II exceptions is a red flag for institutional clients and for exit diligence. The gap between documented controls and actual practice indicates governance theater — the company looks compliant without being operationally sound.",
    whatGood: "Controls mapped 1:1 to operating procedures with named owners. Control testing performed quarterly (not just annually for the audit). Exceptions tracked and remediated with documented timelines. Zero-exception SOC 2 Type II as the standard." },
  { id: 34, domain: "AC", name: "Access Reviews Not Conducted or Documented", severity: "High", timing: "Pre-Close Red Flag",
    definition: "User access to systems is granted but never reviewed. Former employees, role changes, and vendor personnel accumulate access entitlements over time without certification.",
    symptoms: ["Former employees still have active accounts", "Users have access to systems they no longer need", "No periodic access certification process exists", "Audit findings consistently cite access management"],
    peImpact: "Access governance is one of the most scrutinized controls in SOC 2, regulatory exams, and exit diligence. Persistent findings here signal weak governance broadly — if the company cannot manage who has access to what, it likely struggles with other controls too.",
    whatGood: "Quarterly access reviews with manager certification, automated deprovisioning on termination, role-based access control with regular role reviews, and access review completion tracked as a KPI." },
  { id: 37, domain: "AC", name: "No Audit Trail for Privileged Actions", severity: "High", timing: "Pre-Close Red Flag",
    definition: "Administrators and privileged users perform actions on critical systems without logging. There is no record of who did what, when, or why.",
    symptoms: ["Cannot determine who made a specific configuration change", "No centralized logging for privileged actions", "Investigations after incidents cannot trace root cause to a specific action", "Compliance teams cannot demonstrate segregation of duties"],
    peImpact: "Without audit trails, the company cannot demonstrate control over its most sensitive operations. Regulators, auditors, and diligence teams treat this as a fundamental control gap. Remediation post-finding requires significant investment in logging infrastructure.",
    whatGood: "All privileged actions logged with user identity, timestamp, and description. Logs centralized, tamper-evident, and retained per policy. Regular review of privileged action logs. Automated alerts for anomalous privileged activity." },
  { id: 41, domain: "KO", name: "No Defined Operating KPIs or Metrics", severity: "Critical", timing: "First 100 Days",
    definition: "The portfolio company does not have a defined set of operational KPIs. Performance is discussed anecdotally rather than measured. There is no baseline and no way to demonstrate improvement.",
    symptoms: ["Board meetings discuss operations qualitatively, not quantitatively", "No dashboard or regular metrics report exists", "Different stakeholders cite different numbers for the same metric", "Improvement initiatives cannot demonstrate measurable impact"],
    peImpact: "Without KPIs, the value creation plan has no measurement framework. You cannot prove EBITDA improvement, demonstrate operational stability, or build the data narrative for exit. Every PE fund expects metrics-driven operations — their absence signals management immaturity.",
    whatGood: "Defined KPI set covering reliability (uptime, MTTR), efficiency (cost per transaction, utilization), quality (error rates, SLA adherence), and risk (incident volume, audit findings). Baselines established within 30 days. Targets set within 60 days. Board-ready reporting within 90 days." },
  { id: 42, domain: "KO", name: "No Weekly/Monthly Operating Review Cadence", severity: "Critical", timing: "First 100 Days",
    definition: "There is no structured operating review — no weekly or monthly rhythm where metrics are reviewed, issues are surfaced, and decisions are made. Operations run on ad hoc check-ins and crisis response.",
    symptoms: ["No standing operational review meeting exists", "Problems surface through escalation, not through proactive review", "Operating decisions are made without data or structured discussion", "The board receives operational updates only when something goes wrong"],
    peImpact: "The operating cadence is the foundation of PE-style governance. Without it, the operating partner has no visibility, no control, and no early warning system. Installing a cadence is typically the single highest-impact intervention in the first 100 days.",
    whatGood: "Weekly operating review with defined agenda, metrics package, issue log, and decision log. Monthly board-ready operational summary. Quarterly deep-dives on strategic operational topics. Clear escalation from weekly review to board when thresholds are breached." },
  { id: 44, domain: "KO", name: "No Board-Ready Operational Reporting", severity: "High", timing: "First 100 Days",
    definition: "The operating partner or board receives no structured operational reporting — or receives reports that are inconsistent, incomplete, or not actionable.",
    symptoms: ["Board decks contain no operational metrics", "Operational updates are verbal and anecdotal", "Different reports show conflicting data", "The board cannot assess operational risk between meetings"],
    peImpact: "Board reporting is how the fund maintains governance oversight. Without it, problems compound silently until they become crises. For exit preparation, a track record of structured board reporting demonstrates management maturity and operational discipline.",
    whatGood: "Monthly board-ready operational report with defined KPIs, trend analysis, risk flags, incident summary, and action items. Consistent format. Data-driven. Delivered on schedule without heroic effort." },
  { id: 51, domain: "OP", name: "No RACI or Ownership Matrix for Critical Functions", severity: "High", timing: "First 100 Days",
    definition: "Critical operational functions have no clear owner. When something needs to happen, it's unclear who is responsible, who approves, who needs to be consulted, and who should be informed.",
    symptoms: ["Decisions stall because no one knows who owns them", "Multiple people do the same work or no one does it", "Escalations go to the wrong person or go nowhere", "Post-acquisition confusion about roles intensifies as new reporting lines are established"],
    peImpact: "Ownership ambiguity is a friction multiplier — it makes every other operational problem harder to solve. Without RACI, the 100-day plan has no accountability structure. The operating partner cannot hold anyone accountable because accountability hasn't been defined.",
    whatGood: "RACI matrix for all critical operational functions, reviewed quarterly. Single-threaded ownership for each critical function. Escalation paths defined and published. New hires and role changes trigger RACI updates." },
  { id: 52, domain: "OP", name: "Tribal Knowledge / No Runbooks or SOPs", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Critical operational knowledge exists only in individuals' heads. No runbooks, no standard operating procedures, no documentation that would allow someone else to perform the same function.",
    symptoms: ["Specific people are required for specific tasks — no substitutes", "Onboarding new team members takes months because nothing is written down", "When key people are on vacation, certain functions simply don't happen", "Post-acquisition knowledge transfer is impossible to scope because no one knows what needs to be transferred"],
    peImpact: "The most dangerous pre-close red flag for operational continuity. If key people leave post-acquisition (which happens frequently), undocumented knowledge leaves with them. Rebuilding from zero is 10× more expensive than documenting proactively. Diligence should quantify key-person risk explicitly.",
    whatGood: "Runbooks for all critical operational procedures. SOPs for recurring processes. Knowledge base maintained and version-controlled. Cross-training program ensures no single point of knowledge failure. Documentation currency tracked as a KPI." },
  { id: 57, domain: "OP", name: "Staffing Model Fragile (Key-Person Risk)", severity: "High", timing: "Pre-Close Red Flag",
    definition: "The organizational structure has single points of failure — individuals whose departure would materially impair operations. No succession planning, no cross-training, no redundancy.",
    symptoms: ["Org chart shows one person covering a critical function with no backup", "Retention risk for key personnel not identified or mitigated", "No succession plan for any operational role", "Post-acquisition retention packages not informed by actual key-person analysis"],
    peImpact: "Key-person risk directly affects deal structuring (earn-outs, retention packages, employment agreements). If not identified pre-close, it becomes an expensive surprise post-close. Key-person departures in the first year are the #1 operational risk in PE-backed transitions.",
    whatGood: "Key-person risk assessment completed and updated annually. Cross-training and documentation eliminate single points of failure. Succession plans for all critical roles. Retention strategy informed by actual risk analysis, not gut feel." },
];

// ─── SCORER DIMENSIONS ──────────────────────────────────────
const SCORER_DIMS = [
  { key: "incident", label: "Incident Governance", short: "Incident",
    low: "Ad hoc — whoever's available, no process",
    mid: "Some process exists, inconsistently followed",
    high: "Formal incident command with severity classification, designated roles, postmortems, and board escalation" },
  { key: "change", label: "Change Control", short: "Change",
    low: "Anyone can deploy anything, no approval process",
    mid: "Informal approval exists, no tracking or risk classification",
    high: "CAB with risk classification, rollback procedures, post-implementation reviews, and change-incident correlation" },
  { key: "vendor", label: "Vendor Oversight", short: "Vendor",
    low: "No inventory, no scorecards, renewal surprises, unknown concentration risks",
    mid: "Basic inventory exists, some SLA tracking, renewal dates known",
    high: "Active scorecards, renewal calendar, risk assessments, exit planning, and fourth-party visibility" },
  { key: "audit", label: "Audit & Compliance", short: "Audit",
    low: "Scramble mode — evidence scattered, policies outdated or missing",
    mid: "Some controls documented, gaps in evidence trails and testing",
    high: "Evidence index maintained, periodic control testing, segregation of duties, audit-ready at all times" },
  { key: "kpi", label: "KPI & Cadence", short: "KPI",
    low: "No regular reviews, no defined KPIs, board reporting is ad hoc",
    mid: "Monthly reviews with some metrics, no targets, reporting is manual",
    high: "Weekly cadence, defined KPIs with thresholds, executive dashboard, board-ready package" },
  { key: "process", label: "Process & Knowledge", short: "Process",
    low: "Tribal knowledge, hero dependency, no documentation",
    mid: "Some documentation, inconsistent quality, key-person risk in critical functions",
    high: "Comprehensive runbooks, RACI matrix, onboarding playbooks, service catalog, operational readiness reviews" },
];

const CONTEXT_OPTIONS = [
  { key: "pre", label: "Evaluating a target (pre-close diligence)" },
  { key: "post", label: "First 100 days post-close" },
  { key: "mid", label: "Mid-hold period optimization" },
];

const CONTEXT_CALLOUTS = {
  stable: { pre: "This target shows operational maturity. Diligence should validate these findings, but the operational risk profile is favorable.", post: "Operations are well-governed. A Control Tower Retainer can maintain this posture and free management bandwidth for growth initiatives.", mid: "Strong operational foundation. Focus on optimization and ensuring this posture is durable for exit diligence." },
  atRisk: { pre: "Operational friction is present and should be factored into the value creation plan. A post-close stabilization engagement is recommended within the first 30 days.", post: "Friction is accumulating. A 100-Day Stabilization Plan can establish the governance baseline before these gaps become EBITDA drag.", mid: "Operational drift is occurring. Recommend a targeted intervention to re-establish governance discipline before exit preparation." },
  critical: { pre: "Significant operational risk. These findings should inform deal pricing and the 100-day plan. Recommend an Ops Diligence Report before close.", post: "Immediate stabilization needed. A 100-Day Stabilization Plan should be the first post-close priority.", mid: "Operational risk is material and will impact exit valuation. Recommend immediate intervention." },
};

// ─── STYLES ─────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600;700&display=swap');

  html { font-size: 20px; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: ${COLORS.primary};
    --gold: ${COLORS.gold};
    --text: #1F2937;
    --muted: #6B7280;
    --maxcopy: 70ch;
  }

  body {
    background: ${COLORS.offWhite};
    font-family: ${FONTS.body};
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  main, #root { font-size: inherit; }

  h1, h2, h3 {
    font-family: ${FONTS.heading};
    line-height: 1.15;
    letter-spacing: 0.2px;
  }

  p { max-width: var(--maxcopy); }

  ::selection { background: ${COLORS.primary}; color: white; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.offWhite}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.steel}; border-radius: 3px; }

  @media (max-width: 768px) {
    html { font-size: 18px; }
    :root { --maxcopy: 60ch; }
  }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .lever-expand { animation: fadeIn 0.2s ease-out forwards; }
  /* Range slider – clear “lever” affordance */
  input[type="range"].scorer-range {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }
  input[type="range"].scorer-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    background: ${COLORS.gold};
    border: 2px solid white;
    border-radius: 50%;
    cursor: grab;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
  input[type="range"].scorer-range::-webkit-slider-thumb:active { cursor: grabbing; }
  input[type="range"].scorer-range::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background: ${COLORS.gold};
    border: 2px solid white;
    border-radius: 50%;
    cursor: grab;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
  input[type="range"].scorer-range::-moz-range-track {
    height: 10px;
    border-radius: 5px;
    background: transparent;
  }
`;

// ─── COMPONENTS ─────────────────────────────────────────────

function SeverityBadge({ severity }) {
  const s = SEVERITY_STYLE[severity];
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "3px", fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", color: s.text, background: s.bg, border: `1px solid ${s.border}` }}>
      {severity}
    </span>
  );
}

function TimingBadge({ timing }) {
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "3px", fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 500, letterSpacing: "0.5px", color: "white", background: TIMING_COLORS[timing] || COLORS.ongoing }}>
      {timing}
    </span>
  );
}

function DomainTag({ domain }) {
  const d = DOMAINS[domain];
  return (
    <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "3px", fontSize: "0.75rem", fontFamily: FONTS.body, fontWeight: 500, color: d.color, background: `${d.color}15`, border: `1px solid ${d.color}30` }}>
      {d.short}
    </span>
  );
}

function CTAButton({ text, small, variant, style: extraStyle }) {
  const isPrimary = variant !== "secondary";
  const bg = isPrimary ? COLORS.gold : "transparent";
  const color = isPrimary ? "white" : COLORS.gold;
  const border = isPrimary ? "none" : `2px solid ${COLORS.gold}`;
  const hoverBg = isPrimary ? "#A07D2E" : `${COLORS.gold}15`;
  return (
    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: small ? "10px 22px" : "12px 28px", background: bg, color, fontFamily: FONTS.body, fontSize: small ? "0.9rem" : "1rem", fontWeight: 600, borderRadius: "4px", textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border, ...extraStyle }}
      onMouseEnter={e => { e.target.style.background = hoverBg; }}
      onMouseLeave={e => { e.target.style.background = bg; }}>
      {text || "15-Minute Fit Check"}
    </a>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "14px" : "36px" }}>
      <h2 style={{ fontFamily: FONTS.heading, fontSize: sub ? "1.1rem" : "1.5rem", fontWeight: 700, color: COLORS.navy, lineHeight: 1.3 }}>{children}</h2>
    </div>
  );
}

function Card({ children, style: extraStyle }) {
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: "8px", padding: "28px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...extraStyle }}>
      {children}
    </div>
  );
}

// ─── NAVIGATION ─────────────────────────────────────────────
function Nav({ page, setPage }) {
  const items = [
    { key: "levers", label: "Levers" },
    { key: "services", label: "Services" },
    { key: "framework", label: "Framework" },
    { key: "scorer", label: "Scorer" },
    { key: "about", label: "About" },
  ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.primary, borderBottom: `3px solid ${COLORS.gold}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px", minHeight: "76px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <img
          src="/Devonshire_Operations_Logo_Exact_Transparent.png"
          alt="Devonshire Operations"
          style={{ height: "34px", cursor: "pointer" }}
          onClick={() => setPage("levers")}
        />
        <div style={{ width: "1px", height: "36px", background: "#334155" }} />
        <div style={{ display: "flex", gap: "4px" }}>
          {items.map(({ key, label }) => (
            <button key={key} onClick={() => setPage(key)}
              style={{ background: page === key ? `${COLORS.gold}20` : "transparent", border: "none", padding: "10px 16px", borderRadius: "4px", color: page === key ? COLORS.gold : "#CBD5E0", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.3px" }}
              onMouseEnter={e => { if (page !== key) e.target.style.color = "white"; }}
              onMouseLeave={e => { if (page !== key) e.target.style.color = "#CBD5E0"; }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <CTAButton text="15-Minute Fit Check" />
    </nav>
  );
}

// ─── HERO BLOCK ─────────────────────────────────────────────
function HeroBlock({ setPage }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, margin: "-40px -24px 32px", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      {/* Subtle grid texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />

      <div style={{ position: "relative", maxWidth: "720px" }}>
        {/* Tagline */}
        <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
          Portfolio Operations · Pre-Close Diligence · Post-Close Stabilization
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "20px" }}>
          Operational red flags that standard diligence misses — and the governance baseline for the first 100 days.
        </h1>

        {/* Three bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {[
            "Ops Diligence Report: risk-rated findings memo for the IC. 2–3 weeks.",
            "100-Day Stabilization Plan: incident command, change control, KPIs, vendor governance, board reporting.",
            "For PE funds, operating partners, and independent sponsors evaluating or managing portfolio companies.",
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: COLORS.gold, fontSize: "0.95rem", lineHeight: "28px", flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Credibility line */}
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: "28px", paddingLeft: "1px" }}>
          15+ years running "cannot go down" trading operations across JP Morgan, Barclays, Bank of America, and Lazard — building incident command, change governance, and KPI control towers across multi-manager platforms managing $10B+ in assets.
        </p>

        {/* Dual CTAs */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <CTAButton text="15-Minute Fit Check" />
          <CTAButton text="View Services & Pricing" variant="secondary"
            style={{ border: `2px solid ${COLORS.gold}`, color: COLORS.gold }}
          />
        </div>
      </div>
    </div>
  );
}

// Override the View Services button to navigate instead of linking to Calendly
function HeroBlockWithNav({ setPage }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${COLORS.heroGradientStart} 0%, ${COLORS.heroGradientEnd} 100%)`, margin: "-40px -24px 32px", padding: "48px 40px 44px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)" }} />
      <div style={{ position: "relative", maxWidth: "720px" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.gold, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
          Portfolio Operations · Pre-Close Diligence · Post-Close Stabilization
        </div>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "20px" }}>
          Operational red flags that standard diligence misses — and the governance baseline for the first 100 days.
        </h1>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: "24px" }}>
          15+ years building incident command, change governance, and KPI control towers across JP Morgan, Barclays, Bank of America, and Lazard.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {[
            "Ops Diligence Report: risk-rated findings memo for the IC. 2–3 weeks.",
            "100-Day Stabilization Plan: incident command, change control, KPIs, vendor governance, board reporting.",
            "For PE funds, operating partners, and independent sponsors evaluating or managing portfolio companies.",
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: COLORS.gold, fontSize: "0.95rem", lineHeight: "28px", flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "12px 28px", background: COLORS.gold, color: "white", fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: "4px", textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: "none" }}
            onMouseEnter={e => { e.target.style.background = "#A07D2E"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.gold; }}>
            15-Minute Fit Check
          </a>
          <button onClick={() => setPage("services")} style={{ display: "inline-block", padding: "12px 28px", background: "transparent", color: COLORS.gold, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, borderRadius: "4px", textDecoration: "none", letterSpacing: "0.3px", transition: "all 0.2s", cursor: "pointer", border: `2px solid ${COLORS.gold}` }}
            onMouseEnter={e => { e.target.style.background = `${COLORS.gold}15`; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}>
            View Services & Pricing
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DOMAIN LEGEND ──────────────────────────────────────────
function DomainLegend() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.steel, display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
        <span style={{ fontSize: "0.9rem" }}>{open ? "▾" : "▸"}</span>
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
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, color: COLORS.charcoal }}>{v.name}</span>
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, marginTop: "2px", lineHeight: 1.45 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LEVER EXPLORER PAGE ────────────────────────────────────
function LeverExplorer({ setPage }) {
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

  const selectStyle = { padding: "10px 14px", border: `1px solid ${COLORS.border}`, borderRadius: "4px", fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, background: "white", cursor: "pointer", minWidth: "160px" };

  return (
    <div className="fade-in">
      <HeroBlockWithNav setPage={setPage} />

      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontFamily: FONTS.heading, fontSize: "1.4rem", fontWeight: 700, color: COLORS.navy, marginBottom: "12px" }}>
          Operational Friction Lever Explorer
        </h2>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted, lineHeight: 1.65, maxWidth: "720px" }}>
          {LEVERS.length} operational friction points across 6 domains — with severity ratings, symptoms, and PE impact analysis. The levers show <em>what</em> is broken and <em>why</em> it matters. The remediation playbooks — the <em>how</em> — are delivered in the engagement.
        </p>
      </div>

      <DomainLegend />

      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted, marginBottom: "14px", fontStyle: "italic" }}>
        Filter by timing (Pre-Close vs. First 100 Days), domain, or severity. Open any lever for symptoms and PE impact analysis.
      </p>

      {/* Filters */}
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

      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted, marginBottom: "18px" }}>
        Showing {filtered.length} of {LEVERS.length} levers
      </p>

      {/* Lever cards */}
      {filtered.map((lever, idx) => (
        <div key={lever.id}>
          <div style={{ background: COLORS.white, border: `1px solid ${expanded === lever.id ? COLORS.steel : COLORS.border}`, borderRadius: "6px", marginBottom: "8px", transition: "all 0.15s", cursor: "pointer" }}
            onClick={() => setExpanded(expanded === lever.id ? null : lever.id)}>
            <div style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.steel, width: "20px", flexShrink: 0 }}>
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
                    <button onClick={() => setPage("scorer")} style={{ background: "none", border: "none", fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, cursor: "pointer", textDecoration: "underline" }}>→ Assess your readiness</button>
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.gold, textDecoration: "underline" }}>→ 15-Minute Fit Check</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mid-page CTA after 5th lever */}
          {idx === 4 && filtered.length > 5 && (
            <div style={{ margin: "12px 0 16px", padding: "16px 24px", background: `linear-gradient(135deg, ${COLORS.navy}08 0%, ${COLORS.gold}08 100%)`, border: `1px solid ${COLORS.border}`, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, margin: 0 }}>
                <strong style={{ color: COLORS.navy }}>Want the red-flag memo format?</strong> See exactly what the Ops Diligence Report delivers.
              </p>
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <button onClick={() => setPage("services")} style={{ padding: "7px 18px", background: COLORS.navy, color: "white", border: "none", borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                  View Services & Pricing
                </button>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ padding: "7px 18px", background: COLORS.gold, color: "white", border: "none", borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
                  15-Minute Fit Check
                </a>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Bottom CTA */}
      <Card style={{ textAlign: "center", marginTop: "24px", background: `${COLORS.navy}05`, padding: "28px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginBottom: "16px" }}>
          Recognizing these patterns in a target or portfolio company?
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton text="15-Minute Fit Check" />
          <button onClick={() => setPage("services")} style={{ display: "inline-block", padding: "12px 28px", background: "transparent", color: COLORS.navy, fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, borderRadius: "4px", border: `2px solid ${COLORS.navy}`, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = `${COLORS.navy}08`; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}>
            View Services & Pricing
          </button>
        </div>
      </Card>
    </div>
  );
}

// ─── FRAMEWORK PAGE ─────────────────────────────────────────
function FrameworkPage({ setPage }) {
  return (
    <div className="fade-in" style={{ maxWidth: "760px" }}>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.6rem", fontWeight: 700, color: COLORS.navy, marginBottom: "12px" }}>
        Operational Friction Evaluation Framework
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "8px" }}>
        A structured methodology for diagnosing where execution friction is degrading portfolio company performance — and prioritizing interventions by EBITDA impact, execution risk, and timeline to proof.
      </p>
      {/* Bridge to Services */}
      <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.steel, lineHeight: 1.6, marginBottom: "32px" }}>
        This is the method behind the{" "}
        <span onClick={() => setPage("services")} style={{ color: COLORS.gold, cursor: "pointer", textDecoration: "underline" }}>Ops Diligence Report and 100-Day Plan</span>.
      </p>

      <SectionTitle>Why Operational Friction Matters in PE</SectionTitle>
      <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "32px" }}>
        <p style={{ marginBottom: "16px" }}>Operational friction is the gap between the value creation plan and what actually gets executed. It's why 100-day plans stall, why EBITDA improvements take 18 months instead of 6, and why exit processes surface risks that should have been addressed years earlier.</p>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { title: "Leverage amplifies friction.", body: "Debt service leaves no margin for extended firefighting or missed targets. An operational disruption that a public company absorbs becomes a covenant risk for a levered portfolio company." },
              { title: "Hold periods create urgency.", body: "Every month spent stabilizing is a month not spent on growth initiatives. Friction in Year 1 compounds into missed EBITDA targets in Year 3." },
              { title: "Exit narratives are built on operational credibility.", body: "The next buyer's diligence team will audit incident history, vendor dependencies, governance maturity, and operational metrics. Unresolved friction becomes a multiple discount." },
            ].map((item, i) => (
              <div key={i} style={{ paddingLeft: "16px", borderLeft: `3px solid ${COLORS.gold}` }}>
                <strong style={{ color: COLORS.navy }}>{item.title}</strong>
                <span style={{ color: COLORS.charcoal }}> {item.body}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <SectionTitle>The Friction Evaluation Rubric</SectionTitle>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "16px" }}>
        Each operational friction lever is evaluated across six dimensions:
      </p>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONTS.body, fontSize: "0.8rem" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
              {["Criterion", "What It Tests", "Scoring", "Action Trigger"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: COLORS.navy, fontSize: "0.75rem", letterSpacing: "0.3px" }}>{h}</th>
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
                <td style={{ padding: "8px 10px", fontWeight: 600, color: COLORS.charcoal, whiteSpace: "nowrap", fontSize: "0.8rem" }}>{c}</td>
                <td style={{ padding: "8px 10px", color: COLORS.charcoal }}>{w}</td>
                <td style={{ padding: "8px 10px", fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel }}>{s}</td>
                <td style={{ padding: "8px 10px", fontSize: "0.75rem", color: COLORS.navy, fontWeight: 500 }}>{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.steel, lineHeight: 1.6, marginBottom: "24px", fontStyle: "italic" }}>
        Levers scoring well on EBITDA Impact + Time to Proof + Low Attention Load are highest-priority quick wins. Strong Exit Story Impact with longer timelines are strategic investments.
      </p>

      {/* Worked example */}
      <Card style={{ borderLeft: `4px solid ${COLORS.highText}`, marginBottom: "32px" }}>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel, letterSpacing: "0.5px", textTransform: "uppercase" }}>Worked Example</span>
        </div>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "12px" }}>
          "No Change Advisory Board or Change Control Process"
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
          {[
            { label: "EBITDA Impact", value: "Direct", color: COLORS.criticalText },
            { label: "Time to Proof", value: "< 30 days", color: COLORS.stable },
            { label: "Execution Certainty", value: "High", color: COLORS.stable },
            { label: "Exit Story Impact", value: "Strengthens", color: COLORS.stable },
            { label: "Reversibility", value: "Easily", color: COLORS.stable },
            { label: "Attention Load", value: "Low", color: COLORS.stable },
          ].map((item, i) => (
            <div key={i} style={{ padding: "8px 10px", background: COLORS.offWhite, borderRadius: "4px" }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel, marginBottom: "2px" }}>{item.label}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65 }}>
          <p style={{ marginBottom: "8px" }}>
            <strong style={{ color: COLORS.navy }}>Pre-close implication:</strong> Uncontrolled changes are the #1 cause of production incidents. If the target has no change control, flag it in the diligence memo — this is direct EBITDA drag hiding in incident correlation data.
          </p>
          <p>
            <strong style={{ color: COLORS.navy }}>First 100 days implication:</strong> Install a lightweight CAB within the first two weeks. This is a high-certainty, low-attention, fast-proof intervention — the textbook quick win. Change-incident correlation tracking starts producing board-ready data within 30 days.
          </p>
        </div>
      </Card>

      {/* Mid-page CTA */}
      <div style={{ margin: "0 0 32px", padding: "16px 24px", background: `linear-gradient(135deg, ${COLORS.navy}08 0%, ${COLORS.gold}08 100%)`, border: `1px solid ${COLORS.border}`, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, margin: 0 }}>
          <strong style={{ color: COLORS.navy }}>Want this analysis for a specific target?</strong> The Ops Diligence Report scores every lever against this rubric.
        </p>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <button onClick={() => setPage("services")} style={{ padding: "7px 18px", background: COLORS.navy, color: "white", border: "none", borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>View Services & Pricing</button>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ padding: "7px 18px", background: COLORS.gold, color: "white", border: "none", borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>15-Minute Fit Check</a>
        </div>
      </div>

      <SectionTitle>The Stabilization Sequence</SectionTitle>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "16px" }}>
        Operational stabilization follows a consistent three-phase sequence regardless of portfolio company size or sector:
      </p>
      {[
        { phase: "Phase 1: Visibility", days: "Days 1–14", desc: "You can't fix what you can't see. Establish baseline visibility into what's actually happening — not what management says is happening.", items: ["Incident volume, severity, MTTR, recurrence rate", "Change frequency, failure rate, rollback frequency", "Vendor inventory, contract terms, concentration exposure", "Current compliance posture vs. stated posture"], deliverable: "Baseline assessment memo + operational risk heatmap" },
        { phase: "Phase 2: Control", days: "Days 15–45", desc: "Install the minimum governance gates that prevent new damage from accumulating while you address existing debt.", items: ["Incident command structure with severity classification", "Change control process with risk classification", "Escalation paths with defined thresholds", "Access review and vendor oversight cadence"], deliverable: "CAB charter + severity policy + escalation matrix" },
        { phase: "Phase 3: Cadence", days: "Days 45–100", desc: "Governance installed ad hoc decays without rhythm. Build the operating cadence that makes stability self-sustaining.", items: ["Weekly operating review with defined KPIs and thresholds", "Monthly board-ready reporting package", "Quarterly vendor scorecards and control testing", "Postmortem → recurrence prevention → backlog loop"], deliverable: "Board ops dashboard + first QBR pack + audit evidence index" },
      ].map((p, i) => (
        <Card key={i} style={{ borderLeft: `4px solid ${[COLORS.steel, COLORS.navy, COLORS.gold][i]}`, marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
            <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy }}>{p.phase}</h3>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", color: COLORS.steel }}>{p.days}</span>
          </div>
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "10px" }}>{p.desc}</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
            {p.items.map((item, j) => <li key={j} style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "2px" }}>{item}</li>)}
          </ul>
          <div style={{ padding: "8px 12px", background: COLORS.offWhite, borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel, letterSpacing: "0.5px", textTransform: "uppercase", flexShrink: 0 }}>Deliverable</span>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, fontWeight: 500 }}>{p.deliverable}</span>
          </div>
        </Card>
      ))}
      <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.steel, marginTop: "16px", marginBottom: "32px", fontStyle: "italic" }}>
        After Day 100, the Control Tower Retainer takes over — maintaining the cadence, running the operating rhythm, and ensuring the portfolio company doesn't drift back.
      </p>

      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <CTAButton text="15-Minute Fit Check" />
      </div>
    </div>
  );
}

// ─── SCORER PAGE ────────────────────────────────────────────
function ScorerPage() {
  const [context, setContext] = useState(null);
  const [scores, setScores] = useState({ incident: 3, change: 3, vendor: 3, audit: 3, kpi: 3, process: 3 });
  const [showResults, setShowResults] = useState(false);

  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
  const rating = avg >= 4 ? "stable" : avg >= 2.5 ? "atRisk" : "critical";
  const ratingLabel = { stable: "STABLE", atRisk: "AT RISK", critical: "CRITICAL" }[rating];
  const ratingColor = { stable: COLORS.stable, atRisk: COLORS.atRisk, critical: COLORS.critical }[rating];

  const chartData = SCORER_DIMS.map(d => ({ subject: d.short, score: scores[d.key], fullMark: 5 }));
  const lowDims = SCORER_DIMS.filter(d => scores[d.key] <= 2);

  return (
    <div className="fade-in" style={{ maxWidth: "800px" }}>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.7rem", fontWeight: 700, color: COLORS.navy, marginBottom: "14px" }}>
        Portfolio Stability Readiness Scorer
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted, lineHeight: 1.65, marginBottom: "36px" }}>
        Assess a portfolio company's operational stability across 6 dimensions. Identify where friction is highest and which interventions would create the most value.
      </p>

      <Card>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "12px" }}>What's your situation?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {CONTEXT_OPTIONS.map(opt => (
            <label key={opt.key} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "8px 12px", borderRadius: "4px", background: context === opt.key ? `${COLORS.navy}08` : "transparent", border: `1px solid ${context === opt.key ? COLORS.steel : "transparent"}` }}>
              <input type="radio" name="context" checked={context === opt.key} onChange={() => setContext(opt.key)} style={{ accentColor: COLORS.navy }} />
              <span style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal }}>{opt.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {context && (
        <div style={{ marginTop: "24px" }}>
          <SectionTitle sub>Score each dimension (1–5)</SectionTitle>
          {SCORER_DIMS.map(dim => (
            <Card key={dim.key} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.95rem", color: COLORS.navy }}>{dim.label}</h4>
                <span style={{ fontFamily: FONTS.body, fontSize: "1.2rem", fontWeight: 700, color: scores[dim.key] <= 2 ? COLORS.critical : scores[dim.key] <= 3 ? COLORS.atRisk : COLORS.stable }}>
                  {scores[dim.key]}
                </span>
              </div>
              <input
                type="range"
                className="scorer-range"
                min={1}
                max={5}
                step={1}
                value={scores[dim.key]}
                onChange={e => setScores({ ...scores, [dim.key]: parseInt(e.target.value) })}
                style={{
                  width: "100%",
                  background: `linear-gradient(to right, ${COLORS.steel} 0%, ${COLORS.steel} ${((scores[dim.key] - 1) / 4) * 100}%, ${COLORS.border} ${((scores[dim.key] - 1) / 4) * 100}%, ${COLORS.border} 100%)`,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", gap: "12px" }}>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted, maxWidth: "42%", lineHeight: 1.4 }}>{dim.low}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted, maxWidth: "42%", textAlign: "right", lineHeight: 1.4 }}>{dim.high}</span>
              </div>
            </Card>
          ))}

          {!showResults && (
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button onClick={() => setShowResults(true)}
                style={{ padding: "12px 36px", background: COLORS.navy, color: "white", border: "none", borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.3px" }}>
                View Results
              </button>
            </div>
          )}
        </div>
      )}

      {showResults && (
        <div className="fade-in" style={{ marginTop: "32px" }}>
          <SectionTitle>Assessment Results</SectionTitle>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
            <Card style={{ flex: "1 1 340px", minHeight: "320px" }}>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke={COLORS.border} />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontFamily: FONTS.body, fill: COLORS.charcoal }} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: COLORS.steel }} />
                  <Radar name="Score" dataKey="score" stroke={COLORS.navy} fill={COLORS.navy} fillOpacity={0.4} strokeWidth={2} dot={{ r: 4, fill: COLORS.navy }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
            <Card style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: `4px solid ${ratingColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <span style={{ fontFamily: FONTS.body, fontSize: "1.6rem", fontWeight: 700, color: ratingColor }}>{avg.toFixed(1)}</span>
              </div>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: ratingColor, letterSpacing: "1px", marginBottom: "12px" }}>{ratingLabel}</span>
              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.6 }}>
                {CONTEXT_CALLOUTS[rating][context]}
              </p>
            </Card>
          </div>
          {lowDims.length > 0 && (
            <Card style={{ borderLeft: `4px solid ${COLORS.critical}`, marginBottom: "24px" }}>
              <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.95rem", color: COLORS.critical, marginBottom: "12px" }}>Critical Gaps Identified</h4>
              {lowDims.map(dim => (
                <div key={dim.key} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.charcoal }}>{dim.label}</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.critical, marginLeft: "8px" }}>Score: {scores[dim.key]}/5</span>
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, marginTop: "4px" }}>Current state: {dim.low}</p>
                </div>
              ))}
            </Card>
          )}
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <CTAButton text="15-Minute Fit Check" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SERVICES PAGE ──────────────────────────────────────────
function ServicesPage() {
  return (
    <div className="fade-in" style={{ maxWidth: "800px" }}>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: "16px" }}>
        Services
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted, lineHeight: 1.65, marginBottom: "36px" }}>
        Operational support for PE funds and portfolio companies — from pre-close diligence through post-close stabilization to ongoing governance.
      </p>

      {/* Pricing overview */}
      <Card style={{ marginBottom: "32px", background: `${COLORS.navy}05` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { label: "Pre-Close", name: "Ops Diligence Report", price: "$15K+", time: "2–3 weeks", desc: "Standalone assessment" },
            { label: "Full Lifecycle Bundle", name: "Diligence + 100-Day Plan", price: "$25–$35K", time: "2–3 weeks + 100 days", desc: "Recommended — seamless transition" },
            { label: "Post-Close Only", name: "100-Day Stabilization", price: "$30–$40K", time: "100 days", desc: "No prior diligence" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "16px", background: COLORS.white, borderRadius: "4px", border: `1px solid ${i === 1 ? COLORS.gold : COLORS.border}`, position: "relative" }}>
              {i === 1 && <div style={{ position: "absolute", top: "-1px", left: 0, right: 0, height: "3px", background: COLORS.gold, borderRadius: "4px 4px 0 0" }} />}
              <span style={{ fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel, letterSpacing: "0.5px", textTransform: "uppercase" }}>{item.label}</span>
              <div style={{ fontFamily: FONTS.heading, fontSize: "0.95rem", color: COLORS.navy, fontWeight: 700, margin: "8px 0 4px" }}>{item.name}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, fontWeight: 700, marginBottom: "4px" }}>{item.price}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted }}>{item.time}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted, marginTop: "4px", fontStyle: "italic" }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px", padding: "16px 20px", background: `${COLORS.gold}08`, borderRadius: "6px", border: `1px solid ${COLORS.gold}30` }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, lineHeight: 1.65, marginBottom: "10px" }}>
            <strong style={{ color: COLORS.navy }}>Recommended:</strong> The bundle is the best path if you expect to close — diligence findings feed directly into the stabilization plan with no re-learning, compressing Day-1 readiness.
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, lineHeight: 1.65 }}>
            <strong style={{ color: COLORS.navy }}>Ongoing:</strong> All engagements can transition to a <strong style={{ color: COLORS.charcoal }}>Control Tower Retainer</strong> at <strong style={{ fontFamily: FONTS.body, color: COLORS.navy }}>$7.5K+/month</strong> — the weekly operating rhythm, escalation support, and compliance cadence that keeps the portfolio company from drifting back.
          </p>
        </div>
        {/* Sample report CTA */}
        <div style={{ marginTop: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, fontWeight: 500, textDecoration: "none", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.steel; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
            <span style={{ fontSize: "0.9rem" }}>📄</span> Request a sample red-flag memo
          </a>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: "4px", fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, fontWeight: 500, textDecoration: "none", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.steel; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
            <span style={{ fontSize: "0.9rem" }}>📋</span> Request a sample 100-day board pack outline
          </a>
        </div>
      </Card>

      {/* Process strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginBottom: "32px", border: `1px solid ${COLORS.border}`, borderRadius: "6px", overflow: "hidden" }}>
        {[
          { step: "1", title: "Fit Check", desc: "15-minute call. Assess the situation, confirm scope, and determine fit.", icon: "📞" },
          { step: "2", title: "Scoping + Data Request", desc: "Targeted data request. Fixed-fee proposal with timeline within 48 hours.", icon: "📋" },
          { step: "3", title: "Deliverable", desc: "Risk-rated findings memo or phased stabilization plan. Board-ready from day one.", icon: "📊" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "20px", background: COLORS.white, borderRight: i < 2 ? `1px solid ${COLORS.border}` : "none", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel, letterSpacing: "0.5px" }}>STEP {item.step}</span>
            </div>
            <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.95rem", color: COLORS.navy, marginBottom: "6px" }}>{item.title}</h4>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.charcoal, lineHeight: 1.55 }}>{item.desc}</p>
            {i < 2 && <span style={{ position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem", color: COLORS.steel, zIndex: 1, background: COLORS.white, padding: "2px" }}>→</span>}
          </div>
        ))}
      </div>

      {/* Detailed offers */}
      {[
        { tag: "PRE-CLOSE", name: "Ops Diligence Report", tagline: "Operational clarity before you close.",
          who: "PE funds, independent sponsors, and deal teams evaluating an acquisition target's operational risk profile.",
          problem: "Financial and commercial diligence is rigorous. Operational diligence often isn't. Vendor dependencies, key-person risk, incident history, governance gaps, and compliance posture are either under-examined or assessed by generalists who don't know what to look for.",
          deliverables: ["Operational risk assessment: friction points standard diligence misses", "Infrastructure and vendor dependency mapping with concentration risk analysis", "Key-person risk and organizational resilience evaluation", "Incident and change history analysis (pattern recognition, not just counts)", "Compliance posture gap assessment (stated vs. documented vs. practiced)", "Risk-rated findings memo for the investment committee, mapped to the value creation plan"],
          excludes: ["Tools implementation or platform migration", "Vendor renegotiation or contract execution", "On-site presence (remote delivery; on-site available at additional cost)", "Legal, tax, or financial diligence"],
          timeline: "2–3 weeks", price: "Starting at $15,000",
          next: "If the deal closes, diligence findings feed directly into the 100-Day Stabilization Plan — no ramp-up, no re-learning. Bundle pricing ($25–$35K) rewards early engagement." },
        { tag: "POST-CLOSE", name: "100-Day Stabilization Plan", tagline: "Install operational governance in the first 100 days.",
          who: "PE-backed portfolio companies in the first 100 days post-close — or any time operational friction is dragging on performance.",
          problem: "New ownership creates urgency. The board wants KPIs. The value creation plan assumes operational stability. But the portfolio company has no incident command, no change governance, no vendor oversight, and no board-ready reporting.",
          deliverables: ["100-day operating plan mapped to the value creation thesis", "KPI cadence installation: board-ready operational metrics from Day 1", "Incident command and change governance baseline", "Vendor inventory, scorecard framework, and renewal calendar", "Quick wins: cost takeout and efficiency opportunities with measurable impact", "Audit-ready artifact pack: evidence index, control documentation, compliance baseline"],
          excludes: ["Tools procurement or platform implementation", "Vendor contract negotiation or execution", "Full-time on-site staffing (weekly on-site cadence available at additional cost)", "Hiring, HR, or organizational restructuring"],
          timeline: "100 days (Visibility → Control → Cadence)", price: "Starting at $25,000 bundled with Diligence Report. Standalone: starting at $30,000.",
          next: "Most engagements transition to a Control Tower Retainer — maintaining the operating cadence and ensuring the portfolio company doesn't drift back." },
        { tag: "ONGOING", name: "Control Tower Retainer", tagline: "Portco control tower for stabilization and board reporting.",
          who: "Portfolio companies that need ongoing operational leadership without a full-time hire.",
          problem: "Governance installed without ongoing ownership decays. The operating cadence slips. Postmortems stop. Vendor scorecards go stale. The portfolio company quietly drifts back to the pre-intervention baseline.",
          deliverables: ["Weekly operating review + KPI reporting to management and the board", "Incident/problem management: postmortems, recurrence prevention, escalation support", "Change governance: CAB facilitation, risk classification, deployment oversight", "Vendor control: scorecards, renewal management, SLA hygiene", "Audit & compliance cadence: evidence trails, quarterly control testing", "Ongoing advisory: prioritization, risk trade-offs, operational decisions"],
          excludes: ["Full-time embedded headcount", "Tools implementation or engineering execution", "Vendor contract negotiation on your behalf"],
          timeline: "Weekly operating rhythm + on-call escalation", price: "Starting at $7,500/month", next: null },
      ].map((offer, i) => (
        <Card key={i} style={{ marginBottom: "24px", borderLeft: `4px solid ${[COLORS.steel, COLORS.navy, COLORS.gold][i]}` }}>
          <span style={{ fontFamily: FONTS.body, fontSize: "0.65rem", color: COLORS.steel, letterSpacing: "0.5px", textTransform: "uppercase" }}>{offer.tag}</span>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, margin: "8px 0 4px" }}>{offer.name}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.steel, fontStyle: "italic", marginBottom: "16px" }}>{offer.tagline}</p>
          <h4 style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, color: COLORS.navy, marginBottom: "4px", letterSpacing: "0.3px", textTransform: "uppercase" }}>Who it's for</h4>
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "12px" }}>{offer.who}</p>
          <h4 style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, color: COLORS.navy, marginBottom: "4px", letterSpacing: "0.3px", textTransform: "uppercase" }}>The problem</h4>
          <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "12px" }}>{offer.problem}</p>
          <h4 style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, color: COLORS.navy, marginBottom: "4px", letterSpacing: "0.3px", textTransform: "uppercase" }}>What you get</h4>
          <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
            {offer.deliverables.map((d, j) => <li key={j} style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "4px" }}>{d}</li>)}
          </ul>
          <h4 style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 600, color: COLORS.steel, marginBottom: "4px", letterSpacing: "0.3px", textTransform: "uppercase" }}>Does not include</h4>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            {offer.excludes.map((ex, j) => <li key={j} style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, lineHeight: 1.6, marginBottom: "2px" }}>{ex}</li>)}
          </ul>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", padding: "12px 0", borderTop: `1px solid ${COLORS.border}` }}>
            <div>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", color: COLORS.steel, textTransform: "uppercase", letterSpacing: "0.5px" }}>Timeline</span>
              <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, fontWeight: 500 }}>{offer.timeline}</div>
            </div>
            <div>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.75rem", color: COLORS.steel, textTransform: "uppercase", letterSpacing: "0.5px" }}>Investment</span>
              <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, fontWeight: 600 }}>{offer.price}</div>
            </div>
          </div>
          {offer.next && (
            <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, fontStyle: "italic", marginTop: "8px" }}>{offer.next}</p>
          )}
        </Card>
      ))}

      <Card style={{ textAlign: "center", background: `${COLORS.navy}05`, padding: "32px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "16px" }}>
          Not sure where to start? Book a 15-minute fit check. We'll assess the portfolio company's situation, identify the highest-priority friction points, and scope the right engagement — proposal within 24 hours.
        </p>
        <CTAButton text="15-Minute Fit Check" />
      </Card>
    </div>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="fade-in" style={{ maxWidth: "700px" }}>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: "32px" }}>About</h1>

      <SectionTitle sub>What I Do</SectionTitle>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "14px" }}>
        I help PE funds and portfolio companies eliminate the operational friction that erodes EBITDA, extends hold periods, and creates risk that surfaces too late. From pre-close diligence through post-close stabilization to ongoing governance — I install the operating discipline that makes value creation plans actually executable.
      </p>
      <div style={{ padding: "14px 18px", background: `${COLORS.navy}06`, border: `1px solid ${COLORS.border}`, borderRadius: "6px", marginBottom: "20px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.navy, lineHeight: 1.6, margin: 0 }}>
          <strong>Best fit:</strong> Lower-middle-market PE funds, independent sponsors, and family offices doing control deals where operational risk can break the value creation plan.
        </p>
      </div>
      {/* Above-fold CTA */}
      <div style={{ marginBottom: "32px" }}>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 24px", background: COLORS.gold, color: "white", fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, borderRadius: "4px", textDecoration: "none", transition: "all 0.2s", cursor: "pointer" }}
          onMouseEnter={e => { e.target.style.background = "#A07D2E"; }}
          onMouseLeave={e => { e.target.style.background = COLORS.gold; }}>
          15-Minute Fit Check
        </a>
      </div>

      <SectionTitle sub>How I Work</SectionTitle>
      <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px" }}>
        <p style={{ marginBottom: "12px" }}>For funds evaluating targets, I run an <strong>Ops Diligence Report</strong> that surfaces the friction points standard diligence misses — and delivers a risk-rated findings memo to the investment committee.</p>
        <p style={{ marginBottom: "12px" }}>Post-close, I execute a <strong>100-Day Stabilization Plan</strong>: install incident governance, change control, vendor oversight, KPI cadence, and board-ready reporting. Fast. Structured. Measurable from Day 1.</p>
        <p>For ongoing operational governance, I run a <strong>Control Tower Retainer</strong> — the weekly operating rhythm, escalation support, and compliance cadence that keeps the portfolio company from drifting back.</p>
      </div>

      <SectionTitle sub>Who I Am</SectionTitle>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px" }}>
        Hassan Tariq. 15+ years in platform operations across JP Morgan, Barclays, Bank of America, and Lazard — managing global trading operations, multi-billion dollar platform transformations, and operational risk at institutional scale. I'm currently completing my Executive MBA at Columbia Business School ('26), where I've sharpened a PE operator lens on the operational risks that derail value creation in the first 100 days.
      </p>

      <SectionTitle sub>Representative Outcomes</SectionTitle>
      <Card>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "16px", padding: "8px 12px", background: COLORS.offWhite, borderRadius: "4px" }}>
          Representative outcomes from prior institutional operating roles — not client engagements. All results from managing trading platforms with $10B+ in assets under management. Ranges vary by baseline and scope. Details and references available on request.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { metric: "~60%", label: "Reduction in critical outages over 8 months" },
            { metric: "~94% → 99%", label: "Uptime improvement" },
            { metric: "$2M+", label: "Annual run-rate savings via vendor consolidation" },
            { metric: "~31%", label: "MTTR reduction" },
            { metric: "~67%", label: "Incident volume reduction" },
            { metric: "~17%", label: "Compliance error reduction" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "12px", borderLeft: `3px solid ${COLORS.gold}` }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "1.1rem", fontWeight: 700, color: COLORS.navy }}>{item.metric}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.steel, marginTop: "4px" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginBottom: "18px" }}>
          15 minutes. We'll assess the portfolio company's situation and scope the right engagement.
        </p>
        <CTAButton text="15-Minute Fit Check" />
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("levers");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const pages = {
    levers: <LeverExplorer setPage={setPage} />,
    services: <ServicesPage />,
    framework: <FrameworkPage setPage={setPage} />,
    scorer: <ScorerPage />,
    about: <AboutPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.offWhite, fontFamily: FONTS.body }}>
      <Nav page={page} setPage={setPage} />
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 32px 80px" }}>
        {pages[page]}
      </main>
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "24px", textAlign: "center", background: COLORS.white }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.bodyMuted }}>
          © {new Date().getFullYear()} Devonshire Operations. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
