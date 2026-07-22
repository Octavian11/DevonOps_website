import { useState } from "react";

export default function PrivacyPage() {
  const analytics = typeof window !== "undefined" ? window.devonshireAnalytics : null;
  const [enabled, setEnabled] = useState(analytics?.isEnabled !== false);

  const updatePreference = (nextEnabled) => {
    setEnabled(nextEnabled);
    analytics?.setEnabled(nextEnabled);
  };

  return (
    <article className="privacy-page fade-in">
      <header>
        <span className="privacy-kicker">Privacy</span>
        <h1>Privacy &amp; analytics choices</h1>
        <p>Devonshire Operations uses limited visitor data to understand which services and resources are useful and to improve this website.</p>
      </header>

      <section aria-labelledby="analytics-heading">
        <h2 id="analytics-heading">Analytics used on this site</h2>
        <p><strong>Vercel Web Analytics</strong> provides cookieless, aggregated information such as page views, referring sites, approximate location, device, and browser type.</p>
        <p><strong>Google Analytics 4</strong> helps measure visits, navigation paths, traffic sources, and engagement. Google Analytics may use cookies and similar technologies.</p>
        <p><strong>Microsoft Clarity</strong> provides interaction analytics such as clicks, scrolling, heatmaps, and session recordings. Clarity masks input fields by default, and this site additionally marks forms containing names or email addresses for masking.</p>
      </section>

      <section aria-labelledby="choice-heading">
        <h2 id="choice-heading">Your analytics choice</h2>
        <div className="privacy-choice" role="status" aria-live="polite">
          <p>Google Analytics and Microsoft Clarity are currently <strong>{enabled ? "enabled" : "disabled"}</strong> in this browser.</p>
          {enabled ? (
            <button type="button" onClick={() => updatePreference(false)}>Disable Google Analytics and Clarity</button>
          ) : (
            <button type="button" onClick={() => updatePreference(true)}>Enable Google Analytics and Clarity</button>
          )}
          <p>Your preference is saved only in this browser. Disabling analytics clears accessible analytics cookies and prevents these two services from loading on future visits from this browser.</p>
        </div>
      </section>

      <section aria-labelledby="forms-heading">
        <h2 id="forms-heading">Information you submit</h2>
        <p>If you submit a form, the information you provide is used to deliver the requested resource or respond to your inquiry. Do not submit confidential deal information through the website.</p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Questions</h2>
        <p>For questions about this notice or your information, email <a href="mailto:hassan@devonshireops.com">hassan@devonshireops.com</a>.</p>
      </section>

      <p className="privacy-updated">Last updated July 21, 2026.</p>
    </article>
  );
}
