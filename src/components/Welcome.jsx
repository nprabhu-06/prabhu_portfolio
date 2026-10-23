import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { credentials, featuredAchievements } from "../data";

gsap.registerPlugin(ScrollTrigger);

const row1 = credentials.slice(0, 4);
const row2 = credentials.slice(4);

function CredentialCard({ item }) {
  return (
    <div
      className="flex-shrink-0 w-64 md:w-72 glass border border-white/10 rounded-2xl p-5 mx-3 hover:translate-y-[-4px] hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300"
      style={{ willChange: "transform" }}
    >
      <div className="text-3xl mb-3">{item.icon}</div>
      <h3 className="font-bold text-white text-sm leading-tight mb-1">{item.title}</h3>
      {item.event && <p className="text-yellow-400/80 text-xs font-medium">{item.event}</p>}
      {item.org   && <p className="text-white/40 text-xs mt-0.5">{item.org}</p>}
      <span className={`inline-block mt-3 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-semibold ${
        item.type === "achievement" ? "bg-yellow-400/20 text-yellow-400" : "bg-blue-400/20 text-blue-400"
      }`}>
        {item.type}
      </span>
    </div>
  );
}

export default function Welcome() {
  const sectionRef  = useRef(null);
  const screen1Ref  = useRef(null);
  const imgRef      = useRef(null);
  const bigTextRef  = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Screen 1: avatar scale + welcome text */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: screen1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      const isMobile = window.innerWidth < 768;
      tl.to(imgRef.current, { scale: isMobile ? 2.8 : 3.8, ease: "none", transformOrigin: "top center" }, 0);
      tl.to(bigTextRef.current, { opacity: 0.15, ease: "none" }, 0);
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="welcome" className="relative z-10" aria-label="Welcome section">

      {/* ── Screen 1: cinematic avatar scale-up ── */}
      <div
        ref={screen1Ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8f8f6 100%)" }}
      >
        <div className="noise-overlay" aria-hidden="true" />

        {/* WELCOME bg text */}
        <div ref={bigTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <span
            className="font-black uppercase text-zinc-900 select-none opacity-0"
            style={{ fontSize: "28vw", letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            WELCOME
          </span>
        </div>

        {/* Scaled avatar */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            ref={imgRef}
            src="/images/avatar.png"
            alt="Prabhu Kiran Nakka avatar"
            className="w-48 md:w-64 object-contain drop-shadow-2xl"
            style={{ transformOrigin: "top center", willChange: "transform" }}
            loading="lazy"
            draggable={false}
          />
          <p ref={subtitleRef} className="mt-6 text-lg md:text-2xl font-semibold tracking-wide text-zinc-500 opacity-0">
            To my creative space
          </p>
        </div>
      </div>

      {/* ── Screen 2: Achievements & Certifications ── */}
      <div id="achievements" className="relative min-h-screen py-24 overflow-hidden" style={{ background: "#09090b" }}>
        <div className="noise-overlay opacity-20" aria-hidden="true" />

        {/* Header */}
        <div className="text-center mb-10 px-6" data-aos="fade-up">
          <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Proof of Work
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            Achievements &amp; Certifications
          </h2>
          <p className="text-white/40 mt-4 text-lg">Recognition and credentials</p>
        </div>

        {/* ── Featured achievement cards ── */}
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {featuredAchievements.map((ach) => (
            <div
              key={ach.id}
              className="relative overflow-hidden rounded-2xl p-7 border border-yellow-400/30"
              style={{
                background: "rgba(250,204,21,0.05)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 40px rgba(250,204,21,0.12)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                aria-hidden="true"
                style={{ background: "radial-gradient(circle, rgba(250,204,21,0.25), transparent)", filter: "blur(20px)" }}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{ach.icon}</div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 mb-3">
                  {ach.title}
                </span>
                <h3 className="font-bold text-white text-xl leading-tight mb-1">{ach.subtitle}</h3>
                <p className="text-yellow-400/80 text-sm font-medium">{ach.event}</p>
                <p className="text-white/40 text-xs mt-0.5">{ach.org}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Marquee Row 1 (left) ── */}
        <div className="relative mb-6 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #09090b, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #09090b, transparent)" }} />
          <div className="flex marquee-left" aria-label="Certifications row 1">
            {[...row1, ...row1].map((item, i) => (
              <CredentialCard key={`r1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* ── Marquee Row 2 (right) ── */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #09090b, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #09090b, transparent)" }} />
          <div className="flex marquee-right" aria-label="Certifications row 2">
            {[...row2, ...row2].map((item, i) => (
              <CredentialCard key={`r2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
