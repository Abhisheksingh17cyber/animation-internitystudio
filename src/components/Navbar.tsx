"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      {/* Logo */}
      <Link href="/" className="navbar-logo">ELIXIR</Link>

      {/* Centered links */}
      <ul className="navbar-links">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`navbar-link${pathname === l.href ? " navbar-link--active" : ""}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pill CTA */}
      <Link href="/contact" className="navbar-cta-pill">
        Get Started
      </Link>
    </nav>
  );
}
