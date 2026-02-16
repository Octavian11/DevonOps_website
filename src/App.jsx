import { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

// ─── CONSTANTS ──────────────────────────────────────────────
const CALENDLY = "https://calendly.com/hassantariq1/15-minute-triage-call-hassan-tariq";
const PDF_OPS_DILIGENCE_SCORECARD = "/pdfs/ops-diligence-scorecard.pdf";
const PDF_100_DAY_STABILIZATION_PLAN = "/pdfs/100-day-stabilization-plan.pdf";
const CONTACT_EMAIL = "hassan@devonshireops.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/hassantar/";
const SAMPLE_SCORECARD_PDF = "/sample-ops-diligence-scorecard.pdf";
const SAMPLE_100DAY_PDF = "/sample-100-day-stabilization-plan.pdf";
const PDF_SCORECARD = "/pdfs/ops-diligence-scorecard.pdf";
const PDF_100DAY = "/pdfs/100-day-stabilization-plan.pdf";
const NDA_NOTE = "NDA-friendly. Minimal data handling. Anonymized formats accepted.";

function mailtoHref(subject, body) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

const COLORS = {
  navy: "#14213D",
  steel: "#43617D",
  gold: "#B8860B",
  offWhite: "#FCFCFC",
  charcoal: "#0A0A0A",  // Dark black for body text
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
  stable: {
    pre: "Operational posture appears mature. Validate with targeted diligence, but the risk profile is favorable.",
    post: "Operations are well-governed. Focus on optimization and durability for exit diligence.",
    mid: "Strong operational foundation. Shift to efficiency and ensuring the posture is durable through exit preparation.",
  },
  atRisk: {
    pre: "Operational friction is present and should be reflected in the value creation plan. Identify the top red flags and convert them into evidence requests and diligence asks.",
    post: "Friction is accumulating. Establish the governance baseline in the first 30 days: incident discipline, change control, and KPI cadence.",
    mid: "Operational drift is occurring. Re-establish governance discipline and cadence before exit preparation.",
  },
  critical: {
    pre: "Operational risk is material. These findings should inform deal terms and the Day-1 critical path. Recommend formal ops diligence before close.",
    post: "Immediate stabilization is needed. The first 30 days should prioritize incident command, change control, and board-ready KPI cadence.",
    mid: "Operational risk is material and will impact exit valuation. Immediate intervention is recommended to restore control and visibility.",
  },
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

// Standardized section heading - consistent across all pages
function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "16px" : "32px" }}>
      <h2 style={{
        fontFamily: FONTS.heading,
        fontSize: sub ? "1.25rem" : "1.75rem",  // Standardized: 1.75rem for main, 1.25rem for sub
        fontWeight: 700,
        color: COLORS.navy,
        lineHeight: 1.3,
        marginTop: 0
      }}>
        {children}
      </h2>
    </div>
  );
}

// Standardized two-button horizontal layout
function ButtonPair({
  primaryText = "15-Minute Fit Check",
  primaryAction,
  secondaryText,
  secondaryAction,
  primaryLink = CALENDLY,
  secondaryLink,
  centered = false
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",  // HORIZONTAL side-by-side
      gap: "12px",
      justifyContent: centered ? "center" : "flex-start",
      flexWrap: "wrap"
    }}>
      {/* Primary Navy Button */}
      {primaryLink ? (
        <a href={primaryLink} target="_blank" rel="noopener noreferrer"
           style={{
             display: "inline-block",
             padding: "14px 28px",
             background: COLORS.navy,
             color: "white",
             borderRadius: "6px",
             textDecoration: "none",
             fontFamily: FONTS.body,
             fontSize: "1rem",
             fontWeight: 600,
             textAlign: "center",
             transition: "all 0.2s",
             border: "none",
             whiteSpace: "nowrap"
           }}
           onMouseEnter={e => { e.target.style.background = "#0F1829"; }}
           onMouseLeave={e => { e.target.style.background = COLORS.navy; }}>
          {primaryText}
        </a>
      ) : (
        <button onClick={primaryAction}
           style={{
             display: "inline-block",
             padding: "14px 28px",
             background: COLORS.navy,
             color: "white",
             borderRadius: "6px",
             fontFamily: FONTS.body,
             fontSize: "1rem",
             fontWeight: 600,
             textAlign: "center",
             transition: "all 0.2s",
             border: "none",
             cursor: "pointer",
             whiteSpace: "nowrap"
           }}
           onMouseEnter={e => { e.target.style.background = "#0F1829"; }}
           onMouseLeave={e => { e.target.style.background = COLORS.navy; }}>
          {primaryText}
        </button>
      )}

      {/* Secondary Navy Border Button */}
      {(secondaryText || secondaryAction || secondaryLink) && (
        secondaryLink ? (
          <a href={secondaryLink} target="_blank" rel="noopener noreferrer"
             style={{
               display: "inline-block",
               padding: "14px 28px",
               background: "white",
               color: COLORS.navy,
               borderRadius: "6px",
               textDecoration: "none",
               fontFamily: FONTS.body,
               fontSize: "1rem",
               fontWeight: 600,
               textAlign: "center",
               border: `2px solid ${COLORS.navy}`,
               transition: "all 0.2s",
               whiteSpace: "nowrap"
             }}
             onMouseEnter={e => { e.target.style.background = `${COLORS.navy}08`; }}
             onMouseLeave={e => { e.target.style.background = "white"; }}>
            {secondaryText}
          </a>
        ) : (
          <button onClick={secondaryAction}
             style={{
               display: "inline-block",
               padding: "14px 28px",
               background: "white",
               color: COLORS.navy,
               borderRadius: "6px",
               fontFamily: FONTS.body,
               fontSize: "1rem",
               fontWeight: 600,
               textAlign: "center",
               border: `2px solid ${COLORS.navy}`,
               transition: "all 0.2s",
               cursor: "pointer",
               whiteSpace: "nowrap"
             }}
             onMouseEnter={e => { e.target.style.background = `${COLORS.navy}08`; }}
             onMouseLeave={e => { e.target.style.background = "white"; }}>
            {secondaryText}
          </button>
        )
      )}
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

// ─── TIMELINE-RAIL COMPONENT ────────────────────────────────
// Vertical timeline with progressive steps using brand colors
function TimelineRail({ items, compact = false }) {
  return (
    <div style={{ position: "relative", paddingLeft: compact ? "40px" : "60px" }}>
      {/* Vertical timeline line */}
      <div style={{
        position: "absolute",
        left: compact ? "15px" : "23px",
        top: "12px",
        bottom: "12px",
        width: "2px",
        background: COLORS.steel,
        zIndex: 0
      }} />

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isActive = item.active;
        const isCompleted = item.completed;

        // Node color logic: completed = steel, active = gold, pending = white with steel border
        let nodeColor = COLORS.white;
        let nodeBorder = COLORS.steel;
        let cardGlow = "none";

        if (isCompleted) {
          nodeColor = COLORS.steel;
          nodeBorder = COLORS.steel;
        } else if (isActive) {
          nodeColor = COLORS.gold;
          nodeBorder = COLORS.gold;
          cardGlow = `0 0 0 3px rgba(184, 134, 11, 0.15)`;
        } else {
          nodeColor = COLORS.white;
          nodeBorder = COLORS.steel;
        }

        return (
          <div key={i} style={{ position: "relative", marginBottom: isLast ? "0" : (compact ? "24px" : "32px") }}>
            {/* Timeline node */}
            <div style={{
              position: "absolute",
              left: compact ? "-32px" : "-46px",
              top: "12px",
              width: compact ? "16px" : "18px",
              height: compact ? "16px" : "18px",
              borderRadius: "50%",
              background: nodeColor,
              border: `3px solid ${nodeBorder}`,
              boxShadow: isActive ? `0 0 0 4px rgba(184, 134, 11, 0.1)` : "none",
              zIndex: 1
            }} />

            {/* Content card */}
            <div style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              padding: compact ? "16px" : "20px",
              boxShadow: `0 2px 8px rgba(20, 33, 61, 0.08), ${cardGlow}`,
              transition: "all 0.3s ease"
            }}>
              {/* Header row with title and meta */}
              {(item.title || item.meta) && (
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: item.description ? "8px" : "0",
                  gap: "12px",
                  flexWrap: "wrap"
                }}>
                  {item.title && (
                    <h3 style={{
                      fontFamily: FONTS.heading,
                      fontSize: compact ? "1rem" : "1.1rem",
                      color: COLORS.navy,
                      margin: 0,
                      flex: "1 1 auto"
                    }}>
                      {item.title}
                    </h3>
                  )}
                  {item.meta && (
                    <span style={{
                      fontFamily: FONTS.body,
                      fontSize: "0.9rem",
                      color: isActive ? COLORS.gold : COLORS.steel,
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      {item.meta}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p style={{
                  fontFamily: FONTS.body,
                  fontSize: "1rem",
                  color: COLORS.charcoal,
                  lineHeight: 1.65,
                  margin: item.items ? "0 0 12px 0" : "0"
                }}>
                  {item.description}
                </p>
              )}

              {/* Bullet list */}
              {item.items && item.items.length > 0 && (
                <ul style={{
                  paddingLeft: "20px",
                  margin: item.deliverable ? "0 0 12px 0" : "0"
                }}>
                  {item.items.map((subItem, j) => (
                    <li key={j} style={{
                      fontFamily: FONTS.body,
                      fontSize: "0.95rem",
                      color: COLORS.charcoal,
                      lineHeight: 1.65,
                      marginBottom: "4px"
                    }}>
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}

              {/* Deliverable badge */}
              {item.deliverable && (
                <div style={{
                  padding: "10px 14px",
                  background: COLORS.offWhite,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "12px"
                }}>
                  <span style={{
                    fontFamily: FONTS.body,
                    fontSize: "0.75rem",
                    color: COLORS.navy,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    Deliverable
                  </span>
                  <span style={{
                    fontFamily: FONTS.body,
                    fontSize: "0.95rem",
                    color: COLORS.charcoal,
                    fontWeight: 500
                  }}>
                    {item.deliverable}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SPLIT-CONTRAST COMPONENT ───────────────────────────────
// Left/right split showing problem vs solution, before vs after
function SplitContrast({ leftSide, rightSide, variant = "default" }) {
  // variant: "default", "vertical" (for mobile-first stacking)

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0",
      borderRadius: "8px",
      overflow: "hidden",
      border: `1px solid ${COLORS.border}`,
      minHeight: "300px",
      "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr"
      }
    }}>
      {/* LEFT SIDE - Problem/Risk (Navy background) */}
      <div style={{
        background: COLORS.navy,
        color: COLORS.offWhite,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}>
        {/* Title */}
        {leftSide.title && (
          <h3 style={{
            fontFamily: FONTS.heading,
            fontSize: "1.3rem",
            color: COLORS.gold,
            margin: "0 0 16px 0",
            letterSpacing: "0.5px"
          }}>
            {leftSide.title}
          </h3>
        )}

        {/* Description */}
        {leftSide.description && (
          <p style={{
            fontFamily: FONTS.body,
            fontSize: "1rem",
            color: COLORS.offWhite,
            lineHeight: 1.7,
            marginBottom: leftSide.items ? "20px" : "0",
            opacity: 0.95
          }}>
            {leftSide.description}
          </p>
        )}

        {/* Items list */}
        {leftSide.items && leftSide.items.length > 0 && (
          <ul style={{
            paddingLeft: "20px",
            margin: "0",
            flex: "1"
          }}>
            {leftSide.items.map((item, i) => (
              <li key={i} style={{
                fontFamily: FONTS.body,
                fontSize: "0.95rem",
                color: COLORS.offWhite,
                lineHeight: 1.7,
                marginBottom: "12px",
                opacity: 0.9
              }}>
                {typeof item === "string" ? item : (
                  <>
                    <strong style={{ color: COLORS.gold }}>{item.title}:</strong> {item.body}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Diagonal accent line */}
        <div style={{
          position: "absolute",
          right: "-1px",
          top: "0",
          bottom: "0",
          width: "4px",
          background: `linear-gradient(180deg, ${COLORS.gold} 0%, ${COLORS.steel} 100%)`,
          zIndex: 1
        }} />
      </div>

      {/* RIGHT SIDE - Solution/Opportunity (Light background) */}
      <div style={{
        background: COLORS.offWhite,
        color: COLORS.charcoal,
        padding: "32px",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Title */}
        {rightSide.title && (
          <h3 style={{
            fontFamily: FONTS.heading,
            fontSize: "1.3rem",
            color: COLORS.navy,
            margin: "0 0 16px 0",
            letterSpacing: "0.5px"
          }}>
            {rightSide.title}
          </h3>
        )}

        {/* Description */}
        {rightSide.description && (
          <p style={{
            fontFamily: FONTS.body,
            fontSize: "1rem",
            color: COLORS.charcoal,
            lineHeight: 1.7,
            marginBottom: rightSide.items ? "20px" : "0"
          }}>
            {rightSide.description}
          </p>
        )}

        {/* Items list */}
        {rightSide.items && rightSide.items.length > 0 && (
          <ul style={{
            paddingLeft: "20px",
            margin: "0",
            flex: "1"
          }}>
            {rightSide.items.map((item, i) => (
              <li key={i} style={{
                fontFamily: FONTS.body,
                fontSize: "0.95rem",
                color: COLORS.charcoal,
                lineHeight: 1.7,
                marginBottom: "12px"
              }}>
                {typeof item === "string" ? item : (
                  <>
                    <strong style={{ color: COLORS.gold }}>{item.title}:</strong> {item.body}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Success badge/callout */}
        {rightSide.highlight && (
          <div style={{
            marginTop: "auto",
            padding: "12px 16px",
            background: COLORS.white,
            border: `2px solid ${COLORS.gold}`,
            borderRadius: "6px"
          }}>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: "0.9rem",
              color: COLORS.navy,
              fontWeight: 600,
              margin: 0
            }}>
              {rightSide.highlight}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STANDARDIZED SECTION COMPONENT ─────────────────────────
// Every content block uses this for visual consistency
function Section({
  title,
  subtitle,
  children,
  primaryCTA,
  secondaryCTA,
  noCTA,
  centered,
  background,
  noPadding,
  type,  // New: 'default' or 'windowWithCards'
  id
}) {
  // Window-with-cards type: light tinted background for card contrast
  const isWindowWithCards = type === 'windowWithCards';
  const defaultBackground = isWindowWithCards ? COLORS.offWhite : COLORS.white;

  const containerStyle = {
    background: background || defaultBackground,
    border: `2px solid ${COLORS.steel}`,  // Steel Grey brand color - VISIBLE
    borderRadius: "8px",
    padding: noPadding ? "0" : "32px",
    marginBottom: "24px",
    boxShadow: "0 4px 12px rgba(67, 97, 125, 0.15)"  // Steel shadow - VISIBLE
  };

  const bodyTextStyle = {
    fontFamily: FONTS.body,
    fontSize: "1rem",
    color: COLORS.charcoal,
    lineHeight: 1.7
  };

  return (
    <div style={containerStyle} id={id}>
      {/* Standardized heading */}
      {title && <SectionTitle>{title}</SectionTitle>}
      {subtitle && (
        <p style={{ ...bodyTextStyle, marginTop: "-16px", marginBottom: "20px", color: COLORS.bodyMuted }}>
          {subtitle}
        </p>
      )}

      {/* Content area (cards, lists, tables, custom components) */}
      <div style={{ marginBottom: (primaryCTA || secondaryCTA) && !noCTA ? "24px" : "0" }}>
        {children}
      </div>

      {/* Standardized CTA buttons */}
      {!noCTA && (primaryCTA || secondaryCTA) && (
        <ButtonPair
          primaryText={primaryCTA?.text}
          primaryLink={primaryCTA?.link}
          primaryAction={primaryCTA?.action}
          secondaryText={secondaryCTA?.text}
          secondaryLink={secondaryCTA?.link}
          secondaryAction={secondaryCTA?.action}
          centered={centered}
        />
      )}
    </div>
  );
}

// ─── MICRO-PROOF STRIP ──────────────────────────────────────
function MicroProofStrip() {
  const proofItems = [
    { icon: "✓", text: "Severity-rated findings", link: SAMPLE_SCORECARD_PDF },
    { icon: "✓", text: "IC-ready memo format", link: SAMPLE_SCORECARD_PDF },
    { icon: "✓", text: "100-day stabilization plan", link: SAMPLE_100DAY_PDF },
  ];

  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.navy}08 0%, ${COLORS.gold}08 100%)`,
      border: `1px solid ${COLORS.border}`,
      borderRadius: "6px",
      padding: "16px 24px",
      marginBottom: "24px",
      display: "flex",
      gap: "32px",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {proofItems.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: COLORS.navy,
            fontFamily: FONTS.body,
            fontSize: "0.95rem",
            fontWeight: 600,
            transition: "all 0.2s",
            padding: "4px 8px",
            borderRadius: "4px"
          }}
          onMouseEnter={e => {
            e.target.style.background = `${COLORS.navy}08`;
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            e.target.style.background = "transparent";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <span style={{ color: COLORS.gold, fontSize: "1.1rem" }}>{item.icon}</span>
          <span>{item.text}</span>
        </a>
      ))}
    </div>
  );
}

// ─── EARLY CTA ──────────────────────────────────────────────
function EarlyCTA({ setPage }) {
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
      <p style={{
        fontFamily: FONTS.body,
        fontSize: "1rem",
        color: COLORS.charcoal,
        lineHeight: 1.7,
        textAlign: "center",
        margin: 0
      }}>
        Recognizing these patterns in a target or portfolio company?
      </p>
    </Section>
  );
}

// ─── NAVIGATION ─────────────────────────────────────────────
function Nav({ page, setPage }) {
  const items = page === "levers"
    ? [
        { key: "levers", label: "Levers" },
        { key: "scorer", label: "Scorer" },
        { key: "services", label: "Services" },
      ]
    : [
        { key: "levers", label: "Levers" },
        { key: "services", label: "Services & Method" },
        { key: "scorer", label: "Scorer" },
        { key: "about", label: "About" },
      ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.primary, borderBottom: `3px solid ${COLORS.gold}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px", minHeight: "76px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <img
          src="/Devonshire_Operations_Logo_Exact_Transparent.png"
          alt="Devonshire Operations"
          style={{ height: "60px", cursor: "pointer" }}
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
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "2.4rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "18px" }}>
          Pre-close red flags — and a first-100-days stabilization baseline — for operationally fragile businesses.
        </h1>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "22px" }}>
          I help PE deal teams and operating partners risk-rate operational instability in diligence and then stand up incident command, change governance, and KPI cadence in the first 100 days.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "26px" }}>
          {[
            "Pain: Vendor dependency, key-person risk, and incident/change patterns are under-examined—or assessed by generalists.",
            "Pain: Post-close, board reporting demands KPIs and governance before the company has an operating cadence to produce them.",
            "Pain: Operational fragility becomes a hidden tax on EBITDA and a weak exit narrative.",
            "Deliverable: Ops Diligence Report — risk-rated findings memo for the IC (2–3 weeks).",
            "Deliverable: 100-Day Stabilization Plan — Visibility → Control → Cadence across incident, change, KPIs, vendor, and audit readiness.",
            "Deliverable: Control Tower Retainer — weekly operating rhythm that prevents drift-back.",
            'Credibility: 15+ years building "cannot-fail" operating systems across top-tier financial services environments.',
            "Note: IC = investment committee.",
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: COLORS.gold, fontSize: "0.95rem", lineHeight: "28px", flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: "rgba(255,255,255,0.95)", lineHeight: 1.6 }}>
                {text}
              </span>
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

// ─── PROOF STRIP ────────────────────────────────────────────
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

// ─── OFFER CARDS ────────────────────────────────────────────
function OfferCards({ setPage }) {
  // Card styling for window-with-cards type
  const box = {
    border: `1px solid ${COLORS.steel}`,  // Steel border for visibility
    borderRadius: "6px",
    padding: "18px",
    background: COLORS.white,
    boxShadow: "0 3px 8px rgba(67, 97, 125, 0.12), 0 1px 3px rgba(67, 97, 125, 0.08)",  // Visible 3D effect
    flex: "1 1 260px",
    minWidth: "260px",
  };

  const title = { fontFamily: FONTS.heading, fontSize: "1.05rem", color: COLORS.navy, margin: 0, marginBottom: "8px" };
  const tag = { fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.bodyMuted, marginBottom: "10px" };
  const li = { marginBottom: "8px", lineHeight: 1.55 };

  return (
    <Section title="Services & Pricing (Fast Orientation)" type="windowWithCards" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px", maxWidth: "760px" }}>
        Choose the track that matches your deal lifecycle. Each deliverable is designed to be decision-useful for PE: severity-rated findings, PE impact, and a pragmatic Day-1 critical path.
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

        <div style={box}>
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

// ─── HOW IT WORKS ───────────────────────────────────────────
function HowItWorks() {
  const timelineItems = [
    {
      title: "1) Baseline",
      meta: "Week 1",
      description: "We request what exists: incident history, change/release artifacts, vendor list/contracts, KPI packs, org/RACI, audit evidence folders, and escalation/on-call.",
      completed: true
    },
    {
      title: "2) Diagnose",
      meta: "Weeks 1–3",
      description: "You receive a decision-useful output: severity-rated findings, PE impact framing, and a prioritized Day-1 critical path.",
      active: true
    },
    {
      title: "3) Stabilize",
      meta: "Day 1–100",
      description: "Post-close, we install the governance baseline: incident command, change control, KPI cadence, vendor governance, and board-ready reporting."
    }
  ];

  return (
    <Section title="How It Works" noCTA>
      <TimelineRail items={timelineItems} compact />
    </Section>
  );
}

// ─── CHOOSE SITUATION ───────────────────────────────────────
function ChooseSituation({ setPage }) {
  const box = {
    border: `1px solid ${COLORS.border}`,
    borderRadius: "6px",
    padding: "24px",
    background: COLORS.white,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    flex: "1 1 340px",
    minWidth: "300px",
  };

  const p = { fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, margin: 0 };
  const li = { marginBottom: "8px", lineHeight: 1.55 };

  return (
    <Section title="Choose Your Situation" noCTA>
      <p style={{ ...p, maxWidth: "820px", marginBottom: "24px", lineHeight: 1.7 }}>
        Pick the track that matches where you are in the lifecycle. Both paths deliver risk-rated findings, PE impact framing, and a clear Day-1 critical path.
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={box}>
          <SectionTitle sub>Evaluating a Target (Pre-Close Diligence)</SectionTitle>
          <p style={{ ...p, marginBottom: "12px", lineHeight: 1.7 }}>
            Decision-useful ops diligence designed for the IC: severity-rated red flags + evidence requests.
          </p>
          <ul style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, paddingLeft: "18px", marginBottom: "20px" }}>
            <li style={li}>Risk-rated findings memo (IC-ready)</li>
            <li style={li}>Evidence requests + diligence questions</li>
            <li style={li}>Day-1 → Day-100 stabilization priorities if you close</li>
          </ul>
          <ButtonPair
            primaryText="15-Minute Fit Check"
            secondaryText="Use the Scorer"
            secondaryAction={() => setPage("scorer")}
          />
        </div>

        <div style={box}>
          <SectionTitle sub>First 100 Days Post-Close</SectionTitle>
          <p style={{ ...p, marginBottom: "12px", lineHeight: 1.7 }}>
            Install a governance baseline so value creation isn't blocked by instability.
          </p>
          <ul style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, paddingLeft: "18px", marginBottom: "20px" }}>
            <li style={li}>Incident command (severity model, escalation, postmortems)</li>
            <li style={li}>Change governance (CAB-lite, risk classification, rollback discipline)</li>
            <li style={li}>KPI cadence (weekly operating reviews + board-ready pack)</li>
          </ul>
          <ButtonPair
            primaryText="15-Minute Fit Check"
            secondaryText="View 100-Day Plan (PDF)"
            secondaryLink={SAMPLE_100DAY_PDF}
          />
        </div>
      </div>
    </Section>
  );
}

// ─── DEAL IMPLICATIONS ──────────────────────────────────────
function DealImplications() {
  const leftSide = {
    title: "Risks We Surface",
    description: "Operational risks that belong in the IC memo and impact value creation:",
    items: [
      "Operational fragility that threatens EBITDA and customer retention",
      "Vendor concentration risk and change-of-control clauses",
      "Key-person dependency and 'tribal knowledge' failure modes",
      "Incident/change patterns that predict outages and SLA misses"
    ]
  };

  const rightSide = {
    title: "Value We Unlock",
    description: "Turn operational risk into a value creation advantage:",
    items: [
      "Severity-rated findings that inform hold pricing and deal structure",
      "Day-1 critical path that prevents EBITDA erosion in first 100 days",
      "Board-ready governance that builds credibility with LPs",
      "Exit-ready operational narrative that protects multiples in diligence"
    ],
    highlight: "Operational clarity → better hold outcomes"
  };

  return (
    <Section title="Deal Implications We Surface" noCTA>
      <SplitContrast leftSide={leftSide} rightSide={rightSide} />
    </Section>
  );
}

// ─── FIRST 14 DAYS ──────────────────────────────────────────
function First14Days() {
  const timelineItems = [
    {
      title: "Day 1-3: Install Incident Command",
      meta: "Days 1-3",
      description: "Stop new damage from accumulating. Establish ownership, severity classification, and escalation protocols.",
      items: [
        "Define severity levels (Critical/High/Medium/Low)",
        "Designate incident commanders for each severity tier",
        "Set escalation thresholds to management and board",
        "Implement postmortem discipline for Sev-1/Sev-2 incidents"
      ],
      active: true
    },
    {
      title: "Day 4-7: Install Change Control",
      meta: "Days 4-7",
      description: "Prevent uncontrolled changes from creating new incidents. Establish CAB-lite process with risk classification.",
      items: [
        "CAB-lite charter with approval gates",
        "Risk classification for all changes",
        "Rollback discipline and testing requirements",
        "Change-incident correlation tracking"
      ]
    },
    {
      title: "Day 8-14: Define KPI Baseline & Cadence",
      meta: "Days 8-14",
      description: "You can't improve what you don't measure. Establish baseline metrics and start weekly operating reviews.",
      items: [
        "Define core KPI set (MTTR, change success rate, incident volume)",
        "Baseline current performance",
        "Launch weekly operating review meetings",
        "Create board-ready reporting template"
      ],
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

// ─── MINI CASES ─────────────────────────────────────────────
function MiniCases() {
  const box = {
    border: `1px solid ${COLORS.border}`,
    borderRadius: "6px",
    padding: "16px",
    background: COLORS.white,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    flex: "1 1 280px",
    minWidth: "260px",
  };

  const h = { fontFamily: FONTS.heading, fontSize: "1.05rem", color: COLORS.navy, margin: 0, marginBottom: "8px" };
  const p = { fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 };

  return (
    <Section title="Proof in the Format PE Expects" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", marginBottom: "20px" }}>
        Example outcomes (anonymized). The point: install visibility, control, and cadence—then keep it durable.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={box}>
          <h3 style={h}>Incident instability</h3>
          <p style={p}><strong>Situation:</strong> Recurring incidents with unclear ownership and inconsistent escalation.</p>
          <p style={{ ...p, marginTop: "8px" }}><strong>Delivered:</strong> Severity model, incident command roles, escalation paths, postmortem discipline.</p>
          <p style={{ ...p, marginTop: "8px" }}><strong>Result:</strong> Faster containment, fewer repeat incidents, clearer executive visibility.</p>
        </div>

        <div style={box}>
          <h3 style={h}>Change-driven outages</h3>
          <p style={p}><strong>Situation:</strong> Releases correlated with incidents; no consistent controls.</p>
          <p style={{ ...p, marginTop: "8px" }}><strong>Delivered:</strong> CAB-lite, risk classification, rollback readiness, change-incident correlation tracking.</p>
          <p style={{ ...p, marginTop: "8px" }}><strong>Result:</strong> Reduced change failure rate and improved release confidence.</p>
        </div>

        <div style={box}>
          <h3 style={h}>Board reporting / KPI ambiguity</h3>
          <p style={p}><strong>Situation:</strong> KPIs undefined or ad hoc; board reporting inconsistent and lagging.</p>
          <p style={{ ...p, marginTop: "8px" }}><strong>Delivered:</strong> KPI library + thresholds, weekly cadence, executive dashboard, board-ready pack structure.</p>
          <p style={{ ...p, marginTop: "8px" }}><strong>Result:</strong> Predictable operating rhythm and faster issue detection.</p>
        </div>
      </div>
    </Section>
  );
}

// ─── FAQ BLOCK ──────────────────────────────────────────────
function FAQBlock() {
  const q = { fontFamily: FONTS.heading, fontSize: "1.05rem", color: COLORS.navy, margin: 0, marginBottom: "6px" };
  const a = { fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, margin: 0, marginBottom: "16px" };

  return (
    <Section title="FAQ" noCTA>
      <div>
        <h3 style={q}>Do you replace the operating team?</h3>
        <p style={a}>No. I install the operating system—governance, cadence, and controls—while ownership stays internal.</p>

        <h3 style={q}>What do you need from us?</h3>
        <p style={a}>A lightweight artifact pull (incident/change history, vendor list/contracts, KPIs, org/RACI, audit evidence folders) plus targeted stakeholder access.</p>

        <h3 style={q}>How do you handle confidentiality?</h3>
        <p style={a}>NDA-friendly by default. Minimal data handling; formats can be anonymized.</p>

        <h3 style={q}>When are you not a fit?</h3>
        <p style={{ ...a, marginBottom: 0 }}>
          If the company already has mature incident/change governance, a live KPI cadence, and low volatility, you likely don't need stabilization—only optimization.
        </p>
      </div>
    </Section>
  );
}

// ─── SECONDARY CAPTURE ROW ──────────────────────────────────
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
      {/* HOOK: Hero */}
      <HeroBlockWithNav setPage={setPage} />

      {/* PROBLEM: Lever Explorer */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontFamily: FONTS.heading, fontSize: "1.4rem", fontWeight: 700, color: COLORS.navy, marginBottom: "12px" }}>
          20 Operational Levers PE Funds Should Check
        </h2>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.65, maxWidth: "720px" }}>
          {LEVERS.length} operational friction points across 6 domains — with severity ratings, symptoms, and PE impact analysis. The levers show <em>what</em> is broken and <em>why</em> it matters. The remediation playbooks — the <em>how</em> — are delivered in the engagement.
        </p>
      </div>

      <DomainLegend />

      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, marginBottom: "14px", fontStyle: "italic" }}>
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

      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, marginBottom: "18px" }}>
        Showing {filtered.length} of {LEVERS.length} levers
      </p>

      {/* Lever cards */}
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

      {/* Bottom CTA within lever section removed - will add at end */}

      {/* PROOF: Micro-proof strip */}
      <MicroProofStrip />

      {/* SOLUTION: Segmentation */}
      <ChooseSituation setPage={setPage} />

      {/* Early CTA */}
      <EarlyCTA setPage={setPage} />

      {/* SOLUTION: Services & Pricing */}
      <OfferCards setPage={setPage} />

      {/* PROOF: PDF samples */}
      <ProofStrip />

      {/* PROOF: Deal implications (PE-native language) */}
      <DealImplications />

      {/* PROOF: Case examples */}
      <MiniCases />

      {/* TRUST: Process */}
      <HowItWorks />

      {/* TRUST: Timeline */}
      <First14Days />

      {/* TRUST: FAQ */}
      <FAQBlock />

      {/* ACTION: Final CTA */}
      <Card style={{ textAlign: "center", marginTop: "24px", background: `${COLORS.navy}05`, padding: "28px" }}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginBottom: "20px" }}>
          Not sure where to start? Let's assess fit and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="15-Minute Fit Check"
          secondaryText="Email me instead"
          secondaryLink={mailtoHref("Devonshire Ops – Fit Check request", "Hi Hassan,\n\nI reviewed the operational levers and would like to discuss fit.\n\nContext:\n- Company / deal stage:\n- Primary concern:\n- Timeline:\n\nBest,\n")}
          centered={true}
        />
      </Card>
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
      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "36px" }}>
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
          <SectionTitle sub>Score Each Dimension (1–5)</SectionTitle>
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
                <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, maxWidth: "42%", lineHeight: 1.4 }}>{dim.low}</span>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, maxWidth: "42%", textAlign: "right", lineHeight: 1.4 }}>{dim.high}</span>
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
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 11, fill: COLORS.charcoal }} />
                  <Radar name="Score" dataKey="score" stroke={COLORS.navy} fill={COLORS.navy} fillOpacity={0.4} strokeWidth={2} dot={{ r: 4, fill: COLORS.navy }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
            <Card style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: `4px solid ${ratingColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <span style={{ fontFamily: FONTS.body, fontSize: "1.6rem", fontWeight: 700, color: ratingColor }}>{avg.toFixed(1)}</span>
              </div>

              <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: ratingColor, letterSpacing: "1px", marginBottom: "10px" }}>
                {ratingLabel}
              </span>

              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px", maxWidth: "360px" }}>
                {CONTEXT_CALLOUTS[rating][context]}
              </p>

              <div style={{ textAlign: "left", width: "100%", maxWidth: "360px", marginBottom: "14px" }}>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 800, color: COLORS.navy, marginBottom: "8px" }}>
                  Recommended next steps
                </div>
                <ul style={{ margin: 0, paddingLeft: "18px", fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.55 }}>
                  <li>Days 1–14: install incident ownership + severity model + escalation thresholds</li>
                  <li>Days 1–14: install change control (risk classification, CAB-lite, rollback discipline)</li>
                  <li>Days 1–30: define KPI set, baseline it, and begin weekly operating reviews</li>
                </ul>
              </div>

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                {/* Trust line */}
                <div style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.bodyMuted, maxWidth: "360px", fontStyle: "italic", marginBottom: "8px", textAlign: "center" }}>
                  Scores reflect observed evidence prompts, not self-assessment
                </div>

                <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, maxWidth: "360px", marginBottom: "8px" }}>
                  {rating === "stable"
                    ? "Maintain your edge with ongoing governance support"
                    : "Let's stabilize the foundation with a structured 100-day plan"}
                </div>

                <CTAButton text="15-Minute Fit Check" />

                <a
                  href={mailtoHref(
                    `Devonshire Ops – Scorer result (${avg.toFixed(1)} / ${ratingLabel})`,
                    `Hi Hassan,\n\nI completed the Portfolio Stability Readiness Scorer.\n\nSituation: ${context}\nScore: ${avg.toFixed(1)} (${ratingLabel})\n\nTop concerns:\n- \n- \n- \n\nCan you send a memo-format readout / next steps?\n\nBest,\n`
                  )}
                  style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}
                >
                  Email me this assessment
                </a>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  <a href={SAMPLE_SCORECARD_PDF} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}>
                    View sample memo format
                  </a>
                  <a href={SAMPLE_100DAY_PDF} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}>
                    View 100-day plan format
                  </a>
                </div>
              </div>
            </Card>
          </div>
          {lowDims.length > 0 && (
            <Card style={{ borderLeft: `4px solid ${COLORS.critical}`, marginBottom: "24px" }}>
              <h4 style={{ fontFamily: FONTS.heading, fontSize: "0.95rem", color: COLORS.critical, marginBottom: "12px" }}>Critical Gaps Identified</h4>
              {lowDims.map(dim => (
                <div key={dim.key} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, color: COLORS.charcoal }}>{dim.label}</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.critical, marginLeft: "8px" }}>Score: {scores[dim.key]}/5</span>
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, marginTop: "4px" }}>Current state: {dim.low}</p>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SERVICES & METHOD COMPONENTS ───────────────────────────

// Jump Bar
function ServicesMethodJumpBar() {
  const linkStyle = {
    fontFamily: FONTS.body,
    fontSize: "0.95rem",
    fontWeight: 800,
    color: COLORS.navy,
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "6px",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
  };

  const wrap = { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "18px" };

  return (
    <div style={wrap}>
      <a href="#pre-close" style={linkStyle}>Pre-Close</a>
      <a href="#bundle" style={linkStyle}>Bundle</a>
      <a href="#post-close" style={linkStyle}>Post-Close</a>
      <a href="#ongoing" style={linkStyle}>Ongoing</a>
      <a href="#how-it-works" style={linkStyle}>How it works</a>
      <a href="#rubric" style={linkStyle}>Rubric</a>
      <a href="#sequence" style={linkStyle}>100-Day sequence</a>
      <a href="#faq" style={linkStyle}>FAQ</a>
      <a href="#fit-check" style={linkStyle}>Fit Check</a>
    </div>
  );
}

// Accordion
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: "0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.25rem", fontWeight: 800, color: COLORS.navy }}>
            {title}
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.bodyMuted, marginTop: "6px" }}>
            Click to {open ? "collapse" : "expand"}.
          </div>
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: "1.25rem", fontWeight: 900, color: COLORS.navy }}>
          {open ? "−" : "+"}
        </div>
      </button>

      {open && <div style={{ marginTop: "16px" }}>{children}</div>}
    </Card>
  );
}

// MiniMetric
function MiniMetric({ label, value, valueColor }) {
  return (
    <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "12px", background: COLORS.white }}>
      <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 900, color: COLORS.bodyMuted, marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: FONTS.heading, fontSize: "1.25rem", fontWeight: 900, color: valueColor || COLORS.navy }}>{value}</div>
    </div>
  );
}

// Worked Example Accordion
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
          <strong>Pre-close implication:</strong> Uncontrolled changes are a leading cause of production incidents. If the target has no change control,
          flag it in the diligence memo — this is direct EBITDA drag hiding in incident correlation data.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>First 100 days implication:</strong> Install a lightweight CAB within the first two weeks. This is a high-certainty, low-attention, fast-proof intervention.
          Change-incident correlation tracking starts producing board-ready data within 30 days.
        </p>
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => window.location.hash = "#offers"}
          style={{ padding: "12px 18px", background: COLORS.navy, color: "white", borderRadius: "4px", border: "none", fontFamily: FONTS.body, fontWeight: 800, cursor: "pointer" }}>
          See offers & pricing
        </button>
        <CTAButton text="15-Minute Fit Check" />
      </div>
    </Accordion>
  );
}

// Services Samples Row
function ServicesSamplesRow() {
  const btn = {
    padding: "12px 16px",
    borderRadius: "6px",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    color: COLORS.navy,
    textDecoration: "none",
    fontFamily: FONTS.body,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "14px" }}>
      <a href={PDF_OPS_DILIGENCE_SCORECARD} target="_blank" rel="noopener noreferrer" style={btn}>
        📄 View Ops Diligence Scorecard (PDF)
      </a>
      <a href={PDF_100_DAY_STABILIZATION_PLAN} target="_blank" rel="noopener noreferrer" style={btn}>
        📄 View 100-Day Stabilization Plan (PDF)
      </a>
    </div>
  );
}

// Framework Why Friction Tight
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

// Framework Rubric Table
function FrameworkRubricTable() {
  return (
    <Section title="The Friction Evaluation Rubric" noCTA>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
        Each lever is evaluated across six dimensions. The output is a prioritization logic you can use in diligence and in the first 100 days.
      </p>

      <div style={{ marginTop: "14px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONTS.body, fontSize: "0.8rem" }}>
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
        Levers scoring well on <em>EBITDA Impact + Time to Proof + Low Attention Load</em> are highest-priority quick wins.
        Strong <em>Exit Story Impact</em> with longer timelines are strategic investments.
      </p>
    </Section>
  );
}

// Stabilization Sequence
function StabilizationSequence() {
  const timelineItems = [
    {
      title: "Phase 1: Visibility",
      meta: "Days 1–14",
      description: "You can't fix what you can't see. Establish baseline visibility into what's actually happening — not what management says is happening.",
      items: [
        "Incident volume, severity, MTTR, recurrence rate",
        "Change frequency, failure rate, rollback frequency",
        "Vendor inventory, contract terms, concentration exposure",
        "Current compliance posture vs. stated posture"
      ],
      deliverable: "Baseline assessment memo + operational risk heatmap",
      completed: true
    },
    {
      title: "Phase 2: Control",
      meta: "Days 15–45",
      description: "Install the minimum governance gates that prevent new damage from accumulating while you address existing debt.",
      items: [
        "Incident command structure with severity classification",
        "Change control process with risk classification",
        "Escalation paths with defined thresholds",
        "Access review and vendor oversight cadence"
      ],
      deliverable: "CAB charter + severity policy + escalation matrix",
      active: true
    },
    {
      title: "Phase 3: Cadence",
      meta: "Days 45–100",
      description: "Governance installed ad hoc decays without rhythm. Build the operating cadence that makes stability self-sustaining.",
      items: [
        "Weekly operating review with defined KPIs and thresholds",
        "Monthly board-ready reporting package",
        "Quarterly vendor scorecards and control testing",
        "Postmortem → recurrence prevention → backlog loop"
      ],
      deliverable: "Board ops dashboard + first QBR pack + audit evidence index"
    }
  ];

  return (
    <Card>
      <h2 style={{ fontFamily: FONTS.heading, fontSize: "1.5rem", color: COLORS.navy, marginTop: 0 }}>
        The stabilization sequence
      </h2>
      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "24px" }}>
        Operational stabilization follows a consistent three-phase sequence: <strong>Visibility → Control → Cadence</strong>.
      </p>

      <TimelineRail items={timelineItems} />

      <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginTop: "24px" }}>
        After Day 100, the Control Tower Retainer maintains the cadence and prevents drift-back.
      </p>
    </Card>
  );
}

// Services Pricing Ladder
function ServicesPricingLadder() {
  const items = [
    { id: "pre-close", label: "Pre-Close", name: "Ops Diligence Report", price: "$15K+", time: "2–3 weeks", desc: "Standalone assessment" },
    { id: "bundle", label: "Full Lifecycle Bundle", name: "Diligence + 100-Day Plan", price: "$25–$35K", time: "2–3 weeks + 100 days", desc: "Recommended — seamless transition" },
    { id: "post-close", label: "Post-Close Only", name: "100-Day Stabilization", price: "$30–$40K", time: "100 days", desc: "No prior diligence" },
  ];

  return (
    <Card style={{ marginBottom: "32px", background: `${COLORS.navy}05` }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {items.map((item, i) => (
          <div key={i} id={item.id} style={{ padding: "16px", background: COLORS.white, borderRadius: "4px", border: `1px solid ${i === 1 ? COLORS.gold : COLORS.border}`, position: "relative" }}>
            {i === 1 && <div style={{ position: "absolute", top: "-1px", left: 0, right: 0, height: "3px", background: COLORS.gold, borderRadius: "4px 4px 0 0" }} />}
            <span style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.navy, letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: 600 }}>{item.label}</span>
            <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, fontWeight: 700, margin: "8px 0 4px" }}>{item.name}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, fontWeight: 700, marginBottom: "4px" }}>{item.price}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal }}>{item.time}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, marginTop: "4px", fontStyle: "italic" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Services Steps
function ServicesSteps() {
  const timelineItems = [
    {
      title: "Step 1: Fit Check",
      meta: "15 minutes",
      description: "15-minute call. Assess the situation, confirm scope, and determine fit.",
      completed: true
    },
    {
      title: "Step 2: Scoping + Data Request",
      meta: "48 hours",
      description: "Targeted data request. Fixed-fee proposal with timeline within 48 hours.",
      active: true
    },
    {
      title: "Step 3: Deliverable",
      meta: "2-3 weeks",
      description: "Risk-rated findings memo or phased stabilization plan. Board-ready from day one."
    }
  ];

  return (
    <Card>
      <h2 style={{ fontFamily: FONTS.heading, fontSize: "1.5rem", color: COLORS.navy, marginTop: 0, marginBottom: "14px" }}>
        How it works
      </h2>
      <TimelineRail items={timelineItems} compact />
    </Card>
  );
}

// Services Recommended Ongoing Tight
function ServicesRecommendedOngoingTight() {
  return (
    <Card style={{ marginTop: "14px", background: "#FBF7EE", border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontFamily: FONTS.body, fontSize: "1.02rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          <strong>Recommended:</strong> Choose the bundle if you expect to close — diligence findings feed directly into Day-1 priorities with no re-learning.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Ongoing:</strong> Transition to the Control Tower Retainer to maintain cadence and prevent drift-back.
        </p>
      </div>
    </Card>
  );
}

// Fit Check CTA
function FitCheckCTA() {
  const subject = "Devonshire Ops – Fit Check request";
  const body =
    "Hi Hassan,\n\nI reviewed the Services & Method page and would like to discuss fit.\n\nContext:\n- Company / deal stage:\n- Primary concern (incidents, change, vendor risk, KPI cadence, audit posture):\n- Timeline:\n\nBest,\n";

  return (
    <Card style={{ textAlign: "center" }}>
      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.7, maxWidth: "820px", margin: "0 auto 20px" }}>
        Not sure where to start? Book a 15-minute fit check. We'll assess the situation, identify the highest-priority friction points, and scope the right engagement.
      </p>
      <ButtonPair
        primaryText="15-Minute Fit Check"
        secondaryText="Email me instead"
        secondaryLink={mailtoHref(subject, body)}
        centered={true}
      />
    </Card>
  );
}

// Traffic Selector
// Traffic Selector
function TrafficSelector() {
  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Card style={{ marginTop: "12px", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.05rem", color: COLORS.navy, marginBottom: "4px" }}>
            What's your situation?
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.5 }}>
            Jump to the most relevant sections.
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => jump("pre-close")}
            style={{ padding: "10px 14px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, background: COLORS.white, fontFamily: FONTS.body, color: COLORS.navy, cursor: "pointer" }}
          >
            Evaluating a target
          </button>
          <button
            onClick={() => jump("post-close")}
            style={{ padding: "10px 14px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, background: COLORS.white, fontFamily: FONTS.body, color: COLORS.navy, cursor: "pointer" }}
          >
            First 100 days post-close
          </button>
        </div>
      </div>
    </Card>
  );
}

// NDA Micro Block
function NDAMicroBlock() {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px 12px",
        borderRadius: "6px",
        border: `1px solid ${COLORS.border}`,
        background: `${COLORS.navy}03`,
        fontFamily: FONTS.body,
        fontSize: "0.92rem",
        color: COLORS.charcoal,
        lineHeight: 1.45,
      }}
    >
      NDA-friendly. We can sign an NDA before receiving sensitive materials; initial triage can be done with high-level facts only.
    </div>
  );
}

// Typical Red Flags
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
    <Card style={{ marginTop: "18px" }}>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.3rem", color: COLORS.navy, marginBottom: "16px" }}>
        Typical red flags we surface (mapped to IC implications)
      </h3>
      <SplitContrast leftSide={leftSide} rightSide={rightSide} />
    </Card>
  );
}

// Memo Sample Screenshots
function MemoSampleScreenshots() {
  const samples = [
    {
      src: "/memo-samples/ops-dd-exec-summary.png",
      alt: "Ops Diligence Scorecard executive summary excerpt",
      caption: "Ops Diligence Scorecard — Executive Summary (overall rating + deal implications)",
    },
    {
      src: "/memo-samples/domain-scores-1.png",
      alt: "Operational risk summary table excerpt (top)",
      caption: "Operational Risk Summary — domain ratings (excerpt 1 of 2)",
    },
    {
      src: "/memo-samples/domain-scores-2.png",
      alt: "Operational risk summary table excerpt (bottom)",
      caption: "Operational Risk Summary — domain ratings (excerpt 2 of 2)",
    },
    {
      src: "/memo-samples/100-day-phases.png",
      alt: "100-Day Stabilization Plan phase overview excerpt",
      caption: "100-Day Stabilization Plan — phase overview (Visibility → Control → Cadence)",
    },
  ];

  return (
    <Card style={{ marginTop: "18px", background: `${COLORS.navy}03` }}>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, marginBottom: "6px" }}>
        Sample deliverable excerpts (anonymized)
      </h3>
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
    </Card>
  );
}

// Lead Capture
function LeadCapture() {
  const [email, setEmail] = useState("");
  const [situation, setSituation] = useState("Evaluating a target");
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const emailTemplate = `Subject: Ops diligence / 100-day stabilization — quick triage

Hi Hassan,

I'm reaching out regarding: ${situation.toLowerCase()}.

Company: [Name]
Sector: [Sector]
What's happening / top concern: [1–2 sentences]
Timing: [e.g., LOI / pre-close / days post-close]

Can you advise on fit and next steps?

Thanks,
[Name]
[Fund / Role]
`;

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setStatus({ state: "ok", msg: "Copied email template." });
      setTimeout(() => setStatus({ state: "idle", msg: "" }), 2000);
    } catch {
      setStatus({ state: "error", msg: "Could not copy. Please manually copy from the template." });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ state: "error", msg: "Enter a valid email." });
      return;
    }
    setStatus({ state: "loading", msg: "Sending…" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, situation, source: "merged-page" }),
      });
      if (!res.ok) throw new Error("bad_status");
      setStatus({ state: "ok", msg: "Received. We'll follow up by email." });
      setEmail("");
    } catch {
      // graceful fallback: still provide a path to convert
      setStatus({ state: "error", msg: "Could not submit. Use the email template below." });
    }
  };

  return (
    <Card style={{ marginTop: "18px" }}>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, marginBottom: "6px" }}>
        Not ready to book a call?
      </h3>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.55, marginBottom: "12px" }}>
        Share your email and situation. I'll reply with fit + next steps. (No sensitive materials needed up front.)
      </p>

      <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "10px", alignItems: "end" }}>
        <div>
          <label style={{ display: "block", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, marginBottom: "6px" }}>
            Your email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@fund.com"
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, fontFamily: FONTS.body }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, marginBottom: "6px" }}>
            Situation
          </label>
          <select
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, fontFamily: FONTS.body }}
          >
            <option>Evaluating a target</option>
            <option>First 100 days post-close</option>
            <option>Mid-hold optimization</option>
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
          <button
            type="submit"
            style={{ padding: "10px 14px", borderRadius: "6px", border: `1px solid ${COLORS.gold}`, background: COLORS.gold, color: COLORS.white, fontFamily: FONTS.body, cursor: "pointer" }}
          >
            Send
          </button>
          <button
            type="button"
            onClick={copyTemplate}
            style={{ padding: "10px 14px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, fontFamily: FONTS.body, cursor: "pointer" }}
          >
            Copy email template
          </button>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Ops diligence / 100-day stabilization — quick triage")}`}
            style={{ padding: "10px 14px", borderRadius: "6px", border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, fontFamily: FONTS.body, textDecoration: "none" }}
          >
            Email me instead
          </a>
        </div>

        {status.state !== "idle" && (
          <div style={{ gridColumn: "1 / -1", marginTop: "10px", fontFamily: FONTS.body, fontSize: "0.92rem", color: status.state === "ok" ? "green" : status.state === "loading" ? COLORS.charcoal : "crimson" }}>
            {status.msg}
          </div>
        )}

        {/* fallback template (only useful if submit fails) */}
        {status.state === "error" && (
          <pre style={{ gridColumn: "1 / -1", marginTop: "10px", padding: "12px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: "#fafafa", overflowX: "auto", fontSize: "0.85rem" }}>
{emailTemplate}
          </pre>
        )}
      </form>
    </Card>
  );
}

// ─── SERVICES PAGE ──────────────────────────────────────────
function ServicesPage({ setPage }) {
  return (
    <div style={{ maxWidth: "980px", margin: "0 auto", padding: "48px 24px" }}>
      <ServicesMethodJumpBar />
      <TrafficSelector />

      <div id="top">
        <h1 style={{ fontFamily: FONTS.heading, fontSize: "2.2rem", color: COLORS.navy, marginBottom: "12px" }}>
          Services
        </h1>
        <p style={{ fontFamily: FONTS.body, fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.7, marginTop: 0, marginBottom: "22px", maxWidth: "860px" }}>
          Operational support for PE funds and portfolio companies — from pre-close diligence through post-close stabilization to ongoing governance.
        </p>
      </div>

      {/* SOLUTION: Pricing ladder (4 cards) */}
      <ServicesPricingLadder />

      <div id="ongoing" style={{ marginTop: "20px" }}>
        <ServicesRecommendedOngoingTight />
      </div>

      {/* PROOF: Mini proof cue (reduces price shock) */}
      <ServicesSamplesRow />
      <NDAMicroBlock />

      {/* PROBLEM CONTEXT: Why this matters */}
      <div id="why-friction" style={{ marginTop: "28px" }}>
        <FrameworkWhyFrictionTight />
      </div>

      <div id="red-flags" style={{ marginTop: "28px" }}>
        <TypicalRedFlags />
      </div>

      {/* PROOF: Methodology */}
      <div id="rubric" style={{ marginTop: "28px" }}>
        <FrameworkRubricTable />
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

      {/* TRUST: Process */}
      <div id="how-it-works" style={{ marginTop: "28px" }}>
        <ServicesSteps />
      </div>

      <div id="faq" style={{ marginTop: "28px" }}>
        <FAQBlock />
      </div>

      {/* ACTION: Lead capture & CTA */}
      <div id="lead-capture" style={{ marginTop: "28px" }}>
        <LeadCapture />
      </div>

      <div id="fit-check" style={{ marginTop: "28px" }}>
        <FitCheckCTA />
      </div>
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
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "16px", padding: "8px 12px", background: COLORS.offWhite, borderRadius: "4px" }}>
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
              <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, marginTop: "4px" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Proof artifacts before CTA */}
      <div style={{ marginBottom: "24px", padding: "16px", background: `${COLORS.navy}05`, border: `1px solid ${COLORS.border}`, borderRadius: "6px" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.navy, fontWeight: 600, marginBottom: "10px" }}>
          Sample deliverables:
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href={SAMPLE_SCORECARD_PDF} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}>
            📄 Ops Diligence Scorecard (PDF)
          </a>
          <a href={SAMPLE_100DAY_PDF} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, color: COLORS.navy, textDecoration: "none", borderBottom: `2px solid ${COLORS.navy}` }}>
            📄 100-Day Stabilization Plan (PDF)
          </a>
        </div>
      </div>

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
    services: <ServicesPage setPage={setPage} />,
    scorer: <ScorerPage />,
    about: <AboutPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.offWhite, fontFamily: FONTS.body }}>
      <Nav page={page} setPage={setPage} />
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 32px 80px" }}>
        {pages[page]}
      </main>
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "24px", background: COLORS.white }}>
        <div style={{ maxWidth: "980px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal }}>
            © {new Date().getFullYear()} Devonshire Operations. All rights reserved.
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none" }}>
              {CONTACT_EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 700, color: COLORS.navy, textDecoration: "none" }}>
              LinkedIn
            </a>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.bodyMuted }}>
              NDA available on request.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
