import Link from "next/link";

export default function SuccessPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      color: "var(--text-primary)",
      textAlign: "center",
      padding: "2rem"
    }}>
      <div style={{
        padding: "4rem",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        maxWidth: "600px",
        width: "100%"
      }}>
        <h1 className="heading-lg" style={{ marginBottom: "1rem" }}>
          <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>Thank You</em>
        </h1>
        <div style={{ width: "60px", height: "1px", background: "var(--accent-gold)", margin: "0 auto 2rem" }} />
        <h2 className="heading-sm" style={{ marginBottom: "1.5rem" }}>Order Confirmed</h2>
        <p className="body-lg" style={{ color: "var(--text-muted)", marginBottom: "3rem", lineHeight: 1.6 }}>
          Your exclusive Elixir collection is being prepared. 
          We have sent a confirmation email with your order details.
        </p>
        
        <Link href="/" className="btn-outline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
