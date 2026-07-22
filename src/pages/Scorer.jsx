import { useRef, useState } from "react";
import { track } from "@vercel/analytics/react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import {
  CALENDLY, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF, FORMSPREE_URL,
  SCORER_DIMS, DIM_RECS, CONTEXT_OPTIONS, CONTEXT_CALLOUTS,
} from "../constants.js";
import { DELIVERABLE_KEYS } from "../offerArchitecture.js";
import { TimelineRail } from "../components.jsx";

const BUYER_TYPES = [
  { key: "is", label: "Independent Sponsor" },
  { key: "pe", label: "LMM PE Fund" },
  { key: "fo", label: "Family Office" },
  { key: "other", label: "Not sure" },
];

const BUYER_TYPE_FRAMING = {
  is: "For an independent sponsor, these findings shape IC credibility, capital-partner confidence, and the Day-1 risk narrative.",
  pe: "For a PE fund, these gaps indicate where post-close stabilization could constrain Year-1 execution and value creation.",
  fo: "For a family office, weak operating controls compound across a longer hold and become increasingly expensive to reconstruct.",
  other: null,
};

const SCORE_LABELS = {
  1: "Material gap",
  2: "Fragile",
  3: "Developing",
  4: "Controlled",
  5: "Well governed",
};

function recordEvent(name, properties = {}) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never interrupt the assessment flow.
  }
}

function downloadDeliverable(url, filename, asset, source) {
  recordEvent("scorer_deliverable_download", { asset, source });
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.setAttribute("aria-hidden", "true");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function ScorerEmailCapture({ rating, score, context, buyerType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid work email address.");
      return;
    }

    setStatus("loading");
    setMessage("Submitting your request…");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name || "(not provided)",
          email,
          scorer_rating: rating,
          scorer_score: score,
          scorer_context: context,
          scorer_buyer_type: buyerType || "(not specified)",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      recordEvent("scorer_lead_submit", {
        rating,
        context,
        buyerType: buyerType || "unspecified",
      });
      setStatus("success");
      setMessage("Request received. Your sample scorecard download has started.");
      downloadDeliverable(
        SAMPLE_SCORECARD_PDF,
        "Devonshire-Execution-Risk-Scorecard.pdf",
        DELIVERABLE_KEYS.executionRiskScorecard,
        "scorer_lead_success",
      );
    } catch {
      setStatus("error");
      setMessage("The request could not be submitted. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <section className="scorer-download-success" aria-labelledby="download-success-title">
        <div>
          <span className="scorer-kicker">Deliverable access</span>
          <h2 id="download-success-title">Your sample is ready.</h2>
          <p>Hassan will follow up with context specific to your assessment.</p>
        </div>
        <div className="scorer-download-links">
          <button type="button" onClick={() => downloadDeliverable(SAMPLE_SCORECARD_PDF, "Devonshire-Execution-Risk-Scorecard.pdf", DELIVERABLE_KEYS.executionRiskScorecard, "scorer_success_panel")}>Download Execution Risk Scorecard (PDF)</button>
          <button type="button" onClick={() => downloadDeliverable(SAMPLE_100DAY_PDF, "Devonshire-100-Day-Operating-Playbook.pdf", DELIVERABLE_KEYS.operatingPlaybook, "scorer_success_panel")}>Download 100-Day Operating Playbook (PDF)</button>
        </div>
        <p className="scorer-live-message" role="status" aria-live="polite">{message}</p>
      </section>
    );
  }

  return (
    <section className="scorer-lead-capture" aria-labelledby="scorer-lead-title">
      <div className="scorer-lead-copy">
        <span className="scorer-kicker">See the full deliverable</span>
        <h2 id="scorer-lead-title">Inspect the IC-ready scorecard format.</h2>
        <p>Download an illustrative Execution Risk Scorecard and see how operating evidence is organized for an IC decision. Hassan will follow up with a brief read on your assessment.</p>
        <ul>
          <li>Executive risk summary</li>
          <li>Six-domain operating assessment</li>
          <li>Day-1 priority framing</li>
        </ul>
      </div>
      <form className="scorer-lead-form" onSubmit={handleSubmit} noValidate data-clarity-mask="True">
        <label htmlFor="scorer-name">Name <span>Optional</span></label>
        <input id="scorer-name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        <label htmlFor="scorer-email">Work email</label>
        <input id="scorer-email" name="email" type="email" autoComplete="email" required aria-invalid={status === "error"} aria-describedby="scorer-form-message" value={email} onChange={(event) => { setEmail(event.target.value); if (status === "error") { setStatus("idle"); setMessage(""); } }} />
        <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Submitting…" : "Get the Sample Scorecard →"}</button>
        <p className="scorer-privacy">No spam. Your email is used only to respond to this assessment.</p>
        <p id="scorer-form-message" className={`scorer-form-message ${status}`} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"}>{message}</p>
      </form>
    </section>
  );
}

export default function ScorerPage({ setPage }) {
  const [buyerType, setBuyerType] = useState("");
  const [context, setContext] = useState(CONTEXT_OPTIONS[0].key);
  const [scores, setScores] = useState({});
  const [unknowns, setUnknowns] = useState({});
  const [showResults, setShowResults] = useState(false);
  const started = useRef(false);

  const markStarted = (source) => {
    if (started.current) return;
    started.current = true;
    recordEvent("scorer_start", { source });
  };

  const answeredDims = SCORER_DIMS.filter((dimension) => Number.isInteger(scores[dimension.key]) || unknowns[dimension.key]);
  const answeredCount = answeredDims.length;
  const completion = Math.round((answeredCount / SCORER_DIMS.length) * 100);
  const knownDims = SCORER_DIMS.filter((dimension) => Number.isInteger(scores[dimension.key]) && !unknowns[dimension.key]);
  const unknownDims = SCORER_DIMS.filter((dimension) => unknowns[dimension.key]);
  const avg = knownDims.length > 0
    ? knownDims.reduce((sum, dimension) => sum + scores[dimension.key], 0) / knownDims.length
    : 0;
  const rating = avg >= 4 ? "stable" : avg >= 2.5 ? "atRisk" : "critical";
  const ratingLabel = { stable: "STABLE", atRisk: "AT RISK", critical: "CRITICAL" }[rating];
  const lowDims = knownDims.filter((dimension) => scores[dimension.key] <= 2);
  const midDims = knownDims.filter((dimension) => scores[dimension.key] === 3);
  const chartData = SCORER_DIMS.map((dimension) => ({
    subject: dimension.short,
    score: unknowns[dimension.key] ? 0 : (scores[dimension.key] || 0),
    fullMark: 5,
  }));

  const chooseScore = (key, value) => {
    markStarted("dimension_score");
    setScores((current) => ({ ...current, [key]: value }));
    setUnknowns((current) => ({ ...current, [key]: false }));
    if (showResults) recordEvent("scorer_result_adjusted", { dimension: key, value });
  };

  const toggleUnknown = (key, checked) => {
    markStarted("dimension_unknown");
    setUnknowns((current) => ({ ...current, [key]: checked }));
    if (checked) setScores((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const revealResults = () => {
    if (answeredCount !== SCORER_DIMS.length) return;
    recordEvent("scorer_complete", {
      context,
      buyerType: buyerType || "unspecified",
      rating,
      score: Number(avg.toFixed(1)),
      unknownCount: unknownDims.length,
    });
    setShowResults(true);
    window.setTimeout(() => document.getElementById("scorer-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <div className="scorer-page fade-in">
      <header className="scorer-hero">
        <div className="scorer-hero-inner">
          <span className="scorer-kicker">Two-minute operating assessment</span>
          <h1>How operationally ready is your deal?</h1>
          <p>Score six operating domains. Surface where execution risk may be hiding before it reaches the IC, Day 1, or the board.</p>
          <div className="scorer-hero-facts" aria-label="Assessment facts"><span>6 dimensions</span><span>2 minutes</span><span>Immediate result</span></div>
        </div>
      </header>

      <div className="scorer-main">
        <nav className="scorer-progress" aria-label="Assessment progress">
          <ol>
            <li className="complete"><span>01</span><strong>Deal context</strong></li>
            <li className={answeredCount > 0 ? "active" : ""}><span>02</span><strong>Operating score</strong></li>
            <li className={showResults ? "complete" : ""}><span>03</span><strong>Assessment</strong></li>
          </ol>
          <div className="scorer-progress-meter"><i style={{ width: `${completion}%` }} /><span>{answeredCount} of 6 dimensions completed</span></div>
        </nav>

        <section className="scorer-profile" aria-labelledby="scorer-profile-title">
          <div className="scorer-section-heading">
            <span className="scorer-kicker">01 · Deal context</span>
            <h2 id="scorer-profile-title">Frame the assessment.</h2>
            <p>This context changes how the operating findings should be interpreted.</p>
          </div>
          <div className="scorer-profile-grid">
            <fieldset>
              <legend>Who is using the scorer?</legend>
              <div className="scorer-choice-grid buyer-choices">
                {BUYER_TYPES.map((type) => (
                  <button type="button" key={type.key} className={buyerType === type.key ? "selected" : ""} aria-pressed={buyerType === type.key} onClick={() => { markStarted("buyer_type"); setBuyerType((current) => current === type.key ? "" : type.key); }}>
                    {type.label}
                  </button>
                ))}
              </div>
              <p>Optional, but it sharpens the result framing.</p>
            </fieldset>
            <fieldset>
              <legend>Where are you in the deal?</legend>
              <div className="scorer-context-choices">
                {CONTEXT_OPTIONS.map((option) => (
                  <label key={option.key} className={context === option.key ? "selected" : ""}>
                    <input type="radio" name="context" value={option.key} checked={context === option.key} onChange={() => { markStarted("deal_context"); setContext(option.key); }} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <section className="scorer-questionnaire" aria-labelledby="scorer-questions-title">
          <div className="scorer-section-heading scorer-question-heading">
            <div>
              <span className="scorer-kicker">02 · Operating score</span>
              <h2 id="scorer-questions-title">Score the six operating domains.</h2>
            </div>
            <p>Choose the statement closest to the current operating reality. Use “Not assessed” only where visibility is genuinely absent.</p>
          </div>

          <div className="scorer-dimension-grid">
            {SCORER_DIMS.map((dimension, index) => {
              const score = scores[dimension.key];
              const isUnknown = Boolean(unknowns[dimension.key]);
              return (
                <fieldset className={`scorer-dimension-card${isUnknown ? " unknown" : ""}${Number.isInteger(score) ? " answered" : ""}`} key={dimension.key}>
                  <legend className="sr-only">{dimension.label}</legend>
                  <div className="scorer-dimension-title">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{dimension.label}</h3><p>{Number.isInteger(score) ? SCORE_LABELS[score] : isUnknown ? "Visibility gap" : "Select a score"}</p></div>
                    <strong>{Number.isInteger(score) ? score : "—"}</strong>
                  </div>
                  <div className="scorer-score-control" role="group" aria-label={`${dimension.label} score from 1 to 5`}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button type="button" key={value} className={score === value ? "selected" : ""} aria-pressed={score === value} disabled={isUnknown} onClick={() => chooseScore(dimension.key, value)}>
                        <span>{value}</span><small>{SCORE_LABELS[value]}</small>
                      </button>
                    ))}
                  </div>
                  <div className="scorer-dimension-anchors"><span><b>1</b>{dimension.low}</span><span><b>5</b>{dimension.high}</span></div>
                  <label className="scorer-unknown-control">
                    <input type="checkbox" checked={isUnknown} onChange={(event) => toggleUnknown(dimension.key, event.target.checked)} />
                    <span>Not assessed / visibility unavailable</span>
                  </label>
                </fieldset>
              );
            })}
          </div>

          {!showResults && (
            <div className="scorer-submit-row">
              <div><strong>{answeredCount === 6 ? "Assessment ready" : `${6 - answeredCount} dimension${6 - answeredCount === 1 ? "" : "s"} remaining`}</strong><span>Your results remain on this page.</span></div>
              <button type="button" disabled={answeredCount !== 6} onClick={revealResults}>View Assessment →</button>
            </div>
          )}
        </section>

        {showResults && (
          <section className="scorer-results" id="scorer-results" aria-labelledby="scorer-results-title">
            <div className="scorer-section-heading result-heading">
              <span className="scorer-kicker">03 · Assessment</span>
              <h2 id="scorer-results-title">Operating readiness assessment.</h2>
              <p>Directional, not a substitute for company-specific diligence. Use it to focus the next evidence request and operating conversation.</p>
            </div>

            <div className={`scorer-result-summary ${rating}`}>
              <div className="scorer-result-copy">
                <span className="result-status">{ratingLabel}</span>
                <div className="result-score"><strong>{avg.toFixed(1)}</strong><span>out of 5</span></div>
                <p>{CONTEXT_CALLOUTS[rating][context]}</p>
                {buyerType && BUYER_TYPE_FRAMING[buyerType] && <p className="buyer-framing">{BUYER_TYPE_FRAMING[buyerType]}</p>}
                {unknownDims.length > 0 && <span className="result-coverage">Based on {knownDims.length} scored dimension{knownDims.length === 1 ? "" : "s"}; {unknownDims.length} visibility gap{unknownDims.length === 1 ? "" : "s"} flagged.</span>}
              </div>
              <div className="scorer-radar" aria-label="Radar chart of the six operating-domain scores">
                <ResponsiveContainer width="100%" height={340}>
                  <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="68%">
                    <PolarGrid stroke="#8b8c8e" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 14, fontFamily: "Inter, sans-serif", fill: "#303236", fontWeight: 600 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 12, fill: "#303236" }} axisLine={false} />
                    <Radar name="Score" dataKey="score" stroke="#6e1f2e" fill="#6e1f2e" fillOpacity={0.24} strokeWidth={2.5} dot={{ r: 4, fill: "#6e1f2e" }} isAnimationActive={false} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="scorer-dimension-profile" aria-label="Operating-domain score profile">
              <div className="profile-header"><span>Domain profile</span><strong>Current operating maturity</strong></div>
              {SCORER_DIMS.map((dimension) => {
                const score = scores[dimension.key];
                return (
                  <div className="profile-row" key={dimension.key}>
                    <span>{dimension.label}</span>
                    <div><i style={{ width: unknowns[dimension.key] ? "0%" : `${(score / 5) * 100}%` }} /></div>
                    <strong>{unknowns[dimension.key] ? "N/A" : `${score}/5`}</strong>
                  </div>
                );
              })}
            </div>

            {(unknownDims.length > 0 || lowDims.length > 0) && (
              <div className="scorer-findings-grid">
                {unknownDims.length > 0 && (
                  <article className="scorer-finding visibility">
                    <span>Visibility finding</span>
                    <h3>{unknownDims.length} unassessed domain{unknownDims.length === 1 ? "" : "s"}</h3>
                    <p>Missing operating visibility is itself a diligence signal. Add these domains to the next evidence request.</p>
                    <ul>{unknownDims.map((dimension) => <li key={dimension.key}>{dimension.label}</li>)}</ul>
                  </article>
                )}
                {lowDims.length > 0 && (
                  <article className="scorer-finding critical">
                    <span>Priority finding</span>
                    <h3>{lowDims.length} material operating gap{lowDims.length === 1 ? "" : "s"}</h3>
                    <p>These domains are candidates for the next evidence request and, if validated, the Day-1 Critical Path.</p>
                    <ul>{lowDims.map((dimension) => <li key={dimension.key}>{dimension.label} <b>{scores[dimension.key]}/5</b></li>)}</ul>
                  </article>
                )}
              </div>
            )}

            <section className="scorer-next-steps" aria-labelledby="scorer-next-title">
              <div className="scorer-section-heading">
                <span className="scorer-kicker">Priority sequence</span>
                <h2 id="scorer-next-title">Recommended next steps.</h2>
              </div>
              {lowDims.length === 0 && midDims.length === 0 ? (
                <div className="scorer-strong-result">
                  <p>Your operating posture is strong across the scored domains. The priority is durability: documenting the control environment and proving that it will hold through management transitions, scale, and exit diligence.</p>
                </div>
              ) : (
                <TimelineRail compact items={
                  [...lowDims, ...midDims].slice(0, 4)
                    .map((dimension) => ({ dimension, recommendation: DIM_RECS[dimension.key], start: parseInt((DIM_RECS[dimension.key].days.match(/\d+/) || ["0"])[0], 10) }))
                    .sort((a, b) => a.start - b.start)
                    .map(({ dimension, recommendation }) => ({
                      title: dimension.label,
                      meta: recommendation.days,
                      active: scores[dimension.key] <= 2,
                      description: recommendation.impact,
                      deliverable: recommendation.action,
                    }))
                } />
              )}
              <p className="scorer-next-note">These are preliminary priorities based on your self-assessment. A Devonshire Execution Risk Review validates the evidence and converts the relevant findings into an IC-ready Execution Risk Memo and Day-1 Critical Path.</p>
            </section>

            <ScorerEmailCapture rating={ratingLabel} score={avg.toFixed(1)} context={context} buyerType={buyerType} />

            <section className="scorer-final-cta">
              <div><span className="scorer-kicker">From assessment to action</span><h2>{rating === "stable" ? "Make the operating evidence durable." : "Convert the gaps into an owned operating plan."}</h2></div>
              <div><a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => recordEvent("scorer_fit_check_click", { rating, context })}>Book a Fit Check (15 min)</a><button type="button" onClick={() => { recordEvent("scorer_services_click", { rating }); setPage ? setPage("services", "offers") : window.location.assign("/pe/services#offers"); }}>View Engagement Options</button></div>
            </section>
          </section>
        )}
      </div>
    </div>
  );
}
