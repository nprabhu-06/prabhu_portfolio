import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiInfo, FiX } from "react-icons/fi";
import { projects } from "../data";

gsap.registerPlugin(ScrollTrigger);

/* Gradient for each project */
const gradients = [
  "linear-gradient(135deg, #648c11 0%, #1a2a04 100%)",
  "linear-gradient(135deg, #dc2626 0%, #450a0a 100%)",
  "linear-gradient(135deg, #2563eb 0%, #0c1a6b 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #1e0a4a 100%)",
];

/* ── Project detail modal ── */
function Modal({ project, index, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
    gsap.from(cardRef.current,    { y: 50, opacity: 0, duration: 0.4, ease: "power3.out" });
    const keydown = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current, { y: 20, opacity: 0, duration: 0.2 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog" aria-modal="true" aria-label={project.title}
    >
      <div
        ref={cardRef}
        className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/10"
        style={{ background: "#111" }}
      >
        {/* Header gradient */}
        <div className="h-40 relative overflow-hidden flex items-center justify-center"
          style={{ background: gradients[index % gradients.length] }}>
          <span className="font-black uppercase text-white/10 select-none"
            style={{ fontSize: "5rem", letterSpacing: "-0.04em" }}>
            {project.title}
          </span>
          <button onClick={handleClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white border border-white/10 hover:bg-black/70 transition-colors"
            aria-label="Close">
            <FiX size={16} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-black text-white text-xl mb-1">{project.title}</h3>
          <p className="text-sm text-white/40 mb-4">{project.subtitle}</p>
          <p className="text-sm text-white/60 leading-relaxed mb-5">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 border border-white/10 text-white/60">
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 text-slate-950 text-sm font-bold hover:bg-sky-300 transition-all duration-200 shadow-md"
          >
            <FiGithub size={16} /> View GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      onClick={() => onOpen(project, index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project, index)}
    >
      {/* Gradient header */}
      <div
        className="h-44 relative overflow-hidden flex items-end p-5 transition-transform duration-500"
        style={{ background: gradients[index % gradients.length], transform: hovered ? "scale(1.02)" : "scale(1)" }}
      >
        {/* Big faded project number */}
        <span className="absolute top-4 right-4 font-black text-white/10 select-none"
          style={{ fontSize: "5rem", lineHeight: 1 }}>
          0{index + 1}
        </span>
        {/* Accent color bar on top */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: project.color }} />

        {/* "Explore" overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.5)", opacity: hovered ? 1 : 0 }}
        >
          <span className="text-white font-bold uppercase tracking-widest text-sm">Explore →</span>
        </div>
      </div>

      <div className="p-5" style={{ background: "#0f0f0f" }}>
        <h3 className="font-black text-white text-base leading-tight mb-1">{project.title}</h3>
        <p className="text-white/40 text-xs mb-3">{project.subtitle}</p>
        <p className="text-white/55 text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-white/5 text-white/50">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-white/5 text-white/50">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-sky-400 transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); onOpen(project, index); }}
            aria-label={`More info about ${project.title}`}
          >
            <FiInfo size={12} /> Details
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repository for ${project.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-400/30 bg-sky-400/10 text-sky-400 hover:bg-sky-400 hover:text-slate-950 font-bold text-xs transition-all duration-200 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub size={13} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);
  const [modal, setModal] = useState(null); // { project, index }

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            immediateRender: false,
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 90%", once: true } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#f7f6f2" }}
      aria-label="Projects section"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.15'/%3E%3C/svg%3E\")" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <p className="text-yellow-600 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Selected Work</p>
          <h2 className="font-black uppercase text-zinc-950 tracking-tighter text-4xl md:text-6xl leading-none">
            Projects
          </h2>
        </div>

        {/* 2-col grid on md+, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div key={project.id} ref={(el) => (cardsRef.current[i] = el)}>
              <ProjectCard
                project={project}
                index={i}
                onOpen={(p, idx) => setModal({ project: p, index: idx })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          project={modal.project}
          index={modal.index}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
