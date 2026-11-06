import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/site";
import { Droplets, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar({ activeSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/85 backdrop-blur-md border-b border-[#1f1f24] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("#hero");
          }}
          className="flex items-center gap-2.5 text-decoration-none group cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-[#121214] border border-[#28282e] group-hover:border-[#C6FF00] flex items-center justify-center font-display text-sm tracking-wider text-[#C6FF00] transition-colors">
            CW
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wider text-[#F5F5F5] group-hover:text-[#C6FF00] transition-colors uppercase">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-mono text-[#A1A1AA] tracking-tight">
              LIQUID METAL EDITION
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0e0e11]/90 border border-[#222228] backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.href);
              }}
              className={`px-4 py-1.5 text-xs font-mono font-medium tracking-wide uppercase rounded-full transition-all duration-200 ${
                activeSection === link.href.replace("#", "")
                  ? "bg-[#C6FF00] text-[#050505] font-bold shadow-[0_0_15px_rgba(198,255,0,0.25)]"
                  : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#18181e]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Shader Mode Pill & Contact CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/30 shadow-[0_0_12px_rgba(198,255,0,0.15)]">
            <Droplets className="w-3.5 h-3.5 animate-pulse" />
            <span>WEBGL LIQUID SHADER</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#contact");
            }}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-heading font-semibold bg-[#7C3AED]/15 text-[#A855F7] border border-[#7C3AED]/40 hover:bg-[#7C3AED] hover:text-white transition-all"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded text-[#A1A1AA] hover:text-[#F5F5F5] bg-[#121214] border border-[#28282e]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 px-4 py-4 bg-[#0a0a0c] border-b border-[#222226] flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                onNavigate(link.href);
              }}
              className="px-4 py-2.5 text-sm font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-[#C6FF00]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
