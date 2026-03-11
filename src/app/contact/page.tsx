"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-header > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(".contact-grid > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.9, ease: "power2.out", delay: 0.7 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* ── Header ── */}
      <section className="page-header" style={{ background: "var(--surface)" }}>
        <p className="overline" style={{ marginBottom: "0.75rem" }}>Get in Touch</p>
        <h1 className="heading-lg">Let&apos;s <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>connect</em></h1>
      </section>

      {/* ── Contact Grid ── */}
      <section className="section">
        <div className="contact-grid">
          {/* Form */}
          <div>
            <p className="overline" style={{ marginBottom: "2rem" }}>Send a Message</p>
            {sent ? (
              <div style={{
                padding: "3rem",
                border: "1px solid var(--border-gold)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--accent-gold)" }}>
                  Message Received
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Thank you for reaching out. A member of our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Order enquiry, stockist, press..."
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-gold" style={{ marginTop: "0.5rem" }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div>
            <p className="overline" style={{ marginBottom: "2.5rem" }}>Find Us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.5rem" }}>Studio</p>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.75" }}>
                  12 Botanical Lane<br />
                  Marylebone<br />
                  London W1G 8HQ
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.5rem" }}>Email</p>
                <a href="mailto:hello@elixir.co" style={{ color: "var(--accent-gold)", fontSize: "1rem" }}>hello@elixir.co</a>
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.75rem" }}>Hours</p>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.75" }}>
                  Mon – Fri: 9:00 – 18:00<br />
                  Saturday: 10:00 – 15:00<br />
                  Sunday: Closed
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.75rem" }}>Follow</p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {["Instagram", "Pinterest", "Newsletter"].map((s) => (
                    <a key={s} href="#" className="btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.65rem" }}>{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
