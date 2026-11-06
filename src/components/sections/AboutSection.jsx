import React, { useState } from "react";
import { siteConfig } from "../../config/site";
import { educationData, internshipsData, skillCategories } from "../../data/experience";
import SelectionReveal from "../../animations/SelectionReveal";
import {
  GraduationCap,
  Briefcase,
  Zap,
  Cpu,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  MapPin,
} from "lucide-react";

/**
 * PAGE 2: ABOUT ME SECTION
 * Comprehensive profile detailing engineering education, industrial internships at Siemens & Vivid,
 * and technical proficiencies with cursor-assisted reveal boxes.
 */
export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("all");

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-5 h-5 text-[#C6FF00]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#A855F7]" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-[#C6FF00]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#A855F7]" />;
      default:
        return <Zap className="w-5 h-5 text-[#C6FF00]" />;
    }
  };

  return (
    <section id="about" className="section-padding border-b border-[#222226] relative">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <SelectionReveal id="about-heading-badge" outlineColor="lime">
            <div className="pill pill-lime mb-6">
              <span>02 // PROFILE &amp; EXPERTISE</span>
            </div>
          </SelectionReveal>

          <SelectionReveal id="about-main-title" outlineColor="purple" delay={150}>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight mb-8">
              ENGINEERING FOUNDATION &amp; <span className="text-[#C6FF00]">HANDS-ON PRACTICE.</span>
            </h2>
          </SelectionReveal>

          <SelectionReveal id="about-intro-text" outlineColor="lime" delay={300}>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              Hey, I'm Cyril William. I'm an Electrical Engineering student interested in turning technical curiosity into practical solutions. From electrical panel testing and industrial systems to embedded electronics, IoT and EV technology, I enjoy exploring the intersection of hardware, automation and intelligent technology.
            </p>
          </SelectionReveal>
        </div>

        {/* Two Column Layout: Education & Industrial Internships */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-28">
          {/* Column 1: Industrial Internship Experience */}
          <div className="lg:col-span-7 flex flex-col">
            <SelectionReveal id="internships-header" outlineColor="lime" delay={200}>
              <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#292929]">
                <Briefcase className="w-5 h-5 text-[#C6FF00]" />
                <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase tracking-wide">
                  Industrial Experience &amp; Internships
                </h3>
              </div>
            </SelectionReveal>

            <div className="flex flex-col gap-8">
              {internshipsData.map((item, index) => (
                <SelectionReveal
                  key={item.company}
                  id={`internship-item-${index}`}
                  outlineColor={index % 2 === 0 ? "lime" : "purple"}
                  delay={index * 150 + 250}
                >
                  <div className="editorial-card group">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#C6FF00] uppercase tracking-wider block mb-1.5">
                          {item.company}
                        </span>
                        <h4 className="font-heading text-xl font-bold text-[#F5F5F5] group-hover:text-[#C6FF00] transition-colors">
                          {item.role}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] bg-[#1a1a1f] px-3 py-1.5 rounded border border-[#2d2d35]">
                        <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-5">
                      <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
                      <span>{item.location}</span>
                    </div>

                    <ul className="flex flex-col gap-3.5 mb-6 text-xs sm:text-sm text-[#A1A1AA]">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222226]">
                      {item.skillsLearned.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18181c] text-[#A1A1AA] border border-[#2b2b30]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SelectionReveal>
              ))}
            </div>
          </div>

          {/* Column 2: Formal Education Credentials */}
          <div className="lg:col-span-5 flex flex-col">
            <SelectionReveal id="education-header" outlineColor="purple" delay={200}>
              <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#292929]">
                <GraduationCap className="w-5 h-5 text-[#A855F7]" />
                <h3 className="font-heading text-xl font-bold text-[#F5F5F5] uppercase tracking-wide">
                  Formal Education
                </h3>
              </div>
            </SelectionReveal>

            <div className="flex flex-col gap-8">
              {educationData.map((edu, index) => (
                <SelectionReveal
                  key={edu.degree}
                  id={`education-item-${index}`}
                  outlineColor={index === 0 ? "lime" : "purple"}
                  delay={index * 150 + 300}
                >
                  <div className="editorial-card group">
                    <span className="text-xs font-mono font-bold text-[#A855F7] tracking-wider block mb-2">
                      {edu.period}
                    </span>

                    <h4 className="font-heading text-lg sm:text-xl font-bold text-[#F5F5F5] group-hover:text-[#A855F7] transition-colors mb-2">
                      {edu.degree}
                    </h4>

                    <p className="text-xs font-mono text-[#A1A1AA] mb-4 flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-[#C6FF00]" />
                      <span>{edu.institution}</span>
                    </p>

                    {edu.college && (
                      <p className="text-xs text-[#71717A] mb-4 pl-3 border-l-2 border-[#A855F7]">
                        {edu.college}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
                      {edu.description}
                    </p>

                    <div className="pt-3 border-t border-[#222226] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#71717A]">Status:</span>
                      <span className="text-[#C6FF00] font-semibold">{edu.status}</span>
                    </div>
                  </div>
                </SelectionReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div>
          <SelectionReveal id="skills-section-header" outlineColor="lime" delay={150}>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-[#292929]">
              <div>
                <span className="text-xs font-mono font-semibold text-[#C6FF00] uppercase tracking-wider block mb-2">
                  03 // CORE COMPETENCIES
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight">
                  TECHNICAL SKILLS &amp; CAPABILITIES
                </h3>
              </div>
              <p className="text-xs font-mono text-[#71717A] max-w-sm leading-relaxed">
                Verified through university lab testing, industrial manufacturing, and embedded prototyping.
              </p>
            </div>
          </SelectionReveal>

          {/* Skill Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((cat, idx) => (
              <SelectionReveal
                key={cat.category}
                id={`skill-cat-${idx}`}
                outlineColor={idx % 2 === 0 ? "lime" : "purple"}
                delay={idx * 120 + 200}
              >
                <div className="editorial-card h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-2.5 rounded-lg bg-[#18181c] border border-[#292929]">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">
                        CAT 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-lg text-[#F5F5F5] mb-2.5">
                      {cat.category}
                    </h4>

                    <p className="text-xs text-[#71717A] mb-6 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="flex flex-col gap-4">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#A1A1AA] font-mono text-xs">
                              {skill.name}
                            </span>
                            <span className="text-[11px] font-mono text-[#71717A]">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1c1c20] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: cat.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SelectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

