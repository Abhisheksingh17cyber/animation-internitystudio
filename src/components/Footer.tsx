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
          <div className="main">
            <div className="card">
              <svg fillRule="nonzero" height="30px" width="30px" viewBox="0,0,256,256" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" className="instagram">
                <g style={{ mixBlendMode: 'normal' }}>
                  <g transform="scale(8,8)">
                    <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875z"></path>
                  </g>
                </g>
              </svg>
            </div>

            <div className="card">
              <svg height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="twitter">
                <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162"></path>
              </svg>
            </div>

            <div className="card">
              <svg height="30px" width="30px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="dribble">
                <path d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5"></path>
              </svg>
            </div>

            <div className="card">
              <svg height="30px" width="30px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="codepen">
                <path d="M25 4 L4 17.34 L4 32.65 L25 46 L46 32.65 L46 17.34 Z"></path>
              </svg>
            </div>

            <p className="text">HOVER<br/><br/>FOR<br/><br/>SOCIAL</p>

            <div className="main_back"></div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Elixir Botanicals. All rights reserved.</p>
        <p className="footer-copy" style={{ color: "var(--text-faint)" }}>Pure · Cold-Pressed · Botanical · Refined</p>
      </div>
    </footer>
  );
}
