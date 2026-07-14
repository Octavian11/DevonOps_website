import { track } from "@vercel/analytics/react";
import { CALENDLY, CONTACT_EMAIL, LINKEDIN_URL } from "../constants.js";

const CAREER_CHAPTERS = [
  {
    n: "01",
    period: "Institutional foundations",
    title: "JPMorgan · Barclays · Lazard",
    copy: "Front-to-back operating roles across trading and banking platforms—workflow design, automation, control, and vendor foundations.",
  },
  {
    n: "02",
    period: "Operating-model transformation",
    title: "Bank of America",
    copy: "Consolidated operating workflows supporting $700M+ in daily transaction flow and built automation cases funded at $1.8M.",
  },
  {
    n: "03",
    period: "Platform leadership",
    title: "$10B+ investment platform",
    copy: "Led an eight-person global operating team across platform, data, trading, and risk environments while installing measurable operating control.",
  },
  {
    n: "04",
    period: "The sponsor-side lens",
    title: "Columbia MBA · Devonshire",
    copy: "Formalized the operator experience into a repeatable diligence and 100-day methodology built for lower-middle-market ownership transitions.",
  },
];

const OPERATING_TRANSLATIONS = [
  ["Incident command", "See execution risk before it becomes a board-level surprise", "Risk visibility and a credible Day-1 critical path"],
  ["Vendor governance", "Separate addressable cost from structural dependency", "Savings opportunities with ownership and continuity controls"],
  ["KPI architecture", "Distinguish reported activity from decision-useful operating evidence", "A management cadence the sponsor and board can govern"],
  ["Organization and process", "Identify key-person fragility and unclear operating ownership", "An executable plan with named owners and handoff discipline"],
];

const OUTCOME_CASES = [
  {
    overline: "Platform stabilization · $10B+ platform",
    title: "Operating control replaced recurring firefighting.",
    copy: "Built the team, severity model, escalation paths, postmortem discipline, change governance, and an 18-metric weekly operating cadence.",
    metrics: [
      ["~50%", "critical incident reduction"],
      ["99.2%", "availability, from 94%"],
      ["−31%", "mean time to resolution"],
      ["+22", "NPS improvement"],
    ],
  },
  {
    overline: "Vendor optimization · $40M program",
    title: "Commercial discipline converted complexity into savings.",
    copy: "Created spend transparency, consolidated 15 providers to eight strategic partners, right-sized licensing, renegotiated terms, and installed ongoing vendor governance.",
    metrics: [
      [">$2M", "annual run-rate reduction"],
      ["10–15%", "licensing savings"],
      ["~28%", "cost per $1B AUM reduction"],
      ["<6 mo", "payback period"],
    ],
  },
];

function recordEvent(name, properties = {}) {
  try {
    track(name, properties);
  } catch {
    // Analytics should never interfere with navigation.
  }
}

export default function AboutPage() {
  return (
    <div className="about-page fade-in">
      <header className="about-hero">
        <div className="about-hero-inner">
          {/* Temporary visual treatment: replace with Hassan's approved headshot when supplied. */}
          <div className="practitioner-plate about-credential-plate" data-portrait-status="awaiting-approved-headshot" aria-label="Hassan Tariq, operator and advisor">
            <div className="founder-monogram" aria-hidden="true">HT</div>
            <div className="plate-role">Operator <span>→</span> Advisor</div>
            <div className="plate-facts"><span><strong>15+</strong> years</span><span><strong>$10B+</strong> platform</span><span><strong>$2M+</strong> savings</span></div>
          </div>

          <div className="about-hero-copy">
            <span className="about-kicker">About Devonshire Operations</span>
            <h1>The operator behind Devonshire.</h1>
            <div className="about-name">Hassan Tariq</div>
            <p className="about-credentials">15+ years in institutional platform operations · Columbia Business School MBA '26</p>
            <p className="about-lead">I built operating systems inside global financial institutions and a $10B+ investment platform before bringing that discipline to lower-middle-market PE.</p>
            <p>Devonshire exists because financial diligence can establish what a company earned without proving whether its operating model can deliver under new ownership. I now apply that discipline where sponsors need senior operating ownership before a full in-house operating or integration function makes economic sense.</p>
            <div className="about-contact-links">
              <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => recordEvent("about_email_click")}>Email Hassan</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => recordEvent("about_linkedin_click")}>LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </header>

      <div className="about-main">
        <section className="about-origin" aria-labelledby="about-origin-title">
          <div className="about-section-heading">
            <span className="about-kicker">Operator to advisor</span>
            <h2 id="about-origin-title">The advisory method came from the operating seat.</h2>
          </div>
          <div className="about-origin-copy">
            <p>My operating career was spent in environments where weak escalation, unmanaged change, vendor dependency, and poor management information had immediate consequences. The job was not to recommend a framework. It was to establish control while the platform kept running.</p>
            <p>That experience now informs how I assess a deal: start with the sponsor’s decision, test the evidence, isolate the operating friction, connect it to value and risk, then sequence only the actions management can own.</p>
          </div>
          <blockquote>“The work should leave management with a stronger operating system—not a dependency on the advisor.”</blockquote>
        </section>

        <section className="about-career" aria-labelledby="about-career-title">
          <div className="about-section-heading">
            <span className="about-kicker">Experience and credentials</span>
            <h2 id="about-career-title">Four chapters. One operating through-line.</h2>
            <p>Each stage added a different part of the system Devonshire now installs: workflow control, operating-model design, platform governance, and the sponsor-side value-creation lens.</p>
          </div>
          <div className="about-career-grid">
            {CAREER_CHAPTERS.map((chapter) => (
              <article key={chapter.n}>
                <span>{chapter.n}</span>
                <small>{chapter.period}</small>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
              </article>
            ))}
          </div>
          <div className="about-institution-row" aria-label="Institutional background">
            <span>Institutional background</span>
            <strong>JPMorgan</strong><strong>Barclays</strong><strong>Bank of America</strong><strong>Lazard</strong><strong>Columbia MBA</strong>
          </div>
        </section>

        <section className="about-translation" aria-labelledby="about-translation-title">
          <div className="about-section-heading">
            <span className="about-kicker">What changes for the sponsor</span>
            <h2 id="about-translation-title">Operating experience, translated into investment judgment.</h2>
            <p>The value of the background is not the résumé. It is the ability to recognize the operating pattern, frame its PE consequence, and stay accountable through implementation.</p>
          </div>
          <div className="about-translation-table" role="table" aria-label="How operating experience translates into sponsor value">
            <div className="about-translation-head" role="row"><span role="columnheader">Operating experience</span><span role="columnheader">Advisor judgment</span><span role="columnheader">Sponsor receives</span></div>
            {OPERATING_TRANSLATIONS.map(([experience, judgment, sponsor]) => (
              <div className="about-translation-row" role="row" key={experience}>
                <strong role="cell">{experience}</strong><span role="cell">{judgment}</span><span role="cell">{sponsor}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-outcomes" aria-labelledby="about-outcomes-title">
          <div className="about-outcomes-inner">
            <div className="about-section-heading">
              <span className="about-kicker">Representative institutional outcomes</span>
              <h2 id="about-outcomes-title">Measured operating outcomes behind the advisory method.</h2>
              <p>These are experience-based outcomes from Hassan’s institutional operating career—not Devonshire client case studies.</p>
            </div>
            <div className="about-outcome-grid">
              {OUTCOME_CASES.map((outcome) => (
                <article key={outcome.overline}>
                  <span>{outcome.overline}</span>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.copy}</p>
                  <div className="about-outcome-metrics">
                    {outcome.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-working-model" aria-labelledby="about-working-title">
          <div className="about-section-heading">
            <span className="about-kicker">How I show up</span>
            <h2 id="about-working-title">Senior judgment stays in the work.</h2>
          </div>
          <div className="about-principles">
            <article><span>01</span><h3>Evidence before assertion</h3><p>A framework structures the inquiry. Company evidence determines the finding.</p></article>
            <article><span>02</span><h3>Economics before activity</h3><p>Every priority connects to measurable value, explicit risk, or a necessary execution dependency.</p></article>
            <article><span>03</span><h3>Ownership before handoff</h3><p>I run the diagnostic and stay through the operating design. Management owns the system that remains.</p></article>
          </div>
        </section>

        <section className="about-final-cta">
          <div><span className="about-kicker">A focused first conversation</span><h2>Bring the operating question behind the deal.</h2><p>In 15 minutes, I can confirm the stage, operating trigger, and whether Devonshire is the right fit.</p></div>
          <div><a href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => recordEvent("about_fit_check_click")}>Book a Fit Check (15 min)</a><a href="/pe/services" onClick={() => recordEvent("about_services_click")}>View Services</a></div>
        </section>
      </div>
    </div>
  );
}
