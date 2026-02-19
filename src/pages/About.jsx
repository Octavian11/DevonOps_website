import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY,
} from "../constants.js";
import { CTAButton, Section, ServicesSamplesRow } from "../components.jsx";

export default function AboutPage() {
  return (
    <div className="fade-in" style={{ maxWidth: "700px" }}>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 700, color: COLORS.navy, marginBottom: SPACING.lg }}>About</h1>

      {/* Who I Am */}
      <Section noCTA title="Who I Am">
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, margin: 0 }}>
          Hassan Tariq. 15+ years in platform operations across JP Morgan, Barclays, Bank of America, and Lazard — managing global trading operations, multi-billion dollar platform transformations, and operational risk at institutional scale. I'm currently completing my Executive MBA at Columbia Business School ('26), where I've sharpened a PE operator lens on the operational risks that derail value creation in the first 100 days.
        </p>
      </Section>

      {/* What I Do */}
      <Section noCTA title="What I Do">
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "14px" }}>
          I help PE funds and portfolio companies eliminate the operational friction that erodes EBITDA, extends hold periods, and creates risk that surfaces too late. From pre-close diligence through post-close stabilization to ongoing governance — I install the operating discipline that makes value creation plans actually executable.
        </p>
        <div style={{ padding: "14px 18px", background: `${COLORS.navy}06`, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, marginBottom: SPACING.md }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.navy, lineHeight: 1.6, margin: 0 }}>
            <strong>Best fit:</strong> Lower-middle-market PE funds, independent sponsors, and family offices doing control deals where operational risk can break the value creation plan.
          </p>
        </div>
        <CTAButton text="15-Minute Fit Check" />
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
      <Section title="Representative Outcomes" noCTA type="windowWithCards">
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.6, marginBottom: "12px", padding: "12px 16px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md }}>
          These outcomes come from managing "cannot-go-down" trading platforms at $10B+ AUM — environments where operational failure directly translates to regulatory exposure and client loss. The same urgency applies in PE-backed portfolio companies.
        </p>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, lineHeight: 1.6, marginBottom: SPACING.md, padding: "10px 14px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md }}>
          <strong>Note:</strong> Representative outcomes from prior institutional operating roles — not client engagements. All results from managing trading platforms with $10B+ in assets under management. Ranges vary by baseline and scope. Details and references available on request.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[
            { metric: "~60%", label: "Reduction in critical outages over 8 months" },
            { metric: "~94% → 99%", label: "Uptime improvement" },
            { metric: "$2M+", label: "Annual run-rate savings via vendor consolidation" },
            { metric: "~31%", label: "MTTR reduction" },
            { metric: "~67%", label: "Incident volume reduction" },
            { metric: "~17%", label: "Compliance error reduction" },
          ].map((item, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 200px", minWidth: "min(200px, 100%)" }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "1.3rem", fontWeight: 700, color: COLORS.gold, marginBottom: SPACING.xs }}>{item.metric}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.5 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Sample Deliverables */}
      <Section noCTA title="Sample Deliverables">
        <ServicesSamplesRow />
      </Section>

      {/* Bottom CTA */}
      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, marginBottom: "18px", textAlign: "center" }}>
          15 minutes. We'll assess the portfolio company's situation and scope the right engagement.
        </p>
        <div style={{ textAlign: "center" }}>
          <CTAButton text="15-Minute Fit Check" />
        </div>
      </Section>
    </div>
  );
}
