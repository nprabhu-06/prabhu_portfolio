import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiDownload } from "react-icons/fi";
import { personal, quickFacts } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef  = useRef(null);
  const imgRef      = useRef(null);
  const textRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", immediateRender: false,
          scrollTrigger: { trigger: imgRef.current, start: "top 82%", once: true } }
      );
      const kids = textRef.current ? Array.from(textRef.current.children) : [];
      if (kids.length) {
        gsap.fromTo(
          kids,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: textRef.current, start: "top 82%", once: true } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#f7f6f2" }}
      aria-label="About section"
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.15'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <p className="text-yellow-600 text-sm font-semibold tracking-[0.3em] uppercase mb-4">About Me</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* ── Left: Photo ── */}
          <div ref={imgRef} className="flex justify-center">
            <div className="relative">
              {/* Yellow glow frame */}
              <div
                className="absolute -inset-2 rounded-3xl"
                aria-hidden="true"
                style={{
                  background: "linear-gradient(135deg, rgba(250,204,21,0.4), rgba(250,204,21,0.05))",
                  filter: "blur(18px)",
                  opacity: 0.6,
                }}
              />
              <img
                src="/images/profile.jpeg"
                alt="Prabhu Kiran Nakka — profile photo"
                className="relative rounded-3xl object-cover shadow-2xl"
                style={{
                  width: "clamp(220px,30vw,340px)",
                  height: "clamp(280px,38vw,420px)",
                  objectFit: "cover",
                  objectPosition: "center top",
                  border: "4px solid rgba(250,204,21,0.3)",
                }}
                loading="lazy"
                draggable={false}
              />
              {/* CGPA badge */}
              <div
                className="absolute -bottom-4 -right-4 px-4 py-3 rounded-2xl flex flex-col items-center shadow-lg"
                style={{ background: "#facc15", minWidth: 80 }}
              >
                <span className="font-black text-xl text-zinc-950" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>9.07</span>
                <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-wider">CGPA</span>
              </div>
            </div>
          </div>

          {/* ── Right: Text ── */}
          <div ref={textRef} className="flex flex-col gap-6">
            <h2 className="font-black uppercase text-zinc-950 tracking-tighter text-4xl md:text-5xl leading-none">
              About Me
            </h2>

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
              {personal.bio}
            </p>

            {/* Quick fact chips */}
            <div className="flex flex-col gap-3">
              {quickFacts.map((fact) => (
                <div key={fact.title} className="flex items-start gap-3">
                  <span className="text-xl">{fact.icon}</span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-600">{fact.title}: </span>
                    <span className="text-sm font-semibold text-zinc-800">{fact.value}</span>
                    {fact.sub && <span className="text-sm text-zinc-500"> · {fact.sub}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Resume button — view in new tab */}
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full bg-zinc-950 text-white font-semibold text-sm hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105"
            >
              <FiDownload size={15} /> View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
