import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ProjectGallery from "./components/sections/ProjectGallery";
import ContactSection from "./components/sections/ContactSection";
import SwarmFinale from "./components/sections/SwarmFinale";
import Footer from "./components/Footer";
import AgentManager from "./animations/AgentManager";

/**
 * CYRIL WILLIAM — PREMIUM INTERACTIVE PORTFOLIO
 * Main Application Shell integrating:
 * - 4 Primary Sections (Home, About Me, Projects, Contact)
 * - Multi-Cursor Autonomous Agent Engine
 * - Fish-School Boids Swarm Finale
 * - Strict Color Identity: 65% Black, 20% Lime Green, 15% Purple
 */
export default function App() {
  const [activePage, setActivePage] = useState("home");

  // ScrollSpy to keep navigation highlight synced with viewport
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "about", "projects", "contact"].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    const sections = ["home", "about", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePage(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-70px 0px -40% 0px",
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  const handleNavigate = (pageId, href) => {
    setActivePage(pageId);
    window.history.pushState(null, "", href);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#C6FF00] selection:text-[#050505]">
      {/* Signature Multi-Cursor Agent System Overlay */}
      <AgentManager />

      {/* Global Minimal Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* PAGE 1: HOME */}
        <HeroSection onNavigate={handleNavigate} />

        {/* PAGE 2: ABOUT ME */}
        <AboutSection />

        {/* PAGE 3: PROJECTS */}
        <ProjectGallery />

        {/* PAGE 4: CONTACT */}
        <ContactSection />

        {/* SIGNATURE CLIMAX: SWARM FINALE */}
        <SwarmFinale onNavigate={handleNavigate} />
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

