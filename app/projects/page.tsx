import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";
export const metadata: Metadata = { title: "Projects" };
export default function Projects() {
  return (
    <div className="wrap"><section>
      <h1>Engineering <span className="gradient-text-lime-purple">Projects</span></h1>
      <p className="mut">Hover a card for a quick preview, click for the full case study.</p>
      <ProjectGrid projects={projects} />
    </section></div>
  );
}
