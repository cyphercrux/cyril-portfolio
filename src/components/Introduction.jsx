import React from "react";
import { siteConfig } from "../config/site";
import { Zap, Cpu, Shield, Award } from "lucide-react";

export default function Introduction() {
  return (
    <section id="about" className="section-padding border-b border-[#1f1f24] bg-[#070709] relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Authentic Portrait with Cyber HUD Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-[340px] w-full group">
              {/* Corner Reticles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C6FF00] z-20" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#A855F7] z-20" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#A855F7] z-20" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C6FF00] z-20" />

              <div className="overflow-hidden rounded-lg bg-[#121215] border border-[#26262e] shadow-2xl relative">
                <img
                  src={siteConfig.images.hero}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = siteConfig.images.heroFallback;
                  }}
                  alt="Cyril William — Electrical Engineering Student"
                  className="w-full h-[420px] object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-[#0a0a0c]/90 backdrop-blur-md border border-[#222226] flex items-center justify-between">
                  <div>
                    <p className="font-heading text-xs font-bold text-[#F5F5F5] uppercase">
                      Cyril William
                    </p>
                    <p className="font-mono text-[10px] text-[#A1A1AA]">
                      FCRIT, University of Mumbai
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C6FF00] animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Introduction Text */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="pill pill-lime self-start mb-4">
              <span>01 // BACKGROUND &amp; VISION</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-[#F5F5F5] uppercase tracking-tight mb-6 leading-tight">
              COMBINING HARDWARE WITH <span className="text-[#C6FF00]">INTELLIGENT SYSTEMS.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed mb-6">
              {siteConfig.extendedBio}
            </p>

            <p className="text-sm text-[#71717A] leading-relaxed mb-8">
              Whether conducting high-potential safety tests on industrial electrical panels at Siemens or training Decision Tree machine learning models for EV battery anomaly telemetry, I approach engineering with methodical discipline and physical curiosity.
            </p>

            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1e1e24]">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-[#71717A] uppercase mb-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#C6FF00]" />
                  Discipline
                </span>
                <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                  Electrical Engineering
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-[#71717A] uppercase mb-1 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-[#A855F7]" />
                  Focus
                </span>
                <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                  Embedded IoT &amp; EV
                </span>
              </div>

              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="font-mono text-[11px] text-[#71717A] uppercase mb-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#C6FF00]" />
                  Internships
                </span>
                <span className="font-heading font-semibold text-sm text-[#F5F5F5]">
                  Siemens &amp; Vivid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
