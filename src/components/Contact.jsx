import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiLinkedin, FiGithub, FiMail, FiDownload } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { personal } from "../data";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: FaWhatsapp,   label: "WhatsApp",  href: `https://wa.me/${personal.whatsapp}`,  color: "#25d366" },
  { icon: FiLinkedin,   label: "LinkedIn",  href: personal.linkedin,                     color: "#0a66c2" },
  { icon: FiGithub,     label: "GitHub",    href: personal.github,                       color: "#fff"    },
  { icon: FiMail,       label: "Email",     href: `mailto:${personal.email}`,            color: "#ea4335" },
];

function buildWhatsAppMsg(name, email, message) {
  return encodeURIComponent(
    `Hello Prabhu! 👋\n\n` +
    `I came across your portfolio and would like to connect.\n\n` +
    `👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const formRef    = useRef(null);

  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent,   setSent]   = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftKids = leftRef.current ? Array.from(leftRef.current.children) : [];
      if (leftKids.length) {
        gsap.fromTo(
          leftKids,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: leftRef.current, start: "top 82%", once: true } }
        );
      }
      gsap.fromTo(
        formRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: formRef.current, start: "top 82%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const msg = buildWhatsAppMsg(form.name, form.email, form.message);
    window.open(`https://wa.me/${personal.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
    },
  });

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-white bg-zinc-900/80 border border-white/10 focus:outline-none focus:border-yellow-400/50 placeholder-white/20 transition-colors duration-200";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 py-24 overflow-hidden"
      style={{ background: "#09090b" }}
      aria-label="Contact section"
    >
      <div className="noise-overlay opacity-20" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(244,196,0,0.07) 0%, transparent 65%)", filter: "blur(120px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Get in Touch</p>
          <h2 className="font-black uppercase text-white tracking-tighter text-4xl md:text-6xl leading-none">
            Let's Talk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ── Left: info ── */}
          <div ref={leftRef} className="flex flex-col gap-6">
            <p className="text-white/60 text-base leading-relaxed">
              Have a project, a question, or just want to say hello? Fill in the form and I'll get back to you on WhatsApp.
            </p>

            {/* Email */}
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 text-sm text-white/60 hover:text-yellow-400 transition-colors duration-200 group"
            >
              <FiMail size={18} className="text-yellow-400" />
              <span>{personal.email}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${personal.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaWhatsapp size={18} className="text-yellow-400" />
              <span>{personal.phone}</span>
            </a>

            {/* Resume link */}
            <a
              href={personal.resume}
              download
              className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full bg-zinc-800 border border-white/10 text-sm font-semibold text-white hover:bg-zinc-700 hover:border-white/20 transition-all duration-200"
            >
              <FiDownload size={14} /> Download Resume
            </a>

            {/* Social icons */}
            <div className="flex gap-3 flex-wrap" role="list" aria-label="Social links">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={label}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/50 transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background   = color;
                    e.currentTarget.style.color        = "#fff";
                    e.currentTarget.style.borderColor  = color;
                    e.currentTarget.style.boxShadow    = `0 0 16px ${color}60`;
                    e.currentTarget.style.transform    = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background   = "";
                    e.currentTarget.style.color        = "";
                    e.currentTarget.style.borderColor  = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow    = "";
                    e.currentTarget.style.transform    = "";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <div ref={formRef}>
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border border-green-400/20 text-center"
                style={{ background: "rgba(34,197,94,0.05)", minHeight: 360 }}>
                <span className="text-5xl">✅</span>
                <h3 className="font-bold text-white text-xl">Message sent!</h3>
                <p className="text-white/50 text-sm">Your WhatsApp message has been queued. I'll reply within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 p-7 rounded-2xl border border-white/8"
                style={{ background: "rgba(255,255,255,0.025)" }}
                aria-label="Contact form"
              >
                {/* Name */}
                <div>
                  <input
                    {...field("name")}
                    type="text"
                    id="contact-name"
                    placeholder="Your Name *"
                    autoComplete="name"
                    className={inputCls + (errors.name ? " border-red-500" : "")}
                    aria-describedby={errors.name ? "name-err" : undefined}
                  />
                  {errors.name && <p id="name-err" className="text-xs text-red-400 mt-1 ml-1" role="alert">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...field("email")}
                    type="email"
                    id="contact-email"
                    placeholder="Your Email (optional)"
                    autoComplete="email"
                    className={inputCls + (errors.email ? " border-red-500" : "")}
                    aria-describedby={errors.email ? "email-err" : undefined}
                  />
                  {errors.email && <p id="email-err" className="text-xs text-red-400 mt-1 ml-1" role="alert">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...field("message")}
                    id="contact-message"
                    rows={5}
                    placeholder="Your Message *"
                    className={inputCls + " resize-none" + (errors.message ? " border-red-500" : "")}
                    aria-describedby={errors.message ? "msg-err" : undefined}
                  />
                  {errors.message && <p id="msg-err" className="text-xs text-red-400 mt-1 ml-1" role="alert">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-yellow-400 text-zinc-950 font-bold text-sm hover:bg-yellow-300 hover:shadow-[0_0_24px_rgba(250,204,21,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  Send via WhatsApp →
                </button>
                <p className="text-xs text-center text-white/25">Opens WhatsApp with your message pre-filled.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
