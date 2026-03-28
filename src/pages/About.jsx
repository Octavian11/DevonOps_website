import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY,
} from "../constants.js";
import { CTAButton, ButtonPair, Section, ServicesSamplesRow } from "../components.jsx";

export default function AboutPage() {
  return (
    <div className="fade-in">
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: SPACING.lg }}>About</h1>

      {/* Who I Am */}
      <Section noCTA title="Who I Am">
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, margin: 0 }}>
          Hassan Tariq. 15+ years in platform operations across JP Morgan, Barclays, Bank of America, and Lazard — managing global trading operations, multi-billion dollar platform transformations, and operational risk at institutional scale. I'm currently completing my Executive MBA at Columbia Business School ('26), where I've sharpened a PE operator lens on the operational risks that derail value creation in the first 100 days.
        </p>
      </Section>

      {/* What I Do */}
      <Section noCTA title="What I Do" variant="tinted">
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "14px" }}>
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
        <CTAButton text="Book a Fit Check" showAvailability={true} />
      </Section>

      {/* How I Work */}
      <Section noCTA title="How I Work">
        <div style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
          <p style={{ marginBottom: SPACING.sm }}>For funds evaluating targets, I run an <strong>Ops Diligence Report</strong> that surfaces the friction points standard diligence misses — and delivers a risk-rated findings memo to the investment committee. The findings feed directly into the <strong>Value Creation Plan (VCP)</strong>.</p>
          <p style={{ marginBottom: SPACING.sm }}>Post-close, I execute the VCP through a <strong>100-Day Stabilization Plan</strong>: install incident governance, change control, vendor oversight, KPI cadence, and board-ready reporting. Fast. Structured. Measurable from Day 1.</p>
          <p style={{ margin: 0 }}>For ongoing operational governance, I run a <strong>Control Tower Retainer</strong> — the weekly operating rhythm, escalation support, and compliance cadence that keeps the portfolio company from drifting back.</p>
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

      {/* Representative Outcomes */}
      <Section title="Representative Outcomes" noCTA variant="tinted">
        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, lineHeight: 1.6, marginBottom: SPACING.md, padding: "10px 14px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md }}>
          Outcomes from prior institutional operating roles — not client engagements. Identifiers withheld. Metrics are representative and sanitized for confidentiality. Details and references available on request.
        </p>

        {/* Engagement 1 */}
        <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "24px", background: COLORS.white, boxShadow: SHADOWS.sm, marginBottom: "20px" }}>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "8px" }}>
            Platform Stabilization · Multi-strategy hedge fund, ~$10B AUM
          </div>
          <div style={{ fontFamily: FONTS.heading, fontSize: "1.15rem", fontWeight: 700, color: COLORS.navy, marginBottom: "14px" }}>
            Platform Stabilization & Reliability
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Context</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "16px" }}>
            A multi-strategy hedge fund managing ~$10B in assets was scaling rapidly, but its operating cadence hadn't kept pace. The platform had suffered 4 critical outages in 12 months. Portfolio-weighted availability sat at ~94%. High-severity incidents averaged 6 hours to resolve. Leadership time was consumed by firefighting, and stakeholder satisfaction was declining — NPS had dropped from 45 to 38 over 18 months.
          </p>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>What I Built</div>
          <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "20px" }}>
            Hired and led a 10-person global operations team across New York, London, and Hong Kong in ~6 months. Reset incident management from the ground up: severity model, escalation paths, communications cadence, on-call ownership, and closed-loop postmortems. Standardized runbooks and introduced change discipline through a CAB-lite governance process. Built a KPI dashboard tracking 18 operational metrics with weekly review cadence, and established quarterly stakeholder reviews with 50+ portfolio management and trading desk stakeholders.
          </p>
          <div style={{ fontFamily: FONTS.body, fontSize: "0.88rem", fontWeight: 700, color: COLORS.charcoal, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Measured Outcomes</div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            {[
              { v: "0", l: "Critical outages (18 months)" },
              { v: "99.2%", l: "Availability (from 94%)" },
              { v: "−31%", l: "MTTR (6.0h → 4.1h)" },
              { v: "+22", l: "NPS improvement (38 → 60)" },
            ].map((m, i) => (
              <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "14px 18px", background: `${COLORS.navy}04`, flex: "1 1 120px", minWidth: "min(110px, 100%)" }}>
                <div style={{ fontFamily: FONTS.body, fontSize: "1.3rem", fontWeight: 700, color: COLORS.gold, marginBottom: "4px" }}>{m.v}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.82rem", color: COLORS.charcoal, lineHeight: 1.4 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.bodyMuted, lineHeight: 1.55, margin: "0 0 16px" }}>
            Supported ~50% AUM growth with ~12% headcount increase — operational leverage through governance, not headcount.
          </p>
          <div style={{ padding: "12px 16px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` }}>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>PE Translation</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>
              This is the Stability Sprint that becomes a Control Tower retainer. Fast diagnosis, incident-command reset, runbooks, change governance, and a KPI cadence that forces follow-through. The same playbook installs in a PE portfolio company in 100 days — at a fraction of the complexity of a $10B fund.
            </p>
          </div>
        </div>

        {/* Engagement 2 */}
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
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            {[
              { v: ">$2M", l: "Annual run-rate reduction" },
              { v: "15 → 8", l: "Vendors consolidated" },
              { v: "~28%", l: "Cost per $1B AUM reduction" },
              { v: "<6 mo", l: "Payback period" },
            ].map((m, i) => (
              <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "14px 18px", background: `${COLORS.navy}04`, flex: "1 1 120px", minWidth: "min(110px, 100%)" }}>
                <div style={{ fontFamily: FONTS.body, fontSize: "1.3rem", fontWeight: 700, color: COLORS.gold, marginBottom: "4px" }}>{m.v}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.82rem", color: COLORS.charcoal, lineHeight: 1.4 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.bodyMuted, lineHeight: 1.55, margin: "0 0 16px" }}>
            Additional 10–15% licensing reduction via utilization-driven right-sizing, on top of the consolidation savings.
          </p>
          <div style={{ padding: "12px 16px", background: `${COLORS.gold}0D`, borderLeft: `3px solid ${COLORS.gold}`, borderRadius: `0 ${RADIUS.sm} ${RADIUS.sm} 0` }}>
            <div style={{ fontFamily: FONTS.body, fontSize: "0.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>PE Translation</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0 }}>
              Vendor rationalization is one of the first PE value creation levers — and the fastest path to defensible EBITDA improvement without headcount cuts. This playbook converts into a Stability Sprint add-on: spend transparency, utilization-based decisions, and a governance cadence that sticks. CFOs love it because the ROI is visible in the first quarter.
            </p>
          </div>
        </div>
      </Section>

      {/* Sample Deliverables */}
      <Section noCTA title="Sample Deliverables" variant="tinted">
        <ServicesSamplesRow />
      </Section>

      {/* Bottom CTA */}
      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "18px", textAlign: "center" }}>
          15 minutes. I'll assess the situation and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="Book a Fit Check"
          centered={true}
          showAvailability={true}
        />
      </Section>
    </div>
  );
}
