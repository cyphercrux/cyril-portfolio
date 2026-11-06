import React, { useState, useEffect } from "react";
import LiquidMetalCanvas from "./LiquidMetalCanvas";
import { siteConfig } from "../config/site";
import { ArrowDown, Mail, Sparkles, MapPin } from "lucide-react";

/**
 * CINEMATIC LIQUID METAL HERO
 * Seamlessly integrates Cyril's Three.js domain-warping fluid WebGL shader with
 * high-impact display typography and interactive pointer turbulence.
 */
export default function Hero({ onNavigate }) {
  const roles = [
    "Electrical Engineering Student",
    "Embedded Systems Developer",
    "IoT & Automation Enthusiast",
    "EV Battery Telemetry Researcher",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFull.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFull.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentFull.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Real-time WebGL Liquid Metal Canvas */}
      <LiquidMetalCanvas />

      {/* Foreground Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl">
          {/* Availability & Location Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <div className="pill pill-lime">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              <span>{siteConfig.availability}</span>
            </div>

            <div className="pill pill-purple">
              <MapPin className="w-3.5 h-3.5" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#F5F5F5] uppercase leading-[0.95] mb-4">
            HI, I'M <span className="text-[#C6FF00]">CYRIL WILLIAM.</span>
          </h1>

          {/* Dynamic Role Typewriter */}
          <div className="h-8 mb-6 flex items-center">
            <p className="font-heading text-lg sm:text-2xl text-[#A1A1AA] font-medium tracking-tight flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#A855F7]" />
              <span className="text-[#F5F5F5] font-semibold">{displayText}</span>
              <span className="w-2 h-5 bg-[#C6FF00] animate-pulse" />
            </p>
          </div>

          {/* Verified Biography */}
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-10 max-w-2xl pl-4 border-l-2 border-[#292929] hover:border-[#C6FF00] transition-colors backdrop-blur-[2px]">
            {siteConfig.bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("#work");
              }}
              className="btn btn-primary"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("#contact");
              }}
              className="btn btn-secondary"
            >
              <Mail className="w-4 h-4 text-[#A855F7]" />
              <span>Contact Cyril</span>
            </a>
          </div>

          {/* Interactive Hint */}
          <div className="mt-14 flex items-center gap-2 text-xs font-mono text-[#71717A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>Interactive WebGL Surface: Drag or hover your cursor to create fluid ripples</span>
          </div>
        </div>
      </div>
    </section>
  );
}
