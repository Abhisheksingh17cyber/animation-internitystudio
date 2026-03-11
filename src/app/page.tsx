"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import FrameAnimation from "@/components/FrameAnimation";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "100%", label: "Organic Sourcing" },
  { num: "24h", label: "Cold-Pressed Fresh" },
  { num: "12+", label: "Rare Botanicals" },
  { num: "0g", label: "Added Sugars" },
];

const products = [
  {
    tag: "Botanical",
    name: "Green Vitality",
    desc: "Strawberry, blueberry, cucumber & pomegranate. A vibrant green elixir that energises and revitalises.",
    price: "£12.00",
    color: "rgba(60,120,60,0.18)",
    img: "/product-green-vitality.jpg",
  },
  {
    tag: "Citrus",
    name: "Citrus Glow",
    desc: "Orange, turmeric, ginger & Manuka honey. A radiant citrus elixir — warm, luminous, alive.",
    price: "£11.00",
    color: "rgba(201,140,30,0.18)",
    img: "/product-citrus-glow.jpg",
  },
  {
    tag: "Berry",
    name: "Berry Bliss",
    desc: "Strawberry, blueberry & pomegranate. Deeply fruity, hauntingly rich and smooth.",
    price: "£13.00",
    color: "rgba(160,30,60,0.18)",
    img: "/product-berry-bliss.jpg",
  },
];


export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to(".hero-img-wrap", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-full",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-badge-top", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.4 })
        .fromTo(".hero-cta-bottom", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
        .fromTo(".hero-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.3");

      // Cards
      gsap.fromTo(".product-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".product-grid", start: "top 80%" },
        }
      );

      // Stats
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 85%" },
        }
      );

      // CTA
      gsap.fromTo(".cta-section h2, .cta-section p, .cta-section a",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — full viewport, CSS background image
         ═══════════════════════════════════════════ */}
      <section className="hero-full" ref={heroRef}>

        {/* CSS background image layer */}
        <div className="hero-img-wrap" />

        {/* Dark gradient overlay — ensures text always readable */}
        <div className="hero-overlay-top" />
        <div className="hero-overlay-bottom" />
        <div className="hero-overlay-center" />

        {/* Badge — floats just below navbar */}
        <div className="hero-badge hero-badge-top">
          <span className="hero-badge-line" />
          <span>Est. 2024 &nbsp;·&nbsp; London</span>
          <span className="hero-badge-line" />
        </div>

        {/* CTA buttons — float at the bottom above the bottles */}
        <div className="hero-cta-bottom">
          <Link href="/products" className="hero-btn-primary">
            Explore Collection
            <span className="hero-btn-arrow">→</span>
          </Link>
          <Link href="/about" className="hero-btn-ghost">
            Our Story
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ═══════════════ Marquee strip ═══════════════ */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="item">
              PURE<span>·</span>COLD-PRESSED<span>·</span>BOTANICAL<span>·</span>REFINED<span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ Products Preview ═══════════════ */}
      <section className="section" style={{ background: "var(--surface)", paddingTop: "7rem", paddingBottom: "7rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem" }}>
          <div>
            <p className="overline" style={{ marginBottom: "0.75rem" }}>The Collection</p>
            <h2 className="heading-lg">Curated<br /><em style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>Elixirs</em></h2>
          </div>
          <Link href="/products" className="btn-outline">View All →</Link>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <div key={i} className="product-card">
              <div style={{
                width: "100%",
                aspectRatio: "3/4",
                marginBottom: "1.5rem",
                background: `radial-gradient(ellipse at 50% 30%, ${p.color} 0%, var(--card) 80%)`,
                position: "relative",
                overflow: "hidden",
              }}>
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  sizes="(max-width:768px) 90vw, 33vw"
                  priority={i === 0}
                />
              </div>
              <p className="product-card-tag">{p.tag}</p>
              <h3 className="product-card-name">{p.name}</h3>
              <p className="product-card-desc">{p.desc}</p>
              <span className="product-card-price">{p.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ Frame Animation ═══════════════ */}
      <FrameAnimation />

      {/* ═══════════════ Stats ═══════════════ */}
      <section style={{ padding: "0 4rem 6rem" }}>
        <div className="stats-row">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="cta-section">
        <p className="overline" style={{ marginBottom: "1.5rem" }}>Begin Your Journey</p>
        <h2 className="heading-lg" style={{ marginBottom: "1.5rem", maxWidth: "700px", margin: "0 auto 1.5rem" }}>
          Nature&apos;s finest, <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>refined to perfection</em>
        </h2>
        <p className="body-lg" style={{ maxWidth: "480px", margin: "0 auto 3rem" }}>
          Step into a world where every drop is a luxury. Our botanicals are sourced from the world&apos;s most pristine regions, then cold-pressed within hours.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/products" className="btn-gold">Shop the Collection</Link>
          <Link href="/process" className="btn-outline">Learn Our Process</Link>
        </div>
      </section>
    </>
  );
}
