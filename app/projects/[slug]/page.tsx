import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/data/projects";
import Img from "@/components/Img";
import Lightbox from "@/components/Lightbox";
import { Reveal } from "@/components/Fx";
type P = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = getProject((await params).slug);
  return { title: p?.shortTitle ?? "Project", description: p?.shortDescription };
}
const Sec = ({ t, children }: { t: string; children: React.ReactNode }) => <Reveal as="section"><h2 className="font-display">{t}</h2>{children}</Reveal>;
export default async function Page({ params }: P) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p), prev = projects[(i - 1 + projects.length) % projects.length], next = projects[(i + 1) % projects.length];
  const diagrams = p.diagrams.filter((x) => x.approved), gallery = p.gallery.filter((x) => x.approved);
  const links = Object.entries(p.links).filter(([, v]) => v) as [string, string][];
  return (
    <div className="wrap">
      <section>
        <Link href="/projects" className="lime" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
          &larr; Back to all projects
        </Link>
        <h1 style={{ marginTop: 20 }}>
          {p.title}
        </h1>
        <p className="st">
          <span style={{ color: "var(--lime)", fontWeight: 600 }}>{p.status}</span> &middot; {p.categories.join(" · ")}
        </p>
        {p.links.github && (
          <div style={{ marginTop: "16px", marginBottom: "8px" }}>
            <a
              className="btn"
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CODE"
            >
              GitHub Code ↗
            </a>
          </div>
        )}
        <div className="hero-img"><Img img={p.cover} priority sizes="(max-width:1120px) 100vw, 1120px" /></div>
      </section>
      <Sec t="Overview">{p.overview.map((t) => <p key={t}>{t}</p>)}<div>{p.technologies.map((t) => <span className="tag" key={t}>{t}</span>)}</div></Sec>
      {p.problem && <Sec t="Problem"><p>{p.problem}</p></Sec>}
      {p.objective && <Sec t="Objective"><p>{p.objective}</p></Sec>}
      <Sec t="How it works"><ol className="steps">{p.howItWorks.map((s, n) => <li key={s.title} data-n={String(n + 1).padStart(2, "0")}><div><b>{s.title}.</b> <span className="mut">{s.text}</span></div></li>)}</ol></Sec>
      <Sec t="Key features"><ul>{p.keyFeatures.map((f) => <li key={f}>{f}</li>)}</ul></Sec>
      {diagrams.length > 0 && <Sec t="Architecture and circuit"><Lightbox images={diagrams} contain /></Sec>}
      {p.hardwareAndSoftware && <Sec t="Hardware and software"><ul>{p.hardwareAndSoftware.map((h) => <li key={h}>{h}</li>)}</ul></Sec>}
      {p.contribution && <Sec t="My contribution"><p>{p.contribution}</p></Sec>}
      {p.implementation && <Sec t="Implementation"><p>{p.implementation}</p></Sec>}
      {p.results && <Sec t="Results and observations"><ul>{p.results.map((r) => <li key={r}>{r}</li>)}</ul></Sec>}
      {p.challengesAndLearnings && <Sec t="Challenges and learnings"><p>{p.challengesAndLearnings}</p></Sec>}
      <Sec t="Outcome"><p>{p.outcome}</p>{p.publicNote && <p className="note">{p.publicNote}</p>}</Sec>
      {gallery.length > 0 && <Sec t="Gallery"><Lightbox images={gallery} /></Sec>}
      {links.length > 0 && (
        <Sec t="Codebase & Links">
          <div className="row">
            {links.map(([k, v]) => (
              <a
                key={k}
                className="btn ghost"
                href={v}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CODE"
              >
                {k === "github" ? "GitHub Codebase" : k} ↗
              </a>
            ))}
          </div>
        </Sec>
      )}
      <section className="pn">
        <Link href={`/projects/${prev.slug}`} data-cursor="PREV">← {prev.shortTitle}</Link>
        <Link href={`/projects/${next.slug}`} data-cursor="NEXT">{next.shortTitle} →</Link>
      </section>
    </div>
  );
}
