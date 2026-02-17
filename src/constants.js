// ─── CONSTANTS ──────────────────────────────────────────────
export const CALENDLY = "https://calendly.com/hassantariq1/15-minute-triage-call-hassan-tariq";
export const PDF_OPS_DILIGENCE_SCORECARD = "/pdfs/ops-diligence-scorecard.pdf";
export const PDF_100_DAY_STABILIZATION_PLAN = "/pdfs/100-day-stabilization-plan.pdf";
export const CONTACT_EMAIL = "hassan@devonshireops.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hassantar/";
export const SAMPLE_SCORECARD_PDF = "/sample-ops-diligence-scorecard.pdf";
export const SAMPLE_100DAY_PDF = "/sample-100-day-stabilization-plan.pdf";
export const PDF_SCORECARD = "/pdfs/ops-diligence-scorecard.pdf";
export const PDF_100DAY = "/pdfs/100-day-stabilization-plan.pdf";
export const NDA_NOTE = "NDA-friendly. Minimal data handling. Anonymized formats accepted.";

export function mailtoHref(subject, body) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

export const COLORS = {
  navy: "#14213D",
  steel: "#43617D",
  gold: "#B8860B",
  goldDark: "#7B5C07",
  offWhite: "#FCFCFC",
  charcoal: "#0A0A0A",
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

export const FONTS = {
  heading: "'EB Garamond', Garamond, 'Times New Roman', serif",
  body: "Georgia, 'Times New Roman', serif",
};

// ─── DESIGN SYSTEM TOKENS ───────────────────────────────────
export const SPACING = {
  xs: "8px",
  sm: "12px",
  md: "20px",
  lg: "32px",
  xl: "48px",
  xxl: "64px"
};

export const SHADOWS = {
  none: "none",
  xs: "0 1px 2px rgba(67, 97, 125, 0.05)",
  sm: "0 1px 3px rgba(67, 97, 125, 0.1)",
  md: "0 4px 12px rgba(67, 97, 125, 0.15)",
  lg: "0 6px 20px rgba(67, 97, 125, 0.18)",
  xl: "0 10px 30px rgba(67, 97, 125, 0.22)"
};

export const RADIUS = {
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px"
};

export const SEVERITY_STYLE = {
  Critical: { bg: COLORS.criticalBg, text: COLORS.criticalText, border: COLORS.criticalBorder },
  High: { bg: COLORS.highBg, text: COLORS.highText, border: COLORS.highBorder },
  Medium: { bg: COLORS.mediumBg, text: COLORS.mediumText, border: COLORS.mediumBorder },
};

export const TIMING_COLORS = { "Pre-Close Red Flag": COLORS.preClose, "First 100 Days": COLORS.first100, "Ongoing Hold": COLORS.ongoing };

export const DOMAINS = {
  IM: { name: "Incident Management", short: "IM", color: "#E53E3E", desc: "Outage response, severity classification, postmortems, escalation" },
  CG: { name: "Change Governance", short: "CG", color: "#DD6B20", desc: "Deployment control, CAB process, rollback, change-incident correlation" },
  VP: { name: "Vendor & Third-Party", short: "VP", color: "#D69E2E", desc: "Contracts, concentration risk, scorecards, fourth-party visibility" },
  AC: { name: "Audit & Compliance", short: "AC", color: "#38A169", desc: "Evidence trails, SOC 2, access reviews, control testing" },
  KO: { name: "KPI & Operating Cadence", short: "KO", color: "#3182CE", desc: "Board reporting, operating reviews, metrics, targets" },
  OP: { name: "Organizational & Process", short: "OP", color: "#805AD5", desc: "Runbooks, RACI, key-person risk, knowledge management" },
};

// ─── 20 LEVERS (MVP) ───────────────────────────────────────
export const LEVERS = [
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
export const SCORER_DIMS = [
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

// Recommended action per dimension, used by the dynamic scorer results
export const DIM_RECS = {
  incident: { days: "Days 1–14", action: "install incident command: severity model, designated commander, escalation thresholds, and postmortem discipline" },
  change:   { days: "Days 1–14", action: "install change control: CAB-lite charter, risk classification, rollback discipline, and change-incident correlation tracking" },
  vendor:   { days: "Days 1–30", action: "run vendor inventory, map concentration risk, build renewal calendar, and assign vendor owners" },
  audit:    { days: "Days 15–45", action: "build evidence index, map SOC 2 controls to operating procedures, and begin quarterly access reviews" },
  kpi:      { days: "Days 1–30", action: "define core KPI set, baseline current performance, and launch weekly operating reviews with board-ready reporting" },
  process:  { days: "Days 15–60", action: "document critical runbooks, map RACI, identify key-person risks, and begin cross-training program" },
};

export const CONTEXT_OPTIONS = [
  { key: "pre", label: "Evaluating a target (pre-close diligence)" },
  { key: "post", label: "First 100 days post-close" },
  { key: "mid", label: "Mid-hold period optimization" },
];

export const CONTEXT_CALLOUTS = {
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
// Note: font is loaded via <link> in index.html for performance
export const globalCSS = `
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

  main p { max-width: var(--maxcopy); }
  td p, th p, nav p, footer p, .no-max-width p { max-width: none; }

  ::selection { background: ${COLORS.primary}; color: white; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.offWhite}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.steel}; border-radius: 3px; }

  @media (max-width: 768px) {
    html { font-size: 18px; }
    :root { --maxcopy: 60ch; }
  }

  /* SplitContrast responsive: stacks on mobile */
  .split-contrast { grid-template-columns: 1fr 1fr; }
  @media (max-width: 768px) {
    .split-contrast { grid-template-columns: 1fr; }
  }

  /* Sticky nav offset: prevent anchor targets from hiding behind the 76px nav */
  [id] { scroll-margin-top: 90px; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .lever-expand { animation: fadeIn 0.2s ease-out forwards; }

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
