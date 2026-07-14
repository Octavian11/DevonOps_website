// ─── CONSTANTS ──────────────────────────────────────────────
export const CALENDLY = "https://calendly.com/hassantariq1/15-minute-triage-call-hassan-tariq";
export const CONTACT_EMAIL = "hassan@devonshireops.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/hassantar/";
export const SAMPLE_SCORECARD_PDF = "/sample-execution-risk-scorecard.pdf";
export const SAMPLE_100DAY_PDF = "/sample-100-day-operating-playbook.pdf";
export const NDA_NOTE = "NDA-friendly. Minimal data handling. Anonymized formats accepted.";
// FormSpree endpoint for Scorer email capture
export const FORMSPREE_URL = "https://formspree.io/f/xvzbbyrj";

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
  navy: "#1B1C1F",
  steel: "#303236",
  gold: "#6E1F2E",
  goldOnDark: "#C97B8A",
  goldDark: "#571825",
  offWhite: "#F4F4F3",
  charcoal: "#212226",
  border: "rgba(27,28,31,.16)",
  white: "#FFFFFF",
  primary: "#1B1C1F",
  bodyMuted: "#303236",
  criticalBg: "#FBF0F0",
  criticalText: "#96404A",
  criticalBorder: "#E7C6C9",
  highBg: "#FAF3EE",
  highText: "#8A4F2F",
  highBorder: "#E5CDBB",
  mediumBg: "#F5F3EA",
  mediumText: "#8F8353",
  mediumBorder: "#E2DCC4",
  preClose: "#6E1F2E",
  first100: "#1B1C1F",
  ongoing: "#303236",
  stable: "#3E6259",
  atRisk: "#A2653C",
  critical: "#96404A",
  costRed: "#96404A",
  heroGradientStart: "#FFFFFF",
  heroGradientEnd: "#F4F4F3",
};

export const FONTS = {
  heading: "'EB Garamond', Garamond, 'Times New Roman', serif",   // headings + display numbers
  body: "'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif",
  label: "'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif",
};
// TYPE SCALE (rem, root 20px desktop / 18 / 16 mobile):
// 0.6 overline · 0.72 label/caption · 0.8 small body · 0.9 secondary body/UI · 1.0 body/card title
// 1.1 card heading · 1.4 section H2 · 1.8 page H1 · 2.4 hero — no other sizes.
const _TYPE_DOC = null;;

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
  xs: "0 1px 2px rgba(27, 28, 31, 0.05)",
  sm: "0 1px 3px rgba(27, 28, 31, 0.1)",
  md: "0 4px 12px rgba(27, 28, 31, 0.15)",
  lg: "0 6px 20px rgba(27, 28, 31, 0.18)",
  xl: "0 10px 30px rgba(27, 28, 31, 0.22)"
};

export const RADIUS = {
  sm: "0",
  md: "0",
  lg: "0",
  xl: "0"
};

export const SEVERITY_STYLE = {
  Critical: { bg: COLORS.criticalBg, text: COLORS.criticalText, border: COLORS.criticalBorder },
  High: { bg: COLORS.highBg, text: COLORS.highText, border: COLORS.highBorder },
  Medium: { bg: COLORS.mediumBg, text: COLORS.mediumText, border: COLORS.mediumBorder },
};

export const TIMING_COLORS = { "Pre-Close Red Flag": COLORS.preClose, "First 100 Days": COLORS.first100, "Ongoing Hold": COLORS.ongoing };

export const DOMAINS = {
  IM: { name: "Things That Break Repeatedly", short: "Incidents", color: "#96404A", desc: "Recurring operating failures, escalation discipline, root-cause learning, and service continuity" },
  CG: { name: "Changes That Cause Failures", short: "Change Control", color: "#A2653C", desc: "Material-change decision rights, dependency sequencing, outcome validation, and fallback discipline" },
  VP: { name: "Vendor Risk & Dependency", short: "Vendors", color: "#6D4A62", desc: "Contracts, concentration risk, scorecards, fourth-party visibility" },
  AC: { name: "Things That Won't Survive Buyer DD", short: "Compliance", color: "#3E6259", desc: "Evidence readiness, operating controls, client and regulatory obligations, and exception closure" },
  KO: { name: "Missing Metrics & Reporting Cadence", short: "KPIs", color: "#4A5D74", desc: "Board reporting, operating reviews, KPIs, targets" },
  OP: { name: "Things Nobody Owns", short: "Process", color: "#303236", desc: "Operating ownership, integration capacity, key-person dependency, and knowledge transfer" },
};

// ─── 20 LEVERS (public representative catalog — rebalanced Jul 14, 2026) ───
export const LEVERS = [
  { id: 1, common: true, domain: "IM", name: "No Severity and Escalation Model", severity: "Critical", timing: "First 100 Days",
    definition: "Operational issues are not classified by business impact, and there is no agreed threshold for escalation to management, the sponsor, clients, or the board. Response depends on individual judgment rather than a shared operating model.",
    symptoms: ["Minor issues and material disruptions receive the same response", "Teams disagree about when leadership should be notified", "Escalations depend on personal relationships", "Board reporting counts issues without showing business severity"],
    peImpact: "The sponsor cannot reliably distinguish routine noise from risks that may affect revenue, clients, compliance, or the value-creation plan. Senior attention may be allocated inconsistently while material issues remain invisible.",
    whatGood: "A practical severity model with business-impact criteria, response expectations, named decision rights, and explicit thresholds for management, sponsor, client, and board communication." },
  { id: 3, domain: "IM", name: "Recurring Failures Without Root-Cause Discipline", severity: "High", timing: "Ongoing Hold",
    definition: "The immediate problem is resolved, but its underlying causes, contributing conditions, and corrective actions are not examined or tracked. The organization restores service without building institutional learning.",
    symptoms: ["The same failure returns under slightly different circumstances", "Corrective actions are agreed verbally and then disappear", "No owner verifies whether remediation worked", "Management cannot show trends in recurrence or corrective-action closure"],
    peImpact: "Recurring failures consume management capacity, may weaken client confidence, and obscure the true cost of operational instability. Repetition also makes it harder to demonstrate that the operating model is becoming more durable during the hold.",
    whatGood: "Material failures receive a documented, blameless review; causal factors and corrective actions have named owners and dates; recurrence and action closure are reviewed through the operating cadence." },
  { id: 69, domain: "IM", name: "Service-Continuity Dependencies Unmapped", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Management cannot identify the people, processes, vendors, facilities, data, or systems required to keep critical client and business services operating through disruption or ownership transition.",
    symptoms: ["Critical services depend on informal workarounds", "Recovery plans cover technology but not people or third parties", "Client commitments are not linked to supporting processes", "Management cannot explain the effect of losing a key person, vendor, or location"],
    peImpact: "An unmapped dependency can turn an otherwise manageable disruption into lost revenue, client attrition, or a post-close governance event. It also prevents the sponsor from defining credible Day-1 protections for the most important services.",
    whatGood: "Critical services are mapped end to end with owners, dependencies, recovery priorities, client obligations, and tested contingencies. Material gaps feed directly into the Day-1 Critical Path." },
  { id: 11, domain: "CG", name: "No Change Decision Rights or Rollback Discipline", severity: "Critical", timing: "First 100 Days",
    definition: "Material operating changes happen without clear approval, risk review, or a tested path back. No one can say who authorizes a change, what risk tier it carries, or how it gets reversed when it fails — and execution knowledge lives in individual heads.",
    symptoms: ["Operating changes happen at any time without notice or review", "No one can tell you what changed when a failure occurs", "Failed changes are discovered by customers, not by the team", "Rollback is manual and slow — or impossible", "Change execution requires specific people to be present"],
    peImpact: "Uncontrolled change increases the likelihood of operational disruption precisely when a new owner is introducing new priorities. It also makes causality difficult to establish: the sponsor cannot tell whether performance changed because of the initiative, execution quality, or an unrelated intervention.",
    whatGood: "Changes are classified by business risk, assigned a decision owner, reviewed with affected stakeholders, implemented through defined checkpoints, and paired with validation and fallback criteria." },
  { id: 60, common: true, domain: "CG", name: "Day-1 Integration Sequence Undefined", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "The platform has no agreed sequence for what happens after close — which owners, people decisions, systems, vendors, controls, and reporting change on Day 1, in the first 30 days, and by Day 100. Integration starts as improvisation.",
    symptoms: ["No written Day-1 plan beyond legal close mechanics", "Management cannot say which systems, vendors, or controls converge — or when", "Acquired-company leaders don't know what changes and what doesn't", "Prior add-ons still run standalone processes months after close"],
    peImpact: "Poor sequencing consumes management attention, creates avoidable rework, and can interrupt client or employee continuity. The issue is not the absence of activity; it is the absence of an integrated decision order tied to the deal thesis.",
    whatGood: "A concise Day-1 Readiness Plan distinguishes must-happen, can-wait, and conditional decisions; maps dependencies and owners; and carries unresolved items into the 100-Day Operating Playbook." },
  { id: 70, domain: "CG", name: "Shared Systems and Process Changes Uncoordinated", severity: "High", timing: "Ongoing Hold",
    definition: "The platform and acquired companies change shared processes, vendors, data, or systems independently, without a common roadmap or a view of downstream operating effects.",
    symptoms: ["Different teams run overlapping transformation projects", "Local changes conflict with platform standards", "Process redesign and system implementation follow different timelines", "Employees maintain duplicate workflows because neither model is authoritative"],
    peImpact: "Uncoordinated change can delay integration benefits, add cost, and leave the platform with more complexity than it acquired. It also weakens confidence that the operating model can absorb subsequent add-ons without repeating the same work.",
    whatGood: "A single change roadmap connects business outcomes, process design, data, vendors, systems, owners, and decision gates. Exceptions are explicit, temporary, and reviewed through the operating cadence." },
  { id: 21, common: true, domain: "VP", name: "No Vendor and Contract Inventory", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "No central record of who the company's vendors are, what contracts exist, what the terms are, or when renewals occur. Vendor information is scattered across email inboxes, shared drives, and individual knowledge.",
    symptoms: ["Cannot produce a list of all active vendors with contract terms", "Renewal dates are missed or discovered last-minute", "Duplicate vendor relationships exist across departments", "Contract terms are unfavorable because no one reviewed them before auto-renewal"],
    peImpact: "Without contract visibility, the sponsor cannot underwrite addressable cost, concentration, change-of-control exposure, or service continuity. Post-close savings assumptions may be overstated because the contractual baseline is not known.",
    whatGood: "A centralized vendor register links spend, contract terms, renewals, obligations, criticality, concentration, and ownership. Material contracts receive pre-close review and enter a governed renewal calendar." },
  { id: 23, domain: "VP", name: "Vendor Concentration Risk (Single Points of Failure)", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Critical business functions depend on a single vendor with no alternative, no exit plan, and no negotiating leverage. If the vendor fails, raises prices, or terminates the relationship, the business is disrupted.",
    symptoms: ["Single vendor for a critical function with no documented alternative", "Vendor has significant pricing power due to switching costs", "No exit or transition plan exists for key vendors", "Vendor outage directly causes business outage"],
    peImpact: "Concentration can affect continuity, negotiating leverage, margin durability, and the future buyer's risk assessment. The material question is not concentration alone, but whether management understands and governs the dependency.",
    whatGood: "Critical vendors are risk-tiered; concentration and switching constraints are quantified; alternatives or contingencies are documented; and the sponsor receives visibility into mitigation progress." },
  { id: 61, domain: "VP", name: "Renewal, Change-of-Control and Transition Obligations Unmapped", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Contract events that could affect price, continuity, or integration — renewals, auto-extensions, change-of-control clauses, termination rights, and data-return or transition obligations — have not been identified before close.",
    symptoms: ["No consolidated view of renewal dates and notice windows", "Change-of-control clauses discovered after signing", "Auto-renewals lock in unfavorable terms mid-integration", "Transition and data-return obligations surface during carve-out or migration"],
    peImpact: "An overlooked provision may create avoidable cost, delay, or continuity exposure. It can also weaken the Day-1 plan if the operating team assumes rights, data, or services that the contract does not provide.",
    whatGood: "Material obligations are summarized in an operational contract map with owners, deadlines, required consents, commercial decisions, transition rights, and escalation into the closing workplan." },
  { id: 31, common: true, domain: "AC", name: "Evidence Cannot Be Produced Without a Fire Drill", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "When auditors or diligence teams request evidence of controls (access reviews, change approvals, incident postmortems), the team scrambles to locate or reconstruct documentation.",
    symptoms: ["Audit preparation takes weeks and pulls people off productive work", "Evidence is reconstructed from memory rather than collected contemporaneously", "Different people produce conflicting evidence for the same control", "Audit findings cite missing or insufficient evidence"],
    peImpact: "Evidence weakness reduces confidence in management assertions and expands diligence uncertainty. It also consumes scarce capacity during a transaction and may conceal whether a control gap or only a documentation gap exists.",
    whatGood: "A maintained evidence index links material obligations and controls to owners, source records, review dates, exceptions, and remediation. Standard requests can be answered from the operating process rather than reconstructed for diligence." },
  { id: 62, domain: "AC", name: "Controls Exist on Paper, Not in Operating Practice", severity: "High", timing: "Pre-Close Red Flag",
    definition: "Documented policies and controls describe one operating reality; employees follow another. The gap between stated controls and daily practice is wide enough that the documentation gives false assurance.",
    symptoms: ["Control owners cannot explain how their controls actually run", "Reviews and approvals are back-filled at audit or diligence time", "Employees follow undocumented workarounds to get work done", "Findings repeat across successive audits or exams"],
    peImpact: "A documented control cannot protect the business if it is not embedded in the workflow. The gap can create regulatory, client, audit, and exit-readiness exposure while giving the sponsor false confidence that the risk is already managed.",
    whatGood: "Material controls map directly to real procedures, named owners, evidence, exception handling, and periodic testing. Policy language changes when the operating model changes." },
  { id: 63, domain: "AC", name: "Regulatory and Client Commitments Lack Named Owners", severity: "High", timing: "Pre-Close Red Flag",
    definition: "Obligations to regulators and clients — reporting deadlines, service commitments, contractual controls, licensing conditions — exist, but responsibility for monitoring and meeting them is unclear or informal.",
    symptoms: ["No register of regulatory and client commitments with owners", "Deadlines met through individual memory and last-minute scrambles", "Client contractual commitments unknown to the teams delivering them", "Ownership disputes surface only after a miss"],
    peImpact: "Unowned commitments can become service, compliance, or reputation events and may restrict the sponsor's ability to demonstrate a controlled operating environment. They also complicate integration when obligations transfer across teams or entities.",
    whatGood: "A single obligations register assigns an accountable owner, evidence requirement, due date, escalation threshold, and closure standard to each material commitment." },
  { id: 41, common: true, domain: "KO", name: "No Investment-Thesis KPI Tree", severity: "Critical", timing: "First 100 Days",
    definition: "The portfolio company does not have a defined set of operational KPIs, and operating metrics are not connected to the assumptions underpinning the deal. Performance is discussed anecdotally rather than measured. There is no baseline and no way to demonstrate improvement.",
    symptoms: ["Board meetings discuss operations qualitatively, not quantitatively", "No dashboard or regular metrics report exists", "Different stakeholders cite different numbers for the same metric", "Improvement initiatives cannot demonstrate measurable impact"],
    peImpact: "Without a driver-based view, the sponsor cannot tell whether the value-creation plan is working early enough to intervene. Good or bad financial results arrive without an operating explanation or a clear management response.",
    whatGood: "A focused KPI tree connects thesis assumptions to operating drivers, owners, baselines, targets, thresholds, and actions. Management reviews leading indicators; the board receives the subset relevant to value and risk." },
  { id: 42, common: true, domain: "KO", name: "No Weekly Operating Cadence", severity: "Critical", timing: "First 100 Days",
    definition: "There is no structured operating rhythm — no weekly or monthly forum where metrics are reviewed, issues surfaced, and decisions made — and the board receives no consistent, structured operational reporting between meetings.",
    symptoms: ["No standing operational review with agenda, metrics, and decision log", "Problems surface through escalation, not proactive review", "Board updates are verbal, anecdotal, and inconsistent between packs", "The sponsor cannot assess operational risk between board meetings"],
    peImpact: "The value-creation plan lacks an execution mechanism. Without cadence, ownership can decay, cross-functional dependencies remain unresolved, and the sponsor has limited early warning when progress or operating risk moves off plan.",
    whatGood: "A weekly operating review uses a stable agenda, decision-useful KPI pack, risk and dependency log, named actions, and explicit escalation thresholds. Outputs feed a concise monthly sponsor and board view." },
  { id: 64, domain: "KO", name: "Synergies and Benefits Not Baselined or Validated", severity: "High", timing: "First 100 Days",
    definition: "The value-creation initiatives underwriting the deal have no starting baselines, no accountable owners, and no credible tracking. Benefits are asserted in the model but never measured in the business.",
    symptoms: ["Synergy estimates exist in the deal model but nowhere in operations", "No pre-close baseline against which improvement can be shown", "Initiative owners are unaware they own a number", "Benefit claims cannot be reconciled to the P&L"],
    peImpact: "The sponsor cannot distinguish activity from value capture or determine whether the deal thesis remains achievable. Unvalidated benefits can also undermine management credibility and the eventual exit narrative.",
    whatGood: "Each material benefit has an approved baseline, owner, timing, calculation method, evidence source, confidence level, and finance validation. Shortfalls trigger decisions rather than narrative updates." },
  { id: 65, domain: "KO", name: "Platform and Add-On Reporting Definitions Do Not Align", severity: "High", timing: "First 100 Days",
    definition: "Companies across the platform report similar metrics under different definitions — revenue timing, margin construction, utilization, churn — preventing reliable comparison, consolidation, and sponsor visibility.",
    symptoms: ["The same KPI means different things in different companies", "Consolidation requires manual re-work every reporting cycle", "Management debates whose number is right instead of what to do", "Add-ons still report on legacy definitions quarters after close"],
    peImpact: "Inconsistent definitions delay visibility, obscure performance, and make synergy or integration claims difficult to validate. The platform also loses the ability to transfer learning from one acquisition to the next.",
    whatGood: "A controlled metric dictionary defines owners, formulas, data sources, reporting frequency, and transition dates. Temporary local measures are reconciled explicitly until the common reporting model is live." },
  { id: 51, domain: "OP", name: "Critical Talent Retention and Cultural Integration Unplanned", severity: "High", timing: "First 100 Days",
    definition: "The acquisition plan identifies legal close and organization structure but does not define which people, behaviors, relationships, and operating practices must be retained, changed, or integrated.",
    symptoms: ["Retention decisions are based on title rather than operating importance", "Employees receive inconsistent messages about the future model", "Platform standards are imposed without understanding local strengths", "Cultural concerns are discussed but have no owner or action plan"],
    peImpact: "The platform may lose the talent and client knowledge required to preserve value while also failing to establish the behaviors needed for the combined operating model. Integration then becomes a choice between drift and disruption.",
    whatGood: "Critical talent and cultural dependencies are assessed before close; retention and communication actions have owners; local strengths worth preserving are explicit; and operating expectations are reinforced through management cadence." },
  { id: 66, common: true, domain: "OP", name: "No Dedicated Integration Owner", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Integration is distributed across executives who are also running the business. No single person owns the integration outcome, sequence, and decisions across add-ons.",
    symptoms: ["Integration tasks assigned as side-of-desk work to functional leaders", "Cross-company decisions stall waiting for someone with authority", "Each add-on integrated differently — or not at all", "Integration status reporting doesn't exist or is assembled ad hoc"],
    peImpact: "The operating gap is greatest when acquisition pace exceeds dedicated integration capacity. Work can fall between the deal team and management, creating delays, rework, and avoidable use of senior leadership attention.",
    whatGood: "One accountable integration owner has a defined mandate, decision rights, workstream owners, dependency view, escalation route, and sponsor reporting cadence. The role may be temporary, but the ownership is explicit." },
  { id: 67, common: true, domain: "OP", name: "Key-Person and Knowledge Dependency", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "Critical operating knowledge and capability are concentrated in a small number of people — undocumented, unbacked-up, and unavailable when they leave, take vacation, or burn out.",
    symptoms: ["Specific tasks can only be done by specific people, with no substitutes", "Resolution times spike when particular individuals are unavailable", "Onboarding takes months because little is written down", "Post-acquisition knowledge transfer cannot even be scoped"],
    peImpact: "A departure or distraction can impair continuity during the ownership transition and may affect deal protections, retention priorities, or the Day-1 plan. The risk is often larger than the organization chart suggests because knowledge dependency is not visible there.",
    whatGood: "Critical roles and knowledge are mapped; backups and succession are explicit; essential procedures and relationships are documented; and retention or transfer actions reflect evidence of dependency." },
  { id: 68, common: true, domain: "OP", name: "Management Capacity Overloaded by Concurrent Acquisitions", severity: "Critical", timing: "Pre-Close Red Flag",
    definition: "The management team's practical capacity — bandwidth, bench depth, and succession — is insufficient for what the plan asks of it: running the business, absorbing acquisitions, and executing value creation at the same time.",
    symptoms: ["The acquisition pipeline exceeds the team's ability to diligence and integrate each deal", "Executives hold two or three roles' worth of responsibility", "No succession or backup for critical operating roles", "Value-creation initiatives stall whenever operations demand attention"],
    peImpact: "An attractive acquisition pipeline can exceed the platform's absorption capacity. The resulting attention constraint raises execution risk across both the new deals and the existing business, even when each initiative is individually sensible.",
    whatGood: "Management capacity is treated as a finite underwriting constraint. Critical work is sequenced, lower-value activity is stopped, temporary support is added where justified, and the board sees explicit trade-offs." },
];

// ─── SCORER DIMENSIONS ──────────────────────────────────────
export const SCORER_DIMS = [
  { key: "incident", label: "Issue & Escalation Governance", short: "Escalation",
    low: "Issues are handled case by case, with no common severity or escalation model",
    mid: "An informal process exists, but ownership and escalation vary by team",
    high: "Business-impact severity, named response roles, escalation thresholds, and corrective-action follow-through are consistently used" },
  { key: "change", label: "Operating Change Control", short: "Change",
    low: "Material changes occur without defined approval, impact review, or fallback plans",
    mid: "Informal approval exists, but risk, dependencies, and outcomes are not tracked consistently",
    high: "Material changes have decision owners, risk classification, affected-party review, validation, and rollback criteria" },
  { key: "vendor", label: "Vendor Oversight", short: "Vendor",
    low: "No inventory, no scorecards, renewal surprises, unknown concentration risks",
    mid: "Basic inventory exists, some SLA tracking, renewal dates known",
    high: "Active scorecards, contract and renewal calendar, concentration review, accountable owners, and transition planning" },
  { key: "audit", label: "Evidence & Control Readiness", short: "Evidence",
    low: "Evidence is scattered and management reconstructs answers when diligence, clients, or auditors ask",
    mid: "Some controls and evidence are documented, with gaps in ownership, consistency, or testing",
    high: "Material obligations and controls have owners, maintained evidence, exception handling, and periodic validation" },
  { key: "kpi", label: "KPI & Cadence", short: "KPI",
    low: "No regular operating review, limited KPI ownership, and ad hoc board reporting",
    mid: "Periodic reviews and some metrics exist, but definitions, targets, or decisions are inconsistent",
    high: "A focused thesis-linked KPI set, clear thresholds, weekly operating cadence, and concise board reporting are in place" },
  { key: "process", label: "Ownership, Capacity & Knowledge", short: "Ownership",
    low: "Critical work depends on individual heroics, with unclear ownership and little documented backup",
    mid: "Some ownership and documentation exist, but key-person or management-capacity risks remain",
    high: "Critical work has accountable owners, documented procedures, backup capacity, and explicit cross-functional decision rights" },
];

// Recommended action per dimension, used by the dynamic scorer results
export const DIM_RECS = {
  incident: {
    days: "Days 1–14",
    action: "Install an issue-governance model with business-impact severity, named response roles, escalation thresholds, and corrective-action follow-through.",
    impact: "Without a shared model, routine issues consume senior attention while material problems can remain invisible. Disciplined escalation and root-cause follow-through helped reduce critical incidents by nearly 50% on the institutional platform I operated.",
  },
  change: {
    days: "Days 1–14",
    action: "Define decision rights for material operating changes, including risk classification, affected-party review, outcome validation, and fallback criteria.",
    impact: "Uncoordinated change can create service disruption, employee confusion, duplicated work, and unclear accountability. A controlled decision path makes execution faster because ownership and dependencies are visible before the change is made.",
  },
  vendor: {
    days: "Days 1–30",
    action: "Build the vendor and contract inventory, map concentration and transition risk, establish the renewal calendar, and assign accountable business owners.",
    impact: "Unknown renewals, contractual obligations, and single-point dependencies can create avoidable cost or continuity exposure after close. A reliable baseline is also required before savings assumptions can be validated.",
  },
  audit: {
    days: "Days 15–45",
    action: "Build an evidence index that connects material obligations and controls to real procedures, owners, source records, exceptions, and remediation.",
    impact: "Reconstructing evidence during diligence consumes scarce management capacity and reduces confidence in management assertions. The evidence process should show that controls operate in practice—not merely that policies exist.",
  },
  kpi: {
    days: "Days 1–30",
    action: "Define a focused KPI tree tied to the investment thesis, baseline performance, and launch a weekly decision-oriented operating review with concise sponsor reporting.",
    impact: "Without leading indicators and a regular decision cadence, the sponsor sees outcomes after the opportunity to intervene has passed. A clear KPI tree connects operating activity to the assumptions and risks being underwritten.",
  },
  process: {
    days: "Days 15–60",
    action: "Clarify ownership and decision rights, identify management-capacity and key-person constraints, document critical procedures, and establish practical backup coverage.",
    impact: "Unclear ownership and concentrated knowledge can interrupt execution during an ownership transition. The risk is often larger than the organization chart suggests because operating dependency and available management capacity are not visible there.",
  },
};

export const CONTEXT_OPTIONS = [
  { key: "pre", label: "Evaluating a target (pre-close diligence)" },
  { key: "post", label: "First 100 days post-close" },
  { key: "mid", label: "Mid-hold period optimization" },
];

export const CONTEXT_CALLOUTS = {
  stable: {
    pre: "The self-assessment indicates a relatively controlled posture. Validate it with targeted evidence before relying on that conclusion in underwriting.",
    post: "The self-assessment indicates a relatively controlled starting point. Focus on keeping ownership and cadence durable as the value-creation plan accelerates.",
    mid: "The self-assessment indicates a relatively controlled foundation. Test its durability and concentrate improvement work on the few areas that remain dependent on individuals or manual effort.",
  },
  atRisk: {
    pre: "The responses suggest operating friction that may constrain execution. Convert the highest-risk areas into targeted evidence requests and explicit Day-1 priorities.",
    post: "The responses suggest gaps in operating ownership or control. Use the first 30 days to establish the management cadence, escalation model, and accountability required by the plan.",
    mid: "The responses suggest operating drift. Re-establish ownership, evidence, and management cadence before the gaps become embedded in the exit narrative.",
  },
  critical: {
    pre: "The responses indicate possible material operating exposure. A formal evidence-based review before close can determine which risks belong in underwriting, ownership planning, and the Day-1 Critical Path.",
    post: "The responses indicate a need for near-term operating stabilization. Prioritize the controls and ownership gaps most likely to interrupt execution in the first 30 days.",
    mid: "The responses indicate material operating gaps that may weaken value capture or exit readiness. Establish the evidence, ownership, and intervention sequence before adding more initiatives.",
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
    --muted: #1F2937;
    --maxcopy: 70ch;
    --nav-h: 76px;
    --card-radius: 12px;
    --card-border: 1px solid #E4E2DC;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.04);
    --card-shadow-hover: 0 4px 16px rgba(0,0,0,0.08);
    --card-pad-x: 28px;
    --card-pad-top: 28px;
    --card-pad-bottom: 32px;
    --card-bg: #fff;
    --card-gap: 20px;
    --card-accent-width: 3px;
    --card-transition: all 0.2s ease;
  }

  body {
    background: ${COLORS.offWhite};
    font-family: ${FONTS.body};
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    max-width: 100vw;
  }
  html { overflow-x: hidden; }

  main, #root { font-size: inherit; }

  h1, h2, h3 {
    font-family: ${FONTS.heading};
    line-height: 1.15;
    letter-spacing: 0.2px;
  }

  main p { max-width: var(--maxcopy); font-size: 0.9rem; }
  main li { font-size: 0.9rem; }
  td p, th p, nav p, footer p, .no-max-width p { max-width: none; font-size: inherit; }

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

  /* ── Main container: responsive padding ─────────────────────── */
  .main-container { padding-left: 32px; padding-right: 32px; }
  @media (max-width: 768px) {
    .main-container { padding-left: 16px; padding-right: 16px; padding-top: 24px !important; padding-bottom: 48px !important; }
  }
  @media (max-width: 480px) {
    html { font-size: 16px; }
    .main-container { padding-left: 12px; padding-right: 12px; padding-top: 20px !important; padding-bottom: 40px !important; }
  }

  /* ── Hero block: edge-to-edge bleed matching main padding ───── */
  .hero-block { margin-left: -32px; margin-right: -32px; }
  @media (max-width: 768px) {
    .hero-block { margin-left: -16px; margin-right: -16px; padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 480px) {
    .hero-block { margin-left: -12px; margin-right: -12px; padding-left: 16px !important; padding-right: 16px !important; }
    .hero-headline { font-size: 1.4rem !important; }
  }

  /* ── Filter controls: full-width column on mobile ────────── */
  @media (max-width: 600px) {
    .lever-filters { flex-direction: column !important; align-items: stretch !important; }
    .lever-filters input, .lever-filters select { min-width: 0 !important; flex: none !important; width: 100%; box-sizing: border-box; }
  }

  /* ── Mobile nav ─────────────────────────────────────────────── */
  .nav-hamburger { display: none; }
  .nav-current-page { display: none; }
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .nav-cta   { display: none !important; }
    /* Shrink logo to 38 px on mobile — keeps aspect ratio ~4:1 → ~152 px wide */
    .nav-logo  { height: 38px !important; }
    /* Logo column: never shrink so the page label always has room to centre */
    .nav-logo-col { flex-shrink: 0 !important; }
    .nav-hamburger {
      display: flex; align-items: center; justify-content: center;
      width: 44px; height: 44px; flex-shrink: 0;
      background: transparent; border: none; cursor: pointer;
      color: ${COLORS.navy};
    }
    /*
     * Page-label: was position:absolute which caused it to collide with the
     * logo.  Now it is a flex item (flex:1) that fills the gap between the
     * logo column and the hamburger and centres its text there.
     */
    .nav-current-page {
      display: flex;
      flex: 1 1 auto;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 0 6px;
      font-family: ${FONTS.body}; font-size: 0.78rem; font-weight: 700;
      color: ${COLORS.navy}; letter-spacing: 0.4px; text-transform: uppercase;
      white-space: nowrap; text-overflow: ellipsis;
      pointer-events: none;
    }
    .nav-mobile-menu {
      position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
      background: ${COLORS.white}; border-bottom: 3px solid ${COLORS.gold};
      box-shadow: 0 4px 16px rgba(27, 28, 31, 0.14);
      display: flex; flex-direction: column; padding: 12px 16px 16px; gap: 4px;
      animation: slideDown 0.18s ease-out forwards;
    }
    .nav-mobile-item {
      background: transparent; border: none; width: 100%;
      text-align: left; padding: 14px 12px; border-radius: 4px;
      cursor: pointer; transition: all 0.15s;
    }
  }

  /* ── Touch targets ──────────────────────────────────────────── */
  button { min-height: 44px; }
  input[type="text"],
  input[type="email"],
  input[type="search"],
  select { min-height: 44px; box-sizing: border-box; }
  /* Active feedback for touch devices (hover doesn't fire on touch) */
  button:active, a:active { opacity: 0.75; }

  /* Sticky nav offset: prevent anchor targets from hiding behind the 76px nav */
  [id] { scroll-margin-top: 90px; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.3s ease-out forwards; }
  .lever-expand { animation: fadeIn 0.2s ease-out forwards; }

  /* ── Hero mobile responsive ────────────────────────────────────── */
  @media (max-width: 600px) {
    .hero-headline { font-size: 1.85rem !important; line-height: 1.25 !important; }
    .hero-subheadline { font-size: 0.92rem !important; }
    .hero-ctas { flex-direction: column; }
    .hero-ctas a,
    .hero-ctas button {
      display: block !important;
      width: 100% !important;
      text-align: center !important;
      box-sizing: border-box;
    }
  }

  /* ── Lever row: badge wrap on narrow screens ────────────────────── */
  @media (max-width: 480px) {
    .lever-row { flex-wrap: wrap; }
    .lever-badges { flex-shrink: 1 !important; flex-wrap: wrap; }
  }

  /* ── Section title: reduce font size on small phones ───────────── */
  @media (max-width: 480px) {
    .section-title { font-size: 1.4rem !important; }
  }

  /* ── Card: reduce padding on small phones ───────────────────────── */
  @media (max-width: 480px) {
    .card-inner { padding: 16px !important; }
  }

  /* ── Lever expand detail: reduce left indent on narrow phones ───── */
  @media (max-width: 480px) {
    .lever-expand-detail { padding-left: 22px !important; }
  }

  /* ── Hero: reduce top/bottom padding on small screens ──────────── */
  @media (max-width: 480px) {
    .hero-block { padding-top: 28px !important; padding-bottom: 24px !important; }
  }

  /* ── Table cells: prevent horizontal overflow on small phones ───── */
  @media (max-width: 600px) {
    table { width: 100%; }
    table th, table td {
      word-break: break-word;
      hyphens: auto;
      padding: 6px 8px !important;
      font-size: 0.78rem !important;
    }
  }

  /* ── 360 px breakpoint (Galaxy S-series & similar) ─────────────── */
  @media (max-width: 360px) {
    html { font-size: 14px; }
    .section-title { font-size: 1.1rem !important; }
    .card-inner { padding: 12px !important; }
    .nav-logo { height: 30px !important; }
    .nav-current-page { font-size: 0.72rem; }
    ::-webkit-scrollbar { width: 3px; }
    .main-container { padding-left: 10px; padding-right: 10px; }
  }

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

  /* ══════════════════════════════════════════════════════════════
     MOBILE UX REMEDIATION — spec: devonshire-mobile-ux-spec.html
     Reference: 390×844 (iPhone 14) · All rules @ max-width 768px
     ══════════════════════════════════════════════════════════════ */


  /* Issue 02 — Persona cards */
  @media (max-width: 768px) {
    .buyer-cards-wrapper { gap: 20px !important; }
    .buyer-card { padding: 24px 20px 28px !important; border-radius: 12px !important; }
    .proof-quote { margin-top: 16px !important; padding: 14px 16px !important; border-left-width: 3px !important; }
  }

  /* Issue 03 — Cost of inaction cards */
  @media (max-width: 768px) {
    .cost-cards-grid { gap: 16px !important; }
    .cost-card { padding: 20px 20px 24px !important; border-radius: 12px !important; }
    .pe-consequence { margin-top: 16px !important; padding: 16px !important; }
  }

  /* Issue 04 — Pricing cards */
  .pricing-grid { padding-top: 20px; }
  .pricing-card.recommended {
    position: relative !important;
    background: #F4F4F3 !important;
    border: 1px solid rgba(27,28,31,.16) !important;
    border-top: 3px solid #6E1F2E !important;
    box-shadow: none !important;
    transform: none;
    z-index: 2;
  }
  .pricing-card.recommended::before {
    content: 'Recommended';
    position: absolute; top: -14px; left: 50%;
    transform: translateX(-50%);
    background: #6E1F2E; color: #fff;
    font-size: 0.66rem; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; padding: 5px 18px;
    border-radius: 0; white-space: nowrap;
  }
  .pricing-card.recommended .price { font-size: 1.1rem; font-weight: 600; }
  @media (max-width: 768px) {
    .pricing-grid { gap: 20px !important; }
    .pricing-card { padding: 24px 20px 28px !important; border-radius: 12px !important; }
    .pricing-card.recommended { transform: none !important; padding: 32px 20px 28px !important; }
    .pricing-card .price { font-size: 1.1rem !important; font-weight: 600 !important; }
  }

  /* Issue 05 — Category pills: horizontal scroll */
  @media (max-width: 768px) {
    .domain-pills-row {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 4px 20px !important;
      margin: 16px -20px 0 !important;
      mask-image: linear-gradient(to right, transparent 0, black 20px, black calc(100% - 24px), transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 20px, black calc(100% - 24px), transparent 100%);
    }
    .domain-pills-row::-webkit-scrollbar { display: none; }
    .domain-pills-row > span {
      flex-shrink: 0 !important;
      padding: 8px 16px !important;
      min-height: 36px !important;
      white-space: nowrap !important;
      display: inline-flex !important;
      align-items: center !important;
    }
  }

  /* Issue 06 — Section wrappers: remove box borders on mobile */
  @media (max-width: 768px) {
    .section-wrapper {
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      padding: 32px 20px !important;
      margin-bottom: 0 !important;
    }
    .section-wrapper.section-no-pad { padding: 0 !important; }
    .section-wrapper + .section-wrapper::before {
      content: '';
      display: block;
      width: 60%;
      height: 1px;
      background: #E8E6E0;
      margin: 0 auto 28px;
    }
  }

  /* Issue 07 — Nav: 56px height, hide page label */
  @media (max-width: 768px) {
    .site-nav { height: 56px !important; min-height: 56px !important; }
    :root { --nav-h: 56px; }
    .nav-current-page { display: none !important; }
  }

  /* Issue 08 — Track record */
  @media (max-width: 768px) {
    .track-result { padding: 16px !important; }
  }

  /* Issue 09 — FAQ accordion touch targets */
  @media (max-width: 768px) {
    .faq-row { min-height: 52px !important; padding: 16px 0 !important; }
    .expand-icon { font-size: 0.9rem !important; min-width: 24px !important; text-align: center; }
  }

  /* Issue 10 — Footer 2×2 grid, form inputs */
  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px 20px !important; padding: 40px 20px !important; }
    .footer-form input[type="email"] { height: 44px !important; font-size: 0.8rem !important; padding: 0 12px !important; box-sizing: border-box !important; }
    .footer-form button[type="submit"] { height: 48px !important; width: 100% !important; font-size: 0.8rem !important; }
  }

  /* ══════════════════════════════════════════════════════════════
     SOCIAL PROOF — spec: devonshire-social-proof-spec.html
     ══════════════════════════════════════════════════════════════ */

  /* Item 04 — Proof metrics strip */
  .proof-metrics-strip {
    background: ${COLORS.navy};
    display: flex; justify-content: center;
    gap: 64px; padding: 28px 32px;
    width: 100vw; margin-left: calc(-50vw + 50%);
    margin-bottom: 24px;
  }
  .proof-metric { text-align: center; }
  .proof-metric-number {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 1.6rem; font-weight: 400; color: #C97B8A; line-height: 1.1;
  }
  .proof-metric-label {
    font-size: 0.72rem; color: rgba(255,255,255,0.7);
    font-weight: 500; margin-top: 4px; letter-spacing: 0.5px;
  }
  @media (max-width: 768px) {
    .proof-metrics-strip { gap: 32px; padding: 24px 20px; }
    .proof-metric-number { font-size: 1.2rem; }
  }

  /* Item 05 — Outcome cards */
  .outcomes-visible { display: flex; flex-direction: column; gap: 16px; }
  .outcomes-hidden { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
  .outcomes-hidden.expanded { max-height: 2000px; margin-top: 16px; }
  @media (max-width: 768px) {
    .outcomes-visible .outcome-card:nth-child(2) { display: none; }
  }

  /* Item 06 — Confidentiality note */
  .confidentiality-note {
    background: #F4F4F3;
    border-left: 3px solid ${COLORS.steel};
    border-radius: 0 6px 6px 0;
    padding: 14px 16px;
    font-size: 0.72rem;
    color: #1F2937;
    margin-top: 16px;
    font-family: ${FONTS.body};
    line-height: 1.5;
  }
  .confidentiality-note strong { color: ${COLORS.navy}; font-weight: 600; }

  /* Item 01 — Bio headshot */
  .bio-headshot {
    width: 80px; height: 80px;
    border-radius: 50%; object-fit: cover;
    border: 2.5px solid rgba(110,31,46,0.3);
    flex-shrink: 0;
    background: ${COLORS.navy};
  }
  @media (max-width: 768px) {
    .bio-headshot { width: 64px; height: 64px; }
  }

  /* Items 02+03 — Credential logo strip */
  .credential-logos {
    display: flex; flex-wrap: wrap; align-items: center;
    gap: 24px; margin-top: 16px; padding-top: 12px;
    border-top: 1px solid #E4E7EC;
    margin-bottom: 14px;
  }
  .credential-label {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: #1F2937;
    width: 100%; flex-shrink: 0; margin-bottom: -8px;
  }
  .credential-logos img {
    height: 18px; width: auto; opacity: 0.45;
    filter: grayscale(100%); transition: opacity 0.2s ease; flex-shrink: 0;
  }
  .credential-logos img:hover { opacity: 0.7; }
  @media (max-width: 768px) {
    .credential-logos { gap: 16px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
    .credential-logos::-webkit-scrollbar { display: none; }
    .credential-logos img { height: 14px; }
  }

  /* Item 07 — Endorsement quote */
  .endorsement-section { background: #F4F4F3; padding: 48px 32px; border-top: 1px solid #E5E3DF; border-bottom: 1px solid #E5E3DF; }
  .endorsement-container { max-width: 640px; margin: 0 auto; text-align: center; }
  .endorsement-quote-mark {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 64px; color: ${COLORS.gold}; opacity: 0.3;
    line-height: 0.5; margin-bottom: 8px;
  }
  .endorsement-text {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 1rem; font-weight: 400;
    color: ${COLORS.navy}; line-height: 1.6; margin: 0;
  }
  .endorsement-attribution {
    display: inline-flex; align-items: center;
    gap: 12px; margin-top: 20px;
  }
  .endorser-name { font-size: 0.72rem; font-weight: 600; color: ${COLORS.navy}; }
  .endorser-title { font-size: 0.65rem; color: #1F2937; margin-top: 2px; }
  @media (max-width: 768px) {
    .endorsement-section { padding: 40px 20px; }
    .endorsement-text { font-size: 0.9rem; }
  }

  /* ══════════════════════════════════════════════════════════════
     WHITESPACE — spec: devonshire-whitespace-spec.html
     ══════════════════════════════════════════════════════════════ */

  /* Tinted background on ALL viewports */
  .section-tinted {
    background: #F4F4F3 !important;
    border-top: 1px solid #E5E3DF;
    border-bottom: 1px solid #E5E3DF;
  }

  /* Desktop-only whitespace layout */
  @media (min-width: 769px) {
    /* Full-bleed tinted sections */
    .section-tinted {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      padding: 56px 32px;
      border: none !important;
      box-shadow: none !important;
    }
    /* Keep inner content centered at site max-width */
    .section-tinted > * {
      max-width: 1100px;
      margin-left: auto;
      margin-right: auto;
    }
    /* Contained + contained = 32px gap (bg change handles tinted transitions) */
    .section-contained + .section-contained {
      margin-top: 32px;
    }
    /* Extra breathing room after dark hero/metrics area */
    .proof-metrics-strip + .section-contained {
      margin-top: 40px;
    }
  }

  /* ══════════════════════════════════════════════════════════════
     CTA HIERARCHY — spec: devonshire-cta-flow-spec.html
     ══════════════════════════════════════════════════════════════ */

  /* Card text links (persona cards + path cards) */
  .card-text-link {
    display: inline-block;
    font-size: 0.75rem; font-weight: 600;
    color: #1B1C1F;
    text-decoration: underline;
    text-decoration-color: rgba(27,28,31,0.3);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s, color 0.2s;
    margin-top: 16px;
    padding: 0; background: none; border: none;
    cursor: pointer; font-family: inherit;
  }
  .card-text-link:hover {
    text-decoration-color: #6E1F2E;
    color: #6E1F2E;
  }

  /* ══════════════════════════════════════════════════════════════
     IA SPEC — spec: devonshire-ia-spec.html
     ══════════════════════════════════════════════════════════════ */

  /* McKinsey quote — full-width dark navy bar */
  .mckinsey-quote {
    background: #1B1C1F !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 40px 32px !important;
    margin: 0 !important;
    width: 100vw !important;
    margin-left: calc(-50vw + 50%) !important;
    text-align: center;
  }
  .mckinsey-quote p {
    color: rgba(255,255,255,0.9) !important;
    font-family: 'EB Garamond', Georgia, serif !important;
    font-style: normal !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    max-width: 800px;
    margin: 0 auto !important;
  }
  .mckinsey-quote p strong {
    color: #fff !important;
    font-weight: 600 !important;
    font-style: normal !important;
  }
  .mckinsey-quote .attribution, .mckinsey-quote small {
    display: block !important;
    margin-top: 16px !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 0.72rem !important;
    font-weight: 600 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
    color: #C97B8A !important;
  }
  @media (max-width: 768px) {
    .mckinsey-quote {
      padding: 32px 20px !important;
    }
    .mckinsey-quote p {
      font-size: 0.8rem !important;
    }
  }

  /* Sub-heading: path cards → pricing cards */
  .pricing-subheading {
    font-family: 'EB Garamond', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #1B1C1F;
    margin-top: 40px;
    margin-bottom: 20px;
    padding-top: 32px;
    border-top: 1px solid #E4E2DC;
  }

  /* Sub-heading: track vignettes → outcome cards */
  .outcomes-subheading {
    font-family: 'EB Garamond', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #1B1C1F;
    margin-top: 40px;
    margin-bottom: 16px;
    padding-top: 32px;
    border-top: 1px solid #E4E2DC;
  }

  /* FAQ category grouping */
  .faq-categories { display: flex; flex-direction: column; gap: 32px; }
  .faq-category-heading {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1B1C1F;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid #6E1F2E;
    display: inline-block;
  }

  /* ══════════════════════════════════════════════════════════════
     TYPOGRAPHY — spec: devonshire-typography-spec.html
     ══════════════════════════════════════════════════════════════ */

  /* Items 01+02 — Heading weight + type scale */
  h1 {
    font-weight: 400 !important;
    font-size: 2.4rem;
    line-height: 1.15;
    letter-spacing: -0.2px;
  }
  h2, .section-title {
    font-weight: 400 !important;
    font-size: 1.4rem;
    line-height: 1.3;
    letter-spacing: 0px;
    margin-bottom: 12px;
  }
  h3 {
    font-weight: 600 !important;
    font-size: 1rem;
    line-height: 1.3;
    margin-bottom: 8px;
  }
  .faq-row h3, .faq-row {
    font-size: 1rem !important;
    font-weight: 600 !important;
    line-height: 1.35;
  }

  /* Card body text */
  .buyer-card p, .cost-card p, .pricing-card p,
  .outcome-card p, .path-card p, .track-vignette p {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  /* List items */
  li { font-size: 0.9rem; line-height: 1.5; margin-bottom: 6px; }

  /* Small / disclaimer */
  small, .disclaimer, .confidentiality-note p {
    font-size: 0.72rem;
    line-height: 1.5;
    color: #1F2937;
  }

  /* Item 03 — Unified label system */
  .context-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem !important;
    font-weight: 600 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase;
    color: #1B1C1F;
  }
  .hero-category {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    letter-spacing: 2px !important;
    text-transform: uppercase;
    color: #6E1F2E !important;
    margin-bottom: 16px;
  }
  .pe-consequence .label { color: #96404A !important; }

  /* Item 04 — Context-specific line-heights */
  .section-wrapper > p:first-of-type, h2 + p { line-height: 1.65; }
  blockquote, .mckinsey-quote p, .track-result, .proof-quote { line-height: 1.55; }
  .hero-subheadline, .hero-block p { line-height: 1.55 !important; }

  /* Item 05 — Mobile type scale */
  @media (max-width: 768px) {
    h1 { font-size: 1.8rem !important; line-height: 1.2 !important; }
    h2, .section-title { font-size: 1.4rem !important; }
    h3 { font-size: 1rem !important; }
    .context-label, .hero-category { font-size: 0.7rem !important; }
    .faq-row h3, .faq-row { font-size: 1rem !important; }
  }

  /* ══════════════════════════════════════════════════════════════
     CARD DESIGN — spec: devonshire-card-design-spec.html
     ══════════════════════════════════════════════════════════════ */

  /* Item 01 — Persona cards */
  .buyer-cards-wrapper { align-items: stretch; }
  .proof-quote {
    padding: 14px 16px !important;
    background: #FAFAF8 !important;
    border-radius: 0 6px 6px 0 !important;
    margin-top: 0 !important;
  }
  .buyer-card .card-text-link { margin-top: auto; padding-top: 20px; }

  /* Gold checkmarks — persona, pricing, path cards (NOT cost cards) */
  .buyer-card ul { list-style: none; padding-left: 0; margin-top: 20px; margin-bottom: 0; }
  .buyer-card li, .pricing-card li, .path-card li {
    padding-left: 24px;
    position: relative;
    margin-bottom: 10px;
    line-height: 1.55;
  }
  .buyer-card li::before, .pricing-card li::before, .path-card li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #6E1F2E;
    font-weight: 700;
    font-size: 0.72rem;
  }
  .buyer-card em, .buyer-card i { display: block; margin-bottom: 4px; }

  /* Item 03 — Risk/cost cards */
  .cost-card {
    border: 1px solid #E7C6C9 !important;
    border-top: 3px solid #96404A !important;
    border-radius: var(--card-radius) !important;
    box-shadow: var(--card-shadow) !important;
  }
  .pe-consequence {
    background: #FBF0F0 !important;
    border: none !important;
    border-left: 3px solid #96404A !important;
    border-radius: 0 6px 6px 0 !important;
    padding: 14px 16px !important;
    margin-top: 20px !important;
  }

  /* Item 04 — Path cards */
  .path-cards-grid { display: flex; gap: var(--card-gap); align-items: stretch; flex-wrap: wrap; }
  .path-card {
    background: var(--card-bg) !important;
    border: var(--card-border) !important;
    border-top: 3px solid #6E1F2E !important;
    border-radius: var(--card-radius) !important;
    box-shadow: var(--card-shadow) !important;
    padding: var(--card-pad-top) var(--card-pad-x) var(--card-pad-bottom) !important;
    display: flex !important;
    flex-direction: column !important;
    flex: 1 1 280px;
  }
  .path-card .card-text-link { margin-top: auto; padding-top: 20px; }

  /* Item 05 — Outcome cards (nested in case-cards) */
  .outcome-card {
    background: #F8F7F3 !important;
    border: 1px solid #EDEBE6 !important;
    border-top: none !important;
    border-radius: var(--card-radius) !important;
    box-shadow: none !important;
    padding: 20px 22px;
  }

  /* Item 06 — Track record vignettes (legacy, kept for about page) */
  .track-vignettes-grid { display: flex; gap: var(--card-gap); align-items: stretch; flex-wrap: wrap; }
  .track-vignette {
    background: var(--card-bg) !important;
    border: var(--card-border) !important;
    border-radius: var(--card-radius) !important;
    box-shadow: var(--card-shadow) !important;
    padding: var(--card-pad-top) var(--card-pad-x) var(--card-pad-bottom) !important;
    flex: 1 1 300px;
  }
  .track-result {
    background: #F4F4F3 !important;
    border-left: 3px solid #6E1F2E !important;
    padding: 14px 16px !important;
    border-radius: 0 6px 6px 0 !important;
    margin-top: 20px !important;
  }

  /* ══════════════════════════════════════════════════════════════
     CASE STUDY CARDS — spec: case-study-cards-spec.html
     ══════════════════════════════════════════════════════════════ */

  .case-card {
    background: #fff;
    border: 1px solid #E4E2DC;
    border-radius: var(--card-radius);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    overflow: hidden;
    margin-bottom: 28px;
    transition: box-shadow 0.25s ease;
  }
  .case-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }

  .case-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 28px 16px; border-bottom: 1px solid #EDEBE6;
  }
  .case-header-left { display: flex; align-items: center; gap: 12px; }
  .case-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; flex-shrink: 0;
  }
  .case-icon.stability { background: linear-gradient(135deg, rgba(27,28,31,0.1), rgba(27,28,31,0.05)); color: #1B1C1F; }
  .case-icon.vendor { background: linear-gradient(135deg, rgba(110,31,46,0.08), rgba(110,31,46,0.04)); color: #6E1F2E; }
  .case-label { font-family: 'EB Garamond', serif; font-size: 0.9rem; font-weight: 600; color: #1B1C1F; line-height: 1.3; }
  .case-context { font-size: 0.65rem; color: #1F2937; font-weight: 400; margin-top: 1px; }
  .case-domain-tag {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 4px; flex-shrink: 0; white-space: nowrap;
  }
  .case-domain-tag.ops { background: rgba(27,28,31,0.06); color: #1B1C1F; }
  .case-domain-tag.vendor-tag { background: rgba(110,31,46,0.08); color: #6E1F2E; }

  .case-body { padding: 24px 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .case-section-heading {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 10px;
  }
  .case-section-heading.situation { color: #1B1C1F; }
  .case-section-heading.intervention { color: #1B1C1F; }
  .case-situation p { font-size: 0.8rem; line-height: 1.6; color: #1F2937; margin: 0; }
  .case-intervention ul { list-style: none; padding: 0; margin: 0; }
  .case-intervention li {
    font-size: 0.8rem; line-height: 1.5; color: #1F2937;
    padding: 5px 0 5px 20px; position: relative;
  }
  .case-intervention li::before {
    content: ''; position: absolute; left: 0; top: 12px;
    width: 6px; height: 6px; border-radius: 50%; background: #6E1F2E; opacity: 0.5;
  }

  .case-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 2px solid #6E1F2E; }
  .case-metric { padding: 20px 24px; text-align: center; position: relative; }
  .case-metric:not(:last-child)::after {
    content: ''; position: absolute; right: 0; top: 16px; bottom: 16px;
    width: 1px; background: #EDEBE6;
  }
  .case-metric-number {
    font-family: 'EB Garamond', serif; font-size: 1.4rem; font-weight: 700;
    color: #1B1C1F; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 4px;
  }
  .case-metric-label { font-size: 0.7rem; color: #1F2937; font-weight: 400; line-height: 1.35; }

  .case-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 28px; background: #F4F4F3; border-top: 1px solid rgba(110,31,46,0.18);
  }
  .case-pe-translation { font-size: 0.72rem; color: #1F2937; line-height: 1.5; flex: 1; padding-right: 24px; }
  .case-pe-translation strong {
    font-style: normal; font-weight: 600; color: #1B1C1F;
    font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase; margin-right: 6px;
  }
  .case-read-more { font-size: 0.72rem; font-weight: 600; color: #1B1C1F; text-decoration: none; white-space: nowrap; }
  .case-read-more:hover { color: #6E1F2E; }

  /* Expandable nested outcome cards */
  .outcome-expandable { margin: 0 28px 24px; }
  .outcome-toggle {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.72rem; font-weight: 600; color: #1B1C1F;
    cursor: pointer; padding: 8px 0; border: none; background: none;
    font-family: 'Inter', sans-serif; transition: color 0.2s;
  }
  .outcome-toggle:hover { color: #1B1C1F; }
  .outcome-toggle .chevron { display: inline-block; transition: transform 0.25s ease; font-size: 0.6rem; }
  .outcome-toggle.active .chevron { transform: rotate(90deg); }
  .outcome-cards-container { display: none; padding-top: 12px; }
  .outcome-cards-container.visible { display: block; }
  .outcome-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .outcome-card-title {
    font-family: 'EB Garamond', serif; font-size: 0.8rem; font-weight: 600;
    color: #1B1C1F; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
  }
  .domain-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
  .domain-dot.incidents { background: #96404A; }
  .domain-dot.change { background: #A2653C; }
  .domain-dot.kpi { background: #4A5D74; }
  .domain-dot.vendor-dot { background: #6D4A62; }

  .outcome-step { margin-bottom: 10px; }
  .outcome-step:last-child { margin-bottom: 0; }
  .outcome-step-label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 3px;
  }
  .outcome-step-label.gap { color: #96404A; }
  .outcome-step-label.fix { color: #571825; }
  .outcome-step-label.result { color: #3E6259; }
  .outcome-step p { font-size: 0.72rem; line-height: 1.5; color: #1F2937; margin: 0; }

  .measured-outcomes-label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #1B1C1F; margin-bottom: 20px; display: block;
  }

  @media (max-width: 680px) {
    .case-body { grid-template-columns: 1fr; gap: 20px; }
    .case-metrics { grid-template-columns: repeat(2, 1fr); }
    .case-metric:nth-child(2)::after { display: none; }
    .case-metric:nth-child(1), .case-metric:nth-child(2) { border-bottom: 1px solid #EDEBE6; }
    .case-footer { flex-direction: column; gap: 12px; align-items: flex-start; }
    .case-pe-translation { padding-right: 0; }
    .outcome-grid { grid-template-columns: 1fr; }
  }
`;
