import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ITEM_COUNT = capabilities.length;
const ANGLE_STEP = 360 / ITEM_COUNT;

/* ── 3D Carousel Card ── */
function CarouselCard({ cap, isActive, angle, onClick }) {
  const rad   = angle * (Math.PI / 180);
  const rx    = Math.sin(rad) * 260;
  const rz    = -Math.cos(rad) * 260;
  const scale = isActive ? 1.12 : 0.78 + 0.12 * Math.abs(Math.cos(rad));
  const opacity = 0.3 + 0.7 * Math.max(0, Math.cos(rad));
  const z     = isActive ? 10 : Math.round(opacity * 6);

  return (
    <div
      className="absolute w-48 md:w-56 cursor-pointer transition-all duration-700"
      style={{
        transform: `translateX(${rx}px) translateZ(${rz}px) scale(${scale})`,
        opacity,
        zIndex: z,
        left: "50%",
        top: "50%",
        marginLeft: "-7rem",
        marginTop: "-8.5rem",
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={cap.title}
      aria-pressed={isActive}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div
        className="rounded-2xl p-6 flex flex-col items-center text-center border transition-all duration-500"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${cap.color}22, rgba(0,0,0,0.8))`
            : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          border: isActive ? `1px solid ${cap.color}55` : "1px solid rgba(255,255,255,0.06)",
          boxShadow: isActive ? `0 0 40px ${cap.color}30, 0 8px 32px rgba(0,0,0,0.5)` : "none",
        }}
      >
        <div className="text-4xl mb-3">{cap.icon}</div>
        <p
          className="text-xs font-black uppercase tracking-widest mb-2"
          style={{ color: isActive ? cap.color : "rgba(255,255,255,0.3)" }}
        >
          {cap.tag}
        </p>
        <h3 className="font-bold text-sm text-white leading-tight mb-2">{cap.title}</h3>
        {isActive && (
          <p className="text-xs text-white/50 leading-relaxed mt-1">{cap.description}</p>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef   = useRef(null);
  const carouselRef  = useRef(null);
  const headerRef    = useRef(null);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [rotation,   setRotation]   = useState(0);

  /* ── GSAP reveal ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const kids = headerRef.current ? Array.from(headerRef.current.children) : [];
      if (kids.length) {
        gsap.fromTo(
          kids,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true } }
        );
      }
      gsap.fromTo(
        carouselRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: carouselRef.current, start: "top 82%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Auto-rotate ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % ITEM_COUNT;
        setRotation((r) => r - ANGLE_STEP);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (idx) => {
    const diff = idx - activeIdx;
    setActiveIdx(idx);
    setRotation((r) => r - diff * ANGLE_STEP);
  };

  const getAngle = (i) => rotation + i * ANGLE_STEP;

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#09090b" }}
      aria-label="Capabilities section"
    >
      <div className="noise-overlay opacity-20" aria-hidden="true" />
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(244,196,0,0.08) 0%, transparent 60%)", filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 flex flex-col gap-3">
          <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase">What I Do</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            Capabilities
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            The technical skills I apply to build real-world systems
          </p>
        </div>

        {/* ── 3D Carousel ── */}
        <div
          ref={carouselRef}
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: 640, height: 340, perspective: "900px" }}
          aria-live="polite"
        >
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {capabilities.map((cap, i) => (
              <CarouselCard
                key={cap.id}
                cap={cap}
                isActive={i === activeIdx}
                angle={getAngle(i)}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>
        </div>

        {/* ── Dot nav ── */}
        <div className="flex justify-center gap-2 mt-8" role="group" aria-label="Capability selector">
          {capabilities.map((cap, i) => (
            <button
              key={cap.id}
              onClick={() => handleSelect(i)}
              aria-label={cap.title}
              aria-pressed={i === activeIdx}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === activeIdx ? "#facc15" : "rgba(255,255,255,0.2)",
                transform: i === activeIdx ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* ── Mobile list fallback (visible < md) ── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden" aria-label="Capabilities list">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="flex items-start gap-4 p-5 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-2xl">{cap.icon}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1">{cap.tag}</p>
                <h3 className="font-bold text-white text-sm mb-1">{cap.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
