import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink, FiDownload } from "react-icons/fi";
import { personal } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#09090b" }}
      aria-label="Resume section"
    >
      <div className="noise-overlay opacity-20" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 65%)", filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sky-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Resume</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">My Resume</h2>
          <p className="text-white/50 mt-2 text-lg">B.Tech CSE · Full Stack &amp; AI Developer</p>
        </div>

        {/* Clean Glass Resume Card — No clunky embedded PDF browser plugin */}
        <div
          ref={cardRef}
          className="glass border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "rgba(13, 20, 36, 0.7)",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.7), 0 0 40px rgba(56,189,248,0.08)",
          }}
        >
          {/* Subtle background glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border border-sky-400/30 flex-shrink-0"
                style={{ background: "rgba(56, 189, 248, 0.1)" }}
              >
                📄
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Official Resume
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white">{personal.name}</h3>
                <p className="text-white/60 text-sm mt-0.5">{personal.subtitle} · Hyderabad, India</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-400 text-slate-950 font-bold text-sm hover:bg-sky-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-105 flex-1 md:flex-initial"
              >
                <FiExternalLink size={16} /> View Resume
              </a>
              <a
                href={personal.resume}
                download="Prabhu_Kiran_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex-1 md:flex-initial"
              >
                <FiDownload size={16} /> Download PDF
              </a>
            </div>
          </div>

          {/* Snapshot details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">Education</p>
              <p className="font-semibold text-white text-sm">B.Tech in CSE</p>
              <p className="text-white/50 text-xs mt-0.5">VNR VJIET (2024–2028) · CGPA 9.07</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">Primary Stack</p>
              <p className="font-semibold text-white text-sm">Full Stack + AI/ML</p>
              <p className="text-white/50 text-xs mt-0.5">React, FastAPI, Node.js, Python</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">Specializations</p>
              <p className="font-semibold text-white text-sm">Real-World AI Systems</p>
              <p className="text-white/50 text-xs mt-0.5">Healthcare, Decision Support, NLP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
