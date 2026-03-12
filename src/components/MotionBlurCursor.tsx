"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MotionBlurCursor() {
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // STEP 4 - PERFORMANCE OPTIMIZATION: Disable for mobile devices
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const $box = boxesRef.current;

    const moveBox = (e: MouseEvent) => {
      $box.forEach((box, index) => {
        if (!box) return;
        
        // Translating jQuery/TweenLite to modern GSAP v3
        gsap.to(box, {
          duration: 0.05,
          left: e.clientX,
          top: e.clientY,
          delay: index / 750,
        });
      });
    };

    window.addEventListener("mousemove", moveBox);

    // Initial reveal
    $box.forEach((box) => {
      if (!box) return;
      gsap.set(box, { autoAlpha: 1 });
    });

    return () => {
      window.removeEventListener("mousemove", moveBox);
    };
  }, []);

  return (
    <>
      {/* STEP 1 - HTML: Append 30 boxes */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="box motion-blur-box"
          ref={(el) => {
            boxesRef.current[i] = el;
          }}
        />
      ))}
    </>
  );
}
