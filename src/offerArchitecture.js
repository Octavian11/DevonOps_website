// Canonical public offer architecture.
// Source: Devonshire_Offer_Architecture_Canonical.md (v1.0, July 14, 2026).
// Keep website copy, analytics values, and CRM-facing labels aligned to these values.

export const OFFERS = Object.freeze({
  executionRiskReview: Object.freeze({
    key: "execution_risk_review",
    name: "Devonshire Execution Risk Review",
    shortName: "Execution Risk Review",
    category: "Operator-led operational diligence",
    price: "From $20,000",
    timing: "2–3 weeks",
    primaryDeliverable: "Execution Risk Memo",
  }),
  operatingDesign: Object.freeze({
    key: "100_day_operating_design",
    name: "100-Day Operating Design",
    category: "100-day operating planning",
    price: "From $30,000",
    timing: "Scoped to the mandate",
    primaryDeliverable: "100-Day Operating Playbook",
  }),
  diligenceToExecution: Object.freeze({
    key: "diligence_to_execution_mandate",
    name: "Diligence-to-Execution Mandate",
    category: "Operational diligence and execution planning",
    price: "From $45,000",
    timing: "LOI → Day 100",
    primaryDeliverable: "Execution Risk Memo + 100-Day Operating Playbook",
  }),
  operatingControlSprint: Object.freeze({
    key: "operating_control_sprint",
    name: "Operating Control Sprint",
    category: "Embedded operating implementation",
    price: "From $25,000",
    timing: "2–6 weeks",
    primaryDeliverable: "Installed Operating Control + Capability Transfer Pack",
  }),
  postCloseControlTower: Object.freeze({
    key: "post_close_control_tower",
    name: "Post-Close Control Tower",
    category: "Post-close execution governance",
    price: "From $10,000/month",
    timing: "3-month initial term",
    primaryDeliverable: "Sponsor Operating Pack + Control Tower Dashboard",
  }),
});

export const DELIVERABLE_KEYS = Object.freeze({
  executionRiskMemo: "execution_risk_memo",
  executionRiskScorecard: "execution_risk_scorecard",
  operatingPlaybook: "100_day_operating_playbook",
  capabilityTransferPack: "capability_transfer_pack",
  sponsorOperatingPack: "sponsor_operating_pack",
  controlTowerDashboard: "control_tower_dashboard",
});
