import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar       from "./components/Navbar";
import Portfolio    from "./components/Portfolio";
import Hero         from "./components/Hero";
import Welcome      from "./components/Welcome";
import About        from "./components/About";
import Skills       from "./components/Skills";
import Experience   from "./components/Experience";
import Projects     from "./components/Projects";
import Services     from "./components/Services";
import Resume       from "./components/Resume";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  /* ── Lenis smooth scroll + GSAP sync ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      smoothTouch: !prefersReduced,
      touchMultiplier: 2,
    });

    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    /* Refresh after fonts/images settle so all ScrollTriggers fire correctly */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1000);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      ScrollTrigger.killAll();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Fixed yellow background layer (z-0) — Portfolio reveal sits here */}
      <Portfolio />

      {/* Navbar floats above everything */}
      <Navbar />

      {/* All content sections scroll above the fixed Portfolio */}
      <main className="relative z-10">
        {/* 100vh spacer so Portfolio is visible on initial load */}
        <div style={{ height: "100vh" }} aria-hidden="true" />

        <Hero />
        <Welcome />
        <About />
        <Skills />
        <Experience />
        {/* Welcome already contains #achievements — these sections flow after it */}
        <Projects />
        <Services />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
