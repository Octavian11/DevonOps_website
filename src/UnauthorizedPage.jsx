export default function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B2A4A",
        color: "#F8F9FA",
        fontFamily: "'DM Sans', sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px" }}>
          You are not authorized to view this page.
        </h1>
      </div>
    </div>
  );
}
