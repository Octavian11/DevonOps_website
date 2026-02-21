import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import {
  COLORS, FONTS, SPACING, SHADOWS, RADIUS,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  FORMSPREE_URL,
  SCORER_DIMS, DIM_RECS, CONTEXT_OPTIONS, CONTEXT_CALLOUTS,
  mailtoHref,
} from "../constants.js";
import { SectionTitle, ButtonPair, Card, Section } from "../components.jsx";

// ─── EMAIL CAPTURE FORM ───────────────────────────────────────

function ScorerEmailCapture({ rating, score, context }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: RADIUS.sm,
    border: `1px solid ${COLORS.border}`,
    fontFamily: FONTS.body,
    fontSize: "0.95rem",
    color: COLORS.charcoal,
    background: COLORS.white,
    boxSizing: "border-box",
    outline: "none",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    // Open PDFs immediately before the async call to avoid popup blockers
    window.open(SAMPLE_SCORECARD_PDF, "_blank", "noopener,noreferrer");

    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name || "(not provided)",
          email,
          scorer_rating: rating,
          scorer_score: score,
          scorer_context: context,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Card style={{ borderLeft: `4px solid ${COLORS.stable}`, marginBottom: "24px" }}>
        <p style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.stable, margin: "0 0 6px 0" }}>Report sent.</p>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, margin: 0, lineHeight: 1.6 }}>
          Your sample scorecard is downloading. Hassan will follow up with context specific to your situation.
        </p>
        <div style={{ marginTop: "14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href={SAMPLE_SCORECARD_PDF} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, textDecoration: "none", borderBottom: `1px solid ${COLORS.navy}` }}>
            Sample Ops Diligence Scorecard — IC-ready, severity-rated (PDF)
          </a>
          <a href={SAMPLE_100DAY_PDF} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, textDecoration: "none", borderBottom: `1px solid ${COLORS.navy}` }}>
            Sample 100-Day Stabilization Plan — Visibility → Control → Cadence (PDF)
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ borderLeft: `4px solid ${COLORS.gold}`, marginBottom: "24px" }}>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, margin: "0 0 6px 0" }}>
        Download Your Ops Assessment Report
      </h3>
      <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.6, margin: "0 0 6px 0" }}>
        Get a formatted PDF of your assessment with prioritized recommendations. See what your IC-ready deliverable looks like.
      </p>
      <div style={{ marginBottom: "14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a href={SAMPLE_SCORECARD_PDF} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.bodyMuted, textDecoration: "none", borderBottom: `1px solid ${COLORS.border}` }}>
          Sample Scorecard (PDF)
        </a>
        <a href={SAMPLE_100DAY_PDF} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.bodyMuted, textDecoration: "none", borderBottom: `1px solid ${COLORS.border}` }}>
          Sample 100-Day Plan (PDF)
        </a>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="your@fund.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          required
          style={{ ...inputStyle, borderColor: status === "error" ? COLORS.critical : COLORS.border }}
        />
        {status === "error" && (
          <p style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.critical, margin: 0 }}>
            Please enter a valid email address.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ padding: "14px 28px", background: status === "loading" ? COLORS.bodyMuted : COLORS.navy, color: "white", border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, cursor: status === "loading" ? "default" : "pointer", textAlign: "left", transition: "background 0.2s" }}>
          {status === "loading" ? "Sending…" : "Send My Report →"}
        </button>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.8rem", color: COLORS.bodyMuted, margin: 0 }}>
          No spam. Your email is used only to follow up on this assessment.
        </p>
      </form>
    </Card>
  );
}

export default function ScorerPage() {
  const [context, setContext] = useState(CONTEXT_OPTIONS[0].key);
  const [scores, setScores] = useState({ incident: 3, change: 3, vendor: 3, audit: 3, kpi: 3, process: 3 });
  const [showResults, setShowResults] = useState(false);

  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
  const rating = avg >= 4 ? "stable" : avg >= 2.5 ? "atRisk" : "critical";
  const ratingLabel = { stable: "STABLE", atRisk: "AT RISK", critical: "CRITICAL" }[rating];
  const ratingColor = { stable: COLORS.stable, atRisk: COLORS.atRisk, critical: COLORS.critical }[rating];

  const chartData = SCORER_DIMS.map(d => ({ subject: d.short, score: scores[d.key], fullMark: 5 }));
  const lowDims = SCORER_DIMS.filter(d => scores[d.key] <= 2);
  const midDims = SCORER_DIMS.filter(d => scores[d.key] === 3);

  return (
    <div className="fade-in">
      <h1 style={{ fontFamily: FONTS.heading, fontSize: "1.7rem", fontWeight: 700, color: COLORS.navy, marginBottom: "14px" }}>
        Portfolio Stability Readiness Scorer
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.65, marginBottom: "24px" }}>
        Assess a portfolio company's operational stability across 6 dimensions. Identify where friction is highest and which interventions would create the most value.
      </p>

      {/* What's your situation - Full Width */}
      <Card style={{ marginBottom: "24px" }}>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, marginBottom: "12px" }}>What's your situation?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {CONTEXT_OPTIONS.map(opt => (
            <label key={opt.key} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "8px 12px", borderRadius: RADIUS.sm, background: context === opt.key ? `${COLORS.navy}08` : "transparent", border: `1px solid ${context === opt.key ? COLORS.steel : "transparent"}` }}>
              <input type="radio" name="context" checked={context === opt.key} onChange={() => setContext(opt.key)} style={{ accentColor: COLORS.navy }} />
              <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal }}>{opt.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Score All 6 Dimensions */}
      <div style={{ marginBottom: "28px" }}>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.1rem", color: COLORS.navy, marginBottom: "18px" }}>Score all 6 dimensions (1–5)</h3>
        <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.bodyMuted, marginBottom: "20px", lineHeight: 1.6 }}>
          Slide each bar to rate your portfolio company's operational maturity. 1 = significant gaps, 5 = well-governed.
        </p>

        {SCORER_DIMS.map((dim, index) => (
          <Card key={dim.key} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
              <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.navy, margin: 0 }}>{index + 1}. {dim.label}</h4>
              <span style={{ fontFamily: FONTS.body, fontSize: "1.3rem", fontWeight: 700, color: scores[dim.key] <= 2 ? COLORS.critical : scores[dim.key] <= 3 ? COLORS.atRisk : COLORS.stable }}>
                {scores[dim.key]}
              </span>
            </div>
            <input
              type="range"
              className="scorer-range"
              min={1} max={5} step={1}
              value={scores[dim.key]}
              onChange={e => setScores({ ...scores, [dim.key]: parseInt(e.target.value) })}
              style={{ width: "100%", background: `linear-gradient(to right, ${COLORS.steel} 0%, ${COLORS.steel} ${((scores[dim.key] - 1) / 4) * 100}%, ${COLORS.border} ${((scores[dim.key] - 1) / 4) * 100}%, ${COLORS.border} 100%)` }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", gap: "12px" }}>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, maxWidth: "45%", lineHeight: 1.4 }}>{dim.low}</span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, maxWidth: "45%", textAlign: "right", lineHeight: 1.4 }}>{dim.high}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* View Results Button */}
      {!showResults && (
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <button onClick={() => setShowResults(true)}
            style={{ padding: "14px 28px", background: COLORS.navy, color: "white", border: "none", borderRadius: RADIUS.md, fontFamily: FONTS.body, fontSize: "1rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.3px", transition: "background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0F1829"; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.navy; }}>
            View Results →
          </button>
        </div>
      )}

      {/* Results Section */}
      {showResults && (
        <div className="fade-in">
          <Card style={{ borderLeft: `4px solid ${ratingColor}`, marginBottom: "24px" }}>
            <h3 style={{ fontFamily: FONTS.heading, fontSize: "1.2rem", color: COLORS.navy, marginBottom: "20px" }}>Assessment Results</h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: `4px solid ${ratingColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <span style={{ fontFamily: FONTS.body, fontSize: "1.7rem", fontWeight: 700, color: ratingColor }}>{avg.toFixed(1)}</span>
              </div>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 700, color: ratingColor, letterSpacing: "1.2px", marginBottom: "10px" }}>
                {ratingLabel}
              </span>
              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.65, margin: 0, maxWidth: "600px" }}>
                {CONTEXT_CALLOUTS[rating][context]}
              </p>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="65%">
                <PolarGrid stroke={COLORS.border} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontFamily: FONTS.body, fill: COLORS.charcoal }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: COLORS.charcoal }} />
                <Radar name="Score" dataKey="score" stroke={COLORS.navy} fill={COLORS.navy} fillOpacity={0.4} strokeWidth={2} dot={{ r: 3, fill: COLORS.navy }} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {lowDims.length > 0 && (
            <Card style={{ borderLeft: `4px solid ${COLORS.critical}`, marginBottom: "24px" }}>
              <h4 style={{ fontFamily: FONTS.heading, fontSize: "1rem", color: COLORS.critical, marginBottom: "14px" }}>Critical Gaps</h4>
              {lowDims.map(dim => (
                <div key={dim.key} style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.95rem", fontWeight: 600, color: COLORS.charcoal }}>{dim.label}</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.critical, marginLeft: "8px" }}>({scores[dim.key]}/5)</span>
                </div>
              ))}
            </Card>
          )}

          <Section noCTA title="Recommended Next Steps">
            {lowDims.length === 0 && midDims.length === 0 ? (
              <div>
                <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "14px" }}>
                  Your operational posture is strong across all dimensions. At this stage, the priority is durability: ensuring governance holds under management transitions, deal activity, or scale.
                </p>
                <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, margin: 0 }}>
                  The highest-value intervention now is hardening for exit — converting your current operational strength into a demonstrable competitive advantage in buyer diligence. Strong operations that aren't documented and tracked don't survive deal scrutiny.
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, marginBottom: "20px" }}>
                  {{
                    pre: "These gaps should inform your deal terms and Day-1 critical path. If the target is worth pursuing, the items below are what to address in the first 30–90 days — sequenced by impact.",
                    post: "You're in the critical window. Each week these remain unaddressed compounds the remediation cost and erodes management bandwidth. Here's the priority sequence:",
                    mid: "Operational drift doesn't reverse on its own. These are the highest-ROI interventions before exit preparation begins — each is a defined deliverable, not a recommendation.",
                  }[context]}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[...lowDims, ...midDims].slice(0, 4).map((dim, i) => {
                    const rec = DIM_RECS[dim.key];
                    const isGap = scores[dim.key] <= 2;
                    return (
                      <div key={dim.key} style={{ paddingLeft: "16px", borderLeft: `3px solid ${isGap ? COLORS.critical : COLORS.atRisk}` }}>
                        <p style={{ fontFamily: FONTS.heading, fontSize: "1rem", fontWeight: 700, color: COLORS.navy, margin: "0 0 4px 0" }}>
                          {dim.label} — <span style={{ fontWeight: 400, color: COLORS.bodyMuted }}>{rec.days}</span>
                        </p>
                        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.65, margin: "0 0 6px 0" }}>
                          {rec.impact}
                        </p>
                        <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.charcoal, lineHeight: 1.65, margin: 0 }}>
                          <strong>What gets done:</strong> {rec.action}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.charcoal, lineHeight: 1.7, marginTop: "24px", marginBottom: 0, paddingTop: "20px", borderTop: `1px solid ${COLORS.border}` }}>
                  Each of these is a defined deliverable — not a slide recommendation. The <strong>100-Day Stabilization Plan</strong> covers all of them, sequenced, tracked, and board-ready from Day 1.
                </p>
              </div>
            )}
          </Section>

          <ScorerEmailCapture rating={ratingLabel} score={avg.toFixed(1)} context={context} />

          <Section noCTA background={`${COLORS.navy}05`}>
            <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, textAlign: "center", margin: `0 auto ${SPACING.md}` }}>
              {rating === "stable"
                ? "Maintain your edge with ongoing governance support."
                : "Ready to convert these gaps into a Value Creation Plan?"}
            </p>
            <ButtonPair
              primaryText="15-Minute Fit Check"
              secondaryText="View Services"
              secondaryAction={() => window.location.hash = "#/services"}
              centered={true}
              showAvailability={true}
            />
          </Section>
        </div>
      )}
    </div>
  );
}
