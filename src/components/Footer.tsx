import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">ELIXIR</div>
          <p className="footer-tagline">
            Crafted at the intersection of nature and refinement. Cold-pressed botanical luxury, delivered to your door.
          </p>
        </div>
        <div>
          <p className="footer-col-title">Navigate</p>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/process">Process</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Products</p>
          <ul className="footer-links">
            <li><Link href="/products">Botanical Series</Link></li>
            <li><Link href="/products">Citrus Collection</Link></li>
            <li><Link href="/products">Berry Essence</Link></li>
            <li><Link href="/products">Seasonal Blends</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Connect</p>
          <ul className="footer-links">
            <li>Contact</li>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Newsletter</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Elixir Botanicals. All rights reserved.</p>
        <p className="footer-copy" style={{ color: "var(--text-faint)" }}>Pure · Cold-Pressed · Botanical · Refined</p>
      </div>
    </footer>
  );
}
