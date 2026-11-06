import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "work", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (href) => {
    const id = href.replace("#", "");
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#C6FF00] selection:text-[#050505]">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="relative z-10 flex flex-col">
        <Hero onNavigate={handleNavigate} />
        <Introduction />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
