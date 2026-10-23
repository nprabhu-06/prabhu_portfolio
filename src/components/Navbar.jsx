import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import { personal, navLinks } from "../data";

export default function Navbar() {
  const navRef       = useRef(null);
  const [hidden,     setHidden]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const lastY        = useRef(0);

  /* ── Hide/show on scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current + 10 && y > 80) setHidden(true);
      else if (y < lastY.current - 6)       setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveHref("#" + visible[0].target.id);
      },
      { threshold: 0.25, rootMargin: "-10% 0px -65% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-3 left-0 right-0 z-[200] transition-all duration-300 ${
          hidden ? "-translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
        aria-label="Primary navigation"
      >
        {/* Inner pill — high-contrast dark blue glass for crystal clear visibility */}
        <div
          className="mx-3 md:mx-8 px-4 md:px-6 py-3 flex items-center justify-between rounded-2xl"
          style={{
            background:    "rgba(8, 16, 32, 0.96)",
            backdropFilter:"blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.15)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="font-black text-lg tracking-tight transition-opacity duration-200 hover:opacity-85 flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span className="text-white font-extrabold tracking-tight">Prabhu</span>
            <span style={{ color: "#38bdf8" }} className="font-extrabold tracking-tight">Kiran</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeHref === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ color: active ? "#38bdf8" : "#e2e8f0" }}
                  aria-current={active ? "true" : undefined}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background:  "rgba(56, 189, 248, 0.12)",
                        border:      "1px solid rgba(56, 189, 248, 0.35)",
                      }}
                    />
                  )}
                  <span className="relative z-10 hover:text-white transition-colors">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Resume button — opens resume directly in new tab */}
          <div className="hidden md:flex items-center">
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume in new tab"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-slate-950 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:bg-sky-300"
              style={{ background: "#38bdf8" }}
            >
              <FiExternalLink size={13} /> View Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1.5 rounded-lg transition-colors duration-200 hover:bg-white/10"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className="md:hidden fixed inset-0 z-[190] flex flex-col items-center justify-center gap-7 transition-all duration-400"
        style={{
          background:    "rgba(6, 12, 24, 0.98)",
          backdropFilter:"blur(24px)",
          opacity:        mobileOpen ? 1 : 0,
          pointerEvents:  mobileOpen ? "auto" : "none",
          transform:      mobileOpen ? "translateY(0)" : "translateY(-16px)",
        }}
        aria-hidden={!mobileOpen}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-2xl font-black uppercase tracking-wider text-slate-200 hover:text-sky-400 transition-colors duration-200"
          >
            {link.label}
          </button>
        ))}
        <a
          href={personal.resume}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-slate-950 text-sm"
          style={{ background: "#38bdf8" }}
        >
          <FiExternalLink size={14} /> View Resume
        </a>
      </div>
    </>
  );
}
