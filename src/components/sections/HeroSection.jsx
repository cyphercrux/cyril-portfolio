import React from "react";
import { siteConfig } from "../../config/site";
import SelectionReveal from "../../animations/SelectionReveal";
import { ArrowDown, Mail, MapPin, Zap, Shield, Cpu, ExternalLink } from "lucide-react";

/**
 * PAGE 1: HERO SECTION
 * High-impact minimal editorial introduction with multi-cursor selection reveals.
 */
export default function HeroSection({ onNavigate }) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center border-b border-[#222226] overflow-hidden"
    >
      {/* Subtle background technical grid line */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a1f 1px, transparent 1px), linear-gradient(to bottom, #1a1a1f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        {/* Top Status & Availability Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <SelectionReveal id="hero-badge-status" outlineColor="lime" delay={100}>
            <div className="pill pill-lime">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              <span>{siteConfig.availability}</span>
            </div>
          </SelectionReveal>

          <SelectionReveal id="hero-badge-location" outlineColor="purple" delay={200}>
            <div className="pill pill-purple">
              <MapPin className="w-3.5 h-3.5" />
              <span>{siteConfig.location}</span>
            </div>
          </SelectionReveal>
        </div>

        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typography & Manifesto */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Main Name Heading with Selection Box Reveal */}
            <SelectionReveal id="hero-name" outlineColor="lime" delay={300}>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-8xl tracking-tight text-[#F5F5F5] mb-4 uppercase leading-[0.95]">
                HI, I'M <span className="text-[#C6FF00]">CYRIL WILLIAM.</span>
              </h1>
            </SelectionReveal>

            {/* Subtitle with Selection Box Reveal */}
            <SelectionReveal id="hero-subtitle" outlineColor="purple" delay={500}>
              <p className="font-heading text-lg sm:text-xl md:text-2xl text-[#A1A1AA] font-medium tracking-tight mb-6 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[#A855F7] inline-block" />
                <span>{siteConfig.tagline}</span>
              </p>
            </SelectionReveal>

            {/* Editorial Introduction Paragraph */}
            <SelectionReveal id="hero-intro" outlineColor="lime" delay={700}>
              <div className="max-w-2xl text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-10 pl-4 border-l-2 border-[#292929] hover:border-[#C6FF00] transition-colors">
                <p>{siteConfig.bio}</p>
              </div>
            </SelectionReveal>

            {/* Call to Action Buttons */}
            <SelectionReveal id="hero-cta" outlineColor="lime" delay={900}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("projects", "#projects");
                  }}
                  className="btn btn-primary"
                >
                  <span>Explore Work</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("contact", "#contact");
                  }}
                  className="btn btn-secondary"
                >
                  <Mail className="w-4 h-4 text-[#A855F7]" />
                  <span>Contact Me</span>
                </a>

                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-xs"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#71717A]" />
                </a>
              </div>
            </SelectionReveal>
          </div>

          {/* Right Column: Cyril's Authentic Photograph with Technical HUD Border */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <SelectionReveal id="hero-portrait" outlineColor="purple" delay={600}>
              <div className="relative group max-w-[320px] sm:max-w-[360px] w-full">
                {/* Tech Reticle Corners */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C6FF00] z-20" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#A855F7] z-20" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#A855F7] z-20" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C6FF00] z-20" />

                {/* Portrait Card */}
                <div className="relative overflow-hidden rounded-lg bg-[#121214] border border-[#292929] shadow-2xl">
                  <img
                    src={siteConfig.images.hero}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = siteConfig.images.heroFallback;
                    }}
                    alt="Cyril William — Electrical Engineering Student"
                    className="w-full h-[400px] object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Dark Gradient Overlay for Editorial Mood */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                  {/* Metadata Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded bg-[#0a0a0c]/90 backdrop-blur-md border border-[#222226] flex items-center justify-between">
                    <div>
                      <p className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">
                        Cyril William
                      </p>
                      <p className="font-mono text-[10px] text-[#A1A1AA]">
                        FCRIT, University of Mumbai
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#C6FF00]" />
                  </div>
                </div>
              </div>
            </SelectionReveal>
          </div>
        </div>

        {/* Bottom Technical Spec Ticker */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1f] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <SelectionReveal id="hero-stat-1" outlineColor="lime" delay={800}>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-[#C6FF00]" />
                Primary Discipline
              </span>
              <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                Electrical Engineering
              </span>
            </div>
          </SelectionReveal>

          <SelectionReveal id="hero-stat-2" outlineColor="purple" delay={900}>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#A855F7]" />
                Specialization
              </span>
              <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                Embedded Systems &amp; IoT
              </span>
            </div>
          </SelectionReveal>

          <SelectionReveal id="hero-stat-3" outlineColor="lime" delay={1000}>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] flex items-center gap-1.5 mb-1">
                <Shield className="w-3.5 h-3.5 text-[#C6FF00]" />
                Industrial Training
              </span>
              <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                Siemens Kalwa &amp; Vivid
              </span>
            </div>
          </SelectionReveal>

          <SelectionReveal id="hero-stat-4" outlineColor="purple" delay={1100}>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
                Academic Standing
              </span>
              <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                BE Final Year (Appearing)
              </span>
            </div>
          </SelectionReveal>
        </div>
      </div>
    </section>
  );
}

