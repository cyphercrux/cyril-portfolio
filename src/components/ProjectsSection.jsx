import React, { useState } from "react";
import { projects, categories } from "../data/projects";
import ProjectModal from "./ProjectModal";
import { ArrowUpRight, Layers, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filtered =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === selectedCategory ||
            (p.categories && p.categories.includes(selectedCategory))
        );

  return (
    <section id="work" className="section-padding border-b border-[#1f1f24] bg-[#050505] relative">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="pill pill-lime mb-3">
              <span>02 // SELECTED HARDWARE &amp; IOT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight">
              ENGINEERING <span className="text-[#C6FF00]">PROJECTS.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#A1A1AA] max-w-md">
            Physical hardware, microcontrollers, and cloud telemetry built to solve practical electrical challenges.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#1f1f24]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#C6FF00] text-[#050505] font-bold shadow-[0_0_12px_rgba(198,255,0,0.2)]"
                  : "bg-[#121214] text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#18181d] border border-[#26262c]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="editorial-card group flex flex-col justify-between bg-[#0e0e11] hover:border-[#33333d] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#070709] mb-6 border border-[#222226]">
                  <img
                    src={proj.coverImage}
                    alt={proj.coverAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#050505]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#C6FF00] border border-[#292929]">
                      PROJECT // 0{proj.id}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#050505]/85 backdrop-blur-md text-[10px] font-mono text-[#A1A1AA] border border-[#292929]">
                      {proj.category}
                    </span>
                  </div>

                  {proj.diagrams && proj.diagrams.length > 0 && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#050505]/80 backdrop-blur-sm text-[9px] font-mono text-[#A855F7] border border-[#A855F7]/30 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>Circuit Schematics Available</span>
                    </div>
                  )}
                </div>

                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5F5] group-hover:text-[#C6FF00] transition-colors mb-2.5">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  {proj.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141418] text-[#A1A1AA] border border-[#25252b]"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141418] text-[#71717A] border border-[#25252b]">
                      +{proj.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e1e24] flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(proj)}
                  className="btn btn-primary text-xs w-full sm:w-auto"
                >
                  <span>Inspect System Spec</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#C6FF00] transition-colors"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
