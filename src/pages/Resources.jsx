import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
} from "../constants.js";
import { CTAButton, ButtonPair, Section, LeadMagnetLink } from "../components.jsx";

// ─── TOOL CARD ────────────────────────────────────────────────

function ToolCard({ title, description, badge, badgeColor, ctaText, ctaAction, ctaHref }) {
  return (
    <div style={{ flex: "1 1 280px", minWidth: "min(280px, 100%)", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.lg, padding: "28px", boxShadow: SHADOWS.sm, display: "flex", flexDirection: "column", gap: "14px" }}>
      {badge && (
        <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: badgeColor || COLORS.steel, display: "inline-block", marginBottom: "2px" }}>
          {badge}
        </span>
      )}
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", fontWeight: 700, color: COLORS.navy, margin: 0 }}>{title}</h3>
      <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.65, margin: 0, flex: 1 }}>{description}</p>
      {ctaHref ? (
        <a href={ctaHref} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "10px 20px", background: COLORS.gold, color: COLORS.white, borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", textAlign: "center", marginTop: "auto" }}>
          {ctaText}
        </a>
      ) : (
        <button onClick={ctaAction}
          style={{ padding: "10px 20px", background: COLORS.gold, color: COLORS.white, border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", textAlign: "center", marginTop: "auto" }}>
          {ctaText}
        </button>
      )}
    </div>
  );
}

// ─── PDF ROW ──────────────────────────────────────────────────

function SampleDeliverableCard({ title, description, pdfUrl, label }) {
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", boxShadow: SHADOWS.sm }}>
      <div style={{ flex: 1, minWidth: "200px" }}>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: COLORS.steel, marginBottom: "6px" }}>{label}</div>
        <div style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, marginBottom: "6px" }}>{title}</div>
        <div style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.6 }}>{description}</div>
      </div>
      <LeadMagnetLink pdfUrl={pdfUrl}>
        Download Sample (PDF)
      </LeadMagnetLink>
    </div>
  );
}

// ─── METRICS STRIP ────────────────────────────────────────────

const OUTCOMES = [
  { metric: "~60%", label: "Reduction in critical outages over 8 months" },
  { metric: "~94% → 99%", label: "Uptime improvement" },
  { metric: "$2M+", label: "Annual run-rate savings via vendor consolidation" },
  { metric: "~31%", label: "MTTR reduction" },
  { metric: "~67%", label: "Incident volume reduction" },
  { metric: "~17%", label: "Compliance error reduction" },
];

// ─── RESOURCES PAGE ───────────────────────────────────────────

export default function ResourcesPage({ setPage }) {
  return (
    <div className="fade-in">
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.8rem", fontWeight: 400, color: COLORS.navy, marginBottom: SPACING.lg }}>Resources</h1>

      {/* Interactive Tools */}
      <Section noCTA title="Interactive Tools" variant="tinted">
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: SPACING.md }}>
          Two free tools to help you identify operational risk and explore the 20 value creation levers before your first conversation.
        </p>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <ToolCard
            badge="Free · 2 Minutes"
            badgeColor={COLORS.gold}
            title="Ops Scorer"
            description="Rate your deal across 8 operational dimensions — incident governance, change management, vendor risk, and more. Produces a prioritized assessment with buyer-type framing for IS, PE fund, or family office contexts."
            ctaText="Score Your Deal →"
            ctaAction={() => setPage("scorer")}
          />
          <ToolCard
            badge="20 Levers · Interactive"
            badgeColor={COLORS.steel}
            title="Operational Lever Explorer"
            description="Browse all 20 operational friction points across 6 domains — severity-rated, PE impact framed. Filter by timing (Pre-Close / First 100 Days / Ongoing Hold), domain, or severity. Open any lever for symptoms and what good looks like."
            ctaText="Explore the Levers →"
            ctaAction={() => setPage("services")}
          />
        </div>
      </Section>

      {/* Sample Deliverables */}
      <Section noCTA title="Sample Deliverables">
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: SPACING.md }}>
          Anonymized examples of the board-ready deliverables included in each engagement. Enter your email to download — no spam, no follow-up sequence.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <SampleDeliverableCard
            label="Pre-Close Deliverable"
            title="Ops Diligence Scorecard"
            description="Risk-rated findings memo covering the operational gaps standard diligence misses — formatted for IC presentation."
            pdfUrl={SAMPLE_SCORECARD_PDF}
          />
          <SampleDeliverableCard
            label="Post-Close Deliverable"
            title="100-Day Stabilization Plan"
            description="The structured execution plan that installs incident governance, change control, vendor oversight, KPI cadence, and board-ready reporting from Day 1."
            pdfUrl={SAMPLE_100DAY_PDF}
          />
        </div>
      </Section>

      {/* Representative Outcomes */}
      <Section noCTA title="Representative Outcomes">
        <div style={{ padding: "12px 16px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: RADIUS.md, marginBottom: SPACING.sm }}>
          <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.bodyMuted, lineHeight: 1.6, margin: 0 }}>
            <strong>Note:</strong> Outcomes from prior institutional operating roles managing trading platforms with $10B+ AUM — not client engagements. Ranges vary by baseline and scope. Details and references available on request.
          </p>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {OUTCOMES.map((item, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 200px", minWidth: "min(200px, 100%)" }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "1.3rem", fontWeight: 700, color: COLORS.gold, marginBottom: SPACING.xs }}>{item.metric}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.5 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "18px", textAlign: "center" }}>
          15 minutes. I'll assess the situation and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="Book a Fit Check"
          primaryLink={CALENDLY}
          secondaryText="Score Your Deal →"
          secondaryLink={null}
          secondaryAction={() => setPage("scorer")}
          centered={true}
          showAvailability={true}
        />
      </Section>
    </div>
  );
}
