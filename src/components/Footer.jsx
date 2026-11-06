import React from "react";
import { siteConfig } from "../config/site";
import { ArrowUp, Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";

/**
 * EDITORIAL FOOTER COMPONENT
 * Minimal, clean footer with verified links, navigation, and back-to-top button.
 */
export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1f] py-12 text-[#71717A]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#1a1a1f]">
          {/* Brand & Tagline */}
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

          {/* Quick Page Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.page}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.page, item.href);
                }}
                className="hover:text-[#C6FF00] transition-colors uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-[#101012] border border-[#222226] text-[#A1A1AA] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-[#101012] border border-[#222226] text-[#A1A1AA] hover:text-[#A855F7] hover:border-[#A855F7] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded bg-[#101012] border border-[#222226] text-[#A1A1AA] hover:text-[#A855F7] hover:border-[#A855F7] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#101012] border border-[#222226] text-[#A1A1AA] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors cursor-pointer ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Palette Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} Cyril William. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-[#52525b]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#050505] border border-[#444]" />
              65% Noir
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              20% Lime
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              15% Purple
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
