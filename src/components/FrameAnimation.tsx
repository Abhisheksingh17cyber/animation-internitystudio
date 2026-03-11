"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 456;
const FRAME_PATH = (n: number) =>
  `/frames/${String(n).padStart(4, "0")}.jpg`;

export default function FrameAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const loadedRef = useRef(0);

  /* ─── Draw a specific frame onto the canvas ─── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cover-fit: maintain aspect ratio, fill canvas
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;
    const scale = Math.max(cw / iw, ch / ih);
    const dx = (cw - iw * scale) / 2;
    const dy = (ch - ih * scale) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
  }, []);

  /* ─── Preload a range of frames ─── */
  const loadRange = useCallback(
    (start: number, end: number, onAllLoaded?: () => void) => {
      let count = end - start;
      for (let i = start; i < end; i++) {
        if (imagesRef.current[i]) { count--; continue; }
        const img = new Image();
        img.src = FRAME_PATH(i + 1); // files are 1-indexed
        img.onload = () => {
          loadedRef.current++;
          count--;
          if (count <= 0 && onAllLoaded) onAllLoaded();
        };
        img.onerror = () => { count--; };
        imagesRef.current[i] = img;
      }
    },
    []
  );

  /* ─── Resize canvas to match container ─── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    // 1. Eagerly preload first 80 frames
    loadRange(0, 80, () => drawFrame(0));
    // 2. Lazily load rest
    setTimeout(() => loadRange(80, TOTAL_FRAMES), 800);

    // 3. Resize canvas
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 4. GSAP ScrollTrigger scrubs frame index
    const trigger = ScrollTrigger.create({
      trigger: ".frame-anim-pin",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,              // smooth half-second lag
      onUpdate: (self) => {
        const frame = Math.round(self.progress * (TOTAL_FRAMES - 1));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          // Lazy-load ahead window (next 30 frames)
          const ahead = Math.min(frame + 30, TOTAL_FRAMES);
          loadRange(frame, ahead);
          drawFrame(frame);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, loadRange, resizeCanvas]);

  return (
    <section className="frame-anim-pin">
      <div className="frame-anim-sticky">
        {/* Canvas */}
        <canvas ref={canvasRef} className="frame-anim-canvas" />

        {/* Gradient overlays */}
        <div className="frame-anim-overlay-top" />
        <div className="frame-anim-overlay-bottom" />

        {/* Text */}
        <div className="frame-anim-label">
          <p className="frame-anim-overline">Behind the Craft</p>
          <h2 className="frame-anim-heading">
            Born from<br />
            <em>Nature&apos;s Purest</em>
          </h2>
          <p className="frame-anim-body">
            From cold-pressed extraction to glass — watch the journey.
          </p>
        </div>
      </div>
    </section>
  );
}
