import React from "react";
import { siteConfig } from "../config/site";
import { ArrowUp, Github, Linkedin, Instagram } from "lucide-react";

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#040405] border-t border-[#1a1a1f] py-12 text-[#71717A]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#18181d]">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base text-[#F5F5F5] uppercase tracking-wider mb-1">
              {siteConfig.name}
            </span>
            <span className="text-xs font-mono text-[#A1A1AA]">
              Electrical Engineering &amp; Embedded Systems
            </span>
            <span className="text-xs font-mono text-[#52525b] mt-1">
              {siteConfig.location}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-[#0e0e11] border border-[#222226] text-[#A1A1AA] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-[#0e0e11] border border-[#222226] text-[#A1A1AA] hover:text-[#A855F7] hover:border-[#A855F7] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-[#0e0e11] border border-[#222226] text-[#A1A1AA] hover:text-[#A855F7] hover:border-[#A855F7] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <button onClick={scrollToTop} className="p-2 rounded bg-[#0e0e11] border border-[#222226] text-[#A1A1AA] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors cursor-pointer ml-2">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} Cyril William. Liquid Metal Edition.</p>
          <div className="flex items-center gap-3 text-[11px] text-[#52525b]">
            <span>WebGL 3-Layer Flow</span>
            <span>&middot;</span>
            <span>Three.js Shaders</span>
            <span>&middot;</span>
            <span>65% Noir / 20% Lime / 15% Purple</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
