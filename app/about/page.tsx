import type { Metadata } from "next";
import { about, site } from "@/data/site";
import { Reveal } from "@/components/Fx";
import Img from "@/components/Img";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <div className="wrap">
      <section>
        <div className="intro-grid">
          <div>
            <h1>About <span className="gradient-text-lime-purple">Me</span></h1>
            <p className="lead">{about.intro}</p>
            {site.links.resume && <p><a className="btn" href={site.links.resume} download>Download resume &darr;</a></p>}
          </div>
          <div className="portrait-wrapper">
            <div className="portrait">
              <Img sizes="(max-width:900px) 80vw, 310px" img={{ src: about.aboutPortrait, alt: "Cyril William smiling in a blue suit in front of palm trees", approved: true }} />
            </div>
          </div>
        </div>
      </section>
      <Reveal as="section"><h2>Academic <span className="gradient-text-lime-purple">Education</span></h2><div className="cols">{about.education.map((e) => <div className="box" key={e.what}><h3 style={{ color: "var(--fg)" }}>{e.what}</h3><p style={{ color: "var(--lime)", fontWeight: 600 }}>{e.where}</p><p className="mut">{e.note}</p></div>)}</div></Reveal>
      <Reveal as="section"><h2>Industry <span className="gradient-text-lime-purple">Internships</span></h2><div className="cols">{about.internships.map((n) => (
        <div className="box" key={n.org}><h3 style={{ color: "var(--fg)" }}>{n.role}</h3><p style={{ color: "var(--lime)", fontWeight: 600 }}>{n.org} &middot; <span className="mut">{n.length}</span></p><p className="mut" style={{ fontSize: "0.9rem" }}>{n.field}</p><ul>{n.points.map((p) => <li key={p}>{p}</li>)}</ul></div>))}</div></Reveal>
      <Reveal as="section"><h2>Technical <span className="gradient-text-lime-purple">Skills</span></h2><div className="cols">{about.skills.map((g) => <div className="box" key={g.group}><h3 style={{ color: "var(--fg)" }}>{g.group}</h3>{g.items.map((i) => <span className="tag" key={i}>{i}</span>)}</div>)}</div></Reveal>
      <Reveal as="section"><h2>What I&apos;m <span className="gradient-text-purple-lime">Exploring</span></h2><div style={{ marginTop: "16px" }}>{about.exploring.map((i) => <span className="tag" key={i}>{i}</span>)}</div></Reveal>
    </div>
  );
}
