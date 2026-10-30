"use client";
import Link from "next/link";
import { useState } from "react";
import Img from "./Img";
import type { Project } from "@/data/projects";
const F = ["All Projects", "Electrical Engineering", "Embedded Systems", "IoT and Automation", "EV Technology", "Electronics"];
export default function ProjectGrid({ projects, filters = true }: { projects: Project[]; filters?: boolean }) {
  const [f, sf] = useState("All Projects");
  const list = f === "All Projects" ? projects : projects.filter((p) => (p.categories as string[]).includes(f));
  return (
    <>
      {filters && <div className="filters" role="group" aria-label="Filter projects">
        {F.map((c) => <button key={c} className={"chip" + (f === c ? " on" : "")} aria-pressed={f === c} onClick={() => sf(c)}>{c}</button>)}
      </div>}
      {filters && <p className="mut" aria-live="polite">{list.length} {list.length === 1 ? "project" : "projects"}</p>}
      <div className="grid">
        {list.map((p) => (
          <Link key={f + p.slug} href={`/projects/${p.slug}`} className="card" data-cursor="EXPLORE">
            <div className="imgbox"><Img img={p.cover} /></div>
            <div className="cb"><h3>{p.shortTitle}</h3><span className="st">{p.status}</span></div>
            <div className="ov">
              <p>{p.shortDescription}</p>
              <div>{p.technologies.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}</div>
              <span className="go">VIEW CASE STUDY <i>↗</i></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
