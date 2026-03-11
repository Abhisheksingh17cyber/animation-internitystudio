"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: "🌿",
    title: "Source Integrity",
    desc: "Every botanical is traced back to its origin. We partner only with certified organic growers who share our philosophy of respect for the land.",
  },
  {
    icon: "❄️",
    title: "Cold-Press Purity",
    desc: "Our hydraulic cold-press process extracts maximum nutrients without heat, preserving the living intelligence of each ingredient.",
  },
  {
    icon: "✦",
    title: "Conscious Luxury",
    desc: "Luxury and responsibility are not opposites. Our packaging is 100% compostable and our carbon footprint is offset on every order.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-header .overline, .page-header .heading-lg, .page-header .body-lg",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out", delay: 0.4 }
      );

      gsap.fromTo(".philosophy-section h2, .philosophy-section p",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.18, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".philosophy-section", start: "top 75%" },
        }
      );

      gsap.fromTo(".value-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.18, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
        }
      );

      gsap.from(".full-bleed", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".full-bleed-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Page Header ── */}
      <section className="page-header" style={{ background: "var(--surface)", minHeight: "50vh" }}>
        <p className="overline" style={{ marginBottom: "1rem" }}>Our Story</p>
        <h1 className="heading-lg" style={{ marginBottom: "1.5rem", maxWidth: "700px" }}>
          At the intersection of nature<br />
          <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>and refinement</em>
        </h1>
        <p className="body-lg" style={{ maxWidth: "520px" }}>
          Elixir was born from a simple truth: that the most extraordinary flavours and nutrients exist in the natural world, waiting to be unlocked with care and respect.
        </p>
      </section>

      {/* ── Philosophy ── */}
      <section className="philosophy-section section">
        <div className="about-hero" style={{ alignItems: "center" }}>
          <div>
            <p className="overline" style={{ marginBottom: "1rem" }}>Philosophy</p>
            <h2 className="heading-md" style={{ marginBottom: "2rem" }}>
              We believe luxury is not a destination, it is a <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>practice</em>
            </h2>
            <div className="gold-line" />
            <p className="body-lg" style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              Elixir is rooted in the conviction that nature offers everything we need to thrive — not in spite of our modern lives, but in service of them. We take the ancient wisdom of botanical alchemy and apply it with the precision and rigour of modern science.
            </p>
            <p className="body-lg">
              Each blend is a collaboration between the wild and the refined: the moss-covered cliffs of Iceland yielding arctic thyme, the sun-baked hillsides of Provence surrendering their lavender, the dark soils of Colombia offering their cacao. We are merely the conduit through which these gifts pass.
            </p>
          </div>
          <div style={{
            aspectRatio: "4/5",
            background: "radial-gradient(ellipse at 40% 30%, rgba(90,138,90,0.2) 0%, rgba(201,168,76,0.08) 50%, var(--card) 100%)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "8rem",
          }}>🌿</div>
        </div>
      </section>

      {/* ── Full-bleed Image Block ── */}
      <div className="full-bleed-wrap" style={{ overflow: "hidden", height: "55vh" }}>
        <div style={{
          width: "100%",
          height: "110%",
          background: "linear-gradient(135deg, rgba(90,138,90,0.25) 0%, rgba(8,8,8,0.95) 60%), radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }} className="full-bleed">
          <p className="overline">Our Ethos</p>
          <h3 className="heading-md" style={{ textAlign: "center" }}>
            &ldquo;Every drop holds a memory<br />of where it came from.&rdquo;
          </h3>
        </div>
      </div>

      {/* ── Values ── */}
      <section className="section">
        <p className="overline" style={{ marginBottom: "1rem" }}>What We Stand For</p>
        <h2 className="heading-md" style={{ marginBottom: "4rem", maxWidth: "480px" }}>
          Three pillars of <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>our practice</em>
        </h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-item">
              <span className="value-icon">{v.icon}</span>
              <div className="gold-line" style={{ width: "32px" }} />
              <h3 className="value-title" style={{ marginTop: "1rem" }}>{v.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.75" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
