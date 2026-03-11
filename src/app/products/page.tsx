"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const allProducts = [
  { tag: "Botanical", name: "Green Vitality", desc: "Strawberry, blueberry, cucumber & pomegranate.", price: "£12", priceValue: 12, img: "/product-green-vitality.jpg", color: "rgba(60,130,60,0.15)" },
  { tag: "Citrus", name: "Citrus Glow", desc: "Orange, turmeric, ginger & Manuka honey.", price: "£11", priceValue: 11, img: "/product-citrus-glow.jpg", color: "rgba(201,140,30,0.15)" },
  { tag: "Berry", name: "Berry Bliss", desc: "Strawberry, blueberry & pomegranate.", price: "£13", priceValue: 13, img: "/product-berry-bliss.jpg", color: "rgba(160,30,60,0.15)" },
  { tag: "Botanical", name: "White Petal", desc: "White rose, lychee, oolong & elderflower.", price: "£14", priceValue: 14, img: "/product-citrus-glow.jpg", color: "rgba(220,200,200,0.15)" },
  { tag: "Citrus", name: "Gold Rush", desc: "Meyer lemon, yuzu, raw ginger & turmeric.", price: "£12", priceValue: 12, img: "/product-citrus-glow.jpg", color: "rgba(201,168,76,0.15)" },
  { tag: "Berry", name: "Midnight Currant", desc: "Blackcurrant, black cherry, hibiscus & cardamom.", price: "£13", priceValue: 13, img: "/product-berry-bliss.jpg", color: "rgba(80,40,120,0.18)" },
];

const filters = ["All", "Botanical", "Citrus", "Berry"];

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  const visible = active === "All" ? allProducts : allProducts.filter((p) => p.tag === active);

  const handleCheckout = async (product: { name: string; priceValue: number; img?: string }) => {
    try {
      setLoadingProduct(product.name);
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{
            name: product.name,
            price: product.priceValue,
            quantity: 1,
            // Only add localhost fallback if image exists, though Stripe may block localhost images
            image: product.img ? (product.img.startsWith('http') ? product.img : `http://localhost:3000${product.img}`) : undefined
          }],
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout returned no URL", data);
        alert(data.error || "Failed to initiate checkout. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoadingProduct(null);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-header > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".prod-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }
    );
  }, [active]);

  return (
    <>
      {/* ── Header ── */}
      <section className="page-header" style={{ background: "var(--surface)" }}>
        <p className="overline" style={{ marginBottom: "0.75rem" }}>The Collection</p>
        <h1 className="heading-lg">Our <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>Elixirs</em></h1>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="section">
        {/* Featured card — Founder's Blend */}
        <div className="founders-blend-card" style={{ marginBottom: "4rem" }}>
          <div className="founders-blend-img-wrap">
            <Image
              src="/product-founders-blend.jpg"
              alt="Founder's Blend — Elixir's most celebrated formula"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="(max-width:768px) 90vw, 50vw"
              priority
            />
          </div>
          <div className="founders-blend-content">
            <p className="overline" style={{ marginBottom: "0.75rem" }}>Featured Elixir</p>
            <h2 className="heading-md" style={{ marginBottom: "1.25rem" }}>The Founder&apos;s Blend</h2>
            <div className="gold-line" />
            <p className="body-lg" style={{ marginTop: "1.25rem", marginBottom: "2rem" }}>
              A rare convergence of 12 botanicals — our most complex and celebrated formula. Designed for those who seek the extraordinary in every sip.
            </p>
            <span style={{ color: "var(--accent-gold)", fontFamily: "var(--font-heading)", fontSize: "1.5rem", display: "block", marginBottom: "1.5rem" }}>£18</span>
            <button 
              className="btn-gold" 
              onClick={() => handleCheckout({ name: "The Founder's Blend", priceValue: 18, img: "/product-founders-blend.jpg" })}
              disabled={loadingProduct === "The Founder's Blend"}
            >
              {loadingProduct === "The Founder's Blend" ? "Processing..." : "Add to Order"}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
          <span style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginLeft: "auto", alignSelf: "center" }}>
            {visible.length} products
          </span>
        </div>

        {/* Grid */}
        <div className="products-grid">
          {visible.map((p, i) => (
            <div key={`${p.name}-${i}`} className="product-card prod-card">
              <div style={{
                aspectRatio: "3/4",
                background: p.color,
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}>
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width:768px) 90vw, 33vw"
                />
              </div>
              <p className="product-card-tag">{p.tag}</p>
              <h3 className="product-card-name">{p.name}</h3>
              <p className="product-card-desc">{p.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="product-card-price">{p.price}</span>
                <button 
                  className="btn-outline" 
                  style={{ padding: "0.5rem 1rem", fontSize: "0.7rem" }}
                  onClick={() => handleCheckout(p)}
                  disabled={loadingProduct === p.name}
                >
                  {loadingProduct === p.name ? "Wait" : "Add →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
