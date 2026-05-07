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
            description="Rate your deal across 6 operational dimensions — incident governance, change management, vendor risk, and more. Produces a prioritized assessment with buyer-type framing for IS, PE fund, or family office contexts."
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
          Anonymized examples of the board-ready deliverables included in each engagement. <em>Enter your email to download. I respect your inbox.</em>
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
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.7, marginBottom: SPACING.sm, fontStyle: "italic" }}>
          Outcomes from prior institutional operating roles managing platforms with $10B+ AUM. These represent the governance systems I now install for PE portfolio companies at a fraction of the complexity.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {OUTCOMES.map((item, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.steel}`, borderRadius: RADIUS.md, padding: "18px", background: COLORS.white, boxShadow: SHADOWS.sm, flex: "1 1 200px", minWidth: "min(200px, 100%)" }}>
              <div style={{ fontFamily: FONTS.body, fontSize: "1.3rem", fontWeight: 700, color: COLORS.gold, marginBottom: SPACING.xs }}>{item.metric}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.5 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Thought Leadership */}
      <Section noCTA title="Point of View" variant="tinted">
        <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.2rem", fontWeight: 600, color: COLORS.navy, marginBottom: "20px" }}>
          Why Ops Diligence Is the Most Underpriced Risk in PE
        </h3>
        <div style={{ fontFamily: FONTS.body, color: COLORS.charcoal, lineHeight: 1.75, maxWidth: "800px" }}>
          <p style={{ marginBottom: "16px" }}>
            Every deal gets financial diligence. Most get legal, tax, and environmental. But operational diligence — the systematic assessment of whether a company's operations can actually deliver the value creation plan — is still treated as optional by the majority of lower-middle-market PE funds.
          </p>
          <p style={{ marginBottom: "16px", fontWeight: 600, fontStyle: "italic" }}>
            This is a pricing error.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The operational gaps that compound under PE ownership are predictable. They follow patterns. A portfolio company with no incident governance will have its first production failure within 90 days of close. A company with no change control process will trace 40% of its outages to recent deployments. A company with no KPI cadence will enter its first board meeting with verbal updates and anecdotal evidence — and the board will have no way to distinguish signal from noise.
          </p>
          <p style={{ marginBottom: "16px" }}>
            These are not edge cases. In 15 years of platform operations across JPMorgan, Barclays, Lazard, and a $10B multi-strategy hedge fund, I've seen every one of these patterns. The difference between a smooth first 100 days and a firefighting spiral almost always comes down to whether someone assessed the operational risk before close — and built a plan to address it.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Financial DD tells you what the business earns. Ops diligence tells you whether it can keep earning it under new ownership, new governance, and new expectations.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The cost of a pre-close ops diligence engagement is a rounding error on a $20M deal. The cost of discovering the gaps at month 3 — after the management honeymoon ends and the first crisis hits — is measured in EBITDA, management credibility, and LP confidence.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Funds that build operational diligence into their standard process don't just avoid surprises. They create a competitive advantage in sourcing: sellers and intermediaries learn that your diligence process is rigorous, your post-close execution is fast, and your value creation plans are credible. That reputation compounds over time.
          </p>
          <p style={{ margin: 0 }}>
            The 20 Operational Value Creation Levers I've catalogued represent the most common friction points I've seen across institutional and PE-backed operating environments. Most deals have 3–5 of them hiding in plain sight. The question is whether you find them before close or after.
          </p>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section noCTA background={`${COLORS.navy}05`}>
        <p style={{ fontFamily: FONTS.body, color: COLORS.charcoal, marginBottom: "18px", textAlign: "center" }}>
          15 minutes. I'll assess the situation and scope the right engagement.
        </p>
        <ButtonPair
          primaryText="Book a Fit Check (15 min)"
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
