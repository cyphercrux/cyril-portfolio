import React, { useState, useEffect } from "react";
import { X, ExternalLink, Github, CheckCircle2, ShieldCheck, Layers, Image as ImageIcon } from "lucide-react";

export default function ProjectModal({ project, isOpen, onClose }) {
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d0f] border border-[#2a2a30] rounded-xl shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-[#0d0d0f]/95 border-b border-[#222226] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C6FF00]/10 text-[#C6FF00] border border-[#C6FF00]/30 uppercase">
              PROJECT {project.id}
            </span>
            <span className="text-xs font-mono text-[#A1A1AA] uppercase">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#1a1a20] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 flex flex-col gap-6">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#F5F5F5] mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#222226] pb-3">
            <button
              onClick={() => setTab("overview")}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                tab === "overview"
                  ? "bg-[#C6FF00] text-[#050505] font-bold"
                  : "bg-[#141418] text-[#A1A1AA] hover:text-[#F5F5F5]"
              }`}
            >
              Overview &amp; Problem
            </button>

            <button
              onClick={() => setTab("how-it-works")}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                tab === "how-it-works"
                  ? "bg-[#C6FF00] text-[#050505] font-bold"
                  : "bg-[#141418] text-[#A1A1AA] hover:text-[#F5F5F5]"
              }`}
            >
              How It Works
            </button>

            {project.diagrams && project.diagrams.length > 0 && (
              <button
                onClick={() => setTab("schematics")}
                className={`px-3 py-1.5 rounded text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                  tab === "schematics"
                    ? "bg-[#C6FF00] text-[#050505] font-bold"
                    : "bg-[#141418] text-[#A1A1AA] hover:text-[#F5F5F5]"
                }`}
              >
                Schematics ({project.diagrams.length})
              </button>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <button
                onClick={() => setTab("gallery")}
                className={`px-3 py-1.5 rounded text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                  tab === "gallery"
                    ? "bg-[#C6FF00] text-[#050505] font-bold"
                    : "bg-[#141418] text-[#A1A1AA] hover:text-[#F5F5F5]"
                }`}
              >
                Hardware Gallery ({project.gallery.length})
              </button>
            )}
          </div>

          {/* Tab: Overview */}
          {tab === "overview" && (
            <div className="flex flex-col gap-6">
              <div className="rounded-lg overflow-hidden border border-[#26262c] bg-[#121215]">
                <img
                  src={project.coverImage}
                  alt={project.coverAlt}
                  className="w-full max-h-[380px] object-cover object-center"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#141418] border border-[#26262c]">
                  <span className="text-xs font-mono font-bold text-[#A855F7] uppercase tracking-wider block mb-2">
                    The Problem
                  </span>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#141418] border border-[#26262c]">
                  <span className="text-xs font-mono font-bold text-[#C6FF00] uppercase tracking-wider block mb-2">
                    The Engineering Objective
                  </span>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {project.objective}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase mb-3">
                  Key Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#A1A1AA]">
                      <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.verifiedResults && (
                <div className="p-4 rounded-lg bg-[#0e1610] border border-[#1e3820]">
                  <h4 className="font-heading font-bold text-sm text-[#C6FF00] uppercase mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Outcomes
                  </h4>
                  <ul className="flex flex-col gap-1.5 text-xs text-[#A1A1AA]">
                    {project.verifiedResults.map((res, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] mt-1.5 shrink-0" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab: How It Works */}
          {tab === "how-it-works" && (
            <div className="flex flex-col gap-4">
              {project.howItWorks.map((step, idx) => (
                <div
                  key={step.title}
                  className="p-4 rounded-lg bg-[#141418] border border-[#26262c] flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded bg-[#1c1c24] border border-[#333] flex items-center justify-center font-mono font-bold text-xs text-[#C6FF00] shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-[#F5F5F5] mb-1">
                      {step.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Schematics */}
          {tab === "schematics" && project.diagrams && (
            <div className="flex flex-col gap-6">
              {project.diagrams.map((diag, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-[#292930] bg-[#121216]">
                  <img src={diag.src} alt={diag.alt} className="w-full object-contain max-h-[420px] bg-[#08080a] p-2" />
                  <div className="p-3 bg-[#16161a] border-t border-[#26262d] text-xs font-mono text-[#A1A1AA]">
                    {diag.caption}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Gallery */}
          {tab === "gallery" && project.gallery && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((item, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-[#292930] bg-[#121216]">
                  <img src={item.src} alt={item.alt} className="w-full h-[220px] object-cover bg-[#08080a]" />
                  <div className="p-2.5 bg-[#16161a] border-t border-[#26262d] text-[11px] font-mono text-[#A1A1AA]">
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech badges */}
          <div className="pt-3 border-t border-[#222226] flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-[#18181c] text-[#F5F5F5] border border-[#2d2d34]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#0a0a0c] border-t border-[#222226] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#71717A]">
            {project.paperNote || "Engineering prototype"}
          </span>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Source</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#71717A]" />
              </a>
            )}
            <button onClick={onClose} className="btn btn-primary text-xs">
              Close Spec
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
