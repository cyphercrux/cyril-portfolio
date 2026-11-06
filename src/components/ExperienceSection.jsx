import React from "react";
import { educationData, internshipsData, skillCategories } from "../data/experience";
import { Briefcase, GraduationCap, Zap, Cpu, Terminal, ShieldCheck, CheckCircle2, Calendar, MapPin, Building } from "lucide-react";

export default function ExperienceSection() {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-4 h-4 text-[#C6FF00]" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-[#A855F7]" />;
      case "Terminal": return <Terminal className="w-4 h-4 text-[#C6FF00]" />;
      case "ShieldCheck": return <ShieldCheck className="w-4 h-4 text-[#A855F7]" />;
      default: return <Zap className="w-4 h-4 text-[#C6FF00]" />;
    }
  };

  return (
    <section id="experience" className="section-padding border-b border-[#1f1f24] bg-[#070709] relative">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="pill pill-lime mb-3">
            <span>03 // INDUSTRIAL TRAINING &amp; CREDENTIALS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight mb-4">
            EXPERIENCE &amp; <span className="text-[#C6FF00]">CAPABILITIES.</span>
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Hands-on training in electrical panel quality testing, fault diagnosis, and embedded hardware prototyping.
          </p>
        </div>

        {/* 2-Col Layout: Internships & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Internships */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-3 border-b border-[#222226]">
              <Briefcase className="w-5 h-5 text-[#C6FF00]" />
              <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase">
                Industrial Internships
              </h3>
            </div>

            {internshipsData.map((item) => (
              <div key={item.company} className="editorial-card group bg-[#0e0e11]">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#C6FF00] uppercase tracking-wider block mb-1">
                      {item.company}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-[#F5F5F5]">
                      {item.role}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] bg-[#16161b] px-2.5 py-1 rounded border border-[#26262e]">
                    <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>{item.location}</span>
                </div>

                <ul className="flex flex-col gap-2 mb-4 text-xs sm:text-sm text-[#A1A1AA]">
                  {item.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1e1e24]">
                  {item.skillsLearned.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#16161b] text-[#A1A1AA] border border-[#26262e]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-3 border-b border-[#222226]">
              <GraduationCap className="w-5 h-5 text-[#A855F7]" />
              <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase">
                Formal Education
              </h3>
            </div>

            {educationData.map((edu) => (
              <div key={edu.degree} className="editorial-card group bg-[#0e0e11]">
                <span className="text-xs font-mono font-bold text-[#A855F7] tracking-wider block mb-1">
                  {edu.period}
                </span>
                <h4 className="font-heading text-base font-bold text-[#F5F5F5] mb-1">
                  {edu.degree}
                </h4>
                <p className="text-xs font-mono text-[#A1A1AA] mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>{edu.institution}</span>
                </p>
                {edu.college && (
                  <p className="text-xs text-[#71717A] mb-3 pl-2 border-l border-[#A855F7]">
                    {edu.college}
                  </p>
                )}
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
                  {edu.description}
                </p>
                <div className="pt-2 border-t border-[#1e1e24] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#71717A]">Status:</span>
                  <span className="text-[#C6FF00] font-semibold">{edu.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Breakdown */}
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-[#F5F5F5] uppercase mb-8 pb-3 border-b border-[#1f1f24]">
            Technical Capabilities Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <div key={cat.category} className="editorial-card bg-[#0e0e11] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded bg-[#16161b] border border-[#26262e]">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <span className="text-[10px] font-mono text-[#71717A]">CAT 0{idx + 1}</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#F5F5F5] mb-1.5">{cat.category}</h4>
                  <p className="text-xs text-[#71717A] mb-5">{cat.description}</p>
                  <div className="flex flex-col gap-3">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#A1A1AA] font-mono text-[11px]">{s.name}</span>
                          <span className="text-[10px] font-mono text-[#71717A]">{s.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-[#1a1a20] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${s.level}%`, backgroundColor: cat.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
