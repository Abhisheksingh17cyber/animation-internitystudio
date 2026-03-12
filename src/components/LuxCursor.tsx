"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function LuxCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // STEP 5 — DISABLE ON MOBILE
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // STEP 3 — JAVASCRIPT
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", onMouseMove);

    const hoverElements = document.querySelectorAll("a, button, .btn");

    const onMouseEnter = () => {
      cursor.classList.add("hover");
      cursor.classList.add("glow");
    };

    const onMouseLeave = () => {
      cursor.classList.remove("hover");
      cursor.classList.remove("glow");
    };

    const magneticMoveListeners = new Map();
    const magneticLeaveListeners = new Map();

    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);

      // STEP 4 — MAGNETIC BUTTON EFFECT
      const onBtnMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        (el as HTMLElement).style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      };

      const onBtnMouseLeave = () => {
        (el as HTMLElement).style.transform = "translate(0px,0px)";
      };

      el.addEventListener("mousemove", onBtnMouseMove);
      el.addEventListener("mouseleave", onBtnMouseLeave);

      magneticMoveListeners.set(el, onBtnMouseMove);
      magneticLeaveListeners.set(el, onBtnMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousemove", magneticMoveListeners.get(el));
        el.removeEventListener("mouseleave", magneticLeaveListeners.get(el));
      });
    };
  }, [pathname]); // Re-bind magnetic listeners when routes change

  return (
    <>
      {/* STEP 1 — HTML */}
      <div className="lux-cursor" ref={cursorRef}></div>
      <div className="lux-cursor-dot" ref={dotRef}></div>
      <div className="lux-cursor-trail"></div>
    </>
  );
}
