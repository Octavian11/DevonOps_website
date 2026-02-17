// Design system tokens — kept inline to avoid circular import from constants.js
const NAVY = "#14213D";
const GOLD = "#B8860B";
const OFF_WHITE = "#FCFCFC";
const HEADING = "'EB Garamond', Garamond, 'Times New Roman', serif";
const BODY = "Georgia, 'Times New Roman', serif";

export default function UnauthorizedPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: NAVY,
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
          Access Restricted
        </div>
        <h1 style={{
          fontFamily: HEADING,
          fontSize: "2rem",
          fontWeight: 700,
          color: OFF_WHITE,
          lineHeight: 1.2,
          marginBottom: "16px",
        }}>
          You are not authorized to view this page.
        </h1>
        <p style={{
          fontFamily: BODY,
          fontSize: "1rem",
          color: `${OFF_WHITE}B0`,
          lineHeight: 1.65,
          marginBottom: "28px",
        }}>
          If you believe this is an error, please contact the site administrator.
        </p>
        <a href="/pe/" style={{
          display: "inline-block",
          padding: "12px 28px",
          background: GOLD,
          color: "white",
          fontFamily: BODY,
          fontSize: "1rem",
          fontWeight: 600,
          borderRadius: "4px",
          textDecoration: "none",
          letterSpacing: "0.3px",
        }}>
          Return to Site
        </a>
      </div>
    </div>
  );
}
