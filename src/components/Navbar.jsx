import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/site";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

/**
 * EDITORIAL NAVIGATION BAR
 * Features sticky minimal header, direct section navigation,
 * and the signature interactive MOTION TOGGLE button.
 */
export default function Navbar({ activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMotionActive, setIsMotionActive] = useState(true);

  // Initialize and persist motion preference
  useEffect(() => {
    const saved = localStorage.getItem("cyril_portfolio_motion");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let active = true;
    if (saved === "off") {
      active = false;
    } else if (saved === "on") {
      active = true;
    } else if (prefersReduced) {
      active = false;
    }

    setIsMotionActive(active);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMotion = () => {
    const nextState = !isMotionActive;
    setIsMotionActive(nextState);
    localStorage.setItem("cyril_portfolio_motion", nextState ? "on" : "off");

    // Dispatch global event for AgentManager and SelectionReveal
    window.dispatchEvent(
      new CustomEvent("agent-motion-toggle", {
        detail: { active: nextState },
      })
    );
  };

  const handleNavClick = (pageId, href) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/85 backdrop-blur-md border-b border-[#222226] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home", "#home");
          }}
          className="flex items-center gap-2.5 text-decoration-none group cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-[#151515] border border-[#292929] group-hover:border-[#C6FF00] flex items-center justify-center font-display text-sm tracking-wider text-[#C6FF00] transition-colors">
            CW
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wider text-[#F5F5F5] group-hover:text-[#C6FF00] transition-colors uppercase">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-mono text-[#A1A1AA] tracking-tight">
              ELECTRICAL ENGINEER
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#101010]/90 border border-[#222226] backdrop-blur-md">
          {siteConfig.navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page, item.href)}
                className={`px-4 py-1.5 text-xs font-mono font-medium tracking-wide uppercase rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#C6FF00] text-[#050505] font-bold shadow-[0_0_15px_rgba(198,255,0,0.25)]"
                    : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1a1a1f]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Signature Motion Button & Contact CTA */}
        <div className="flex items-center gap-3">
          {/* SIGNATURE MOTION TOGGLE BUTTON */}
          <button
            onClick={toggleMotion}
            aria-pressed={isMotionActive}
            title={
              isMotionActive
                ? "Multi-cursor agent animation & swarm active (Click to disable)"
                : "Multi-cursor agent animation inactive (Click to enable)"
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-300 border cursor-pointer select-none ${
              isMotionActive
                ? "bg-[#C6FF00]/10 text-[#C6FF00] border-[#C6FF00]/40 shadow-[0_0_12px_rgba(198,255,0,0.2)]"
                : "bg-[#141416] text-[#71717A] border-[#292929] hover:text-[#A1A1AA] hover:border-[#3b3b42]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {isMotionActive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF00] opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isMotionActive ? "bg-[#C6FF00]" : "bg-[#71717A]"
                }`}
              ></span>
            </span>
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              MOTION: {isMotionActive ? "ON" : "OFF"}
            </span>
            <span className="sm:hidden">{isMotionActive ? "ON" : "OFF"}</span>
          </button>

          {/* Direct Contact Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact", "#contact");
            }}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-heading font-semibold bg-[#7C3AED]/15 text-[#A855F7] border border-[#7C3AED]/40 hover:bg-[#7C3AED] hover:text-white transition-all duration-200"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded text-[#A1A1AA] hover:text-[#F5F5F5] bg-[#121214] border border-[#292929]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 py-4 bg-[#0a0a0c] border-b border-[#222226] flex flex-col gap-2">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page, item.href)}
              className={`w-full text-left px-4 py-2.5 text-sm font-mono uppercase tracking-wider rounded transition-colors ${
                activePage === item.page
                  ? "bg-[#C6FF00] text-[#050505] font-bold"
                  : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#141418]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

