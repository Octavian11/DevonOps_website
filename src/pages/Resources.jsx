import { useState } from "react";
import { track } from "@vercel/analytics/react";
import {
  CALENDLY, FORMSPREE_URL, SAMPLE_SCORECARD_PDF, SAMPLE_100DAY_PDF,
} from "../constants.js";

const DOWNLOADS = {
  scorecard: {
    key: "execution_risk_scorecard",
    label: "Pre-close sample",
    title: "Execution Risk Scorecard",
    description: "See how evidence, severity, and operating implications are organized for an investment-committee decision.",
    detail: "Executive summary · Domain findings · Operating-risk scores",
    pages: "4-page PDF",
    preview: "/memo-samples/execution-risk-scorecard-preview.png",
    url: SAMPLE_SCORECARD_PDF,
    filename: "Devonshire-Sample-Execution-Risk-Scorecard.pdf",
  },
  playbook: {
    key: "playbook",
    label: "Post-close sample",
    title: "100-Day Operating Playbook",
    description: "See how diligence findings become sequenced actions, management ownership, and sponsor visibility after close.",
    detail: "Phased priorities · Ownership · Operating cadence",
    pages: "2-page PDF",
    preview: "/memo-samples/100-day-operating-playbook-preview.png",
    url: SAMPLE_100DAY_PDF,
    filename: "Devonshire-Sample-100-Day-Operating-Playbook.pdf",
  },
};

function recordEvent(name, properties = {}) {
  try { track(name, properties); } catch { /* Analytics cannot block a resource. */ }
}

function startDownload(asset, source) {
  recordEvent("resource_download", { asset: asset.key, source });
  const link = document.createElement("a");
  link.href = asset.url;
  link.download = asset.filename;
  link.setAttribute("aria-hidden", "true");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function ToolDiagram({ type }) {
  if (type === "score") {
    return (
      <div className="resource-score-graphic" aria-hidden="true">
        {[72, 46, 84, 61, 55, 78].map((value, index) => (
          <i key={index} style={{ "--score-height": `${value}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="resource-lever-graphic" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => <i key={index} className={index % 5 === 0 ? "active" : ""} />)}
    </div>
  );
}

function DownloadCard({ asset, onSelect }) {
  return (
    <article className="resource-download-card">
      <a className="resource-preview" href={asset.url} target="_blank" rel="noopener noreferrer" onClick={() => recordEvent("resource_preview", { asset: asset.key })} aria-label={`Preview ${asset.title} PDF`}>
        <img src={asset.preview} alt={`Preview of the ${asset.title}`} width="840" height="620" />
        <span>Preview PDF ↗</span>
      </a>
      <div className="resource-download-copy">
        <span className="resources-kicker">{asset.label}</span>
        <h3>{asset.title}</h3>
        <p>{asset.description}</p>
        <div className="resource-file-meta"><span>{asset.pages}</span><span>Illustrative sample</span></div>
        <strong>{asset.detail}</strong>
        <button type="button" onClick={() => onSelect(asset)}>Request &amp; download →</button>
      </div>
    </article>
  );
}

function ResourceGate({ asset, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid work email address.");
      return;
    }
    setStatus("loading");
    setMessage("Preparing your sample…");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name || "(not provided)", email, requested_resource: asset.title, source: "resources_page" }),
      });
      if (!response.ok) throw new Error("Submission failed");
      recordEvent("resource_lead_submit", { asset: asset.key });
      setStatus("success");
      setMessage("Request received. Your download has started.");
      startDownload(asset, "resource_gate_success");
    } catch {
      setStatus("error");
      setMessage("The request could not be submitted. Please try again.");
    }
  };

  return (
    <section className="resource-gate" aria-labelledby="resource-gate-title">
      <div className="resource-gate-copy">
        <span className="resources-kicker">Selected resource</span>
        <h3 id="resource-gate-title">{asset.title}</h3>
        <p>{status === "success" ? "The file is ready below if your browser did not begin the download automatically." : "Enter your work email and the PDF will download immediately."}</p>
        <button className="resource-change" type="button" onClick={onClose}>Choose a different resource</button>
      </div>
      {status === "success" ? (
        <div className="resource-gate-success">
          <button type="button" onClick={() => startDownload(asset, "resource_success_panel")}>Download {asset.title} →</button>
          <p role="status" aria-live="polite">{message}</p>
        </div>
      ) : (
        <form className="resource-gate-form" onSubmit={submit} noValidate data-clarity-mask="True">
          <label htmlFor="resource-name">Name <span>Optional</span></label>
          <input id="resource-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="resource-email">Work email</label>
          <input id="resource-email" name="email" type="email" autoComplete="email" required value={email} aria-invalid={status === "error"} aria-describedby="resource-form-message" onChange={(event) => { setEmail(event.target.value); if (status === "error") { setStatus("idle"); setMessage(""); } }} />
          <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Preparing…" : "Get the PDF →"}</button>
          <p className="resource-privacy">No mailing list. Your email is used only to respond to this request.</p>
          <p id="resource-form-message" className={`resource-form-message ${status}`} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"}>{message}</p>
        </form>
      )}
    </section>
  );
}

export default function ResourcesPage({ setPage }) {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const selectAsset = (asset) => {
    setSelectedAsset(asset);
    recordEvent("resource_download_select", { asset: asset.key });
    window.setTimeout(() => document.getElementById("resource-access")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  };

  return (
    <div className="resources-page fade-in">
      <header className="resources-hero">
        <div className="resources-hero-inner">
          <span className="resources-kicker">Resources · Tools · Deliverables</span>
          <h1>Operating tools for the deal team.</h1>
          <p>Assess operating risk, inspect the deliverables, and understand the judgment behind the work—before committing to an engagement.</p>
          <nav className="resources-jump" aria-label="Resources on this page">
            <a href="#tools">Decision tools</a>
            <a href="#samples">Sample deliverables</a>
            <a href="#perspectives">Perspectives</a>
          </nav>
        </div>
      </header>

      <div className="resources-main">
        <section id="tools" className="resources-section resources-tools" aria-labelledby="tools-title">
          <div className="resources-heading">
            <span className="resources-kicker">01 · Decision tools</span>
            <h2 id="tools-title">Start with the operating question.</h2>
            <p>Use the assessment for a fast risk read, or inspect representative levers to understand how the operating model is tested.</p>
          </div>
          <div className="resource-tool-grid">
            <article className="resource-tool-card primary">
              <ToolDiagram type="score" />
              <div><span>Free · about 2 minutes</span><h3>Score Your Deal</h3><p>Rate six operating domains and receive a prioritized, buyer-specific risk profile.</p><ul><li>Six-domain assessment</li><li>Risk profile and priorities</li><li>Sample scorecard access</li></ul><button type="button" onClick={() => { recordEvent("resource_tool_click", { tool: "scorer" }); setPage("scorer"); }}>Start the assessment →</button></div>
            </article>
            <article className="resource-tool-card">
              <ToolDiagram type="levers" />
              <div><span>20 representative levers</span><h3>Operational Lever Catalog</h3><p>Explore representative operating-infrastructure levers by timing, domain, and severity.</p><ul><li>Symptoms and evidence</li><li>Sponsor implications</li><li>Control-state examples</li></ul><button type="button" onClick={() => { recordEvent("resource_tool_click", { tool: "lever_catalog" }); setPage("services", "levers"); }}>Explore the catalog →</button></div>
            </article>
          </div>
        </section>

        <section id="samples" className="resources-section resources-samples" aria-labelledby="samples-title">
          <div className="resources-heading light">
            <span className="resources-kicker">02 · Sample deliverables</span>
            <h2 id="samples-title">Inspect the work product.</h2>
            <p>These illustrative samples show the format and decision logic of Devonshire work products. They are based on institutional operating experience—not Devonshire client cases.</p>
          </div>
          <div className="resource-download-grid">
            <DownloadCard asset={DOWNLOADS.scorecard} onSelect={selectAsset} />
            <DownloadCard asset={DOWNLOADS.playbook} onSelect={selectAsset} />
          </div>
          <div id="resource-access">{selectedAsset && <ResourceGate key={selectedAsset.key} asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}</div>
        </section>

        <section id="perspectives" className="resources-section resources-perspectives" aria-labelledby="perspectives-title">
          <div className="resources-heading">
            <span className="resources-kicker">03 · Perspectives</span>
            <h2 id="perspectives-title">The operating layer beneath the financials.</h2>
            <p>Practical perspectives on the risks that financial diligence cannot answer—and why the first 100 days matter.</p>
          </div>
          <div className="perspective-layout">
            <article className="perspective-feature">
              <span>Featured perspective</span>
              <h3>Why Ops Diligence Is the Most Underpriced Risk in PE</h3>
              <p className="perspective-deck">The operating layer beneath the financials is still priced as optional. It is not.</p>
              <details onToggle={(event) => event.currentTarget.open && recordEvent("resource_perspective_open", { article: "ops_diligence_underpriced" })}>
                <summary>Read the perspective <span>↓</span></summary>
                <div className="perspective-article">
                  <p>Every deal gets financial diligence. Most get legal and tax. But operational diligence—the systematic assessment of whether a company can deliver the value-creation plan—is still treated as optional by many lower-middle-market funds.</p>
                  <blockquote>This is a pricing error.</blockquote>
                  <p>The gaps that compound under PE ownership follow recognizable patterns: weak escalation, uncontrolled change, vendor dependency, and no reliable KPI cadence. Left unaddressed, they can determine whether the first 100 days establish control or begin a firefighting spiral.</p>
                  <p>Financial diligence tells you what the business earns. Operational diligence tells you whether it can keep earning it under new ownership, new governance, and new expectations.</p>
                  <p>The cost of a pre-close operating assessment is modest relative to a transaction. Discovering the gaps at month three can instead appear in lost management capacity, weaker operating economics, and reduced sponsor confidence.</p>
                </div>
              </details>
            </article>
            <aside className="perspective-notes" aria-label="Operating notes">
              <article><span>01</span><h3>What financial diligence cannot answer</h3><p>Whether management has the controls, evidence, and cadence to execute under a new owner.</p></article>
              <article><span>02</span><h3>Why Day 1 sets the hold</h3><p>Unowned risks compound quickly; early visibility lets the sponsor sequence control before drift becomes cost.</p></article>
              <article><span>03</span><h3>What the IC should receive</h3><p>A clear view of operating exposure, the evidence behind it, and the actions required after close.</p></article>
            </aside>
          </div>
        </section>
      </div>

      <section className="resources-final-cta">
        <div><span className="resources-kicker">Have an active deal?</span><h2>Use the tools—or bring the operating question directly.</h2><p>A 15-minute fit check confirms the trigger, timing, and appropriate scope.</p></div>
        <div><a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => recordEvent("fit_check_click", { location: "resources_final_cta" })}>Book a Fit Check (15 min)</a><button type="button" onClick={() => { recordEvent("resource_tool_click", { tool: "scorer", location: "final_cta" }); setPage("scorer"); }}>Score Your Deal →</button></div>
      </section>
    </div>
  );
}
