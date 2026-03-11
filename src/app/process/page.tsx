"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Botanical Sourcing",
    desc: "We spend months each year scouting the world for the finest, rarest botanicals. Relationships with growers are cultivated over years. Every ingredient must pass our rigorous triple-certification process before it enters our facility.",
  },
  {
    num: "02",
    title: "Gentle Preparation",
    desc: "Botanicals are sorted by hand and washed in filtered spring water. Depending on the ingredient, they are either cold-soaked to unlock water-soluble phytonutrients, or cryo-frozen to lock in volatile aromatic compounds.",
  },
  {
    num: "03",
    title: "Hydraulic Cold-Press",
    desc: "Our 12-tonne hydraulic cold-press applies immense, gentle pressure over several hours — never heat. This extracts up to 40% more nutrients than centrifugal methods, producing a juice of unparalleled purity, colour, and flavour.",
  },
  {
    num: "04",
    title: "Micro-Filtration",
    desc: "The juice passes through our proprietary ceramic micro-filter — removing contaminants without stripping the vital enzymes and botanicals that make Elixir transformative.",
  },
  {
    num: "05",
    title: "HPP Preservation",
    desc: "High Pressure Processing uses cold water pressure — not heat — to eliminate pathogens while keeping all nutrients alive. Shelf life is extended to 30 days without a single preservative.",
  },
];

const ingredients = [
  { name: "Arctic Thyme", origin: "Iceland", benefit: "Anti-inflammatory, antioxidant", emoji: "🌾" },
  { name: "Turmeric Root", origin: "Kerala, India", benefit: "Anti-inflammatory, curcumin-rich", emoji: "🌿" },
  { name: "Elderflower", origin: "Provence, France", benefit: "Antiviral, immune-boosting", emoji: "🌸" },
  { name: "Acai Berry", origin: "Amazon Basin", benefit: "Antioxidant, heart health", emoji: "🫐" },
  { name: "Yuzu Citrus", origin: "Kochi, Japan", benefit: "Vitamin C, skin-brightening", emoji: "🍋" },
  { name: "Spirulina", origin: "Kona, Hawaii", benefit: "Protein, detoxifying, alkalising", emoji: "💎" },
];

export default function ProcessPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-header > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.4 }
      );

      // Timeline items
      gsap.fromTo(".timeline-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".process-timeline", start: "top 80%" },
        }
      );

      // Ingredient items
      gsap.fromTo(".ingredient-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".ingredient-scroll", start: "top 85%" },
        }
      );

      // Big stats
      gsap.fromTo(".process-stat",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".process-stats", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Header ── */}
      <section className="page-header" style={{ background: "var(--surface)" }}>
        <p className="overline" style={{ marginBottom: "0.75rem" }}>The Craft</p>
        <h1 className="heading-lg">From Earth<br /><em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>to Elixir</em></h1>
        <p className="body-lg" style={{ maxWidth: "480px", marginTop: "1.5rem" }}>
          Five painstaking steps transform raw botanical ingredients into the luminous, life-affirming liquids in your hands.
        </p>
      </section>

      {/* ── Timeline ── */}
      <div className="process-timeline">
        {steps.map((s, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-step">{s.num}</div>
            <div className="timeline-content">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stats ── */}
      <section style={{ background: "var(--surface)", padding: "7rem 4rem" }}>
        <p className="overline" style={{ marginBottom: "1rem", textAlign: "center" }}>By the Numbers</p>
        <div className="process-stats" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginTop: "3rem",
        }}>
          {[
            { num: "12 hrs", label: "Average press time per batch" },
            { num: "40%", label: "More nutrients than centrifugal" },
            { num: "0°C", label: "Temperature during pressing" },
          ].map((s, i) => (
            <div key={i} className="process-stat" style={{ textAlign: "center", padding: "3rem 2rem", border: "1px solid var(--border)" }}>
              <span className="stat-num" style={{ display: "block", marginBottom: "0.5rem" }}>{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section style={{ padding: "7rem 0 7rem" }}>
        <div style={{ padding: "0 4rem", marginBottom: "2rem" }}>
          <p className="overline" style={{ marginBottom: "0.75rem" }}>Ingredient Spotlight</p>
          <h2 className="heading-md">The botanicals<br /><em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>behind the magic</em></h2>
        </div>
        <div className="ingredient-scroll">
          {ingredients.map((ing, i) => (
            <div key={i} className="ingredient-item">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{ing.emoji}</div>
              <div className="gold-line" style={{ width: "28px", marginBottom: "1rem" }} />
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", marginBottom: "0.25rem" }}>{ing.name}</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "0.75rem" }}>{ing.origin}</p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6" }}>{ing.benefit}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
