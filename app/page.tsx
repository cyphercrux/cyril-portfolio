import Link from "next/link";
import { site, about } from "@/data/site";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Fx";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <div>
      {/* 1. Cinematic Liquid-Metal WebGL Hero with supplied artwork */}
      <Hero />

      {/* 2. Personal Introduction with typing name, dynamic roles & portrait */}
      <Introduction />

      {/* 3. Selected Engineering Projects */}
      <div className="wrap">
        <section id="work">
          <Reveal>
            <p className="lime font-display" style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.9rem" }}>
              Portfolio Showcase
            </p>
            <h2 className="font-display">Selected <span className="gradient-text-lime-purple">Engineering Work</span></h2>
            <p className="mut" style={{ maxWidth: "680px", marginBottom: "32px" }}>
              Authentic hardware, IoT, and embedded prototypes built to solve practical challenges.
              Hover any card for a summary or click to read the complete technical case study with circuit schematics and telemetry.
            </p>
          </Reveal>

          <ProjectGrid projects={projects} filters={false} />

          <div style={{ marginTop: "36px", textAlign: "center" }}>
            <Link className="btn ghost" href="/projects" data-cursor="ALL">
              View All Projects with Interactive Filters &rarr;
            </Link>
          </div>
        </section>

        {/* 4. Experience Snapshot */}
        <Reveal as="section" className="gradient-border-top">
          <p className="lime font-display" style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.9rem" }}>
            Industry Experience
          </p>
          <h2 className="font-display">Internships &amp; <span className="gradient-text-lime-purple">Practical Training</span></h2>
          <div className="cols" style={{ marginTop: "24px" }}>
            {about.internships.map((item) => (
              <div className="box" key={item.org}>
                <h3 className="font-display" style={{ color: "var(--fg)", marginBottom: "4px" }}>{item.role}</h3>
                <p style={{ color: "var(--lime)", fontWeight: 600 }}>{item.org} &middot; <span className="mut">{item.length}</span></p>
                <p className="mut" style={{ fontSize: "0.88rem", marginTop: "4px" }}>{item.field}</p>
                <ul>
                  {item.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link className="lime" href="/about" style={{ fontWeight: 600 }}>
              Learn more about my education &amp; technical skill set &rarr;
            </Link>
          </div>
        </Reveal>

        {/* 5. Contact Callout */}
        <Reveal as="section" className="gradient-border-top" style={{ textAlign: "center", padding: "80px 0" }}>
          <p className="lime font-display" style={{ letterSpacing: "0.25em", textTransform: "uppercase", fontSize: "0.9rem" }}>
            Get In Touch
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", margin: "16px 0 20px" }}>
            LET&apos;S BUILD SOMETHING <br />
            <span className="gradient-text-lime-purple">THAT MATTERS.</span>
          </h2>
          <p className="mut" style={{ maxWidth: "580px", margin: "0 auto 32px", fontSize: "1.1rem" }}>
            Have an engineering opportunity, a project idea, or an interesting problem to solve?
            Let&apos;s connect.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <a className="btn" href={`mailto:${site.email}`} data-cursor="MAIL">
              {site.email}
            </a>
            <Link className="btn ghost" href="/contact" data-cursor="CONTACT">
              Visit Contact Page
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
