import { useState } from "react";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY,
} from "../constants.js";
import { CTAButton, ButtonPair, Section, ServicesSamplesRow } from "../components.jsx";

export default function AboutPage() {
  const [outcomeExpanded, setOutcomeExpanded] = useState(false);
  return (
    <div className="fade-in">
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 400, color: COLORS.navy, marginBottom: SPACING.lg }}>About</h1>

      {/* Who I Am */}
      <Section noCTA title="Who I Am">
        <div style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7 }}>
          <p style={{ marginBottom: SPACING.sm }}>
            I've spent 15 years inside the machine — running platform operations at JPMorgan, Barclays, BofA, Lazard, and a $10B+ platform. I've been the person at 2am on an incident bridge, the person rebuilding vendor governance under regulatory pressure, and the person who installed the KPI cadence that finally gave the board real-time visibility.
          </p>
          <p style={{ margin: 0 }}>
            Now I do the same thing for PE portfolio companies — faster, with a playbook that's been pressure-tested at institutional scale. I completed my Executive MBA at Columbia Business School ('26), where I sharpened a PE operator lens on the operational risks that derail value creation in the first 100 days.
          </p>
        </div>
      </Section>

      {/* What I Do */}
      <Section noCTA title="What I Do" variant="tinted">
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "32px" }}>
          I help PE funds and portfolio companies eliminate the operational friction that erodes EBITDA, extends hold periods, and creates risk that surfaces too late. From pre-close diligence through post-close stabilization to ongoing governance — I install the operating discipline that makes value creation plans actually executable.
        </p>
        <div style={{ padding: "14px 18px", background: `${COLORS.navy}06`, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, marginBottom: SPACING.md }}>
          <p style={{ fontFamily: FONTS.body, color: COLORS.navy, lineHeight: 1.6, margin: 0 }}>
            <strong>Best fit:</strong> Lower-middle-market PE funds, independent sponsors, and family offices doing control deals where operational risk can break the value creation plan.
          </p>
        </div>
        <p style={{ fontFamily: FONTS.heading, color: COLORS.gold, fontStyle: "italic", marginBottom: SPACING.md }}>
          Find the gaps. Build the plan. Create the value.
        </p>
        <CTAButton text="Book a Fit Check (15 min)" showAvailability={true} />
      </Section>

      {/* How I Work */}
      <Section noCTA title="How I Work">
        <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
          <p style={{ marginBottom: SPACING.sm }}>For funds evaluating targets, I run an <strong>Ops Diligence Snapshot</strong> that surfaces the friction points standard diligence misses — and delivers a risk-rated findings memo to the investment committee. The findings feed directly into the 100-day plan.</p>
          <p style={{ marginBottom: SPACING.sm }}>Post-close, I execute through a <strong>100-Day Operating Playbook</strong>: install incident governance, change control, vendor oversight, KPI cadence, and board-ready reporting. Fast. Structured. Measurable from Day 1.</p>
          <p style={{ margin: 0 }}>For ongoing operational governance, I run a <strong>Post-Close Control Tower</strong> — the weekly operating rhythm, escalation support, and compliance cadence that keeps the portfolio company from drifting back.</p>
        </div>
      </Section>

      {/* Why Not Big 4 */}
      <Section noCTA title="Why Not a Big 4 Firm?">
        <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
          <p style={{ marginBottom: SPACING.sm }}>
            Big 4 firms are excellent at audit-grade frameworks. I'm not competing with them. What I deliver is what they don't: practitioner-grade execution. I've been the person at 2am running incident command, rebuilding vendor governance under regulatory scrutiny, and building the KPI cadence that gave boards real-time visibility. That's not advisory. That's operating.
          </p>
          <p style={{ margin: 0 }}>
            GP operating teams have doubled in size since 2021 (McKinsey GPMR 2026) — independent of fund AUM. Funds that can't yet build in-house need a practitioner who can install the system and hand it off, not a framework to read about it.
          </p>
        </div>
      </Section>

      {/* Why Trust a Solo Practitioner */}
      <Section noCTA title="Why Trust a Solo Practitioner?">
        <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
          <p style={{ marginBottom: SPACING.sm }}>
            Because the alternative is a team of juniors with a partner's name on the cover page. I do the diagnostic. I write the findings memo. I execute the 100-day plan. There's no handoff to someone who's never run an incident bridge or renegotiated a vendor contract under deadline.
          </p>
          <p style={{ margin: 0 }}>
            The institutional background isn't just a credential — it's the reason the playbook works. I built these systems at a $10B+ platform. The governance model, the severity framework, the KPI cadence, the vendor scorecard — they've been pressure-tested at institutional scale. Your portfolio company gets that same system, installed by the person who built it.
          </p>
        </div>
      </Section>

      {/* Representative Outcomes */}
      <Section title="Representative Outcomes" noCTA variant="tinted">
        <span className="measured-outcomes-label">Measured Outcomes (Post-Implementation)</span>

        {/* Engagement 1 */}
        <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, marginBottom: "20px" }}>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "8px" }}>
            Platform Stabilization · $10B+ platform
          </div>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.15rem", fontWeight: 700, color: COLORS.navy, marginBottom: "14px" }}>
            Platform Stabilization & Reliability
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Context</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "16px" }}>
            A $10B+ platform was scaling rapidly, but its operating cadence hadn't kept pace. The platform had suffered 4 critical outages in 12 months. Portfolio-weighted availability sat at ~94%. High-severity incidents averaged 6 hours to resolve. Leadership time was consumed by firefighting, and stakeholder satisfaction was declining — NPS had dropped from 45 to 38 over 18 months.
          </p>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>What I Built</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "20px" }}>
            Hired and led a 10-person global operations team across New York, London, and Hong Kong in ~6 months. Reset incident management from the ground up: severity model, escalation paths, communications cadence, on-call ownership, and closed-loop postmortems. Standardized runbooks and introduced change discipline through a CAB-lite governance process. Built a KPI dashboard tracking 18 operational metrics with weekly review cadence, and established quarterly stakeholder reviews with 50+ portfolio management and trading desk stakeholders.
          </p>
          <div className="case-metrics" style={{ borderRadius: `0 0 ${RADIUS.md} ${RADIUS.md}`, marginBottom: "16px" }}>
            {[
              { v: "0", l: "Critical outages (18 months)" },
              { v: "99.2%", l: "Availability (from 94%)" },
              { v: "−31%", l: "MTTR reduction" },
              { v: "+22", l: "NPS improvement (38 → 60)" },
            ].map((m, i) => (
              <div key={i} className="case-metric">
                <div className="case-metric-number">{m.v}</div>
                <div className="case-metric-label">{m.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.bodyMuted, lineHeight: 1.55, margin: "0 0 16px" }}>
            Supported ~50% AUM growth with ~12% headcount increase — operational leverage through governance, not headcount.
          </p>
          <div style={{ padding: "12px 16px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` }}>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>PE Translation</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>
              Same playbook installs in a portfolio company in 100 days — at a fraction of the complexity of a $10B fund.
            </p>
          </div>
        </div>

        <button
          onClick={() => setOutcomeExpanded(!outcomeExpanded)}
          style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "8px 16px", fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.navy, fontWeight: 600, cursor: "pointer", marginTop: "20px", marginBottom: outcomeExpanded ? "20px" : "0" }}>
          {outcomeExpanded ? "Show fewer outcomes ▴" : "Show more outcomes ▸"}
        </button>

        {/* Engagement 2 — collapsed by default */}
        {outcomeExpanded && (
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm }}>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "8px" }}>
              Vendor Optimization · Global asset manager, ~$40M vendor program
            </div>
            <div style={{ fontFamily: FONTS.heading, fontSize: "1.15rem", fontWeight: 700, color: COLORS.navy, marginBottom: "14px" }}>
              Vendor Optimization & Cost Control
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Context</div>
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "16px" }}>
              A global asset manager was running a ~$40M annual technology-and-operations vendor program where spend was growing ~22% annually — materially outpacing AUM and business growth. The vendor landscape was fragmented across 15 providers, creating redundancy and weak negotiating leverage. There was no visibility into utilization or value realization, and no structured governance to prevent cost creep.
            </p>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>What I Built</div>
            <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "20px" }}>
              Built a single source of truth for spend across the full $40M program and segmented it by business value and usage. Ran utilization analytics to right-size licensing and surface low-value or duplicative spend. Consolidated 15 providers down to 8 strategic partners, renegotiated terms across major market data and trading platform vendors, and introduced competitive tension through targeted RFP/RFQ processes. Installed ongoing vendor governance: scorecards, contract lifecycle discipline, and QBRs to sustain savings and performance.
            </p>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Measured Outcomes</div>
            <div className="case-metrics" style={{ borderRadius: `0 0 ${RADIUS.md} ${RADIUS.md}`, marginBottom: "16px" }}>
              {[
                { v: ">$2M", l: "Annual run-rate reduction" },
                { v: "10–15%", l: "Licensing savings via right-sizing" },
                { v: "~28%", l: "Cost per $1B AUM reduction" },
                { v: "<6 mo", l: "Payback period" },
              ].map((m, i) => (
                <div key={i} className="case-metric">
                  <div className="case-metric-number">{m.v}</div>
                  <div className="case-metric-label">{m.l}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.bodyMuted, lineHeight: 1.55, margin: "0 0 16px" }}>
              Additional 10–15% licensing reduction via utilization-driven right-sizing, on top of the consolidation savings.
            </p>
            <div style={{ padding: "12px 16px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>PE Translation</div>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>
                Vendor rationalization is one of the first PE value creation levers — and a fast, defensible path to EBITDA improvement without headcount cuts. This playbook converts into a Stability Sprint add-on: spend transparency, utilization-based decisions, and a governance cadence that sticks. CFOs love it because the ROI is visible in the first quarter.
              </p>
            </div>
          </div>
        )}

        <p className="confidentiality-note" style={{ marginTop: "16px" }}>All engagements are NDA-protected. Anonymized metrics and references available on request.</p>
      </Section>

      {/* Sample Deliverables */}
      <Section noCTA title="Sample Deliverables" variant="tinted">
        <ServicesSamplesRow />
      </Section>
    </div>
  );
}
