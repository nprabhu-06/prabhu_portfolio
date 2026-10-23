import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, leadership } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.4, ease: "power2.out", immediateRender: false,
            scrollTrigger: { trigger: lineRef.current, start: "top 80%", once: true } }
        );
      }
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 87%", once: true } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#f7f6f2" }}
      aria-label="Experience section"
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.15'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-yellow-600 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Work History</p>
          <h2 className="font-black uppercase text-zinc-950 tracking-tighter text-4xl md:text-6xl leading-none">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 hidden md:block"
            style={{ left: "50%", transform: "translateX(-50%)", width: 2, background: "linear-gradient(to bottom, #facc15, rgba(250,204,21,0.1))" }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-14">
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Dot on timeline */}
                <div
                  className="absolute hidden md:flex items-center justify-center"
                  style={{
                    left: "50%", top: "28px",
                    transform: "translate(-50%, -50%)",
                    width: 14, height: 14, borderRadius: "50%",
                    background: "#facc15",
                    border: "3px solid #f7f6f2",
                    zIndex: 2,
                    boxShadow: "0 0 12px rgba(250,204,21,0.5)",
                  }}
                  aria-hidden="true"
                />

                {/* Card */}
                <div
                  className="w-full md:w-[calc(50%-2rem)] rounded-2xl p-6 bg-white border border-zinc-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {exp.type}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">{exp.period}</span>
                  </div>

                  <h3 className="font-black text-zinc-950 text-base leading-tight mb-1">{exp.role}</h3>
                  <p className="text-yellow-600 text-sm font-semibold">{exp.company}</p>
                  {exp.org && <p className="text-zinc-400 text-xs mt-0.5">{exp.org}</p>}
                  <p className="text-zinc-600 text-sm leading-relaxed mt-3">{exp.description}</p>

                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Leadership ── */}
        <div className="mt-20">
          <p className="text-yellow-600 text-sm font-semibold tracking-[0.3em] uppercase mb-6">Leadership &amp; Community</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leadership.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-black text-zinc-950 text-sm">{item.role}</p>
                  <p className="text-yellow-600 text-sm font-medium">{item.org}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
