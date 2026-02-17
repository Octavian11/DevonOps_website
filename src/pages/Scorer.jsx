import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import {
  COLORS, FONTS, SPACING,
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
  SCORER_DIMS, DIM_RECS, CONTEXT_OPTIONS, CONTEXT_CALLOUTS,
  mailtoHref,
} from "../constants.js";
import { SectionTitle, ButtonPair, Card, Section } from "../components.jsx";

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
                min={1} max={5} step={1}
                value={scores[dim.key]}
                onChange={e => setScores({ ...scores, [dim.key]: parseInt(e.target.value) })}
                style={{ width: "100%", background: `linear-gradient(to right, ${COLORS.steel} 0%, ${COLORS.steel} ${((scores[dim.key] - 1) / 4) * 100}%, ${COLORS.border} ${((scores[dim.key] - 1) / 4) * 100}%, ${COLORS.border} 100%)` }}
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
              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.6, margin: 0, maxWidth: "360px" }}>
                {CONTEXT_CALLOUTS[rating][context]}
              </p>
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

          <Section noCTA title="Recommended Next Steps">
            {lowDims.length === 0 && midDims.length === 0 ? (
              <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, margin: 0 }}>
                Your operational posture is strong across all dimensions. Focus on maintaining cadence and ensuring durability through exit preparation.
              </p>
            ) : (
              <ul style={{ margin: 0, paddingLeft: "20px", fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7 }}>
                {[...lowDims, ...midDims].slice(0, 4).map((dim, i) => {
                  const rec = DIM_RECS[dim.key];
                  const isLast = i === Math.min(lowDims.length + midDims.length, 4) - 1;
                  return (
                    <li key={dim.key} style={{ marginBottom: isLast ? 0 : SPACING.xs }}>
                      <strong>{rec.days}:</strong> {rec.action}
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          <Section noCTA background={`${COLORS.navy}05`}>
            <p style={{ fontFamily: FONTS.body, fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.7, textAlign: "center", marginBottom: SPACING.md }}>
              {rating === "stable"
                ? "Maintain your edge with ongoing governance support."
                : "Let's stabilize the foundation with a structured 100-day plan."}
            </p>
            <ButtonPair
              primaryText="15-Minute Fit Check"
              secondaryText="Email me this assessment"
              secondaryLink={mailtoHref(
                `Devonshire Ops – Scorer result (${avg.toFixed(1)} / ${ratingLabel})`,
                `Hi Hassan,\n\nI completed the Portfolio Stability Readiness Scorer.\n\nSituation: ${context}\nScore: ${avg.toFixed(1)} (${ratingLabel})\n\nTop concerns:\n- \n- \n- \n\nCan you send a memo-format readout / next steps?\n\nBest,\n`
              )}
              centered={true}
            />
            <div style={{ display: "flex", gap: SPACING.sm, flexWrap: "wrap", justifyContent: "center", marginTop: SPACING.md }}>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.bodyMuted, fontStyle: "italic", margin: 0, width: "100%", textAlign: "center" }}>
                Scores reflect observed evidence prompts, not self-assessment.
              </p>
              <a href={SAMPLE_SCORECARD_PDF} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, textDecoration: "none", borderBottom: `1px solid ${COLORS.navy}` }}>
                View sample memo format
              </a>
              <a href={SAMPLE_100DAY_PDF} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: FONTS.body, fontSize: "0.9rem", fontWeight: 600, color: COLORS.navy, textDecoration: "none", borderBottom: `1px solid ${COLORS.navy}` }}>
                View 100-day plan format
              </a>
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}
