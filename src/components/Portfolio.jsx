import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Portfolio() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const sharpRef   = useRef(null);
  const frameRef   = useRef(null);

  /* coords relative to wrapper */
  const relTo = useCallback((clientX, clientY) => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return { x: 260, y: 260 };
    return { x: clientX - r.left, y: clientY - r.top };
  }, []);

  /* apply mask + position frame */
  const applyMask = useCallback((x, y) => {
    const s = sharpRef.current;
    if (s) {
      const maskVal = `radial-gradient(circle 140px at ${x}px ${y}px, black 65%, transparent 100%)`;
      s.style.webkitMaskImage = maskVal;
      s.style.maskImage = maskVal;
    }
    if (frameRef.current) {
      gsap.set(frameRef.current, { x: x - 140, y: y - 140 });
    }
  }, []);

  const getFaceCentre = useCallback(() => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return { x: 260, y: 260 };
    return { x: r.width / 2, y: r.height * 0.38 };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Center on face initially
    const init = () => {
      const { x, y } = getFaceCentre();
      applyMask(x, y);
    };

    // run after layout
    const timer = setTimeout(init, 50);
    window.addEventListener("resize", init);

    const qx = gsap.quickTo(frameRef.current, "x", { duration: 0.35, ease: "power2.out" });
    const qy = gsap.quickTo(frameRef.current, "y", { duration: 0.35, ease: "power2.out" });

    const handlePointerMove = (clientX, clientY) => {
      const { x, y } = relTo(clientX, clientY);
      const s = sharpRef.current;
      if (s) {
        const maskVal = `radial-gradient(circle 140px at ${x}px ${y}px, black 65%, transparent 100%)`;
        s.style.webkitMaskImage = maskVal;
        s.style.maskImage = maskVal;
      }
      qx(x - 140);
      qy(y - 140);
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [relTo, applyMask, getFaceCentre]);

  /* keep drop-shadow style string short */
  const imgShadow = "drop-shadow(0 20px 60px rgba(0,0,0,0.3))";

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="fixed inset-0 z-0 select-none overflow-hidden flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at 50% 45%, #0d2146 0%, #060b17 100%)", cursor: "crosshair" }}
      aria-label="Portfolio interactive reveal"
    >
      {/* ── PRABHU KIRAN ghost text ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] px-4" aria-hidden="true">
        <span
          className="font-black uppercase leading-none select-none text-center whitespace-nowrap"
          style={{
            fontSize: "clamp(2.5rem, 11vw, 160px)",
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.06)",
          }}
        >
          {"PRABHU KIRAN".split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="inline-block w-4 md:w-8">&nbsp;</span>
            ) : ch === "R" || ch === "A" || ch === "N" ? (
              <span key={i} style={{ WebkitTextStroke: "2px rgba(56,189,248,0.4)", color: "transparent" }}>
                {ch}
              </span>
            ) : (
              <span key={i}>{ch}</span>
            )
          )}
        </span>
      </div>

      {/* ── Image wrapper — constrained, centred ── */}
      <div
        ref={wrapperRef}
        className="relative z-[2] pointer-events-none"
        style={{ width: "min(55vw, 520px)", height: "min(75vh, 680px)" }}
      >
        {/* BOTTOM: blurred */}
        <img
          src="/images/portfolio.png.jpeg"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full select-none"
          style={{ objectFit: "contain", objectPosition: "center", filter: `blur(6px) brightness(0.85) ${imgShadow}` }}
        />

        {/* TOP: sharp, masked */}
        <img
          ref={sharpRef}
          src="/images/portfolio.png.jpeg"
          alt="Prabhu Kiran — interactive portrait"
          draggable={false}
          className="absolute inset-0 w-full h-full select-none"
          style={{
            objectFit: "contain",
            objectPosition: "center",
            filter: imgShadow,
            maskImage:       "radial-gradient(circle 140px at 50% 38%, black 65%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 140px at 50% 38%, black 65%, transparent 100%)",
          }}
        />

        {/* ── Crop frame SVG ── */}
        <svg
          ref={frameRef}
          className="absolute z-[4] pointer-events-none"
          width="280" height="280"
          style={{ top: 0, left: 0, willChange: "transform", overflow: "visible" }}
          aria-hidden="true"
        >
          <line x1="0"   y1="0"   x2="24"  y2="0"   stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="0"   y1="0"   x2="0"   y2="24"  stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="256" y1="0"   x2="280" y2="0"   stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="280" y1="0"   x2="280" y2="24"  stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="0"   y1="256" x2="0"   y2="280" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="0"   y1="280" x2="24"  y2="280" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="280" y1="256" x2="280" y2="280" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="256" y1="280" x2="280" y2="280" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <rect x="1" y="1" width="278" height="278"
            fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="8 4"
            style={{ animation: "march 0.5s linear infinite" }}
            filter="drop-shadow(0 0 8px rgba(56,189,248,0.8))" />
        </svg>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[5] flex flex-col items-center gap-2 opacity-60" aria-hidden="true">
        <div className="w-px h-16 bg-gradient-to-b from-sky-400/60 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.35em] text-sky-200/70 mt-4" style={{ writingMode: "vertical-lr" }}>Scroll</span>
      </div>
    </section>
  );
}
