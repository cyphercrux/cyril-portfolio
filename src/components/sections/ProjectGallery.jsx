import React, { useState } from "react";
import { projects, categories } from "../../data/projects";
import ProjectDialog from "./ProjectDialog";
import SelectionReveal from "../../animations/SelectionReveal";
import { ArrowUpRight, Cpu, Layers, ExternalLink } from "lucide-react";

/**
 * PAGE 3: PROJECTS GALLERY
 * Displays responsive editorial cards for Cyril's 4 major hardware & IoT projects,
 * with category filters and interactive dialog modals.
 */
export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === selectedCategory ||
            (p.categories && p.categories.includes(selectedCategory))
        );

  return (
    <section id="projects" className="section-padding border-b border-[#222226] relative">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SelectionReveal id="projects-badge" outlineColor="lime">
              <div className="pill pill-lime mb-3">
                <span>04 // HARDWARE &amp; EMBEDDED SYSTEMS</span>
              </div>
            </SelectionReveal>

            <SelectionReveal id="projects-title" outlineColor="purple" delay={150}>
              <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight">
                FEATURED <span className="text-[#C6FF00]">PROJECTS.</span>
              </h2>
            </SelectionReveal>
          </div>

          <SelectionReveal id="projects-desc" outlineColor="lime" delay={250}>
            <p className="text-sm font-mono text-[#A1A1AA] max-w-md">
              Bridging electrical power hardware with intelligent telemetry, microcontrollers, and cloud IoT architectures.
            </p>
          </SelectionReveal>
        </div>

        {/* Category Filters */}
        <SelectionReveal id="projects-filter-bar" outlineColor="purple" delay={200}>
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[#222226]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#C6FF00] text-[#050505] font-bold shadow-[0_0_12px_rgba(198,255,0,0.2)]"
                    : "bg-[#141416] text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1a1a1f] border border-[#292929]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </SelectionReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <SelectionReveal
              key={project.id}
              id={`project-card-${project.slug}`}
              outlineColor={index % 2 === 0 ? "lime" : "purple"}
              delay={index * 150 + 200}
            >
              <div className="editorial-card group flex flex-col justify-between h-full bg-[#101012] hover:border-[#383840] transition-all duration-300">
                <div>
                  {/* Card Media Container */}
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#0a0a0c] mb-6 border border-[#222226]">
                    <img
                      src={project.coverImage}
                      alt={project.coverAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Top Status & ID Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-[#050505]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#C6FF00] border border-[#292929]">
                        PROJECT // 0{project.id}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#050505]/85 backdrop-blur-md text-[10px] font-mono text-[#A1A1AA] border border-[#292929]">
                        {project.category}
                      </span>
                    </div>

                    {/* Schematics Available Indicator */}
                    {project.diagrams && project.diagrams.length > 0 && (
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#050505]/80 backdrop-blur-sm text-[9px] font-mono text-[#A855F7] border border-[#A855F7]/30 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        <span>Schematic Diagrams Included</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5F5] group-hover:text-[#C6FF00] transition-colors mb-3 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#16161a] text-[#A1A1AA] border border-[#28282e]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#16161a] text-[#71717A] border border-[#28282e]">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-4 border-t border-[#222226] flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="btn btn-primary text-xs w-full sm:w-auto"
                  >
                    <span>Inspect System Spec</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#C6FF00] transition-colors"
                      title="View GitHub Repository"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </SelectionReveal>
          ))}
        </div>
      </div>

      {/* Accessible Detail Dialog */}
      <ProjectDialog
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

