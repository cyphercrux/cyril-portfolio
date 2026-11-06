import React, { useEffect, useRef } from "react";
import { siteConfig } from "../../config/site";
import SelectionReveal from "../../animations/SelectionReveal";
import { Sparkles, Mail, ArrowUpRight } from "lucide-react";

/**
 * FINAL INTERACTION: THE SWARM FINALE
 * When visitors reach the bottom, all simulated cursor agents transition into
 * a coordinated fish-school swarm using the Boids algorithm.
 */
export default function SwarmFinale({ onNavigate }) {
  const finaleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger the fish-school swarm behavior in AgentManager
          window.dispatchEvent(
            new CustomEvent("agent-swarm-trigger", {
              detail: { active: entry.isIntersecting },
            })
          );
        });
      },
      {
        threshold: 0.25,
      }
    );

    if (finaleRef.current) {
      observer.observe(finaleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="swarm-finale"
      ref={finaleRef}
      className="relative py-28 sm:py-36 bg-[#030303] border-b border-[#222226] overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Radial Spotlight Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(198, 255, 0, 0.05) 45%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 max-w-4xl px-4 flex flex-col items-center">
        {/* Technical Swarm Status Indicator */}
        <SelectionReveal id="swarm-indicator" outlineColor="lime">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-ping" />
            <Sparkles className="w-3.5 h-3.5" />
            <span>COORDINATED SWARM MODE // FISH-SCHOOL DYNAMICS ACTIVE</span>
          </div>
        </SelectionReveal>

        {/* Main Finale Display Headline */}
        <SelectionReveal id="finale-main-headline" outlineColor="purple" delay={200}>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F5F5] uppercase mb-4 leading-none">
            THANKS FOR <span className="text-[#C6FF00]">EXPLORING</span> MY WORLD.
          </h2>
        </SelectionReveal>

        {/* Subhead */}
        <SelectionReveal id="finale-subhead" outlineColor="lime" delay={400}>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#A1A1AA] font-light mb-10 tracking-tight">
            Let's build something meaningful.
          </p>
        </SelectionReveal>

        {/* Closing Call to Action Button */}
        <SelectionReveal id="finale-cta-button" outlineColor="lime" delay={600}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact", "#contact");
              }}
              className="btn btn-primary text-base px-8 py-3.5 shadow-[0_0_30px_rgba(198,255,0,0.25)]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me Directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-purple text-base px-6 py-3.5"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </SelectionReveal>

        {/* Swarm Description Tag */}
        <p className="mt-12 text-xs font-mono text-[#52525b] max-w-md">
          Autonomous simulated agents have synchronized into a Reynolds Boids school formation. Move your pointer across the canvas to interact with the flock.
        </p>
      </div>
    </section>
  );
}
