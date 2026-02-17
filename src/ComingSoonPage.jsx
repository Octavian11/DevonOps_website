// Design system tokens — kept inline to avoid circular import from constants.js
const NAVY = "#14213D";
const GOLD = "#B8860B";
const OFF_WHITE = "#FCFCFC";
const CHARCOAL = "#0A0A0A";
const BORDER = "#E2E8F0";
const HEADING = "'EB Garamond', Garamond, 'Times New Roman', serif";
const BODY = "Georgia, 'Times New Roman', serif";

export default function ComingSoonPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: OFF_WHITE,
      padding: "40px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "480px" }}>
        <div style={{
          fontFamily: BODY,
          fontSize: "0.85rem",
          color: GOLD,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          Coming Soon
        </div>
        <h1 style={{
          fontFamily: HEADING,
          fontSize: "2rem",
          fontWeight: 700,
          color: NAVY,
          lineHeight: 1.2,
          marginBottom: "16px",
        }}>
          This section is under construction.
        </h1>
        <p style={{
          fontFamily: BODY,
          fontSize: "1rem",
          color: CHARCOAL,
          lineHeight: 1.65,
          marginBottom: "28px",
        }}>
          We're building something useful here. Check back soon — or go back to the main site now.
        </p>
        <a href="/pe/" style={{
          display: "inline-block",
          padding: "12px 28px",
          background: NAVY,
          color: "white",
          fontFamily: BODY,
          fontSize: "1rem",
          fontWeight: 600,
          borderRadius: "4px",
          textDecoration: "none",
          letterSpacing: "0.3px",
          border: `1px solid ${BORDER}`,
        }}>
          Return to Site
        </a>
      </div>
    </div>
  );
}
