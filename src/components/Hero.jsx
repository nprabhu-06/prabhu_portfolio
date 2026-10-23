import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiLinkedin, FiGithub, FiMail, FiExternalLink } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { personal, rollingWords } from "../data";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: FiLinkedin, label: "LinkedIn",  href: personal.linkedin,                     color: "#0a66c2", glow: "0 0 20px rgba(10,102,194,0.6)"  },
  { icon: FiGithub,   label: "GitHub",    href: personal.github,                       color: "#fff",    glow: "0 0 20px rgba(255,255,255,0.4)" },
  { icon: FaWhatsapp, label: "WhatsApp",  href: `https://wa.me/${personal.whatsapp}`,  color: "#25d366", glow: "0 0 20px rgba(37,211,102,0.6)"  },
  { icon: FiMail,     label: "Email",     href: `mailto:${personal.email}`,            color: "#ea4335", glow: "0 0 20px rgba(234,67,53,0.6)"   },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const imgRef     = useRef(null);
  const [wordIdx,   setWordIdx]   = useState(0);
  const [animating, setAnimating] = useState(false);

  /* ── Rolling words ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % rollingWords.length);
        setAnimating(false);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  /* ── ScrollTrigger parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(textRef.current, { y: -50 * p, opacity: 1 - p * 1.5 });
          gsap.set(imgRef.current,  { y: 100 * p });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-screen bg-white flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-24">

        {/* ── Left: Text ── */}
        <div ref={textRef} className="flex flex-col gap-6" style={{ willChange: "transform, opacity" }}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-zinc-400">
            {personal.subtitle}
          </p>

          {/* Title */}
          <div className="leading-none">
            <p className="text-zinc-400 font-bold uppercase text-3xl md:text-4xl tracking-tight">
              Hello, I'm
            </p>
            <h1
              className="font-black uppercase text-zinc-950 tracking-tighter"
              style={{ fontSize: "clamp(3.5rem, 8.5vw, 8rem)", lineHeight: 0.95 }}
            >
              Prabhu Kiran
            </h1>
          </div>

          {/* Rolling word */}
          <div
            className="inline-flex items-center gap-3 bg-zinc-950 text-white px-5 py-2.5 rounded-full font-semibold text-sm md:text-base w-fit"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span
              className="transition-all duration-300"
              style={{
                opacity:   animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
              }}
            >
              {rollingWords[wordIdx]}
            </span>
          </div>

          {/* Description */}
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-md">
            {personal.description}
          </p>

          {/* Socials */}
          <div className="flex flex-wrap gap-3 mt-1" role="list" aria-label="Social links">
            {socials.map(({ icon: Icon, label, href, color, glow }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                role="listitem"
                aria-label={label}
                className="group flex items-center justify-center w-11 h-11 rounded-full border border-zinc-200 bg-white transition-all duration-300 hover:scale-110"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background   = color;
                  e.currentTarget.style.boxShadow    = glow;
                  e.currentTarget.style.borderColor  = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background   = "#fff";
                  e.currentTarget.style.boxShadow    = "none";
                  e.currentTarget.style.borderColor  = "#e4e4e7";
                }}
              >
                <Icon size={18} className="text-zinc-600 transition-colors duration-300 group-hover:text-white" />
              </a>
            ))}

            {/* Resume button — opens in new tab */}
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-sky-400 bg-sky-400 text-slate-950 font-bold text-sm transition-all duration-300 hover:bg-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105"
            >
              <FiExternalLink size={15} /> View Resume
            </a>
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div ref={imgRef} className="flex justify-center items-center" style={{ willChange: "transform" }}>
          <div className="relative group">
            {/* Ambient decorative glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-400/20 via-blue-600/10 to-transparent blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/images/portfolio.png"
              alt="Prabhu Kiran"
              className="relative w-full max-w-sm md:max-w-md object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-zinc-200/80 transition-transform duration-500 group-hover:scale-[1.01]"
              style={{ maxHeight: "480px" }}
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>
    </section>
  );
}
