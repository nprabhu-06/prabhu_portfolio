import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, techMarquee } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* chips are always visible — animation only adds a nice entrance */
function SkillChip({ label }) {
  return (
    <span
      className="skill-chip inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium cursor-default transition-all duration-250"
      style={{
        background:   "rgba(255,255,255,0.05)",
        borderColor:  "rgba(255,255,255,0.10)",
        color:        "#d4d4d8",  /* zinc-300 — always visible */
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#facc15";
        e.currentTarget.style.color       = "#facc15";
        e.currentTarget.style.background  = "rgba(250,204,21,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
        e.currentTarget.style.color       = "#d4d4d8";
        e.currentTarget.style.background  = "rgba(255,255,255,0.05)";
      }}
    >
      {label}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll(".skill-card");

      cards.forEach((card, i) => {
        /* --- card slide-in --- */
        gsap.fromTo(
          card,
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            immediateRender: false,
            delay: i * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );

        /* --- chips stagger inside each card --- */
        const chips = card.querySelectorAll(".skill-chip");
        if (chips.length) {
          gsap.fromTo(
            chips,
            { opacity: 0, y: 14, scale: 0.92 },
            {
              opacity: 1, y: 0, scale: 1,
              stagger: 0.035,
              duration: 0.45,
              ease: "back.out(1.4)",
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    /* safety: force visibility after 2 s in case ScrollTrigger never fires */
    const timer = setTimeout(() => {
      document.querySelectorAll(".skill-chip, .skill-card").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 2000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#09090b" }}
      aria-label="Skills section"
    >
      <div className="noise-overlay opacity-20" aria-hidden="true" />

      {/* Amber ambient glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[360px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(244,196,0,0.10) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="skill-card rounded-2xl p-6 border transition-all duration-300 hover:border-yellow-400/25 hover:shadow-[0_0_30px_rgba(250,204,21,0.06)]"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-yellow-400/80 text-xs font-bold uppercase tracking-[0.22em] mb-4">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech marquee */}
      <div className="mt-16 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #09090b, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #09090b, transparent)" }}
        />
        <div className="flex marquee-left" aria-hidden="true">
          {[...techMarquee, ...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={i}
              className="flex-shrink-0 mx-8 text-sm font-semibold text-white/20 whitespace-nowrap"
            >
              {tech} <span className="text-yellow-400/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
