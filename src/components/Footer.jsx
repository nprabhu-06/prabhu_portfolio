import { FiLinkedin, FiGithub, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { personal, navLinks } from "../data";

const socials = [
  { icon: FiLinkedin,   label: "LinkedIn",  href: personal.linkedin                        },
  { icon: FiGithub,     label: "GitHub",    href: personal.github                          },
  { icon: FaWhatsapp,   label: "WhatsApp",  href: `https://wa.me/${personal.whatsapp}`     },
  { icon: FiMail,       label: "Email",     href: `mailto:${personal.email}`               },
];

const marqueeWords = [
  "Full Stack Developer",   "·",
  "AI/ML Builder",          "·",
  "React",                  "·",
  "FastAPI",                "·",
  "Problem Solver",         "·",
  "Hackathon Enthusiast",   "·",
  "VNR VJIET",              "·",
  "Python",                 "·",
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 overflow-hidden"
      style={{ background: "#facc15" }}
      aria-label="Footer"
    >
      {/* ── Marquee band ── */}
      <div className="relative overflow-hidden py-5 border-b-2 border-yellow-500/40">
        <div className="flex footer-marquee-left whitespace-nowrap" aria-hidden="true">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex-shrink-0 mx-6 text-zinc-950 font-black uppercase text-sm tracking-wider">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollTo("#hero")}
              className="font-black text-3xl text-zinc-950 tracking-tighter w-fit"
              style={{ letterSpacing: "-0.04em" }}
              aria-label="Back to top"
            >
              Prabhu <span className="text-zinc-600">Kiran</span>
            </button>
            <p className="text-zinc-700 text-sm leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
            <div className="flex gap-3" role="list" aria-label="Social links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-950/10 border border-zinc-900/15 text-zinc-800 hover:bg-zinc-950 hover:text-yellow-400 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-bold text-xs uppercase tracking-widest text-zinc-600 mb-5">Navigation</p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-sm font-semibold text-zinc-800 hover:text-zinc-950 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={personal.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-800 hover:text-zinc-950 transition-colors duration-200"
                  >
                    Resume <FiArrowUpRight size={12} />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <p className="font-bold text-xs uppercase tracking-widest text-zinc-600 mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${personal.email}`} className="text-sm font-semibold text-zinc-800 hover:text-zinc-950 transition-colors duration-200">
                {personal.email}
              </a>
              <a href={`https://wa.me/${personal.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold text-zinc-800 hover:text-zinc-950 transition-colors duration-200">
                {personal.phone}
              </a>
              <p className="text-sm text-zinc-600">Hyderabad, India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-8 border-t border-zinc-900/15">
          <p className="text-xs text-zinc-600">© 2026 Prabhu Kiran. All rights reserved.</p>
          <p className="text-xs text-zinc-600">Built with React · Vite · GSAP · Lenis</p>
        </div>
      </div>
    </footer>
  );
}
